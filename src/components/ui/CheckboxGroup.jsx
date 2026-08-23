import React from 'react'

export default function CheckboxGroup({ label, name, options, values, onChange, required }) {
  const toggle = (opt) => {
    const next = values.includes(opt)
      ? values.filter((v) => v !== opt)
      : [...values, opt]
    onChange(name, next)
  }

  return (
    <fieldset>
      <legend className="mb-2 text-sm font-medium text-ink">
        {label}
        {required && <span className="text-signal-dim"> *</span>}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = values.includes(opt)
          return (
            <button
              type="button"
              key={opt}
              onClick={() => toggle(opt)}
              aria-pressed={active}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                active
                  ? 'border-signal bg-signal/15 text-ink'
                  : 'border-ink/15 bg-white/60 text-slate-deep hover:border-ink/30'
              }`}
            >
              {opt}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}
