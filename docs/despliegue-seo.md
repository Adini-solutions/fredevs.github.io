# Despliegue con SEO y prerender

Desde la rama `feat/seo`, el build genera archivos que el servidor tiene que
publicar tal cual. Esta nota es para quien mantiene el `Dockerfile` y el
`nginx.conf` de la landing en vm-3.

## Qué genera el build

| Comando | Qué escribe en `build/` | Necesita |
|---|---|---|
| `npm run build` | La app, más `sitemap.xml` y `llms.txt` (corre `postbuild` solo) | Node |
| `npm run prerender` | `index.html`, `ia/index.html`, `dev/index.html` e `infra/index.html` con el contenido y el `<head>` de cada página ya renderizados; `404.html` con la plantilla vacía | Chromium (Playwright) |

`robots.txt` viene de `public/`. Sin el prerender el sitio funciona igual,
pero los buscadores y las IA que no ejecutan JavaScript no ven el contenido.

## Dockerfile

El prerender necesita un Chromium de la misma versión que el paquete
`playwright` de `package.json` (hoy 1.56.1). Lo más simple es una etapa con la
imagen oficial de Playwright:

```dockerfile
# 1. Build de React (incluye sitemap.xml y llms.txt)
FROM node:22-bookworm-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 npm ci
COPY . .
RUN npm run build

# 2. Prerender de cada página
FROM mcr.microsoft.com/playwright:v1.56.1-noble AS prerender
WORKDIR /app
COPY --from=build /app /app
RUN npm run prerender

# 3. nginx sin privilegios
FROM nginxinc/nginx-unprivileged:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=prerender /app/build /usr/share/nginx/html
```

Si se actualiza `playwright` en `package.json`, hay que cambiar el tag de la
imagen de la etapa 2 a la misma versión.

## nginx

Lo importante es que cada ruta sirva **su** HTML (`/ia` → `ia/index.html`)
antes que el `index.html` general, y que las rutas inexistentes respondan 404
con la plantilla vacía:

```nginx
server {
  listen 8080;
  root /usr/share/nginx/html;
  absolute_redirect off;

  location = /health { access_log off; return 200 "ok"; }

  # Una sola versión de cada URL: /ia/ -> /ia
  rewrite ^/(.+)/$ /$1 permanent;

  location / {
    try_files $uri $uri/index.html =404;
    add_header Cache-Control "no-cache";
  }

  location /static/ {
    add_header Cache-Control "public, max-age=31536000, immutable";
  }

  error_page 404 /404.html;
  location = /404.html { internal; add_header Cache-Control "no-cache"; }
}
```

Las rutas nuevas de la app tienen que estar también en `src/seo/pages.js`
para que se pre-rendericen y entren al sitemap.

## Cloudflare

- **Desactivar el `robots.txt` administrado** (Security → Bots, o AI Crawl
  Control → "Manage robots.txt"). Hoy reemplaza al del sitio por uno que solo
  tiene comentarios y no declara el sitemap.
- No activar "Block AI bots": el objetivo es que los asistentes de IA puedan
  leer y citar el sitio.

## Después de publicar

1. Verificar como lo vería un bot:
   ```bash
   curl -s -A "GPTBot" https://adini.com.ar/ia | grep -o "<h1[^>]*>[^<]*"
   curl -sI https://adini.com.ar/nada | head -1          # 404
   curl -s https://adini.com.ar/sitemap.xml | head -5
   ```
2. Dar de alta el sitio en Google Search Console y en Bing Webmaster Tools
   (Bing alimenta las búsquedas de ChatGPT y Copilot) y enviar
   `https://adini.com.ar/sitemap.xml` en los dos.
3. Validar los datos estructurados de `/ia` en
   https://search.google.com/test/rich-results.
