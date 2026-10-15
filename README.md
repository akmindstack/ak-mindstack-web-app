# AK Mindstack — Official Website

**Smart Thinking. Strong Tech.**

The official marketing and enquiry website for **AK Mindstack**, a custom software development studio based in India. Built as a single-page React app that explains all services, showcases live client projects, demonstrates how WhatsApp Business ordering works, and lets potential clients submit a project enquiry.

**Live:** https://akmindstack.web.app
**GitHub:** https://github.com/akmindstack/ak-mindstack-web-app

---

## About AK Mindstack

AK Mindstack designs and builds custom digital products for businesses — from customer-facing web and mobile applications to internal tools that run day-to-day operations. Every build is custom, includes an admin panel, and is built to scale.

**Contact**
- Email: akmindstack@gmail.com
- Phone / WhatsApp: +91 78457 47514
- WhatsApp link: https://wa.me/917845747514

---

## What this site communicates

| Section | Purpose |
|---|---|
| Hero | Studio intro + animated radial system diagram |
| Stats bar | 2+ live projects · 100% custom · Full payment integration · Admin panel on every build |
| About | Capabilities overview |
| Services | 6 services with full feature breakdowns |
| WhatsApp Flow | Live animated demo — full order journey inside WhatsApp |
| Solutions | 4 complete systems ready to build |
| How We Work | 6-step process from discuss to launch |
| Why AK Mindstack | 8 differentiators |
| Live Projects | 2 live client projects in production |
| Project Enquiry | Detailed contact form sent via EmailJS |
| Contact CTA | Email + WhatsApp direct links |

---

## Services

### 01 — Web Application Development
Custom web applications built around your business — not templates.
- Custom business logic · Admin dashboard · User & role management
- Reports & analytics · API integrations · Scalable architecture

### 02 — Mobile App Development
Android and iOS apps for businesses and their customers.
- Android & iOS · Custom UI/UX · Push notifications
- Offline support · Backend integration · App Store deployment

### 03 — E-Commerce Development *(Payment Integrated)*
Complete online store — products, categories, payments, orders, admin panel.
- Product & category management · Payment gateway · Cart & checkout
- Order management · Customer management · Admin dashboard & reports

### 04 — WhatsApp Business Integration *(Payment Ready)*
Automate communication, collect payments, run campaigns — all on WhatsApp.
- Automated messages · Payment collection · Order notifications
- Campaign broadcasts · Message templates · Customer workflows

### 05 — School & Business Administration
Management systems for schools, companies, and institutions.
- Attendance management · Staff & student records · Role-based access control
- Reports & dashboards · Parent / employee notifications · Mobile app support

### 06 — API & Third-Party Integrations
Connecting payment gateways, WhatsApp, email, CRM, ERP, and cloud services.
- Payment gateway setup · WhatsApp API · Email services
- CRM & ERP systems · Cloud storage · Custom API development

---

## Solutions (complete systems)

### E-Commerce Platform *(Payment Integrated)*
A complete online store from storefront to admin panel.
Product & category management · Online payment gateway · Cart & checkout · Order management · Customer management · Admin dashboard · Reports & analytics · Inventory tracking

### WhatsApp Business Integration *(Payment Ready)*
Automate communication, collect payments, manage customers — all through WhatsApp.
WhatsApp API integration · Payment collection · Automated order messages · Campaign broadcasts · Customer communication · Message templates · Workflow automation · Admin control panel

### School & Institution Management
Full management system for schools — attendance, staff, students, parents, operations.
Student & teacher management · Attendance tracking · Class management · Parent notifications · Role-based admin access · Reports & dashboard · Fee & billing management · Mobile app support

### Company Administration System
Custom internal software to manage employees, operations, and workflows.
Employee management · Attendance & leave tracking · Task & workflow management · Role-based access control · Reports & dashboards · Notification system · Document management · Mobile app support

---

## WhatsApp Business Flow Demo

The site includes an animated 7-step WhatsApp order flow demo showing how a customer goes from first message to a delivered order — all inside WhatsApp without downloading any app.

| Step | What happens |
|---|---|
| 01 | Customer says Hi → bot replies with product catalog |
| 02 | Customer browses catalog, selects item and quantity |
| 03 | Bot shows order summary for review |
| 04 | Customer types delivery address |
| 05 | Order confirmed and logged in admin panel |
| 06 | UPI payment link sent (PhonePe / GPay / Paytm / BHIM) |
| 07 | Payment received → order placed → success message sent |

---

## Live Client Projects

### GenzToys — https://www.genztoys.in/
*E-Commerce Platform · Live in production*
Admin panel · Product management · Category management · Order management · Payment integration · Cart & checkout · Customer management · Dashboard & reports

### Hifa Fragrance — https://hifa-fragrance.com/
*E-Commerce Platform · Live in production*
Admin panel · Product management · Category management · Order management · Payment integration · Cart & checkout · Customer management · Dashboard & reports

---

## Development Process

| Step | Title | Description |
|---|---|---|
| 01 | Discuss | Understand the business requirements and idea |
| 02 | Plan | Define features, architecture, timeline, and technology |
| 03 | Design | Create a clean and user-friendly UI/UX |
| 04 | Develop | Build the web/mobile application with scalable architecture |
| 05 | Test | Perform testing, bug fixing, and quality checks |
| 06 | Launch | Deploy the product and provide ongoing support |

---

## Why AK Mindstack

- Custom-built solutions, not templates
- Modern technology, chosen for the problem
- Scalable architecture from day one
- Clean, functional UI/UX
- Business-focused development
- API & third-party integrations
- Web & mobile development under one roof
- Post-launch support

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS v3 with custom design tokens |
| Animations | Framer Motion |
| Contact form | EmailJS (@emailjs/browser) |
| Hosting | Firebase Hosting |
| Repo | GitHub — akmindstack/ak-mindstack-web-app |

### Design tokens (tailwind.config.js)
- **ink** `#12161C` — dark background
- **paper** `#F3F4F0` — light background
- **signal** `#00B8A9` — teal accent
- **volt** `#FFC53D` — yellow accent
- **Fonts:** Space Grotesk (headings) · Inter (body) · JetBrains Mono (mono/labels)

---

## Project Structure

```
src/
  components/
    layout/       Navbar, Footer
    sections/     Hero, Stats, About, Services, WhatsAppFlow,
                  Solutions, Process, WhyUs, Clients,
                  ContactForm, Contact
    ui/           Button, Card, Input, Textarea, Select,
                  CheckboxGroup, Modal, Badge, Section
    visuals/      SystemMap — animated radial hero diagram
  data/
    content.js    All site copy: services, solutions, clients,
                  process steps, stats, form options
  lib/
    validate.js   Contact form validation
```

---

## Environment Variables

```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

---

## Local Development

```bash
npm install
npm run dev        # http://localhost:5173
```

## Build & Deploy

```bash
npm run build
firebase deploy --only hosting
```

Firebase project ID: `akmindstack`
Deployed URL: https://akmindstack.web.app
