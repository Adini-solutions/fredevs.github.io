import React from "react";
import { Box } from "@chakra-ui/react";
import Header from "../organisms/Header";
import Banner from "../organisms/Banner";
import ServiceAreas from "../organisms/ServiceAreas";
import AboutUs from "../organisms/AboutUs";
import Contact from "../organisms/Contact";
import AISection from "../organisms/AISection";
import CaseStudies from "../organisms/CaseStudies";
import Blog from "../organisms/Blog";
import Footer from "../organisms/Footer";
import WhatsAppIcon from "../molecules/WhatsAppIcon";
import TranslateButton from "../molecules/TranslateButton";
import SEO from "../../utils/SEO";
import useHeroPassed from "../../utils/useHeroPassed";

export default function Home() {
  const heroPassed = useHeroPassed();

  return (
    <>
      <SEO
        title="ADINI | Software Agency"
        description="Desarrollo de software, infraestructura cloud e inteligencia artificial aplicada. Diseñamos e implementamos soluciones digitales integrales para empresas."
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
        <Footer />
        {heroPassed && <WhatsAppIcon position={"fixed"} />}
        {heroPassed && <TranslateButton position={"fixed"} />}
      </Box>
    </>
  );
}
