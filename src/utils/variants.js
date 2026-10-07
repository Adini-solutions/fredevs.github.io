/**
 * Acentos por variante de marca.
 *
 * El sitio tiene tres pilares: Desarrollo (violeta), Infraestructura (verde) e
 * Inteligencia Artificial (púrpura). Cada componente recibe `variant` y saca de
 * acá sus colores, en vez de hardcodear el hex.
 *
 * Los valores de "default", "dev" e "infra" son exactamente los que ya estaban
 * dispersos por los componentes, así que el look de esas páginas no cambia.
 */
const ACCENTS = {
  default: {
    solid: "#6c63ff",
    hover: "#5548e6",
    deep: "#4d45d6",
    title: "#3d2b99",
    soft: "#a09bff",
    rgb: "108, 99, 255",
    tintBg: "#f1f0ff",
    gradientTo: "#2bb691",
  },
  dev: {
    solid: "#6c63ff",
    hover: "#5548e6",
    deep: "#4d45d6",
    title: "#3d2b99",
    soft: "#a09bff",
    rgb: "108, 99, 255",
    tintBg: "#f1f0ff",
    gradientTo: "#2bb691",
  },
  infra: {
    solid: "#238b6f",
    hover: "#1f7862",
    deep: "#238b6f",
    title: "#1f7862",
    soft: "#2bb691",
    rgb: "43, 182, 145",
    tintBg: "#f0fcf9",
    gradientTo: "#6c63ff",
  },
  ia: {
    solid: "#a855f7",
    hover: "#9333ea",
    deep: "#7e22ce",
    title: "#6b21a8",
    soft: "#d8b4fe",
    rgb: "168, 85, 247",
    tintBg: "#faf2ff",
    gradientTo: "#6c63ff",
  },
};

export function getAccent(variant) {
  return ACCENTS[variant] ?? ACCENTS.default;
}

/** Color del wordmark del Header cuando está sobre fondo blanco. */
export function getLogoColor(variant) {
  return getAccent(variant).deep;
}

/** Ícono del favicon/wordmark según la sub-marca. */
export function getBrandIcon(variant) {
  // TODO(adini): falta exportar un `adini-ia.ico` en púrpura; por ahora usa el violeta.
  return variant === "infra"
    ? "/assets/icons/adini-infra.ico"
    : "/assets/icons/adini.ico";
}

/** Namespace de i18n con los servicios y textos de cada área. */
export function getServiceNs(variant) {
  if (variant === "infra") return "infraServices";
  if (variant === "ia") return "aiServices";
  return "devServices";
}

/**
 * Casilla a la que van los formularios de cada área.
 *
 * TODO(adini): cuando exista la casilla ia@adini.com.ar y el Worker la acepte
 * como destinatario, cambiar IA_EMAIL por "ia@adini.com.ar". Hasta entonces los
 * leads de IA van a contacto@ para no perderlos en un rebote.
 */
const IA_EMAIL = "contacto@adini.com.ar";

export function getContactEmail(variant) {
  if (variant === "dev") return "dev@adini.com.ar";
  if (variant === "infra") return "infra@adini.com.ar";
  if (variant === "ia") return IA_EMAIL;
  return "contacto@adini.com.ar";
}

export default ACCENTS;
