import React, { useState } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import Section from '../ui/Section.jsx'
import Input from '../ui/Input.jsx'
import Textarea from '../ui/Textarea.jsx'
import Select from '../ui/Select.jsx'
import CheckboxGroup from '../ui/CheckboxGroup.jsx'
import Button from '../ui/Button.jsx'
import { validateEnquiry } from '../../lib/validate.js'
import { projectTypes, budgetRanges, timelines, platforms, integrations } from '../../data/content.js'

const initialState = {
  name: '',
  email: '',
  phone: '',
  company: '',
  projectType: '',
  budget: '',
  timeline: '',
  platforms: [],
  integrations: [],
  description: '',
}

export default function ContactForm() {
  const [form, setForm] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success | error

  const update = (name, value) => {
    setForm((f) => ({ ...f, [name]: value }))
    if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }))
  }

  const handleChange = (e) => update(e.target.name, e.target.value)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validateEnquiry(form)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    setStatus('submitting')
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          phone: form.phone,
          company: form.company || '—',
          project_type: form.projectType,
          budget: form.budget || '—',
          timeline: form.timeline || '—',
          platforms: (form.platforms || []).join(', ') || '—',
          integrations: (form.integrations || []).join(', ') || '—',
          description: form.description,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )

      setStatus('success')
      setForm(initialState)
    } catch (err) {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <Section id="contact-form" eyebrow="Project Enquiry" title="Let's Discuss Your Project">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-lg rounded-2xl border border-signal/30 bg-signal/10 p-10 text-center"
        >
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-signal text-ink">
            ✓
          </div>
          <h3 className="text-xl font-semibold text-ink">Thank you!</h3>
          <p className="mt-2 text-sm text-slate-deep">
            Your project request has been received. We'll get back to you soon.
          </p>
          <Button variant="outline" className="mt-6" onClick={() => setStatus('idle')}>
            Submit another request
          </Button>
        </motion.div>
      </Section>
    )
  }

  return (
    <Section
      id="contact-form"
      eyebrow="Project Enquiry"
      title="Let's Discuss Your Project"
      description="Tell us what you're building. We typically respond within one business day."
    >
      <form onSubmit={handleSubmit} noValidate className="mx-auto max-w-3xl space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <Input
            label="Name"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            error={errors.name}
            placeholder="Your full name"
          />
          <Input
            label="Email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="you@company.com"
          />
          <Input
            label="Phone Number"
            name="phone"
            type="tel"
            required
            value={form.phone}
            onChange={handleChange}
            error={errors.phone}
            placeholder="+91 00000 00000"
          />
          <Input
            label="Company / Business Name"
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder="Optional"
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          <Select
            label="Project Type"
            name="projectType"
            required
            options={projectTypes}
            value={form.projectType}
            onChange={handleChange}
            error={errors.projectType}
          />
          <Select
            label="Budget Range"
            name="budget"
            options={budgetRanges}
            value={form.budget}
            onChange={handleChange}
          />
          <Select
            label="Expected Timeline"
            name="timeline"
            options={timelines}
            value={form.timeline}
            onChange={handleChange}
          />
        </div>

        <CheckboxGroup
          label="Required Platforms"
          name="platforms"
          options={platforms}
          values={form.platforms}
          onChange={update}
          required
        />
        {errors.platforms && <p className="-mt-4 text-xs text-red-500">{errors.platforms}</p>}

        <CheckboxGroup
          label="Required Integrations"
          name="integrations"
          options={integrations}
          values={form.integrations}
          onChange={update}
        />

        <Textarea
          label="Tell us about your project…"
          name="description"
          required
          rows={6}
          value={form.description}
          onChange={handleChange}
          error={errors.description}
          placeholder="What are you building, who is it for, and what does success look like?"
        />

        {status === 'error' && (
          <p role="alert" className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-600">
            Something went wrong sending your request. Please try again, or email us directly at
            hello@akmindstack.com.
          </p>
        )}

        <Button type="submit" disabled={status === 'submitting'} className="w-full sm:w-auto">
          {status === 'submitting' ? 'Sending…' : 'Submit Project Request'}
        </Button>
      </form>
    </Section>
  )
}
