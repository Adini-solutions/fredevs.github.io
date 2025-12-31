import {
  Flex,
  Box,
  Text,
  VStack,
  Icon,
  HStack,
} from "@chakra-ui/react";
import Title from "../molecules/Title";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { LuCode, LuCloudCog, LuArrowRight } from "react-icons/lu";
import { useTranslation } from "react-i18next";

export default function ServiceAreas() {
  const threshold = useMemo(() => (window.innerWidth < 768 ? 0.04 : 0.2), []);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { ref, inView } = useInView({ triggerOnce: true, threshold });

  const areas = [
    {
      key: "dev",
      title: t("serviceAreas.areas.0.title"),
      subtitle: t("serviceAreas.areas.0.subtitle"),
      description: t("serviceAreas.areas.0.description"),
      cta: t("serviceAreas.areas.0.cta"),
      accent: "#6c63ff",
      route: "/dev",
      icon: LuCode,
    },
    {
      key: "infra",
      title: t("serviceAreas.areas.1.title"),
      subtitle: t("serviceAreas.areas.1.subtitle"),
      description: t("serviceAreas.areas.1.description"),
      cta: t("serviceAreas.areas.1.cta"),
      accent: "#2bb691",
      route: "/infra",
      icon: LuCloudCog,
    },
  ];

  const navigateWithScroll = (path) => {
    navigate(path);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Title title={t("serviceAreas.titulo")} subtitle={t("serviceAreas.subtitulo")} mt="50px" mb="40px" />

      <div ref={ref}>
        <Flex
          justify="center"
          gap={{ base: 8, xl: 10 }}
          px={{ base: 8, md: 20 }}
          direction={{ base: "column", md: "row" }}
          maxW="1600px"
          mx={"auto"}
        >
          {areas.map((area, index) => (
            <motion.div
              key={area.key}
              style={{ width: "100%" }}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Box
                role="group"
                bg="white"
                borderRadius="3xl"
                boxShadow="lg"
                p={{ base: 8, xl: 12 }}
                cursor="pointer"
                onClick={() => navigateWithScroll(area.route)}
                position="relative"
                overflow="hidden"
                border="1px solid"
                borderColor="gray.100"
                transition="all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
                _hover={{
                  transform: "translateY(-8px)",
                  boxShadow: `0 0 20px ${area.accent}50`,
                  borderColor: `${area.accent}60`,
                }}
                height="100%"
                display="flex"
                flexDirection="column"
              >
                <Flex align="center" mb={6} justify="space-between" zIndex="1">
                  <Flex
                    align="center"
                    justify="center"
                    boxSize="60px"
                    borderRadius="2xl"
                    bg="gray.50"
                    color={area.accent}
                    border="1px solid"
                    borderColor="gray.100"
                    mr={4}
                    transition="all 0.3s ease"
                    _groupHover={{
                      bg: area.accent,
                      color: "white",
                      borderColor: area.accent,
                    }}
                  >
                    <Icon as={area.icon} boxSize={7} />
                  </Flex>

                  <Text
                    fontSize="xs"
                    fontWeight="bold"
                    letterSpacing="wider"
                    textTransform="uppercase"
                    color={area.accent}
                    bg={`${area.accent}10`}
                    px={3}
                    py={1}
                    borderRadius="full"
                  >
                    {area.subtitle}
                  </Text>
                </Flex>

                <VStack align="start" spacing={4} flex="1" zIndex="1">
                  <Text
                    fontSize={{ base: "2xl", xl: "3xl" }}
                    fontWeight="800"
                    color="gray.800"
                    lineHeight="1.2"
                  >
                    {area.title}
                  </Text>

                  <Text fontSize="lg" color="gray.600" lineHeight="1.6">
                    {area.description}
                  </Text>
                </VStack>

                <HStack
                  mt={10}
                  spacing={2}
                  color={area.accent}
                  fontWeight="bold"
                  align="center"
                  zIndex="1"
                >
                  <Text m={0} fontSize="md">{area.cta}</Text>
                  <Icon
                    as={LuArrowRight}
                    transition="transform 0.3s ease"
                    transform="translateX(0)"
                    _groupHover={{ transform: "translateX(5px)" }}
                  />
                </HStack>
              </Box>
            </motion.div>
          ))}
        </Flex>
      </div>
    </>
  );
}
