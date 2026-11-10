import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NUMBER = "5491144123760";
const PAGES = { "/ia": "ia", "/dev": "dev", "/infra": "infra" };

/**
 * Enlace de WhatsApp con un mensaje precargado que dice desde qué página
 * escribe la persona (y, si eligió uno en el contacto, el tema). Así se sabe
 * de dónde llega cada consulta, por ejemplo las de la campaña a /ia.
 */
export function useWhatsAppUrl(topic) {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const page = PAGES[pathname.replace(/\/+$/, "")] ?? "default";
  const origin = `adini.com.ar${page === "default" ? "" : `/${page}`}`;
  const text = topic
    ? t("whatsapp.tema", { pagina: origin, tema: topic.charAt(0).toLowerCase() + topic.slice(1) })
    : t(`whatsapp.${page}`);
  return `https://wa.me/${NUMBER}?text=${encodeURIComponent(text)}`;
}
