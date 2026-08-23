import React from 'react'
import Navbar from './components/layout/Navbar.jsx'
import Footer from './components/layout/Footer.jsx'
import Hero from './components/sections/Hero.jsx'
import About from './components/sections/About.jsx'
import Services from './components/sections/Services.jsx'
import Solutions from './components/sections/Solutions.jsx'
import Process from './components/sections/Process.jsx'
import WhyUs from './components/sections/WhyUs.jsx'
import ContactForm from './components/sections/ContactForm.jsx'
import Contact from './components/sections/Contact.jsx'

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Solutions />
        <Process />
        <WhyUs />
        <ContactForm />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
