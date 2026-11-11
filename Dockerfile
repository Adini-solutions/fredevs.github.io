# 1. Build de React (incluye sitemap.xml y llms.txt vía postbuild)
FROM node:22-bookworm-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 npm ci
COPY . .
RUN npm run build

# 2. Prerender de cada página. El tag tiene que coincidir con la versión de
#    `playwright` en package.json (hoy 1.56.1).
FROM mcr.microsoft.com/playwright:v1.56.1-noble AS prerender
WORKDIR /app
COPY --from=build /app /app
RUN npm run prerender

# 3. nginx sin privilegios (escucha en 8080)
FROM nginxinc/nginx-unprivileged:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=prerender /app/build /usr/share/nginx/html
EXPOSE 8080
