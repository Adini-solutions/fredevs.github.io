import { useEffect, useState } from "react";

/**
 * true una vez que el hero (#inicio) quedó fuera de la pantalla.
 *
 * Las cuatro páginas lo usan para mostrar los botones flotantes de WhatsApp e
 * idioma recién después del banner.
 */
export default function useHeroPassed() {
  const [passed, setPassed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById("inicio");
      if (!hero) return;
      setPassed(hero.getBoundingClientRect().bottom < 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return passed;
}
