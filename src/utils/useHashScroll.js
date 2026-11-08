import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Alias para que también funcionen variantes en inglés o sin tilde.
const ALIASES = {
  contact: "contacto",
  "contact-us": "contacto",
  contactanos: "contacto",
};

const HEADER_OFFSET = 80;

/**
 * Atajo por URL: si la página se abre con un hash (por ejemplo
 * adini.com.ar/#contacto o /dev#contacto) baja hasta esa sección. El salto
 * nativo del navegador no sirve porque la sección todavía no existe cuando
 * llega el HTML y además queda tapada por el header fijo.
 */
export default function useHashScroll() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;

    const raw = decodeURIComponent(hash.slice(1)).toLowerCase();
    const id = ALIASES[raw] || raw;

    const scroll = (behavior) => {
      const section = document.getElementById(id);
      if (!section) return false;
      const top = section.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
      window.scrollTo({ top, behavior });
      return true;
    };

    // Primer salto apenas se monta y un ajuste cuando terminan de cargar las
    // imágenes de arriba, que empujan la sección hacia abajo.
    const first = setTimeout(() => scroll("auto"), 150);
    const fix = () => scroll("auto");
    if (document.readyState === "complete") {
      setTimeout(fix, 900);
    } else {
      window.addEventListener("load", fix, { once: true });
    }

    return () => {
      clearTimeout(first);
      window.removeEventListener("load", fix);
    };
  }, [hash]);
}
