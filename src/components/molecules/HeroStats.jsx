import { Box, Text, HStack, Flex, Grid } from "@chakra-ui/react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FiMapPin, FiArrowRight } from "react-icons/fi";

// Cifras verificables del sitio: proyectos del portfolio, organizaciones de
// "confían en nosotros", integrantes de "Nosotros" y países con clientes.
// Si cambian esas secciones, actualizar acá.
const stats = [
    { value: 19, key: "proyectos" },
    { value: 10, key: "organizaciones" },
    { value: 7, key: "equipo" },
    { value: 3, key: "paises" },
];

const caseVariants = {
    enter: { opacity: 0, y: 12 },
    center: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    exit: { opacity: 0, y: -12, transition: { duration: 0.4, ease: "easeIn" } },
};

// Cuenta de 0 al valor al aparecer el banner.
function CountUp({ value }) {
    const reduceMotion = useReducedMotion();
    const [display, setDisplay] = useState(reduceMotion ? value : 0);

    useEffect(() => {
        if (reduceMotion) return;
        const delay = 500;
        const duration = 1600;
        let start = null;
        let frame;
        const step = (time) => {
            if (start === null) start = time;
            const progress = Math.min(Math.max((time - start - delay) / duration, 0), 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.round(eased * value));
            if (progress < 1) frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
        return () => cancelAnimationFrame(frame);
    }, [value, reduceMotion]);

    return display;
}

export default function HeroStats({ primary, secondary, showCaseLink, onCaseClick }) {
    const { t } = useTranslation();
    const [index, setIndex] = useState(0);
    const cases = t("cases.items", { returnObjects: true });

    useEffect(() => {
        if (!cases?.length) return;
        const interval = setInterval(() => setIndex((prev) => (prev + 1) % cases.length), 4500);
        return () => clearInterval(interval);
    }, [cases]);

    const current = cases[index];

    // Barra de métricas anclada al pie del banner: una leyenda arriba y
    // celdas separadas por líneas finas; la última muestra los casos en
    // producción rotando. En el celular las cifras van de a dos.
    return (
        <Box>
            <Flex
                justify="space-between"
                align="center"
                direction={{ base: "column", md: "row" }}
                gap={2}
                mb={3}
                px={1}
                fontSize="xs"
                color="whiteAlpha.700"
            >
                <Text m={0} fontWeight="semibold" letterSpacing="0.12em" textTransform="uppercase">
                    {t("bannerStats.titulo")} · {t("bannerStats.desde")}
                </Text>
                <HStack spacing={1.5}>
                    <Box color={secondary}>
                        <FiMapPin size={13} />
                    </Box>
                    <Text m={0} fontSize="sm">{t("bannerStats.ubicacion")}</Text>
                </HStack>
            </Flex>

            <Grid
                templateColumns={{ base: "1fr 1fr", lg: "repeat(4, 1fr) 1.7fr" }}
                bg="rgba(255,255,255,0.05)"
                border="1px solid rgba(255,255,255,0.12)"
                borderRadius="2xl"
                backdropFilter="blur(14px)"
                boxShadow="0 20px 50px rgba(0,0,0,0.35)"
                overflow="hidden"
            >
                {stats.map(({ value, key }, i) => (
                    <Box
                        key={key}
                        px={{ base: 5, lg: 6 }}
                        py={{ base: 4, lg: 5 }}
                        borderLeft={{ base: i % 2 ? "1px solid rgba(255,255,255,0.1)" : "none", lg: i ? "1px solid rgba(255,255,255,0.1)" : "none" }}
                        borderTop={{ base: i > 1 ? "1px solid rgba(255,255,255,0.1)" : "none", lg: "none" }}
                    >
                        <Text
                            m={0}
                            fontFamily="'Poppins', sans-serif"
                            fontSize={{ base: "3xl", lg: "4xl" }}
                            fontWeight="bold"
                            lineHeight="1"
                            bgGradient={`linear(to-r, white, ${secondary})`}
                            bgClip="text"
                        >
                            <CountUp value={value} />
                        </Text>
                        <Text m={0} mt={1.5} fontSize="sm" lineHeight="1.3" color="whiteAlpha.700">
                            {t(`bannerStats.${key}`)}
                        </Text>
                    </Box>
                ))}

                <Box
                    gridColumn={{ base: "1 / -1", lg: "auto" }}
                    px={{ base: 5, lg: 6 }}
                    py={{ base: 4, lg: 5 }}
                    bg="rgba(255,255,255,0.04)"
                    borderLeft={{ base: "none", lg: "1px solid rgba(255,255,255,0.1)" }}
                    borderTop={{ base: "1px solid rgba(255,255,255,0.1)", lg: "none" }}
                >
                    <HStack spacing={2} mb={1.5}>
                        <Box position="relative" w="7px" h="7px">
                            <Box
                                as={motion.div}
                                position="absolute"
                                inset={0}
                                borderRadius="full"
                                bg="#34d399"
                                animate={{ scale: [1, 2.4], opacity: [0.7, 0] }}
                                transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                            />
                            <Box position="absolute" inset={0} borderRadius="full" bg="#34d399" />
                        </Box>
                        <Text m={0} fontSize="xs" fontWeight="semibold" letterSpacing="0.08em" textTransform="uppercase" color="whiteAlpha.700">
                            {t("bannerStats.enProduccion")}
                        </Text>
                    </HStack>

                    <AnimatePresence mode="wait">
                        <motion.div key={index} initial="enter" animate="center" exit="exit" variants={caseVariants}>
                            <Flex justify="space-between" align="flex-end" gap={4}>
                                <Box minW={0}>
                                    <Text m={0} fontSize="lg" fontWeight="bold" color="white" lineHeight="1.3">
                                        {current.titulo}
                                    </Text>
                                    <Text m={0} fontSize="sm" color="whiteAlpha.700" noOfLines={1}>
                                        {current.cliente} · {current.tipo}
                                    </Text>
                                </Box>
                                {showCaseLink && (
                                    <HStack
                                        as="button"
                                        onClick={onCaseClick}
                                        spacing={1}
                                        flexShrink={0}
                                        fontSize="sm"
                                        fontWeight="semibold"
                                        color={secondary}
                                        _hover={{ color: "white", "& svg": { transform: "translateX(3px)" } }}
                                        sx={{ "& svg": { transition: "transform 0.2s ease" } }}
                                    >
                                        <Text m={0}>{t("cases.verCaso")}</Text>
                                        <FiArrowRight />
                                    </HStack>
                                )}
                            </Flex>
                        </motion.div>
                    </AnimatePresence>

                    <Flex gap={1.5} mt={3}>
                        {cases.map((item, i) => (
                            <Box
                                key={item.titulo}
                                as="button"
                                aria-label={item.titulo}
                                onClick={() => setIndex(i)}
                                h="3px"
                                flex={1}
                                borderRadius="full"
                                bg={i === index ? primary : "whiteAlpha.300"}
                                transition="background 0.3s ease"
                            />
                        ))}
                    </Flex>
                </Box>
            </Grid>
        </Box>
    );
}
