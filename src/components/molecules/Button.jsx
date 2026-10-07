import { Button as ChakraButton } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { getAccent } from "../../utils/variants";

export default function Button({ variant = "default", text = "", leftIcon = null, ...props }) {
    const { t } = useTranslation();

    const accent = getAccent(variant);
    const bg = accent.solid;
    const hover = accent.hover;
    const color = variant === "infra" || variant === "ia" ? "white" : "secondary.500";

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
