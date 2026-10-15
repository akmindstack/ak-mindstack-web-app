import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const STEP_DURATION = 5000

const steps = [
  {
    id: 1,
    tag: '01',
    title: 'Customer Says Hi',
    description: 'Customer messages your WhatsApp Business number. The system instantly replies with your product catalog — no human needed.',
    messages: [
      { from: 'customer', text: 'Hi, I want to order something' },
      {
        from: 'bot',
        text: 'Welcome to *FreshBite* 🛍️\n\nHere\'s our menu:\n\n1️⃣  Chicken Biryani — ₹180\n2️⃣  Veg Burger — ₹120\n3️⃣  Paneer Pizza — ₹250\n4️⃣  Hakka Noodles — ₹150\n\nReply with the item number to order.',
      },
    ],
  },
  {
    id: 2,
    tag: '02',
    title: 'Browse Catalog & Select Item',
    description: 'Customer picks items directly by replying with the number. The bot handles the entire catalog navigation automatically.',
    messages: [
      { from: 'customer', text: '1' },
      { from: 'bot', text: 'You selected *Chicken Biryani — ₹180* 🍛\n\nHow many would you like?' },
      { from: 'customer', text: '2' },
      { from: 'bot', text: '✅ Added 2 × Chicken Biryani\n\nType *more* to add items\nOr *done* to go to checkout.' },
    ],
  },
  {
    id: 3,
    tag: '03',
    title: 'Order Summary',
    description: 'The system shows a clear order summary so the customer can review everything before confirming.',
    messages: [
      { from: 'customer', text: 'done' },
      {
        from: 'bot',
        text: '🛒 *Your Order Summary*\n\n• Chicken Biryani × 2 — ₹360\n─────────────────\n*Total: ₹360*\n\nType *confirm* to proceed to checkout.',
      },
    ],
  },
  {
    id: 4,
    tag: '04',
    title: 'Collect Delivery Address',
    description: 'The system asks for the delivery address. Customer simply types it in — no app download, no form to fill.',
    messages: [
      { from: 'customer', text: 'confirm' },
      { from: 'bot', text: '📍 Please share your *delivery address* to continue.' },
      { from: 'customer', text: '42, MG Road, Koramangala\nBangalore — 560 034' },
    ],
  },
  {
    id: 5,
    tag: '05',
    title: 'Booking Confirmed',
    description: 'Order is instantly logged in the admin panel. A confirmation with all order details goes to the customer.',
    messages: [
      {
        from: 'bot',
        text: '✅ *Order #1042 Confirmed!*\n\nChicken Biryani × 2\nDelivery: MG Road, Bangalore\n\nGenerating your payment link...',
      },
    ],
  },
  {
    id: 6,
    tag: '06',
    title: 'UPI Payment Link Sent',
    description: 'A secure payment link is sent directly in the chat — works with PhonePe, GPay, Paytm, or any UPI app.',
    messages: [
      {
        from: 'bot',
        text: '💳 *Complete your payment to place the order*\n\nAmount: *₹360*\n\n👉 https://pay.freshbite.in/1042\n\nPhonePe · GPay · Paytm · BHIM · All UPI apps',
      },
    ],
  },
  {
    id: 7,
    tag: '07',
    title: 'Order Placed — Success!',
    description: 'Payment confirmed, order placed. The customer gets an instant success message and the business owner sees it in the admin panel.',
    messages: [
      {
        from: 'bot',
        text: '🎉 *Payment Received! Order Placed!*\n\nOrder #1042 confirmed.\n📦 Estimated delivery: 45–60 mins\n\nWe\'ll notify you when your order is on the way. Thank you! 🙏',
      },
    ],
  },
]

function parseText(raw) {
  return raw.split('\n').map((line, li, arr) => {
    const parts = line.split(/\*([^*]+)\*/g)
    return (
      <span key={li}>
        {parts.map((p, pi) =>
          pi % 2 === 1 ? <strong key={pi}>{p}</strong> : p,
        )}
        {li < arr.length - 1 && <br />}
      </span>
    )
  })
}

