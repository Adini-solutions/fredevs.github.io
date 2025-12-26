import { Box, Flex, Heading, List, ListItem, ListIcon, Button } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/react";
import ServiceModal from "../organisms/ServiceModal";

export default function Service({ service, variant }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        onClick={onOpen}
        p={6}
        boxShadow="lg"
        borderRadius="md"
        bg="linear-gradient(to top, white, #f7f8ff)"
        borderLeft={"1px solid #f3f3f3"}
        borderRight={"1px solid #f3f3f3"}
        w={{ base: "330px", "2xl": "380px" }}
        textAlign="center"
        borderBottom={variant === "infra" ? "4px solid #238b6f" : "4px solid #6c63ff"}
        transition="transform 0.2s ease-in-out"
        _hover={{ transform: "translateY(-5px)", cursor: "pointer", bg: variant === "infra" ? "linear-gradient(to top, #f0fcf9, #f7f8ff)" : "linear-gradient(to top, #f1f0ff, #f7f8ff)" }}
        mb={"80px"}
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
              <ListIcon mb={1} as={CheckCircleIcon} color={variant === "infra" ? "#238b6f" : "tertiary.500"} />
              {item}
            </ListItem>
          ))}
        </List>
      </Box>
      <ServiceModal service={service} isOpen={isOpen} onClose={onClose} variant={variant} />
    </>
  );
}
