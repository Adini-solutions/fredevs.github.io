import { useEffect, useState } from "react";
import { Box, Button, Flex, Text, Icon, VStack, HStack, Image, SimpleGrid, Link } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { FiSend, FiUser, FiMail, FiPhone, FiMessageSquare, FiClock, FiShield, FiMessageCircle } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import FloatingField from "../molecules/FloatingField";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import { Turnstile } from "@marsidev/react-turnstile";
import { rem } from "../../utils/escala";

const WORKER_URL = "https://email-worker.adini.workers.dev";
const TURNSTILE_SITE_KEY = "0x4AAAAAACH7eEMqIQ4uu34n";
const WHATSAPP_URL = "https://wa.me/5491144123760";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const MotionBox = motion(Box);

const shine = keyframes`
  0% { left: -60%; }
  60%, 100% { left: 130%; }
`;

// Mismos colores que el banner de cada página.
const palettes = {
  default: { primary: "#6c63ff", hover: "#5548e6", secondary: "#22d3ee", tint: "#c4c1ff" },
  dev: { primary: "#6c63ff", hover: "#5548e6", secondary: "#c084fc", tint: "#d8c4ff" },
  infra: { primary: "#2fbf94", hover: "#238b6f", secondary: "#22d3ee", tint: "#b5f0dc" },
};

