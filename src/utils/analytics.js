// Google Analytics 4. El ID entra en el build (REACT_APP_GA_ID); sin ID no se carga nada,
// así `npm start` no ensucia las métricas.
const GA_ID = process.env.REACT_APP_GA_ID;

let initialized = false;

export function initAnalytics() {
  if (!GA_ID || initialized || typeof window === "undefined") return;
  initialized = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  // El page_view lo mandamos a mano en cada cambio de ruta (es una SPA).
  window.gtag("config", GA_ID, { send_page_view: false });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
}

export function trackPageView(path) {
  if (!GA_ID || !window.gtag) return;
  window.gtag("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}
