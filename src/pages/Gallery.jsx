import React, { useMemo, useState, useEffect, useCallback } from 'react'
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion as m } from 'framer-motion'
import GalleryGrid from '../components/GalleryGrid.jsx'
import '../styles/gallery.css'

const CATS = ['All', 'Skin Fades', 'Classic', 'Beards', 'Shaves', 'Shop']

export default function Gallery() {
  // Helper to point to images in /public/images/gallery
  const g = (file) => `/images/gallery/${file}`

  const items = useMemo(
    () => [
      // Haircuts (make sure the files exist under /public/images/gallery)
      mk('Skin Fade', 'Skin Fades', g('skin-fade.jpg'), { barber: 'Alex', service: 'Skin Fade', duration: 45 }),
      mk('Classic Cut', 'Classic', g('classic-cut.jpg'), { barber: 'Marcus', service: 'Classic Cut', duration: 40 }),
      mk('Hot Towel Shave', 'Shaves', g('hot-towel-shave.jpg'), { barber: 'Ava', service: 'Hot Towel Shave', duration: 35 }),
      mk('Beard Trim', 'Beards', g('beard-trim.jpg'), { barber: 'Diego', service: 'Beard Trim', duration: 25 }),
      mk('Shop Interior', 'Shop', g('shop-interior.jpg'), { barber: '—', service: '—' }),
      mk('Pompadour', 'Classic', g('pompadour.jpg'), { barber: 'Nina', service: 'Classic Cut', duration: 40 }),
      mk('Line‑Up', 'Skin Fades', g('line-up.jpg'), { barber: 'Sam', service: 'Skin Fade', duration: 45 }),
      mk('Straight Razor', 'Shaves', g('straight-razor.jpg'), { barber: 'Alex', service: 'Hot Towel Shave', duration: 35 }),
      mk('Buzz Cut', 'Classic', g('buzz-cut.jpg'), { barber: 'Marcus', service: 'Classic Cut', duration: 30 }),
      mk('Beard Shape', 'Beards', g('beard-shape.jpg'), { barber: 'Ava', service: 'Beard Trim', duration: 25 }),
      mk('Lounge', 'Shop', g('lounge.jpg'), { barber: '—', service: '—' }),
      mk('Details', 'Shop', g('details.jpg'), { barber: '—', service: '—' }),
      mk('Curly Fade', 'Skin Fades', g('curly-fade.jpg'), { barber: 'Diego', service: 'Skin Fade', duration: 45 }),
      mk('Taper Fade', 'Skin Fades', g('taper-fade.jpg'), { barber: 'Nina', service: 'Skin Fade', duration: 45 }),
      mk('Low Fade', 'Skin Fades', g('low-fade.jpg'), { barber: 'Sam', service: 'Skin Fade', duration: 45 }),
      mk('High Fade', 'Skin Fades', g('high-fade.jpg'), { barber: 'Alex', service: 'Skin Fade', duration: 45 }),
    ],
    []
  )

  const [cat, setCat] = useState('All')
  const [q, setQ] = useState('')
  const [active, setActive] = useState(null)

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase()
    return items.filter((it) => {
      const catOk = cat === 'All' || it.category === cat
      const text = `${it.title} ${it.category} ${it.barber}`.toLowerCase()
      const qOk = !term || text.includes(term)
      return catOk && qOk
    })
  }, [items, cat, q])

  const close = useCallback(() => setActive(null), [])
  useEffect(() => {
    const onEsc = (e) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onEsc)
    return () => window.removeEventListener('keydown', onEsc)
  }, [close])

  const onBook = (it) => {
    const params = new URLSearchParams()
    if (it.service && it.service !== '—') params.set('service', it.service)
    params.set('style', it.title)
    window.location.href = `/booking?${params.toString()}`
  }

  return (
    <section className="gallery-page section">
      <div className="container">
        <div className="gallery-band">
          <div>
            <h1 className="band-title">Gallery</h1>
            <p className="band-sub">Fresh cuts, sharp beards, and the vibe of the shop.</p>
          </div>
          <a className="chip chip-dark" href="mailto:hello@thesharplook.com?subject=Submit%20a%20Look">
            Submit a Look
          </a>
        </div>

        <div className="gallery-toolbar">
          <div className="pill-row">
            {CATS.map((c) => (
              <button
                key={c}
                type="button"
                className={`pill ${cat === c ? 'is-active' : ''}`}
                onClick={() => setCat(c)}
              >
                {c}
              </button>
            ))}
          </div>

          <input
            className="search"
            placeholder="Search styles"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="Search styles"
          />
        </div>

        <h3 className="section-subhead">Latest Work</h3>

        <GalleryGrid items={filtered} onSelect={setActive} />
      </div>

      <AnimatePresence>
        {active && (
          <m.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => e.target === e.currentTarget && close()}
          >
            <m.div
              className="lightbox-dialog"
              initial={{ y: 20, scale: 0.98, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 20, scale: 0.98, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 240, damping: 22 }}
            >
              <div className="lightbox-head">
                <div className="lb-title">{active.title}</div>
                <button type="button" className="btn-ghost btn-ghost--muted" onClick={close}>
                  Close
                </button>
              </div>

              <div className="lightbox-body">
                <div className="lightbox-media">
                  {active.video ? (
                    <video src={active.src} poster={active.thumb || undefined} controls />
                  ) : (
                    <img src={active.src} alt={active.title} />
                  )}
                </div>

                <aside className="lightbox-aside">
                  {active.barber && active.barber !== '—' && (
                    <div className="aside-row">Cut by {active.barber}</div>
                  )}
                  {active.service && active.service !== '—' && (
                    <div className="aside-row">
                      {active.service}
                      {active.duration ? ` • ${active.duration} min` : ''}
                    </div>
                  )}
                  <div className="aside-row">Added {timeAgo(active.createdAt)}</div>

                  <button
                    type="button"
                    className="btn-cta btn-cta--dark w-100 mt-2"
                    onClick={() => onBook(active)}
                  >
                    Book this Style
                  </button>
                </aside>
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </section>
  )
}

/* helpers */
function mk(title, category, src, extra = {}) {
  return {
    id: `${title}-${Math.random().toString(36).slice(2, 8)}`,
    title,
    category,
    src,
    createdAt: Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 7),
    video: extra.video || false,
    thumb: extra.thumb,
    barber: extra.barber || '',
    service: extra.service || '',
    duration: extra.duration || 0,
  }
}
function timeAgo(ts) {
  const s = Math.floor((Date.now() - ts) / 1000)
  const m = Math.floor(s / 60)
  const h = Math.floor(m / 60)
  const d = Math.floor(h / 24)
  if (d > 0) return `${d} day${d > 1 ? 's' : ''} ago`
  if (h > 0) return `${h} hour${h > 1 ? 's' : ''} ago`
  if (m > 0) return `${m} minute${m > 1 ? 's' : ''} ago`
  return 'just now'
}