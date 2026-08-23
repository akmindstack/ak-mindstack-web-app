import React from 'react'

export default function Textarea({ label, name, error, required, className = '', ...props }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-ink">
        {label}
        {required && <span className="text-signal-dim"> *</span>}
      </span>
      <textarea
        name={name}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`w-full rounded-xl border bg-white/70 px-4 py-3 text-sm text-ink placeholder:text-slate-soft outline-none transition-colors focus:border-signal focus:ring-2 focus:ring-signal/20 ${
          error ? 'border-red-400' : 'border-ink/12'
        } ${className}`}
        {...props}
      />
      {error && (
        <span id={`${name}-error`} className="mt-1.5 block text-xs text-red-500">
          {error}
        </span>
      )}
    </label>
  )
}
