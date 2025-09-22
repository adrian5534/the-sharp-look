import React, { useMemo } from 'react'
import { FiChevronRight, FiStar } from 'react-icons/fi'

const PLACEHOLDER =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80">
      <rect width="100%" height="100%" fill="#e5e7eb"/>
      <circle cx="40" cy="30" r="14" fill="#cfd3d8"/>
      <rect x="14" y="48" width="52" height="20" rx="10" fill="#cfd3d8"/>
    </svg>`
  )

export default function BarberSelect({
  service,
  selectedDate,
  selectedTime,
  selectedBarber,
  onSelectBarber,
  onBack,
  onContinue,
  barbers,
}) {
  const list = useMemo(
    () =>
      barbers || [
        {
          id: 'marcus',
          name: 'Marcus Reed',
          specialty: 'Skin fade expert',
          years: 6,
          rating: 4.9,
          photo: '/images/barbers/marcus.jpg',
        },
        {
          id: 'ava',
          name: 'Ava Brooks',
          specialty: 'Precision cuts',
          years: 8,
          rating: 4.8,
          photo: '/images/barbers/ava.jpg',
        },
        {
          id: 'diego',
          name: 'Diego Alvarez',
          specialty: 'Beard & hot towel',
          years: 7,
          rating: 4.7,
          photo: '/images/barbers/diego.jpg',
        },
        {
          id: 'nina',
          name: 'Nina Carter',
          specialty: 'Classic cuts',
          years: 5,
          rating: 4.8,
          photo: '/images/barbers/nina.jpg',
        },
        {
          id: 'sam',
          name: 'Sam Park',
          specialty: 'Razor fades',
          years: 9,
          rating: 5.0,
          photo: '/images/barbers/sam.jpg',
        },
      ],
    [barbers]
  )

  const canContinue = !!selectedBarber

  return (
    <div className="row g-3">
      {/* Left: available barbers */}
      <div className="col-12 col-lg-8">
        <div className="panel">
          <div className="panel-head d-flex align-items-center gap-2">
            <span aria-hidden="true">👤</span>
            <span>Available barbers</span>
          </div>
          <p className="text-muted mb-3">
            Select the barber you prefer. All barbers are masters of fades, beard trims, and hot-towel shaves.
          </p>

          <div className="barber-list">
            {list.map((b) => {
              const isSel = selectedBarber?.id === b.id
              return (
                <button
                  key={b.id}
                  type="button"
                  className={`barber-row ${isSel ? 'is-selected' : ''}`}
                  onClick={() => onSelectBarber?.(b)}
                  aria-pressed={isSel}
                >
                  <span className="barber-avatar" aria-hidden="true">
                    <img
                      src={b.photo || PLACEHOLDER}
                      alt={`${b.name} headshot`}
                      loading="lazy"
                      width="42"
                      height="42"
                      onError={(e) => {
                        if (e.currentTarget.src !== PLACEHOLDER) e.currentTarget.src = PLACEHOLDER
                      }}
                    />
                  </span>
                  <span className="barber-main">
                    <span className="barber-name">{b.name}</span>
                    <span className="barber-meta">
                      {b.specialty} • {b.years} yrs
                    </span>
                  </span>
                  <span className="rating-pill">
                    <FiStar aria-hidden="true" />
                    {b.rating.toFixed(1)}
                  </span>
                </button>
              )
            })}
          </div>

          <div className="wizard-actions">
            <button type="button" className="btn-ghost btn-ghost--muted" onClick={onBack}>
              Back
            </button>
            <button
              type="button"
              className="btn-cta btn-cta--dark d-inline-flex align-items-center gap-2"
              onClick={onContinue}
              disabled={!canContinue}
            >
              <span>Continue</span>
              <FiChevronRight aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Right: summary */}
      <aside className="col-12 col-lg-4">
        <div className="summary-card">
          <div className="summary-head d-flex align-items-center gap-2">
            <span aria-hidden="true">🧾</span>
            <span>Summary</span>
          </div>

          <div className="summary-row">
            <div className="summary-label">Service</div>
            <div className="summary-value">{service?.name || '—'}</div>
          </div>
          <div className="summary-row">
            <div className="summary-label">Date</div>
            <div className="summary-value">
              {selectedDate ? selectedDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : '—'}
            </div>
          </div>
          <div className="summary-row">
            <div className="summary-label">Time</div>
            <div className="summary-value">{selectedTime || '—'}</div>
          </div>
          <div className="summary-row">
            <div className="summary-label">Barber</div>
            <div className="summary-value">{selectedBarber?.name || '— Select'}</div>
          </div>
          <div className="summary-row">
            <div className="summary-label">Duration</div>
            <div className="summary-value">{service?.duration ? `${service.duration} min` : '—'}</div>
          </div>

          <div className="summary-total">
            <div>Estimated Total</div>
            <div className="fw-bold">${(service?.price ?? 0).toFixed(2)}</div>
          </div>

          {!canContinue && (
            <div className="summary-tip" role="note">
              Choose a barber to continue to confirmation.
            </div>
          )}
        </div>
      </aside>
    </div>
  )
}