import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Flex,
  Spinner,
  Button,
  Link
} from '@chakra-ui/react';
import Article from '../molecules/Article';
import Title from '../molecules/Title';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function Blog({ variant = 'default' }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  const threshold = useMemo(() => (window.innerWidth < 768 ? 0.04 : 0.2), []);
  const { ref, inView } = useInView({ triggerOnce: true, threshold });

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

      <Box
        as="section"
        px={5}
        py={{ base: 12, md: 16 }}
        bg="primary.500"
        overflow="hidden"
        transform="translateZ(0)"
      >
        <Container maxW="container.xl">
          <Flex
            mb={12}
            direction="column"
            gap={4}
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

            <Flex justify="space-between">
              <Heading as="h2" size="xl" color="white">
                {t("blog.title")}
              </Heading>
              <Button
                as={Link}
                href="https://dev.to/adini"
                isExternal
                variant="outline"
                colorScheme="white"
                size="md"
                _hover={{
                  bg: 'purple.800',
                  color: 'white',
                  textDecoration: 'none'
                }}
                display={{ base: 'none', md: 'inline-flex' }}
              >
                {t("blog.verTodos")}
              </Button>
            </Flex>

            <Text m={0} color="gray.400" fontSize="lg">
              {t("blog.subtitle")}
            </Text>
          </Flex>

          {loading ? (
            <Flex justify="center" py={12}>
              <Spinner size="lg" color="purple.300" />
            </Flex>
          ) : (
            <>
              <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
                  {articles.map(article => (
                    <Article key={article.id} article={article} />
                  ))}
                </SimpleGrid>
              </motion.div>

              <Flex
                justify="center"
                display={{ base: "flex", md: 'none' }}
                mt={12}
              >
                <Button
                  as={Link}
                  href="https://dev.to/adini"
                  isExternal
                  variant="outline"
                  colorScheme="white"
                  size="md"
                  _hover={{
                    bg: 'purple.800',
                    color: 'white',
                    textDecoration: 'none'
                  }}
                >
                  {t("blog.verTodos")}
                </Button>
              </Flex>
            </>
          )}
        </Container>
      </Box>
    </>
  );
}
