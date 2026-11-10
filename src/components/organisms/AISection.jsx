import { Box, Flex, Text, VStack, HStack, Icon, SimpleGrid, Link, Button as ChakraButton } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LuMessagesSquare, LuFileText, LuChartColumn, LuWorkflow, LuShieldCheck, LuArrowRight, LuArrowUpRight } from "react-icons/lu";
import Title from "../molecules/Title";
import { storyUrl } from "../../utils/stories";

// Un caso de uso por tarea; los tres primeros tienen un caso en producción
// que lo respalda. El orden coincide con `aiSection.usos` de los locales.
const USES = [
  { icon: LuMessagesSquare, proof: { slug: "utenia", name: "UtenIA", client: "UTN FRBA" } },
  { icon: LuFileText, proof: { slug: "aura", name: "Aura", client: "Hospital El Cruce" } },
  { icon: LuChartColumn, proof: { slug: "cognitia", name: "Cognitia", client: "The Brains" } },
  { icon: LuWorkflow },
];

const ACCENT = "#8b85ff";

export default function AISection() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const threshold = useMemo(() => (window.innerWidth < 768 ? 0.04 : 0.15), []);
  const { ref, inView } = useInView({ triggerOnce: true, threshold });

  const uses = t("aiSection.usos", { returnObjects: true });

  const scrollToContact = () => {
    const section = document.getElementById("contacto");
    if (!section) return;
    const top = section.getBoundingClientRect().top + window.scrollY - 120;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <>
      <Title title={t("aiSection.titulo")} subtitle={t("aiSection.subtitulo")} mt="60px" mb="50px" />

      <Box bg="primary.500" py={{ base: 16, md: 20 }} px={{ base: 5, md: 12, xl: 20 }} position="relative" overflow="hidden">
        <Box
          position="absolute"
          inset={0}
          pointerEvents="none"
          bg="radial-gradient(circle at 5% 10%, rgba(108,99,255,0.16), transparent 35%), radial-gradient(circle at 95% 95%, rgba(34,211,238,0.10), transparent 35%)"
        />

        <Box maxW="1400px" mx="auto" ref={ref} position="relative">
          <Flex direction={{ base: "column", lg: "row" }} align={{ base: "stretch", lg: "center" }} gap={{ base: 10, lg: 16, xl: 20 }}>
            <motion.div
              style={{ flex: "0 0 auto", maxWidth: "560px" }}
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <VStack align="flex-start" spacing={6}>
                <Text m={0} fontSize="xs" fontWeight="bold" letterSpacing="widest" textTransform="uppercase" color="#a09bff">
                  {t("aiSection.label")}
                </Text>

                <Text m={0} fontSize={{ base: "3xl", md: "4xl" }} fontWeight="800" color="white" lineHeight="1.2" sx={{ textWrap: "balance" }}>
                  {t("aiSection.caratula")}
                </Text>

                <Text m={0} fontSize={{ base: "md", md: "lg" }} color="whiteAlpha.700" lineHeight="1.7">
                  {t("aiSection.descripcion")}
                </Text>

                <HStack spacing={3} align="flex-start" color="whiteAlpha.800" fontSize="sm">
                  <Icon as={LuShieldCheck} boxSize={5} color="#22d3ee" flexShrink={0} mt="1px" />
                  <Text m={0}>{t("aiSection.datos")}</Text>
                </HStack>

                <Flex gap={3} wrap="wrap" pt={2}>
                  <ChakraButton
                    onClick={() => {
                      navigate("/ia");
                      window.scrollTo({ top: 0 });
                    }}
                    h="3rem"
                    px={6}
                    borderRadius="full"
                    bg="#6c63ff"
                    color="white"
                    rightIcon={<LuArrowRight />}
                    boxShadow="0 10px 30px -10px #6c63ff"
                    _hover={{ bg: "#5548e6" }}
                  >
                    {t("aiSection.cta")}
                  </ChakraButton>
                  <ChakraButton
                    onClick={scrollToContact}
                    h="3rem"
                    px={6}
                    borderRadius="full"
                    variant="outline"
                    color="white"
                    borderColor="whiteAlpha.400"
                    _hover={{ bg: "whiteAlpha.100", borderColor: "whiteAlpha.600" }}
                    _active={{ bg: "whiteAlpha.200" }}
                  >
                    {t("aiSection.ctaContacto")}
                  </ChakraButton>
                </Flex>
              </VStack>
            </motion.div>

            <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={{ base: 4, md: 5 }} flex={1}>
              {Array.isArray(uses) &&
                USES.map(({ icon, proof }, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 24 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 + i * 0.08 }}
                    style={{ height: "100%" }}
                  >
                    <Flex
                      direction="column"
                      h="100%"
                      p={{ base: 5, md: 6 }}
                      borderRadius="2xl"
                      bg="rgba(255,255,255,0.04)"
                      border="1px solid rgba(255,255,255,0.09)"
                      transition="all 0.3s ease"
                      _hover={{ bg: "rgba(108,99,255,0.07)", borderColor: "rgba(139,133,255,0.35)" }}
                    >
                      <Flex boxSize="44px" borderRadius="xl" align="center" justify="center" bg="rgba(108,99,255,0.14)" color={ACCENT} mb={4}>
                        <Icon as={icon} boxSize={5} />
                      </Flex>
                      <Text m={0} fontSize="lg" fontWeight="700" color="white">
                        {uses[i]?.titulo}
                      </Text>
                      <Text m={0} mt={2} fontSize={{ base: "sm", md: "md" }} color="whiteAlpha.700" lineHeight="1.6">
                        {uses[i]?.texto}
                      </Text>

                      {proof && (
                        <Link
                          href={storyUrl(proof.slug)}
                          isExternal
                          mt="auto"
                          pt={4}
                          display="inline-flex"
                          alignItems="center"
                          gap={2}
                          fontSize="sm"
                          color="whiteAlpha.800"
                          whiteSpace="nowrap"
                          role="group"
                          _hover={{ textDecoration: "none", color: "white" }}
                        >
                          <Text as="span" m={0} fontWeight="700">
                            {proof.name}
                          </Text>
                          <Text as="span" m={0} color="whiteAlpha.600">
                            · {proof.client}
                          </Text>
                          <Icon as={LuArrowUpRight} transition="transform .2s" _groupHover={{ transform: "translate(2px,-2px)" }} />
                        </Link>
                      )}
                    </Flex>
                  </motion.div>
                ))}
            </SimpleGrid>
          </Flex>
        </Box>
      </Box>
    </>
  );
}
