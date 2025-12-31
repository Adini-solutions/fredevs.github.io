import { Box, Flex, Text, Icon } from "@chakra-ui/react";
import { FaDesktop, FaMobileAlt } from "react-icons/fa";
import Title from "../molecules/Title";
import Slider from "react-slick";
import { motion } from "framer-motion";
import { useInView } from 'react-intersection-observer';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTranslation } from "react-i18next";

const techStack = [
    { name: "Docker", icon: "/assets/icons/docker.webp" },
    { name: "Expo", icon: "/assets/icons/expo.webp" },
    { name: "Chakra UI", icon: "/assets/icons/chakra.webp" },
    { name: "Express", icon: "/assets/icons/express.webp" },
    { name: "Material UI", icon: "/assets/icons/material.webp" },
    { name: "MongoDB", icon: "/assets/icons/mongo.webp" },
    { name: "Next.js", icon: "/assets/icons/next.webp" },
    { name: "Node.js", icon: "/assets/icons/node.webp" },
    { name: "React", icon: "/assets/icons/react.webp" },
    { name: "Sequelize", icon: "/assets/icons/sequelize.webp" },
    { name: "SQL", icon: "/assets/icons/sql.webp" },
    { name: "WordPress", icon: "/assets/icons/wordpress.webp" },
    { name: "TypeScript", icon: "/assets/icons/ts.webp" },
    { name: "Doctrine", icon: "/assets/icons/doctrine.webp" },
    { name: "PHP", icon: "/assets/icons/php.webp" },
    { name: "Stripe", icon: "/assets/icons/stripe.webp" },
    { name: "Mercado Pago", icon: "/assets/icons/mp.webp" },
    { name: "Revenue Cat", icon: "/assets/icons/rc.webp" },
    { name: "AWS", icon: "/assets/icons/aws.webp" },
    { name: "Tailwind", icon: "/assets/icons/tailwind.webp" },
];

const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 2000,
    responsive: [
        {
            breakpoint: 1000,
            settings: {
                slidesToShow: 4,
            },
        },
        {
            breakpoint: 780,
            settings: {
                slidesToShow: 3,
            },
        },
    ],
};

export default function Technologies() {
    const { t } = useTranslation();

    const getMargin = () => {
        return window.innerWidth <= 780 ? "0" : "0 13%";
    };
    const getDisplay = () => {
        return window.innerWidth <= 1000 ? "none" : "auto";
    };

    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    return (
        <>
            <Title title={t("technologies.titulo")} subtitle={t("technologies.subtitulo")} mb="50px" />

            <Box position={"relative"} bg={{ base: "#091c30", lg: "linear-gradient(-90deg, #091c30 97%, #6c63ff 80%)" }} p={8} pt={4}>
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 80 }}
                    transition={{ duration: 0.8 }}
                    style={{ display: getDisplay(), position: "absolute", top: "-70px", right: "80px", width: "140px" }}
                >
                    <img
                        src={"/assets/icons/flechas.png"}
                        alt="Flechas"
                    />
                </motion.div>


                <Box py={10} px={{ base: 4, md: 10, lg: 10, xl: "9%" }} color="white">
                    <Flex direction="column" gap={10}>
                        <Flex
                            justify={{ base: "center", md: "start" }}
                            align="center"
                            gap={6}
                            px={4}
                            direction={{ base: "column", md: "row" }}
                        >
                            <Box
                                bg="whiteAlpha.200"
                                p={4}
                                borderRadius="full"
                                boxShadow="lg"
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                mb={{ base: 4, md: 0 }}
                            >
                                <Icon as={FaDesktop} w={{ base: 16, md: 24 }} h={{ base: 16, md: 24 }} color="white" />
                            </Box>
                            <Box ml={{ base: 0, md: 6 }} textAlign={{ base: "center", md: "left" }} maxW="500px">
                                <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold" mb={2}>
                                    {t("technologies.web.titulo")}
                                </Text>
                                <Box h={"1px"} bg={"white"} mb={4} />
                                <Text fontSize={{ base: "sm", md: "md" }} color="gray.300">
                                    {t("technologies.web.descripcion")}
                                </Text>
                            </Box>
                        </Flex>

                        <Flex
                            justify={{ base: "center", md: "end" }}
                            align="center"
                            gap={{ base: 6, lg: 10 }}
                            direction={{ base: "column", md: "row-reverse" }}
                            px={4}
                        >
                            <Box
                                bg="whiteAlpha.200"
                                p={4}
                                borderRadius="full"
                                boxShadow="lg"
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                mb={{ base: 4, md: 0 }}
                            >
                                <Icon as={FaMobileAlt} w={{ base: 16, md: 24 }} h={{ base: 16, md: 24 }} color="white" />
                            </Box>
                            <Box ml={{ base: 0, md: 6 }} textAlign={{ base: "center", md: "right" }} maxW="500px">
                                <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold" mb={2}>
                                    {t("technologies.movil.titulo")}
                                </Text>
                                <Box h={"1px"} bg={"white"} mb={4} />
                                <Text fontSize={{ base: "sm", md: "md" }} color="gray.300">
                                    {t("technologies.movil.descripcion")}
                                </Text>
                            </Box>
                        </Flex>
                    </Flex>
                </Box>
                <Slider
                    {...sliderSettings}
                    style={{
                        margin: getMargin(),
                        marginBottom: "-110px",
                        borderRadius: "0.250rem",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        backgroundColor: "#ffffff",
                        paddingBlock: "20px",
                    }}
                >
                    {techStack.map((tech, index) => (
                        <Flex key={index} textAlign="center" p={4}>
                            <Flex align={"center"} justify={"center"}>
                                <img
                                    src={tech.icon}
                                    alt={tech.name}
                                    style={{
                                        width: "50px",
                                        height: "50px",
                                        filter: "drop-shadow(2px 2px 8px rgba(0, 0, 0, 0.2))"
                                    }}
                                />
                            </Flex>
                            <Text fontSize={{ base: "xs", md: "md" }} fontWeight="bold" color="#0a0a0a" mt={4} mb={2}>
                                {tech.name}
                            </Text>
                        </Flex>
                    ))}
                </Slider>
            </Box>
        </>
    );
}
