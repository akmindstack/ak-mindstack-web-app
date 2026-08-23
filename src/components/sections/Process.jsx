import React from 'react'
import { motion } from 'framer-motion'
import Section from '../ui/Section.jsx'
import { process } from '../../data/content.js'

export default function Process() {
  return (
    <Section
      id="process"
      eyebrow="How We Work"
      title="A predictable process for building software"
      description="Six stages, from first conversation to a launched, supported product."
    >
      <div className="relative">
        <div className="absolute left-[19px] top-2 bottom-2 hidden w-px bg-ink/10 md:block" />
        <div className="space-y-4">
          {process.map((p, i) => (
            <motion.div
              key={p.step}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="relative flex gap-5 rounded-xl border border-ink/8 bg-white/50 p-5 md:items-center"
            >
              <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink font-mono text-xs text-signal-light">
                {p.step}
              </span>
              <div>
                <h3 className="font-display text-base font-semibold text-ink">{p.title}</h3>
                <p className="mt-1 text-sm text-slate-deep">{p.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}
