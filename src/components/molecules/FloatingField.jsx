import { useState } from "react";
import { Box, Icon, Text } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheck, FiAlertCircle } from "react-icons/fi";

const MotionBox = motion(Box);
const ERROR = "#ff6b6b";
const EASE = "cubic-bezier(.4,0,.2,1)";

/**
 * Campo con label flotante al estilo "outlined" de MUI: el label arranca
 * dentro del input y, al enfocar o completar, sube y corta el borde. El corte
 * se hace con un <fieldset>/<legend> (igual que MUI), así funciona sobre
 * cualquier fondo, incluso degradés. `tone="dark"` es para fondos oscuros.
 */
export default function FloatingField({
  id,
  label,
  icon,
  value,
  onChange,
  type = "text",
  multiline = false,
  accent = "#6c63ff",
  tone = "light",
  isValid = false,
  error,
  required = false,
  autoComplete,
}) {
  const [focused, setFocused] = useState(false);
  const [touched, setTouched] = useState(false);
  const dark = tone === "dark";
  const floating = focused || value.length > 0;
  const showError = Boolean(error) && touched && !focused && value.length > 0;
  const color = showError ? ERROR : accent;

  const palette = dark
    ? { text: "white", idle: "rgba(255,255,255,0.18)", hover: "rgba(255,255,255,0.35)", label: "rgba(255,255,255,0.6)", icon: "rgba(255,255,255,0.45)", bg: "rgba(255,255,255,0.04)", bgFocus: "rgba(255,255,255,0.07)" }
    : { text: "#091c30", idle: "#e2e6ee", hover: "#c5ccd9", label: "#7b8494", icon: "#9aa3b2", bg: "#f9fafc", bgFocus: "white" };

  const borderColor = showError ? ERROR : focused ? accent : palette.idle;
  const fieldProps = {
    id,
    value,
    onChange,
    onFocus: () => setFocused(true),
    onBlur: () => {
      setFocused(false);
      setTouched(true);
    },
    autoComplete,
    required,
    "aria-invalid": showError || undefined,
  };

  return (
    <Box w="100%">
      <Box
        position="relative"
        borderRadius="12px"
        bg={focused ? palette.bgFocus : palette.bg}
        boxShadow={focused ? `0 0 0 4px ${color}26, 0 12px 32px -14px ${color}` : "none"}
        transition={`background-color .25s ease, box-shadow .3s ease`}
        role="group"
        sx={{ "&:hover fieldset": { borderColor: focused || showError ? borderColor : palette.hover } }}
      >
        <Icon
          as={icon}
          position="absolute"
          left="16px"
          top={multiline ? "19px" : "50%"}
          transform={`${multiline ? "" : "translateY(-50%)"} scale(${focused ? 1.12 : 1})`}
          boxSize="18px"
          pointerEvents="none"
          color={focused || showError ? color : palette.icon}
          transition="color .25s ease, transform .25s ease"
        />

        <Box
          as={multiline ? "textarea" : "input"}
          type={multiline ? undefined : type}
          {...fieldProps}
          display="block"
          w="100%"
          h={multiline ? undefined : "3.6rem"}
          minH={multiline ? { base: "150px", md: "8rem", "2xl": "150px" } : undefined}
          maxH={multiline ? "240px" : undefined}
          resize={multiline ? "vertical" : undefined}
          pl="46px"
          pr="46px"
          py={multiline ? "16px" : 0}
          bg="transparent"
          border="none"
          outline="none"
          color={palette.text}
          fontSize="md"
          lineHeight="1.5"
          position="relative"
          zIndex={1}
          sx={{ caretColor: accent, "&:-webkit-autofill": { WebkitTextFillColor: palette.text, transition: "background-color 9999s" } }}
        />

        {/* Borde con hueco para el label (como el notched outline de MUI) */}
        <Box
          as="fieldset"
          aria-hidden
          position="absolute"
          inset="-5px 0 0 0"
          m={0}
          px="10px"
          py={0}
          border={`${focused || showError ? 2 : 1.5}px solid`}
          borderColor={borderColor}
          borderRadius="12px"
          pointerEvents="none"
          minW={0}
          transition={`border-color .25s ease`}
        >
          <Box
            as="legend"
            float="unset"
            w="auto"
            h="11px"
            p={0}
            m={0}
            fontSize="0.82em"
            visibility="hidden"
            whiteSpace="nowrap"
            overflow="hidden"
            display="block"
            maxW={floating ? "100%" : "0.01px"}
            transition={floating ? `max-width .1s ${EASE} .05s` : `max-width .05s ${EASE}`}
          >
            <Box as="span" px="5px" display="inline-block" fontWeight={600}>
              {label}
              {required && " *"}
            </Box>
          </Box>
        </Box>

        <Box
          as="label"
          htmlFor={id}
          position="absolute"
          left="0"
          top="0"
          m={0}
          zIndex={2}
          pointerEvents="none"
          whiteSpace="nowrap"
          lineHeight="1.2"
          fontSize="md"
          transformOrigin="left top"
          transform={
            floating
              ? "translate(15px, -9px) scale(0.82)"
              : `translate(46px, ${multiline ? "17px" : "1.2rem"}) scale(1)`
          }
          color={floating ? color : palette.label}
          fontWeight={floating ? 600 : 400}
          transition={`transform .22s ${EASE}, color .22s ease`}
        >
          {label}
          {required && (
            <Text as="span" ml="3px" color={floating ? color : palette.icon}>
              *
            </Text>
          )}
        </Box>

        <Box
          position="absolute"
          right="14px"
          top={multiline ? "16px" : "50%"}
          transform={multiline ? "none" : "translateY(-50%)"}
          zIndex={2}
          pointerEvents="none"
          display="flex"
        >
          <AnimatePresence>
            {(isValid || showError) && (
              <MotionBox
                key={showError ? "error" : "ok"}
                initial={{ scale: 0, rotate: -90, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 22 }}
                display="flex"
                alignItems="center"
                justifyContent="center"
                boxSize="22px"
                borderRadius="full"
                bg={showError ? `${ERROR}26` : `${accent}2e`}
              >
                <Icon as={showError ? FiAlertCircle : FiCheck} boxSize="14px" color={showError ? ERROR : accent} strokeWidth={3} />
              </MotionBox>
            )}
          </AnimatePresence>
        </Box>
      </Box>

      <AnimatePresence>
        {showError && (
          <MotionBox
            initial={{ opacity: 0, height: 0, y: -4 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            overflow="hidden"
          >
            <Text m={0} mt="6px" ml="16px" fontSize="sm" color={ERROR}>
              {error}
            </Text>
          </MotionBox>
        )}
      </AnimatePresence>
    </Box>
  );
}
