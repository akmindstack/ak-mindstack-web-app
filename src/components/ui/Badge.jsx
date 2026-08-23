import React from 'react'

export default function Badge({ children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-current/20 px-3 py-1 text-xs font-mono tracking-wide ${className}`}
    >
      {children}
    </span>
  )
}
