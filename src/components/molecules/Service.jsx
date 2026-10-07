import { Box, Flex, Heading, List, ListItem, ListIcon } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { LuArrowRight } from "react-icons/lu";
import { useDisclosure } from "@chakra-ui/react";
import ServiceModal from "../organisms/ServiceModal";
import { useTranslation } from "react-i18next";
import { getAccent, getServiceNs } from "../../utils/variants";

export default function Service({ service, variant }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation();
  const accent = getAccent(variant);
  const ns = getServiceNs(variant);

  return (
    <>
      <Box
        role="group"
        position="relative"
        onClick={onOpen}
        p={6}
        pb={10}
        boxShadow="lg"
        borderRadius="md"
        bg="linear-gradient(to top, white, #f7f8ff)"
        borderLeft={"1px solid #f3f3f3"}
        borderRight={"1px solid #f3f3f3"}
        w={{ base: "330px", "2xl": "380px" }}
        textAlign="center"
        mb={"80px"}
        borderBottom={`4px solid ${accent.solid}`}
        transition="transform 0.2s ease-in-out"
        _hover={{
          transform: "translateY(-5px)",
          cursor: "pointer",
          bg: `linear-gradient(to top, ${accent.tintBg}, #f7f8ff)`
        }}
      >
        <Flex justify={"center"} align={"center"}>
          <img
            src={service.imagen}
            alt={service.titulo}
            style={{ marginTop: "-130px", width: "90%", borderRadius: "8px" }}
          />
        </Flex>
        <Heading textAlign={"left"} mt={8} mb={6} color="gray.700" size="md">
          {service.titulo}
        </Heading>
        <List p={0} spacing={2} textAlign="left" color="gray.700">
          {service.lista.map((item, idx) => (
            <ListItem key={idx}>
              <ListIcon mb={1} as={CheckCircleIcon} color={accent.solid} />
              {item}
            </ListItem>
          ))}
        </List>
        <Box
          position="absolute"
          right="16px"
          bottom="12px"
          display="flex"
          alignItems="center"
          gap={1}
          fontSize="sm"
          color={accent.solid}
          opacity={{ base: 1, lg: 0 }}
          transform="translateX(-4px)"
          transition="all 0.2s ease"
          pointerEvents="none"
          _groupHover={{
            opacity: 1,
            transform: "translateX(0)",
          }}
        >
          {t(`${ns}.verMas`)}
          <Box as={LuArrowRight} />
        </Box>
      </Box>
      <ServiceModal service={service} isOpen={isOpen} onClose={onClose} variant={variant} />
    </>
  );
}
