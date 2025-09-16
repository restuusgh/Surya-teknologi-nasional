// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Komponen Transition & Layout
import Transition from "./transition/Transition";
import Navbar from "./components/section/Navbar";

// Halaman utama
import Home from "./components/section/Home";
import BarangKami from "./components/section/BarangKami";
import About from "./components/section/About";
import Services from "./components/section/Services";
import Portfolio from "./components/section/Portofolio";
import Contact from "./components/section/Contact";

// Detail produk
import PerangkatLunak from "./components/detailProduk/PerangkatLunak";
import SistemParkir from "./components/detailProduk/SistemParkir";
import SistemTicketing from "./components/detailProduk/SistemTicketing";

// Auth
import LoginForm from "./Auth/LoginForm";

// Komponen untuk routing animasi
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
      <Routes location={location} key={location.pathname}>
        {/* Halaman utama dengan beberapa section */}
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

        {/* Halaman per section */}
        <Route
          path="/barangkami"
          element={
            <>
              <Transition />
              <BarangKami />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <Transition />
              <About />
            </>
          }
        />
        <Route
          path="/services"
          element={
            <>
              <Transition />
              <Services />
            </>
          }
        />
        <Route
          path="/portfolio"
          element={
            <>
              <Transition />
              <Portfolio />
            </>
          }
        />
        <Route
          path="/contact"
          element={
            <>
              <Transition />
              <Contact />
            </>
          }
        />

        {/* Detail produk */}
        <Route
          path="/layanan/perangkat-lunak"
          element={
            <>
              <Transition />
              <PerangkatLunak />
            </>
          }
        />
        <Route
          path="/layanan/sistem-parkir"
          element={
            <>
              <Transition />
              <SistemParkir />
            </>
          }
        />
        <Route
          path="/layanan/sistem-ticketing"
          element={
            <>
              <Transition />
              <SistemTicketing />
            </>
          }
        />

        {/* Auth */}
        <Route
          path="/login"
          element={
            <>
              <Transition />
              <LoginForm />
            </>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

// Root App
const App = () => {
  return (
    <Router>
      <Navbar />
      <AnimatedRoutes />
    </Router>
  );
};

export default App;
