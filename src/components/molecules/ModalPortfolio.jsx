import React, { useState } from "react";
import { Text, Flex, Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Image, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import { useTranslation } from "react-i18next";
import "slick-carousel/slick/slick-theme.css";
import { FaExpand } from "react-icons/fa";

export default function ModalPortfolio({ title, description, isOpen, setIsOpen, imgs, tecnologies, mobile = false }) {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const isMobile = useBreakpointValue({ base: true, md: false });
    const { t } = useTranslation();

    const NextArrow = ({ onClick }) => (
        <IconButton
            display={{ base: "none", md: "inherit" }}
            aria-label="Next"
            icon={<ChevronRightIcon boxSize={8} />}
            position="absolute"
            right="-50px"
            top="50%"
            transform="translateY(-50%)"
            zIndex={2}
            onClick={onClick}
            colorScheme="gray"
            _hover={{ bg: "gray.200" }}
            bg={'gray.100'}
            color='gray.700'
            variant="ghost"
        />
    );

    const PrevArrow = ({ onClick }) => (
        <IconButton
            display={{ base: "none", md: "inherit" }}
            aria-label="Previous"
            icon={<ChevronLeftIcon boxSize={8} />}
            position="absolute"
            left="-40px"
            top="50%"
            transform="translateY(-50%)"
            zIndex={2}
            onClick={onClick}
            colorScheme="gray"
            _hover={{ bg: "gray.200" }}
            bg={'gray.100'}
            color='gray.700'
            variant="ghost"
        />
    );

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <ModalOverlay />
                <ModalContent
                    my={{ base: "0.5rem", md: "2.5rem" }}
                    maxW={{ base: "95%", md: "80%" }}
                    maxHeight={{ base: "97%", md: "90%" }}
                    overflowY={"auto"}
                    bg={"quarter.500"}
                    color="gray.700"
                >
                    <Box position={"sticky"} top={0} zIndex={10} boxShadow={"sm"}>
                        <ModalHeader fontFamily="Poppins, sans-serif" pr={"60px"} bg={"#5548e6"} color={"white"}>{title}</ModalHeader>
                        <ModalCloseButton color={"white"} />
                    </Box>
                    <ModalBody px={{ base: 0, md: 10, lg: 8 }} py={5}>
                        <Box px={8} py={3}>
                            <Text fontFamily="Poppins, sans-serif" mb={10}>{description}</Text>
                            <h4 style={{ fontFamily: "Poppins, sans-serif" }}>{t("portfolio.stacks")}</h4>
                            <Flex align={"flex-start"} wrap="wrap" gap={8} mt={10} >
                                {tecnologies.map((tec, index) => (
                                    <Flex
                                        key={index}
                                        direction="column"
                                        align="center"
                                        justify="center"
                                        width={{ base: "60px", md: "80px" }}
                                    >
                                        <Image
                                            src={tec.path}
                                            alt={tec.name}
                                            boxSize={{ base: "30px", md: "40px" }}
                                            objectFit="contain"
                                        />
                                        <Text
                                            fontSize="xs"
                                            mt={2}
                                            textAlign="center"
                                            fontFamily="Poppins, sans-serif"
                                            fontWeight="500"
                                            color="gray.600"
                                        >
                                            {tec.name}
                                        </Text>
                                    </Flex>
                                ))}
                            </Flex>
                        </Box>
                        <Flex position={"relative"} my={8} align={"center"} justify={"center"}>
                            <IconButton
                                display={{ base: "inherit", md: "none" }}
                                position="absolute"
                                aria-label="Next"
                                icon={<FaExpand />}
                                right="15px"
                                top="15px"
                                zIndex={2}
                                onClick={() => setIsFullscreen(true)}
                                colorScheme="gray"
                            />
                            <Slider style={{
                                position: "relative",
                                width: "95%",
                                maxWidth: mobile ? "350px" : "auto"
                            }} {...settings}
                            >
                                {imgs.map((img, index) => (
                                    <div key={index} style={{ maxWidth: "1200px" }}>
                                        <Image
                                            src={img}
                                            alt={`Imagen ${index + 1}`}
                                            objectFit="cover"
                                            mt={2}
                                            mb={{ base: 8, sm: 2 }}
                                            borderRadius="md"
                                            mx={"auto"}
                                            cursor={{ base: "pointer", md: "default" }}
                                            onClick={() => isMobile && setIsFullscreen(true)}
                                        />
                                    </div>
                                ))}
                            </Slider>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>

            {isMobile && (
                <Modal isOpen={isFullscreen} onClose={() => setIsFullscreen(false)} size={"full"}>
                    <ModalOverlay />
                    <ModalContent bg={"quarter.500"}                    >
                        <ModalCloseButton color={'gray.700'} _hover={{ bg: 'gray.200' }} />
                        <ModalBody p={0}>
                            <Flex height={"100vh"} align={"center"} justify={"center"}>
                                <Slider style={{ position: "relative", width: mobile ? "80%" : "100%" }} {...settings}>
                                    {imgs.map((img, index) => (
                                        <div key={index} style={{ maxWidth: "1200px" }}>
                                            <Image
                                                src={img}
                                                alt={`Imagen ${index + 1}`}
                                                objectFit="cover"
                                                m={2}
                                                borderRadius="md"
                                                mx={"auto"}
                                                cursor="pointer"
                                                onClick={() => setIsFullscreen(true)}
                                            />
                                        </div>
                                    ))}
                                </Slider>
                            </Flex>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            )}
        </>
    );
}
