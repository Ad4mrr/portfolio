import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Ai from "./pages/Ai";
import Backend from "./pages/Backend";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/ai" element={<Ai />} />
        <Route path="/backend" element={<Backend />} />
      </Routes>
    </Router>
  );
}