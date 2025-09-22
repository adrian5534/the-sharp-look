import React, { useState } from 'react'
import '../styles/contact.css'

export default function Contact() {
  const ADDRESS = '221 Barber St, Suite 12, Midtown'
  const PHONE = '(555) 012-3456'
  const EMAIL = 'hello@thesharplook.com'
  const IG = '@thesharplook'

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const validate = () => {
    const err = {}
    if (!form.name.trim()) err.name = 'Please enter your name'
    const hasEmail = !!form.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    const hasPhone = (form.phone || '').replace(/\D+/g, '').length >= 10
    if (!hasEmail && !hasPhone) {
      err.contact = 'Enter a valid email or phone'
      if (!hasEmail) err.email = 'Enter a valid email'
      if (!hasPhone && form.phone) err.phone = 'Enter a 10‑digit phone'
    }
    if (!form.message.trim()) err.message = 'Please add a message'
    return err
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const err = validate()
    setErrors(err)
    if (Object.keys(err).length) return
    try {
      setStatus('sending')
      // Simulate sending. Replace with your API call.
      await new Promise((r) => setTimeout(r, 800))
      setStatus('sent')
      setForm({ name: '', email: '', phone: '', date: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    ADDRESS
  )}&output=embed`

  return (
    <section className="contact-page section">
      <div className="container">
        {/* Band */}
        <div className="contact-band">
          <div>
            <h1 className="band-title">Contact</h1>
            <p className="band-sub">Questions, bookings, or special requests — we’re here to help.</p>
          </div>
          <a href="tel:+15550123456" className="chip chip-dark">Call the Shop</a>
        </div>

        <div className="row g-3">
          {/* Left: form */}
          <div className="col-12 col-lg-8">
            <div className="panel contact-panel">
              <div className="panel-head">Send us a message</div>

              {errors.contact && (
                <div className="info-banner" role="alert" style={{ marginBottom: '.6rem' }}>
                  {errors.contact}
                </div>
              )}

              <form onSubmit={onSubmit} noValidate>
                <div className="row g-2">
                  <div className="col-12 col-md-6">
                    <input
                      className="form-control"
                      placeholder="Full name"
                      value={form.name}
                      onChange={update('name')}
                      aria-invalid={!!errors.name}
                    />
                    {errors.name && <div className="muted-hint err">{errors.name}</div>}
                  </div>
                  <div className="col-12 col-md-6">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email address"
                      value={form.email}
                      onChange={update('email')}
                      aria-invalid={!!errors.email}
                    />
                    {errors.email && <div className="muted-hint err">{errors.email}</div>}
                  </div>
                  <div className="col-12 col-md-6">
                    <input
                      className="form-control"
                      placeholder="Phone (optional)"
                      value={form.phone}
                      onChange={update('phone')}
                      inputMode="tel"
                    />
                    {errors.phone && <div className="muted-hint err">{errors.phone}</div>}
                  </div>
                  <div className="col-12 col-md-6">
                    <input
                      type="date"
                      className="form-control"
                      placeholder="Preferred date"
                      value={form.date}
                      onChange={update('date')}
                    />
                  </div>
                  <div className="col-12">
                    <textarea
                      className="form-control"
                      placeholder="Your message"
                      rows={4}
                      value={form.message}
                      onChange={update('message')}
                      aria-invalid={!!errors.message}
                    />
                    {errors.message && <div className="muted-hint err">{errors.message}</div>}
                  </div>
                </div>

                <div className="contact-form-footer">
                  <div className="badges">
                    <span className="badge">Avg. reply: 2h</span>
                    <span className="badge">Open 7 days</span>
                  </div>
                  <button
                    type="submit"
                    className="btn-cta"
                    disabled={status === 'sending'}
                  >
                    {status === 'sending' ? 'Sending…' : 'Send Message'}
                  </button>
                </div>

                <div className="sr-status" aria-live="polite">
                  {status === 'sent' && 'Thanks! We’ll get back to you shortly.'}
                  {status === 'error' && 'Something went wrong. Please try again.'}
                </div>
              </form>
            </div>
          </div>

          {/* Right: shop info */}
          <aside className="col-12 col-lg-4">
            <div className="panel">
              <div className="panel-head">Shop info</div>

              <div className="info-list">
                <div className="info-field">{ADDRESS}</div>
                <a className="info-field" href="tel:+15550123456">{PHONE}</a>
                <a className="info-field" href={`mailto:${EMAIL}`}>{EMAIL}</a>
                <a className="info-field" href="https://instagram.com/thesharplook" target="_blank" rel="noreferrer">
                  {IG}
                </a>
              </div>

              <div className="hours-head">Hours</div>
              <div className="hour-grid">
                <div className="hour-cell">
                  <div className="small">Mon–Fri</div>
                  <div className="b">9:00a – 7:00p</div>
                </div>
                <div className="hour-cell">
                  <div className="small">Sat</div>
                  <div className="b">9:00a – 6:00p</div>
                </div>
                <div className="hour-cell">
                  <div className="small">Sun</div>
                  <div className="b">10:00a – 4:00p</div>
                </div>
                <div className="hour-cell">
                  <div className="small">Holidays</div>
                  <div className="b">Varies</div>
                </div>
              </div>

              <a className="btn-ghost w-100 mt-2" href="/booking">Book an appointment</a>
            </div>
          </aside>
        </div>

        {/* Map */}
        <div className="map-wrap">
          <iframe
            title="Shop location on Google Maps"
            src={mapSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  )
}