import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import Home from './components/Home.js'
import About from './components/About.js'
import Contact from './components/Contact.js'
import Footer from './components/Footer.js'
import Nopage from './components/Nopage';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
        <Routes>
          <Route exact path='/'  element={<Home />}/>
          <Route exact path='/about'  element={<About />}/>
          <Route exact path='/contact'  element={<Contact />}/>
          <Route path='/*'  element={<Nopage />}/>
        </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
