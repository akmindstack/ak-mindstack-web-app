import React from 'react'
import { motion } from 'framer-motion'
import Section from '../ui/Section.jsx'
import { whyUs } from '../../data/content.js'

export default function WhyUs() {
  return (
    <Section
      id="why-us"
      tone="dark"
      eyebrow="Why AK Mindstack"
      title="Built by people who ship software, not slides."
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {whyUs.map((item, i) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, delay: i * 0.04 }}
            className="flex items-center gap-3 rounded-xl border border-ink-line bg-ink-soft px-5 py-4"
          >
            <span className="font-mono text-xs text-signal-light">→</span>
            <span className="text-sm text-paper/85">{item}</span>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
