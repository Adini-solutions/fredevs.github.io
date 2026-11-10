import { Box, Flex, Text, Icon, SimpleGrid } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { LuMessagesSquare, LuFileText, LuChartColumn, LuWorkflow, LuBriefcaseBusiness, LuBookOpen } from "react-icons/lu";
import Title from "../molecules/Title";

// Mismo orden que `iaPage.usos.items` de los locales.
const ICONS = [LuMessagesSquare, LuFileText, LuChartColumn, LuWorkflow, LuBriefcaseBusiness, LuBookOpen];
const ACCENT = "#3b82f6";

/**
 * Qué resuelve un agente: cada tarjeta cuenta cómo se hace hoy la tarea y
 * qué cambia con un agente, sin métricas (los números están en los casos).
 */
export default function AgentUseCases() {
  const { t } = useTranslation();
  const threshold = useMemo(() => (window.innerWidth < 768 ? 0.04 : 0.12), []);
  const { ref, inView } = useInView({ triggerOnce: true, threshold });
  const items = t("iaPage.usos.items", { returnObjects: true });

  return (
    <>
      <Title variant="ia" title={t("iaPage.usos.titulo")} subtitle={t("iaPage.usos.subtitulo")} mt="50px" mb="40px" />

      <SimpleGrid
        ref={ref}
        columns={{ base: 1, md: 2, xl: 3 }}
        spacing={{ base: 5, md: 6 }}
        maxW="1400px"
        mx="auto"
        px={{ base: 5, md: 12, xl: 20 }}
      >
        {Array.isArray(items) &&
          items.map((item, i) => (
            <motion.div
              key={item.titulo}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: "easeOut", delay: (i % 3) * 0.08 }}
              style={{ height: "100%" }}
            >
              <Flex
                direction="column"
                h="100%"
                bg="white"
                borderRadius="2xl"
                border="1px solid"
                borderColor="gray.100"
                boxShadow="md"
                p={{ base: 6, md: 7 }}
                transition="all 0.3s ease"
                _hover={{ transform: "translateY(-4px)", boxShadow: "xl", borderColor: `${ACCENT}55` }}
              >
                <Flex boxSize="48px" borderRadius="xl" align="center" justify="center" bg={`${ACCENT}14`} color={ACCENT} mb={5}>
                  <Icon as={ICONS[i]} boxSize={6} />
                </Flex>
                <Text m={0} fontSize="xl" fontWeight="800" color="gray.800">
                  {item.titulo}
                </Text>

                <Box mt={4}>
                  <Text m={0} fontSize="xs" fontWeight="700" letterSpacing="wider" textTransform="uppercase" color="gray.400">
                    {t("iaPage.usos.hoy")}
                  </Text>
                  <Text m={0} mt={1} color="gray.600" lineHeight="1.6">
                    {item.hoy}
                  </Text>
                </Box>

                <Box mt={4} pt={4} borderTop="1px dashed" borderColor="gray.200">
                  <Text m={0} fontSize="xs" fontWeight="700" letterSpacing="wider" textTransform="uppercase" color={ACCENT}>
                    {t("iaPage.usos.conAgente")}
                  </Text>
                  <Text m={0} mt={1} color="gray.800" lineHeight="1.6">
                    {item.agente}
                  </Text>
                </Box>
              </Flex>
            </motion.div>
          ))}
      </SimpleGrid>
    </>
  );
}
