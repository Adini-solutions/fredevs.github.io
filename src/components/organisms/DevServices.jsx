import { Flex } from "@chakra-ui/react";
import Title from "../molecules/Title";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Service from "../molecules/Service";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

export default function DevServices({ variant = "default" }) {
  const threshold = useMemo(() => (window.innerWidth < 768 ? 0.04 : 0.2), []);
  const { ref, inView } = useInView({ triggerOnce: true, threshold });
  const { t } = useTranslation();

  const devServices = t("devServices.servicios", { returnObjects: true });

  return (
    <>
      <Title title={t("devServices.titulo")} subtitle={t("devServices.subtitulo")} variant={variant} mt="50px" mb="140px" />

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Flex
          justify="center"
          gap={{ base: 12, xl: 20 }}
          wrap="wrap"
          maxWidth={"1700px"}
          mx="auto"
        >
          {devServices.map((service, index) => (
            <Service key={index} service={service} variant={variant} />
          ))}
        </Flex>
      </motion.div>
    </>
  );
}
