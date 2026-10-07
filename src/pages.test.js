import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { HelmetProvider } from "react-helmet-async";
import theme from "./utils/theme";
import "./i18n";

import Home from "./components/pages/Home";
import Dev from "./components/pages/Dev";
import Infra from "./components/pages/Infra";
import IA from "./components/pages/IA";

const renderPage = (ui) =>
  render(
    <HelmetProvider>
      <ChakraProvider theme={theme}>
        <MemoryRouter>{ui}</MemoryRouter>
      </ChakraProvider>
    </HelmetProvider>
  );

describe("páginas", () => {
  it("el home muestra los tres pilares", () => {
    renderPage(<Home />);
    // Cada pilar aparece en la tarjeta de ServiceAreas y otra vez en el footer.
    expect(screen.getAllByText("Desarrollo de Software").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Infrastructure & Cloud Services").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Inteligencia Artificial").length).toBeGreaterThan(0);
  });

  it("dev e infra siguen renderizando", () => {
    renderPage(<Dev />);
    expect(screen.getAllByText(/Desarrollo a Medida/i).length).toBeGreaterThan(0);
    renderPage(<Infra />);
    expect(screen.getAllByText(/Infraestructura Core y Datacenter/i).length).toBeGreaterThan(0);
  });

  it("la página de IA muestra las ofertas y las preguntas frecuentes", () => {
    renderPage(<IA />);
    expect(
      screen.getByText("Asistente interno sobre tu documentación")
    ).toBeInTheDocument();
    expect(screen.getByText("Agentes que ejecutan procesos")).toBeInTheDocument();
    expect(
      screen.getByText(/Mis datos quedan expuestos/i)
    ).toBeInTheDocument();
  });

  it("no publica textos que todavía son plantilla", () => {
    renderPage(<IA />);
    expect(screen.queryByText(/\[COMPLETAR/)).not.toBeInTheDocument();
    expect(screen.queryByText(/\[TO DO/)).not.toBeInTheDocument();
  });
});
