import React, { useEffect, useRef } from 'react';
import { Box, Stack, Flex, Badge, Heading, Text, LinkBox, LinkOverlay } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { LuArrowRight } from "react-icons/lu";

const MotionBox = motion(Box);

/**
 * Un caso de éxito destacado: todo el bloque es un enlace a su página en
 * stories.adini.com.ar. El clip arranca cuando el video queda a la vista y se
 * pausa al salir de pantalla, así no se descarga ni consume batería si nadie
 * lo mira.
 */
export default function CaseStudyItem({ study, isEven }) {
  const { t } = useTranslation();
  const [revealRef, revealed] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [viewRef, playing] = useInView({ threshold: 0.6 });
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (playing) {
      // Safari sólo reproduce solo si el video está muteado por propiedad.
      video.muted = true;
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [playing]);

  const xInitial = isEven ? -100 : 100;
  const title = t(study.titleKey);

  return (
    <MotionBox
      ref={revealRef}
      initial={{ opacity: 0, x: xInitial }}
      animate={revealed ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8 }}
    >
      <LinkBox
        as={Flex}
        role="group"
        direction={{ base: 'column', lg: isEven ? 'row' : 'row-reverse' }}
        align="center"
        gap={{ base: 6, lg: 14 }}
      >
        <Box ref={viewRef} flex={1.15} w="full">
          <Box
            borderRadius="2xl"
            overflow="hidden"
            boxShadow="xl"
            bg="gray.100"
            sx={{ aspectRatio: "16 / 9" }}
            transition="transform 0.5s ease, box-shadow 0.5s ease"
            _groupHover={{ transform: "translateY(-4px)", boxShadow: "2xl" }}
          >
            <Box
              as="video"
              ref={videoRef}
              w="full"
              h="full"
              objectFit="cover"
              display="block"
              poster={`${study.media}.jpg`}
              muted
              loop
              playsInline
              preload="none"
              aria-label={title}
            >
              <source src={`${study.media}.webm`} type='video/webm; codecs="av01.0.04M.08"' />
              <source src={`${study.media}.mp4`} type="video/mp4" />
            </Box>
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
            {t(study.clientKey)} · {t(study.kindKey)}
          </Badge>

          <Heading
            as="h3"
            fontSize={{ base: "4xl", lg: "5xl" }}
            lineHeight="1"
            color="primary.500"
            transition="color 0.3s ease"
            _groupHover={{ color: "#3d2b99" }}
          >
            <LinkOverlay href={study.href} isExternal>{title}</LinkOverlay>
          </Heading>

          <Text color="gray.600" fontSize="md" lineHeight="1.6" m={0}>
            {t(study.descriptionKey)}
          </Text>

          <Flex align="center" gap={2} fontWeight="600" color="#3d2b99">
            <Text as="span" m={0}>{t("cases.verCaso")}</Text>
            <Box
              as={LuArrowRight}
              size={16}
              transition="transform 0.2s ease"
              _groupHover={{ transform: "translateX(4px)" }}
            />
          </Flex>
        </Stack>
      </LinkBox>
    </MotionBox>
  );
}
