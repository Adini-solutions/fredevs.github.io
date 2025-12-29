import { Box, Flex, Heading } from "@chakra-ui/react";
import Title from "../molecules/Title";
import WebProyect from "../molecules/WebProyect";
import MobileProyect from "../molecules/MobileProyect";
import credencial1 from "../../videos/credencial1.mp4";
import credencial2 from "../../videos/credencial2.mp4";
import ripApp1 from "../../videos/ripapp1.mp4";
import ripApp2 from "../../videos/ripapp2.mp4";
import amigosCole1 from "../../videos/amigoscole1.mp4";
import amigosCole2 from "../../videos/amigoscole2.mp4";
import sia from "../../videos/sia.mp4";
import samay from "../../videos/samay.mp4";
import moviltrack from "../../videos/moviltrack.mp4";
import pap from "../../videos/pap.mp4";
import ripAdmin from "../../videos/ripadmin.mp4";
import { useTranslation } from "react-i18next";

export default function Portfolio() {
    const { t } = useTranslation();

    const webProjects = [
        {
            video: sia,
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
                '/assets/icons/react.webp',
                '/assets/icons/node.webp',
                '/assets/icons/css.webp',
                '/assets/icons/material.webp',
                '/assets/icons/sql.webp',
                '/assets/icons/js.webp',
                '/assets/icons/docker.webp',
                '/assets/icons/php.webp',
                '/assets/icons/html.webp',
                '/assets/icons/doctrine.webp',
                '/assets/icons/sequelize.webp',
                '/assets/icons/express.webp',
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
            video: ripAdmin,
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
                '/assets/icons/react.webp',
                '/assets/icons/node.webp',
                '/assets/icons/css.webp',
                '/assets/icons/chakra.webp',
                '/assets/icons/js.webp',
                '/assets/icons/mongo.webp',
                '/assets/icons/html.webp',
                '/assets/icons/express.webp',
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
            video: pap,
            imgs: [
                '/assets/portfolio/pap/PAP 1.png',
                '/assets/portfolio/pap/PAP 2.png',
                '/assets/portfolio/pap/PAP 3.png',
                '/assets/portfolio/pap/PAP 4.png',
                '/assets/portfolio/pap/PAP 5.png',
                '/assets/portfolio/pap/PAP 6.png',
                '/assets/portfolio/pap/PAP 7.png',
                '/assets/portfolio/pap/PAP 8.png',
                '/assets/portfolio/pap/PAP 9.png',
                '/assets/portfolio/pap/PAP 10.png',
                '/assets/portfolio/pap/PAP 11.png',
                '/assets/portfolio/pap/PAP 12.png',
            ],
            tecnologies: [
                '/assets/icons/react.webp',
                '/assets/icons/node.webp',
                '/assets/icons/css.webp',
                '/assets/icons/chakra.webp',
                '/assets/icons/docker.webp',
                '/assets/icons/js.webp',
                '/assets/icons/sql.webp',
                '/assets/icons/sequelize.webp',
                '/assets/icons/html.webp',
                '/assets/icons/express.webp',
            ],
            title: t("portfolio.proyectosWeb.pap.titulo"),
            summary: t("portfolio.proyectosWeb.pap.resumen"),
            description:
                (
                    <div>
                        <h4>{t("portfolio.proyectosWeb.pap.descripcion.titulo")}</h4>
                        <br />
                        <p>{t("portfolio.proyectosWeb.pap.descripcion.descripcion")}</p>
                        <br />
                        <h4>{t("portfolio.proyectosWeb.pap.descripcion.funcionalidades")}</h4>
                        <br />
                        <ul>
                            {t("portfolio.proyectosWeb.pap.descripcion.listaFuncionalidades", { returnObjects: true }).map((func, index) => (
                                <li key={index}>
                                    <strong>{func.titulo}:</strong> {func.descripcion}
                                </li>
                            ))}
                        </ul>
                        <br />
                        <p>{t("portfolio.proyectosWeb.pap.descripcion.conclusion")}
                        </p>
                    </div>
                )
        },
        {
            video: samay,
            imgs: [
                '/assets/portfolio/samay/Samay 1.png',
                '/assets/portfolio/samay/Samay 2.png',
                '/assets/portfolio/samay/Samay 3.png',
                '/assets/portfolio/samay/Samay 4.png',
                '/assets/portfolio/samay/Samay 5.png',
                '/assets/portfolio/samay/Samay 6.png',
            ],
            tecnologies: [
                '/assets/icons/react.webp',
                '/assets/icons/node.webp',
                '/assets/icons/css.webp',
                '/assets/icons/html.webp',
                '/assets/icons/js.webp'
            ],
            title: t("portfolio.proyectosWeb.samay.titulo"),
            summary: t("portfolio.proyectosWeb.samay.resumen"),
            description: (
                <div>
                    <h4>{t("portfolio.proyectosWeb.samay.descripcion.titulo")}</h4>
                    <br />
                    <p>{t("portfolio.proyectosWeb.samay.descripcion.descripcion")}</p>
                    <br />
                    <h4>{t("portfolio.proyectosWeb.samay.descripcion.funcionalidades")}</h4>
                    <br />
                    <ul>
                        {t("portfolio.proyectosWeb.samay.descripcion.listaFuncionalidades", { returnObjects: true }).map((func, index) => (
                            <li key={index}>
                                <strong>{func.titulo}:</strong> {func.descripcion}
                            </li>
                        ))}
                    </ul>
                    <br />
                    <p>{t("portfolio.proyectosWeb.samay.descripcion.conclusion")}
                    </p>
                </div>
            )
        },
        {
            video: moviltrack,
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
                '/assets/icons/react.webp',
                '/assets/icons/node.webp',
                '/assets/icons/css.webp',
                '/assets/icons/tailwind.webp',
                '/assets/icons/js.webp',
                '/assets/icons/mongo.webp',
                '/assets/icons/html.webp',
                '/assets/icons/express.webp'
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
            video1: credencial1,
            video2: credencial2,
            imgs: [
                '/assets/portfolio/credencial/Credencial 10.png',
                '/assets/portfolio/credencial/Credencial 11.png',
                '/assets/portfolio/credencial/Credencial 9.png',
                '/assets/portfolio/credencial/Credencial 12.png',
                '/assets/portfolio/credencial/Credencial 13.png',
                '/assets/portfolio/credencial/Credencial 14.png',
            ],
            tecnologies: [
                '/assets/icons/react.webp',
                '/assets/icons/node.webp',
                '/assets/icons/sql.webp',
                '/assets/icons/js.webp',
                '/assets/icons/expo.webp',
                '/assets/icons/docker.webp',
                '/assets/icons/sequelize.webp',
                '/assets/icons/express.webp',
                '/assets/icons/ts.webp',
                '/assets/icons/next.webp',
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
            video1: ripApp1,
            video2: ripApp2,
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
                '/assets/icons/react.webp',
                '/assets/icons/node.webp',
                '/assets/icons/js.webp',
                '/assets/icons/expo.webp',
                '/assets/icons/mongo.webp',
                '/assets/icons/express.webp',
                '/assets/icons/rc.webp',
                '/assets/icons/stripe.webp',
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
            video1: amigosCole1,
            video2: amigosCole2,
            imgs: [
                '/assets/portfolio/amigos-cole/Amigos Cole 5.png',
                '/assets/portfolio/amigos-cole/Amigos Cole 3.png',
                '/assets/portfolio/amigos-cole/Amigos Cole 4.png',
                '/assets/portfolio/amigos-cole/Amigos Cole 1.png',
                '/assets/portfolio/amigos-cole/Amigos Cole 2.png',
            ],
            tecnologies: [
                '/assets/icons/react.webp',
                '/assets/icons/node.webp',
                '/assets/icons/sql.webp',
                '/assets/icons/js.webp',
                '/assets/icons/expo.webp',
                '/assets/icons/docker.webp',
                '/assets/icons/sequelize.webp',
                '/assets/icons/express.webp',
                '/assets/icons/mp.webp',
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

            <Box maxW="7xl" mx="auto" px={6}>
                <Heading textAlign="center" fontWeight={0} fontFamily="Poppins, sans-serif" fontSize={{ base: "2xl", xl: "3xl" }} my={12} color="primary.500">{t("portfolio.web")}</Heading>
                <Flex justify="center" wrap="wrap" gap={{ base: "40px", md: "60px" }}>
                    {webProjects.map((project, index) => (
                        <WebProyect key={index} tecnologies={project.tecnologies} video={project.video} imgs={project.imgs} title={project.title} description={project.description} summary={project.summary} />
                    ))}
                </Flex>

                <Heading textAlign="center" fontWeight={0} fontFamily="Poppins, sans-serif" fontSize={{ base: "2xl", xl: "3xl" }} my={12} color="primary.500">{t("portfolio.movil")}</Heading>
                <Flex justify="center" wrap="wrap" gap={{ base: "40px", md: "60px" }}>
                    {mobileProjects.map((project, index) => (
                        <MobileProyect key={index} tecnologies={project.tecnologies} video1={project.video1} imgs={project.imgs} video2={project.video2} description={project.description} title={project.title} summary={project.summary} />
                    ))}
                </Flex>
            </Box>
        </>
    );
}
