import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/pages/Home";
import NotFound from "../components/pages/NotFound";
import Dev from "../components/pages/Dev";
import Infra from "../components/pages/Infra";

export default function Navigation() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dev" element={<Dev />} />
        <Route path="/infra" element={<Infra />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}