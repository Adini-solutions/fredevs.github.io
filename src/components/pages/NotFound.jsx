import React from "react";
import { Flex, Button, Image, Heading, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import SEO from "../../utils/SEO";

export default function NotFound() {
  return (
    <Flex justifyContent="center" alignItems="center" flexDirection="column" h="100vh" w="100vw" p={3}>
      <SEO noindex />
      <Image src="/assets/brand/adini-logotipo-purple.svg" alt="Adini" h="4rem" mb={6} />
      <Heading as="h1" fontSize="2xl" textAlign="center" m={0}>
        404 - Página no encontrada
      </Heading>
      <Text textAlign="center" mt={3} mb={6}>
        No pudimos encontrar la página que buscás.
      </Text>
      <Button
        as={RouterLink}
        to="/"
        variant="solid"
        bg="tertiary.500"
        color="secondary.500"
        fontSize="md"
        _hover={{ transform: "scale(1.05)", bg: "#5548e6", textDecoration: "none" }}
      >
        Volver al inicio
      </Button>
    </Flex>
  );
}
