import { Box, Flex, Text, Icon, SimpleGrid, HStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { LuInbox, LuDatabase, LuZap, LuUserCheck, LuScrollText } from "react-icons/lu";
import Title from "../molecules/Title";

// Mismo orden que `iaPage.flujo.pasos` de los locales.
const ICONS = [LuInbox, LuDatabase, LuZap, LuUserCheck];
const BLUE = "#3b82f6";
const CYAN = "#22d3ee";

/**
 * Cómo funciona un agente, en cuatro pasos conectados por una línea que se
 * dibuja al entrar la sección. Debajo, la nota de trazabilidad.
 */
export default function AgentFlow() {
  const { t } = useTranslation();
  const threshold = useMemo(() => (window.innerWidth < 768 ? 0.04 : 0.2), []);
  const { ref, inView } = useInView({ triggerOnce: true, threshold });
  const steps = t("iaPage.flujo.pasos", { returnObjects: true });

  return (
    <>
      <Title variant="ia" title={t("iaPage.flujo.titulo")} subtitle={t("iaPage.flujo.subtitulo")} mt="60px" mb="50px" />

      <Box bg="primary.500" py={{ base: 16, md: 20 }} px={{ base: 5, md: 12, xl: 20 }} position="relative" overflow="hidden">
        <Box
          position="absolute"
          inset={0}
          pointerEvents="none"
          bg={`radial-gradient(circle at 10% 0%, ${BLUE}29, transparent 40%), radial-gradient(circle at 90% 100%, ${CYAN}1a, transparent 40%)`}
        />

        <Box maxW="1300px" mx="auto" position="relative" ref={ref}>
          <Text m={0} mb={{ base: 10, md: 14 }} maxW="720px" fontSize={{ base: "md", md: "lg" }} color="whiteAlpha.800" lineHeight="1.7">
            {t("iaPage.flujo.bajada")}
          </Text>

          <Box position="relative">
            {/* Línea que une los pasos (solo en pantallas anchas) */}
            <Box
              display={{ base: "none", lg: "block" }}
              position="absolute"
              top="28px"
              left="28px"
              right="calc(25% - 28px)"
              h="2px"
              bg="whiteAlpha.100"
              borderRadius="full"
              overflow="hidden"
            >
              <motion.div
                style={{ height: "100%", background: `linear-gradient(90deg, ${BLUE}, ${CYAN})`, transformOrigin: "0%" }}
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 1.6, ease: "easeInOut", delay: 0.2 }}
              />
            </Box>

            <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={{ base: 8, lg: 8 }}>
              {Array.isArray(steps) &&
                steps.map((step, i) => (
                  <motion.div
                    key={step.titulo}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 + i * 0.35 }}
                  >
                    <Flex
                      boxSize="56px"
                      borderRadius="full"
                      align="center"
                      justify="center"
                      bg="#0f2440"
                      border="2px solid"
                      borderColor={i === steps.length - 1 ? CYAN : BLUE}
                      boxShadow={`0 0 0 6px #091c30, 0 0 24px ${i === steps.length - 1 ? CYAN : BLUE}55`}
                      color="white"
                      position="relative"
                      zIndex={1}
                    >
                      <Icon as={ICONS[i]} boxSize={6} />
                    </Flex>
                    <Text m={0} mt={5} fontSize="xs" fontWeight="700" letterSpacing="widest" color="#93c5fd">
                      {String(i + 1).padStart(2, "0")}
                    </Text>
                    <Text m={0} mt={1} fontSize="xl" fontWeight="800" color="white">
                      {step.titulo}
                    </Text>
                    <Text m={0} mt={2} color="whiteAlpha.700" lineHeight="1.6">
                      {step.texto}
                    </Text>
                  </motion.div>
                ))}
            </SimpleGrid>
          </Box>

          <HStack
            mt={{ base: 12, md: 14 }}
            spacing={4}
            align="flex-start"
            p={{ base: 5, md: 6 }}
            borderRadius="2xl"
            bg="rgba(255,255,255,0.04)"
            border="1px solid rgba(255,255,255,0.09)"
          >
            <Flex boxSize="40px" flexShrink={0} borderRadius="lg" align="center" justify="center" bg={`${CYAN}1f`} color={CYAN}>
              <Icon as={LuScrollText} boxSize={5} />
            </Flex>
            <Box>
              <Text m={0} fontWeight="700" color="white">
                {t("iaPage.flujo.trazaTitulo")}
              </Text>
              <Text m={0} mt={1} color="whiteAlpha.700" lineHeight="1.6">
                {t("iaPage.flujo.trazaTexto")}
              </Text>
            </Box>
          </HStack>
        </Box>
      </Box>
    </>
  );
}
