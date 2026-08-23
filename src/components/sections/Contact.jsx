import React from 'react'
import { motion } from 'framer-motion'
import Button from '../ui/Button.jsx'

export default function Contact() {
  return (
    <section className="bg-paper bg-dot-grid">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-start justify-between gap-8 rounded-3xl bg-ink px-8 py-14 text-paper md:flex-row md:items-center md:px-14"
        >
          <div>
            <h2 className="text-3xl font-semibold leading-tight md:text-4xl">
              Have an idea?
              <br />
              Let's build it together.
            </h2>
            <p className="mt-3 text-paper/60">hello@akmindstack.com · Response within 1 business day</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button as="a" href="#contact-form" variant="primary">
              Start a Project Discussion
            </Button>
            <Button as="a" href="https://wa.me/910000000000" target="_blank" rel="noreferrer" variant="outline" className="text-paper">
              Message on WhatsApp
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
