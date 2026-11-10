import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import Header from "../organisms/Header";
import Banner from "../organisms/Banner";
import ServiceAreas from "../organisms/ServiceAreas";
import AboutUs from "../organisms/AboutUs";
import Contact from "../organisms/Contact";
import AISection from "../organisms/AISection";
import CaseStudies from "../organisms/CaseStudies";
import TrustedBy from "../organisms/TrustedBy";
import Blog from "../organisms/Blog";
import Footer from "../organisms/Footer";
import WhatsAppIcon from "../molecules/WhatsAppIcon";
import TranslateButton from "../molecules/TranslateButton";
import SEO from "../../utils/SEO";
import useHashScroll from "../../utils/useHashScroll";

export default function Home() {
  useHashScroll();
  const [isWhatsAppVisible, setIsWhatsAppVisible] = useState(false);

  const handleScroll = () => {
    const inicio = document.getElementById("inicio");
    if (inicio) {
      const { bottom } = inicio.getBoundingClientRect();
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
        title="ADINI | Agentes de IA y software a medida"
        description="Diseñamos, integramos y operamos agentes de IA, software a medida e infraestructura para empresas e instituciones."
        canonical="https://adini.com.ar/"
        image="https://adini.com.ar/assets/brand/og-image.jpg"
      />
      <Header />
      <Box bg={"quarter.500"} overflowX={"hidden"}>
        <Box id="inicio">
          <Banner />
        </Box>
        <TrustedBy />
        <Box id="areas">
          <ServiceAreas />
        </Box>
        <Box id="ia">
          <AISection />
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
        <Footer mt={0} />
        {isWhatsAppVisible && <WhatsAppIcon position={"fixed"} />}
        <TranslateButton />
      </Box>
    </>
  );
}
