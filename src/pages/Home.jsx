import { FiCalendar, FiArrowRight, FiMapPin, FiClock, FiStar } from 'react-icons/fi'
import { motion as M } from 'framer-motion'
import '../styles/home.css'

export default function Home() {
  // local image helpers (served from /public)
  const svc = (file) => `/images/gallery/${file}`
  const barber = (file) => `/images/barbers/${file}`

  const team = [
    { name: 'Marcus Reed', photo: barber('marcus.jpg') },
    { name: 'Ava Brooks', photo: barber('ava.jpg') },
    { name: 'Diego Alvarez', photo: barber('diego.jpg') },
    { name: 'Nina Carter', photo: barber('nina.jpg') },
  ]

  const services = [
    { name: 'Classic Cut', price: 30, desc: 'Clean, timeless haircut with precise finish.', img: svc('classic-cut.jpg') },
    { name: 'Skin Fade', price: 45, desc: 'Seamless blend to skin with detailed finish.', img: svc('skin-fade.jpg') },
    { name: 'Hot Towel Shave', price: 35, desc: 'Traditional shave with rich lather and close finish.', img: svc('hot-towel-shave.jpg') },
    { name: 'Beard Shape', price: 25, desc: 'Define lines, trim length, and condition.', img: svc('beard-shape.jpg') },
    { name: 'Kids Cut', price: 25, desc: 'Fresh cuts for ages 10 and under.', img: svc('kids-cut.jpg') },
    { name: 'Scalp Treatment', price: 30, desc: 'Revitalize scalp with therapeutic treatment.', img: svc('scalp-treatment.jpg') },
  ]

  // motion presets
  const fadeUp = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }
  const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { when: 'beforeChildren', staggerChildren: 0.08 } } }

  return (
    <>
      {/* Hero */}
      <M.section
        className="hero-section"
        initial="hidden"
        animate="show"
        variants={stagger}
      >
        <div
          className="hero-card container"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=1600&auto=format&fit=crop')",
          }}
        >
          <div className="hero-overlay" />
          <M.div className="hero-content" variants={fadeUp}>
            <span className="badge-soft">Premium Grooming</span>
            <h1 className="hero-title">Look Sharp. Feel Confident.</h1>
            <p className="hero-sub">
              Modern cuts, precision shaves, and tailored care. Book a seat with barbers who take craft seriously.
            </p>

            <M.div className="hero-actions" variants={fadeUp}>
              <a href="/booking" className="btn-cta">
                <FiCalendar aria-hidden="true" />
                <span>Book Now</span>
              </a>
              <a href="/services" className="btn-ghost">
                <span>Explore Services</span>
                <FiArrowRight aria-hidden="true" />
              </a>
            </M.div>

            <M.div className="hero-stats" variants={fadeUp}>
              <span className="stat-chip">
                <FiStar aria-hidden="true" />
                <span>4.9 Rated</span>
              </span>
              <span className="stat-chip">
                <FiClock aria-hidden="true" />
                <span>Open Today 9–7</span>
              </span>
              <span className="stat-chip">
                <FiMapPin aria-hidden="true" />
                <span>Downtown</span>
              </span>
            </M.div>
          </M.div>
        </div>
      </M.section>

      {/* About */}
      <M.section
        className="section"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
      >
        <div className="container">
          <div className="row g-4 align-items-start">
            <div className="col-12 col-lg-5">
              <M.h2 className="section-title mb-2" variants={fadeUp}>About Us</M.h2>
              <M.p className="text-muted mb-0" variants={fadeUp}>
                A modern barbershop built on craft, consistency, and comfort. We blend classic techniques with
                contemporary style to keep you looking your best.
              </M.p>
            </div>

            <div className="col-12 col-lg-7">
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <M.div className="tile" style={{ padding: '10px'}} variants={fadeUp}>
                    <div className="tile-head">Our Promise</div>
                    <p className="tile-text">
                      Premium tools, meticulous attention, and a relaxed experience every visit.
                    </p>
                    <div className="d-grid gap-2">
                      <div className="list-pill"><span>Precision Cuts</span></div>
                      <div className="list-pill"><span>Hot Towel Shaves</span></div>
                      <div className="list-pill"><span>Beard Mastery</span></div>
                      <div className="list-pill"><span>Scalp Care</span></div>
                    </div>
                  </M.div>
                </div>

                <div className="col-12 col-md-6">
                  <M.div className="tile" style={{ padding: '10px'}} variants={fadeUp}>
                    <div className="tile-head">Meet Your Barbers</div>
                    <p className="tile-text">
                      A team of seasoned pros focused on getting every detail right.
                    </p>
                    <div className="avatar-row">
                      {team.map((t, i) => (
                        <img key={i} className="avatar" src={t.photo} alt={t.name} loading="lazy" />
                      ))}
                    </div>
                    <div className="d-flex gap-2 mt-2">
                      <a href="/about" className="btn-ghost btn-sm">Our Story</a>
                      <a href="/team" className="btn-cta btn-sm">Meet the Team</a>
                    </div>
                  </M.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </M.section>

      {/* Featured Services (6) */}
      <M.section
        className="section section-accent"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={stagger}
      >
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-2 mb-3">
            <M.h2 className="section-title text-on-dark mb-0" variants={fadeUp}>Featured Services</M.h2>
            <M.p className="text-on-dark-70 mb-0" variants={fadeUp}>
              A few of our most-booked options. Explore the full list on Services.
            </M.p>
          </div>

          <div className="row g-3">
            {services.map((s, i) => (
              <div className="col-12 col-md-6 col-lg-4" key={i}>
                <M.div
                  className="service-card"
                  variants={fadeUp}
                  whileHover={{ y: -2 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                >
                  <div className="service-media">
                    <img src={s.img} alt={s.name} loading="lazy" />
                  </div>
                  <div className="d-flex justify-content-between align-items-start">
                    <h3 className="service-title">{s.name}</h3>
                    <span className="price">${s.price}</span>
                  </div>
                  <p className="service-desc">{s.desc}</p>
                  <a href="/booking" className="btn-cta w-100">Book</a>
                </M.div>
              </div>
            ))}
          </div>

          <div className="text-center mt-3">
            <a href="/services" className="btn-ghost">View All Services</a>
          </div>
        </div>
      </M.section>

      {/* Testimonials */}
      <M.section
        className="section"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
      >
        <div className="container">
          <div className="row g-3 align-items-start">
            <div className="col-12 col-lg-4">
              <M.h2 className="section-title mb-1" variants={fadeUp}>Testimonials</M.h2>
              <M.p className="text-muted mb-0" variants={fadeUp}>What our clients say about their Sharp Look.</M.p>
            </div>
            <div className="col-12 col-lg-8">
              <div className="row g-3">
                {[
                  { name: 'Marcus T.', svc: 'Classic Cut', text: "Best fade I've had in years. The detail is next-level." },
                  { name: 'Alex B.',   svc: 'Beard Shape', text: 'They really listen and shape to your face. Clean lines.' },
                  { name: 'Jordan P.', svc: 'Hot Towel Shave', text: 'Relaxing and precise. Walked out feeling brand new.' },
                ].map((t, i) => (
                  <div className="col-12 col-md-6 col-xl-4" key={i}>
                    <M.div className="testimonial-card" variants={fadeUp}>
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <img className="avatar avatar-sm" src={team[i % team.length].photo} alt="" />
                        <div>
                          <div className="fw-semibold">{t.name}</div>
                          <div className="text-muted small">{t.svc}</div>
                        </div>
                      </div>
                      <p className="mb-0">{t.text}</p>
                    </M.div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </M.section>

      {/* CTA Band */}
      <M.section
        className="cta-band"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.25 }}
      >
        <div className="container">
          <div className="cta-wrap">
            <div className="cta-text">Ready for your next cut? Secure your time now.</div>
            <a href="/booking" className="btn-ghost btn-ghost--light">
              <FiCalendar aria-hidden="true" />
              <span>Book Appointment</span>
            </a>
          </div>
        </div>
      </M.section>
    </>
  )
}