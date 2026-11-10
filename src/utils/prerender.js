/**
 * true cuando la página llegó pre-renderizada (scripts/prerender.js marca el
 * #root con data-prerendered). En ese caso el contenido ya está a la vista
 * cuando React arranca, así que las animaciones de entrada del hero y los
 * contadores no se repiten: se muestran directo en su estado final.
 */
export const PRERENDERED =
  typeof document !== "undefined" && document.getElementById("root")?.dataset.prerendered === "true";
