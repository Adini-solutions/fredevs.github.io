/**
 * Enlaces al sitio de casos de éxito (stories.adini.com.ar, repo `stories`).
 * Cada caso vive en `${STORIES_URL}/<slug>`.
 */
export const STORIES_URL = "https://stories.adini.com.ar";

export function storyUrl(slug) {
  return `${STORIES_URL}/${slug}`;
}
