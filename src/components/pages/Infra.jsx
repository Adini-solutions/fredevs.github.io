import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import Header from "../organisms/Header";
import Banner from "../organisms/Banner";
import InfraServices from "../organisms/InfraServices";
import AboutUs from "../organisms/AboutUs";
import Contact from "../organisms/Contact";
import Footer from "../organisms/Footer";
import WhatsAppIcon from "../molecules/WhatsAppIcon";
import TranslateButton from "../molecules/TranslateButton";
import SEO from "../../utils/SEO";

export default function Infra() {
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
        title="ADINI | Infrastructure & Cloud Services"
        description="Soluciones tecnológicas en infraestructura, cloud y servicios IT."
        canonical="https://adini.com.ar/infra"
        image="https://adini.com.ar/assets/images/infra.webp"
      />

      <Header variant="infra" />
      <Box bg={"quarter.500"} overflowX={"hidden"}>
        <Box id="inicio">
          <Banner variant="infra" />
        </Box>
        <Box id="servicios">
          <InfraServices variant="infra" />
        </Box>
        <Box id="contacto">
          <Contact variant="infra" />
        </Box>
        <Box id="nosotros">
          <AboutUs variant="infra" />
        </Box>
        <Footer variant="infra" />
        {isWhatsAppVisible && <WhatsAppIcon position={"fixed"} />}
        {isTranslateVisible && <TranslateButton position={"fixed"} />}
      </Box>
    </>
  );
}
