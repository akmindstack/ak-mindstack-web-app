import React from 'react'
import { motion } from 'framer-motion'

export default function Card({ className = '', hover = true, children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay }}
      className={`group relative rounded-2xl border border-ink/8 bg-white/60 p-6 backdrop-blur-sm transition-all duration-300 ${
        hover ? 'hover:-translate-y-1 hover:border-signal/40 hover:shadow-[0_16px_40px_-16px_rgba(0,184,169,0.35)]' : ''
      } ${className}`}
    >
      {children}
    </motion.div>
  )
}
