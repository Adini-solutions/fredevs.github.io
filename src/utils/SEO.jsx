import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { SITE_URL, OG_IMAGE, pageFor } from "../seo/pages.js";
import { pageSchema } from "../seo/schema.js";

/**
 * Head de cada página a partir de src/seo/pages.js. Las etiquetas por defecto
 * de public/index.html llevan data-rh="true", así Helmet las reemplaza en vez
 * de duplicarlas. `noindex` es para páginas que no deben indexarse (404).
 */
export default function SEO({ noindex = false }) {
  const { pathname } = useLocation();
  const path = pathname.replace(/\/+$/, "") || "/";
  const page = pageFor(path);

  if (noindex || !page) {
    return (
      <Helmet>
        <title>Página no encontrada | ADINI</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>
    );
  }

  const url = `${SITE_URL}${page.path}`;
  return (
    <Helmet>
      <title>{page.title}</title>
      <meta name="description" content={page.description} />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="ADINI" />
      <meta property="og:locale" content="es_AR" />
      <meta property="og:title" content={page.title} />
      <meta property="og:description" content={page.description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={OG_IMAGE} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={page.title} />
      <meta name="twitter:description" content={page.description} />
      <meta name="twitter:image" content={OG_IMAGE} />

      <script type="application/ld+json">{JSON.stringify(pageSchema(page.path))}</script>
    </Helmet>
  );
}
