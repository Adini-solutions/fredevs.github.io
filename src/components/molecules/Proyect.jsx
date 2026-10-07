import { useState } from "react";
import { Box, Flex, Text, Heading, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useInView } from 'react-intersection-observer';
import { useTranslation } from "react-i18next";
import ModalPortfolio from "./ModalPortfolio";
import { LuArrowRight } from "react-icons/lu";

const MotionBox = motion(Flex);

/**
 * Tarjeta de proyecto del portfolio. Por defecto abre un modal con el detalle;
 * si recibe `href` (proyectos que tienen su caso en stories.adini.com.ar),
 * abre esa página en una pestaña nueva en lugar del modal.
 */
export default function Proyect({ title, summary, description, logo, imgs, tecnologies, mobile = false, href }) {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    const open = () => {
        if (href) window.open(href, "_blank", "noopener,noreferrer");
        else setIsOpen(true);
    };

    const { ref, inView } = useInView({
        // En celular las tarjetas van en carrusel y la siguiente sólo asoma:
        // con un umbral bajo se muestra igual.
        threshold: window.innerWidth < 768 ? 0.05 : 0.4,
        triggerOnce: true,
    });

    return (
        <>
            <MotionBox
                ref={ref}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                w="100%"
                maxW="md"
            >
                <Flex
                    direction={"column"}
                    justifyContent={"space-between"}
                    transition="transform 0.2s ease-in-out"
                    w="100%"
                    mb={0} p={4}
                    borderRadius="md"
                    boxShadow="md"
                    bg={"white"}
                    cursor={"pointer"}
                    borderTop={"2px solid #5548e6"}
                    borderBottom={"2px solid #5548e6"}
                    _hover={{
                        boxShadow: "xl",
                        transform: "translateY(-5px)",
                    }}
                    onClick={open}
                >
                    <Flex justify="center" align="center" mb={{ base: 3, md: 1, "2xl": 3 }}>
                        <Heading fontSize={{ base: "2xl", md: "xl", "2xl": "2xl" }} textAlign={"center"} fontWeight={0} fontFamily="Poppins, sans-serif" color="gray.700" px={1} py={2}>{title}</Heading>
                    </Flex>
                    <Box
                        h={{ base: "150px", md: "6.5rem", "2xl": "150px" }}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        bg="white"
                    >
                        <Image
                            src={logo}
                            alt={`${title} logo`}
                            maxH="100%"
                            maxW="100%"
                            objectFit="contain"
                        />
                    </Box>
                    <Box p={4} pb={0}>
                        {/* En celular y pantallas intermedias el resumen se corta: el detalle completo está en el modal. */}
                        <Text fontSize="md" color="gray.700" mb={4} noOfLines={{ base: 7, md: 5, "2xl": 12 }}>{summary}</Text>
                    </Box>
                    <Flex
                        as="button"
                        justify="center"
                        align="center"
                        gap={2}
                        my={2}
                        fontSize={"md"}
                        fontWeight="600"
                        color="#3d2b99"
                        role="group"
                        onClick={open}
                    >
                        <Text
                            as="span"
                            display="inline-block"
                            borderBottom="1px solid transparent"
                            transition="border-color 0.2s ease"
                            _groupHover={{ borderColor: "tertiary.500" }}
                        >
                            {t("portfolio.detalles")}
                        </Text>

                        <Box
                            as={LuArrowRight}
                            size={16}
                            transition="transform 0.2s ease"
                            _groupHover={{ transform: "translateX(4px)" }}
                        />
                    </Flex>
                </Flex>
            </MotionBox>

            {!href && (
                <ModalPortfolio
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    title={title}
                    description={description}
                    imgs={imgs}
                    tecnologies={tecnologies}
                    mobile={mobile}
                />
            )}
        </>
    );
}
