// Secure serverless function — deploy target: Vercel (or any platform that
// supports Node.js serverless functions with this signature, e.g. Netlify
// Functions with a small adapter).
//
// This file NEVER runs in the browser, so it is safe to read secrets from
// environment variables here. The React frontend only ever calls
// POST /api/send-enquiry — it never sees RESEND_API_KEY or ADMIN_EMAIL.

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const REQUIRED_FIELDS = ['name', 'email', 'phone', 'projectType', 'description']
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function buildEmailHtml(data) {
  const row = (label, value) =>
    `<tr>
       <td style="padding:6px 12px;color:#8A8F98;font:13px monospace;white-space:nowrap;">${label}</td>
       <td style="padding:6px 12px;color:#12161C;font:14px sans-serif;">${escapeHtml(value) || '—'}</td>
     </tr>`

  return `
  <div style="font-family:sans-serif;max-width:560px;margin:0 auto;">
    <div style="background:#12161C;color:#fff;padding:20px 24px;border-radius:12px 12px 0 0;">
      <p style="margin:0;font:12px monospace;letter-spacing:0.1em;color:#5FE3D6;text-transform:uppercase;">
        New Project Enquiry
      </p>
      <h2 style="margin:6px 0 0;font-size:20px;">AK Mindstack</h2>
    </div>
    <div style="border:1px solid #E9EAE4;border-top:none;border-radius:0 0 12px 12px;padding:8px 16px;">
      <table style="width:100%;border-collapse:collapse;">
        ${row('Client Name', data.name)}
        ${row('Email', data.email)}
        ${row('Phone', data.phone)}
        ${row('Company', data.company)}
        ${row('Project Type', data.projectType)}
        ${row('Budget', data.budget)}
        ${row('Timeline', data.timeline)}
        ${row('Platforms', (data.platforms || []).join(', '))}
        ${row('Integrations', (data.integrations || []).join(', '))}
      </table>
      <div style="margin-top:16px;padding:14px;background:#F3F4F0;border-radius:8px;">
        <p style="margin:0 0 6px;font:12px monospace;color:#8A8F98;text-transform:uppercase;">Project Description</p>
        <p style="margin:0;font-size:14px;line-height:1.6;color:#12161C;white-space:pre-wrap;">${escapeHtml(
          data.description
        )}</p>
      </div>
      <a href="mailto:${encodeURIComponent(data.email)}?subject=Re: Your project enquiry with AK Mindstack"
         style="display:inline-block;margin-top:20px;padding:10px 20px;background:#00B8A9;color:#12161C;text-decoration:none;border-radius:999px;font-weight:600;font-size:14px;">
        Reply to Client
      </a>
    </div>
  </div>`
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const data = req.body || {}

  const missing = REQUIRED_FIELDS.filter((f) => !String(data[f] || '').trim())
  if (missing.length > 0) {
    return res.status(400).json({ error: `Missing required fields: ${missing.join(', ')}` })
  }
  if (!EMAIL_RE.test(String(data.email).trim())) {
    return res.status(400).json({ error: 'Invalid email address.' })
  }

  const adminEmail = process.env.ADMIN_EMAIL
  const fromAddress = process.env.EMAIL_FROM || 'AK Mindstack <enquiries@akmindstack.com>'

  if (!adminEmail || !process.env.RESEND_API_KEY) {
    console.error('Email service is not configured: missing ADMIN_EMAIL or RESEND_API_KEY')
    return res.status(500).json({ error: 'Email service is not configured.' })
  }

  try {
    await resend.emails.send({
      from: fromAddress,
      to: adminEmail,
      replyTo: data.email,
      subject: `New Project Enquiry — ${data.name} (${data.projectType})`,
      html: buildEmailHtml(data),
    })

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Failed to send enquiry email:', err)
    return res.status(502).json({ error: 'Failed to send email. Please try again shortly.' })
  }
}
