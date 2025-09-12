import React, { useState } from "react";
import Navbar from "./components/section/Navbar";
import Home from "./components/section/Home";
import BarangKami from "./components/section/BarangKami";
import About from "./components/section/About";
import Services from "./components/section/Services";
import Portfolio from "./components/section/Portofolio";
import Contact from "./components/section/Contact";

const App = () => {
  const [view, setView] = useState("home");

  return (
    <div className="brand-pill" aria-label="brand">
      <Navbar setView={setView} />

      {view === "home" && (
        <>
          <Home />
          <BarangKami />
          <About />
          <Services />
          <Portfolio />
          <Contact />
        </>
      )}

      {view === "barangkami" && <BarangKami />}
      {view === "about" && <About />}
      {view === "services" && <Services />}
      {view === "portfolio" && <Portfolio />}
      {view === "contact" && <Contact />}
    </div>
  );
};

export default App;

