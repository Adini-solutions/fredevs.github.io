import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  styles: {
    global: {
      "::-webkit-scrollbar": {
        width: "12px",
        height: "12px",
      },
      "::-webkit-scrollbar-track": {
        background: "#f0f0f0",
        borderRadius: "10px",
      },
      "::-webkit-scrollbar-thumb": {
        backgroundColor: "#888",
        borderRadius: "10px",
        border: "2px solid #f0f0f0",
      },
      "::-webkit-scrollbar-thumb:hover": {
        backgroundColor: "#555",
      },
      html: {
        scrollbarWidth: "thin",
        scrollbarColor: "#091c30 #f7f8ff",
      },
      // Escala global: en tablets y notebooks de 13" el tamaño base baja a
      // 14px y vuelve a 16px de forma gradual entre 1280 y 1536px de ancho.
      // Como el sitio mide casi todo en rem, tipografía, espaciados y
      // tarjetas se achican juntos. El celular y las pantallas grandes no
      // cambian.
      "@media (min-width: 768px)": {
        html: {
          fontSize: "clamp(14px, calc(14px + (100vw - 1280px) * 0.0078125), 16px)",
        },
      },
    },
  },
  colors: {
    primary: {
      500: "#091c30",
    },
    secondary: {
      500: "#f2f2f2",
    },
    tertiary: {
      500: "#6c63ff",
    },
    quarter: {
      500: "#f7f8ff",
    }
  },
  components: {
    Button: {
      variants: {
        primary: (props) => ({
          border: "2px solid #091c30",
          borderRadius: "md",
          bg: "#091c30",
          color: "#f2f2f2",
          px: "12px",
          py: "1px",
          _hover: {
            bg: "#f2f2f2",
            borderColor: "#091c30",
            border: "2px solid #091c30",
            color: "#044978",
          },
          _active: {
            bg: "#ced4da",
          },
        }),
        secondary: (props) => ({
          borderRadius: "md",
          bg: "#fff",
          color: "#044978",
          _hover: {
            shadow: "md",
          },
          _active: {
            bg: "#f5f5f5",
          },
        }),
        tertiary: (props) => ({
          borderRadius: "md",
          bg: "#044978",
          color: "#fff",
          _hover: {
            bg: "#13577d",
          },
        }),
      },
    },
  },
});

export default theme;
