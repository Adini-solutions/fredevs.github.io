import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Flex,
  Spinner
} from '@chakra-ui/react';
import Article from '../molecules/Article';
import Title from '../molecules/Title';
import { useTranslation } from 'react-i18next';

export default function Blog() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    axios
      .get('https://dev.to/api/articles', {
        params: {
          username: 'adini',
          per_page: 3
        }
      })
      .then(res => setArticles(res.data))
      .catch(err => console.error('Error fetching dev.to articles', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Title title={t("blog.titulo")} subtitle={t("blog.subtitulo")} mt="60px" mb="50px" />

      <Box as="section" px={5} py={{ base: 12, md: 16 }} bg="primary.500">
        <Container maxW="container.xl">
          <Flex
            mb={12}
            direction="column"
            gap={4}
            maxW="800px"
          >
            <Text
              m={0}
              color="purple.300"
              fontWeight="bold"
              textTransform="uppercase"
              fontSize="sm"
              letterSpacing="wide"
            >
              {t("blog.label")}
            </Text>

            <Heading as="h2" size="xl" color="white">
              {t("blog.title")}
            </Heading>

            <Text m={0} color="gray.400" fontSize="lg">
              {t("blog.subtitle")}
            </Text>
          </Flex>

          {loading ? (
            <Flex justify="center" py={12}>
              <Spinner size="lg" color="purple.300" />
            </Flex>
          ) : (
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
              {articles.map(article => (
                <Article key={article.id} article={article} />
              ))}
            </SimpleGrid>
          )}
        </Container>
      </Box>
    </>
  );
}
