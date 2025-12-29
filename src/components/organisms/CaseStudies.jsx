import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Image,
  Button,
  Stack,
  Flex,
  Badge,
  Icon
} from '@chakra-ui/react';
import { LuArrowRight, LuCpu, LuShieldCheck, LuTrendingUp } from "react-icons/lu";

const CASE_STUDIES = [
  {
    id: 1,
    client: "Fintech LATAM",
    title: "Arquitectura Serverless de Alto Rendimiento",
    description: "Reemplazamos una infraestructura monolítica costosa por microservicios en AWS Lambda. Logramos procesar pagos en tiempo real con una reducción drástica de latencia.",
    stat: "-40% Costos de Infraestructura",
    tech: ["AWS Lambda", "DynamoDB", "Node.js"],
    icon: LuCpu, 
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1080&auto=format&fit=crop",
    link: "/casos/fintech-serverless"
  },
  {
    id: 2,
    client: "E-Commerce Global",
    title: "Escalabilidad Automática para Black Friday",
    description: "Implementación de Kubernetes para orquestar contenedores que se auto-escalan según la demanda del tráfico, garantizando 100% de uptime durante picos de venta.",
    stat: "99.99% Uptime Garantizado",
    tech: ["Kubernetes", "Docker", "GCP"],
    icon: LuTrendingUp,
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1080&auto=format&fit=crop",
    link: "/casos/ecommerce-scale"
  },
  {
    id: 3,
    client: "Banca Digital",
    title: "Seguridad Zero-Trust y Compliance",
    description: "Auditoría y blindaje de la infraestructura bajo normas ISO 27001. Implementamos políticas de acceso estricto y encriptación de extremo a extremo.",
    stat: "Certificación ISO Obtenida",
    tech: ["Terraform", "Vault", "Python"],
    icon: LuShieldCheck,
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1080&auto=format&fit=crop",
    link: "/casos/banca-security"
  }
];

export default function CaseStudiesSection() {
  return (
    <Box as="section" py={{ base: 16, md: 24 }}>
      <Container maxW="container.xl">
        
        <Stack spacing={4} textAlign="center" mb={20}>
          <Text color="purple.600" fontWeight="bold" letterSpacing="widest" textTransform="uppercase" fontSize="xs">
            Portafolio
          </Text>
          <Heading as="h2" size="2xl" color="gray.900">
            Desafíos Reales, <Box as="span" color="purple.600">Resultados Reales</Box>
          </Heading>
          <Text color="gray.500" fontSize="lg" maxW="2xl" mx="auto">
             Profundiza en cómo transformamos la tecnología de nuestros clientes para impulsar su crecimiento.
          </Text>
        </Stack>

        <Stack spacing={{ base: 16, lg: 24 }}>
          {CASE_STUDIES.map((study, index) => {
            const isEven = index % 2 === 0;
            
            return (
              <Flex 
                key={study.id}
                direction={{ base: 'column', lg: isEven ? 'row' : 'row-reverse' }}
                align="center"
                gap={{ base: 8, lg: 16 }}
              >
                
                <Box 
                  flex={1} 
                  position="relative" 
                  w="full"
                  role="group"
                >
                  <Box
                    position="relative"
                    borderRadius="2xl"
                    overflow="hidden"
                    boxShadow="2xl"
                    bg="gray.100"
                  >
                    <Image
                      src={study.imageUrl}
                      alt={study.title}
                      w="full"
                      h={{ base: "300px", lg: "450px" }}
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
                      _groupHover={{ opacity: 0.1 }}
                    />
                  </Box>
                  
                  <Box
                    position="absolute"
                    bottom={-6}
                    right={isEven ? -6 : 'auto'}
                    left={!isEven ? -6 : 'auto'}
                    bg="purple.600"
                    color="white"
                    p={4}
                    borderRadius="xl"
                    boxShadow="lg"
                    display={{ base: "none", md: "block" }}
                  >
                    <Icon as={study.icon} boxSize={8} />
                  </Box>
                </Box>

                <Stack flex={1} spacing={6} align="start">
                  <Badge 
                    colorScheme="purple" 
                    fontSize="sm" 
                    px={3} 
                    py={1} 
                    borderRadius="md"
                    textTransform="uppercase"
                  >
                    {study.client}
                  </Badge>

                  <Heading as="h3" size="xl" color="gray.900" lineHeight="tight">
                    {study.title}
                  </Heading>

                  <Text color="gray.600" fontSize="lg" lineHeight="relaxed">
                    {study.description}
                  </Text>

                  <Box borderLeft="4px solid" borderColor="purple.400" pl={6} py={2}>
                    <Text fontSize="sm" color="gray.400" fontWeight="medium" textTransform="uppercase">
                      Resultado Clave
                    </Text>
                    <Text fontSize="2xl" fontWeight="bold" color="purple.700" mt={1}>
                      {study.stat}
                    </Text>
                  </Box>

                  <Flex gap={3} wrap="wrap">
                    {study.tech.map(t => (
                      <Text key={t} fontSize="sm" fontWeight="bold" color="gray.400">
                        #{t}
                      </Text>
                    ))}
                  </Flex>

                  <Button
                    as="a"
                    href={study.link}
                    variant="link"
                    color="purple.600"
                    size="lg"
                    rightIcon={<LuArrowRight />}
                    _hover={{ color: "purple.800" }}
                    mt={2}
                  >
                    Leer caso completo
                  </Button>
                </Stack>
              </Flex>
            );
          })}
        </Stack>
      </Container>
    </Box>
  );
}