import { useState, useRef, useEffect } from 'react'
import './ChatWidget.css'

/* ─── Types ─────────────────────────────────────────────── */
interface Message {
  id: number
  text: string
  from: 'user' | 'bot'
  time: string
}

interface QuickReply {
  label: string
  icon: string
  needsForm: boolean
  response: string
}

interface FormData {
  name: string
  email: string
  address: string
  contact: string
  sector: string
}

/* ─── Constants ─────────────────────────────────────────── */
const SECTORS = [
  'Technology',
  'Healthcare',
  'Finance & Banking',
  'Education',
  'Retail & E-commerce',
  'Manufacturing',
  'Agriculture',
  'Government',
  'Media & Entertainment',
  'Other',
]

const QUICK_REPLIES: QuickReply[] = [
  {
    label: 'Contact Sales Team',
    icon: '💼',
    needsForm: true,
    response: "Great! Please fill in your details below and our sales team will reach out to you within 24 hours.",
  },
  {
    label: 'Request a Demo',
    icon: '🎯',
    needsForm: true,
    response: "Awesome! Fill in your details and we'll schedule a personalized demo session for you.",
  },
  {
    label: 'General Inquiry',
    icon: '💬',
    needsForm: false,
    response:
      "Happy to help! For general questions you can browse our services at ekbana.com/services, or drop us a message at hello@ekbana.com and our team will get back to you shortly.",
  },
]

const EMPTY_FORM: FormData = { name: '', email: '', address: '', contact: '', sector: '' }

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 1,
    text: "Hi there! 👋 Welcome to EKbana. How can we help you today?",
    from: 'bot',
    time: formatTime(new Date()),
  },
]

