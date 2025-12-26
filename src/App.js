import { ChakraProvider } from "@chakra-ui/react";
import theme from "./utils/theme.js";
import Navigation from "./navigation/Navigation.jsx";
import { HelmetProvider } from "react-helmet-async";

export default function App() {
  return (
    <HelmetProvider>
      <ChakraProvider theme={theme}>
        <Navigation />
      </ChakraProvider>
    </HelmetProvider>
  );
}
