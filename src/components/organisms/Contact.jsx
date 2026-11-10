import { useEffect, useRef, useState } from "react";
import { Box, Button, Flex, Text, Icon, VStack, HStack, SimpleGrid, Link, Wrap, WrapItem } from "@chakra-ui/react";
import { FiSend, FiUser, FiMail, FiPhone, FiMessageSquare, FiClock, FiShield, FiCheck } from "react-icons/fi";
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
const NAVY = "#091c30";
const ERROR = "#e5484d";

const MotionBox = motion(Box);

// Mismos colores que el banner de cada página.
const palettes = {
  default: { primary: "#6c63ff", hover: "#5548e6", secondary: "#22d3ee" },
  dev: { primary: "#6c63ff", hover: "#5548e6", secondary: "#c084fc" },
  infra: { primary: "#2fbf94", hover: "#238b6f", secondary: "#22d3ee" },
  ia: { primary: "#3b82f6", hover: "#2563eb", secondary: "#22d3ee" },
};

const EMAILS = {
  default: "contacto@adini.com.ar",
  dev: "dev@adini.com.ar",
  infra: "infra@adini.com.ar",
  ia: "contacto@adini.com.ar",
};

// Los bloques entran en cascada cuando la sección aparece en pantalla.
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function Contact({ variant = "default" }) {
  const { t } = useTranslation();
  const c = palettes[variant] || palettes.default;
  const key = palettes[variant] ? variant : "default";
  const contactEmail = EMAILS[key];
  const topics = t(`contact.temas.${key}`, { returnObjects: true });

  const [topic, setTopic] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [waitingToken, setWaitingToken] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState(null);
  const [tokenFailed, setTokenFailed] = useState(false);
  const [error, setError] = useState(null);
  const [sentTo, setSentTo] = useState(null);
  const topicRef = useRef(null);

  const nameOk = name.trim().length >= 2;
  const emailOk = EMAIL_RE.test(email.trim());
  // Alcanza con elegir un tema o describir la consulta.
  const topicOk = topic !== null || message.trim().length >= 10;
  const formOk = nameOk && emailOk && topicOk;

  const send = async (token) => {
    setLoading(true);
    setError(null);
    const subjectTopic = topic ?? t("contact.temaGeneral");

    try {
      await axios.post(
        WORKER_URL,
        {
          to: contactEmail,
          subject: `Contacto web · ${subjectTopic} · ${name.trim()}`,
          text: [
            `Tema: ${subjectTopic}`,
            `Nombre: ${name.trim()}`,
            `Email: ${email.trim()}`,
            `Tel: ${phone.trim() || "N/D"}`,
            `Página: ${window.location.href}`,
            "",
            message.trim() || "(Sin mensaje)",
          ].join("\n"),
          html: null,
          turnstileToken: token,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      setSentTo(email.trim());
      setTopic(null);
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setSubmitted(false);
    } catch (err) {
      console.error("Error al enviar el formulario:", err);
      setError(err?.response?.data?.error || t("contact.mensajeNoEnviado"));
    } finally {
      // El token de Turnstile es de un solo uso.
      setTurnstileToken(null);
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setError(null);

    if (!formOk) {
      if (!topicOk) topicRef.current?.querySelector("button")?.focus();
      else if (!nameOk) document.getElementById("contact-name")?.focus();
      else document.getElementById("contact-email")?.focus();
      return;
    }

    // La verificación corre sola en segundo plano; si todavía no terminó,
    // el envío sale apenas llegue el token.
    if (!turnstileToken) {
      setWaitingToken(true);
      return;
    }
    send(turnstileToken);
  };

  useEffect(() => {
    if (waitingToken && tokenFailed) {
      setWaitingToken(false);
      setError(t("contact.verificacionError"));
      return;
    }
    if (waitingToken && turnstileToken) {
      setWaitingToken(false);
      send(turnstileToken);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [waitingToken, turnstileToken, tokenFailed]);

  // Los botones "Contactar" de los servicios precargan el mensaje.
  useEffect(() => {
    const handler = (event) => {
      setSentTo(null);
      setMessage(event.detail);
    };
    window.addEventListener("contact:setMessage", handler);
    return () => window.removeEventListener("contact:setMessage", handler);
  }, []);

  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });
  const field = { accent: c.primary, tone: "light", forceError: submitted };
  const busy = loading || waitingToken;

  return (
    <Box
      as="section"
      ref={ref}
      position="relative"
      overflow="hidden"
      bg="quarter.500"
      color={NAVY}
      mt={rem(20)}
      px={{ base: 5, md: 10, lg: "6%", xl: "8%" }}
      pt={{ base: 10, md: 12, "2xl": 14 }}
      pb={{ base: 16, md: 20, "2xl": 24 }}
    >
      {/* Fondo decorativo que se funde arriba y abajo con las secciones vecinas */}
      <Box
        position="absolute"
        inset={0}
        pointerEvents="none"
        sx={{
          maskImage: "linear-gradient(to bottom, transparent, black 22%, black 78%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 22%, black 78%, transparent)",
        }}
      >
      {/* Halos suaves con los colores de la marca */}
      <Box
        position="absolute"
        inset={0}
        bg={`radial-gradient(circle at 8% 15%, ${c.primary}1a, transparent 40%),
             radial-gradient(circle at 95% 90%, ${c.secondary}1a, transparent 42%)`}
      />
      {/* Grilla tenue que se desvanece hacia los bordes */}
      <Box
        position="absolute"
        inset={0}
        backgroundImage={`linear-gradient(${NAVY}0a 1px, transparent 1px), linear-gradient(90deg, ${NAVY}0a 1px, transparent 1px)`}
        backgroundSize="56px 56px"
        sx={{
          maskImage: "radial-gradient(ellipse at 25% 45%, black 15%, transparent 65%)",
          WebkitMaskImage: "radial-gradient(ellipse at 25% 45%, black 15%, transparent 65%)",
        }}
      />
      </Box>

      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        templateColumns={{ lg: "0.9fr 1.1fr" }}
        spacing={{ base: 10, lg: 14, xl: 20 }}
        maxW="1280px"
        mx="auto"
        alignItems="center"
        position="relative"
      >
        {/* Columna izquierda: propuesta y contacto directo */}
        <MotionBox variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}>
          <MotionBox variants={item}>
            <HStack
              display="inline-flex"
              spacing={2}
              px={3}
              py={1.5}
              borderRadius="full"
              bg="white"
              border="1px solid"
              borderColor={`${c.primary}33`}
              fontSize="sm"
              fontWeight={600}
              color={c.hover}
            >
              <Text m={0}>{t("contact.etiqueta")}</Text>
            </HStack>
          </MotionBox>

          <MotionBox variants={item}>
            <Text
              as="h2"
              mt={5}
              mb={0}
              fontFamily="'Poppins', sans-serif"
              fontSize={{ base: "4xl", md: "5xl" }}
              fontWeight="bold"
              lineHeight="1.08"
              letterSpacing="-0.03em"
              sx={{ textWrap: "balance" }}
            >
              {t("contact.titulo")}{" "}
              <Box as="span" bgGradient={`linear(to-r, ${c.primary}, ${c.secondary})`} bgClip="text">
                {t("contact.subtitulo")}
              </Box>
            </Text>
          </MotionBox>

          <MotionBox variants={item}>
            <Text mt={5} mb={0} fontSize={{ base: "md", md: "lg" }} color="gray.600" maxW="500px">
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
                  <Flex boxSize="32px" borderRadius="lg" align="center" justify="center" bg={`${c.primary}14`} color={c.hover}>
                    <Icon as={icon} boxSize="16px" />
                  </Flex>
                  <Text m={0} color="gray.700">{text}</Text>
                </HStack>
              ))}
            </VStack>
          </MotionBox>

          <MotionBox variants={item}>
            <Box mt={8} pt={6} borderTop="1px solid" borderColor="gray.200" maxW="500px">
              <Text m={0} mb={3} fontSize="sm" color="gray.500">
                {t("contact.directo")}
              </Text>
              <Flex gap={3} wrap="wrap">
                {[
                  { href: `mailto:${contactEmail}`, icon: FiMail, label: contactEmail },
                  { href: WHATSAPP_URL, icon: FaWhatsapp, label: "WhatsApp", external: true },
                ].map(({ href, icon, label, external }) => (
                  <Link
                    key={label}
                    href={href}
                    isExternal={external}
                    display="inline-flex"
                    alignItems="center"
                    gap={2}
                    px={3.5}
                    py={2}
                    borderRadius="full"
                    fontSize="sm"
                    fontWeight={600}
                    color={NAVY}
                    bg="white"
                    border="1px solid"
                    borderColor="gray.200"
                    transition="all .2s"
                    _hover={{ textDecoration: "none", borderColor: c.primary, color: c.hover }}
                  >
                    <Icon as={icon} color={c.primary} />
                    {label}
                  </Link>
                ))}
              </Flex>
            </Box>
          </MotionBox>
        </MotionBox>

        {/* Columna derecha: formulario en tarjeta */}
        <MotionBox
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
          bg="white"
          borderRadius="2xl"
          border="1px solid"
          borderColor="#e6e8f2"
          boxShadow={`0 30px 60px -30px ${NAVY}40`}
          p={{ base: 5, sm: 7, md: 9 }}
        >
          <AnimatePresence mode="wait">
            {sentTo ? (
              <MotionBox
                key="sent"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35 }}
                display="flex"
                flexDirection="column"
                alignItems="center"
                textAlign="center"
                py={{ base: 8, md: 14 }}
              >
                <Flex
                  boxSize="72px"
                  borderRadius="full"
                  bgGradient={`linear(135deg, ${c.primary}, ${c.secondary})`}
                  align="center"
                  justify="center"
                  boxShadow={`0 0 0 10px ${c.primary}14`}
                  mb={6}
                >
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <motion.path
                      d="M5 12.5l4.5 4.5L19 7.5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                    />
                  </svg>
                </Flex>
                <Text m={0} fontSize="2xl" fontWeight="bold">
                  {t("contact.mensajeEnviado")}
                </Text>
                <Text m={0} mt={2} color="gray.600" maxW="380px">
                  {t("contact.enviadoDetalle", { email: sentTo })}
                </Text>
                <Button
                  mt={7}
                  variant="outline"
                  borderRadius="full"
                  color={NAVY}
                  borderColor="gray.300"
                  _hover={{ bg: "gray.50", borderColor: c.primary }}
                  onClick={() => setSentTo(null)}
                >
                  {t("contact.otroMensaje")}
                </Button>
              </MotionBox>
            ) : (
              <motion.form key="form" onSubmit={handleSubmit} noValidate exit={{ opacity: 0, y: -8 }}>
                <VStack spacing={5} align="stretch">
                  {/* Tema: un clic en lugar de escribir desde cero */}
                  <Box>
                    <Text as="p" m={0} mb={3} fontWeight={600} id="contact-topic-label">
                      {t("contact.temaLabel")}
                    </Text>
                    <Wrap spacing={2} ref={topicRef} role="group" aria-labelledby="contact-topic-label">
                      {topics.map((label) => {
                        const active = topic === label;
                        return (
                          <WrapItem key={label}>
                            <Button
                              type="button"
                              size="sm"
                              h="2.25rem"
                              px={4}
                              borderRadius="full"
                              fontWeight={600}
                              aria-pressed={active}
                              onClick={() => setTopic(active ? null : label)}
                              bg={active ? `${c.primary}14` : "white"}
                              color={active ? c.hover : "gray.700"}
                              border="1.5px solid"
                              borderColor={active ? c.primary : "#e2e6ee"}
                              _hover={{ borderColor: active ? c.primary : "#c5ccd9" }}
                              _active={{ transform: "scale(0.97)" }}
                              leftIcon={active ? <Icon as={FiCheck} strokeWidth={3} /> : undefined}
                            >
                              {label}
                            </Button>
                          </WrapItem>
                        );
                      })}
                    </Wrap>
                    {submitted && !topicOk && (
                      <Text m={0} mt={2} fontSize="sm" color={ERROR}>
                        {t("contact.temaError")}
                      </Text>
                    )}
                  </Box>

                  <FloatingField
                    id="contact-name"
                    label={t("contact.nombreLabel")}
                    icon={FiUser}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    isValid={nameOk}
                    error={!nameOk ? t("contact.nombreError") : undefined}
                    autoComplete="name"
                    required
                    {...field}
                  />

                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 5, md: 4 }}>
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
                      forceError={false}
                    />
                  </SimpleGrid>

                  <Box>
                    <FloatingField
                      id="contact-message"
                      multiline
                      label={t("contact.mensajeLabel")}
                      icon={FiMessageSquare}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      isValid={message.trim().length >= 10}
                      {...field}
                      forceError={false}
                    />
                    <Text m={0} mt={2} ml={1} fontSize="sm" color="gray.500">
                      {t(`contact.ayuda.${key}`)}
                    </Text>
                  </Box>

                  {/* Turnstile invisible: solo ocupa lugar si pide interacción */}
                  <Box>
                  <Turnstile
                    siteKey={TURNSTILE_SITE_KEY}
                    onSuccess={(token) => {
                      setTokenFailed(false);
                      setTurnstileToken(token);
                    }}
                    onExpire={() => setTurnstileToken(null)}
                    onError={() => {
                      setTurnstileToken(null);
                      setTokenFailed(true);
                    }}
                    options={{ theme: "light", appearance: "interaction-only", size: "flexible" }}
                  />

                  <Flex
                    justify="space-between"
                    align="center"
                    gap={4}
                    direction={{ base: "column-reverse", sm: "row" }}
                    pt={2}
                  >
                    <Text m={0} fontSize="sm" color={error ? ERROR : "gray.500"} fontWeight={error ? 600 : 400} textAlign={{ base: "center", sm: "left" }}>
                      {error || t("contact.obligatorios")}
                    </Text>
                    <Button
                      type="submit"
                      isLoading={busy}
                      loadingText={waitingToken ? t("contact.verificando") : t("contact.mensajeEnviando")}
                      rightIcon={<Icon as={FiSend} />}
                      w={{ base: "100%", sm: "auto" }}
                      flexShrink={0}
                      h="3.25rem"
                      px={8}
                      borderRadius="full"
                      fontWeight={700}
                      color="white"
                      bg={c.primary}
                      boxShadow={`0 12px 28px -12px ${c.primary}`}
                      _hover={{ bg: c.hover, transform: "translateY(-1px)" }}
                      _active={{ transform: "translateY(0)" }}
                    >
                      {t("contact.boton")}
                    </Button>
                  </Flex>
                  </Box>
                </VStack>
              </motion.form>
            )}
          </AnimatePresence>
        </MotionBox>
      </SimpleGrid>
    </Box>
  );
}
