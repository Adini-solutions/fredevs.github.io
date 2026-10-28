import { Box, Text, VStack, HStack, Flex, Button as ChakraButton } from "@chakra-ui/react";
import { motion } from "framer-motion";
import WhatsAppIcon from "../molecules/WhatsAppIcon";
import HeroNetwork from "../molecules/HeroNetwork";
import HeroStats from "../molecules/HeroStats";
import { useTranslation } from "react-i18next";
import { FiCode, FiServer, FiLayers, FiCloud, FiCpu, FiDatabase, FiGitBranch, FiArrowRight } from "react-icons/fi";
import Button from "../molecules/Button";

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease: "easeOut" },
});

// Anillos orbitales detrás del titular: núcleo, servicios y nube. Giran
// lento, alternando el sentido, con satélites que los recorren.
const rings = [
    { size: 760, duration: 70, direction: 1, dashed: true, satellites: [30, 210] },
    { size: 1080, duration: 110, direction: -1, dashed: false, satellites: [100, 250, 330] },
    { size: 1400, duration: 150, direction: 1, dashed: true, satellites: [60, 190] },
];

// Etiquetas ancladas sobre el anillo del medio (radio 540), a los costados
// del titular. x/y son el punto del anillo respecto del centro.
const chips = [
    { icon: FiCloud, label: "Cloud", x: -516, y: -160, delay: 0 },
    { icon: FiDatabase, label: "Data", x: -526, y: 120, delay: 1.2 },
    { icon: FiCpu, label: "AI / LLM", x: 511, y: -175, delay: 0.6 },
    { icon: FiGitBranch, label: "CI/CD", x: 528, y: 110, delay: 1.8 },
];

