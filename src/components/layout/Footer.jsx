import React from 'react'

const columns = [
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#about' },
      { label: 'How We Work', href: '#process' },
      { label: 'Why AK Mindstack', href: '#why-us' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Web Applications', href: '#services' },
      { label: 'Mobile Apps', href: '#services' },
      { label: 'E-Commerce', href: '#services' },
      { label: 'WhatsApp Integration', href: '#services' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'E-Commerce Platform', href: '#solutions' },
      { label: 'Hotel Management', href: '#solutions' },
      { label: 'School Attendance', href: '#solutions' },
    ],
  },
]

const social = [
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'GitHub', href: 'https://github.com' },
  { label: 'Twitter / X', href: 'https://twitter.com' },
]

export default function Footer() {
  return (
    <footer id="contact" className="bg-ink bg-dot-grid-dark text-paper">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2 font-display text-xl font-semibold">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-signal text-ink">AK</span>
              Mindstack
            </div>
            <p className="mt-3 max-w-xs text-sm text-paper/60">Smart Thinking. Strong Tech.</p>
            <p className="mt-6 text-sm text-paper/70">Have an idea? Let's build it together.</p>
            <div className="mt-3 flex flex-col gap-1 text-sm">
              <a href="mailto:hello@akmindstack.com" className="text-signal-light hover:underline">
                hello@akmindstack.com
              </a>
              <a
                href="https://wa.me/917418547514"
                target="_blank"
                rel="noreferrer"
                className="text-signal-light hover:underline"
              >
                +91 74185 47514
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="eyebrow mb-4 text-paper/50">{col.title}</p>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-sm text-paper/70 transition-colors hover:text-signal-light">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-ink-line pt-8 text-xs text-paper/45 md:flex-row">
          <p>© {new Date().getFullYear()} AK Mindstack. All rights reserved.</p>
          <div className="flex gap-5">
            {social.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="hover:text-signal-light">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
