import { Box, Flex, Text, VStack, HStack, Icon, SimpleGrid } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
    LuBrainCircuit,
    LuMessageSquare,
    LuZap,
    LuDatabase,
    LuFileSearch,
    LuChartBar,
} from "react-icons/lu";
import Title from '../molecules/Title';
import Button from "../molecules/Button";

const capabilityIcons = [
    LuMessageSquare,
    LuZap,
    LuBrainCircuit,
    LuDatabase,
    LuFileSearch,
    LuChartBar,
];

export default function AISection() {
    const { t } = useTranslation();
    const threshold = useMemo(() => (window.innerWidth < 768 ? 0.04 : 0.15), []);
    const { ref, inView } = useInView({ triggerOnce: true, threshold });

    const capabilities = t("aiSection.capabilities", { returnObjects: true });

    const scrollToContact = () => {
        const section = document.getElementById("contacto");
        if (!section) return;
        const top = section.getBoundingClientRect().top + window.scrollY - 120;
        window.scrollTo({ top, behavior: "smooth" });
    };

    return (
        <>
            <Title title={t("aiSection.titulo")} subtitle={t("aiSection.subtitulo")} mt="60px" mb="50px" />

            <Box
                bg="primary.500"
                py={{ base: 16, md: 20 }}
                px={{ base: 8, md: 20 }}
                position="relative"
                overflow="hidden"
            >
                <Box
                    position="absolute"
                    top="-80px"
                    left="-80px"
                    w="350px"
                    h="350px"
                    borderRadius="full"
                    bg="rgba(108, 99, 255, 0.08)"
                    filter="blur(60px)"
                    pointerEvents="none"
                />
                <Box
                    position="absolute"
                    bottom="-60px"
                    right="-60px"
                    w="300px"
                    h="300px"
                    borderRadius="full"
                    bg="rgba(43, 182, 145, 0.07)"
                    filter="blur(60px)"
                    pointerEvents="none"
                />

                <Box maxW="1400px" mx="auto" ref={ref}>
                    <Flex
                        direction={{ base: "column", lg: "row" }}
                        align={{ base: "flex-start", lg: "center" }}
                        gap={{ base: 12, lg: 20 }}
                    >
                        <motion.div
                            style={{ flex: 1 }}
                            initial={{ opacity: 0, x: -40 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <VStack align="flex-start" spacing={6}>
                                <HStack spacing={3}>
                                    <Text
                                        m={0}
                                        fontSize="xs"
                                        fontWeight="bold"
                                        letterSpacing="widest"
                                        textTransform="uppercase"
                                        color="#a09bff"
                                    >
                                        {t("aiSection.label")}
                                    </Text>
                                </HStack>

                                <Text
                                    m={0}
                                    fontSize={{ base: "3xl", md: "4xl" }}
                                    fontWeight="800"
                                    color="white"
                                    lineHeight="1.2"
                                >
                                    {t("aiSection.caratula")}
                                </Text>

                                <Text
                                    m={0}
                                    fontSize={{ base: "md", md: "lg" }}
                                    color="whiteAlpha.700"
                                    lineHeight="1.7"
                                    maxW="520px"
                                >
                                    {t("aiSection.descripcion")}
                                </Text>

                                <Button
                                    onClick={scrollToContact}
                                    text={t("aiSection.cta")}
                                    variant="default"
                                />
                            </VStack>
                        </motion.div>

                        <motion.div
                            style={{ flex: 1 }}
                            initial={{ opacity: 0, x: 40 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
                        >
                            <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4}>
                                {Array.isArray(capabilities) &&
                                    capabilities.map((cap, i) => (
                                        <HStack
                                            key={i}
                                            spacing={3}
                                            p={4}
                                            borderRadius="xl"
                                            bg="rgba(255,255,255,0.04)"
                                            border="1px solid rgba(255,255,255,0.08)"
                                            transition="all 0.3s ease"
                                            role="group"
                                        >
                                            <Box
                                                p={2}
                                                borderRadius="lg"
                                                bg="rgba(108, 99, 255, 0.12)"
                                                flexShrink={0}
                                            >
                                                <Icon
                                                    as={capabilityIcons[i] ?? LuBrainCircuit}
                                                    boxSize={4}
                                                    color="#a09bff"
                                                />
                                            </Box>
                                            <Text
                                                m={0}
                                                fontSize={{ base: "sm", sm: "md" }}
                                                fontWeight="600"
                                                lineHeight="1.3"
                                                color={"white"}
                                            >
                                                {cap}
                                            </Text>
                                        </HStack>
                                    ))}
                            </SimpleGrid>
                        </motion.div>
                    </Flex>
                </Box>
            </Box >
        </>
    );
}
