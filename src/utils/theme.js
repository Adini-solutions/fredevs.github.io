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
