import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { initAnalytics, trackPageView } from "../utils/analytics.js";

// Manda un page_view a GA cada vez que cambia la ruta (/, /dev, /infra, /ia).
export default function RouteTracker() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    // Pequeña espera para que Helmet actualice el <title> de la página nueva.
    const id = setTimeout(() => trackPageView(pathname + search), 200);
    return () => clearTimeout(id);
  }, [pathname, search]);

  return null;
}
