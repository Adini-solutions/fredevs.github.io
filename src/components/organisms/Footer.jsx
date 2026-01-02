import { Box, Grid, GridItem, Text, Link, Icon, VStack, HStack, Divider } from "@chakra-ui/react";
import { FaLinkedin, FaEnvelope, FaInstagram, FaFacebook } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";


export default function Footer({ variant = "default" }) {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const menuType = {
        default: ["inicio", "areas", "cases", "blog", "nosotros", "contacto"],
        dev: ["inicio", "servicios", "tecnologías", "proyectos", "contacto", "nosotros"],
        infra: ["inicio", "servicios", "contacto", "nosotros"],
    };

    const empresaLinks = menuType[variant].map((item) => {
        const label = t(`footer.empresa.${item}`, { defaultValue: item });

        return (
            <Link
                key={item}
                onClick={() => (scrollToSection(item))}
                _hover={{ color: "white" }}
            >
                {label}
            </Link>
        );
    });

    const navigateWithScroll = (path) => {
        navigate(path);
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const information = {
        name: "Adini",
        email: "contacto@adini.com",
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
        <Box bg="primary.500" color="gray.400" mt={"70px"} pt={12} px={{ base: 6, md: 20 }}>
            <Grid
                templateColumns={{ base: "1fr", md: "2fr 1fr 1fr 1fr" }}
                gap={10}
                textAlign={{ base: "center", md: "left" }}
            >
                <GridItem>
                    <Text fontSize="2xl" color="white" fontFamily="Poppins, sans-serif">
                        {information.name}
                    </Text>
                    <Text fontSize="sm" mt={2} mb={0} maxW={{ base: "auto", md: "450px" }}>
                        {t("footer.descripcion")}
                    </Text>
                </GridItem>

                <Divider display={{ base: "inherit", md: "none" }} opacity={.2} my={0} />

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
                            onClick={() => navigateWithScroll("/dev")}
                            _hover={{ color: "white", cursor: "pointer" }}
                        >
                            {t("footer.areas.desarrollo")}
                        </Link>

                        <Link
                            onClick={() => navigateWithScroll("/infra")}
                            _hover={{ color: "white", cursor: "pointer" }}
                        >
                            {t("footer.areas.infra")}
                        </Link>
                    </VStack>
                </GridItem>

                <GridItem>
                    <Text fontWeight="bold" color="white" mb={3}>{t("footer.redes.titulo")}</Text>
                    <HStack justify={{ base: "center", md: "start" }} spacing={4}>
                        <Link href={information.instagram} isExternal>
                            <Icon as={FaInstagram} w={5} h={5} _hover={{ color: "white" }} />
                        </Link>
                        <Link href={information.linkedin} isExternal>
                            <Icon as={FaLinkedin} w={5} h={5} _hover={{ color: "white" }} />
                        </Link>
                        <Link href={information.facebook} isExternal>
                            <Icon as={FaFacebook} w={5} h={5} _hover={{ color: "white" }} />
                        </Link>
                        <Link href={`mailto:${information.email}`} isExternal>
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
