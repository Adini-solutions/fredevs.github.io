import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import Header from "../organisms/Header";
import Banner from "../organisms/Banner";
import Services from "../organisms/Services";
import Technologies from "../organisms/Technologies";
import AboutUs from "../organisms/AboutUs";
import Contact from "../organisms/Contact";
import Portfolio from "../organisms/Portfolio";
import Footer from "../organisms/Footer";
import WhatsAppIcon from "../molecules/WhatsAppIcon";
import TranslateButton from "../molecules/TranslateButton";

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
      <Header variant="infra" />
      <Box bg={"quarter.500"} overflowX={"hidden"}>
        <Box id="inicio">
          <Banner variant="infra" />
        </Box>
        <Box id="servicios">
          <Services variant="infra" />
        </Box>
        <Box id="contacto">
          <Contact variant="infra" />
        </Box>
        <Box id="nosotros">
          <AboutUs variant="infra" />
        </Box>
        <Footer />
        {isWhatsAppVisible && <WhatsAppIcon position={"fixed"} />}
        {isTranslateVisible && <TranslateButton position={"fixed"} />}
      </Box>
    </>
  );
}
