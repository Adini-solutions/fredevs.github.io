import React from 'react';
import { Box, Flex, Grid, Image, Link, Text, Badge } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { LuArrowRight, LuBadgeCheck } from "react-icons/lu";
import { storyUrl } from '../../utils/stories';

const MotionBox = motion(Box);

/**
 * Casos de la UTN FRBA publicados en stories.adini.com.ar. Cada tarjeta toma
 * la identidad del sistema real: el isologo de UtenIA y, para SICYT y SIA
 * (que no tienen isologo propio), su nombre sobre un tono pastel del color de la app.
 */
const UTN_CASES = [
  {
    slug: "utenia",
    name: "UtenIA",
    bg: "#f4f1ee",
    color: "#2a2a2a",
    accent: "#c41230",
    logo: "/assets/cases/utenia-logo.png",
  },
  {
    slug: "sicyt",
    name: "SICYT",
    bg: "#e9ecff",
    color: "#3730a3",
    accent: "#4f46e5",
  },
  {
    slug: "sia",
    name: "SIA",
    bg: "#fbe6ea",
    color: "#9c1030",
    accent: "#b71234",
  },
];

/**
 * Otros clientes. Los logos son los mismos que usa el portal de propuestas
 * (`resumen/public/clients/`), más los de Hospital El Cruce y Moviltrack. Se
 * muestran a color y sin link, cada uno centrado en una celda del mismo
 * tamaño. `h` es el alto del logo: se ajusta a mano para que todos pesen
 * parecido, porque sus proporciones son muy distintas. Para sumar uno, dejá
 * el archivo en `public/assets/clients/` y agregalo acá.
 */
const CLIENTS = [
  { name: "Universidad de Buenos Aires", logo: "/assets/clients/uba.png", h: "1.75rem" },
  { name: "Hospital El Cruce", logo: "/assets/clients/hospital-el-cruce.png", h: "3rem" },
  { name: "Moviltrack", logo: "/assets/clients/moviltrack.png", h: "1.15rem" },
  { name: "Improveet", logo: "/assets/clients/improveet.png", h: "1.25rem" },
  { name: "Be Water", logo: "/assets/clients/be-water.png", h: "2rem" },
  { name: "The Brains", logo: "/assets/clients/the-brains.png", h: "1.6rem" },
  // Pendiente hasta tener su logo:
  // { name: "Química Morón", logo: "/assets/clients/quimica-moron.png", h: "2rem" },
];

/**
 * Respaldo institucional, justo debajo del banner: el vínculo de partner
 * oficial con la UTN Facultad Regional Buenos Aires y los clientes que
 * confían en Adini.
 */
export default function TrustedBy() {
  const { t } = useTranslation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <Box as="section" maxW="80rem" mx="auto" px={{ base: "15px", md: "60px" }} mt={{ base: 10, md: 14 }}>
      <MotionBox
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <Grid
          templateColumns={{ base: "1fr", lg: "1.15fr 1fr" }}
          bg="white"
          borderRadius="2xl"
          boxShadow="md"
          overflow="hidden"
        >
          {/* Partner oficial de la UTN FRBA */}
          <Flex
            direction="column"
            gap={4}
            p={{ base: 6, md: 10 }}
            borderRight={{ base: "none", lg: "1px solid" }}
            borderBottom={{ base: "1px solid", lg: "none" }}
            borderColor={{ base: "gray.100", lg: "gray.100" }}
          >
            <Badge
              alignSelf="flex-start"
              display="inline-flex"
              alignItems="center"
              gap={1.5}
              color="purple.700"
              bg="#eee5f9"
              fontSize="xs"
              px={3}
              py={1}
              borderRadius="md"
              textTransform="uppercase"
            >
              <LuBadgeCheck size={14} />
              {t("trust.partnerEtiqueta")}
            </Badge>

            <Image
              src="/assets/clients/utn-frba.png"
              alt="UTN Facultad Regional Buenos Aires"
              h={{ base: "44px", md: "56px" }}
              w="auto"
              alignSelf="flex-start"
              objectFit="contain"
            />

            <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold" color="primary.500" lineHeight="1.25" m={0}>
              {t("trust.partnerTitulo")}
            </Text>
            <Text color="gray.600" fontSize="md" lineHeight="1.6" m={0}>
              {t("trust.partnerTexto")}
            </Text>

            <Grid templateColumns={{ base: "1fr", sm: "repeat(3, 1fr)" }} gap={3} mt={2}>
              {UTN_CASES.map((c) => (
                <Link
                  key={c.slug}
                  href={storyUrl(c.slug)}
                  isExternal
                  role="group"
                  display="flex"
                  flexDirection={{ base: "row", sm: "column" }}
                  borderRadius="xl"
                  border="1px solid"
                  borderColor="gray.200"
                  overflow="hidden"
                  bg="white"
                  transition="transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease"
                  _hover={{ textDecoration: "none", transform: "translateY(-3px)", boxShadow: "lg", borderColor: c.accent }}
                >
                  <Flex
                    align="center"
                    justify="center"
                    gap={2}
                    flexShrink={0}
                    w={{ base: "120px", sm: "auto" }}
                    h={{ base: "auto", sm: "72px" }}
                    minH="64px"
                    bg={c.bg}
                    color={c.color}
                  >
                    {c.logo && <Image src={c.logo} alt="" boxSize="26px" />}
                    <Text m={0} fontSize="lg" fontWeight="800" letterSpacing={c.logo ? "-0.01em" : "0.04em"} lineHeight="1">
                      {c.name}
                    </Text>
                  </Flex>
                  <Flex align="center" justify="space-between" gap={2} flex="1" px={3} py={2.5}>
                    <Text m={0} fontSize="xs" fontWeight="600" color="gray.600" lineHeight="1.3">
                      {t(`trust.sistemas.${c.slug}`)}
                    </Text>
                    <Box
                      as={LuArrowRight}
                      size={15}
                      flexShrink={0}
                      color={c.accent}
                      transition="transform 0.2s ease"
                      _groupHover={{ transform: "translateX(3px)" }}
                    />
                  </Flex>
                </Link>
              ))}
            </Grid>
          </Flex>

          {/* Otros clientes */}
          <Flex direction="column" justify="center" gap={{ base: 5, md: 7 }} p={{ base: 6, md: 10 }} bg="#fbfbff">
            <Text
              m={0}
              fontSize="xs"
              fontWeight="bold"
              letterSpacing="0.14em"
              textTransform="uppercase"
              color="gray.500"
              textAlign="center"
            >
              {t("trust.clientesEtiqueta")}
            </Text>

            <Grid templateColumns={{ base: "repeat(2, 1fr)", sm: "repeat(3, 1fr)", lg: "repeat(2, 1fr)", xl: "repeat(3, 1fr)" }} gap={3}>
              {CLIENTS.map((client) => (
                <Flex
                  key={client.name}
                  align="center"
                  justify="center"
                  h="5.25rem"
                  px={4}
                  bg="white"
                  border="1px solid"
                  borderColor="gray.100"
                  borderRadius="xl"
                >
                  <Image src={client.logo} alt={client.name} h={client.h} maxW="100%" w="auto" objectFit="contain" />
                </Flex>
              ))}
            </Grid>
          </Flex>
        </Grid>
      </MotionBox>
    </Box>
  );
}
