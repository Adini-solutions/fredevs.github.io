import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import Title from "../molecules/Title";
import { getAccent } from "../../utils/variants";

/**
 * Las objeciones que frenan una decision de IA (datos, alucinaciones, costo)
 * respondidas de frente. Es lo que mas preguntan los leads antes de avanzar.
 */
export default function AIFaq({ variant = "ia" }) {
  const { t } = useTranslation();
  const threshold = useMemo(() => (window.innerWidth < 768 ? 0.04 : 0.15), []);
  const { ref, inView } = useInView({ triggerOnce: true, threshold });
  const accent = getAccent(variant);

  const items = t("aiFaq.items", { returnObjects: true });

  return (
    <>
      <Title
        title={t("aiFaq.titulo")}
        subtitle={t("aiFaq.subtitulo")}
        variant={variant}
        mt="60px"
        mb="40px"
      />

      <Box px={{ base: 6, md: 12 }} maxW="900px" mx="auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <Accordion allowToggle>
            {Array.isArray(items) &&
              items.map((item, index) => (
                <AccordionItem
                  key={index}
                  bg="white"
                  border="1px solid"
                  borderColor="gray.100"
                  borderRadius="xl"
                  mb={3}
                  overflow="hidden"
                  boxShadow="sm"
                  _hover={{ borderColor: `rgba(${accent.rgb}, 0.35)` }}
                  transition="border-color 0.2s ease"
                >
                  <AccordionButton
                    py={5}
                    px={{ base: 4, md: 6 }}
                    _hover={{ bg: accent.tintBg }}
                    _expanded={{ bg: accent.tintBg, color: accent.deep }}
                  >
                    <Text
                      flex="1"
                      textAlign="left"
                      m={0}
                      fontSize={{ base: "md", md: "lg" }}
                      fontWeight="700"
                      color="inherit"
                    >
                      {item.pregunta}
                    </Text>
                    <AccordionIcon />
                  </AccordionButton>

                  <AccordionPanel pb={6} px={{ base: 4, md: 6 }}>
                    <Text m={0} fontSize="md" color="gray.600" lineHeight="1.7">
                      {item.respuesta}
                    </Text>
                  </AccordionPanel>
                </AccordionItem>
              ))}
          </Accordion>
        </motion.div>
      </Box>
    </>
  );
}
