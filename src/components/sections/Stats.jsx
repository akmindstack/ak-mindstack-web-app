import React from 'react'
import { motion } from 'framer-motion'
import { stats } from '../../data/content.js'

export default function Stats() {
  return (
    <div className="bg-ink border-b border-ink-line">
      <div className="mx-auto max-w-6xl px-6 py-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex flex-col items-center gap-1 text-center"
            >
              <span className="font-display text-2xl font-bold text-signal">{s.value}</span>
              <span className="font-mono text-[10px] uppercase tracking-wide text-paper/40">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
