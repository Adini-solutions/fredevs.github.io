import { Box, Button, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export default function TranslateButton({ position }) {
    const { i18n } = useTranslation();

    const handleLanguageChange = () => {
        i18n.changeLanguage(i18n.language === "en" ? "es" : "en");
    };

    return (
        <Box
            position={position}
            bottom={position === "fixed" ? "20px" : { base: "auto", lg: "20px" }}
            left={position === "fixed" ? "20px" : { base: "auto", lg: "20px" }}
            top={position === "fixed" ? "auto" : { base: "20px", lg: "auto" }}
            right={position === "fixed" ? "auto" : { base: "20px", lg: "auto" }}
            p={2}
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={3}
            zIndex={1000}
        >
            <Button
                onClick={handleLanguageChange}
                bg={"gray.200"}
                color={"gray.600"}
                _hover={{ bg: "gray.300" }}
                size="lg"
                width="70px"
                height="40px"
                borderRadius="full"
                display="flex"
                justifyContent="center"
                alignItems="center"
                fontWeight="bold"
            >
                <Text fontSize={{ base: "md", md: "lg" }} my={0}>{i18n.language === "es" ? "ES" : "EN"}</Text>
            </Button>
        </Box>
    );
}
