import { Heading, Text, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useInView } from 'react-intersection-observer';
import { useBreakpointValue } from '@chakra-ui/react';

export default function Title({ title, subtitle, mt, mb, variant = "default" }) {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.3,
    });

    const xValue = useBreakpointValue({ base: -10, md: -100 });

    return (
        <Flex
            d="flex"
            align={"center"}
            justify={{ base: "center", md: "left" }}
            textAlign={{ base: "center", md: "left" }}
            mx={{ base: "20px", md: "10%" }}
            mb={mb}
            mt={mt}
            ref={ref}
        >
            <motion.div
                initial={{ opacity: 0, x: xValue }}
                animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : xValue }}
                transition={{ duration: 0.8 }}
            >
                <Heading fontSize={{ base: "2xl", "2xl": "25px" }} color="primary.500">
                    {title} <Text as="span" color={variant === "infra" ? "#1f7862" : "#3d2b99"}>{subtitle}</Text>
                </Heading>
            </motion.div>
        </Flex>
    );
}
