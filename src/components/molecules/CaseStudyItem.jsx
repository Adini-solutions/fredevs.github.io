import React from 'react';
import { Box, Stack, Flex, Badge, Heading, Text, Image, Icon } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';

const MotionFlex = motion(Flex);

export default function CaseStudyItem({ study, isEven }) {
  const { t } = useTranslation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const xInitial = isEven ? -100 : 100;

  return (
    <MotionFlex
      ref={ref}
      direction={{ base: 'column', lg: isEven ? 'row' : 'row-reverse' }}
      align="center"
      gap={{ base: 6, lg: 12 }}
      initial={{ opacity: 0, x: xInitial }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8 }}
    >
      <Box flex={1} position="relative" w="full" role="group">
        <Box borderRadius="2xl" overflow="hidden" boxShadow="xl" bg="gray.100">
          <Image
            src={study.image}
            alt={t(study.titleKey)}
            w="full"
            h={{ base: "240px", lg: "360px" }}
            objectFit="cover"
            transition="transform 0.6s ease"
            _groupHover={{ transform: "scale(1.03)" }}
          />
          <Box
            position="absolute"
            inset={0}
            bg="purple.900"
            opacity={0}
            transition="opacity 0.3s ease"
            _groupHover={{ opacity: 0.08 }}
          />
        </Box>

        <Box
          position="absolute"
          bottom={-4}
          right={isEven ? -4 : 'auto'}
          left={!isEven ? -4 : 'auto'}
          bg="purple.600"
          color="white"
          p={3}
          borderRadius="xl"
          boxShadow="md"
          display={{ base: "none", md: "block" }}
        >
          <Icon as={study.icon} boxSize={6} />
        </Box>
      </Box>

      <Stack flex={1} spacing={4} align="start">
        <Badge
          color="purple.700"
          bg="#eee5f9"
          fontSize="xs"
          px={3}
          py={1}
          borderRadius="md"
          textTransform="uppercase"
        >
          {t(study.clientKey)}
        </Badge>

        <Heading as="h3" size="lg" color="gray.900">
          {t(study.titleKey)}
        </Heading>

        <Text color="gray.600" fontSize="md" lineHeight="1.6">
          {t(study.descriptionKey)}
        </Text>

        <Box borderLeft="3px solid" borderColor="purple.400" pl={4} py={1}>
          <Text fontSize="xs" color="gray.500" textTransform="uppercase">
            {t("cases.etiquetaResultado")}
          </Text>
          <Text fontSize="xl" fontWeight="bold" color="purple.700">
            {t(study.statKey)}
          </Text>
        </Box>

        <Flex gap={2} wrap="wrap">
          {study.tech.map(t => (
            <Text key={t} fontSize="xs" fontWeight="bold" color="gray.400">
              #{t}
            </Text>
          ))}
        </Flex>
      </Stack>
    </MotionFlex>
  );
}
