import { Box, Flex, Image, Text, Link } from "@chakra-ui/react";
import { FaLinkedin } from "react-icons/fa";
import Title from "../molecules/Title";
import { useTranslation } from "react-i18next";

export default function AboutUs({ variant = "default" }) {
    const { t } = useTranslation();

    const teamMembers = [
        {
            id: "agus",
            name: "Agustín Acevedo",
            role: `${t("aboutUs.devops")} | ${t("aboutUs.sysadmin")}`,
            image: "/assets/images/agus.png",
            linkedin: "https://www.linkedin.com/in/agustinezequielacevedo/",
        },
        {
            id: "alejo",
            name: "Alejo Suarez",
            role: `${t("aboutUs.desarrollador")} | ${t("aboutUs.analista")}`,
            image: "/assets/images/ale.png",
            linkedin: "https://www.linkedin.com/in/alejo-ezequiel-suarez/",
        },
        {
            id: "gabi",
            name: "Gabriel Olivieri",
            role: `${t("aboutUs.desarrollador")} | ${t("aboutUs.devops")}`,
            image: "/assets/images/gabi.png",
            linkedin: "https://www.linkedin.com/in/gabriel-olivieri-38437b1bb/",
        },
        {
            id: "juani",
            name: "Juan Ignacio Diaz",
            role: `${t("aboutUs.bi")} | ${t("aboutUs.desarrollador")}`,
            image: "/assets/images/juani.png",
            linkedin: "https://www.linkedin.com/in/juan-ignacio-diaz-puig-49ab08231/",
        },
        {
            id: "gon",
            name: "Gonzalo Suarez",
            role: `${t("aboutUs.desarrollador")} | ${t("aboutUs.analista")}`,
            image: "/assets/images/gon.png",
            linkedin: "https://www.linkedin.com/in/suarez-gonzalo/",
        },
        {
            id: "dani",
            name: "Daniel Piñero",
            role: `${t("aboutUs.sysadmin")} | ${t("aboutUs.devops")}`,
            image: "/assets/images/dani.png",
            linkedin: "https://www.linkedin.com/in/daniel-alberto-pi%C3%B1ero-104a83119/",
        },
        {
            id: "guido",
            name: "Guido Gelvan",
            role: `${t("aboutUs.analista")} | ${t("aboutUs.desarrollador")}`,
            image: "/assets/images/guido.png",
            linkedin: "https://www.linkedin.com/in/guido-gelvan-b47070210/",
        },
    ];

    const titleByVariant = {
        default: {
            title: t("aboutUs.titulo"),
            subtitle: t("aboutUs.subtitulo"),
        },
        dev: {
            title: t("aboutUs.tituloDev"),
            subtitle: t("aboutUs.subtituloDev"),
        },
        infra: {
            title: t("aboutUs.tituloInfra"),
            subtitle: t("aboutUs.subtituloInfra"),
        },
    };

    const currentTitle = titleByVariant[variant];

    const teamByVariant = {
        dev: ["juani", "alejo", "gon", "guido"],
        infra: ["gabi", "agus", "dani"],
    };

    const filteredTeam =
        variant === "default"
            ? teamMembers
            : teamMembers.filter(member =>
                teamByVariant[variant]?.includes(member.id)
            );

    return (
        <>
            <Title title={currentTitle.title} subtitle={currentTitle.subtitle} variant={variant} mt="60px" mb="60px" />

            <Flex align="center" justify="center">
                <Box maxW="1200px" textAlign="center" mx={{ base: "20px", md: "50px" }}>
                    <Flex justify="center" wrap="wrap" gap={{ base: "50px", md: 20 }}>
                        {filteredTeam.map((member, index) => (
                            <Box key={index} textAlign="center">
                                <Box position={"relative"}>
                                    <Image
                                        boxShadow="md"
                                        src={member.image}
                                        alt={member.name}
                                        borderRadius="full"
                                        boxSize={{ base: "130px", md: "180px" }}
                                        mx="auto"
                                        mb={4}
                                        borderBottom="1px solid #091c30"
                                    />
                                    <Link position={"absolute"} right={3} bottom={0} href={member.linkedin} isExternal>
                                        <Box
                                            as="span"
                                            display="inline-flex"
                                            alignItems="center"
                                            justifyContent="center"
                                            w="36px"
                                            h="36px"
                                            borderRadius="full"
                                            bg="#0077b5"
                                            transition="all 0.3s"
                                            _hover={{
                                                transform: "scale(1.1)",
                                            }}
                                        >
                                            <FaLinkedin size={20} color="white" />
                                        </Box>
                                    </Link>
                                </Box>
                                <Text m={0} color={'gray.700'} fontWeight="bold" fontSize={{ base: "sm", md: "xl" }}>
                                    {member.name}
                                </Text>
                                <Box my={2} color={'gray.700'} h="1px" bg={variant === "infra" ? "#238b6f" : "tertiary.500"}></Box>
                                <Text color="gray.500" fontSize={{ base: "xs", md: "md" }}>
                                    {member.role}
                                </Text>
                            </Box>
                        ))}
                    </Flex >
                </Box >
            </Flex >
        </>
    );
}
