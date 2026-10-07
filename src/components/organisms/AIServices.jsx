import { SimpleGrid, Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  LuFileSearch,
  LuBot,
  LuZap,
  LuHeadset,
  LuCompass,
} from "react-icons/lu";
import Title from "../molecules/Title";
import AIService from "../molecules/AIService";

// Mismo orden que aiServices.servicios en los archivos de idioma.
const serviceIcons = [LuFileSearch, LuBot, LuZap, LuHeadset, LuCompass];

export default function AIServices({ variant = "ia" }) {
  const { t } = useTranslation();
  const threshold = useMemo(() => (window.innerWidth < 768 ? 0.04 : 0.15), []);
  const { ref, inView } = useInView({ triggerOnce: true, threshold });

  const services = t("aiServices.servicios", { returnObjects: true });

  return (
    <>
      <Title
        title={t("aiServices.titulo")}
        subtitle={t("aiServices.subtitulo")}
        variant={variant}
        mt="50px"
        mb="50px"
      />

      <Box px={{ base: 6, md: 12, xl: 20 }} maxW="1500px" mx="auto" ref={ref}>
        <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={{ base: 6, xl: 8 }}>
          {Array.isArray(services) &&
            services.map((service, index) => (
              <motion.div
                key={index}
                style={{ display: "flex" }}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.08 * index }}
              >
                <AIService
                  service={service}
                  icon={serviceIcons[index] ?? LuZap}
                  variant={variant}
                />
              </motion.div>
            ))}
        </SimpleGrid>
      </Box>
    </>
  );
}
