import React, { useEffect, useState } from 'react'
import Button from '../ui/Button.jsx'

const links = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#solutions', label: 'Solutions' },
  { href: '#process', label: 'How We Work' },
  { href: '#contact-form', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-ink/90 backdrop-blur-md border-b border-ink-line' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center">
          <img src="/logo.png" alt="AK Mindstack" className="h-16 w-56 object-contain" />
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-paper/75 transition-colors hover:text-signal-light"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <Button as="a" href="#contact-form" variant="primary" className="text-sm">
            Start Your Project
          </Button>
        </div>

        <button
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span className={`h-0.5 w-6 bg-paper transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`h-0.5 w-6 bg-paper transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`h-0.5 w-6 bg-paper transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </nav>

      {open && (
        <div className="border-t border-ink-line bg-ink px-6 pb-6 md:hidden">
          <div className="flex flex-col gap-4 pt-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-paper/80"
              >
                {l.label}
              </a>
            ))}
            <Button as="a" href="#contact-form" variant="primary" onClick={() => setOpen(false)}>
              Start Your Project
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
