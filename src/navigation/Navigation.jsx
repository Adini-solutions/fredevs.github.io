import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/pages/Home";
import NotFound from "../components/pages/NotFound";
import Dev from "../components/pages/Dev";
import Infra from "../components/pages/Infra";

export default function Navigation() {

  return (
    <Router>
      <Routes>
        <Route>
          <Route path="/" element={<Home />} />
        </Route>
        <Route>
          <Route path="/dev" element={<Dev />} />
        </Route>
        <Route>
          <Route path="/infra" element={<Infra />} />
        </Route>
        <Route>
          <Route path="/*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}
