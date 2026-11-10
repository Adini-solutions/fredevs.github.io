import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import es from "./locales/es.json";

// El sitio arranca en español; el inglés se descarga recién cuando alguien lo
// elige (ver setLanguage), así no pesa en la carga inicial.
i18n.use(initReactI18next).init({
    resources: { es: { translation: es } },
    lng: "es",
    fallbackLng: "es",
    interpolation: { escapeValue: false },
});

export async function setLanguage(lng) {
    if (!i18n.hasResourceBundle(lng, "translation")) {
        const { default: bundle } = await import(`./locales/${lng}.json`);
        i18n.addResourceBundle(lng, "translation", bundle);
    }
    return i18n.changeLanguage(lng);
}

export default i18n;
