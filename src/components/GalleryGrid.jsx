import React from 'react'
import { motion as M } from 'framer-motion'

export default function GalleryGrid({ items = [], onSelect }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05, when: 'beforeChildren' },
    },
  }
  const itemV = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <M.div
      className="gallery-grid"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {items.map((it) => (
        <M.button
          key={it.id}
          type="button"
          className="tile"
          variants={itemV}
          whileHover={{ y: -2, boxShadow: '0 6px 16px rgba(0,0,0,.12)' }}
          onClick={() => onSelect?.(it)}
          aria-label={`Open ${it.title}`}
        >
          <span className="tile-media">
            {it.video ? (
              <>
                <img src={it.thumb || it.src} alt={it.title} loading="lazy" />
                <span className="tile-play" aria-hidden="true">▶</span>
              </>
            ) : (
              <img src={it.src} alt={it.title} loading="lazy" />
            )}
          </span>
          <span className="tile-label">{it.title}</span>
        </M.button>
      ))}
    </M.div>
  )
}