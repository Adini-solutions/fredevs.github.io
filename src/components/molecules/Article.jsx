import {
    Box,
    Image,
    Heading,
    Text,
    Stack,
    Tag,
    Flex,
    Icon,
    Link as ChakraLink
} from '@chakra-ui/react';
import { LuCalendar } from "react-icons/lu";
import { useTranslation } from 'react-i18next';

const FALLBACK_IMAGE = "/assets/images/bannerDev.webp"

export default function Article({ article }) {
    const { t } = useTranslation();

    const articleImage =
        article.cover_image ||
        article.social_image ||
        FALLBACK_IMAGE;

    return (
        <Box
            bg="gray.800"
            borderRadius="xl"
            overflow="hidden"
            boxShadow="lg"
            _hover={{
                transform: 'translateY(-5px)',
                boxShadow: '2xl',
                transition: 'all 0.3s ease'
            }}
            transition="all 0.3s ease"
            role="group"
            borderWidth="1px"
            borderColor="gray.700"
            h="100%"
        >
            <Box position="relative" h="240px" overflow="hidden">
                <Image
                    src={articleImage}
                    alt={article.title}
                    objectFit="cover"
                    w="100%"
                    h="100%"
                    _groupHover={{ transform: 'scale(1.05)' }}
                    transition="transform 0.5s ease"
                />

                {article.tag_list?.[0] && (
                    <Tag
                        position="absolute"
                        top={4}
                        left={4}
                        bg={"tertiary.500"}
                        variant="solid"
                        fontWeight="bold"
                        borderRadius="full"
                    >
                        {article.tag_list[0]}
                    </Tag>
                )}
            </Box>

            <Stack p={6} spacing={4} h="calc(100% - 240px)">
                <Flex align="center" color="gray.400" fontSize="sm">
                    <Icon as={LuCalendar} mr={2} boxSize={4} />
                    <Text m={0}>
                        {new Date(article.published_at).toLocaleDateString('es-AR', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                        })}
                    </Text>
                </Flex>

                <Heading as="h3" size="md" lineHeight="tight" color="white">
                    <ChakraLink
                        href={article.url}
                        isExternal
                        _hover={{ textDecoration: 'none', color: 'purple.300' }}
                    >
                        {article.title}
                    </ChakraLink>
                </Heading>

                <Text m={0} color="gray.400" noOfLines={3}>
                    {article.description}
                </Text>

                <ChakraLink
                    mt="auto"
                    href={article.url}
                    isExternal
                    color="purple.300"
                    fontWeight="bold"
                    fontSize="sm"
                    display="inline-flex"
                    alignItems="center"
                    _hover={{ textDecoration: 'underline', color: 'purple.200' }}
                    pt={2}
                >
                    {t("blog.boton")} <Box as="span" ml={2}>→</Box>
                </ChakraLink>
            </Stack>
        </Box>
    );
}
