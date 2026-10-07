import { Box, Flex, Text, Divider, IconButton, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure } from "@chakra-ui/react";
import { FaBars } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { useTranslation } from "react-i18next"; import { useNavigate } from "react-router-dom";

import { useEffect, useState } from 'react';
import Button from "../molecules/Button";
import { getAccent, getBrandIcon, getContactEmail } from "../../utils/variants";

export default function Header({ variant = "default", menuItems: menuItemsProp }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [backgroundColor, setBackgroundColor] = useState('linear-gradient(to right, rgba(7, 30, 55, 0.9), rgba(7, 30, 55, 0.5))');
  const [headerBoxShadow, setHeaderBoxShadow] = useState('');
  const [contactButtonStyle, setContactButtonStyle] = useState(false);
  const [logoColor, setLogoColor] = useState('white');
  const [variantColor, setVariantColor] = useState('white');
  const [itemsColor, setItemsColor] = useState('white');
  const [adiniIcon, setAdiniIcon] = useState('/assets/icons/adini-white.ico')

  const accent = getAccent(variant);

  const getHoverColor = () => (variant === "infra" ? accent.solid : accent.hover);

  const menuType = {
    default: ["inicio", "areas", "ia", "cases", "blog", "nosotros", "contacto"],
    dev: ["inicio", "servicios", "tecnologías", "proyectos", "proceso", "contacto", "nosotros"],
    infra: ["inicio", "servicios", "contacto", "nosotros"],
    ia: ["inicio", "servicios", "casos", "proceso", "faq", "contacto", "nosotros"],
  };

  const menuItems = menuItemsProp ?? menuType[variant] ?? menuType.default;

  const variantType = {
    dev: "dev",
    infra: "infra",
    ia: "ia",
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      const section2Offset = 860;

      if (scrollY >= section2Offset) {
        setBackgroundColor('white');
        setHeaderBoxShadow('md');
        setLogoColor(accent.deep);
        setVariantColor('gray.700');
        setItemsColor('gray.700');
        setAdiniIcon(getBrandIcon(variant));
        setContactButtonStyle(true);
      } else {
        setBackgroundColor('linear-gradient(to right, rgba(7, 30, 55, 0.9), rgba(7, 30, 55, 0.5))');
        setHeaderBoxShadow('')
        setLogoColor('white');
        setVariantColor('white');
        setItemsColor('white');
        setAdiniIcon("/assets/icons/adini-white.ico");
        setContactButtonStyle(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [variant, accent.deep]);

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

  return (
    <Box position="sticky" w="100%" height="auto" zIndex={10} top={0} transition="0.15s ease-in-out" bg={backgroundColor}>
      <Flex bg={backgroundColor} justifyContent="space-between" transition="0.15s ease-in-out" alignItems="center" py={{ base: 3, lg: 4 }} px={{ base: "30px", lg: "70px" }} boxShadow={headerBoxShadow}>
        <Flex align={"center"} onClick={() => scrollToSection("inicio")} cursor={"pointer"}>
          <Box
            width="33px"
            height="33px"
            mr={"7px"}
            mb={"4px"}
          >
            <img
              src={adiniIcon}
              alt="Adini"
            />
          </Box>
          <Flex align="flex-end" gap={2}>
            <Text
              my={0}
              fontSize="28px"
              color={logoColor}
              fontFamily="Poppins, sans-serif"
            >
              Adini
            </Text>

            {variantType[variant] && (
              <Text
                mb="7px"
                color={variantColor}
                fontSize="11px"
                letterSpacing="0.025em"
                textTransform="uppercase"

              >
                {variantType[variant]}
              </Text>
            )}
          </Flex>
        </Flex>

        <Flex display={{ base: "none", xl: "flex" }} gap={12} fontSize="md">

          {menuItems.map((section) => (
            <Text color={itemsColor} key={section} as="button" onClick={() => scrollToSection(section)} p="8px" _hover={{
              color: contactButtonStyle ? getHoverColor() : "#d2d1e3",
              cursor: "pointer",
            }}>
              {t(`header.${section}`)}
            </Text>
          ))}
          {variant !== "default" && (
            <Text
              as="button"
              onClick={() => navigateWithScroll("/")}
              fontWeight="semibold"
              color={itemsColor}
              _hover={{ color: getHoverColor() }}
            >
              ADINI
            </Text>
          )}
        </Flex>
        <Button
          display={{ base: "none", "2xl": "flex" }}
          leftIcon={<HiMail />}
          text={getContactEmail(variant)}
          variant={variant}
          fontSize={{ base: "sm", xl: "md" }}
          onClick={() => scrollToSection("contacto")}
          bg={contactButtonStyle ? "white" : undefined}
          color={contactButtonStyle ? accent.deep : undefined}
          _hover={contactButtonStyle ? { transform: "scale(1.05)", bg: "#f0f0f0" } : undefined}
        />
        <IconButton
          display={{ base: "flex", xl: "none" }}
          icon={<FaBars />}
          variant="ghost"
          aria-label="Open Menu"
          onClick={onOpen}
          fontSize="22px"
          color={logoColor}
        />

        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
          <DrawerOverlay bg="rgba(0, 0, 0, 0.4)" />
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
                      fontWeight="medium"
                      color="gray.700"
                      transition="0.3s ease-in-out"
                      _hover={{ color: getHoverColor(), transform: "translateX(5px)" }}
                    >
                      {t(`header.${section}`)}
                    </Text>
                  ))}
                  {variant !== "default" && (

                    <Text
                      as="button"
                      textAlign={"left"}
                      onClick={() => navigateWithScroll("/")}
                      fontSize="lg"
                      color="gray.700"
                      transition="0.3s ease-in-out"
                      _hover={{ color: getHoverColor(), transform: "translateX(5px)" }}
                    >
                      ADINI
                    </Text>
                  )}
                </Flex>

                <Box>
                  <Button
                    leftIcon={<HiMail />}
                    fontSize={"sm"}
                    text={getContactEmail(variant)}
                    variant={variant}
                    onClick={() => scrollToSection("contacto")}
                    w="full"
                  />

                  <Divider borderColor="gray.300" opacity={1} />

                  <Box mt={4} textAlign="center">
                    <Flex align="center" justify="center">
                      <Box width="30px" height="30px" mr="7px" mb="4px">
                        <img
                          src={getBrandIcon(variant)}
                          alt="Adini"
                        />
                      </Box>
                      <Text
                        my={0}
                        fontSize="25px"
                        color={accent.deep}
                        fontFamily="Poppins, sans-serif"
                        onClick={() => navigateWithScroll("/")}
                      >
                        Adini
                      </Text>
                    </Flex>
                  </Box>
                </Box>
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Flex>
    </Box>
  );
}
