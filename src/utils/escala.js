/**
 * Convierte una medida en px a rem para que acompañe la escala global del
 * sitio (ver `styles.global` en `theme.js`): en pantallas intermedias el
 * tamaño base baja y todo lo que está en rem se achica junto.
 */
export const rem = (px) => `${parseFloat(px) / 16}rem`;
