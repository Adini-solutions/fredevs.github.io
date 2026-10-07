import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalCloseButton,
    Box,
    Flex,
    Text,
    Button,
    Divider,
    Icon,
} from "@chakra-ui/react";
import {
    MdPlumbing,
    MdElectricalServices,
    MdBuild,
    MdCode,
    MdIntegrationInstructions,
    MdTimeline,
    MdPhoneAndroid,
    MdStorefront,
    MdWeb,
    MdDevices,
    MdSchool,
    MdDataObject,
    MdSupportAgent
} from "react-icons/md";
import { LuClock, LuTrendingUp } from "react-icons/lu";
import { useTranslation } from "react-i18next";
import { getAccent, getServiceNs } from "../../utils/variants";
import { isPlaceholder } from "../../utils/placeholders";

const iconMap = {
    MdBuild,
    MdPlumbing,
    MdElectricalServices,
    MdCode,
    MdIntegrationInstructions,
    MdTimeline,
    MdPhoneAndroid,
    MdStorefront,
    MdWeb,
    MdDevices,
    MdSchool,
    MdDataObject,
    MdSupportAgent
};

export default function ServiceModal({ isOpen, onClose, service, variant }) {
    const { t } = useTranslation();
    const accent = getAccent(variant);
    const ns = getServiceNs(variant);

    // Plazo y resultado solo se muestran cuando tienen datos reales cargados.
    const plazo = isPlaceholder(service.plazo) ? null : service.plazo;
    const resultado = isPlaceholder(service.resultado) ? null : service.resultado;

    const scrollToSection = (message) => {
        const section = document.getElementById("contacto");

        if (section) {
            const offset = 120;
            const top = section.getBoundingClientRect().top + window.scrollY - offset;

            window.dispatchEvent(
                new CustomEvent("contact:setMessage", {
                    detail: message,
                })
            );

            window.scrollTo({
                top,
                behavior: "smooth",
            });

            onClose();
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
            <ModalOverlay />

            <ModalContent
                my={{ base: "0.5rem", md: "2.5rem" }}
                maxW={{ base: "95%", md: "70%", lg: "70%", xl: "60%", "2xl": "50%" }}
                maxHeight={{ base: "95%", md: "90%" }}
                overflowY={"auto"}
                bg={"quarter.500"}
                color="gray.700"
                p={4}
            >
                <ModalCloseButton m={4} />

                <ModalHeader pb={0}>
                    <Text mb={0} fontSize="md" color={accent.deep} fontWeight="600">
                        {t(`${ns}.label`)}
                    </Text>
                    <Text mb={0} fontSize="3xl" fontWeight="semibold" color="gray.800">
                        {service.titulo}
                    </Text>
                </ModalHeader>

                <ModalBody>
                    <Text color="gray.600" fontSize="lg" mb={6} maxW="90%">
                        {service.descripcion}
                    </Text>

                    {(plazo || resultado) && (
                        <Flex wrap="wrap" gap={4} mb={6}>
                            {plazo && (
                                <ServiceFact
                                    icon={LuClock}
                                    label={t(`${ns}.plazoLabel`)}
                                    value={plazo}
                                    accent={accent}
                                />
                            )}
                            {resultado && (
                                <ServiceFact
                                    icon={LuTrendingUp}
                                    label={t(`${ns}.resultadoLabel`)}
                                    value={resultado}
                                    accent={accent}
                                />
                            )}
                        </Flex>
                    )}

                    <Divider borderColor="gray.300" mb={6} />

                    <Flex wrap="wrap" gap={6}>
                        {service.detalles?.map((detalle, index) => (
                            <ServiceItem
                                key={index}
                                icon={iconMap[detalle.icono]}
                                title={detalle.titulo}
                                description={detalle.descripcion}
                                accent={accent}
                            />
                        ))}
                    </Flex>
                    <Divider borderColor="gray.300" mb={3} />

                </ModalBody>

                <ModalFooter justifyContent="flex-end">
                    <Button
                        mr={2}
                        onClick={onClose}
                        variant="outline"
                        borderColor="gray.300"
                        color="gray.600"
                        bg={"bg.50"}
                        _hover={{
                            bg: "gray.100",
                        }}
                        px={8}
                    >
                        {t(`${ns}.cerrar`)}
                    </Button>

                    <Button
                        bg={accent.deep}
                        color="white"
                        _hover={{ opacity: 0.9 }}
                        px={8}
                        onClick={() =>
                            scrollToSection(
                                t(`${ns}.messageTemplate`, {
                                    service: service.titulo,
                                })
                            )
                        }
                    >
                        {t(`${ns}.contactar`)}
                    </Button>
                </ModalFooter>

            </ModalContent>
        </Modal >
    );
}

function ServiceFact({ icon, label, value, accent }) {
    return (
        <Flex
            gap={3}
            align="flex-start"
            flex="1 1 240px"
            bg={accent.tintBg}
            border={`1px solid rgba(${accent.rgb}, 0.25)`}
            borderRadius="md"
            p={4}
        >
            <Icon as={icon} boxSize={5} color={accent.deep} mt="2px" flexShrink={0} />
            <Box>
                <Text
                    m={0}
                    fontSize="xs"
                    fontWeight="bold"
                    textTransform="uppercase"
                    letterSpacing="wider"
                    color={accent.deep}
                >
                    {label}
                </Text>
                <Text m={0} fontSize="sm" color="gray.700">
                    {value}
                </Text>
            </Box>
        </Flex>
    );
}

function ServiceItem({ icon, title, description, accent }) {
    return (
        <Flex gap={4} align="flex-start" w={{ base: "100%", md: "48%" }}>
            <Box
                bg={accent.deep}
                color="white"
                p={2.5}
                borderRadius="md"
                display="flex"
                alignItems="center"
                justifyContent="center"
                minW="40px"
                minH="40px"
            >
                <Icon as={icon} boxSize={5} />
            </Box>

            <Box>
                <Text fontWeight="600" color="gray.800" mb={1}>
                    {title}
                </Text>
                <Text fontSize="sm" color="gray.600">
                    {description}
                </Text>
            </Box>
        </Flex>
    );
}
