import React from 'react';
import { Box, Container, Stack } from '@chakra-ui/react';
import Title from '../molecules/Title';
import { useTranslation } from 'react-i18next';
import CaseStudyItem from '../molecules/CaseStudyItem';
import { LuLayers, LuServer, LuMail } from "react-icons/lu";

export default function CaseStudies() {
  const { t } = useTranslation();

  const caseStudies = [
    {
      id: 1,
      clientKey: "cases.items.0.cliente",
      titleKey: "cases.items.0.titulo",
      descriptionKey: "cases.items.0.descripcion",
      statKey: "cases.items.0.resultado",
      tech: ["Node.js", "React", "Material UI", "Docker", "SMTP", "PHP"],
      icon: LuMail,
      image: "./assets/images/CaseStudies/difusiones_case.png",
      link: "/cases/utn-difusiones"
    },
    {
      id: 2,
      clientKey: "cases.items.1.cliente",
      titleKey: "cases.items.1.titulo",
      descriptionKey: "cases.items.1.descripcion",
      statKey: "cases.items.1.resultado",
      tech: ["React", "Tailwind CSS", "Node.js", "Docker", "Keycloak (Auth)"],
      icon: LuLayers,
      image: "./assets/images/CaseStudies/sicyt_case.png",
      link: "/cases/utn-sicyt"
    },
    {
      id: 3,
      clientKey: "cases.items.2.cliente",
      titleKey: "cases.items.2.titulo",
      descriptionKey: "cases.items.2.descripcion",
      statKey: "cases.items.2.resultado",
      tech: ["OpenNebula", "Linux", "Virtualización", "Infraestructura On-Prem"],
      icon: LuServer,
      image: "./assets/images/CaseStudies/openNebula_case.png",
      link: "/cases/utn-opennebula"
    }
  ];

  return (
    <>
      <Title
        title={t("cases.titulo")}
        subtitle={t("cases.subtitulo")}
        mt="50px"
        mb="40px"
      />

      <Box as="section">
        <Container maxW="container.xl">
          <Stack spacing={{ base: 12, lg: 16 }}>
            {caseStudies.map((study, index) => (
              <CaseStudyItem
                key={study.id}
                study={study}
                isEven={index % 2 === 0}
              />
            ))}
          </Stack>
        </Container>
      </Box>
    </>
  );
}
