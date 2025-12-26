import { Button as ChakraButton } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export default function Button({ variant = "default", text = "", leftIcon = null, ...props }) {
    const { t } = useTranslation();

    const colors = {
        dev: {
            bg: "tertiary.500",
            hover: "#5548e6",
            color: "secondary.500",
        },
        default: {
            bg: "tertiary.500",
            hover: "#5548e6",
            color: "secondary.500",
        },
        infra: {
            bg: "#238b6f",
            hover: "#1f7862",
            color: "white",
        },
    };

    const { bg, hover, color } = colors[variant];

    return (
        <ChakraButton
            leftIcon={leftIcon}
            bg={bg}
            color={color}
            _hover={{ transform: "scale(1.05)", bg: hover }}
            {...props}
        >
            {t(text)}
        </ChakraButton>
    );
}
