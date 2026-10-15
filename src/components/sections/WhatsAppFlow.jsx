import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const STEP_DURATION = 5500

// ── Product catalog data ────────────────────────────────────────────────────
const products = [
  { id: 1, emoji: '🍛', name: 'Chicken Biryani', price: '₹180', tag: 'Bestseller', g: ['#f97316', '#ef4444'] },
  { id: 2, emoji: '🍔', name: 'Veg Burger',      price: '₹120', tag: null,         g: ['#22c55e', '#16a34a'] },
  { id: 3, emoji: '🍕', name: 'Paneer Pizza',    price: '₹250', tag: 'Popular',    g: ['#ef4444', '#b91c1c'] },
  { id: 4, emoji: '🍜', name: 'Hakka Noodles',   price: '₹150', tag: null,         g: ['#eab308', '#f97316'] },
  { id: 5, emoji: '🥞', name: 'Masala Dosa',     price: '₹90',  tag: null,         g: ['#a16207', '#92400e'] },
  { id: 6, emoji: '☕', name: 'Cold Coffee',     price: '₹80',  tag: 'New',        g: ['#7c3aed', '#6d28d9'] },
]

// ── Steps data ──────────────────────────────────────────────────────────────
const steps = [
  {
    id: 1, tag: '01',
    title: 'Customer Says Hi',
    description: 'Customer messages your WhatsApp Business number. The bot instantly replies with your full product catalog — no human needed.',
    messages: [
      { from: 'customer', text: 'Hi, I want to order something' },
      { from: 'bot', text: 'Welcome to *FreshBite* 🛍️\nHere\'s our catalog — reply with item number to order:' },
      { from: 'bot', type: 'catalog' },
    ],
  },
  {
    id: 2, tag: '02',
    title: 'Browse Catalog & Select Item',
    description: 'Customer picks items directly by replying with the item number. The bot handles catalog navigation automatically.',
    messages: [
      { from: 'customer', text: '1' },
      { from: 'bot', text: 'You selected *Chicken Biryani — ₹180* 🍛\n\nHow many would you like?' },
      { from: 'customer', text: '2' },
      { from: 'bot', text: '✅ Added 2 × Chicken Biryani\n\nType *more* to add items\nOr *done* to go to checkout.' },
    ],
  },
  {
    id: 3, tag: '03',
    title: 'Order Summary',
    description: 'The bot shows a clear cart summary so the customer can review everything before confirming.',
    messages: [
      { from: 'customer', text: 'done' },
      { from: 'bot', text: '🛒 *Your Order Summary*\n\n• Chicken Biryani × 2 — ₹360\n─────────────────\n*Total: ₹360*\n\nType *confirm* to proceed to checkout.' },
    ],
  },
  {
    id: 4, tag: '04',
    title: 'Collect Delivery Address',
    description: 'The bot asks for the delivery address. Customer just types it in — no app download, no form filling.',
    messages: [
      { from: 'customer', text: 'confirm' },
      { from: 'bot', text: '📍 Please share your *delivery address* to continue.' },
      { from: 'customer', text: '42, MG Road, Koramangala\nBangalore — 560 034' },
    ],
  },
  {
    id: 5, tag: '05',
    title: 'Booking Confirmed',
    description: 'Order is instantly logged in the admin panel. A confirmation with full order details goes to the customer.',
    messages: [
      { from: 'bot', text: '✅ *Order #1042 Confirmed!*\n\nChicken Biryani × 2\nDelivery: MG Road, Bangalore\n\nGenerating your payment link...' },
    ],
  },
  {
    id: 6, tag: '06',
    title: 'UPI Payment Link Sent',
    description: 'A secure payment card is sent in the chat — one tap pays with PhonePe, GPay, Paytm, or any UPI app.',
    messages: [
      { from: 'bot', text: '💳 Complete your payment to confirm the order:' },
      { from: 'bot', type: 'payment', amount: '₹360', orderId: '#1042' },
    ],
  },
  {
    id: 7, tag: '07',
    title: 'Order Placed — Success!',
    description: 'Payment confirmed instantly. Customer gets a success card with delivery tracking. Business owner sees the order in the admin panel.',
    messages: [
      { from: 'bot', type: 'success', orderId: '#1042', time: '45–60 mins' },
      { from: 'bot', text: 'We\'ll send live updates as your order is prepared. Thank you! 🙏' },
    ],
  },
]

// ── Helpers ─────────────────────────────────────────────────────────────────
function parseText(raw) {
  if (!raw) return null
  return raw.split('\n').map((line, li, arr) => {
    const parts = line.split(/\*([^*]+)\*/g)
    return (
      <span key={li}>
        {parts.map((p, pi) => (pi % 2 === 1 ? <strong key={pi}>{p}</strong> : p))}
        {li < arr.length - 1 && <br />}
      </span>
    )
  })
}

