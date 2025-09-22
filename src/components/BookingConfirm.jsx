import React, { useMemo, useState } from 'react'
import { FiCheck, FiShield } from 'react-icons/fi'

export default function BookingConfirm({
  service,                // { name, price, duration }
  selectedDate,          // Date|null
  selectedTime,          // string|null (e.g., '1:00 PM')
  selectedBarber,        // { id, name }|null
  onBack,
  onConfirm,
}) {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    card: '',
    exp: '',
    cvc: '',
    address: '',
  })

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const dateLabel = useMemo(
    () =>
      selectedDate
        ? selectedDate.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })
        : '—',
    [selectedDate]
  )

  const canConfirm =
    !!(service && selectedDate && selectedTime && selectedBarber && form.fullName.trim() && /.+@.+\..+/.test(form.email))

  const total = service?.price ?? 0

  const submit = (e) => {
    e.preventDefault()
    if (!canConfirm) return
    onConfirm?.({
      contact: { name: form.fullName, email: form.email, address: form.address },
      payment: { card: form.card, exp: form.exp, cvc: form.cvc }, // optional fields
      appointment: {
        service: service?.name,
        price: total,
        duration: service?.duration,
        date: selectedDate?.toISOString(),
        time: selectedTime,
        barber: selectedBarber?.name,
      },
    })
  }

  return (
    <div className="row g-3">
      {/* Left column */}
      <div className="col-12 col-lg-8">
        <form className="panel" onSubmit={submit}>
          <div className="panel-head">Appointment details</div>

          <div className="details-list">
            <div className="detail-box"><div className="detail-label">Service</div><div className="detail-value">{service?.name || '—'}</div></div>
            <div className="detail-box"><div className="detail-label">Date</div><div className="detail-value">{dateLabel}</div></div>
            <div className="detail-box"><div className="detail-label">Time</div><div className="detail-value">{selectedTime || '—'}</div></div>
            <div className="detail-box"><div className="detail-label">Barber</div><div className="detail-value">{selectedBarber?.name || '—'}</div></div>
            <div className="detail-box"><div className="detail-label">Duration</div><div className="detail-value">{service?.duration ? `${service.duration} min` : '—'}</div></div>
          </div>

          <div className="info-banner">Please arrive 5 minutes early. Late arrivals over 10 minutes may require rescheduling.</div>

          <div className="panel-subhead mt-3">Payment</div>

          <div className="row g-2">
            <div className="col-12 col-md-6">
              <label className="field-label">Full name</label>
              <input className="form-control" value={form.fullName} onChange={set('fullName')} placeholder="Full name" />
            </div>
            <div className="col-12 col-md-6">
              <label className="field-label">Email address</label>
              <input type="email" className="form-control" value={form.email} onChange={set('email')} placeholder="you@example.com" />
            </div>

            <div className="col-12 col-md-6">
              <label className="field-label">Card number</label>
              <input inputMode="numeric" className="form-control" value={form.card} onChange={set('card')} placeholder="1234 5678 9012 3456" />
            </div>
            <div className="col-6 col-md-3">
              <label className="field-label">MM / YY</label>
              <input className="form-control" value={form.exp} onChange={set('exp')} placeholder="MM/YY" />
            </div>
            <div className="col-6 col-md-3">
              <label className="field-label">CVC</label>
              <input inputMode="numeric" className="form-control" value={form.cvc} onChange={set('cvc')} placeholder="123" />
            </div>

            <div className="col-12">
              <label className="field-label">Billing address</label>
              <input className="form-control" value={form.address} onChange={set('address')} placeholder="Street, City, State" />
            </div>
          </div>

          <div className="wizard-actions">
            <button type="button" className="btn-ghost btn-ghost--muted" onClick={onBack}>Back</button>
            <button type="submit" className="btn-cta btn-cta--dark d-inline-flex align-items-center gap-2" disabled={!canConfirm}>
              <FiCheck aria-hidden="true" />
              <span>Confirm Booking</span>
            </button>
          </div>
        </form>
      </div>

      {/* Right column summary */}
      <aside className="col-12 col-lg-4">
        <div className="summary-card">
          <div className="summary-head">Summary</div>

          <div className="summary-row"><div className="summary-label">Service</div><div className="summary-value">{service?.name || '—'}</div></div>
          <div className="summary-row"><div className="summary-label">Date</div><div className="summary-value">{dateLabel}</div></div>
          <div className="summary-row"><div className="summary-label">Time</div><div className="summary-value">{selectedTime || '—'}</div></div>
          <div className="summary-row"><div className="summary-label">Barber</div><div className="summary-value">{selectedBarber?.name || '—'}</div></div>
          <div className="summary-row"><div className="summary-label">Duration</div><div className="summary-value">{service?.duration ? `${service.duration} min` : '—'}</div></div>

          <div className="summary-total"><div>Total Due</div><div className="fw-bold">${total.toFixed(2)}</div></div>

          <div className="summary-tip d-flex align-items-center gap-2">
            <FiShield aria-hidden="true" />
            <span>Your info is encrypted and never stored.</span>
          </div>
        </div>
      </aside>
    </div>
  )
}