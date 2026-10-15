import React from 'react'
import Navbar from './components/layout/Navbar.jsx'
import Footer from './components/layout/Footer.jsx'
import Hero from './components/sections/Hero.jsx'
import Stats from './components/sections/Stats.jsx'
import About from './components/sections/About.jsx'
import Services from './components/sections/Services.jsx'
import WhatsAppFlow from './components/sections/WhatsAppFlow.jsx'
import Solutions from './components/sections/Solutions.jsx'
import Process from './components/sections/Process.jsx'
import WhyUs from './components/sections/WhyUs.jsx'
import Clients from './components/sections/Clients.jsx'
import ContactForm from './components/sections/ContactForm.jsx'
import Contact from './components/sections/Contact.jsx'

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
        <Services />
        <WhatsAppFlow />
        <Solutions />
        <Process />
        <WhyUs />
        <Clients />
        <ContactForm />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