// ── Chat message types ───────────────────────────────────────────────────────
function TextBubble({ from, text, delay = 0 }) {
  const isBot = from === 'bot'
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, delay }}
      className={`mb-2 flex ${isBot ? 'justify-start' : 'justify-end'}`}
    >
      <div className={`max-w-[88%] rounded-xl px-3 py-2 text-[11px] leading-relaxed shadow-sm ${
        isBot ? 'rounded-tl-sm bg-[#202C33] text-[#E9EDEF]' : 'rounded-tr-sm bg-[#005C4B] text-[#E9EDEF]'
      }`}>
        {parseText(text)}
        <span className="ml-2 text-[9px] opacity-40">{isBot ? '10:32' : '10:31'}</span>
      </div>
    </motion.div>
  )
}

function CatalogCards({ delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, delay }}
      className="mb-2 flex justify-start"
    >
      <div className="w-[94%] overflow-hidden rounded-xl rounded-tl-sm bg-[#202C33] p-2">
        <p className="mb-2 text-[9px] font-semibold text-[#8696A0] uppercase tracking-wide">📋 Our Catalog</p>
        <div className="grid grid-cols-3 gap-1.5">
          {products.map((p) => (
            <div key={p.id} className="overflow-hidden rounded-lg">
              <div
                className="relative flex h-[46px] items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${p.g[0]}, ${p.g[1]})` }}
              >
                <span className="text-[22px] leading-none">{p.emoji}</span>
                {p.tag && (
                  <span className="absolute right-0.5 top-0.5 rounded bg-black/50 px-1 text-[6.5px] font-bold text-white">
                    {p.tag}
                  </span>
                )}
              </div>
              <div className="bg-[#1A2530] px-1.5 py-1">
                <p className="truncate text-[7.5px] leading-tight text-[#E9EDEF]">{p.name}</p>
                <p className="mt-0.5 font-mono text-[8px] font-bold text-[#25D366]">{p.price}</p>
              </div>
            </div>
          ))}
        </div>
        <span className="mt-1.5 block text-right text-[9px] text-[#8696A0]">10:32</span>
      </div>
    </motion.div>
  )
}

