import React from 'react'
import { motion } from 'framer-motion'

export default function Section({
  id,
  eyebrow,
  title,
  description,
  tone = 'light',
  className = '',
  children,
}) {
  const toneClasses =
    tone === 'dark'
      ? 'bg-ink text-paper bg-dot-grid-dark'
      : 'bg-paper text-ink bg-dot-grid'

  return (
    <section id={id} className={`relative ${toneClasses} ${className}`}>
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        {(eyebrow || title) && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="mb-14 max-w-2xl"
          >
            {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
            {title && (
              <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
                {title}
              </h2>
            )}
            {description && (
              <p
                className={`mt-4 text-base md:text-lg ${
                  tone === 'dark' ? 'text-paper/70' : 'text-slate-deep'
                }`}
              >
                {description}
              </p>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  )
}
