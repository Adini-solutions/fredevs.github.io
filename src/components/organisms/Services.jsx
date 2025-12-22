import { Flex } from "@chakra-ui/react";
import Title from "../molecules/Title";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Service from "../molecules/Service";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

export default function Services({ variant = "default" }) {
  const threshold = useMemo(() => (window.innerWidth < 768 ? 0.04 : 0.2), []);
  const { t } = useTranslation();

  const { ref, inView } = useInView({ triggerOnce: true, threshold });

  const services = t("services.servicios", { returnObjects: true });

  return (
    <>
      <Title title={t("services.titulo")} subtitle={t("services.subtitulo")} variant={variant} mt="50px" mb="140px" />

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Flex justify="center" gap={{ base: 12, xl: 20 }} wrap="wrap" mx={10}>
          {services.map((service, index) => (
            <Service key={index} title={service.titulo} image={service.imagen} serviceList={service.lista} variant={variant} />
          ))}
        </Flex>
      </motion.div>
    </>
  );
}
