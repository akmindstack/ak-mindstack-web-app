import React from 'react'
import { motion } from 'framer-motion'
import Section from '../ui/Section.jsx'
import { solutions } from '../../data/content.js'

export default function Solutions() {
  return (
    <Section
      id="solutions"
      tone="dark"
      eyebrow="Solutions"
      title="Products we can build for your industry"
      description="Reference builds showing the depth AK Mindstack works at — full systems, not single features."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {solutions.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="rounded-2xl border border-ink-line bg-ink-soft p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-xl font-semibold text-paper">{s.title}</h3>
              <span className="font-mono text-xs text-signal-light">SYSTEM</span>
            </div>
            <p className="mt-2 text-sm text-paper/60">{s.summary}</p>

            <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2.5">
              {s.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-paper/75">
                  <span className="h-1 w-1 shrink-0 rounded-full bg-signal" />
                  {f}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
