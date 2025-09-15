import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Komponen halaman
import Navbar from "./components/section/Navbar";
import Home from "./components/section/Home";
import BarangKami from "./components/section/BarangKami";
import About from "./components/section/About";
import Services from "./components/section/Services";
import Portfolio from "./components/section/Portofolio";
import Contact from "./components/section/Contact";

// Transition
import Transition from "./transition/Transition.jsx";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <>
              <Transition />
              <Home />
              <BarangKami />
              <About />
              <Services />
              <Portfolio />
              <Contact />
            </>
          }
        />
        <Route path="/barangkami" element={<><Transition /><BarangKami /></>} />
        <Route path="/about" element={<><Transition /><About /></>} />
        <Route path="/services" element={<><Transition /><Services /></>} />
        <Route path="/portfolio" element={<><Transition /><Portfolio /></>} />
        <Route path="/contact" element={<><Transition /><Contact /></>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <Router>
      <Navbar />
      <AnimatedRoutes />
    </Router>
  );
};

export default App;
