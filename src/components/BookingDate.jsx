import React, { useMemo } from 'react'
import { FiChevronRight } from 'react-icons/fi'

export default function BookingDate({
  service,
  selectedDate,
  selectedTime,
  onSelectDate,
  onSelectTime,
  onBack,
  onContinue,
  availableTimes,
}) {
  const times = availableTimes || [
    '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
  ]

  // Memoize today and the first day of the current month
  const today = useMemo(() => new Date(), [])
  const currentMonth = useMemo(() => {
    const d = today
    return new Date(d.getFullYear(), d.getMonth(), 1)
  }, [today])

  // Build calendar grid once per month
  const days = useMemo(() => buildMonthMatrix(currentMonth), [currentMonth])

  const canContinue = !!(selectedDate && selectedTime)

  return (
    <div className="row g-3">
      {/* Left column */}
      <div className="col-12 col-lg-8">
        <div className="panel">
          {/* Select your date */}
          <div className="panel-head d-flex align-items-center gap-2">
            <span aria-hidden="true">📅</span>
            <span>Select your date</span>
          </div>

          <div className="calendar">
            <div className="weekday-row">
              {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map((w) => (
                <div key={w} className="weekday">{w}</div>
              ))}
            </div>

            <div className="day-grid" role="grid" aria-label="Select a date">
              {days.map((d, i) => {
                const isMuted = d.getMonth() !== currentMonth.getMonth()
                const isPast = stripTime(d) < stripTime(today)
                const isToday = isSameDay(d, today)
                const isSelected = selectedDate && isSameDay(d, selectedDate)
                const disabled = isMuted || isPast

                return (
                  <button
                    key={i}
                    type="button"
                    role="gridcell"
                    className={[
                      'day',
                      isMuted ? 'day--muted' : '',
                      isToday ? 'day--today' : '',
                      isSelected ? 'day--selected' : '',
                    ].join(' ').trim()}
                    onClick={() => !disabled && onSelectDate?.(d)}
                    disabled={disabled}
                    aria-pressed={!!isSelected}
                    aria-label={d.toDateString()}
                    title={d.toDateString()}
                  >
                    {d.getDate()}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Choose a time */}
          <div className="panel-subhead d-flex align-items-center gap-2 mt-3">
            <span aria-hidden="true">⏱️</span>
            <span>Choose a time</span>
          </div>

          <div className="slot-grid">
            {times.map((t) => {
              const isSelected = selectedTime === t
              return (
                <button
                  key={t}
                  type="button"
                  className={`slot ${isSelected ? 'slot--selected' : ''}`}
                  onClick={() => onSelectTime?.(t)}
                  aria-pressed={isSelected}
                >
                  {t}
                </button>
              )
            })}
          </div>

          {/* Actions */}
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

      {/* Right column summary */}
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
            <div className="summary-value">—</div>
          </div>
          <div className="summary-row">
            <div className="summary-label">Duration</div>
            <div className="summary-value">{service?.duration ? `${service.duration} min` : '—'}</div>
          </div>

          <div className="summary-total">
            <div>Estimated Total</div>
            <div className="fw-bold">${(service?.price ?? 0).toFixed(2)}</div>
          </div>

          <div className="summary-tip" role="note">
            You can change your date and time before confirming.
          </div>
        </div>
      </aside>
    </div>
  )
}

/* Helpers */
function buildMonthMatrix(monthStart) {
  const startOfMonth = new Date(monthStart.getFullYear(), monthStart.getMonth(), 1)
  const startWeekday = startOfMonth.getDay()
  const gridStart = new Date(startOfMonth)
  gridStart.setDate(1 - startWeekday)

  const days = []
  for (let i = 0; i < 42; i++) {
    const d = new Date(gridStart)
    d.setDate(gridStart.getDate() + i)
    days.push(d)
  }
  return days
}
function stripTime(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime()
}
function isSameDay(a, b) {
  return (
    a && b &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}