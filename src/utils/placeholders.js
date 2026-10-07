/**
 * Guardas para el contenido que todavía espera datos reales.
 *
 * Los bloques nuevos de IA vienen con textos marcados como "[COMPLETAR: ...]"
 * (o "[TO DO: ...]" en inglés). Estas funciones evitan que ese texto llegue a
 * la web publicada: la sección se oculta sola hasta que haya contenido real.
 */
const MARKERS = ["[COMPLETAR", "[TO DO"];

export function isPlaceholder(value) {
  if (typeof value !== "string") return false;
  const text = value.trim();
  return MARKERS.some((marker) => text.startsWith(marker));
}

/** true si algún valor de texto del objeto/array sigue siendo plantilla. */
export function hasPlaceholder(value) {
  if (typeof value === "string") return isPlaceholder(value);
  if (Array.isArray(value)) return value.some(hasPlaceholder);
  if (value && typeof value === "object") return Object.values(value).some(hasPlaceholder);
  return false;
}

/** Deja solo los elementos completamente cargados. */
export function realItems(list) {
  return (Array.isArray(list) ? list : []).filter((item) => !hasPlaceholder(item));
}
