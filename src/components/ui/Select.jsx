import React from 'react'

export default function Select({ label, name, error, required, options, className = '', ...props }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-ink">
        {label}
        {required && <span className="text-signal-dim"> *</span>}
      </span>
      <select
        name={name}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`w-full rounded-xl border bg-white/70 px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-signal focus:ring-2 focus:ring-signal/20 ${
          error ? 'border-red-400' : 'border-ink/12'
        } ${className}`}
        {...props}
      >
        <option value="">Select…</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {error && (
        <span id={`${name}-error`} className="mt-1.5 block text-xs text-red-500">
          {error}
        </span>
      )}
    </label>
  )
}
