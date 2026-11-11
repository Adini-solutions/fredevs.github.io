import { Box, Flex, Image, Text, Button } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTranslation } from "react-i18next";
import { LuArrowUpRight, LuGraduationCap } from "react-icons/lu";
import { CURSO_URL } from "../../utils/curso";

const UTN_RED = "#a31235";

/**
 * El curso de IA que ADINI dicta en la UTN.BA, con enlace a su web
 * (innovia.adini.com.ar). Va en el home y en /ia.
 */
export default function CourseBanner() {
  const { t } = useTranslation();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <Box ref={ref} maxW="1200px" mx="auto" px={{ base: 5, md: 12, xl: 20 }} mt={{ base: 14, md: 20 }}>
      <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease: "easeOut" }}>
        <Flex
          direction={{ base: "column", md: "row" }}
          align={{ base: "flex-start", md: "center" }}
          gap={{ base: 6, md: 10 }}
          p={{ base: 6, md: 10 }}
          bg="white"
          borderRadius="2xl"
          border="1px solid"
          borderColor="gray.100"
          boxShadow="md"
          position="relative"
          overflow="hidden"
        >
          <Box position="absolute" left={0} right={0} bottom={0} h="4px" bg={UTN_RED} />

          <Image src="/assets/clients/utn-frba.webp" alt="UTN Facultad Regional Buenos Aires" h={{ base: "40px", md: "52px" }} w="auto" flexShrink={0} />

          <Box flex={1}>
            <Flex align="center" gap={2} color={UTN_RED} fontSize="xs" fontWeight="700" letterSpacing="wider" textTransform="uppercase">
              <Box as={LuGraduationCap} size={16} />
              {t("iaPage.curso.etiqueta")}
            </Flex>
            <Text m={0} mt={2} fontSize={{ base: "xl", md: "2xl" }} fontWeight="800" color="gray.800" lineHeight="1.25">
              {t("iaPage.curso.titulo")}
            </Text>
            <Text m={0} mt={2} color="gray.600" lineHeight="1.6">
              {t("iaPage.curso.texto")}
            </Text>
          </Box>

          <Button
            as="a"
            href={CURSO_URL}
            target="_blank"
            rel="noopener noreferrer"
            flexShrink={0}
            h="3rem"
            px={6}
            borderRadius="full"
            variant="outline"
            color={UTN_RED}
            borderColor={UTN_RED}
            rightIcon={<LuArrowUpRight />}
            _hover={{ bg: UTN_RED, color: "white" }}
          >
            {t("iaPage.curso.boton")}
          </Button>
        </Flex>
      </motion.div>
    </Box>
  );
}
