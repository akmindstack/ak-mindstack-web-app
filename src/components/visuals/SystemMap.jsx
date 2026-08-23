import React from 'react'
import { motion } from 'framer-motion'

// Signature hero visual: a set of product/integration nodes converging
// into the AK Mindstack core, with animated pulses along the connectors —
// a literal picture of what the brand does (wiring separate systems together).
const nodes = [
  { id: 'web', label: 'Web App', x: 40, y: 40 },
  { id: 'mobile', label: 'Mobile App', x: 40, y: 140 },
  { id: 'commerce', label: 'E-Commerce', x: 40, y: 240 },
  { id: 'whatsapp', label: 'WhatsApp', x: 40, y: 340 },
  { id: 'api', label: 'APIs', x: 40, y: 440 },
]

const core = { x: 340, y: 240 }

export default function SystemMap() {
  return (
    <div className="relative mx-auto aspect-[9/10] w-full max-w-md">
      <svg viewBox="0 0 420 480" className="h-full w-full" role="img" aria-label="Diagram of AK Mindstack connecting web, mobile, e-commerce, WhatsApp and API systems">
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#00B8A9" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#00B8A9" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {nodes.map((n, i) => (
          <g key={n.id}>
            <path
              d={`M ${n.x + 66} ${n.y} C ${(n.x + core.x) / 2} ${n.y}, ${(n.x + core.x) / 2} ${core.y}, ${core.x - 46} ${core.y}`}
              stroke="url(#lineGrad)"
              strokeWidth="1.5"
              fill="none"
            />
            <motion.circle
              r="3"
              fill="#5FE3D6"
              initial={{ offsetDistance: '0%' }}
              animate={{ offsetDistance: '100%' }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'linear', delay: i * 0.4 }}
              style={{
                offsetPath: `path('M ${n.x + 66} ${n.y} C ${(n.x + core.x) / 2} ${n.y}, ${(n.x + core.x) / 2} ${core.y}, ${core.x - 46} ${core.y}')`,
              }}
            />
          </g>
        ))}

        {nodes.map((n) => (
          <g key={`node-${n.id}`}>
            <rect
              x={n.x - 62}
              y={n.y - 18}
              width="128"
              height="36"
              rx="10"
              fill="#1B212B"
              stroke="#262C36"
            />
            <text
              x={n.x}
              y={n.y + 5}
              textAnchor="middle"
              fontFamily="'JetBrains Mono', monospace"
              fontSize="11"
              fill="#DDE1E6"
            >
              {n.label}
            </text>
          </g>
        ))}

        {/* Core */}
        <circle cx={core.x} cy={core.y} r="46" fill="#12161C" stroke="#00B8A9" strokeWidth="1.5" />
        <circle cx={core.x} cy={core.y} r="46" fill="none" stroke="#00B8A9" strokeWidth="1" opacity="0.5" className="animate-pulse-line" />
        <text
          x={core.x}
          y={core.y - 4}
          textAnchor="middle"
          fontFamily="'Space Grotesk', sans-serif"
          fontSize="13"
          fontWeight="700"
          fill="#F3F4F0"
        >
          AK
        </text>
        <text
          x={core.x}
          y={core.y + 14}
          textAnchor="middle"
          fontFamily="'JetBrains Mono', monospace"
          fontSize="9"
          fill="#5FE3D6"
        >
          MINDSTACK
        </text>
      </svg>
    </div>
  )
}
