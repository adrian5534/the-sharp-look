import React, { useMemo, useState } from 'react'
import { FiPhone, FiChevronRight } from 'react-icons/fi'
import BookingDate from '../components/BookingDate.jsx'
import BarberSelect from '../components/BarberSelect.jsx'
import BookingConfirm from '../components/BookingConfirm.jsx'
import BookingConfirmed from '../components/BookingConfirmed.jsx'
import '../styles/booking.css'

export default function Booking() {
  // Services catalog
  const services = useMemo(
    () => [
      { name: 'Skin Fade', price: 45, duration: 45, meta: '45 min • Precision fade • finish' },
      { name: 'Classic Cut', price: 40, duration: 40, meta: '40 min • Shears & clipper work' },
      { name: 'Beard Trim', price: 25, duration: 25, meta: '25 min • Shape & finish' },
      { name: 'Hot Towel Shave', price: 35, duration: 35, meta: '35 min • Straight razor + hot towels' },
      { name: 'Cut + Beard', price: 65, duration: 60, meta: '60 min • Full service combo' },
    ],
    []
  )

  // Wizard state
  const [step, setStep] = useState(1) // 1 Service, 2 Date, 3 Barber, 4 Confirm, 5 Done
  const [selected, setSelected] = useState(null) // service
  const [selectedDate, setSelectedDate] = useState(null) // Date|null
  const [selectedTime, setSelectedTime] = useState('') // '1:00 PM'
  const [selectedBarber, setSelectedBarber] = useState(null) // { id, name }|null
  const [notes, setNotes] = useState('')
  const [confirmation, setConfirmation] = useState(null) // { id, total }

  const total = selected?.price ?? 0

  // Band titles per step
  const bandTitle =
    step === 1 ? 'Choose Your Service'
      : step === 2 ? 'Pick a Date & Time'
      : step === 3 ? 'Choose Your Barber'
      : step === 4 ? 'Confirm Your Booking'
      : 'Booking Confirmed'

  const bandSub =
    step === 1 ? 'Step 1 of 4 — Pick a service.'
      : step === 2 ? 'Step 2 of 4 — Choose your slot, then pick a barber.'
      : step === 3 ? `Step 3 of 4 — Pick a pro for ${selectedDate ? selectedDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : 'your time'}.`
      : step === 4 ? 'Step 4 of 4 — Review details and confirm your appointment.'
      : 'Your appointment is set. A confirmation has been sent to your email.'

  const stepCls = (n) =>
    step === n ? 'step step--current' : step > n ? 'step step--active' : 'step'

  // Step 4 confirmation submission
  const handleConfirm = (payload) => {
    const id = `TSL-${Math.random().toString(16).slice(2, 6).toUpperCase()}${Math.random()
      .toString(16)
      .slice(2, 4)
      .toUpperCase()}`
    setConfirmation({ id, total: payload?.appointment?.price ?? total })
    setStep(5)
  }

  // Render per step
  return (
    <section className="booking-page section">
      <div className="container">
        {/* Top band */}
        <div className="booking-band">
          <div className="band-left">
            <h1 className="band-title">{bandTitle}</h1>
            <p className="band-sub">{bandSub}</p>
          </div>
          <a href="tel:+1-555-555-5555" className="chip chip-dark">
            <FiPhone aria-hidden="true" />
            <span>Call the Shop</span>
          </a>
        </div>

        {/* Steps bar */}
        <div className="steps-bar">
          <div className={stepCls(1)}>Service</div>
          <FiChevronRight className="step-sep" />
          <div className={stepCls(2)}>Date</div>
          <FiChevronRight className="step-sep" />
          <div className={stepCls(3)}>Barber</div>
          <FiChevronRight className="step-sep" />
          <div className={stepCls(4)}>Confirm</div>
        </div>

        {/* Step content */}
        {step === 1 && (
          <div className="row g-3">
            <div className="col-12 col-lg-8">
              <div className="panel">
                <div className="panel-head">Choose your service</div>

                <div className="selectable-list">
                  {services.map((s) => (
                    <button
                      type="button"
                      key={s.name}
                      className={`selectable-row ${selected?.name === s.name ? 'is-selected' : ''}`}
                      onClick={() => setSelected(s)}
                      aria-pressed={selected?.name === s.name}
                    >
                      <div className="row-main">
                        <div className="row-title">{s.name}</div>
                        <div className="row-sub">{s.meta}</div>
                      </div>
                      <div className="row-price">${s.price}</div>
                    </button>
                  ))}
                </div>

                <div className="panel-subhead mt-3">Notes (optional)</div>
                <textarea
                  className="form-control"
                  placeholder="Any preferences or requests"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  aria-label="Notes"
                />

                <div className="wizard-actions">
                  <button type="button" className="btn-ghost btn-ghost--muted" disabled>
                    Back
                  </button>
                  <button
                    type="button"
                    className="btn-cta btn-cta--dark"
                    disabled={!selected}
                    onClick={() => setStep(2)}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>

            {/* Summary */}
            <aside className="col-12 col-lg-4">
              <div className="summary-card">
                <div className="summary-head">Summary</div>
                <div className="summary-row">
                  <div className="summary-label">Service</div>
                  <div className="summary-value">{selected?.name || '—'}</div>
                </div>
                <div className="summary-row">
                  <div className="summary-label">Date</div>
                  <div className="summary-value">
                    {selectedDate
                      ? selectedDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
                      : '—'}
                  </div>
                </div>
                <div className="summary-row">
                  <div className="summary-label">Time</div>
                  <div className="summary-value">{selectedTime || '—'}</div>
                </div>
                <div className="summary-row">
                  <div className="summary-label">Barber</div>
                  <div className="summary-value">{selectedBarber?.name || '—'}</div>
                </div>
                <div className="summary-row">
                  <div className="summary-label">Duration</div>
                  <div className="summary-value">{selected ? `${selected.duration} min` : '—'}</div>
                </div>
                <div className="summary-total">
                  <div>Estimated Total</div>
                  <div className="fw-bold">${total.toFixed(2)}</div>
                </div>
                <p className="summary-note">No payment required now. You’ll confirm at the last step.</p>
              </div>
            </aside>
          </div>
        )}

        {step === 2 && (
          <BookingDate
            service={selected}
            selectedDate={selectedDate}
            selectedTime={selectedTime || null}
            onSelectDate={(d) => setSelectedDate(d)}
            onSelectTime={(t) => setSelectedTime(t)}
            onBack={() => setStep(1)}
            onContinue={() => setStep(3)}
          />
        )}

        {step === 3 && (
          <BarberSelect
            service={selected}
            selectedDate={selectedDate}
            selectedTime={selectedTime || null}
            selectedBarber={selectedBarber}
            onSelectBarber={(b) => setSelectedBarber(b)}
            onBack={() => setStep(2)}
            onContinue={() => setStep(4)}
          />
        )}

        {step === 4 && (
          <BookingConfirm
            service={selected}
            selectedDate={selectedDate}
            selectedTime={selectedTime || null}
            selectedBarber={selectedBarber}
            onBack={() => setStep(3)}
            onConfirm={handleConfirm}
          />
        )}

        {step === 5 && (
          <BookingConfirmed
            confirmationId={confirmation?.id}
            service={selected}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            selectedBarber={selectedBarber}
            totalPaid={confirmation?.total}
            onAddToCalendar={() => {
              // Hook up to ICS file or calendar deep link
              console.log('Add to calendar')
            }}
            onDownloadReceipt={() => {
              console.log('Download receipt')
            }}
            onGetDirections={() => {
              // Example: open Apple Maps with address (replace with your address)
              window.open(`http://maps.apple.com/?q=The+Sharp+Look`, '_blank')
            }}
            onContactShop={() => {
              window.location.href = 'tel:+1-555-555-5555'
            }}
          />
        )}
      </div>
    </section>
  )
}