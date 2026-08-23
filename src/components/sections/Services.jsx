import React from 'react'
import Section from '../ui/Section.jsx'
import Card from '../ui/Card.jsx'
import { services } from '../../data/content.js'

export default function Services() {
  return (
    <Section
      id="services"
      eyebrow="Services"
      title="What we build"
      description="Focused engineering capability across the systems a growing business actually needs."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <Card key={s.title} delay={i * 0.05}>
            <span className="font-mono text-xs text-signal-dim">{s.tag}</span>
            <h3 className="mt-3 text-lg font-semibold text-ink">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-deep">{s.description}</p>
          </Card>
        ))}
      </div>
    </Section>
  )
}
