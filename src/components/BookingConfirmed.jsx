import React, { useMemo } from 'react'
import { v4 as uuidv4 } from 'uuid'
import QRCode from 'react-qr-code'
import { FiCalendar, FiDownload, FiMapPin, FiPhone } from 'react-icons/fi'

export default function BookingConfirmed({
  confirmationId,          // optional: if not provided we auto-generate
  service,                 // { name, price, duration }
  selectedDate,            // Date|null
  selectedTime,            // string|null
  selectedBarber,          // { id, name }|null
  totalPaid,               // number | undefined -> falls back to service.price
  address = '221 King St, Suite 3',
  parking = 'Street & lot available',
  onAddToCalendar,
  onDownloadReceipt,
  onGetDirections,
  onContactShop,
  phone = '(555) 012-3456',
}) {
  // Generate a stable ID once per mount if not provided
  const id = useMemo(
    () => confirmationId || `TSL-${uuidv4().slice(0, 8).toUpperCase()}`,
    [confirmationId]
  )

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

  // Encode appointment details for scanning at check-in
  const qrPayload = useMemo(
    () =>
      JSON.stringify({
        id,
        service: service?.name || null,
        duration: service?.duration || null,
        date: selectedDate?.toISOString?.() || null,
        time: selectedTime || null,
        barber: selectedBarber?.name || null,
        price: total,
        v: 1,
      }),
    [id, service, selectedDate, selectedTime, selectedBarber, total]
  )

  return (
    <div className="row g-3">
      {/* Left: appointment summary + location */}
      <div className="col-12 col-lg-8">
        <div className="panel">
          <div className="panel-head">Appointment summary</div>

          <div className="details-list">
            <div className="detail-box">
              <div className="detail-label">Confirmation #</div>
              <div className="detail-value">{id}</div>
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
            <QRCode
              value={qrPayload}
              size={168}
              style={{ width: '100%', height: 'auto' }}
              bgColor="#ffffff"
              fgColor="#111111"
            />
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