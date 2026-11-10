import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import Title from "../molecules/Title";

const ACCENT = "#2563eb";

/** Preguntas frecuentes de `${ns}.items` ({ pregunta, respuesta }). */
export default function FAQ({ ns = "iaPage.faq" }) {
  const { t } = useTranslation();
  const items = t(`${ns}.items`, { returnObjects: true });

  return (
    <>
      <Title variant="ia" title={t(`${ns}.titulo`)} subtitle={t(`${ns}.subtitulo`)} mt="60px" mb="40px" />

      <Box maxW="900px" mx="auto" px={{ base: 5, md: 12 }}>
        <Accordion allowToggle defaultIndex={[0]}>
          {Array.isArray(items) &&
            items.map((item) => (
              <AccordionItem
                key={item.pregunta}
                bg="white"
                border="1px solid"
                borderColor="gray.100"
                borderRadius="xl"
                mb={3}
                boxShadow="sm"
                overflow="hidden"
                _last={{ mb: 0 }}
              >
                {({ isExpanded }) => (
                  <>
                    <h3 style={{ margin: 0 }}>
                      <AccordionButton px={{ base: 5, md: 6 }} py={5} _hover={{ bg: "gray.50" }}>
                        <Text
                          as="span"
                          m={0}
                          flex="1"
                          textAlign="left"
                          fontSize={{ base: "md", md: "lg" }}
                          fontWeight="700"
                          color={isExpanded ? ACCENT : "gray.800"}
                          transition="color .2s"
                        >
                          {item.pregunta}
                        </Text>
                        <AccordionIcon color={isExpanded ? ACCENT : "gray.400"} boxSize={6} />
                      </AccordionButton>
                    </h3>
                    <AccordionPanel px={{ base: 5, md: 6 }} pt={0} pb={6}>
                      <Text m={0} color="gray.600" lineHeight="1.7">
                        {item.respuesta}
                      </Text>
                    </AccordionPanel>
                  </>
                )}
              </AccordionItem>
            ))}
        </Accordion>
      </Box>
    </>
  );
}
