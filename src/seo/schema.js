import { SITE_URL, pageFor } from "./pages.js";
import es from "../locales/es.json";

// La organización y el sitio están en public/index.html (JSON-LD global); acá
// se los referencia por @id.
const ORG = { "@id": `${SITE_URL}/#organization` };
const WEBSITE = { "@id": `${SITE_URL}/#website` };

/** JSON-LD propio de cada página: WebPage, migas, servicio y preguntas frecuentes. */
export function pageSchema(path) {
  const page = pageFor(path);
  if (!page) return [];
  const url = `${SITE_URL}${page.path === "/" ? "/" : page.path}`;
  const graph = [
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: page.title,
      description: page.description,
      inLanguage: "es-AR",
      isPartOf: WEBSITE,
      about: ORG,
      publisher: ORG,
    },
  ];

  if (page.breadcrumb) {
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: page.breadcrumb, item: url },
      ],
    });
  }

  if (page.service) {
    graph.push({
      "@type": "Service",
      "@id": `${url}#service`,
      ...page.service,
      url,
      provider: ORG,
      areaServed: { "@type": "Country", name: "Argentina" },
      availableLanguage: ["es", "en"],
    });
  }

  if (page.path === "/ia") {
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: es.iaPage.faq.items.map(({ pregunta, respuesta }) => ({
        "@type": "Question",
        name: pregunta,
        acceptedAnswer: { "@type": "Answer", text: respuesta },
      })),
    });
  }

  if (page.path === "/") {
    // Los servicios del home, para que buscadores e IA entiendan qué ofrece ADINI.
    graph.push({
      "@type": "ItemList",
      name: "Servicios de ADINI",
      itemListElement: ["/ia", "/dev", "/infra"].map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE_URL}${p}`,
        name: pageFor(p).service.name,
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}
