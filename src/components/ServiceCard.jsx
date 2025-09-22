import { FiClock } from 'react-icons/fi'

export default function ServiceCard({
  icon: Icon,
  title,
  price,
  desc,
  duration,
  tags = [],
  barber = 'Any',
  ctaText = 'Book',
  addon = false,
  onClick,
}) {
  return (
    <div className={addon ? 'addon-card' : 'service-card'}>
      <div className="d-flex justify-content-between align-items-start">
        <div className="d-flex align-items-center gap-2">
          {Icon ? (
            <span className="icon-badge" aria-hidden="true">
              <Icon />
            </span>
          ) : null}
          <h3 className="service-title mb-0">{title}</h3>
          {addon && <span className="addon-badge">Add-on</span>}
        </div>
        <span className="price">${price}</span>
      </div>

      {desc ? <p className="service-desc">{desc}</p> : null}

      <div className="d-flex flex-wrap gap-2">
        {duration ? (
          <span className="pill pill-soft">
            {/* <FiClock aria-hidden="true" /> */}
            {duration}
          </span>
        ) : null}
        {tags.map((t, i) => (
          <span key={i} className="pill">
            {t}
          </span>
        ))}
      </div>

      {!addon && (
        <div className="card-actions d-flex justify-content-between align-items-center mt-3">
          <small className="text-muted">Barber: {barber}</small>
          <a className="btn-cta" href="/booking" onClick={onClick}>
            {ctaText}
          </a>
        </div>
      )}

      {addon && (
        <div className="card-actions d-flex justify-content-end mt-3">
          <button type="button" className="btn-ghost btn-sm" onClick={onClick} aria-label={`Add ${title}`}>
            Add
          </button>
        </div>
      )}
    </div>
  )
}