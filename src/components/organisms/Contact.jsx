import { Box, Button, Flex, Text, Textarea, Input, Icon, VStack, Image } from "@chakra-ui/react";
import { useState } from "react";
import { FiSend } from "react-icons/fi";
import { HiMail } from "react-icons/hi";
import Title from "../molecules/Title";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import { Turnstile } from "@marsidev/react-turnstile";

const WORKER_URL = "https://email-worker.adini.workers.dev";
const TURNSTILE_SITE_KEY = "0x4AAAAAACH7eEMqIQ4uu34n";

export default function Contact({ variant = "default" }) {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);
  const { t } = useTranslation();
  const [turnstileToken, setTurnstileToken] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage(null);

    try {
      if (!turnstileToken) {
        throw new Error("Completa el captcha");
      }

      const payload = {
        to: "contacto@adini.com.ar",
        subject: `Contacto web - ${name || "Sin nombre"}`,
        text: [
          `Nombre: ${name}`,
          `Email: ${email}`,
          `Tel: ${phone || "N/D"}`,
          "",
          message
        ].join("\n"),
        html: null, // opcional: podrías armar HTML
        turnstileToken
      };

      await axios.post(WORKER_URL, payload, {
        headers: { "Content-Type": "application/json" },
      });

      setResponseMessage({ type: "success", text: t("contact.mensajeEnviado") });
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

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <>
      <Title title={t("contact.titulo")} subtitle={t("contact.subtitulo")} variant={variant} mt="60px" mb="40px" />

      <Flex>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -100 }}
          transition={{ duration: 0.8 }}
          style={{ width: "100%" }}
        >
          <Flex alignItems="center" justifyContent="left">
            <Box
              bg="white"
              p={8}
              pl={{ base: 8, lg: "15%" }}
              borderRadius={{ base: "none", lg: "md" }}
              borderTopLeftRadius={"none"}
              borderBottomLeftRadius={"none"}
              boxShadow="md"
              w={"100%"}
            >
              <Flex alignItems="center" mb={6}>
                <Icon as={HiMail} boxSize={8} color={variant === "infra" ? "#238b6f" : "#6c63ff"} mr={4} />
                <Text my={0} fontSize="xl" fontWeight="bold" color="#071e37">
                  {t("contact.descripcion")}
                </Text>
              </Flex>

              <form onSubmit={handleSubmit}>
                <VStack spacing={4} align="stretch">
                  <Input
                    placeholder={t("contact.nombreInput")}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    bg="#f9f9f9"
                    color="#071e37"
                    border="2px solid #e0e0e0"
                    _focus={{ borderColor: variant === "infra" ? "#238b6f" : "#6c63ff" }}
                    _placeholder={{ color: "#999999" }}
                    borderRadius="md"
                    p={4}
                  />
                  <Input
                    type="email"
                    placeholder={t("contact.correoInput")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    bg="#f9f9f9"
                    color="#071e37"
                    border="2px solid #e0e0e0"
                    _focus={{ borderColor: variant === "infra" ? "#238b6f" : "#6c63ff" }}
                    _placeholder={{ color: "#999999" }}
                    borderRadius="md"
                    p={4}
                  />
                  <Input
                    type="tel"
                    placeholder={t("contact.telefonoInput")}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    bg="#f9f9f9"
                    color="#071e37"
                    border="2px solid #e0e0e0"
                    _focus={{ borderColor: variant === "infra" ? "#238b6f" : "#6c63ff" }}
                    _placeholder={{ color: "#999999" }}
                    borderRadius="md"
                    p={4}
                  />
                  <Textarea
                    placeholder={t("contact.mensajeInput")}
                    size="md"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    bg="#f9f9f9"
                    color="#071e37"
                    resize="vertical"
                    maxHeight="200px"
                    minHeight="150px"
                    border="2px solid #e0e0e0"
                    _focus={{ borderColor: variant === "infra" ? "#238b6f" : "#6c63ff" }}
                    _placeholder={{ color: "#999999" }}
                    borderRadius="md"
                    p={4}
                  />
                  <Turnstile
                    siteKey={TURNSTILE_SITE_KEY}
                    onSuccess={(token) => setTurnstileToken(token)}
                    onExpire={() => setTurnstileToken(null)}
                    onError={() => setTurnstileToken(null)}
                    options={{ theme: "light" }}
                  />
                  <Flex justifyContent="space-between" align="center">
                    {responseMessage ?
                      (
                        <Text pr={3} m={0} color={responseMessage.type === "success" ? "green.500" : "red.500"} fontSize={{ base: "md", md: "lg" }} fontWeight="bold">
                          {responseMessage.text}
                        </Text>
                      ) :
                      (
                        <Text pr={3} m={0} fontSize={{ base: "md", md: "lg" }} color={variant === "infra" ? "#238b6f" : "#6c63ff"} fontWeight="bold">
                          {t("contact.span")}
                        </Text>
                      )
                    }
                    <Button
                      bg={variant === "infra" ? "#238b6f" : "#6c63ff"}
                      color="white"
                      _hover={{ bg: variant === "infra" ? "#1f7862" : "#5548e6" }}
                      type="submit"
                      isDisabled={
                        !message.trim() ||
                        !name.trim() ||
                        !email.trim() ||
                        !turnstileToken ||
                        loading
                      }
                      rightIcon={<Icon as={FiSend} />}
                      borderRadius="md"
                      p={4}
                    >
                      {loading ? t("contact.mensajeEnviando") : t("contact.boton")}
                    </Button>
                  </Flex>
                </VStack>
              </form>
            </Box>
          </Flex>
        </motion.div>
        <Flex display={{ base: "none", lg: "inherit" }} align={"center"} justify={"center"}>
          <Box mx={{ base: "40px", "2xl": "120px" }} w={{ base: 350, xl: 400 }}>
            <Image src="/assets/icons/contact.svg" />
          </Box>
        </Flex>
      </Flex>
    </>
  );
}
