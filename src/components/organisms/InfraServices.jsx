import { Flex } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import Title from "../molecules/Title";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useMemo } from "react";
import Service from "../molecules/Service";

export default function InfraServices({ variant = "infra" }) {
  const threshold = useMemo(() => (window.innerWidth < 768 ? 0.04 : 0.2), []);
  const { ref, inView } = useInView({ triggerOnce: true, threshold });
  const { t } = useTranslation();

  const infraServices = t("infraServices.servicios", { returnObjects: true });

  return (
    <>
      <Title title={t("infraServices.titulo")} subtitle={t("infraServices.subtitulo")} variant={variant} mt="50px" mb="140px" />

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
          {infraServices.map((service, index) => (
            <Service key={index} service={service} variant={variant} />
          ))}
        </Flex>
      </motion.div>
    </>
  );
}
