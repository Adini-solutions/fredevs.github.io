/**
 * Corre después de `react-scripts build` (postbuild) y escribe en build/:
 *   - sitemap.xml, con las páginas de src/seo/pages.js;
 *   - llms.txt, un resumen en Markdown del sitio para modelos de lenguaje
 *     (https://llmstxt.org), armado con los mismos textos de la web.
 * Solo usa Node: no necesita navegador, así que entra en cualquier build.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { SITE_URL, PAGES, pageFor } from "../src/seo/pages.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const build = join(root, "build");
const es = JSON.parse(readFileSync(join(root, "src/locales/es.json"), "utf8"));
const today = new Date().toISOString().slice(0, 10);

// ---- sitemap.xml ------------------------------------------------------------
const urls = PAGES.map(
  (p) => `  <url>
    <loc>${SITE_URL}${p.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
).join("\n");
writeFileSync(
  join(build, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
);

// ---- llms.txt ---------------------------------------------------------------
// Casos publicados en stories.adini.com.ar (repo `stories`, src/cases/meta.ts).
const STORIES = "https://stories.adini.com.ar";
const CASES = [
  ["utenia", "UtenIA", "UTN FRBA", "Agente de IA que responde con la documentación de la facultad y los datos del campus virtual de cada estudiante, con toda la inferencia en servidores propios."],
  ["aura", "Aura", "Hospital El Cruce", "Plataforma de recupero de costos hospitalarios que valoriza informes con IA y sigue cada expediente hasta el cobro, con los datos clínicos en servidores propios."],
  ["cognitia", "Cognitia", "The Brains", "Plataforma de datos que mide la audiencia de transmisiones en vivo y clasifica con IA los comentarios de siete redes por sentimiento y emoción."],
  ["sia", "SIA", "UTN FRBA", "Portal institucional con acceso único a los servicios de la facultad."],
  ["sicyt", "SICYT", "UTN FRBA", "Sistema de gestión de proyectos de investigación, con el reglamento validado automáticamente."],
  ["extractos", "Extractos", "Química Morón", "Consolidación de extractos bancarios validados fila por fila y clasificados con reglas auditables."],
  ["roca", "ROCA", "Laboratorio de Edafología, UBA", "Gestión integral de un laboratorio de suelos, de los pedidos a los informes firmados."],
  ["moviltrack", "Moviltrack", "Moviltrack", "Sistema de gestión de cotizaciones, pedidos, remisiones y cobros."],
  ["hip", "HIP Game Park", "HIP Game Park", "Reservas con pago online y operación en vivo de un parque de juegos."],
];

const service = (path) => `- [${pageFor(path).service.name}](${SITE_URL}${path}): ${pageFor(path).description}`;
const faq = es.iaPage.faq.items.map((q) => `### ${q.pregunta}\n\n${q.respuesta}`).join("\n\n");

writeFileSync(
  join(build, "llms.txt"),
  `# ADINI

> ADINI es una empresa argentina que diseña, integra y opera agentes de IA, software a medida e infraestructura para empresas e instituciones. Los modelos de IA pueden correr en los servidores del cliente o en la nube, con los datos bajo su control. Es partner oficial de la UTN Facultad Regional Buenos Aires, donde dicta el curso de IA híbrida, privada y local.

- Sede: Ciudad Autónoma de Buenos Aires, Argentina. Clientes en Argentina y otros países.
- Contacto: contacto@adini.com.ar · WhatsApp +54 9 11 4412-3760 · ${SITE_URL}/#contacto

## Servicios

${service("/ia")}
${service("/dev")}
${service("/infra")}

## Casos en producción

${CASES.map(([slug, name, client, text]) => `- [${name} · ${client}](${STORIES}/${slug}): ${text}`).join("\n")}

## Formación

- [Curso de IA híbrida, privada y local en la UTN.BA](https://innovia.adini.com.ar/): curso abierto y ediciones cerradas para empresas sobre cómo diseñar y rentabilizar IA en la nube, en infraestructura privada o híbrida.

## Preguntas frecuentes sobre agentes de IA

${faq}
`
);

console.log(`seo-files: sitemap.xml (${PAGES.length} páginas) y llms.txt escritos en build/`);