function ChatBubble({ from, text, delay = 0 }) {
  const isBot = from === 'bot'
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, delay }}
      className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-2`}
    >
      <div
        className={`max-w-[88%] rounded-xl px-3 py-2 text-[11px] leading-relaxed shadow-sm ${
          isBot
            ? 'rounded-tl-sm bg-[#202C33] text-[#E9EDEF]'
            : 'rounded-tr-sm bg-[#005C4B] text-[#E9EDEF]'
        }`}
      >
        {parseText(text)}
        <span className="ml-2 text-[9px] opacity-40">
          {isBot ? '10:32' : '10:31'}
        </span>
      </div>
    </motion.div>
  )
}

function PhoneMockup({ messages, stepKey }) {
  const scrollRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [stepKey])

  return (
    <div className="relative w-[270px] shrink-0 overflow-hidden rounded-[38px] border-[7px] border-[#1C2632] bg-[#0D1418] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)]">
      {/* phone notch */}
      <div className="flex h-6 items-center justify-center bg-[#0D1418]">
        <div className="h-3.5 w-14 rounded-full bg-[#1C2632]" />
      </div>

      {/* whatsapp header */}
      <div className="flex items-center gap-2.5 bg-[#1F2C34] px-3 py-2">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#25D366] font-bold text-sm text-white">
          FB
        </div>
        <div>
          <p className="text-[13px] font-semibold text-white">FreshBite</p>
          <p className="text-[10px] text-[#8696A0]">WhatsApp Business · online</p>
        </div>
        <div className="ml-auto flex gap-3 text-[#8696A0]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79a15.91 15.91 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.11-.27c1.21.49 2.53.76 3.88.76a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C9.61 21 3 14.39 3 6a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.36.27 2.68.76 3.88a1 1 0 0 1-.27 1.1l-2.37 2.04z" /></svg>
        </div>
      </div>

      {/* chat background + messages */}
      <div
        ref={scrollRef}
        className="h-[400px] overflow-y-auto bg-[#0D1418] px-3 py-3"
        style={{
          backgroundImage: 'radial-gradient(#1A2530 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={stepKey}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {messages.map((msg, i) => (
              <ChatBubble key={i} {...msg} delay={i * 0.18} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* input bar */}
      <div className="flex items-center gap-2 bg-[#1F2C34] px-3 py-2">
        <div className="flex-1 rounded-full bg-[#2A3942] px-3 py-1.5 text-[10px] text-[#8696A0]">
          Type a message…
        </div>
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

export default function WhatsAppFlow() {
  const [active, setActive] = useState(0)
  const [progress, setProgress] = useState(0)
  const intervalRef = useRef(null)
  const progressRef = useRef(null)

  const startTimer = (fromStep) => {
    clearInterval(intervalRef.current)
    clearInterval(progressRef.current)
    setProgress(0)

    const start = Date.now()
    progressRef.current = setInterval(() => {
      const elapsed = Date.now() - start
      setProgress(Math.min((elapsed / STEP_DURATION) * 100, 100))
    }, 40)

    intervalRef.current = setTimeout(() => {
      setActive((a) => (a + 1) % steps.length)
    }, STEP_DURATION)
  }

  useEffect(() => {
    startTimer(active)
    return () => {
      clearTimeout(intervalRef.current)
      clearInterval(progressRef.current)
    }
  }, [active])

  const goTo = (i) => {
    clearTimeout(intervalRef.current)
    clearInterval(progressRef.current)
    setActive(i)
  }

  const step = steps[active]

  return (
    <section id="whatsapp-flow" className="relative bg-ink bg-dot-grid-dark">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mb-14 max-w-2xl"
        >
          <p className="eyebrow mb-3 text-signal-light">WhatsApp Business</p>
          <h2 className="text-3xl font-semibold leading-tight text-paper md:text-4xl">
            From first message to delivered order — fully automated.
          </h2>
          <p className="mt-4 text-base text-paper/60 md:text-lg">
            See exactly how your customers place orders, pay, and get confirmed — all inside WhatsApp. No app download, no website needed.
          </p>
        </motion.div>

        {/* main layout */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-14">
          {/* step list */}
          <div className="flex-1 space-y-1.5">
            {steps.map((s, i) => (
              <button
                key={s.id}
                onClick={() => goTo(i)}
                className={`w-full rounded-xl px-4 py-3.5 text-left transition-all duration-200 ${
                  i === active
                    ? 'border border-signal/30 bg-ink-soft'
                    : 'border border-transparent hover:border-ink-line hover:bg-ink-soft/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`mt-0.5 font-mono text-[11px] font-medium ${
                      i === active ? 'text-signal' : 'text-paper/30'
                    }`}
                  >
                    {s.tag}
                  </span>
                  <div className="flex-1">
                    <p
                      className={`text-sm font-semibold leading-snug ${
                        i === active ? 'text-paper' : 'text-paper/50'
                      }`}
                    >
                      {s.title}
                    </p>
                    <AnimatePresence>
                      {i === active && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="mt-1 text-xs leading-relaxed text-paper/55"
                        >
                          {s.description}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                  {i === active && (
                    <div className="mt-1 h-1.5 w-16 shrink-0 overflow-hidden rounded-full bg-ink-line">
                      <motion.div
                        className="h-full rounded-full bg-signal"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* phone mockup */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <PhoneMockup messages={step.messages} stepKey={active} />
          </motion.div>
        </div>

        {/* step dots — mobile/tablet quick nav */}
        <div className="mt-8 flex justify-center gap-2 lg:hidden">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? 'w-6 bg-signal' : 'w-1.5 bg-paper/20'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
