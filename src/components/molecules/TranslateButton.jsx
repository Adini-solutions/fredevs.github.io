import { Box, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FiGlobe } from "react-icons/fi";

const languages = ["es", "en"];

// Selector de idioma fijo abajo a la izquierda: una pastilla de vidrio oscuro
// con letras blancas, que se lee tanto sobre el banner como sobre secciones
// claras. El resaltado se desliza hasta el idioma activo.
export default function TranslateButton() {
    const { i18n } = useTranslation();
    const current = i18n.language?.startsWith("en") ? "en" : "es";

    return (
        <Flex
            role="group"
            aria-label="Idioma / Language"
            position="fixed"
            bottom="24px"
            left="24px"
            zIndex={9}
            align="center"
            gap={1}
            p="4px"
            pl={3}
            borderRadius="full"
            bg="rgba(5, 13, 31, 0.62)"
            border="1px solid rgba(255, 255, 255, 0.18)"
            backdropFilter="saturate(160%) blur(12px)"
            boxShadow="0 8px 24px rgba(5, 13, 31, 0.25)"
            color="white"
        >
            <Box as={FiGlobe} boxSize="15px" opacity={0.8} mr={1} />
            {languages.map((lng) => (
                <Box
                    key={lng}
                    as="button"
                    onClick={() => i18n.changeLanguage(lng)}
                    aria-pressed={current === lng}
                    position="relative"
                    w="40px"
                    h="30px"
                    borderRadius="full"
                    fontSize="sm"
                    fontWeight="semibold"
                    letterSpacing="0.06em"
                    color={current === lng ? "white" : "whiteAlpha.600"}
                    transition="color 0.2s ease"
                    _hover={{ color: "white" }}
                >
                    {current === lng && (
                        <motion.span
                            layoutId="language-indicator"
                            transition={{ type: "spring", stiffness: 400, damping: 32 }}
                            style={{
                                position: "absolute",
                                inset: 0,
                                borderRadius: 9999,
                                background: "rgba(255, 255, 255, 0.18)",
                                boxShadow: "inset 0 0 0 1px rgba(255, 255, 255, 0.25)",
                            }}
                        />
                    )}
                    <Box as="span" position="relative">{lng.toUpperCase()}</Box>
                </Box>
            ))}
        </Flex>
    );
}
