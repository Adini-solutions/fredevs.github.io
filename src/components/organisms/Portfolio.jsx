import { Box, Flex, Heading } from "@chakra-ui/react";
import Title from "../molecules/Title";
import Proyect from "../molecules/Proyect";
import { useTranslation } from "react-i18next";

export default function Portfolio() {
    const { t } = useTranslation();

    const webProjects = [
        {
            logo: "/assets/portfolio/sia/logo.png",
            imgs: [
                '/assets/portfolio/sia/Home.png',
                '/assets/portfolio/sia/Home 2.png',
                '/assets/portfolio/sia/Alias.png',
                '/assets/portfolio/sia/Alta de Usuarios.png',
                '/assets/portfolio/sia/Areas.png',
                '/assets/portfolio/sia/Credencial.png',
                '/assets/portfolio/sia/Difusiones.png',
                '/assets/portfolio/sia/Ticketera.png',
                '/assets/portfolio/sia/Traducciones.png',
                '/assets/portfolio/sia/Usuarios.png',
                '/assets/portfolio/sia/VPN.png',
            ],
            tecnologies: [
                { name: "React", path: "/assets/icons/react.webp" },
                { name: "Node.js", path: "/assets/icons/node.webp" },
                { name: "CSS3", path: "/assets/icons/css.webp" },
                { name: "Material UI", path: "/assets/icons/material.webp" },
                { name: "SQL", path: "/assets/icons/sql.webp" },
                { name: "JavaScript", path: "/assets/icons/js.webp" },
                { name: "Docker", path: "/assets/icons/docker.webp" },
                { name: "PHP", path: "/assets/icons/php.webp" },
                { name: "HTML5", path: "/assets/icons/html.webp" },
                { name: "Doctrine", path: "/assets/icons/doctrine.webp" },
                { name: "Sequelize", path: "/assets/icons/sequelize.webp" },
                { name: "Express", path: "/assets/icons/express.webp" },
            ],
            title: t("portfolio.proyectosWeb.sia.titulo"),
            summary: t("portfolio.proyectosWeb.sia.resumen"),
            description:
                (
                    <div>
                        <h4>{t("portfolio.proyectosWeb.sia.descripcion.titulo")}</h4>
                        <br />
                        <p>{t("portfolio.proyectosWeb.sia.descripcion.descripcion")}</p>
                        <br />
                        <h4>{t("portfolio.proyectosWeb.sia.descripcion.funcionalidades")}</h4>
                        <br />
                        <ul>
                            {t("portfolio.proyectosWeb.sia.descripcion.listaFuncionalidades", { returnObjects: true }).map((func, index) => (
                                <li key={index}>
                                    <strong>{func.titulo}:</strong> {func.descripcion}
                                </li>
                            ))}
                        </ul>
                        <br />
                        <h4>{t("portfolio.proyectosWeb.sia.descripcion.modulos")}</h4>
                        <br />
                        <ul>
                            {t("portfolio.proyectosWeb.sia.descripcion.listaModulos", { returnObjects: true }).map((func, index) => (
                                <li key={index}>
                                    <strong>{func.titulo}:</strong> {func.descripcion}
                                </li>
                            ))}
                        </ul>
                        <br />
                        <p>{t("portfolio.proyectosWeb.sia.descripcion.conclusion")}
                        </p>
                        <p>
                            {t("portfolio.proyectosWeb.sia.descripcion.link")}
                            <a href="https://sia.frba.utn.edu.ar/" target="_blank" rel="noopener noreferrer" style={{ color: "blue" }}> sia.frba.utn.edu.ar</a>
                        </p>
                    </div >
                )
        },
        {
            logo: "/assets/portfolio/rip-admin/logo.png",
            imgs: [
                '/assets/portfolio/rip-admin/RIP Admin 1.png',
                '/assets/portfolio/rip-admin/RIP Admin 2.png',
                '/assets/portfolio/rip-admin/RIP Admin 3.png',
                '/assets/portfolio/rip-admin/RIP Admin 4.png',
                '/assets/portfolio/rip-admin/RIP Admin 5.png',
                '/assets/portfolio/rip-admin/RIP Admin 6.png',
                '/assets/portfolio/rip-admin/RIP Admin 7.png',
                '/assets/portfolio/rip-admin/RIP Admin 8.png',
                '/assets/portfolio/rip-admin/RIP Admin 9.png',
            ],
            tecnologies: [
                { name: "React", path: "/assets/icons/react.webp" },
                { name: "Node.js", path: "/assets/icons/node.webp" },
                { name: "CSS3", path: "/assets/icons/css.webp" },
                { name: "Chakra UI", path: "/assets/icons/chakra.webp" },
                { name: "JavaScript", path: "/assets/icons/js.webp" },
                { name: "MongoDB", path: "/assets/icons/mongo.webp" },
                { name: "HTML5", path: "/assets/icons/html.webp" },
                { name: "Express", path: "/assets/icons/express.webp" },
            ],
            title: t("portfolio.proyectosWeb.ripAdmin.titulo"),
            summary: t("portfolio.proyectosWeb.ripAdmin.resumen"),
            description:
                (
                    <div>
                        <h4>{t("portfolio.proyectosWeb.ripAdmin.descripcion.titulo")}</h4>
                        <br />
                        <p>{t("portfolio.proyectosWeb.ripAdmin.descripcion.descripcion")}</p>
                        <br />
                        <h4>{t("portfolio.proyectosWeb.ripAdmin.descripcion.funcionalidades")}</h4>
                        <br />
                        <ul>
                            {t("portfolio.proyectosWeb.ripAdmin.descripcion.listaFuncionalidades", { returnObjects: true }).map((func, index) => (
                                <li key={index}>
                                    <strong>{func.titulo}:</strong> {func.descripcion}
                                </li>
                            ))}
                        </ul>
                        <br />
                        <p>{t("portfolio.proyectosWeb.ripAdmin.descripcion.conclusion")}
                        </p>
                    </div>
                )
        },
        {
            logo: "/assets/portfolio/moviltrack/logo.png",
            imgs: [
                '/assets/portfolio/moviltrack/Moviltrack 1.png',
                '/assets/portfolio/moviltrack/Moviltrack 2.png',
                '/assets/portfolio/moviltrack/Moviltrack 3.png',
                '/assets/portfolio/moviltrack/Moviltrack 4.png',
                '/assets/portfolio/moviltrack/Moviltrack 5.png',
                '/assets/portfolio/moviltrack/Moviltrack 6.png',
                '/assets/portfolio/moviltrack/Moviltrack 7.png',
                '/assets/portfolio/moviltrack/Moviltrack 8.png',
                '/assets/portfolio/moviltrack/Moviltrack 9.png',
                '/assets/portfolio/moviltrack/Moviltrack 10.png',
                '/assets/portfolio/moviltrack/Moviltrack 11.png',
                '/assets/portfolio/moviltrack/Moviltrack 12.png',
                '/assets/portfolio/moviltrack/Moviltrack 13.png',
                '/assets/portfolio/moviltrack/Moviltrack 14.png',
                '/assets/portfolio/moviltrack/Moviltrack 15.png',
                '/assets/portfolio/moviltrack/Moviltrack 16.png',
            ],
            tecnologies: [
                { name: "React", path: "/assets/icons/react.webp" },
                { name: "Node.js", path: "/assets/icons/node.webp" },
                { name: "CSS3", path: "/assets/icons/css.webp" },
                { name: "Tailwind", path: "/assets/icons/tailwind.webp" },
                { name: "JavaScript", path: "/assets/icons/js.webp" },
                { name: "MongoDB", path: "/assets/icons/mongo.webp" },
                { name: "HTML5", path: "/assets/icons/html.webp" },
                { name: "Express", path: "/assets/icons/express.webp" },
            ],
            title: t("portfolio.proyectosWeb.moviltrack.titulo"),
            summary: t("portfolio.proyectosWeb.moviltrack.resumen"),
            description: (
                <div>
                    <h4>{t("portfolio.proyectosWeb.moviltrack.descripcion.titulo")}</h4>
                    <br />
                    <p>{t("portfolio.proyectosWeb.moviltrack.descripcion.descripcion")}</p>
                    <br />
                    <h4>{t("portfolio.proyectosWeb.moviltrack.descripcion.funcionalidades")}</h4>
                    <br />
                    <ul>
                        {t("portfolio.proyectosWeb.moviltrack.descripcion.listaFuncionalidades", { returnObjects: true }).map((func, index) => (
                            <li key={index}>
                                <strong>{func.titulo}:</strong> {func.descripcion}
                            </li>
                        ))}
                    </ul>
                    <br />
                    <p>{t("portfolio.proyectosWeb.moviltrack.descripcion.conclusion")}
                    </p>
                </div>
            )
        }
    ];

    const mobileProjects = [
        {
            logo: "/assets/portfolio/rip-app/logo.png",
            imgs: [
                '/assets/portfolio/rip-app/RIP Alive App 2.png',
                '/assets/portfolio/rip-app/RIP Alive App 1.png',
                '/assets/portfolio/rip-app/RIP Alive App 3.png',
                '/assets/portfolio/rip-app/RIP Alive App 4.png',
                '/assets/portfolio/rip-app/RIP Alive App 5.png',
                '/assets/portfolio/rip-app/RIP Alive App 6.png',
                '/assets/portfolio/rip-app/RIP Alive App 7.png',
                '/assets/portfolio/rip-app/RIP Alive App 8.png',
                '/assets/portfolio/rip-app/RIP Alive App 9.png',
                '/assets/portfolio/rip-app/RIP Alive App 10.png',
                '/assets/portfolio/rip-app/RIP Alive App 11.png',
                '/assets/portfolio/rip-app/RIP Alive App 12.png',
                '/assets/portfolio/rip-app/RIP Alive App 13.png',
                '/assets/portfolio/rip-app/RIP Alive App 14.png',
            ],
            tecnologies: [
                { name: "React Native", path: "/assets/icons/react.webp" },
                { name: "Node.js", path: "/assets/icons/node.webp" },
                { name: "JavaScript", path: "/assets/icons/js.webp" },
                { name: "Expo", path: "/assets/icons/expo.webp" },
                { name: "MongoDB", path: "/assets/icons/mongo.webp" },
                { name: "Express", path: "/assets/icons/express.webp" },
                { name: "RevenueCat", path: "/assets/icons/rc.webp" },
                { name: "Stripe", path: "/assets/icons/stripe.webp" },
            ],
            title: t("portfolio.proyectosMobile.ripApp.titulo"),
            summary: t("portfolio.proyectosMobile.ripApp.resumen"),
            description:
                (
                    (
                        <div>
                            <h4>{t("portfolio.proyectosMobile.ripApp.descripcion.titulo")}</h4>
                            <br />
                            <p>{t("portfolio.proyectosMobile.ripApp.descripcion.descripcion")}</p>
                            <br />
                            <h4>{t("portfolio.proyectosMobile.ripApp.descripcion.funcionalidades")}</h4>
                            <br />
                            <ul>
                                {t("portfolio.proyectosMobile.ripApp.descripcion.listaFuncionalidades", { returnObjects: true }).map((func, index) => (
                                    <li key={index}>
                                        <strong>{func.titulo}:</strong> {func.descripcion}
                                    </li>
                                ))}
                            </ul>
                            <br />
                            <p>{t("portfolio.proyectosMobile.ripApp.descripcion.conclusion")}
                            </p>
                        </div>
                    )
                )
        },
        {
            logo: "/assets/portfolio/credencial/logo.png",
            imgs: [
                '/assets/portfolio/credencial/Credencial 10.png',
                '/assets/portfolio/credencial/Credencial 11.png',
                '/assets/portfolio/credencial/Credencial 9.png',
                '/assets/portfolio/credencial/Credencial 12.png',
                '/assets/portfolio/credencial/Credencial 13.png',
                '/assets/portfolio/credencial/Credencial 14.png',
            ],
            tecnologies: [
                { name: "React Native", path: "/assets/icons/react.webp" },
                { name: "Node.js", path: "/assets/icons/node.webp" },
                { name: "SQL", path: "/assets/icons/sql.webp" },
                { name: "JavaScript", path: "/assets/icons/js.webp" },
                { name: "Expo", path: "/assets/icons/expo.webp" },
                { name: "Docker", path: "/assets/icons/docker.webp" },
                { name: "Sequelize", path: "/assets/icons/sequelize.webp" },
                { name: "Express", path: "/assets/icons/express.webp" },
                { name: "TypeScript", path: "/assets/icons/ts.webp" },
                { name: "Next.js", path: "/assets/icons/next.webp" },
            ],
            title: t("portfolio.proyectosMobile.credencial.titulo"),
            summary: t("portfolio.proyectosMobile.credencial.resumen"),
            description:
                (
                    <div>
                        <h4>{t("portfolio.proyectosMobile.credencial.descripcion.titulo")}</h4>
                        <br />
                        <p>{t("portfolio.proyectosMobile.credencial.descripcion.descripcion")}</p>
                        <br />
                        <h4>{t("portfolio.proyectosMobile.credencial.descripcion.funcionalidades")}</h4>
                        <br />
                        <ul>
                            {t("portfolio.proyectosMobile.credencial.descripcion.listaFuncionalidades", { returnObjects: true }).map((func, index) => (
                                <li key={index}>
                                    <strong>{func.titulo}:</strong> {func.descripcion}
                                </li>
                            ))}
                        </ul>
                        <br />
                        <p>{t("portfolio.proyectosMobile.credencial.descripcion.conclusion")}
                        </p>
                    </div>
                )
        },
        {
            logo: "/assets/portfolio/amigos-cole/logo.png",
            imgs: [
                '/assets/portfolio/amigos-cole/Amigos Cole 5.png',
                '/assets/portfolio/amigos-cole/Amigos Cole 3.png',
                '/assets/portfolio/amigos-cole/Amigos Cole 4.png',
                '/assets/portfolio/amigos-cole/Amigos Cole 1.png',
                '/assets/portfolio/amigos-cole/Amigos Cole 2.png',
            ],
            tecnologies: [
                { name: "React Native", path: "/assets/icons/react.webp" },
                { name: "Node.js", path: "/assets/icons/node.webp" },
                { name: "SQL", path: "/assets/icons/sql.webp" },
                { name: "JavaScript", path: "/assets/icons/js.webp" },
                { name: "Expo", path: "/assets/icons/expo.webp" },
                { name: "Docker", path: "/assets/icons/docker.webp" },
                { name: "Sequelize", path: "/assets/icons/sequelize.webp" },
                { name: "Express", path: "/assets/icons/express.webp" },
                { name: "Mercado Pago", path: "/assets/icons/mp.webp" },
            ],
            title: t("portfolio.proyectosMobile.amigosDelCole.titulo"),
            summary: t("portfolio.proyectosMobile.amigosDelCole.resumen"),
            description:
                (
                    <div>
                        <h4>{t("portfolio.proyectosMobile.amigosDelCole.descripcion.titulo")}</h4>
                        <br />
                        <p>{t("portfolio.proyectosMobile.amigosDelCole.descripcion.descripcion")}</p>
                        <br />
                        <h4>{t("portfolio.proyectosMobile.amigosDelCole.descripcion.funcionalidades")}</h4>
                        <br />
                        <ul>
                            {t("portfolio.proyectosMobile.amigosDelCole.descripcion.listaFuncionalidades", { returnObjects: true }).map((func, index) => (
                                <li key={index}>
                                    <strong>{func.titulo}:</strong> {func.descripcion}
                                    {func.subfuncionalidades && (
                                        <ul>
                                            {func.subfuncionalidades.map((subfunc, subindex) => (
                                                <li key={subindex}><strong>{subfunc.titulo}:</strong> {subfunc.descripcion}</li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            ))}
                        </ul>
                        <br />
                        <p>{t("portfolio.proyectosMobile.amigosDelCole.descripcion.conclusion")}</p>
                    </div>
                )
        }
    ];

    return (
        <>
            <Title title={t("portfolio.titulo")} subtitle={t("portfolio.subtitulo")} mt="130px" mb="40px" />

            <Box maxW="10xl" mx="auto" px={6}>
                <Heading textAlign="center" fontWeight={0} fontFamily="Poppins, sans-serif" fontSize={{ base: "2xl", xl: "3xl" }} my={12} color="primary.500">{t("portfolio.web")}</Heading>
                <Flex justify="center" wrap="wrap" gap={{ base: "40px", md: "60px" }}>
                    {webProjects.map((project, index) => (
                        <Proyect key={index} tecnologies={project.tecnologies} logo={project.logo} imgs={project.imgs} title={project.title} description={project.description} summary={project.summary} />
                    ))}
                </Flex>

                <Heading textAlign="center" fontWeight={0} fontFamily="Poppins, sans-serif" fontSize={{ base: "2xl", xl: "3xl" }} my={12} color="primary.500">{t("portfolio.movil")}</Heading>
                <Flex justify="center" wrap="wrap" gap={{ base: "40px", md: "60px" }}>
                    {mobileProjects.map((project, index) => (
                        <Proyect key={index} tecnologies={project.tecnologies} logo={project.logo} imgs={project.imgs} description={project.description} title={project.title} summary={project.summary} mobile={true} />
                    ))}
                </Flex>
            </Box>
        </>
    );
}
