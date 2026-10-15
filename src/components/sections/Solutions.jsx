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
      title="Full systems we build for your industry"
      description="Not single features — complete, production-ready products with every module included."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {solutions.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="group flex flex-col rounded-2xl border border-ink-line bg-ink-soft p-7 transition-all duration-300 hover:border-signal/40 hover:shadow-[0_0_40px_-8px_rgba(0,184,169,0.2)]"
          >
            {/* header */}
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-xl font-semibold text-paper">{s.title}</h3>
              <div className="flex flex-col items-end gap-1.5">
                <span className="font-mono text-[10px] uppercase tracking-widest text-signal/60">Full System</span>
                {s.badge && (
                  <span className="flex items-center gap-1 rounded-full border border-signal/30 bg-signal/10 px-2.5 py-0.5 font-mono text-[10px] font-medium text-signal-light">
                    <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse" />
                    {s.badge}
                  </span>
                )}
              </div>
            </div>

            <p className="mt-2 text-sm leading-relaxed text-paper/60">{s.summary}</p>

            {/* features */}
            <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2.5">
              {s.features.map((f, fi) => (
                <motion.li
                  key={f}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: fi * 0.04 + i * 0.08 }}
                  className="flex items-center gap-2 text-sm"
                >
                  <span className="h-1 w-1 shrink-0 rounded-full bg-signal transition-all duration-300 group-hover:h-1.5 group-hover:w-1.5" />
                  <span className="text-paper/75">{f}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
