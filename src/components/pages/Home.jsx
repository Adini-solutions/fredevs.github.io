import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import Header from "../organisms/Header";
import Banner from "../organisms/Banner";
import ServiceAreas from "../organisms/ServiceAreas";
import AboutUs from "../organisms/AboutUs";
import Contact from "../organisms/Contact";
import CaseStudies from "../organisms/CaseStudies";
import Blog from "../organisms/Blog";
import Footer from "../organisms/Footer";
import WhatsAppIcon from "../molecules/WhatsAppIcon";
import TranslateButton from "../molecules/TranslateButton";
import SEO from "../../utils/SEO";

export default function Home() {
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
        title="ADINI | Software Agency"
        description="Diseñamos e implementamos soluciones digitales integrales para empresas."
        canonical="https://adini.com.ar/"
        image="https://adini.com.ar/assets/images/banner.webp"
      />
      <Header />
      <Box bg={"quarter.500"} overflowX={"hidden"}>
        <Box id="inicio">
          <Banner />
        </Box>
        <Box id="areas">
          <ServiceAreas />
        </Box>
        <Box id="cases">
          <CaseStudies />
        </Box>
        <Box id="blog">
          <Blog />
        </Box>
        <Box id="nosotros">
          <AboutUs />
        </Box>
        <Box id="contacto">
          <Contact />
        </Box>
        <Footer />
        {isWhatsAppVisible && <WhatsAppIcon position={"fixed"} />}
        {isTranslateVisible && <TranslateButton position={"fixed"} />}
      </Box>
    </>
  );
}
