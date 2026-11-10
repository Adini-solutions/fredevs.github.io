import { Box, Grid, GridItem, Image, Text, Link, Icon, VStack, HStack, Divider } from "@chakra-ui/react";
import { FaLinkedin, FaEnvelope, FaInstagram, FaFacebook } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import { STORIES_URL } from "../../utils/stories";
import { CURSO_URL } from "../../utils/curso";


export default function Footer({ variant = "default", mt = "70px" }) {
    const { t } = useTranslation();

    const menuType = {
        default: ["inicio", "areas", "ia", "cases", "blog", "nosotros", "contacto"],
        dev: ["inicio", "servicios", "tecnologías", "proyectos", "proceso", "contacto", "nosotros"],
        infra: ["inicio", "servicios", "contacto", "nosotros"],
        ia: ["inicio", "soluciones", "funcionamiento", "casos", "metodo", "preguntas", "contacto"],
    };

    const empresaLinks = menuType[variant].map((item) => {
        const label = t(`footer.empresa.${item}`, { defaultValue: item });

        return (
            <Link
                key={item}
                href={`#${item}`}
                onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item);
                }}
                _hover={{ color: "white" }}
            >
                {label}
            </Link>
        );
    });


    const information = {
        name: "Adini",
        email: "contacto@adini.com.ar",
        instagram: "https://www.instagram.com/adini.solutions/",
        linkedin: "https://www.linkedin.com/company/adiniar",
        facebook: "https://www.facebook.com/profile.php?id=61581291992126",
    };

    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            const offset = 120;
            const top = section.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({
                top: top,
                behavior: "smooth",
            });
        }
    };

    return (
        <Box bg="primary.500" color="gray.400" mt={mt} pt={12} px={{ base: 6, md: 20 }}>
            <Grid
                templateColumns={{ base: "1fr 1fr", md: "2fr 1fr 1fr 1fr" }}
                gap={{ base: 8, md: 10 }}
                textAlign={{ base: "center", md: "left" }}
            >
                <GridItem colSpan={{ base: 2, md: 1 }}>
                    <Image src="/assets/brand/adini-logotipo-white.svg" alt={information.name} h="2.25rem" mx={{ base: "auto", md: 0 }} mb={3} />
                    <Text fontSize="sm" mt={2} mb={0} maxW={{ base: "auto", md: "450px" }}>
                        {t("footer.descripcion")}
                    </Text>
                </GridItem>

                <Divider display={{ base: "inherit", md: "none" }} gridColumn="1 / -1" opacity={.2} my={0} />

                <GridItem>
                    <Text fontWeight="bold" color="white" mb={3}>{t("footer.empresa.titulo")}</Text>
                    <VStack align={{ base: "center", md: "start" }} spacing={2}>
                        {empresaLinks}
                    </VStack>
                </GridItem>

                <GridItem>
                    <Text fontWeight="bold" color="white" mb={3}>
                        {t("footer.areas.titulo")}
                    </Text>
                    <VStack align={{ base: "center", md: "start" }} spacing={2}>
                        <Link
                            as={RouterLink}
                            to="/ia"
                            _hover={{ color: "white" }}
                        >
                            {t("footer.areas.ia")}
                        </Link>

                        <Link
                            as={RouterLink}
                            to="/dev"
                            _hover={{ color: "white" }}
                        >
                            {t("footer.areas.desarrollo")}
                        </Link>

                        <Link
                            as={RouterLink}
                            to="/infra"
                            _hover={{ color: "white" }}
                        >
                            {t("footer.areas.infra")}
                        </Link>

                        <Link href={STORIES_URL} isExternal _hover={{ color: "white" }}>
                            {t("footer.areas.casos")}
                        </Link>

                        <Link href={CURSO_URL} isExternal _hover={{ color: "white" }}>
                            {t("footer.areas.curso")}
                        </Link>
                    </VStack>
                </GridItem>

                <GridItem colSpan={{ base: 2, md: 1 }}>
                    <Text fontWeight="bold" color="white" mb={3}>{t("footer.redes.titulo")}</Text>
                    <HStack justify={{ base: "center", md: "start" }} spacing={4}>
                        <Link href={information.instagram} isExternal aria-label="Instagram de ADINI">
                            <Icon as={FaInstagram} w={5} h={5} _hover={{ color: "white" }} />
                        </Link>
                        <Link href={information.linkedin} isExternal aria-label="LinkedIn de ADINI">
                            <Icon as={FaLinkedin} w={5} h={5} _hover={{ color: "white" }} />
                        </Link>
                        <Link href={information.facebook} isExternal aria-label="Facebook de ADINI">
                            <Icon as={FaFacebook} w={5} h={5} _hover={{ color: "white" }} />
                        </Link>
                        <Link href={`mailto:${information.email}`} aria-label={`Escribir a ${information.email}`}>
                            <Icon as={FaEnvelope} w={5} h={5} _hover={{ color: "white" }} />
                        </Link>
                    </HStack>
                </GridItem>
            </Grid>

            <Divider opacity={.6} my={8} />

            <Box pb={8}>
                <Text textAlign={"center"} m={0} fontSize="sm">
                    © {new Date().getFullYear()} {information.name}. {t("footer.end")}
                </Text>
            </Box>
        </Box>
    );
}
