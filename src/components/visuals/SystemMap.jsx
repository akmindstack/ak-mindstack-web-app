import React from 'react'
import { motion } from 'framer-motion'

const CX = 250
const CY = 250
const CORE_R = 52
const NODE_R = 158
const NODE_W = 112
const NODE_H = 34

const toRad = (deg) => (deg * Math.PI) / 180

const serviceNodes = [
  { id: 'web',     label: 'Web App',     angle: -90  },
  { id: 'mobile',  label: 'Mobile App',  angle: -30  },
  { id: 'ecom',    label: 'E-Commerce',  angle: 30   },
  { id: 'wa',      label: 'WhatsApp',    angle: 90   },
  { id: 'payment', label: 'Payments',    angle: 150  },
  { id: 'admin',   label: 'Admin Panel', angle: -150 },
]

function nodePos(angle) {
  return {
    x: CX + NODE_R * Math.cos(toRad(angle)),
    y: CY + NODE_R * Math.sin(toRad(angle)),
  }
}

function coreEdge(angle) {
  return {
    x: CX + (CORE_R + 2) * Math.cos(toRad(angle)),
    y: CY + (CORE_R + 2) * Math.sin(toRad(angle)),
  }
}

export default function SystemMap() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[420px]">
      <svg
        viewBox="0 0 500 500"
        className="h-full w-full"
        role="img"
        aria-label="AK Mindstack hub connecting Web, Mobile, E-Commerce, WhatsApp, Payments and Admin Panel"
      >
        <defs>
          {/* radial background glow */}
          <radialGradient id="bg-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00B8A9" stopOpacity="0.07" />
            <stop offset="100%" stopColor="#12161C" stopOpacity="0" />
          </radialGradient>

          {/* core glow filter */}
          <filter id="core-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* per-connection gradient (node → core) */}
          {serviceNodes.map((n) => {
            const p = nodePos(n.angle)
            const e = coreEdge(n.angle)
            return (
              <linearGradient
                key={`lg-${n.id}`}
                id={`lg-${n.id}`}
                x1={p.x} y1={p.y}
                x2={e.x} y2={e.y}
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%"   stopColor="#00B8A9" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#00B8A9" stopOpacity="0.85" />
              </linearGradient>
            )
          })}
        </defs>

        {/* background glow blob */}
        <circle cx={CX} cy={CY} r="210" fill="url(#bg-grad)" />

        {/* ── connection lines (drawn first, behind nodes) ── */}
        {serviceNodes.map((n, i) => {
          const p = nodePos(n.angle)
          const e = coreEdge(n.angle)
          const d = `M ${p.x} ${p.y} L ${e.x} ${e.y}`
          return (
            <motion.path
              key={`line-${n.id}`}
              d={d}
              stroke={`url(#lg-${n.id})`}
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.08, ease: 'easeOut' }}
            />
          )
        })}

        {/* ── animated travelling dots ── */}
        {serviceNodes.map((n, i) => {
          const p = nodePos(n.angle)
          const e = coreEdge(n.angle)
          const d = `M ${p.x} ${p.y} L ${e.x} ${e.y}`
          return (
            <motion.circle
              key={`dot-${n.id}`}
              r="3.5"
              fill="#5FE3D6"
              style={{ offsetPath: `path('${d}')` }}
              initial={{ offsetDistance: '0%', opacity: 0 }}
              animate={{ offsetDistance: ['0%', '100%'], opacity: [0, 1, 1, 0] }}
              transition={{
                repeat: Infinity,
                duration: 2.2,
                delay: 0.9 + i * 0.38,
                ease: 'easeInOut',
                times: [0, 0.1, 0.85, 1],
              }}
            />
          )
        })}

        {/* ── core ── */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.55, ease: [0.34, 1.56, 0.64, 1] }}
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        >
          {/* outermost pulsing ring */}
          <motion.circle
            cx={CX} cy={CY}
            fill="none"
            stroke="#00B8A9"
            strokeWidth="0.8"
            animate={{ r: [CORE_R + 10, CORE_R + 18, CORE_R + 10], opacity: [0.35, 0.08, 0.35] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* mid glow ring */}
          <circle cx={CX} cy={CY} r={CORE_R + 8} fill="none" stroke="#00B8A9" strokeWidth="0.6" opacity="0.25" filter="url(#core-glow)" />
          {/* solid ring */}
          <circle cx={CX} cy={CY} r={CORE_R + 3} fill="none" stroke="#00B8A9" strokeWidth="1" opacity="0.5" />
          {/* filled core */}
          <circle cx={CX} cy={CY} r={CORE_R} fill="#12161C" stroke="#00B8A9" strokeWidth="1.5" />
          {/* core text */}
          <text x={CX} y={CY - 7} textAnchor="middle" fontFamily="'Space Grotesk', sans-serif" fontSize="17" fontWeight="700" fill="#F3F4F0">
            AK
          </text>
          <text x={CX} y={CY + 11} textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="8.5" letterSpacing="2.5" fill="#5FE3D6">
            MINDSTACK
          </text>
        </motion.g>

        {/* ── service nodes ── */}
        {serviceNodes.map((n, i) => {
          const { x, y } = nodePos(n.angle)
          const rx = x - NODE_W / 2
          const ry = y - NODE_H / 2
          return (
            <motion.g
              key={`node-${n.id}`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.05 + i * 0.07, ease: [0.34, 1.56, 0.64, 1] }}
              style={{ transformOrigin: `${x}px ${y}px` }}
            >
              {/* subtle outer glow on node */}
              <rect x={rx - 1} y={ry - 1} width={NODE_W + 2} height={NODE_H + 2} rx="9" fill="none" stroke="#00B8A9" strokeWidth="0.5" opacity="0.3" />
              {/* node box */}
              <rect x={rx} y={ry} width={NODE_W} height={NODE_H} rx="8" fill="#1A2030" stroke="#2A3242" strokeWidth="1" />
              {/* left accent bar */}
              <rect x={rx} y={ry + 7} width="2.5" height={NODE_H - 14} rx="2" fill="#00B8A9" opacity="0.9" />
              {/* label */}
              <text
                x={x + 5}
                y={y + 5}
                textAnchor="middle"
                fontFamily="'JetBrains Mono', monospace"
                fontSize="10.5"
                fill="#CDD1D9"
              >
                {n.label}
              </text>
            </motion.g>
          )
        })}
      </svg>
    </div>
  )
}
