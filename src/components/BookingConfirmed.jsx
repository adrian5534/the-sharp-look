import React, { useMemo } from 'react'
import { FiCalendar, FiDownload, FiMapPin, FiPhone } from 'react-icons/fi'

export default function BookingConfirmed({
  confirmationId = 'TSL-8F29C',
  service,                 // { name, price, duration }
  selectedDate,           // Date|null
  selectedTime,           // string|null
  selectedBarber,         // { id, name }|null
  totalPaid,              // number | undefined -> falls back to service.price
  address = '221 King St, Suite 3',
  parking = 'Street & lot available',
  onAddToCalendar,
  onDownloadReceipt,
  onGetDirections,
  onContactShop,
  phone = '(555) 012-3456',
}) {
  const dateLabel = useMemo(
    () =>
      selectedDate
        ? selectedDate.toLocaleDateString(undefined, {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
          })
        : '—',
    [selectedDate]
  )

  const total = typeof totalPaid === 'number' ? totalPaid : service?.price ?? 0

  return (
    <div className="row g-3">
      {/* Left: appointment summary + location */}
      <div className="col-12 col-lg-8">
        <div className="panel">
          <div className="panel-head">Appointment summary</div>

          <div className="details-list">
            <div className="detail-box">
              <div className="detail-label">Confirmation #</div>
              <div className="detail-value">{confirmationId}</div>
            </div>
            <div className="detail-box">
              <div className="detail-label">Service</div>
              <div className="detail-value">{service?.name || '—'}</div>
            </div>
            <div className="detail-box">
              <div className="detail-label">Date</div>
              <div className="detail-value">{dateLabel}</div>
            </div>
            <div className="detail-box">
              <div className="detail-label">Time</div>
              <div className="detail-value">{selectedTime || '—'}</div>
            </div>
            <div className="detail-box">
              <div className="detail-label">Barber</div>
              <div className="detail-value">{selectedBarber?.name || '—'}</div>
            </div>
            <div className="detail-box">
              <div className="detail-label">Duration</div>
              <div className="detail-value">{service?.duration ? `${service.duration} min` : '—'}</div>
            </div>
            <div className="detail-box">
              <div className="detail-label">Total Paid</div>
              <div className="detail-value">${total.toFixed(2)}</div>
            </div>
          </div>

          <div className="info-banner">
            Please arrive 5 minutes early. Need to make changes? Contact us at {phone}.
          </div>

          <div className="panel-subhead mt-3">Location</div>
          <div className="details-list">
            <div className="detail-box">
              <div className="detail-label">Address</div>
              <div className="detail-value">{address}</div>
            </div>
            <div className="detail-box">
              <div className="detail-label">Parking</div>
              <div className="detail-value">{parking}</div>
            </div>
          </div>

          <div className="inline-actions">
            <button type="button" className="btn-chip" onClick={onAddToCalendar}>
              <FiCalendar aria-hidden="true" />
              <span>Add to Calendar</span>
            </button>
            <button type="button" className="btn-chip" onClick={onDownloadReceipt}>
              <FiDownload aria-hidden="true" />
              <span>Download Receipt</span>
            </button>
          </div>
        </div>
      </div>

      {/* Right: check-in + tips */}
      <aside className="col-12 col-lg-4">
        <div className="summary-card">
          <div className="summary-head">Your check-in</div>

          <div className="qr-box" role="img" aria-label="Appointment QR code">
            <div className="qr-placeholder" />
          </div>
          <p className="qr-caption">Show this QR at the front desk for faster check‑in.</p>

          <div className="summary-head mt-2">Before you arrive</div>

          <div className="notice-pill">Come with clean, dry hair for the best result.</div>
          <div className="notice-pill">Running late? Call us and we’ll try to accommodate.</div>

          <button type="button" className="btn-ghost w-100 mt-2" onClick={onGetDirections}>
            <FiMapPin aria-hidden="true" />
            <span>Get Directions</span>
          </button>
          <button type="button" className="btn-ghost w-100 mt-2" onClick={onContactShop}>
            <FiPhone aria-hidden="true" />
            <span>Contact Shop</span>
          </button>
        </div>
      </aside>
    </div>
  )
}