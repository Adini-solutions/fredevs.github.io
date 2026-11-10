/**
 * Datos de SEO de cada página indexable. Es la única fuente: los usa el
 * componente SEO (título, descripción, canonical, Open Graph y JSON-LD) y los
 * scripts de build (sitemap.xml y prerender). Sin JSX ni imports, para que
 * Node lo pueda leer tal cual.
 *
 * Para sumar una página: agregala acá y en src/navigation/Navigation.jsx.
 */
export const SITE_URL = "https://adini.com.ar";
export const OG_IMAGE = `${SITE_URL}/assets/brand/og-image.jpg`;

export const PAGES = [
  {
    path: "/",
    title: "ADINI | Agentes de IA y software a medida",
    description:
      "ADINI diseña, integra y opera agentes de IA, software a medida e infraestructura para empresas e instituciones. Partner oficial de la UTN FRBA.",
    priority: "1.0",
    changefreq: "weekly",
  },
  {
    path: "/ia",
    title: "Agentes de IA para empresas | ADINI",
    description:
      "Agentes de IA que consultan tus sistemas y documentos y ejecutan tareas, en tus servidores o en la nube, con tus datos bajo control. Partner oficial de la UTN FRBA.",
    priority: "0.9",
    changefreq: "weekly",
    breadcrumb: "Agentes de IA",
    service: {
      name: "Agentes de IA para empresas",
      serviceType: "Desarrollo e implementación de agentes de IA",
      description:
        "Diseño, integración y operación de agentes de IA que trabajan con la información y los sistemas de cada organización, con modelos en servidores propios o en la nube.",
    },
  },
  {
    path: "/dev",
    title: "Desarrollo de software a medida | ADINI",
    description:
      "Desarrollo web, aplicaciones móviles y software a medida para empresas e instituciones, integrado con los sistemas que ya usan.",
    priority: "0.8",
    changefreq: "monthly",
    breadcrumb: "Desarrollo de software",
    service: {
      name: "Desarrollo de software a medida",
      serviceType: "Desarrollo de software",
      description: "Sistemas web, aplicaciones móviles e integraciones a medida, escalables y mantenibles.",
    },
  },
  {
    path: "/infra",
    title: "Infraestructura y cloud para empresas | ADINI",
    description:
      "Diseñamos y operamos infraestructuras seguras y escalables: datacenter, cloud e híbrido, redes, seguridad, datos y monitoreo.",
    priority: "0.8",
    changefreq: "monthly",
    breadcrumb: "Infraestructura y cloud",
    service: {
      name: "Infraestructura y cloud",
      serviceType: "Servicios de infraestructura IT y cloud",
      description: "Diseño, implementación y operación de infraestructura on-premise, cloud e híbrida, con seguridad y monitoreo.",
    },
  },
];

export function pageFor(path) {
  return PAGES.find((p) => p.path === path);
}
