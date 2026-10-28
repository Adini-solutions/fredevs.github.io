import React from 'react';
import { Box, Flex, Grid, Image, Link, LinkBox, LinkOverlay, Text, Badge, usePrefersReducedMotion } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { LuArrowRight, LuBadgeCheck, LuHandshake } from "react-icons/lu";
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
 * DigitalArts, empresa creativa y tecnológica. Toda su tarjeta lleva a su
 * sitio, con el verde de su logo. El logo es el mismo que usa stories.
 */
const DIGITAL_ARTS = {
  href: "https://bydigitalarts.com/",
  domain: "bydigitalarts.com",
  accent: "#2f8f78",
};

/**
 * Otros clientes. Los logos son los mismos que usa el portal de propuestas
 * (`resumen/public/clients/`), más los de Hospital El Cruce y Moviltrack. Se
 * muestran a color y sin link, cada uno centrado en una celda del mismo
 * tamaño. `h` es el alto del logo: se ajusta a mano para que todos pesen
 * parecido, porque sus proporciones son muy distintas. Para sumar uno, dejá
 * el archivo en `public/assets/clients/` y agregalo acá.
 *
 * Cognitia sale de `cognitia-front/src/app/public/assets/cognitia-1.png`,
 * recortado y achicado. HIP Game Park es el horizontal negro de su brandbook
 * (`hip-monorepo/packages/ui/public/brand/`), que pide no bajar de 30px de alto.
 */
const CLIENTS = [
  { name: "Universidad de Buenos Aires", logo: "/assets/clients/uba.png", h: "1.75rem" },
  { name: "Hospital El Cruce", logo: "/assets/clients/hospital-el-cruce.png", h: "3rem" },
  { name: "Moviltrack", logo: "/assets/clients/moviltrack.png", h: "1.15rem" },
  { name: "Improveet", logo: "/assets/clients/improveet.png", h: "1.25rem" },
  { name: "Be Water", logo: "/assets/clients/be-water.png", h: "2rem" },
  { name: "The Brains", logo: "/assets/clients/the-brains.png", h: "1.6rem" },
  { name: "Cognitia", logo: "/assets/clients/cognitia.png", h: "1.6rem" },
  { name: "HIP Game Park", logo: "/assets/clients/hip-game-park.svg", h: "31px" },
  // Pendiente hasta tener su logo:
  // { name: "Química Morón", logo: "/assets/clients/quimica-moron.png", h: "2rem" },
];

/**
 * Respaldo institucional, justo debajo del banner. Arriba, los partners (la
 * UTN Facultad Regional Buenos Aires y DigitalArts), cada uno en su tarjeta.
 * Abajo, aparte, los clientes que confían en Adini.
 */
