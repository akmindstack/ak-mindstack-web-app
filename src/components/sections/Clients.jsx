import React from 'react'
import { motion } from 'framer-motion'
import Section from '../ui/Section.jsx'
import { clients } from '../../data/content.js'

export default function Clients() {
  return (
    <Section
      id="clients"
      eyebrow="Live Projects"
      title="Deployed and running in production."
      description="Real products built for real businesses — live, in use, and delivering results."
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {clients.map((client, i) => (
          <motion.div
            key={client.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group relative flex flex-col rounded-2xl border border-ink/8 bg-white/60 p-7 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-signal/40 hover:shadow-[0_16px_40px_-16px_rgba(0,184,169,0.35)]"
          >
            {/* header */}
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-signal-dim">
                  {client.category}
                </span>
                <h3 className="mt-1 text-xl font-semibold text-ink">{client.name}</h3>
              </div>
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-signal/10 text-signal transition-colors group-hover:bg-signal group-hover:text-ink">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>

            <p className="text-sm leading-relaxed text-slate-deep">{client.description}</p>

            {/* features grid */}
            <div className="mt-5 grid grid-cols-2 gap-2">
              {client.features.map((f) => (
                <div key={f} className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-signal">→</span>
                  <span className="text-xs text-slate-deep">{f}</span>
                </div>
              ))}
            </div>

            <a
              href={client.url}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-signal transition-colors hover:text-signal-dim"
              aria-label={`Visit ${client.name} live site`}
            >
              Visit Live Site
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M1 11L11 1M11 1H4M11 1V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            {/* full-card link overlay */}
            <a
              href={client.url}
              target="_blank"
              rel="noreferrer"
              className="absolute inset-0 rounded-2xl"
              aria-hidden="true"
              tabIndex="-1"
            />
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
