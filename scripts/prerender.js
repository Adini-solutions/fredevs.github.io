/**
 * Pre-renderiza cada página de src/seo/pages.js después de `npm run build`.
 *
 * Abre la página compilada en un Chromium headless, espera a que se dibuje
 * (incluidos los contadores del banner) y guarda el HTML resultante en
 * build/<ruta>/index.html (el home en build/index.html), con:
 *   - el texto, los títulos y los links reales de la página, para buscadores y
 *     asistentes de IA que no ejecutan JavaScript;
 *   - el <head> de esa página (título, descripción, canonical, Open Graph y
 *     JSON-LD), que escribe react-helmet-async;
 *   - los estilos de Chakra/emotion volcados como texto, para que se vea igual
 *     antes de que cargue el JavaScript.
 * Al cargar, React reemplaza ese contenido por la app (ver utils/prerender.js).
 *
 * La plantilla vacía queda en build/404.html, para servir rutas inexistentes.
 *
 * Uso:  npm run build && npm run prerender
 * Necesita Chromium: en Docker, la imagen mcr.microsoft.com/playwright de la
 * misma versión que el paquete `playwright`; en local, `npx playwright install
 * chromium` o PRERENDER_CHANNEL=chrome para usar el Chrome instalado.
 */
import { createServer } from "node:http";
import { existsSync, mkdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { dirname, extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import { PAGES } from "../src/seo/pages.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const build = join(root, "build");
const shellPath = join(build, "404.html");

// La plantilla original (sin pre-renderizar) es la base de todo: se guarda una
// vez y se sirve para cualquier ruta mientras se renderiza.
const indexHtml = readFileSync(join(build, "index.html"), "utf8");
if (!indexHtml.includes('data-prerendered="true"')) writeFileSync(shellPath, indexHtml);
const shell = readFileSync(shellPath, "utf8");

const TYPES = {
  ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml",
  ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".ico": "image/x-icon",
  ".mp4": "video/mp4", ".webm": "video/webm", ".woff2": "font/woff2", ".txt": "text/plain", ".xml": "application/xml",
};

const server = createServer((req, res) => {
  const path = normalize(decodeURIComponent(new URL(req.url, "http://x").pathname)).replace(/^(\.\.[/\\])+/, "");
  const file = join(build, path);
  if (path !== "/" && existsSync(file) && statSync(file).isFile()) {
    res.writeHead(200, { "content-type": TYPES[extname(file)] ?? "application/octet-stream" });
    return res.end(readFileSync(file));
  }
  res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
  res.end(shell);
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${server.address().port}`;

const browser = await chromium.launch(process.env.PRERENDER_CHANNEL ? { channel: process.env.PRERENDER_CHANNEL } : {});
let failed = false;

for (const { path } of PAGES) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: "es-AR" });
  // Nada de terceros: ni Turnstile ni nada que no sea el propio build.
  await context.route(/^https?:\/\/(?!127\.0\.0\.1)/, (route) =>
    /fonts\.(googleapis|gstatic)\.com/.test(route.request().url()) ? route.continue() : route.abort()
  );
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));

  try {
    await page.goto(`${base}${path}`, { waitUntil: "load" });
    await page.waitForSelector("h1", { timeout: 15_000 });
    // Entrada del hero (~1,5 s) y contadores del banner (~2,1 s).
    await page.waitForTimeout(2800);
    await page.evaluate(() => window.scrollTo(0, 0));

    const html = await page.evaluate(() => {
      // emotion inserta las reglas con insertRule: el <style> queda vacío en el
      // DOM. Se vuelcan como texto para que el HTML ya venga con estilos.
      document.querySelectorAll("style[data-emotion]").forEach((el) => {
        if (!el.textContent.trim() && el.sheet) {
          el.textContent = Array.from(el.sheet.cssRules, (r) => r.cssText).join("\n");
        }
      });
      document.querySelectorAll("iframe, script[src*='challenges.cloudflare.com']").forEach((el) => el.remove());
      document.getElementById("root").setAttribute("data-prerendered", "true");
      return "<!DOCTYPE html>\n" + document.documentElement.outerHTML;
    });

    const out = path === "/" ? join(build, "index.html") : join(build, path.slice(1), "index.html");
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, html);

    const words = await page.evaluate(() => document.getElementById("root").innerText.split(/\s+/).filter(Boolean).length);
    console.log(`prerender: ${path.padEnd(7)} ${String(words).padStart(5)} palabras -> ${out.replace(root + "/", "")}`);
    if (errors.length) console.warn(`  errores en la página: ${errors.slice(0, 3).join(" | ")}`);
  } catch (err) {
    failed = true;
    console.error(`prerender: falló ${path}: ${err.message}`);
  } finally {
    await context.close();
  }
}

await browser.close();
server.close();
if (failed) process.exit(1);
