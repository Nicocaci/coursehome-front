import { useState } from 'react';
import Home from './pages/Home.jsx';
import Navbar from './navigation/Navbar.jsx';
import Contacto from './pages/Contacto.jsx';
import Nosotros from './pages/Nosotros.jsx';
import Footer from './navigation/Footer.jsx';
import Faq from './pages/Faq.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css'

function App() {
  return (
    <>
      <BrowserRouter>
        <div id='root'>
          <Navbar />
          <main>
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route exact path='/contacto' element={<Contacto />} />
              <Route exact path='/nosotros' element={<Nosotros />} />
              <Route exact path='/faq' element={<Faq />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
