import { Box, Flex, Text, List, ListItem, ListIcon, Icon, useDisclosure } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { LuArrowRight, LuClock } from "react-icons/lu";
import { useTranslation } from "react-i18next";
import ServiceModal from "../organisms/ServiceModal";
import { getAccent, getServiceNs } from "../../utils/variants";
import { isPlaceholder } from "../../utils/placeholders";

/**
 * Tarjeta de oferta de IA. A diferencia de `Service`, no muestra una
 * ilustracion sino el plazo y el resultado esperado, que es lo que pregunta
 * quien evalua contratar una solucion de IA.
 */
export default function AIService({ service, icon, variant = "ia" }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation();
  const accent = getAccent(variant);
  const ns = getServiceNs(variant);

  return (
    <>
      <Box
        role="group"
        onClick={onOpen}
        cursor="pointer"
        bg="white"
        borderRadius="2xl"
        border="1px solid"
        borderColor="gray.100"
        boxShadow="md"
        p={{ base: 6, xl: 8 }}
        w="100%"
        h="100%"
        display="flex"
        flexDirection="column"
        transition="all 0.3s ease"
        _hover={{
          transform: "translateY(-6px)",
          boxShadow: `0 16px 36px rgba(${accent.rgb}, 0.18)`,
          borderColor: `rgba(${accent.rgb}, 0.45)`,
        }}
      >
        <Flex
          align="center"
          justify="center"
          boxSize="52px"
          borderRadius="xl"
          bg={accent.tintBg}
          color={accent.deep}
          border="1px solid"
          borderColor={`rgba(${accent.rgb}, 0.25)`}
          mb={5}
          flexShrink={0}
          transition="all 0.3s ease"
          _groupHover={{ bg: accent.solid, color: "white", borderColor: accent.solid }}
        >
          <Icon as={icon} boxSize={6} />
        </Flex>

        <Text fontSize="xl" fontWeight="800" color="gray.800" lineHeight="1.3" mb={2}>
          {service.titulo}
        </Text>

        <Text fontSize="sm" color="gray.600" lineHeight="1.6" mb={5}>
          {service.resumen}
        </Text>

        <List p={0} spacing={2} textAlign="left" color="gray.700" fontSize="sm" mb={5} flex="1">
          {service.lista?.map((item, idx) => (
            <ListItem key={idx}>
              <ListIcon mb={1} as={CheckCircleIcon} color={accent.solid} />
              {item}
            </ListItem>
          ))}
        </List>

        <Flex align="center" justify="space-between" gap={3} mt="auto">
          {!isPlaceholder(service.plazo) && service.plazo ? (
            <Flex align="center" gap={2} color="gray.500" fontSize="xs" fontWeight="600">
              <Icon as={LuClock} boxSize={4} />
              <Text m={0}>{service.plazo}</Text>
            </Flex>
          ) : (
            <Box />
          )}

          <Flex
            align="center"
            gap={1}
            fontSize="sm"
            fontWeight="600"
            color={accent.deep}
            flexShrink={0}
          >
            {t(`${ns}.verMas`)}
            <Icon
              as={LuArrowRight}
              transition="transform 0.3s ease"
              _groupHover={{ transform: "translateX(4px)" }}
            />
          </Flex>
        </Flex>
      </Box>

      <ServiceModal service={service} isOpen={isOpen} onClose={onClose} variant={variant} />
    </>
  );
}
