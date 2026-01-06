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
import { useTranslation } from "react-i18next";

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
                    <Text mb={0} fontSize="md" color={variant === "infra" ? "#238b6f" : "#4d45d6"} fontWeight="600">
                        {variant === "dev" ? t("devServices.label") : t("infraServices.label")}
                    </Text>
                    <Text mb={0} fontSize="3xl" fontWeight="semibold" color="gray.800">
                        {service.titulo}
                    </Text>
                </ModalHeader>

                <ModalBody>
                    <Text color="gray.600" fontSize="lg" mb={6} maxW="90%">
                        {service.descripcion}
                    </Text>

                    <Divider borderColor="gray.300" mb={6} />

                    <Flex wrap="wrap" gap={6}>
                        {service.detalles?.map((detalle, index) => (
                            <ServiceItem
                                key={index}
                                icon={iconMap[detalle.icono]}
                                title={detalle.titulo}
                                description={detalle.descripcion}
                                variant={variant}
                            />
                        ))}
                    </Flex>
                    <Divider borderColor="gray.300" mb={3} />

                </ModalBody>

                <ModalFooter>
                    <Button
                        onClick={onClose}
                        backgroundColor="primary.500"
                        color="white"
                        _hover={{ backgroundColor: "#1c334d" }}
                        px={8}
                    >
                        {t("infraServices.cerrar")}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

function ServiceItem({ icon, title, description, variant }) {
    return (
        <Flex gap={4} align="flex-start" w={{ base: "100%", md: "48%" }}>
            <Box
                bg={variant === "infra" ? "#238b6f" : "#4d45d6"}
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
