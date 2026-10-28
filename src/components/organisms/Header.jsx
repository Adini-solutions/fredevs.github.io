import { Box, Flex, Image, Text, Divider, IconButton, Button as ChakraButton, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure } from "@chakra-ui/react";
import { FaBars } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { useTranslation } from "react-i18next"; import { useNavigate } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";

import { useEffect, useRef, useState } from 'react';
import Button from "../molecules/Button";

export default function Header({ variant = "default" }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  // scrolled: el banner ya quedó atrás y el header pasa a blanco.
  const [scrolled, setScrolled] = useState(false);
  // atTop: todavía no se scrolleó; el header es transparente y se funde con
  // el fondo del banner.
  const [atTop, setAtTop] = useState(true);
  const [activeSection, setActiveSection] = useState("inicio");

  // Barra de progreso de lectura en el borde inferior del header.
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  const accent = variant === "infra" ? "#238b6f" : "#5548e6";
  const accentLight = variant === "infra" ? "#2fbf94" : "#8b85ff";
  const accentGradient = variant === "infra"
    ? "linear-gradient(90deg, #2fbf94, #22d3ee)"
    : "linear-gradient(90deg, #6c63ff, #22d3ee)";

  const menuType = {
    default: ["inicio", "areas", "ia", "cases", "blog", "nosotros", "contacto"],
    dev: ["inicio", "servicios", "tecnologías", "proyectos", "proceso", "contacto", "nosotros"],
    infra: ["inicio", "servicios", "contacto", "nosotros"],
  };

  const menuItems = menuType[variant]

  // Botón de contacto que viaja desde el banner hasta el header.
  const headerRef = useRef(null);
  const slotRef = useRef(null);
  const travelerRef = useRef(null);
  const ctaLabelRef = useRef(null);
  const mailLabelRef = useRef(null);
  const ctaText = { default: "banner.boton", dev: "bannerDev.boton", infra: "bannerInfra.boton" }[variant];
  const ctaBg = variant === "infra" ? "#238b6f" : "#6c63ff";

  // Logotipo oficial (isotipo + "Adini"), en blanco sobre el banner y a color
  // cuando el header pasa a blanco.
  const colorLogo = variant === "infra" ? "/assets/brand/adini-logotipo-infra.svg" : "/assets/brand/adini-logotipo-purple.svg";

  const variantType = {
    dev: "dev",
    infra: "infra",
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // El header pasa a blanco cuando termina el banner, cuyo alto depende
      // de la pantalla.
      const banner = document.getElementById("inicio");
      const section2Offset = banner ? banner.offsetHeight - 80 : 860;
      setScrolled(scrollY >= section2Offset);
      setAtTop(scrollY < 10);

      // Sección activa: la última cuyo inicio ya pasó por debajo del header.
      let current = menuType[variant][0];
      for (const id of menuType[variant]) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= 140) current = id;
      }
      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variant]);

  // El "Contáctanos" del banner (#hero-cta) se suelta cuando llega debajo
  // del header y, con el scroll, viaja hasta su lugar en el header (slotRef)
  // cambiando tamaño y texto. Llega justo cuando el header pasa a blanco.
  // Mientras viaja, el del banner queda oculto y se ve una copia fija
  // (travelerRef). Por debajo de lg no hay botón en el header y no viaja.
  useEffect(() => {
    const lerp = (a, b, p) => a + (b - a) * p;
    const ease = (p) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);

    const update = () => {
      const cta = document.getElementById("hero-cta");
      const banner = document.getElementById("inicio");
      const slot = slotRef.current;
      const traveler = travelerRef.current;
      if (!slot || !traveler) return;

      const slotRect = slot.getBoundingClientRect();
      if (!cta || !banner || !slotRect.width) {
        traveler.style.visibility = "hidden";
        if (cta) cta.style.visibility = "";
        return;
      }

      const scrollY = window.scrollY;
      const ctaRect = cta.getBoundingClientRect();
      const ctaTop = ctaRect.top + scrollY;
      const end = banner.offsetHeight - 80;
      const start = Math.max(0, Math.min(ctaTop - headerRef.current.offsetHeight - 16, end - 150));
      const p = Math.min(Math.max((scrollY - start) / (end - start), 0), 1);

      if (p === 0) {
        traveler.style.visibility = "hidden";
        cta.style.visibility = "";
        return;
      }

      const e = ease(p);
      const x = lerp(ctaRect.left, slotRect.left, e);
      const y = lerp(ctaTop - start, slotRect.top, e);
      traveler.style.transform = `translate(${x}px, ${y}px)`;
      traveler.style.width = `${lerp(ctaRect.width, slotRect.width, e)}px`;
      traveler.style.height = `${lerp(ctaRect.height, slotRect.height, e)}px`;
      traveler.style.fontSize = `${lerp(18, 16, e)}px`;
      traveler.style.boxShadow = `0 10px 30px -8px rgba(108, 99, 255, ${0.9 * (1 - e)})`;
      // El texto del banner se mantiene casi todo el viaje y se cruza con el
      // del header en el último tramo.
      ctaLabelRef.current.style.opacity = Math.min(1, Math.max(0, (0.85 - p) / 0.2));
      mailLabelRef.current.style.opacity = Math.min(1, Math.max(0, (p - 0.7) / 0.2));
      traveler.style.visibility = "visible";
      cta.style.visibility = "hidden";
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      const cta = document.getElementById("hero-cta");
      if (cta) cta.style.visibility = "";
    };
  }, [variant, i18n.language]);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      const offset = 120;
      const top = section.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({
        top: top,
        behavior: "smooth",
      });
      onClose();
    }
  };

  const navigateWithScroll = (path) => {
    navigate(path);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const itemsColor = scrolled ? "gray.700" : "whiteAlpha.900";

  // Subrayado con el degradé de la marca: crece desde el centro al pasar el
  // mouse y queda fijo en la sección activa.
  const underline = (active) => ({
    content: '""',
    position: "absolute",
    left: "10px",
    right: "10px",
    bottom: "2px",
    height: "2px",
    borderRadius: "full",
    background: accentGradient,
    transform: active ? "scaleX(1)" : "scaleX(0)",
    transition: "transform 0.25s ease",
  });

  return (
    <>
    {/* Fijo y encima del banner: arriba de todo es transparente, al bajar por
        el banner pasa al azul del fondo y, pasado el banner, a vidrio blanco. */}
    <Box
      as="header"
      ref={headerRef}
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={10}
      bg={scrolled ? "rgba(255, 255, 255, 0.82)" : atTop ? "transparent" : "rgba(5, 13, 31, 0.8)"}
      backdropFilter={atTop ? "none" : scrolled ? "saturate(180%) blur(14px)" : "blur(14px)"}
      borderBottom="1px solid"
      borderColor={scrolled ? "rgba(9, 28, 48, 0.08)" : atTop ? "transparent" : "rgba(255, 255, 255, 0.08)"}
      boxShadow={scrolled ? "0 8px 30px rgba(9, 28, 48, 0.08)" : "none"}
      transition="background 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease"
    >
      <Flex justifyContent="space-between" alignItems="center" py={{ base: 3, lg: 4 }} px={{ base: "30px", lg: "70px" }}>
        <Flex align={"center"} onClick={() => scrollToSection("inicio")} cursor={"pointer"}>
          <Flex align="flex-end" gap={2}>
            {/* Las dos versiones van encimadas y se cruzan con opacidad: cambiar
                el src parpadearía la primera vez que se carga la de color. El
                tamaño iguala lo que ocupaban antes el ícono y el texto. */}
            <Box position="relative" h="27px" w="103px" mb="3px" flexShrink={0}>
              <Image src="/assets/brand/adini-logotipo-white.svg" alt="Adini" position="absolute" inset={0} h="100%" opacity={scrolled ? 0 : 1} transition="opacity 0.3s ease" />
              <Image src={colorLogo} alt="" aria-hidden position="absolute" inset={0} h="100%" opacity={scrolled ? 1 : 0} transition="opacity 0.3s ease" />
            </Box>

            {variantType[variant] && (
              <Text
                mb="3px"
                px={2}
                py="1px"
                borderRadius="full"
                border="1px solid"
                borderColor={scrolled ? accent : "whiteAlpha.500"}
                color={scrolled ? accent : "white"}
                fontSize="10px"
                fontWeight="semibold"
                letterSpacing="0.08em"
                textTransform="uppercase"
                transition="all 0.3s ease"
              >
                {variantType[variant]}
              </Text>
            )}
          </Flex>
        </Flex>

        <Flex display={{ base: "none", xl: "flex" }} gap={{ xl: 2, "2xl": 6 }} fontSize="md" whiteSpace="nowrap" align="center">

          {menuItems.map((section) => {
            const active = activeSection === section;
            return (
              <Text
                key={section}
                as="button"
                m={0}
                onClick={() => scrollToSection(section)}
                position="relative"
                px="10px"
                py="8px"
                fontWeight={active ? "semibold" : "medium"}
                color={active ? (scrolled ? accent : "white") : itemsColor}
                transition="color 0.2s ease"
                _after={underline(active)}
                _hover={{
                  color: scrolled ? accent : "white",
                  _after: { transform: "scaleX(1)" },
                }}
              >
                {t(`header.${section}`)}
              </Text>
            );
          })}
          {(variant === "infra" || variant === "dev") && (
            <Text
              as="button"
              m={0}
              ml={2}
              px={3}
              py={1}
              borderRadius="full"
              border="1px solid"
              borderColor={scrolled ? "gray.300" : "whiteAlpha.400"}
              onClick={() => navigateWithScroll("/")}
              fontWeight="semibold"
              fontSize="sm"
              color={itemsColor}
              _hover={{ color: scrolled ? accent : accentLight, borderColor: scrolled ? accent : accentLight }}
            >
              ADINI
            </Text>
          )}
        </Flex>
        <Flex align="center" gap={3}>
          {/* Lugar del botón de contacto en el header. Siempre está oculto:
              lo que se ve es el botón que viaja desde el banner. */}
          <ChakraButton
            ref={slotRef}
            aria-hidden
            tabIndex={-1}
            visibility="hidden"
            display={{ base: "none", lg: "flex" }}
            leftIcon={<HiMail />}
            fontSize="md"
            borderRadius="full"
            px={6}
          >
            {t(ctaText)}
          </ChakraButton>
          <IconButton
            display={{ base: "flex", xl: "none" }}
            icon={<FaBars />}
            variant="ghost"
            aria-label="Open Menu"
            onClick={onOpen}
            fontSize="22px"
            color={scrolled ? accent : "white"}
            _hover={{ bg: scrolled ? "blackAlpha.50" : "whiteAlpha.200" }}
          />
        </Flex>

        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
          <DrawerOverlay bg="rgba(5, 13, 31, 0.5)" backdropFilter="blur(4px)" />
          <DrawerContent bg="white" p={4}>
            <DrawerCloseButton size="lg" color="gray.600" _hover={{ color: "black" }} />
            <DrawerHeader px={6} fontSize="xl" fontWeight="bold" color="gray.700">
              {t("header.menu")}
            </DrawerHeader>

            <Divider borderColor="gray.300" opacity={1} mt={2} />

            <DrawerBody>
              <Flex direction="column" justify={"space-between"} h={"100%"}>
                <Flex direction="column" gap={6}>
                  {menuItems.map((section) => (
                    <Text
                      key={section}
                      as="button"
                      textAlign={"left"}
                      onClick={() => scrollToSection(section)}
                      fontSize="md"
                      fontWeight={activeSection === section ? "semibold" : "medium"}
                      color={activeSection === section ? accent : "gray.700"}
                      borderLeft="3px solid"
                      borderColor={activeSection === section ? accent : "transparent"}
                      pl={3}
                      transition="0.3s ease-in-out"
                      _hover={{ color: accent, transform: "translateX(5px)" }}
                    >
                      {t(`header.${section}`)}
                    </Text>
                  ))}
                  {(variant === "infra" || variant === "dev") && (

                    <Text
                      as="button"
                      textAlign={"left"}
                      onClick={() => navigateWithScroll("/")}
                      fontSize="lg"
                      color="gray.700"
                      pl={3}
                      transition="0.3s ease-in-out"
                      _hover={{ color: accent, transform: "translateX(5px)" }}
                    >
                      ADINI
                    </Text>
                  )}
                </Flex>

                <Box>
                  <Button
                    leftIcon={<HiMail />}
                    fontSize={"sm"}
                    text={"contacto@adini.com.ar"}
                    variant={variant}
                    onClick={() => scrollToSection("contacto")}
                    w="full"
                    borderRadius="full"
                  />

                  <Divider borderColor="gray.300" opacity={1} />

                  <Box mt={4} textAlign="center">
                    <Flex align="center" justify="center">
                      <Image src={colorLogo} alt="Adini" h="25px" cursor="pointer" onClick={() => navigateWithScroll("/")} />
                    </Flex>
                  </Box>
                </Box>
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Flex>

      <motion.div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: -1,
          height: 2,
          background: accentGradient,
          transformOrigin: "0%",
          scaleX: progress,
        }}
      />
    </Box>

    {/* Va fuera del header: su backdropFilter haría que "fixed" se mida
        respecto del header y no de la ventana. */}
    <Box
      as="button"
      ref={travelerRef}
      onClick={() => scrollToSection("contacto")}
      position="fixed"
      top={0}
      left={0}
      zIndex={11}
      visibility="hidden"
      display={{ base: "none", lg: "block" }}
      bg={ctaBg}
      color="white"
      fontWeight="semibold"
      borderRadius="full"
      overflow="hidden"
      whiteSpace="nowrap"
      transition="background 0.2s ease"
      _hover={{ bg: variant === "infra" ? "#1f7862" : "#5548e6" }}
    >
      <Flex ref={ctaLabelRef} position="absolute" inset={0} align="center" justify="center">
        {t(ctaText)}
      </Flex>
      <Flex ref={mailLabelRef} position="absolute" inset={0} align="center" justify="center" gap={2} opacity={0}>
        <HiMail />
        {t(ctaText)}
      </Flex>
    </Box>
    </>
  );
}
