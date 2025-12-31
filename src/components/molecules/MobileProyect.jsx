import { useRef, useState } from "react";
import { Box, Flex, Text, Heading, Button } from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import { useInView } from 'react-intersection-observer';
import { useTranslation } from "react-i18next";
import ModalPortfolio from "./ModalPortfolio";
import useAutoplayVideoInView from "../../utils/useAutoplayVideoInView";

const MotionBox = motion(Flex);

export default function MobileProyect({ title, summary, description, video1, video2, imgs, tecnologies }) {
    const videoRef1 = useRef(null);
    const videoRef2 = useRef(null);
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    const { ref, inView } = useInView({
        threshold: 0.4,
    });

    useAutoplayVideoInView(videoRef1, inView);
    useAutoplayVideoInView(videoRef2, inView);

    return (
        <>
            <MotionBox
                ref={ref}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
                transition={{ duration: 0.5 }}
                direction={"column"}
                justifyContent={"space-between"}
                w="100%"
                maxW="lg"
                mb={5} p={4}
                borderRadius="md"
                boxShadow="md"
                bg={"white"}
                cursor={"pointer"}
                borderTop={"2px solid #5548e6"}
                borderBottom={"2px solid #5548e6"}
                _hover={{ boxShadow: "lg", bg: "#f8f7ff" }}
                onClick={() => setIsOpen(true)}
            >
                <Box>
                    <Flex justify="center" align="center" mb={2}>
                        <Heading fontSize="2xl" textAlign={"center"} fontWeight={0} fontFamily="Poppins, sans-serif" color="gray.700" px={1} py={2}>{title}</Heading>
                    </Flex>
                    <Flex w="100%" rounded="md" mb={4} justify="space-between" gap={4}>
                        <Box flex="1" borderRadius="lg" overflow="hidden" boxShadow="md">
                            <video
                                ref={videoRef1}
                                autoPlay
                                muted
                                loop
                                playsInline
                                preload="metadata"
                                style={{ width: "100%" }}
                            >
                                <source src={video1} type="video/mp4" />
                            </video>
                        </Box>
                        <Box flex="1" borderRadius="lg" overflow="hidden" boxShadow="md">
                            <video
                                ref={videoRef2}
                                autoPlay
                                muted
                                loop
                                playsInline
                                preload="metadata"
                                style={{ width: "100%" }}
                            >
                                <source src={video2} type="video/mp4" />
                            </video>
                        </Box>
                    </Flex>
                    <Box p={4} pb={0}>
                        <Text fontSize="md" color="gray.700" mb={4}>{summary}</Text>
                    </Box>
                </Box>
                <Flex mt={4} justify="flex-end">
                    <Button
                        leftIcon={<ViewIcon />}
                        variant="solid"
                        px={3}
                        bg="tertiary.500"
                        color="secondary.500"
                        fontSize="md"
                        _hover={{ transform: "scale(1.05)", bg: "#5548e6" }}
                        onClick={() => setIsOpen(true)}
                    >
                        {t("portfolio.detalles")}
                    </Button>
                </Flex>
            </MotionBox>

            <ModalPortfolio isOpen={isOpen} setIsOpen={setIsOpen} title={title} description={description} imgs={imgs} tecnologies={tecnologies} mobile={true} />
        </>
    );
}
