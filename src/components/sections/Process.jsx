import React from 'react'
import { motion } from 'framer-motion'
import Section from '../ui/Section.jsx'
import { process } from '../../data/content.js'

export default function Process() {
  return (
    <Section
      id="process"
      eyebrow="How We Work"
      title="A predictable process — from idea to live product"
      description="Six stages, every time. You always know where the project stands."
    >
      <div className="relative">
        {/* vertical connector line */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ originY: 0 }}
          className="absolute left-[19px] top-5 bottom-5 hidden w-px bg-gradient-to-b from-signal/60 via-signal/20 to-transparent md:block"
        />
        <div className="space-y-4">
          {process.map((p, i) => (
            <motion.div
              key={p.step}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="group relative flex gap-5 rounded-xl border border-ink/8 bg-white/50 p-5 transition-all duration-300 hover:border-signal/30 hover:bg-white/80 hover:shadow-sm md:items-center"
            >
              <motion.span
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink font-mono text-xs text-signal-light ring-2 ring-transparent transition-all duration-300 group-hover:ring-signal/30"
              >
                {p.step}
              </motion.span>
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
