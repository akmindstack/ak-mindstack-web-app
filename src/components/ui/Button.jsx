import React from 'react'

const variants = {
  primary:
    'bg-signal text-ink hover:bg-signal-light shadow-[0_0_0_1px_rgba(0,184,169,0.4)]',
  outline:
    'bg-transparent text-current border border-current/25 hover:border-current/60',
  ghost: 'bg-transparent text-current hover:bg-current/5',
}

export default function Button({
  as = 'button',
  variant = 'primary',
  className = '',
  children,
  ...props
}) {
  const Comp = as
  return (
    <Comp
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold font-display tracking-tight transition-all duration-200 active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Comp>
  )
}
