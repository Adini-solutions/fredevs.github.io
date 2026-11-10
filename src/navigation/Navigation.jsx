import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "../components/pages/Home";
import NotFound from "../components/pages/NotFound";
import Dev from "../components/pages/Dev";
import Infra from "../components/pages/Infra";
import IA from "../components/pages/IA";

// Al cambiar de página se vuelve arriba (los links con #sección los maneja
// useHashScroll en cada página).
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function Navigation() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dev" element={<Dev />} />
        <Route path="/infra" element={<Infra />} />
        <Route path="/ia" element={<IA />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
