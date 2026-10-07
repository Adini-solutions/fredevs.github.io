import { Box, Flex, Text, Stack, Tag, Icon, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { LuTrendingUp } from "react-icons/lu";
import Title from "../molecules/Title";
import { getAccent } from "../../utils/variants";
import { realItems } from "../../utils/placeholders";

/**
 * Casos de IA con su resultado medido.
 *
 * Mientras `aiCases.items` siga con los textos de plantilla, la seccion entera
 * no se renderiza: preferimos que la pagina no hable de resultados antes que
 * mostrar cifras inventadas.
 */
export default function AICases({ variant = "ia" }) {
  const { t } = useTranslation();
  const threshold = useMemo(() => (window.innerWidth < 768 ? 0.04 : 0.15), []);
  const { ref, inView } = useInView({ triggerOnce: true, threshold });
  const accent = getAccent(variant);

  const cases = realItems(t("aiCases.items", { returnObjects: true }));

  if (cases.length === 0) return null;

  return (
    <>
      <Title
        title={t("aiCases.titulo")}
        subtitle={t("aiCases.subtitulo")}
        variant={variant}
        mt="60px"
        mb="40px"
      />

      <Box px={{ base: 6, md: 12, xl: 20 }} maxW="1280px" mx="auto" ref={ref}>
        <Stack spacing={{ base: 8, lg: 10 }}>
          {cases.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 * index }}
            >
              <Flex
                bg="white"
                borderRadius="2xl"
                border="1px solid"
                borderColor="gray.100"
                boxShadow="md"
                p={{ base: 6, md: 8 }}
                gap={{ base: 6, lg: 10 }}
                direction={{ base: "column", lg: "row" }}
                align={{ base: "stretch", lg: "center" }}
              >
                <VStack align="start" spacing={3} flex="1">
                  <Text
                    m={0}
                    fontSize="xs"
                    fontWeight="bold"
                    letterSpacing="wider"
                    textTransform="uppercase"
                    color={accent.deep}
                  >
                    {item.cliente}
                  </Text>

                  <Text m={0} fontSize={{ base: "xl", md: "2xl" }} fontWeight="800" color="gray.800" lineHeight="1.3">
                    {item.titulo}
                  </Text>

                  <Text m={0} fontSize="md" color="gray.600" lineHeight="1.7">
                    {item.descripcion}
                  </Text>

                  {Array.isArray(item.tech) && item.tech.length > 0 && (
                    <Flex wrap="wrap" gap={2} pt={1}>
                      {item.tech.map((tech, i) => (
                        <Tag key={i} size="sm" bg="gray.100" color="gray.600" borderRadius="full">
                          {tech}
                        </Tag>
                      ))}
                    </Flex>
                  )}
                </VStack>

                <Flex
                  direction="column"
                  justify="center"
                  align="center"
                  textAlign="center"
                  gap={2}
                  bg={accent.tintBg}
                  border="1px solid"
                  borderColor={`rgba(${accent.rgb}, 0.25)`}
                  borderRadius="xl"
                  p={6}
                  minW={{ base: "auto", lg: "260px" }}
                  flexShrink={0}
                >
                  <Icon as={LuTrendingUp} boxSize={6} color={accent.deep} />
                  <Text
                    m={0}
                    fontSize="xs"
                    fontWeight="bold"
                    letterSpacing="wider"
                    textTransform="uppercase"
                    color={accent.deep}
                  >
                    {t("aiCases.etiquetaResultado")}
                  </Text>
                  <Text m={0} fontSize="xl" fontWeight="800" color="gray.800" lineHeight="1.3">
                    {item.resultado}
                  </Text>
                </Flex>
              </Flex>
            </motion.div>
          ))}
        </Stack>

        <Text mt={6} mb={0} fontSize="sm" color="gray.500" textAlign="center">
          {t("aiCases.aclaracion")}
        </Text>
      </Box>
    </>
  );
}
