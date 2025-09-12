import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Komponen halaman utama
import Navbar from "./components/section/Navbar";
import Home from "./components/section/Home";
import BarangKami from "./components/section/BarangKami";
import About from "./components/section/About";
import Services from "./components/section/Services";
import Portfolio from "./components/section/Portofolio";
import Contact from "./components/section/Contact";

// Halaman detail produk
import PerangkatLunak from "./components/detailProduk/PerangkatLunak";
import SistemParkir from "./components/detailProduk/SistemParkir";
import SistemTicketing from "./components/detailProduk/SistemTicketing";

const App = () => {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <BarangKami />
              <About />
              <Services />
              <Portfolio />
              <Contact />
            </>
          }
        />
        <Route path="/barangkami" element={<BarangKami />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact" element={<Contact />} />

        {/* Halaman detail produk */}
        <Route
          path="/layanan/perangkat-lunak"
          element={<PerangkatLunak />}
        />
        <Route
          path="/layanan/sistem-parkir"
          element={<SistemParkir />}
        />
        <Route
          path="/layanan/sistem-ticketing"
          element={<SistemTicketing />}
        />
      </Routes>
    </Router>
  );
};

export default App;
