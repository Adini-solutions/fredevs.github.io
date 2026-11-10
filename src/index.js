import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./i18n.js";

// Si la página llegó pre-renderizada (scripts/prerender.js), React la vuelve a
// dibujar encima con el mismo contenido. No se hidrata: el HTML capturado ya
// incluye el resultado de los efectos y no coincidiría con el primer render.
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