/* ─── Component ─────────────────────────────────────────── */
export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [quickRepliesVisible, setQuickRepliesVisible] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM)
  const [formErrors, setFormErrors] = useState<Partial<FormData>>({})
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) {
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50)
    }
  }, [messages, open, showForm])

  /* helpers */
  const addBotMessage = (text: string, delay = 1200) => {
    setIsTyping(true)
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { id: Date.now(), text, from: 'bot', time: formatTime(new Date()) },
      ])
      setIsTyping(false)
    }, delay)
  }

  const handleQuickReply = (qr: QuickReply) => {
    const userMsg: Message = {
      id: Date.now(),
      text: qr.label,
      from: 'user',
      time: formatTime(new Date()),
    }
    setMessages(prev => [...prev, userMsg])
    setQuickRepliesVisible(false)

    if (qr.needsForm) {
      setIsTyping(true)
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { id: Date.now(), text: qr.response, from: 'bot', time: formatTime(new Date()) },
        ])
        setIsTyping(false)
        setShowForm(true)
      }, 1000)
    } else {
      addBotMessage(qr.response)
    }
  }

  /* form validation */
  const validate = (): boolean => {
    const errs: Partial<FormData> = {}
    if (!formData.name.trim()) errs.name = 'Name is required'
    if (!formData.email.trim()) errs.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'Invalid email'
    if (!formData.address.trim()) errs.address = 'Address is required'
    if (!formData.contact.trim()) errs.contact = 'Contact is required'
    else if (!/^\+?[\d\s\-()]{7,}$/.test(formData.contact)) errs.contact = 'Invalid number'
    if (!formData.sector) errs.sector = 'Please select a sector'
    setFormErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setShowForm(false)
    addBotMessage(
      `✅ Thank you, ${formData.name}! We've received your request and will contact you at ${formData.email} shortly. Our team typically responds within 24 hours.`,
      1000,
    )
    setFormData(EMPTY_FORM)
  }

  const handleFieldChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (formErrors[field]) setFormErrors(prev => ({ ...prev, [field]: '' }))
  }

  /* free-text send */
  const sendMessage = () => {
    const text = input.trim()
    if (!text) return
    setMessages(prev => [
      ...prev,
      { id: Date.now(), text, from: 'user', time: formatTime(new Date()) },
    ])
    setInput('')
    setQuickRepliesVisible(false)
    addBotMessage(
      "Thanks for reaching out! Our team will get back to you shortly. Feel free to explore our services at ekbana.com.",
    )
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage()
  }

  /* ─── Render ─────────────────────────────────────────── */
  return (
    <>
      {/* Chat Panel */}
      <div className={`chat-panel ${open ? 'chat-panel--open' : ''}`}>

        {/* Header */}
        <div className="chat-header">
          <div className="chat-header__info">
            <div className="chat-header__avatar">
              <span>E</span>
              <span className="chat-header__status" />
            </div>
            <div>
              <p className="chat-header__name">EKbana Support</p>
              <p className="chat-header__sub">Typically replies in minutes</p>
            </div>
          </div>
          <button className="chat-close-btn" onClick={() => setOpen(false)} aria-label="Close chat">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="chat-messages">
          {messages.map(msg => (
            <div key={msg.id} className={`chat-bubble-wrap chat-bubble-wrap--${msg.from}`}>
              {msg.from === 'bot' && <div className="chat-bot-avatar">E</div>}
              <div className={`chat-bubble chat-bubble--${msg.from}`}>
                <p>{msg.text}</p>
                <span className="chat-time">{msg.time}</span>
              </div>
            </div>
          ))}

          {/* Typing */}
          {isTyping && (
            <div className="chat-bubble-wrap chat-bubble-wrap--bot">
              <div className="chat-bot-avatar">E</div>
              <div className="chat-bubble chat-bubble--bot chat-typing">
                <span /><span /><span />
              </div>
            </div>
          )}

          {/* Quick Replies */}
          {quickRepliesVisible && !isTyping && (
            <div className="quick-replies">
              <p className="quick-replies__label">Choose a topic to get started:</p>
              <div className="quick-replies__chips">
                {QUICK_REPLIES.map(qr => (
                  <button key={qr.label} className="quick-reply-chip" onClick={() => handleQuickReply(qr)}>
                    <span className="quick-reply-chip__icon">{qr.icon}</span>
                    {qr.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Inline Contact Form */}
          {showForm && !isTyping && (
            <div className="chat-form-card">
              <p className="chat-form-card__title">Your Details</p>
              <form onSubmit={handleFormSubmit} noValidate>

                <div className="chat-form-group">
                  <label className="chat-form-label">Full Name</label>
                  <input
                    className={`chat-form-input ${formErrors.name ? 'chat-form-input--error' : ''}`}
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={e => handleFieldChange('name', e.target.value)}
                  />
                  {formErrors.name && <span className="chat-form-error">{formErrors.name}</span>}
                </div>

                <div className="chat-form-group">
                  <label className="chat-form-label">Email Address</label>
                  <input
                    className={`chat-form-input ${formErrors.email ? 'chat-form-input--error' : ''}`}
                    type="email"
                    placeholder="john@company.com"
                    value={formData.email}
                    onChange={e => handleFieldChange('email', e.target.value)}
                  />
                  {formErrors.email && <span className="chat-form-error">{formErrors.email}</span>}
                </div>

                <div className="chat-form-group">
                  <label className="chat-form-label">Address</label>
                  <input
                    className={`chat-form-input ${formErrors.address ? 'chat-form-input--error' : ''}`}
                    type="text"
                    placeholder="City, Country"
                    value={formData.address}
                    onChange={e => handleFieldChange('address', e.target.value)}
                  />
                  {formErrors.address && <span className="chat-form-error">{formErrors.address}</span>}
                </div>

                <div className="chat-form-group">
                  <label className="chat-form-label">Contact Number</label>
                  <input
                    className={`chat-form-input ${formErrors.contact ? 'chat-form-input--error' : ''}`}
                    type="tel"
                    placeholder="+977 98XXXXXXXX"
                    value={formData.contact}
                    onChange={e => handleFieldChange('contact', e.target.value)}
                  />
                  {formErrors.contact && <span className="chat-form-error">{formErrors.contact}</span>}
                </div>

                <div className="chat-form-group">
                  <label className="chat-form-label">Sector</label>
                  <select
                    className={`chat-form-select ${formErrors.sector ? 'chat-form-input--error' : ''}`}
                    value={formData.sector}
                    onChange={e => handleFieldChange('sector', e.target.value)}
                  >
                    <option value="">— Select your sector —</option>
                    {SECTORS.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  {formErrors.sector && <span className="chat-form-error">{formErrors.sector}</span>}
                </div>

                <button type="submit" className="chat-form-submit">
                  Submit Request
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </form>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input row */}
        <div className="chat-input-row">
          <input
            className="chat-input"
            type="text"
            placeholder={showForm ? 'Fill the form above…' : 'Type a message...'}
            value={input}
            disabled={showForm}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="chat-send-btn"
            onClick={sendMessage}
            disabled={!input.trim() || showForm}
            aria-label="Send message"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>

      {/* FAB */}
      <button
        className={`chat-fab ${open ? 'chat-fab--active' : ''}`}
        onClick={() => setOpen(prev => !prev)}
        aria-label="Open chat"
      >
        <span className={`chat-fab__icon chat-fab__icon--chat ${open ? 'chat-fab__icon--hidden' : ''}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </span>
        <span className={`chat-fab__icon chat-fab__icon--close ${!open ? 'chat-fab__icon--hidden' : ''}`}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </span>
        {!open && <span className="chat-fab__dot" />}
      </button>
    </>
  )
}
