import { Flex, Text, Icon, SimpleGrid } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { LuServer, LuPlug, LuLayers, LuBadgeCheck } from "react-icons/lu";
import Title from "../molecules/Title";

// Mismo orden que `iaPage.porque.items` de los locales.
const ICONS = [LuServer, LuPlug, LuLayers, LuBadgeCheck];
const ACCENT = "#3b82f6";

export default function WhyAdini() {
  const { t } = useTranslation();
  const threshold = useMemo(() => (window.innerWidth < 768 ? 0.04 : 0.2), []);
  const { ref, inView } = useInView({ triggerOnce: true, threshold });
  const items = t("iaPage.porque.items", { returnObjects: true });

  return (
    <>
      <Title variant="ia" title={t("iaPage.porque.titulo")} subtitle={t("iaPage.porque.subtitulo")} mt="60px" mb="40px" />

      <SimpleGrid
        ref={ref}
        columns={{ base: 1, md: 2 }}
        spacingX={{ base: 6, xl: 12 }}
        spacingY={{ base: 8, md: 10 }}
        maxW="1200px"
        mx="auto"
        px={{ base: 5, md: 12, xl: 20 }}
      >
        {Array.isArray(items) &&
          items.map((item, i) => (
            <motion.div
              key={item.titulo}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}
            >
              <Flex gap={5} align="flex-start">
                <Flex
                  boxSize="52px"
                  flexShrink={0}
                  borderRadius="2xl"
                  align="center"
                  justify="center"
                  bg="white"
                  color={ACCENT}
                  border="1px solid"
                  borderColor="gray.100"
                  boxShadow="md"
                >
                  <Icon as={ICONS[i]} boxSize={6} />
                </Flex>
                <div>
                  <Text m={0} fontSize="xl" fontWeight="800" color="gray.800">
                    {item.titulo}
                  </Text>
                  <Text m={0} mt={2} color="gray.600" lineHeight="1.7">
                    {item.texto}
                  </Text>
                </div>
              </Flex>
            </motion.div>
          ))}
      </SimpleGrid>
    </>
  );
}