// Desplaza la cinta la mitad de su ancho: como lleva los logos dos veces,
// al reiniciar la segunda copia queda donde estaba la primera y no se nota el corte.
const marquee = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
`;

export default function TrustedBy() {
  const { t } = useTranslation();
  const reduceMotion = usePrefersReducedMotion();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <Box as="section" maxW="80rem" mx="auto" px={{ base: "15px", md: "60px" }} mt={{ base: 10, md: 14 }}>
      <MotionBox
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <Grid templateColumns={{ base: "1fr", lg: "1.35fr 1fr" }} gap={{ base: 4, md: 6 }}>
          {/* Partner oficial de la UTN FRBA */}
          <PartnerCard
            icon={LuBadgeCheck}
            label={t("trust.partnerEtiqueta")}
            logo="/assets/clients/utn-frba.png"
            logoAlt="UTN Facultad Regional Buenos Aires"
            title={t("trust.partnerTitulo")}
            text={t("trust.partnerTexto")}
          >
            <Grid templateColumns={{ base: "1fr", sm: "repeat(3, 1fr)" }} gap={3}>
              {UTN_CASES.map((c) => (
                <CaseLink key={c.slug} study={c} href={storyUrl(c.slug)} label={t(`trust.sistemas.${c.slug}`)} />
              ))}
            </Grid>
          </PartnerCard>

          {/* Partner DigitalArts */}
          <PartnerCard
            icon={LuHandshake}
            label={t("trust.digitalArts.etiqueta")}
            logo="/assets/clients/digitalarts.svg"
            logoAlt="DigitalArts"
            href={DIGITAL_ARTS.href}
            accent={DIGITAL_ARTS.accent}
            // Su logotipo es más pesado que el de la UTN: un poco más bajo, pesan parecido.
            logoH={{ base: "38px", md: "46px" }}
            title={t("trust.digitalArts.titulo")}
            text={t("trust.digitalArts.texto")}
          >
            {/* El dominio, con un subrayado verde que se completa al pasar por la tarjeta. */}
            <Box alignSelf="flex-start">
              <Text m={0} fontSize="sm" fontWeight="600" color="gray.500" transition="color 0.25s ease" _groupHover={{ color: DIGITAL_ARTS.accent }}>
                {DIGITAL_ARTS.domain}
              </Text>
              <Box h="2px" w="1.5rem" mt={1} bg={DIGITAL_ARTS.accent} borderRadius="full" transition="width 0.35s ease" _groupHover={{ w: "100%" }} />
            </Box>
          </PartnerCard>
        </Grid>

        {/* Otros clientes */}
        <Flex
          direction="column"
          gap={{ base: 5, md: 6 }}
          mt={{ base: 4, md: 6 }}
          p={{ base: 6, md: 8 }}
          bg="#fbfbff"
          border="1px solid"
          borderColor="gray.100"
          borderRadius="2xl"
        >
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

          {/* Carrusel infinito: la cinta corre sola, se frena al pasar el mouse
              y se desvanece en los bordes. Con "reducir movimiento" vuelve a
              ser una grilla quieta. */}
          {reduceMotion ? (
            <Grid templateColumns={{ base: "repeat(2, 1fr)", sm: "repeat(4, 1fr)" }} gap={3}>
              {CLIENTS.map((client) => (
                <ClientLogo key={client.name} client={client} />
              ))}
            </Grid>
          ) : (
            <Box
              overflow="hidden"
              mx={{ base: -6, md: -8 }}
              sx={{
                maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
              }}
            >
              <Flex
                w="max-content"
                animation={`${marquee} 40s linear infinite`}
                _hover={{ animationPlayState: "paused" }}
              >
                {[0, 1].map((copy) => (
                  <Flex key={copy} gap={3} pr={3} aria-hidden={copy === 1 || undefined}>
                    {CLIENTS.map((client) => (
                      <ClientLogo key={client.name} client={client} w={{ base: "9.5rem", md: "11rem" }} />
                    ))}
                  </Flex>
                ))}
              </Flex>
            </Box>
          )}
        </Flex>
      </MotionBox>
    </Box>
  );
}

/**
 * Celda con el logo de un cliente, a color y centrado.
 */
function ClientLogo({ client, ...props }) {
  return (
    <Flex
      align="center"
      justify="center"
      flexShrink={0}
      h="5.25rem"
      px={4}
      bg="white"
      border="1px solid"
      borderColor="gray.100"
      borderRadius="xl"
      transition="border-color 0.25s ease, box-shadow 0.25s ease"
      _hover={{ borderColor: "gray.200", boxShadow: "sm" }}
      {...props}
    >
      <Image src={client.logo} alt={client.name} h={client.h} maxW="100%" w="auto" objectFit="contain" />
    </Flex>
  );
}

/**
 * Tarjeta de un partner: etiqueta, logo, título, texto y, debajo, lo que
 * llegue en `children`, pegado al pie para que las dos tarjetas queden
 * alineadas. Con `href` toda la tarjeta es un enlace: se eleva y toma el
 * borde de `accent`.
 */
function PartnerCard({ icon, label, logo, logoAlt, logoH = { base: "44px", md: "56px" }, href, accent, title, text, children }) {
  const logoImage = (
    <Image src={logo} alt={logoAlt} h={logoH} w="auto" objectFit="contain" />
  );

  return (
    <LinkBox
      as={Flex}
      role="group"
      direction="column"
      gap={4}
      p={{ base: 6, md: 10 }}
      bg="white"
      borderRadius="2xl"
      boxShadow="md"
      border="1px solid"
      borderColor="transparent"
      transition="transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease"
      _hover={href ? { transform: "translateY(-4px)", boxShadow: "xl", borderColor: accent } : undefined}
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
        <Box as={icon} size={14} />
        {label}
      </Badge>

      {/* El alto es fijo aunque el logo sea más bajo: así los títulos de las dos tarjetas arrancan a la par. */}
      <Flex align="center" h={{ base: "44px", md: "56px" }}>
        {logoImage}
      </Flex>

      <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold" color="primary.500" lineHeight="1.25" m={0}>
        {href ? <LinkOverlay href={href} isExternal _hover={{ textDecoration: "none" }}>{title}</LinkOverlay> : title}
      </Text>
      <Text color="gray.600" fontSize="md" lineHeight="1.6" m={0}>
        {text}
      </Text>

      <Flex direction="column" gap={3} mt="auto" pt={2}>
        {children}
      </Flex>
    </LinkBox>
  );
}

/**
 * Enlace a un caso en stories: el nombre del sistema sobre su color y una
 * línea que dice qué es. En fila en celular y en columna desde `sm`.
 */
function CaseLink({ study, href, label }) {
  return (
    <Link
      href={href}
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
      _hover={{ textDecoration: "none", transform: "translateY(-3px)", boxShadow: "lg", borderColor: study.accent }}
    >
      <Flex
        align="center"
        justify="center"
        gap={2}
        flexShrink={0}
        w={{ base: "120px", sm: "auto" }}
        h={{ base: "auto", sm: "72px" }}
        minH="64px"
        bg={study.bg}
        color={study.color}
      >
        {study.logo && <Image src={study.logo} alt="" boxSize="26px" />}
        <Text m={0} fontSize="lg" fontWeight="800" letterSpacing={study.logo ? "-0.01em" : "0.04em"} lineHeight="1">
          {study.name}
        </Text>
      </Flex>
      <Flex align="center" justify="space-between" gap={2} flex="1" px={3} py={2.5}>
        <Text m={0} fontSize="xs" fontWeight="600" color="gray.600" lineHeight="1.3">
          {label}
        </Text>
        <Box
          as={LuArrowRight}
          size={15}
          flexShrink={0}
          color={study.accent}
          transition="transform 0.2s ease"
          _groupHover={{ transform: "translateX(3px)" }}
        />
      </Flex>
    </Link>
  );
}
