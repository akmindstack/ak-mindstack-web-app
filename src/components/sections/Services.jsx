import React from 'react'
import { motion } from 'framer-motion'
import Section from '../ui/Section.jsx'
import { services } from '../../data/content.js'

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] },
  }),
}

const featureVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, delay: i * 0.05 },
  }),
}

export default function Services() {
  return (
    <Section
      id="services"
      eyebrow="Services"
      title="Everything we build — and what's inside each one"
      description="Every service is a full working system. No partial builds, no hand-offs to another vendor."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={cardVariants}
            className="group relative flex flex-col rounded-2xl border border-ink/8 bg-white/60 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-signal/40 hover:shadow-[0_20px_48px_-16px_rgba(0,184,169,0.3)]"
          >
            {/* top row */}
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-signal-dim">{s.tag}</span>
              {s.badge && (
                <span className="flex items-center gap-1 rounded-full bg-signal/12 px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-wide text-signal-dim">
                  <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse" />
                  {s.badge}
                </span>
              )}
            </div>

            {/* title + description */}
            <h3 className="mt-4 text-lg font-semibold leading-snug text-ink">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-deep">{s.description}</p>

            {/* feature list */}
            <ul className="mt-5 space-y-2">
              {s.features.map((f, fi) => (
                <motion.li
                  key={f}
                  custom={fi}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={featureVariants}
                  className="flex items-center gap-2.5"
                >
                  <span className="font-mono text-[11px] text-signal opacity-70 transition-opacity group-hover:opacity-100">→</span>
                  <span className="text-xs text-slate-deep">{f}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
