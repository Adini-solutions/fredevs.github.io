import { Flex } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import Title from "../molecules/Title";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useMemo } from "react";
import Service from "../molecules/Service";
import Carrusel from "../molecules/Carrusel";

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
          gap={{ base: 12, "2xl": 20 }}
          // En pantallas intermedias la separación entre filas contempla la
          // ilustración, que sobresale unos 7rem por encima de cada tarjeta.
          columnGap={{ base: 12, md: 12, "2xl": 20 }}
          rowGap={{ base: 0, md: "10.5rem", "2xl": 20 }}
          mb={{ base: 0, md: 16, "2xl": 0 }}
          wrap="wrap"
          maxWidth={"1700px"}
          mx="auto"
        >
          {/* En celular las tarjetas van en carrusel; el margen negativo
              compensa el lugar que se reserva arriba para la ilustración. */}
          <Carrusel pt="120px" mt="-110px" color="#238b6f">
            {infraServices.map((service, index) => (
              <Service key={index} service={service} variant={variant} />
            ))}
          </Carrusel>
        </Flex>
      </motion.div>
    </>
  );
}
