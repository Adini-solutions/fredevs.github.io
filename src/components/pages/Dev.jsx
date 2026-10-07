import React from "react";
import { Box } from "@chakra-ui/react";
import Header from "../organisms/Header";
import Banner from "../organisms/Banner";
import DevServices from "../organisms/DevServices";
import ProcessRoadmap from "../organisms/ProcessRoadmap";
import Technologies from "../organisms/Technologies";
import AboutUs from "../organisms/AboutUs";
import Contact from "../organisms/Contact";
import Portfolio from "../organisms/Portfolio";
import Footer from "../organisms/Footer";
import WhatsAppIcon from "../molecules/WhatsAppIcon";
import TranslateButton from "../molecules/TranslateButton";
import SEO from "../../utils/SEO";
import useHeroPassed from "../../utils/useHeroPassed";

export default function Dev() {
  const heroPassed = useHeroPassed();

  return (
    <>
      <SEO
        title="ADINI | Desarrollo de Software"
        description="Desarrollo web, aplicaciones móviles y software a medida para empresas."
        canonical="https://adini.com.ar/dev"
        image="https://adini.com.ar/assets/images/dev.webp"
      />
      <Header variant="dev" />
      <Box bg={"quarter.500"} overflowX={"hidden"}>
        <Box id="inicio">
          <Banner variant="dev" />
        </Box>
        <Box id="servicios">
          <DevServices variant="dev" />
        </Box>
        <Box id="tecnologías">
          <Technologies />
        </Box>
        <Box id="proyectos">
          <Portfolio />
        </Box>
        <Box id="proceso">
          <ProcessRoadmap />
        </Box>
        <Box id="contacto">
          <Contact variant="dev" />
        </Box>
        <Box id="nosotros">
          <AboutUs variant="dev" />
        </Box>
        <Footer variant="dev" />
        {heroPassed && <WhatsAppIcon position={"fixed"} />}
        {heroPassed && <TranslateButton position={"fixed"} />}
      </Box>
    </>
  );
}
