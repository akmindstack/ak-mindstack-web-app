import React from 'react'
import { motion } from 'framer-motion'
import Button from '../ui/Button.jsx'
import SystemMap from '../visuals/SystemMap.jsx'

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-ink bg-dot-grid-dark pt-32 pb-20 text-paper md:pt-40 md:pb-28">
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 md:grid-cols-2">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="eyebrow mb-5 text-signal-light"
          >
            AK Mindstack / Custom Software Studio
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-4xl font-semibold leading-[1.08] tracking-tight text-paper md:text-5xl lg:text-6xl"
          >
            Build Smarter.
            <br />
            <span className="text-signal-light">Grow Faster.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 max-w-md text-lg text-paper/70"
          >
            Custom software solutions designed to transform your business ideas into powerful digital products.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <Button as="a" href="#contact-form" variant="primary">
              Start Your Project
            </Button>
            <Button as="a" href="#services" variant="outline" className="text-paper">
              Explore Our Services
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-14 flex flex-wrap gap-x-8 gap-y-3 font-mono text-xs uppercase tracking-wide text-paper/40"
          >
            <span>Web</span>
            <span>Mobile</span>
            <span>E-Commerce</span>
            <span>Automation</span>
            <span>Integrations</span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <SystemMap />
        </motion.div>
      </div>
    </section>
  )
}
