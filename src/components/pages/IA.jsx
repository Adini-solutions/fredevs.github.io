import React, { useMemo } from "react";
import { Box } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import Header from "../organisms/Header";
import Banner from "../organisms/Banner";
import AIServices from "../organisms/AIServices";
import AICases from "../organisms/AICases";
import ProcessRoadmap from "../organisms/ProcessRoadmap";
import AIFaq from "../organisms/AIFaq";
import AboutUs from "../organisms/AboutUs";
import Contact from "../organisms/Contact";
import Footer from "../organisms/Footer";
import WhatsAppIcon from "../molecules/WhatsAppIcon";
import TranslateButton from "../molecules/TranslateButton";
import SEO from "../../utils/SEO";
import useHeroPassed from "../../utils/useHeroPassed";
import { realItems } from "../../utils/placeholders";
import {
  LuSearch,
  LuFlaskConical,
  LuRocket,
  LuGauge,
  LuRefreshCw,
} from "react-icons/lu";

const processIcons = [LuSearch, LuFlaskConical, LuRocket, LuGauge, LuRefreshCw];

export default function IA() {
  const { t } = useTranslation();
  const heroPassed = useHeroPassed();

  // Mientras no haya casos reales cargados, "casos" no aparece en el menu
  // porque la seccion tampoco se renderiza.
  const hasCases = realItems(t("aiCases.items", { returnObjects: true })).length > 0;

  const menuItems = useMemo(
    () =>
      [
        "inicio",
        "servicios",
        hasCases ? "casos" : null,
        "proceso",
        "faq",
        "contacto",
        "nosotros",
      ].filter(Boolean),
    [hasCases]
  );

  return (
    <>
      <SEO
        title="ADINI | Inteligencia Artificial aplicada a tu negocio"
        description="Agentes, asistentes con RAG sobre tus documentos y automatización de procesos con IA. Soluciones que llegan a producción, integradas a los sistemas que ya usas."
        canonical="https://adini.com.ar/ia"
        image="https://adini.com.ar/assets/images/bannerIA.webp"
      />

      <Header variant="ia" menuItems={menuItems} />
      <Box bg={"quarter.500"} overflowX={"hidden"}>
        <Box id="inicio">
          <Banner variant="ia" />
        </Box>
        <Box id="servicios">
          <AIServices variant="ia" />
        </Box>
        {hasCases && (
          <Box id="casos">
            <AICases variant="ia" />
          </Box>
        )}
        <Box id="proceso">
          <ProcessRoadmap ns="aiProcess" variant="ia" icons={processIcons} />
        </Box>
        <Box id="faq">
          <AIFaq variant="ia" />
        </Box>
        <Box id="contacto">
          <Contact variant="ia" />
        </Box>
        <Box id="nosotros">
          <AboutUs variant="ia" />
        </Box>
        <Footer variant="ia" menuItems={menuItems} />
        {heroPassed && <WhatsAppIcon position={"fixed"} />}
        {heroPassed && <TranslateButton position={"fixed"} />}
      </Box>
    </>
  );
}
