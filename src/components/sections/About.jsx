import React from 'react'
import Section from '../ui/Section.jsx'

const capabilities = [
  'Custom software development',
  'Web applications',
  'Mobile applications',
  'E-commerce development',
  'Business automation',
  'API integrations',
  'WhatsApp integrations',
  'Industry-specific solutions',
]

export default function About() {
  return (
    <Section
      id="about"
      eyebrow="About Us"
      title="Software built around your business, not the other way around."
      description="AK Mindstack designs and builds custom digital products for businesses that need software shaped to how they actually operate — from customer-facing applications to the internal tools that run day-to-day operations."
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {capabilities.map((c) => (
          <div
            key={c}
            className="rounded-xl border border-ink/10 bg-white/50 px-5 py-4 text-sm font-medium text-slate-deep"
          >
            {c}
          </div>
        ))}
      </div>
    </Section>
  )
}
