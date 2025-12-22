import { Box, Text, VStack, HStack, Flex } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import WhatsAppIcon from "../molecules/WhatsAppIcon";
import TranslateButton from "../molecules/TranslateButton";
import { useTranslation } from "react-i18next";
import { FiCode, FiServer, FiLayers } from "react-icons/fi";
import Button from "../molecules/Button";

const floatingVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.5, ease: "easeOut" } },
};

const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } },
};

const testimonialVariants = {
    enter: { opacity: 0, x: 20 },
    center: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.5, ease: "easeIn" } },
};

export default function Banner({ variant = "default" }) {
    const { t } = useTranslation();
    const [index, setIndex] = useState(0);

    const bannerConfig = {
        default: {
            span: "banner.span",
            titulo: "banner.titulo",
            subtitulo: "banner.subtitulo",
            boton: "banner.boton",
            reviews: "banner.reviews",
            icon: FiLayers,
            background: "/assets/images/banner.webp",
        },
        dev: {
            span: "bannerDev.span",
            titulo: "bannerDev.titulo",
            subtitulo: "bannerDev.subtitulo",
            boton: "bannerDev.boton",
            reviews: "bannerDev.reviews",
            icon: FiCode,
            background: "/assets/images/bannerDev.webp",
        },
        infra: {
            span: "bannerInfra.span",
            titulo: "bannerInfra.titulo",
            subtitulo: "bannerInfra.subtitulo",
            boton: "bannerInfra.boton",
            reviews: "bannerInfra.reviews",
            icon: FiServer,
            background: "/assets/images/bannerInfra.webp",
        },
    };

    const config = bannerConfig[variant];
    const Icon = config.icon;

    const testimonials = t(config.reviews, { returnObjects: true });

    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (!section) return;

        const offset = 120;
        const top = section.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({ top, behavior: "smooth" });
    };

    useEffect(() => {
        if (!testimonials?.length) return;

        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % testimonials.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [testimonials]);

    return (
        <Box position="relative" overflow="hidden" boxShadow="md">
            <Box
                height={{
                    base: `${window.innerHeight - 66}px`,
                    lg: `${window.innerHeight - 74}px`,
                }}
                display="flex"
                justifyContent="center"
                color="white"
                backgroundImage={`url('${config.background}')`}
                backgroundSize="cover"
                backgroundPosition="center"
                backgroundRepeat="no-repeat"
                px={{ base: 6, md: 12 }}
                position="relative"
            >
                <Box
                    position="absolute"
                    inset={0}
                    bg="linear-gradient(to right, rgba(7,30,55,0.9), rgba(7,30,55,0.5))"
                />

                <Flex w="100%" justify="space-around" align="center">
                    <VStack
                        align="flex-start"
                        zIndex={2}
                        maxW="700px"
                        spacing={6}
                        as={motion.div}
                        initial="hidden"
                        animate="visible"
                        variants={textVariants}
                    >
                        <HStack spacing={2}>
                            <Icon size={20} />
                            <Text m={0} fontSize={{ base: "sm", md: "md" }} fontWeight="bold" textTransform="uppercase">
                                {t(config.span)}
                            </Text>
                        </HStack>

                        <Text fontSize={{ base: "3xl", md: "4xl" }} fontWeight="bold" lineHeight="1.2">
                            {t(config.titulo)}
                        </Text>

                        <Text fontSize={{ base: "md", md: "lg" }} opacity={0.9}>
                            {t(config.subtitulo)}
                        </Text>

                        <Button onClick={() => scrollToSection("contacto")} text={t(config.boton)} variant={variant} />
                    </VStack>

                    <Flex
                        display={{ base: "none", lg: "flex" }}
                        gap={6}
                        flexDir="column"
                        w="700px"
                        align="center"
                    >
                        <Flex
                            w="350px"
                            px={1}
                            h="200px"
                            bg="rgba(255, 255, 255, 0.2)"
                            borderRadius="md"
                            backdropFilter="blur(10px)"
                            boxShadow="lg"
                            justifyContent="center"
                            alignItems="center"
                            textAlign="center"
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={index}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    variants={testimonialVariants}
                                    style={{ padding: "0 10px" }}
                                >
                                    <Text m={0} fontSize="lg" fontStyle="italic" fontWeight="medium" color="white">
                                        "{testimonials[index]}"
                                    </Text>
                                </motion.div>
                            </AnimatePresence>
                        </Flex>
                        <Flex gap={2}>
                            {testimonials.map((_, i) => (
                                <Box
                                    key={i}
                                    w={3}
                                    h={3}
                                    bg={i === index ? "white" : "gray.400"}
                                    borderRadius="50%"
                                />
                            ))}
                        </Flex>
                    </Flex>
                </Flex>

                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={floatingVariants}
                    style={{
                        position: "absolute",
                        top: "20%",
                        left: "-70px",
                        width: 120,
                        height: 120,
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.2)",
                    }}
                />

                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={floatingVariants}
                    style={{
                        position: "absolute",
                        bottom: "15%",
                        right: "-70px",
                        width: 120,
                        height: 120,
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.2)",
                    }}
                />

                <WhatsAppIcon position="absolute" />
                <TranslateButton position="absolute" />
            </Box>
        </Box>
    );
}
