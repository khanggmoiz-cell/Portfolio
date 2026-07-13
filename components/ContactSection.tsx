'use client'

import { useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, MapPin } from 'lucide-react'
import { WhatsAppIcon } from './WhatsAppIcon'

const services = [
  'Web Design',
  'Web Development',
  'E-commerce Website',
  'Landing Page',
  'UI/UX Design',
  'SEO',
  'Local SEO',
  'Google Business Profile (GMB) Optimization',
  'Google Maps Ranking',
  'Meta Ads Management',
  'Social Media Management',
  'Facebook Page Setup',
  'Instagram Business Setup',
  'Custom Service',
]

interface FormData {
  name: string
  email: string
  phone: string
  company: string
  service: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  phone?: string
  service?: string
  message?: string
}

function Toast({
  message,
  type,
  onClose,
}: {
  message: string
  type: 'success' | 'error'
  onClose: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, x: '-50%' }}
      animate={{ opacity: 1, y: 0, x: '-50%' }}
      exit={{ opacity: 0, y: 50, x: '-50%' }}
      className={`fixed bottom-8 left-1/2 z-[100] px-6 py-4 rounded-2xl backdrop-blur-xl border shadow-2xl ${
        type === 'success'
          ? 'bg-green-500/20 border-green-500/30 text-green-300'
          : 'bg-red-500/20 border-red-500/30 text-red-300'
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="text-lg">{type === 'success' ? '✓' : '✕'}</span>
        <span className="font-medium text-sm">{message}</span>
        <button
          onClick={onClose}
          className="ml-4 opacity-60 hover:opacity-100 transition-opacity"
          aria-label="Close"
        >
          ✕
        </button>
      </div>
    </motion.div>
  )
}

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState<{
    message: string
    type: 'success' | 'error'
  } | null>(null)

  const validate = (): FormErrors => {
    const e: FormErrors = {}
    if (!formData.name.trim()) e.name = 'Name is required'
    if (!formData.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      e.email = 'Invalid email'
    if (!formData.phone.trim()) e.phone = 'Phone is required'
    if (!formData.service) e.service = 'Select a service'
    if (!formData.message.trim()) e.message = 'Message is required'
    return e
  }

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length > 0) return

    setLoading(true)
    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (data.success) {
        setToast({
          message: 'Inquiry sent successfully! I will get back to you soon.',
          type: 'success',
        })
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service: '',
          message: '',
        })
      } else {
        setToast({
          message: data.error || 'Failed to send. Try again later.',
          type: 'error',
        })
      }
    } catch {
      setToast({
        message: 'Server not running. Try again later.',
        type: 'error',
      })
    }
    setLoading(false)
    setTimeout(() => setToast(null), 4000)
  }

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((p) => ({ ...p, [field]: value }))
    if (errors[field as keyof FormErrors])
      setErrors((p) => ({ ...p, [field]: undefined }))
  }

  const inputClass =
    'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 sm:py-4 text-white text-sm sm:text-base outline-none focus:border-[#B600A8]/50 focus:ring-2 focus:ring-[#B600A8]/20 transition-all duration-300 backdrop-blur-sm'

  const labelClass =
    'text-[#D7E2EA]/80 text-xs uppercase tracking-wider mb-2 block font-medium'
  const errorClass = 'text-red-400 text-xs mt-1 block'

  return (
    <section
      id="contact"
      className="relative bg-[#0C0C0C] py-16 sm:py-24 md:py-32 px-5 sm:px-8 md:px-10 overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-[40%] h-[40%] rounded-full bg-[#7621B0]/[0.04] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[35%] h-[35%] rounded-full bg-[#BE4C00]/[0.03] blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '50px' }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-16 sm:mb-20"
        >
          <h2 className="hero-heading font-black uppercase tracking-tight leading-none text-[10vw] sm:text-[8vw] md:text-[5vw] lg:text-[4rem]">
            Get in Touch
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '50px' }}
            transition={{
              duration: 0.7,
              delay: 0.1,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="flex flex-col gap-8"
          >
            <div>
              <h3 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
                Let&apos;s build something{' '}
                <span className="bg-gradient-to-r from-[#B600A8] to-[#BE4C00] bg-clip-text text-transparent">
                  incredible
                </span>{' '}
                together.
              </h3>
              <p className="text-[#D7E2EA]/70 mt-4 text-sm sm:text-base leading-relaxed max-w-md">
                Have a project in mind or need a full digital transformation
                for your business? I&apos;d love to hear from you. Let&apos;s
                discuss how we can bring your vision to life.
              </p>
            </div>

            <div className="flex flex-col gap-5">
              {[
                {
                  icon: <Mail size={20} />,
                  label: 'Email',
                  value: 'khanggmoiz@gmail.com',
                  href: 'mailto:khanggmoiz@gmail.com',
                  ariaLabel: 'Send email to khanggmoiz@gmail.com',
                },
                {
                  icon: <WhatsAppIcon size={20} />,
                  label: 'WhatsApp',
                  value: '+92 3213258386',
                  href: 'https://wa.me/923213258386',
                  ariaLabel: 'Chat on WhatsApp with +92 3213258386',
                },
                {
                  icon: <MapPin size={20} />,
                  label: 'Location',
                  value: 'Lahore, Punjab, Pakistan',
                  href: '#',
                  ariaLabel: 'Located in Lahore, Punjab, Pakistan',
                },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={
                    item.href.startsWith('http') ? '_blank' : undefined
                  }
                  rel={
                    item.href.startsWith('http')
                      ? 'noopener noreferrer'
                      : undefined
                  }
                  aria-label={item.ariaLabel}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-[#B600A8]/20 transition-all duration-300 group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7621B0]/20 to-[#BE4C00]/20 flex items-center justify-center text-[#D7E2EA] shrink-0 overflow-hidden group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <span className="text-[#D7E2EA]/60 text-xs uppercase tracking-wider block">
                      {item.label}
                    </span>
                    <span className="text-white text-sm sm:text-base font-medium">
                      {item.value}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '50px' }}
            transition={{
              duration: 0.7,
              delay: 0.2,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5 p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-xl"
              noValidate
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="contact-name" className={labelClass}>
                    Full Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className={inputClass}
                    aria-required="true"
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && (
                    <span className={errorClass} role="alert">
                      {errors.name}
                    </span>
                  )}
                </div>
                <div>
                  <label htmlFor="contact-email" className={labelClass}>
                    Email Address *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className={inputClass}
                    aria-required="true"
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <span className={errorClass} role="alert">
                      {errors.email}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="contact-phone" className={labelClass}>
                    Phone / WhatsApp *
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    placeholder="+92 300 0000000"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className={inputClass}
                    aria-required="true"
                    aria-invalid={!!errors.phone}
                  />
                  {errors.phone && (
                    <span className={errorClass} role="alert">
                      {errors.phone}
                    </span>
                  )}
                </div>
                <div>
                  <label htmlFor="contact-company" className={labelClass}>
                    Company / Business
                  </label>
                  <input
                    id="contact-company"
                    type="text"
                    placeholder="Optional"
                    value={formData.company}
                    onChange={(e) =>
                      handleChange('company', e.target.value)
                    }
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-service" className={labelClass}>
                  Service Required *
                </label>
                <select
                  id="contact-service"
                  value={formData.service}
                  onChange={(e) =>
                    handleChange('service', e.target.value)
                  }
                  className={`${inputClass} appearance-none cursor-pointer`}
                  aria-required="true"
                  aria-invalid={!!errors.service}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23D7E2EA' viewBox='0 0 16 16'%3E%3Cpath d='M4 6l4 4 4-4'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 1rem center',
                  }}
                >
                  <option value="" disabled className="bg-[#1a1a1a]">
                    Select a service
                  </option>
                  {services.map((s) => (
                    <option key={s} value={s} className="bg-[#1a1a1a]">
                      {s}
                    </option>
                  ))}
                </select>
                {errors.service && (
                  <span className={errorClass} role="alert">
                    {errors.service}
                  </span>
                )}
              </div>

              <div>
                <label htmlFor="contact-message" className={labelClass}>
                  Project Details / Message *
                </label>
                <textarea
                  id="contact-message"
                  placeholder="Tell me about your project..."
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    handleChange('message', e.target.value)
                  }
                  className={`${inputClass} resize-none`}
                  aria-required="true"
                  aria-invalid={!!errors.message}
                />
                {errors.message && (
                  <span className={errorClass} role="alert">
                    {errors.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="relative w-full sm:w-auto self-start rounded-full px-10 py-4 font-medium uppercase tracking-widest text-sm text-white overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(182,0,168,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background:
                    'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                }}
              >
                <span
                  className={`flex items-center justify-center gap-2 ${
                    loading ? 'opacity-0' : 'opacity-100'
                  }`}
                >
                  Send Inquiry
                </span>
                {loading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  </div>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
