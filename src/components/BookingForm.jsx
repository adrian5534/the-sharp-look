import React, { useState, useEffect } from 'react'

export default function BookingForm({
  onSubmit,
  defaults = {},
  submitting = false,
  readOnlyFields = ['service', 'date', 'time'],
}) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    date: '',
    time: '',
    notes: '',
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (!defaults) return
    setForm((f) => ({
      ...f,
      ...defaults,
      phone: defaults.phone ? formatPhone(defaults.phone) : f.phone,
    }))
  }, [defaults])

  const update = (k) => (e) => {
    let v = e.target.value
    if (k === 'phone') v = formatPhone(v)
    setForm((prev) => ({ ...prev, [k]: v }))
  }

  const validate = (data) => {
    const err = {}
    if (!data.name.trim()) err.name = 'Please enter your name'
    const digits = onlyDigits(data.phone)
    const hasPhone = digits.length >= 10
    const hasEmail = !!data.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
    if (!hasPhone && !hasEmail) {
      err.contact = 'Enter a valid phone or email'
      if (!hasPhone) err.phone = 'Enter a 10‑digit phone'
      if (!hasEmail) err.email = 'Enter a valid email'
    }
    return err
  }

  const submit = (e) => {
    e.preventDefault()
    const err = validate(form)
    setErrors(err)
    if (Object.keys(err).length) return
    onSubmit?.({
      ...form,
      phone: normalizePhone(form.phone),
    })
  }

  const isReadOnly = (k) => readOnlyFields.includes(k) && form[k]

  return (
    <form onSubmit={submit} className="booking-form" noValidate>
      {errors.contact && (
        <div className="info-banner" role="alert" style={{ marginBottom: '.6rem' }}>
          {errors.contact}
        </div>
      )}

      <div className="row g-2">
        {/* Name */}
        <div className="col-12">
          <label className="field-label" htmlFor="bf-name">Name</label>
          <input
            id="bf-name"
            className="form-control"
            placeholder="Full name"
            value={form.name}
            onChange={update('name')}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'bf-name-err' : undefined}
            disabled={submitting}
          />
          {errors.name && <div id="bf-name-err" className="muted-hint" style={{ color: '#b00020' }}>{errors.name}</div>}
        </div>

        {/* Phone */}
        <div className="col-12 col-md-6">
          <label className="field-label" htmlFor="bf-phone">Phone</label>
          <input
            id="bf-phone"
            type="tel"
            inputMode="tel"
            className="form-control"
            placeholder="(555) 000-0000"
            value={form.phone}
            onChange={update('phone')}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? 'bf-phone-err' : undefined}
            disabled={submitting}
          />
          {errors.phone && <div id="bf-phone-err" className="muted-hint" style={{ color: '#b00020' }}>{errors.phone}</div>}
        </div>

        {/* Email */}
        <div className="col-12 col-md-6">
          <label className="field-label" htmlFor="bf-email">Email</label>
          <input
            id="bf-email"
            type="email"
            className="form-control"
            placeholder="you@example.com"
            value={form.email}
            onChange={update('email')}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'bf-email-err' : undefined}
            disabled={submitting}
          />
          {errors.email && <div id="bf-email-err" className="muted-hint" style={{ color: '#b00020' }}>{errors.email}</div>}
        </div>

        {/* Service (read-only when provided) */}
        <div className="col-12 col-md-6">
          <label className="field-label" htmlFor="bf-service">Service</label>
          <input
            id="bf-service"
            className="form-control"
            placeholder="Select service"
            value={form.service}
            onChange={update('service')}
            readOnly={isReadOnly('service')}
            disabled={submitting || isReadOnly('service')}
          />
          <div className="muted-hint">Classic Cut, Hot Towel Shave, Beard Shape, etc.</div>
        </div>

        {/* Date */}
        <div className="col-12 col-md-3">
          <label className="field-label" htmlFor="bf-date">Date</label>
          <input
            id="bf-date"
            type="date"
            className="form-control"
            value={form.date}
            onChange={update('date')}
            readOnly={isReadOnly('date')}
            disabled={submitting || isReadOnly('date')}
          />
        </div>

        {/* Time */}
        <div className="col-12 col-md-3">
          <label className="field-label" htmlFor="bf-time">Time</label>
          <input
            id="bf-time"
            type="time"
            className="form-control"
            value={form.time}
            onChange={update('time')}
            readOnly={isReadOnly('time')}
            disabled={submitting || isReadOnly('time')}
          />
        </div>

        {/* Notes */}
        <div className="col-12">
          <label className="field-label" htmlFor="bf-notes">Notes</label>
          <textarea
            id="bf-notes"
            className="form-control"
            placeholder="Any preferences or requests"
            rows={3}
            value={form.notes}
            onChange={update('notes')}
            disabled={submitting}
          />
        </div>

        <div className="col-12 d-flex justify-content-between align-items-center flex-wrap gap-2">
          <div className="muted-hint">You’ll receive a confirmation by email and/or text.</div>
          <button type="submit" className="btn-cta" disabled={submitting}>
            {submitting ? 'Submitting…' : 'Confirm Appointment'}
          </button>
        </div>
      </div>
    </form>
  )
}

/* Helpers */
function onlyDigits(v) {
  return (v || '').replace(/\D+/g, '')
}
function formatPhone(v) {
  const d = onlyDigits(v).slice(0, 10)
  const p1 = d.slice(0, 3)
  const p2 = d.slice(3, 6)
  const p3 = d.slice(6, 10)
  if (d.length > 6) return `(${p1}) ${p2}-${p3}`
  if (d.length > 3) return `(${p1}) ${p2}`
  if (d.length > 0) return `(${p1}`
  return ''
}
function normalizePhone(v) {
  const d = onlyDigits(v)
  return d.length === 10 ? `+1${d}` : d
}