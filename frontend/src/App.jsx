import React from 'react'
import Navbar from './components/section/Navbar'
import Home from "./components/section/Home";
import BarangKami from "./components/section/BarangKami";
import About from "./components/section/About";
import Services from './components/section/Services';
import Portfolio from './components/section/Portofolio';
import Contact from './components/section/contact';
const App = () => {
  return (
    <div class="brand-pill" aria-label="brand">
      <Navbar/>
      <Home/>
      <BarangKami/>
      <About/>
      <Services/>
      <Portfolio/>
      <Contact/>
    </div>
  )
}

export default App