function PaymentCard({ amount, orderId, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
      className="mb-2 flex justify-start"
    >
      <div className="w-[88%] overflow-hidden rounded-xl">
        <div className="flex items-center gap-2.5 bg-[#0D3329] px-3 py-2.5">
          <span className="text-xl">💳</span>
          <div className="flex-1">
            <p className="text-[11px] font-semibold text-[#25D366]">Payment Request</p>
            <p className="text-[9px] text-[#8696A0]">Order {orderId}</p>
          </div>
          <p className="text-base font-bold text-white">{amount}</p>
        </div>
        <div className="bg-[#202C33] px-3 py-2.5">
          <p className="mb-2 text-[9.5px] text-[#8696A0]">Pay securely with any UPI app</p>
          <div className="mb-2.5 flex flex-wrap gap-1.5">
            {['PhonePe', 'GPay', 'Paytm', 'BHIM'].map((app) => (
              <span key={app} className="rounded-md bg-[#2A3942] px-2 py-0.5 text-[9px] text-[#E9EDEF]">
                {app}
              </span>
            ))}
          </div>
          <div className="rounded-lg bg-[#25D366] py-2 text-center text-[10.5px] font-bold text-[#0D1418]">
            Tap to Pay {amount}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function SuccessCard({ orderId, time, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay, ease: [0.34, 1.56, 0.64, 1] }}
      className="mb-2 flex justify-start"
    >
      <div className="w-[88%] overflow-hidden rounded-xl bg-[#202C33]">
        <div className="flex flex-col items-center bg-[#0D3329] px-3 py-3 text-center">
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: delay + 0.2, type: 'spring', stiffness: 300 }}
            className="text-3xl"
          >
            🎉
          </motion.span>
          <p className="mt-1 text-[12px] font-bold text-[#25D366]">Order Placed!</p>
          <p className="text-[10px] text-[#E9EDEF]">{orderId} confirmed &amp; paid</p>
        </div>
        <div className="px-3 py-2.5">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[10px] text-[#8696A0]">Estimated delivery</span>
            <span className="text-[10px] font-semibold text-[#E9EDEF]">{time}</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-[#2A3942]">
            <motion.div
              className="h-full rounded-full bg-[#25D366]"
              initial={{ width: '0%' }}
              animate={{ width: '35%' }}
              transition={{ duration: 1.2, delay: delay + 0.4 }}
            />
          </div>
          <div className="mt-1 flex justify-between text-[8px]">
            <span className="text-[#25D366]">● Confirmed</span>
            <span className="text-[#8696A0]">Preparing</span>
            <span className="text-[#8696A0]">On the way</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function ChatMessage({ from, text, type, amount, orderId, time, delay = 0 }) {
  if (type === 'catalog') return <CatalogCards delay={delay} />
  if (type === 'payment') return <PaymentCard amount={amount} orderId={orderId} delay={delay} />
  if (type === 'success') return <SuccessCard orderId={orderId} time={time} delay={delay} />
  return <TextBubble from={from} text={text} delay={delay} />
}

// ── Phone mockup ─────────────────────────────────────────────────────────────
function PhoneMockup({ messages, stepKey }) {
  const scrollRef = useRef(null)
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [stepKey])

  return (
    <div className="relative w-[272px] shrink-0 overflow-hidden rounded-[38px] border-[7px] border-[#1C2632] bg-[#0D1418] shadow-[0_32px_72px_-12px_rgba(0,0,0,0.7)]">
      {/* notch */}
      <div className="flex h-6 items-center justify-center bg-[#0D1418]">
        <div className="h-3.5 w-14 rounded-full bg-[#1C2632]" />
      </div>
      {/* header */}
      <div className="flex items-center gap-2.5 bg-[#1F2C34] px-3 py-2">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-sm font-bold text-white">
          FB
        </div>
        <div>
          <p className="text-[13px] font-semibold text-white">FreshBite</p>
          <p className="text-[10px] text-[#8696A0]">WhatsApp Business · online</p>
        </div>
        <div className="ml-auto text-[#8696A0]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6.62 10.79a15.91 15.91 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.11-.27c1.21.49 2.53.76 3.88.76a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C9.61 21 3 14.39 3 6a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.36.27 2.68.76 3.88a1 1 0 0 1-.27 1.1l-2.37 2.04z" />
          </svg>
        </div>
      </div>
      {/* messages */}
      <div
        ref={scrollRef}
        className="h-[400px] overflow-y-auto bg-[#0D1418] px-3 py-3"
        style={{ backgroundImage: 'radial-gradient(#1A2530 1px, transparent 1px)', backgroundSize: '20px 20px', scrollbarWidth: 'none' }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={stepKey}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {messages.map((msg, i) => (
              <ChatMessage key={i} {...msg} delay={i * 0.2} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
      {/* input */}
      <div className="flex items-center gap-2 bg-[#1F2C34] px-3 py-2">
        <div className="flex-1 rounded-full bg-[#2A3942] px-3 py-1.5 text-[10px] text-[#8696A0]">Type a message…</div>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M2 21l21-9L2 3v7l15 2-15 2v7z" /></svg>
        </div>
      </div>
      {/* home bar */}
      <div className="flex h-5 items-center justify-center bg-[#0D1418]">
        <div className="h-1 w-20 rounded-full bg-[#2A3942]" />
      </div>
    </div>
  )
}

// ── Main section ─────────────────────────────────────────────────────────────
export default function WhatsAppFlow() {
  const [active, setActive] = useState(0)
  const [progress, setProgress] = useState(0)
  const timerRef = useRef(null)
  const progressRef = useRef(null)

  useEffect(() => {
    clearTimeout(timerRef.current)
    clearInterval(progressRef.current)
    setProgress(0)
    const start = Date.now()
    progressRef.current = setInterval(() => {
      setProgress(Math.min(((Date.now() - start) / STEP_DURATION) * 100, 100))
    }, 40)
    timerRef.current = setTimeout(() => setActive((a) => (a + 1) % steps.length), STEP_DURATION)
    return () => { clearTimeout(timerRef.current); clearInterval(progressRef.current) }
  }, [active])

  const goTo = (i) => {
    clearTimeout(timerRef.current); clearInterval(progressRef.current); setActive(i)
  }

  return (
    <section id="whatsapp-flow" className="relative bg-ink bg-dot-grid-dark">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mb-12 max-w-2xl"
        >
          <p className="eyebrow mb-3 text-signal-light">WhatsApp Business</p>
          <h2 className="text-3xl font-semibold leading-tight text-paper md:text-4xl">
            From first message to delivered order — fully automated.
          </h2>
          <p className="mt-4 text-base text-paper/60 md:text-lg">
            Customers browse your catalog, place orders, and pay — all inside WhatsApp. No app download, no website needed.
          </p>
        </motion.div>

        {/* ── Phone + step label ── */}
        <div className="flex flex-col items-center gap-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <PhoneMockup messages={steps[active].messages} stepKey={active} />
          </motion.div>

          {/* step label */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="text-center"
            >
              <span className="font-mono text-[11px] text-signal">{steps[active].tag}</span>
              <p className="mt-1 text-sm font-semibold text-paper">{steps[active].title}</p>
              <p className="mt-1 max-w-sm text-xs text-paper/50">{steps[active].description}</p>
            </motion.div>
          </AnimatePresence>

          {/* progress + dot nav */}
          <div className="flex items-center gap-3">
            {steps.map((_, i) => (
              <button key={i} onClick={() => goTo(i)} className="flex flex-col items-center gap-1">
                <div className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? 'w-8 bg-signal' : 'w-1.5 bg-paper/20'}`} />
                {i === active && (
                  <div className="h-0.5 w-8 overflow-hidden rounded-full bg-ink-line">
                    <motion.div className="h-full rounded-full bg-signal" style={{ width: `${progress}%` }} />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
