import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { LuSearch, LuPencilRuler, LuFlaskConical, LuRocket, LuRefreshCw } from "react-icons/lu";
import Header from "../organisms/Header";
import Banner from "../organisms/Banner";
import AgentUseCases from "../organisms/AgentUseCases";
import AgentFlow from "../organisms/AgentFlow";
import CaseStudies from "../organisms/CaseStudies";
import ProcessRoadmap from "../organisms/ProcessRoadmap";
import WhyAdini from "../organisms/WhyAdini";
import FAQ from "../organisms/FAQ";
import Contact from "../organisms/Contact";
import Footer from "../organisms/Footer";
import WhatsAppIcon from "../molecules/WhatsAppIcon";
import TranslateButton from "../molecules/TranslateButton";
import SEO from "../../utils/SEO";
import useHashScroll from "../../utils/useHashScroll";

const PROCESS_ICONS = [LuSearch, LuPencilRuler, LuFlaskConical, LuRocket, LuRefreshCw];

/**
 * Página de agentes de IA (destino de la campaña). Un solo objetivo: llevar
 * al contacto, sin desvíos a otras áreas.
 */
export default function IA() {
  useHashScroll();
  const [isWhatsAppVisible, setIsWhatsAppVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const inicio = document.getElementById("inicio");
      if (inicio) setIsWhatsAppVisible(inicio.getBoundingClientRect().bottom < 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <SEO
        title="ADINI | Agentes de IA para empresas e instituciones"
        description="Diseñamos agentes de IA que consultan tus sistemas y documentos, ejecutan tareas y escalan a una persona cuando hace falta, con tus datos bajo control."
        canonical="https://adini.com.ar/ia"
        image="https://adini.com.ar/assets/brand/og-image.jpg"
      />

      <Header variant="ia" />
      <Box bg={"quarter.500"} overflowX={"hidden"}>
        <Box id="inicio">
          <Banner variant="ia" />
        </Box>
        <Box id="soluciones">
          <AgentUseCases />
        </Box>
        <Box id="funcionamiento">
          <AgentFlow />
        </Box>
        <Box id="casos">
          <CaseStudies variant="ia" />
        </Box>
        <Box id="metodo">
          <ProcessRoadmap ns="processIa" icons={PROCESS_ICONS} variant="ia" />
        </Box>
        <WhyAdini />
        <Box id="preguntas">
          <FAQ />
        </Box>
        <Box id="contacto">
          <Contact variant="ia" />
        </Box>
        <Footer variant="ia" mt={0} />
        {isWhatsAppVisible && <WhatsAppIcon position={"fixed"} />}
        <TranslateButton />
      </Box>
    </>
  );
}