// Los bloques entran en cascada cuando la sección aparece en pantalla.
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Contact({ variant = "default" }) {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);
  const { t } = useTranslation();
  const [turnstileToken, setTurnstileToken] = useState(null);
  const [sent, setSent] = useState(false);

  const c = palettes[variant] || palettes.default;

  const nameOk = name.trim().length >= 2;
  const emailOk = EMAIL_RE.test(email.trim());
  const messageOk = message.trim().length >= 10;
  const doneCount = [nameOk, emailOk, messageOk].filter(Boolean).length;
  const allReady = doneCount === 3;
  const canSubmit = allReady && Boolean(turnstileToken) && !loading;

  const getContactEmail = () => {
    if (variant === "dev") return "dev@adini.com.ar";
    if (variant === "infra") return "infra@adini.com.ar";
    return "contacto@adini.com.ar";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage(null);

    try {
      if (!turnstileToken) {
        throw new Error("Completa el captcha");
      }

      const payload = {
        to: getContactEmail(),
        subject: `Contacto web - ${name || "Sin nombre"}`,
        text: [
          `Nombre: ${name}`,
          `Email: ${email}`,
          `Tel: ${phone || "N/D"}`,
          "",
          message
        ].join("\n"),
        html: null,
        turnstileToken
      };

      await axios.post(WORKER_URL, payload, {
        headers: { "Content-Type": "application/json" },
      });

      setSent(true);
      setMessage("");
      setName("");
      setEmail("");
      setPhone("");
      setTurnstileToken(null);
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setResponseMessage({ type: "error", text: error?.response?.data?.error || t("contact.mensajeNoEnviado") });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handler = (event) => {
      setSent(false);
      setMessage(event.detail);
    };

    window.addEventListener("contact:setMessage", handler);

    return () => {
      window.removeEventListener("contact:setMessage", handler);
    };
  }, []);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  const field = { accent: c.primary, tone: "dark" };

  return (
    <Box
      as="section"
      ref={ref}
      position="relative"
      overflow="hidden"
      bg="#050d1f"
      color="white"
      mt={rem(60)}
      px={{ base: 5, md: 10, lg: "6%", xl: "8%" }}
      py={{ base: 16, md: 20, "2xl": 24 }}
    >
      {/* Halos con los colores de la marca, como en el banner */}
      <Box
        position="absolute"
        inset={0}
        pointerEvents="none"
        bg={`radial-gradient(circle at 12% 20%, ${c.primary}4d, transparent 38%),
             radial-gradient(circle at 92% 85%, ${c.secondary}2b, transparent 40%),
             radial-gradient(circle at 60% 50%, #0b2447, #050d1f 75%)`}
      />
      {/* Grilla tenue que se desvanece hacia los bordes */}
      <Box
        position="absolute"
        inset={0}
        pointerEvents="none"
        opacity={0.45}
        backgroundImage="linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)"
        backgroundSize="56px 56px"
        sx={{
          maskImage: "radial-gradient(ellipse at 40% 50%, black 25%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at 40% 50%, black 25%, transparent 75%)",
        }}
      />
      {/* Línea luminosa superior */}
      <Box
        position="absolute"
        top={0}
        left="10%"
        right="10%"
        h="1px"
        bg={`linear-gradient(90deg, transparent, ${c.primary}, ${c.secondary}, transparent)`}
        opacity={0.7}
      />

      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 12, lg: 14, xl: 20 }}
        maxW="1280px"
        mx="auto"
        alignItems="center"
        position="relative"
      >
        {/* Columna izquierda: propuesta, ilustración y contacto directo */}
        <MotionBox variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}>
          <MotionBox variants={item}>
            <HStack
              display="inline-flex"
              spacing={2}
              px={3}
              py={1.5}
              borderRadius="full"
              bg="whiteAlpha.100"
              border="1px solid"
              borderColor="whiteAlpha.200"
              fontSize="sm"
              fontWeight={600}
              color={c.tint}
            >
              <Box position="relative" boxSize="8px">
                <MotionBox
                  position="absolute"
                  inset={0}
                  borderRadius="full"
                  bg={c.secondary}
                  animate={{ scale: [1, 2.4], opacity: [0.7, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                />
                <Box position="absolute" inset={0} borderRadius="full" bg={c.secondary} />
              </Box>
              <Text m={0}>{t("contact.etiqueta")}</Text>
            </HStack>
          </MotionBox>

          <MotionBox variants={item}>
            <Text
              as="h2"
              mt={5}
              mb={0}
              fontFamily="'Poppins', sans-serif"
              fontSize={{ base: "4xl", md: "5xl", "2xl": "6xl" }}
              fontWeight="bold"
              lineHeight="1.05"
              letterSpacing="-0.03em"
              sx={{ textWrap: "balance" }}
            >
              <Box as="span" bgGradient={`linear(to-b, white 45%, ${c.tint})`} bgClip="text">
                {t("contact.titulo")}{" "}
              </Box>
              <Box as="span" bgGradient={`linear(to-r, ${c.primary}, ${c.secondary})`} bgClip="text">
                {t("contact.subtitulo")}
              </Box>
            </Text>
          </MotionBox>

          <MotionBox variants={item}>
            <Text mt={5} mb={0} fontSize={{ base: "md", md: "lg" }} color="whiteAlpha.800" maxW="520px">
              {t("contact.bajada")}
            </Text>
          </MotionBox>

          <MotionBox variants={item}>
            <VStack align="start" spacing={3} mt={7}>
              {[
                { icon: FiClock, text: t("contact.respuesta") },
                { icon: FiShield, text: t("contact.privacidad") },
              ].map(({ icon, text }) => (
                <HStack key={text} spacing={3}>
                  <Flex boxSize="32px" borderRadius="lg" align="center" justify="center" bg={`${c.primary}26`} color={c.tint}>
                    <Icon as={icon} boxSize="16px" />
                  </Flex>
                  <Text m={0} color="whiteAlpha.900">{text}</Text>
                </HStack>
              ))}
            </VStack>
          </MotionBox>

          {/* Ilustración: teléfono flotando sobre un halo con órbita */}
          <MotionBox variants={item} display={{ base: "none", lg: "block" }}>
            <Box position="relative" mt={10} w="100%" maxW="440px" mx="auto">
              <Box
                position="absolute"
                left="50%"
                top="46%"
                boxSize="78%"
                transform="translate(-50%, -50%)"
                borderRadius="full"
                bg={`radial-gradient(circle, ${c.primary}66, ${c.primary}14 55%, transparent 70%)`}
                filter="blur(6px)"
              />
              <MotionBox
                position="absolute"
                left="50%"
                top="46%"
                boxSize="92%"
                ml="-46%"
                mt="-46%"
                borderRadius="full"
                border="1px dashed rgba(255,255,255,0.14)"
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              >
                {[40, 220].map((angle, i) => (
                  <Box
                    key={angle}
                    position="absolute"
                    top="50%"
                    left="50%"
                    boxSize="7px"
                    ml="-3.5px"
                    mt="-3.5px"
                    borderRadius="full"
                    bg={i ? c.primary : c.secondary}
                    boxShadow={`0 0 12px 2px ${i ? c.primary : c.secondary}`}
                    sx={{ transform: `rotate(${angle}deg) translateX(202px)` }}
                  />
                ))}
              </MotionBox>

              <MotionBox
                position="relative"
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image src="/assets/icons/contact.svg" alt="" w="100%" filter="drop-shadow(0 30px 40px rgba(0,0,0,0.45))" />
              </MotionBox>

              {[
                { icon: FiMessageCircle, text: t("contact.chipRecibido"), pos: { left: "-6%", top: "18%" }, delay: 0 },
                { icon: FiClock, text: t("contact.chipRespuesta"), pos: { right: "-8%", bottom: "22%" }, delay: 1.4 },
              ].map(({ icon, text, pos, delay }) => (
                <MotionBox
                  key={text}
                  position="absolute"
                  {...pos}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, y: [0, -8, 0] }}
                  transition={{ opacity: { duration: 0.6, delay: 0.6 + delay / 2 }, y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay } }}
                >
                  <HStack
                    spacing={2}
                    px={3}
                    py={2}
                    borderRadius="lg"
                    bg="rgba(10,25,50,0.75)"
                    border="1px solid rgba(255,255,255,0.14)"
                    backdropFilter="blur(10px)"
                    boxShadow="0 8px 24px rgba(0,0,0,0.35)"
                    fontSize="sm"
                    fontWeight="medium"
                    whiteSpace="nowrap"
                  >
                    <Box color={c.secondary}><Icon as={icon} boxSize="16px" /></Box>
                    <Text m={0}>{text}</Text>
                  </HStack>
                </MotionBox>
              ))}
            </Box>
          </MotionBox>
        </MotionBox>

        {/* Columna derecha: formulario directo sobre el fondo */}
        <Box position="relative">
          {/* Halo detrás del formulario para separarlo del fondo sin usar card */}
          <Box
            position="absolute"
            inset="-10%"
            pointerEvents="none"
            bg={`radial-gradient(ellipse at 50% 40%, ${c.primary}1f, transparent 65%)`}
          />

          <AnimatePresence mode="wait">
            {sent ? (
              <MotionBox
                key="sent"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                display="flex"
                flexDirection="column"
                alignItems="center"
                textAlign="center"
                py={{ base: 10, md: 16 }}
                position="relative"
              >
                <MotionBox
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.1 }}
                  boxSize="88px"
                  borderRadius="full"
                  bgGradient={`linear(135deg, ${c.primary}, ${c.secondary})`}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  boxShadow={`0 0 0 10px ${c.primary}26, 0 0 0 22px ${c.primary}12, 0 20px 50px -10px ${c.primary}`}
                  mb={7}
                >
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <motion.path
                      d="M5 12.5l4.5 4.5L19 7.5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.45, ease: "easeOut" }}
                    />
                  </svg>
                </MotionBox>
                <Text m={0} fontSize="2xl" fontWeight="bold">
                  {t("contact.mensajeEnviado")}
                </Text>
                <Text m={0} mt={2} color="whiteAlpha.700">
                  {t("contact.span")} {t("contact.respuesta").toLowerCase()}.
                </Text>
                <Button
                  mt={7}
                  variant="outline"
                  borderRadius="full"
                  color="white"
                  borderColor="whiteAlpha.400"
                  _hover={{ bg: "whiteAlpha.200", borderColor: "whiteAlpha.600" }}
                  onClick={() => setSent(false)}
                >
                  {t("contact.otroMensaje")}
                </Button>
              </MotionBox>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                noValidate
                variants={stagger}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
                exit={{ opacity: 0, y: -10 }}
                style={{ position: "relative" }}
              >
                <VStack spacing={{ base: 5, md: 5, "2xl": 6 }} align="stretch">
                  {/* Progreso: se llena a medida que se completan los obligatorios */}
                  <MotionBox variants={item}>
                    <Flex justify="space-between" align="center" mb={2} fontSize="sm">
                      <Text m={0} color={allReady ? c.tint : "whiteAlpha.700"} fontWeight={allReady ? 600 : 400}>
                        {allReady
                          ? t("contact.progresoListo")
                          : t("contact.progreso", { done: doneCount, total: 3 })}
                      </Text>
                      <Text m={0} color="whiteAlpha.600" fontWeight={600}>
                        {Math.round((doneCount / 3) * 100)}%
                      </Text>
                    </Flex>
                    <Box h="6px" bg="whiteAlpha.100" borderRadius="full" overflow="hidden">
                      <MotionBox
                        h="100%"
                        borderRadius="full"
                        bgGradient={`linear(to-r, ${c.primary}, ${c.secondary})`}
                        boxShadow={`0 0 12px ${c.secondary}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${(doneCount / 3) * 100}%` }}
                        transition={{ type: "spring", stiffness: 120, damping: 20 }}
                      />
                    </Box>
                  </MotionBox>

                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 5, md: 4, "2xl": 5 }}>
                    <MotionBox variants={item}>
                      <FloatingField
                        id="contact-name"
                        label={t("contact.nombreLabel")}
                        icon={FiUser}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        isValid={nameOk}
                        autoComplete="name"
                        required
                        {...field}
                      />
                    </MotionBox>
                    <MotionBox variants={item}>
                      <FloatingField
                        id="contact-phone"
                        type="tel"
                        label={t("contact.telefonoLabel")}
                        icon={FiPhone}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        isValid={phone.replace(/\D/g, "").length >= 6}
                        autoComplete="tel"
                        {...field}
                      />
                    </MotionBox>
                  </SimpleGrid>

                  <MotionBox variants={item}>
                    <FloatingField
                      id="contact-email"
                      type="email"
                      label={t("contact.correoLabel")}
                      icon={FiMail}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      isValid={emailOk}
                      error={!emailOk ? t("contact.correoInvalido") : undefined}
                      autoComplete="email"
                      required
                      {...field}
                    />
                  </MotionBox>

                  <MotionBox variants={item}>
                    <FloatingField
                      id="contact-message"
                      multiline
                      label={t("contact.mensajeLabel")}
                      icon={FiMessageSquare}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      isValid={messageOk}
                      required
                      {...field}
                    />
                  </MotionBox>

                  <MotionBox variants={item}>
                    <Turnstile
                      siteKey={TURNSTILE_SITE_KEY}
                      onSuccess={(token) => setTurnstileToken(token)}
                      onExpire={() => setTurnstileToken(null)}
                      onError={() => setTurnstileToken(null)}
                      options={{ theme: "dark" }}
                    />
                  </MotionBox>

                  <MotionBox variants={item}>
                    <Flex justifyContent="space-between" align="center" gap={4} direction={{ base: "column-reverse", sm: "row" }}>
                      <AnimatePresence mode="wait">
                        <MotionBox
                          key={responseMessage ? "error" : "span"}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.25 }}
                        >
                          <Text m={0} color={responseMessage ? "#ff6b6b" : c.tint} fontSize={{ base: "md", md: "lg" }} fontWeight="bold" textAlign={{ base: "center", sm: "left" }}>
                            {responseMessage ? responseMessage.text : t("contact.span")}
                          </Text>
                        </MotionBox>
                      </AnimatePresence>

                      <MotionBox
                        whileHover={canSubmit ? { scale: 1.04 } : undefined}
                        whileTap={canSubmit ? { scale: 0.96 } : undefined}
                        animate={allReady && !loading ? { boxShadow: [`0 0 0 0 ${c.primary}88`, `0 0 0 14px ${c.primary}00`] } : { boxShadow: `0 0 0 0 ${c.primary}00` }}
                        transition={allReady ? { duration: 1.6, repeat: Infinity } : undefined}
                        borderRadius="full"
                        flexShrink={0}
                        w={{ base: "100%", sm: "auto" }}
                      >
                        <Button
                          type="submit"
                          isDisabled={!canSubmit}
                          position="relative"
                          overflow="hidden"
                          w={{ base: "100%", sm: "auto" }}
                          bgGradient={`linear(to-r, ${c.primary}, ${c.hover})`}
                          color="white"
                          h="3.25rem"
                          px={8}
                          borderRadius="full"
                          fontWeight={700}
                          boxShadow={`0 10px 30px -8px ${c.primary}`}
                          _hover={{ bgGradient: `linear(to-r, ${c.hover}, ${c.primary})` }}
                          _disabled={{ opacity: 0.4, cursor: "not-allowed", boxShadow: "none" }}
                          sx={{
                            "&::after": {
                              content: '""',
                              position: "absolute",
                              top: 0,
                              left: "-60%",
                              w: "40%",
                              h: "100%",
                              bg: "linear-gradient(120deg, transparent, rgba(255,255,255,.45), transparent)",
                              transform: "skewX(-20deg)",
                              animation: allReady && !loading ? `${shine} 2.6s ease-in-out infinite` : "none",
                            },
                          }}
                        >
                          {loading ? t("contact.mensajeEnviando") : t("contact.boton")}
                          <MotionBox
                            as="span"
                            display="inline-flex"
                            ml={2}
                            animate={loading ? { x: [0, 40], y: [0, -20], opacity: [1, 0] } : { x: 0, y: 0, opacity: 1 }}
                            transition={loading ? { duration: 0.8, repeat: Infinity, ease: "easeIn" } : { duration: 0.2 }}
                          >
                            <Icon as={FiSend} />
                          </MotionBox>
                        </Button>
                      </MotionBox>
                    </Flex>
                  </MotionBox>

                  {/* Contacto directo */}
                  <MotionBox variants={item}>
                    <Flex
                      mt={2}
                      pt={5}
                      borderTop="1px solid"
                      borderColor="whiteAlpha.200"
                      align="center"
                      gap={3}
                      wrap="wrap"
                      justify={{ base: "center", sm: "flex-start" }}
                    >
                      <Text m={0} fontSize="sm" color="whiteAlpha.600" w={{ base: "100%", sm: "auto" }} textAlign="center">
                        {t("contact.directo")}
                      </Text>
                      {[
                        { href: `mailto:${getContactEmail()}`, icon: FiMail, label: getContactEmail() },
                        { href: WHATSAPP_URL, icon: FaWhatsapp, label: "WhatsApp", external: true },
                      ].map(({ href, icon, label, external }) => (
                        <Link
                          key={label}
                          href={href}
                          isExternal={external}
                          display="inline-flex"
                          alignItems="center"
                          gap={2}
                          px={3}
                          py={1.5}
                          borderRadius="full"
                          fontSize="sm"
                          fontWeight={600}
                          color="white"
                          bg="whiteAlpha.100"
                          border="1px solid"
                          borderColor="whiteAlpha.200"
                          transition="all .2s"
                          _hover={{ textDecoration: "none", bg: "whiteAlpha.200", borderColor: c.secondary, transform: "translateY(-2px)" }}
                        >
                          <Icon as={icon} color={c.secondary} />
                          {label}
                        </Link>
                      ))}
                    </Flex>
                  </MotionBox>
                </VStack>
              </motion.form>
            )}
          </AnimatePresence>
        </Box>
      </SimpleGrid>
    </Box>
  );
}