export default function Banner({ variant = "default" }) {
    const { t } = useTranslation();

    const bannerConfig = {
        default: {
            span: "banner.span",
            titulo: "banner.titulo",
            subtitulo: "banner.subtitulo",
            boton: "banner.boton",
            secundario: { text: "cases.verTodos", section: "cases" },
            icon: FiLayers,
            primary: "#6c63ff",
            secondary: "#22d3ee",
            titleTint: "#c4c1ff",
        },
        dev: {
            span: "bannerDev.span",
            titulo: "bannerDev.titulo",
            subtitulo: "bannerDev.subtitulo",
            boton: "bannerDev.boton",
            secundario: { text: "header.proyectos", section: "proyectos" },
            icon: FiCode,
            primary: "#6c63ff",
            secondary: "#c084fc",
            titleTint: "#d8c4ff",
        },
        infra: {
            span: "bannerInfra.span",
            titulo: "bannerInfra.titulo",
            subtitulo: "bannerInfra.subtitulo",
            boton: "bannerInfra.boton",
            secundario: { text: "header.servicios", section: "servicios" },
            icon: FiServer,
            primary: "#2fbf94",
            secondary: "#22d3ee",
            titleTint: "#b5f0dc",
        },
    };

    const config = bannerConfig[variant];
    const Icon = config.icon;

    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (!section) return;

        const offset = 120;
        const top = section.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({ top, behavior: "smooth" });
    };

    return (
        <Box position="relative" overflow="hidden">
            {/* El header va encima del banner (ver Header.jsx), por eso el
                banner ocupa toda la pantalla y deja lugar arriba. */}
            <Flex
                minH={`${window.innerHeight}px`}
                direction="column"
                align="center"
                color="white"
                bg="#050d1f"
                px={{ base: 5, md: 12 }}
                pt={{ base: "100px", lg: "110px" }}
                pb="88px"
                position="relative"
            >
                {/* Halos con los colores de la marca */}
                <Box
                    position="absolute"
                    inset={0}
                    pointerEvents="none"
                    bg={`radial-gradient(circle at 80% 10%, ${config.primary}55, transparent 40%),
                         radial-gradient(circle at 15% 85%, ${config.secondary}2e, transparent 40%),
                         radial-gradient(circle at 50% 45%, #0b2447, #050d1f 75%)`}
                />

                {/* Grilla tenue que se desvanece hacia los bordes */}
                <Box
                    position="absolute"
                    inset={0}
                    pointerEvents="none"
                    opacity={0.5}
                    backgroundImage="linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)"
                    backgroundSize="56px 56px"
                    sx={{
                        maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
                        WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
                    }}
                />

                <HeroNetwork primary={config.primary} secondary={config.secondary} />

                {/* Foco oscuro detrás del titular para que se lea sobre la red */}
                <Box
                    position="absolute"
                    inset={0}
                    pointerEvents="none"
                    bg="radial-gradient(ellipse 55% 45% at 50% 45%, rgba(5,13,31,0.85), rgba(5,13,31,0) 100%)"
                />

                <Flex flex={1} w="100%" align="center" justify="center" position="relative" py={{ base: 6, lg: 10 }}>
                    {/* Sistema orbital: un punto de tamaño cero en el centro del
                        titular desde el que se dibujan anillos y etiquetas. */}
                    <Box
                        position="absolute"
                        top="50%"
                        left="50%"
                        w={0}
                        h={0}
                        pointerEvents="none"
                        transform={{ base: "scale(0.5)", md: "scale(0.8)", xl: "scale(1)" }}
                    >
                        {rings.map(({ size, duration, direction, dashed, satellites }) => (
                            <motion.div
                                key={size}
                                animate={{ rotate: 360 * direction }}
                                transition={{ duration, repeat: Infinity, ease: "linear" }}
                                style={{
                                    position: "absolute",
                                    width: size,
                                    height: size,
                                    left: -size / 2,
                                    top: -size / 2,
                                    borderRadius: "50%",
                                    border: `1px ${dashed ? "dashed" : "solid"} rgba(255,255,255,${dashed ? 0.1 : 0.08})`,
                                }}
                            >
                                {satellites.map((angle, i) => (
                                    <Box
                                        key={angle}
                                        position="absolute"
                                        top="50%"
                                        left="50%"
                                        w="6px"
                                        h="6px"
                                        ml="-3px"
                                        mt="-3px"
                                        borderRadius="full"
                                        bg={i % 2 ? config.primary : config.secondary}
                                        boxShadow={`0 0 12px 2px ${i % 2 ? config.primary : config.secondary}`}
                                        transform={`rotate(${angle}deg) translateX(${size / 2}px)`}
                                    />
                                ))}
                            </motion.div>
                        ))}

                        {chips.map(({ icon: ChipIcon, label, x, y, delay }) => (
                            <Box key={label} position="absolute" left={`${x}px`} top={`${y}px`} transform="translate(-50%, -50%)" display={{ base: "none", xl: "block" }}>
                                <HStack
                                    as={motion.div}
                                    spacing={2}
                                    px={3}
                                    py={2}
                                    borderRadius="lg"
                                    bg="rgba(10,25,50,0.7)"
                                    border="1px solid rgba(255,255,255,0.14)"
                                    backdropFilter="blur(10px)"
                                    boxShadow="0 8px 24px rgba(0,0,0,0.3)"
                                    fontSize="sm"
                                    fontWeight="medium"
                                    whiteSpace="nowrap"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1, y: [0, -8, 0] }}
                                    transition={{
                                        opacity: { duration: 0.8, delay: 0.8 + delay / 2 },
                                        y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay },
                                    }}
                                >
                                    <Box color={config.secondary}>
                                        <ChipIcon size={16} />
                                    </Box>
                                    <Text m={0}>{label}</Text>
                                </HStack>
                            </Box>
                        ))}
                    </Box>

                    <VStack spacing={{ base: 5, md: 7 }} textAlign="center" maxW="980px" position="relative">
                        <HStack
                            as={motion.div}
                            {...fadeUp(0)}
                            spacing={2}
                            px={3}
                            py={1.5}
                            borderRadius="full"
                            bg="rgba(255,255,255,0.06)"
                            border="1px solid rgba(255,255,255,0.14)"
                            backdropFilter="blur(8px)"
                        >
                            <Box position="relative" w="8px" h="8px">
                                <Box
                                    as={motion.div}
                                    position="absolute"
                                    inset={0}
                                    borderRadius="full"
                                    bg={config.secondary}
                                    animate={{ scale: [1, 2.4], opacity: [0.7, 0] }}
                                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                                />
                                <Box position="absolute" inset={0} borderRadius="full" bg={config.secondary} />
                            </Box>
                            <Icon size={16} />
                            <Text m={0} fontSize={{ base: "xs", md: "sm" }} fontWeight="semibold" letterSpacing="0.08em" textTransform="uppercase">
                                {t(config.span)}
                            </Text>
                        </HStack>

                        <Text
                            as={motion.h1}
                            {...fadeUp(0.15)}
                            m={0}
                            fontFamily="'Poppins', sans-serif"
                            fontSize={{ base: "4xl", md: "6xl", "2xl": "7xl" }}
                            fontWeight="bold"
                            lineHeight="1.05"
                            letterSpacing="-0.03em"
                            bgGradient={`linear(to-b, white 45%, ${config.titleTint})`}
                            bgClip="text"
                            sx={{ textWrap: "balance" }}
                        >
                            {t(config.titulo)}
                        </Text>

                        <Text
                            as={motion.p}
                            {...fadeUp(0.3)}
                            m={0}
                            fontSize={{ base: "md", md: "xl" }}
                            color="whiteAlpha.800"
                            maxW="640px"
                            sx={{ textWrap: "balance" }}
                        >
                            {t(config.subtitulo)}
                        </Text>

                        <Flex as={motion.div} {...fadeUp(0.45)} gap={3} wrap="wrap" justify="center" pt={1}>
                            <Button
                                id="hero-cta"
                                onClick={() => scrollToSection("contacto")}
                                text={t(config.boton)}
                                variant={variant}
                                size="lg"
                                px={8}
                                borderRadius="full"
                                boxShadow={`0 10px 30px -8px ${config.primary}`}
                            />
                            <ChakraButton
                                onClick={() => scrollToSection(config.secundario.section)}
                                size="lg"
                                px={7}
                                borderRadius="full"
                                bg="whiteAlpha.100"
                                color="white"
                                border="1px solid"
                                borderColor="whiteAlpha.400"
                                backdropFilter="blur(8px)"
                                rightIcon={<FiArrowRight />}
                                _hover={{ bg: "whiteAlpha.200", borderColor: "whiteAlpha.600" }}
                                _active={{ bg: "whiteAlpha.300" }}
                            >
                                {t(config.secundario.text)}
                            </ChakraButton>
                        </Flex>
                    </VStack>
                </Flex>

                <Box as={motion.div} {...fadeUp(0.6)} w="100%" maxW="1180px" position="relative" zIndex={2}>
                    <HeroStats
                        primary={config.primary}
                        secondary={config.secondary}
                        showCaseLink={variant === "default"}
                        onCaseClick={() => scrollToSection("cases")}
                    />
                </Box>

                <WhatsAppIcon position="absolute" />
            </Flex>
        </Box>
    );
}
