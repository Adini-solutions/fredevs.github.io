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
} from "react-icons/md";

export default function ServiceModal({ isOpen, onClose, service, variant }) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
            <ModalOverlay />

            <ModalContent
                my={{ base: "0.5rem", md: "2.5rem" }}
                maxW={{ base: "95%", md: "70%", lg: "70%", xl: "60%", "2xl": "50%" }}
                maxHeight={{ base: "97%", md: "90%" }}
                overflowY={"auto"}
                bg={"quarter.500"}
                color="gray.700"
                p={4}
            >
                <ModalCloseButton p={8} />

                <ModalHeader pb={0}>
                    <Text mb={0} fontSize="md" color={variant === "infra" ? "#238b6f" : "#4d45d6"} fontWeight="600">
                        {"Fijate q le inventas aca"}
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

                    {/* Estos habria q agregarlos en los es.json y en.json*/}
                    <Flex wrap="wrap" gap={6}>
                        <ServiceItem
                            icon={MdBuild}
                            title="Ejemplo"
                            description="ChamuyoChamuyoChamuyoChamuyo."
                            variant={variant}
                        />
                        <ServiceItem
                            icon={MdPlumbing}
                            title="Ejemplo"
                            description="ChamuyoChamuyoChamuyoChamuyo."
                            variant={variant}

                        />
                        <ServiceItem
                            icon={MdElectricalServices}
                            title="Ejemplo"
                            description="ChamuyoChamuyoChamuyoChamuyo."
                            variant={variant}
                        />
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
                        Cerrar
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
