import React, { Suspense, lazy, useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import Header from "../organisms/Header";
import Banner from "../organisms/Banner";
import DevServices from "../organisms/DevServices";
import ProcessRoadmap from "../organisms/ProcessRoadmap";
import AboutUs from "../organisms/AboutUs";
import Contact from "../organisms/Contact";
import Footer from "../organisms/Footer";
import WhatsAppIcon from "../molecules/WhatsAppIcon";
import TranslateButton from "../molecules/TranslateButton";
import SEO from "../../utils/SEO";
import useHashScroll from "../../utils/useHashScroll";

// Tecnologías y portfolio usan react-slick (y su CSS): van en un archivo aparte
// para no sumar ese peso al home ni a /ia.
const Technologies = lazy(() => import("../organisms/Technologies"));
const Portfolio = lazy(() => import("../organisms/Portfolio"));

export default function Dev() {
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
      <SEO />
      <Header variant="dev" />
      <Box bg={"quarter.500"} overflowX={"hidden"}>
        <Box id="inicio">
          <Banner variant="dev" />
        </Box>
        <Box id="servicios">
          <DevServices variant="dev" />
        </Box>
        <Box id="tecnologías">
          <Suspense fallback={null}>
            <Technologies />
          </Suspense>
        </Box>
        <Box id="proyectos">
          <Suspense fallback={null}>
            <Portfolio />
          </Suspense>
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
        {isWhatsAppVisible && <WhatsAppIcon position={"fixed"} />}
        <TranslateButton />
      </Box>
    </>
  );
}
