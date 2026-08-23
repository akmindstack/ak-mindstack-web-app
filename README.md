# AK Mindstack — Website

**Smart Thinking. Strong Tech.**

A production-ready marketing site for AK Mindstack, a custom software development
studio. Built with React, Vite, Tailwind CSS and Framer Motion, with a secure
serverless function that emails project enquiries to the AK Mindstack admin
inbox without ever exposing credentials in the frontend.

## Architecture

```
React Frontend (src/)
   → POST /api/send-enquiry
   → Serverless Function (api/send-enquiry.js)
   → Resend Email API
   → AK Mindstack Admin Email
```

The frontend never talks to Resend directly and never sees `RESEND_API_KEY`.
It only calls your own `/api/send-enquiry` endpoint, which reads secrets from
server-side environment variables.

## Project structure

```
src/
  components/
    ui/          Reusable primitives: Button, Card, Input, Textarea, Select,
                  CheckboxGroup, Modal, Badge, Section
    layout/       Navbar, Footer
    sections/     Hero, About, Services, Solutions, Process, WhyUs,
                  ContactForm, Contact
    visuals/      SystemMap — the animated hero diagram
  data/           Static content (services, solutions, process, form options)
  lib/            Form validation
api/
  send-enquiry.js Serverless function that sends the enquiry email
```

## 1. Installing dependencies

Requires Node.js 18+.

```bash
npm install
```

## 2. Running the project locally

```bash
npm run dev
```

This starts the Vite dev server (usually at `http://localhost:5173`).

> **Note:** `npm run dev` only serves the frontend. The `/api/send-enquiry`
> function needs a serverless runtime to execute locally — see below.

To run the API route locally the way it will run in production, use the
Vercel CLI:

```bash
npm install -g vercel
vercel dev
```

`vercel dev` serves both the Vite frontend and the `/api/send-enquiry`
function together, proxying API requests correctly.

## 3. Configuring environment variables

```bash
cp .env.example .env
```

Then fill in:

| Variable          | Description                                                        |
| ----------------- | ------------------------------------------------------------------- |
| `RESEND_API_KEY`  | API key from your [Resend](https://resend.com) account              |
| `ADMIN_EMAIL`     | The inbox that should receive new project enquiries                 |
| `EMAIL_FROM`      | The verified sender address enquiry emails are sent from            |

These are read **only** inside `api/send-enquiry.js` (server-side). Nothing
prefixed for Vite (`VITE_...`) is used for secrets, so nothing here is bundled
into the browser build.

## 4. Setting up the email service

This project uses [Resend](https://resend.com) because it has a simple API
and a generous free tier, but `api/send-enquiry.js` is small enough to swap
for Nodemailer + SMTP, SendGrid, or Postmark if you prefer.

1. Create a Resend account and verify a sending domain (or use their shared
   test domain while developing).
2. Generate an API key and put it in `RESEND_API_KEY`.
3. Set `EMAIL_FROM` to an address on your verified domain.
4. Set `ADMIN_EMAIL` to where enquiries should land.

## 5. Testing the project enquiry form

1. Run `vercel dev` (or deploy to a preview environment).
2. Fill out the **Let's Discuss Your Project** form and submit.
3. Confirm:
   - The button shows a "Sending…" loading state.
   - On success, the form is replaced with the "Thank you!" confirmation.
   - The configured `ADMIN_EMAIL` inbox receives a **New Project Enquiry**
     email with all submitted fields and a **Reply to Client** link.
   - Submitting with required fields empty shows inline validation errors
     and does not call the API.
   - Temporarily using an invalid `RESEND_API_KEY` shows the inline error
     message and does not crash the page.

## 6. Building for production

```bash
npm run build
```

Output is written to `dist/`. Preview it locally with:

```bash
npm run preview
```

## 7. Deploying the application

**Vercel (recommended — zero config for the `api/` function):**

1. Push this repository to GitHub.
2. Import it in [Vercel](https://vercel.com/new).
3. Add the three environment variables from step 3 in the Vercel project
   settings (Production and Preview).
4. Deploy. Vercel automatically builds the Vite app and deploys
   `api/send-enquiry.js` as a serverless function at `/api/send-enquiry`.

**Other platforms:** any host that supports a Node.js serverless/edge
function alongside a static Vite build (Netlify Functions, Cloudflare
Pages Functions, AWS Lambda behind API Gateway) will work — copy the logic
in `api/send-enquiry.js` into that platform's function signature and keep
the same environment variables.

## Design notes

- Palette, type (Space Grotesk / Inter / JetBrains Mono) and the animated
  "system map" hero graphic are defined to represent AK Mindstack's actual
  work — connecting separate business systems (web, mobile, commerce,
  WhatsApp, APIs) into one product — rather than a generic template look.
- Dark/light section rhythm (`Section` component's `tone` prop) is used
  instead of a single flat background for visual pacing down the page.
- All interactive elements have visible focus states and the page respects
  `prefers-reduced-motion`.
