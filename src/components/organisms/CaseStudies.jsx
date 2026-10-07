import React from 'react';
import { Box, Flex, Stack } from '@chakra-ui/react';
import { LuArrowRight } from "react-icons/lu";
import Title from '../molecules/Title';
import Button from '../molecules/Button';
import { useTranslation } from 'react-i18next';
import CaseStudyItem from '../molecules/CaseStudyItem';
import { STORIES_URL, storyUrl } from '../../utils/stories';

/**
 * Adelanto de los casos de éxito. El detalle de cada uno vive en
 * stories.adini.com.ar: acá van tres destacados, con prioridad para los que
 * incluyen IA, y el acceso al resto.
 *
 * La lista se mantiene a mano. Los textos están en `cases.items` de cada
 * locale, en el mismo orden que este array. Cada caso tiene en
 * `public/assets/cases/` un clip corto en loop (webm y mp4) y su poster,
 * recortados del video del caso en stories.
 */
const FEATURED = ["utenia", "aura", "sia"];

export default function CaseStudies() {
  const { t } = useTranslation();

  const caseStudies = FEATURED.map((slug, index) => ({
    slug,
    href: storyUrl(slug),
    media: `/assets/cases/${slug}`,
    clientKey: `cases.items.${index}.cliente`,
    kindKey: `cases.items.${index}.tipo`,
    titleKey: `cases.items.${index}.titulo`,
    descriptionKey: `cases.items.${index}.descripcion`,
  }));

  return (
    <>
      <Title
        title={t("cases.titulo")}
        subtitle={t("cases.subtitulo")}
        mt="50px"
        mb="40px"
      />

      <Box
        as="section"
        maxW="1280px"
        mx="auto"
        px={{ base: "15px", md: "60px", }}
      >
        <Stack spacing={{ base: 14, lg: 20 }}>
          {caseStudies.map((study, index) => (
            <CaseStudyItem
              key={study.slug}
              study={study}
              isEven={index % 2 === 0}
            />
          ))}
        </Stack>

        <Flex justify="center" mt={{ base: 12, lg: 16 }}>
          <Button
            as="a"
            href={STORIES_URL}
            target="_blank"
            rel="noopener noreferrer"
            text="cases.verTodos"
            rightIcon={<LuArrowRight />}
            size="lg"
          />
        </Flex>
      </Box>
    </>
  );
}
