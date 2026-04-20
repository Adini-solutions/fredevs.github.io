import { Box, Flex, Text, VStack, Icon } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
    LuSearch,
    LuPencilRuler,
    LuCode,
    LuRocket,
    LuLifeBuoy,
} from "react-icons/lu";
import Title from "../molecules/Title";

const stepIcons = [LuSearch, LuPencilRuler, LuCode, LuRocket, LuLifeBuoy];

export default function ProcessRoadmap() {
    const { t } = useTranslation();
    const threshold = useMemo(() => (window.innerWidth < 768 ? 0.04 : 0.15), []);
    const { ref, inView } = useInView({ triggerOnce: true, threshold });

    const steps = t("process.steps", { returnObjects: true });

    return (
        <>
            <Title
                title={t("process.titulo")}
                subtitle={t("process.subtitulo")}
                mt="60px"
                mb="50px"
            />

            <Box
                bg="primary.500"
                py={{ base: 16, md: 20 }}
                px={{ base: 6, md: 16, xl: 24 }}
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
                    <Box display={{ base: "none", lg: "block" }}>
                        <Box position="relative" mb={8}>
                            <Box
                                position="absolute"
                                top="50%"
                                left="calc(10% + 28px)"
                                right="calc(10% + 28px)"
                                h="1px"
                                bg="rgba(255,255,255,0.1)"
                                transform="translateY(-50%)"
                                zIndex={0}
                            />
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={inView ? { scaleX: 1 } : {}}
                                transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                                style={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "calc(10% + 28px)",
                                    right: "calc(10% + 28px)",
                                    height: "2px",
                                    background: "linear-gradient(to right, #6c63ff, #2bb691)",
                                    transform: "translateY(-50%)",
                                    transformOrigin: "left",
                                    zIndex: 1,
                                }}
                            />

                            <Flex justify="space-around" position="relative" zIndex={2}>
                                {Array.isArray(steps) &&
                                    steps.map((_, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={inView ? { opacity: 1, scale: 1 } : {}}
                                            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 * i }}
                                        >
                                            <Flex direction="column" align="center" gap={2}>
                                                <Box
                                                    w="56px"
                                                    h="56px"
                                                    borderRadius="full"
                                                    bg="#12274d"
                                                    border="2px solid"
                                                    borderColor="#6c63ff"
                                                    display="flex"
                                                    alignItems="center"
                                                    justifyContent="center"
                                                    transition="all 0.3s ease"
                                                    cursor="default"
                                                    _hover={{
                                                        boxShadow: "0 0 16px rgba(108,99,255,0.4)",
                                                        transform: "scale(1.1)",
                                                    }}
                                                >
                                                    <Icon as={stepIcons[i]} boxSize={5} color="#a09bff" />
                                                </Box>
                                                <Text
                                                    m={0}
                                                    fontSize="xs"
                                                    fontWeight="800"
                                                    color="#a09bff"
                                                    letterSpacing="wider"
                                                >
                                                    {String(i + 1).padStart(2, "0")}
                                                </Text>
                                            </Flex>
                                        </motion.div>
                                    ))}
                            </Flex>
                        </Box>

                        <Flex justify="space-around" gap={4} align="stretch">
                            {Array.isArray(steps) &&
                                steps.map((step, i) => (
                                    <motion.div
                                        key={i}
                                        style={{ flex: 1, maxWidth: "220px" }}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={inView ? { opacity: 1, y: 0 } : {}}
                                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 * i + 0.4 }}
                                    >
                                        <Box
                                            bg="rgba(255,255,255,0.04)"
                                            borderRadius="2xl"
                                            p={6}
                                            h="100%"
                                            border="1px solid rgba(255,255,255,0.08)"
                                            transition="all 0.3s ease"
                                            role="group"
                                            _hover={{
                                                transform: "translateY(-3px)",
                                                bg: "rgba(108,99,255,0.08)",
                                                borderColor: "rgba(108,99,255,0.4)",
                                                boxShadow: "0 12px 32px rgba(0,0,0,0.3)",
                                            }}
                                        >
                                            <VStack align="start" spacing={3}>
                                                <Text
                                                    m={0}
                                                    fontSize="md"
                                                    fontWeight="800"
                                                    color="white"
                                                    lineHeight="1.3"
                                                >
                                                    {step.titulo}
                                                </Text>
                                                <Box
                                                    h="2px"
                                                    w="32px"
                                                    bg="linear-gradient(to right, #6c63ff, #2bb691)"
                                                    borderRadius="full"
                                                    transition="width 0.3s ease"
                                                    _groupHover={{ w: "56px" }}
                                                />
                                                <Text
                                                    m={0}
                                                    fontSize="sm"
                                                    color="whiteAlpha.600"
                                                    lineHeight="1.6"
                                                >
                                                    {step.descripcion}
                                                </Text>
                                            </VStack>
                                        </Box>
                                    </motion.div>
                                ))}
                        </Flex>
                    </Box>

                    <Box display={{ base: "block", lg: "none" }}>
                        <VStack spacing={0} align="stretch">
                            {Array.isArray(steps) &&
                                steps.map((step, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={inView ? { opacity: 1, x: 0 } : {}}
                                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 * i }}
                                    >
                                        <Flex gap={4} align="stretch">
                                            <Flex direction="column" align="center" flexShrink={0}>
                                                <Box
                                                    w="48px"
                                                    h="48px"
                                                    borderRadius="full"
                                                    bg="rgba(108,99,255,0.15)"
                                                    border="2px solid #6c63ff"
                                                    display="flex"
                                                    alignItems="center"
                                                    justifyContent="center"
                                                    flexShrink={0}
                                                >
                                                    <Icon as={stepIcons[i]} boxSize={5} color="#a09bff" />
                                                </Box>
                                                {i < steps.length - 1 && (
                                                    <Box
                                                        w="2px"
                                                        flexGrow={1}
                                                        bg="linear-gradient(to bottom, #6c63ff, #2bb691)"
                                                        my={1}
                                                    />
                                                )}
                                            </Flex>

                                            <Box
                                                flex={1}
                                                bg="rgba(255,255,255,0.04)"
                                                borderRadius="2xl"
                                                p={5}
                                                mb={i < steps.length - 1 ? 4 : 0}
                                                border="1px solid rgba(255,255,255,0.08)"
                                            >
                                                <Flex align="center" gap={2} mb={2}>
                                                    <Text
                                                        m={0}
                                                        fontSize="xs"
                                                        fontWeight="800"
                                                        color="#a09bff"
                                                        letterSpacing="wider"
                                                    >
                                                        {String(i + 1).padStart(2, "0")}
                                                    </Text>
                                                    <Text m={0} fontSize="md" fontWeight="800" color="white">
                                                        {step.titulo}
                                                    </Text>
                                                </Flex>
                                                <Text m={0} fontSize="sm" color="whiteAlpha.600" lineHeight="1.6">
                                                    {step.descripcion}
                                                </Text>
                                            </Box>
                                        </Flex>
                                    </motion.div>
                                ))}
                        </VStack>
                    </Box>
                </Box>
            </Box>
        </>
    );
}
