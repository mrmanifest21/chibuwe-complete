import { useState } from 'react'
import { MapPin, Phone, Mail, Globe, Clock, CheckCircle } from 'lucide-react'

const YELLOW = '#FFC107'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', service: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    // Send to both email addresses via Formspree
    // Create Formspree account at https://formspree.io and replace the endpoint
    try {
      const response = await fetch('https://formspree.io/f/info@chibuweconstructions.co.za', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          message: formData.message,
          _subject: `New Quote Request from ${formData.name} - ${formData.service}`,
          _replyto: formData.email,
        }),
      })

      if (response.ok) {
        setSubmitted(true)
        setFormData({ name: '', email: '', phone: '', service: '', message: '' })
      } else {
        // Fallback: open mailto
        const mailtoLink = `mailto:info@chibuweconstructions.co.za,saleschibuwe@gmail.com?subject=${encodeURIComponent(`Quote Request - ${formData.service}`)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nService: ${formData.service}\n\nMessage:\n${formData.message}`)}`
        window.location.href = mailtoLink
        setSubmitted(true)
        setFormData({ name: '', email: '', phone: '', service: '', message: '' })
      }
    } catch {
      // Fallback: open mailto with both emails
      const mailtoLink = `mailto:info@chibuweconstructions.co.za,saleschibuwe@gmail.com?subject=${encodeURIComponent(`Quote Request - ${formData.service}`)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nService: ${formData.service}\n\nMessage:\n${formData.message}`)}`
      window.location.href = mailtoLink
      setSubmitted(true)
      setFormData({ name: '', email: '', phone: '', service: '', message: '' })
    }

    setSubmitting(false)
    setTimeout(() => setSubmitted(false), 5000)
  }

  const inputCls = "w-full border-0 border-b border-gray-200 py-4 text-sm font-body bg-transparent outline-none focus:border-yellow-400 transition-colors placeholder:text-gray-400"

  return (
    <section id="contact" className="bg-white" style={{ padding: '140px 40px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="text-center mb-20">
          <span className="font-heading uppercase block mb-3" style={{ fontSize: '11px', color: YELLOW, letterSpacing: '5px', fontWeight: 600 }}>Get In Touch</span>
          <h2 className="font-display mb-4" style={{ fontSize: 'clamp(36px, 5vw, 64px)', color: '#000', fontWeight: 700 }}>Request a Quote</h2>
          <p className="font-body mx-auto" style={{ fontSize: '16px', color: '#666', maxWidth: '500px', lineHeight: 1.8 }}>
            Ready to start your project? Contact us for a free, no-obligation quote.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-20">
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="flex items-center gap-5 p-8" style={{ backgroundColor: '#fafafa', borderLeft: '4px solid ' + YELLOW }}>
                <CheckCircle size={28} color={YELLOW} />
                <div>
                  <p className="font-heading font-semibold text-lg" style={{ color: '#000' }}>Quote Request Sent!</p>
                  <p className="font-body mt-1" style={{ fontSize: '14px', color: '#666' }}>We&apos;ll get back to you within 24 hours.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <input type="text" name="name" placeholder="Your Name *" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={inputCls} />
                  <input type="email" name="email" placeholder="Email Address *" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={inputCls} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className={inputCls} />
                  <select name="service" value={formData.service} onChange={(e) => setFormData({ ...formData, service: e.target.value })} className={inputCls + " cursor-pointer"} style={{ color: formData.service ? '#000' : '#9ca3af' }}>
                    <option value="" disabled>Select a Service</option>
                    <option value="glass-balustrades">Glass & Stainless Steel Balustrades</option>
                    <option value="aluminum">Aluminum Windows & Doors</option>
                    <option value="frameless-showers">Frameless Showers</option>
                    <option value="building">Building Construction</option>
                    <option value="renovations">Renovations</option>
                    <option value="electrical">Electrical Installations</option>
                    <option value="plumbing">Plumbing</option>
                    <option value="painting">Painting & Waterproofing</option>
                    <option value="tiling">Tiling</option>
                    <option value="carpentry">Carpentry</option>
                    <option value="roofing">Roofing</option>
                    <option value="paving">Paving & Concrete</option>
                    <option value="jojo-tanks">Jojo Tanks</option>
                    <option value="flooring">Flooring Installation</option>
                    <option value="drywalling">Drywalling & Partitioning</option>
                    <option value="ceiling">Ceiling & Cornices</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <textarea name="message" placeholder="Tell us about your project..." rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className={inputCls + " resize-y"} />
                <button type="submit" disabled={submitting} className="w-full font-heading font-semibold uppercase tracking-widest transition-all duration-300 hover:shadow-lg hover:brightness-105 disabled:opacity-50" style={{ padding: '20px', fontSize: '12px', letterSpacing: '3px', backgroundColor: YELLOW, color: '#000' }}>
                  {submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>

          <div className="lg:col-span-2 space-y-8">
            <h3 className="font-display" style={{ fontSize: '24px', color: '#000', fontWeight: 700 }}>Chibuwe Construction &amp; Projects</h3>
            <div className="space-y-6">
              {[
                { icon: MapPin, label: 'Address', value: '3 Alison Street, Buccluech, Sandton, 2090' },
                { icon: Phone, label: 'Phone', value: '010 745 7663 / 074 993 0280 / 083 882 8136' },
                { icon: Mail, label: 'Email', value: 'info@chibuweconstructions.co.za\nsaleschibuwe@gmail.com' },
                { icon: Globe, label: 'Website', value: 'chibuweconstructions.co.za' },
                { icon: Clock, label: 'Hours', value: 'Monday - Saturday: 07:00 - 18:00' },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.label} className="flex items-start gap-4">
                    <Icon size={16} color={YELLOW} className="flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-heading font-semibold" style={{ fontSize: '10px', color: '#000', letterSpacing: '1px' }}>{item.label}</p>
                      <p className="font-body mt-1 whitespace-pre-line" style={{ fontSize: '14px', color: '#555' }}>{item.value}</p>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="flex flex-col gap-3">
              <a href="mailto:info@chibuweconstructions.co.za" className="inline-block font-heading font-semibold uppercase tracking-widest text-center transition-all duration-300 hover:shadow-lg hover:brightness-105" style={{ padding: '16px 32px', fontSize: '11px', letterSpacing: '2px', backgroundColor: YELLOW, color: '#000' }}>
                Email Info
              </a>
              <a href="mailto:saleschibuwe@gmail.com" className="inline-block font-heading font-semibold uppercase tracking-widest text-center transition-all duration-300 hover:bg-gray-800" style={{ padding: '16px 32px', fontSize: '11px', letterSpacing: '2px', backgroundColor: '#000', color: '#fff' }}>
                Email Sales
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
