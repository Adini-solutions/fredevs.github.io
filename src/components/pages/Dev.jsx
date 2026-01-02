import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import Header from "../organisms/Header";
import Banner from "../organisms/Banner";
import DevServices from "../organisms/DevServices";
import Technologies from "../organisms/Technologies";
import AboutUs from "../organisms/AboutUs";
import Contact from "../organisms/Contact";
import Portfolio from "../organisms/Portfolio";
import Footer from "../organisms/Footer";
import WhatsAppIcon from "../molecules/WhatsAppIcon";
import TranslateButton from "../molecules/TranslateButton";
import SEO from "../../utils/SEO";

export default function Dev() {
  const [isWhatsAppVisible, setIsWhatsAppVisible] = useState(false);
  const [isTranslateVisible, setIsTranslateVisible] = useState(false);

  const handleScroll = () => {
    const inicio = document.getElementById("inicio");
    if (inicio) {
      const { bottom } = inicio.getBoundingClientRect();
      setIsTranslateVisible(bottom < 0);
      setIsWhatsAppVisible(bottom < 0);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
        <Box id="contacto">
          <Contact variant="dev" />
        </Box>
        <Box id="nosotros">
          <AboutUs variant="dev" />
        </Box>
        <Footer variant="dev" />
        {isWhatsAppVisible && <WhatsAppIcon position={"fixed"} />}
        {isTranslateVisible && <TranslateButton position={"fixed"} />}
      </Box>
    </>
  );
}
