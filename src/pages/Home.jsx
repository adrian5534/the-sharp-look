import { FiCalendar, FiArrowRight, FiMapPin, FiClock, FiStar } from 'react-icons/fi'
import '../styles/home.css'

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="hero-section">
        <div
          className="hero-card container"
          style={{
            // Replace with your asset: /src/assets/hero.jpg
            backgroundImage:
              "url('https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=1600&auto=format&fit=crop')",
          }}
        >
          <div className="hero-overlay" />
          <div className="hero-content">
            <span className="badge-soft">Premium Grooming</span>
            <h1 className="hero-title">Look Sharp. Feel Confident.</h1>
            <p className="hero-sub">
              Modern cuts, precision shaves, and tailored care. Book a seat with barbers who take craft seriously.
            </p>

            <div className="hero-actions">
              <a href="/booking" className="btn-cta">
                <FiCalendar aria-hidden="true" />
                <span>Book Now</span>
              </a>
              <a href="/services" className="btn-ghost">
                <span>Explore Services</span>
                <FiArrowRight aria-hidden="true" />
              </a>
            </div>

            <div className="hero-stats">
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
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="section">
        <div className="container">
          <div className="row g-4 align-items-start">
            <div className="col-12 col-lg-5">
              <h2 className="section-title mb-2">About Us</h2>
              <p className="text-muted mb-0">
                A modern barbershop built on craft, consistency, and comfort. We blend classic techniques with
                contemporary style to keep you looking your best.
              </p>
            </div>

            <div className="col-12 col-lg-7">
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <div className="tile">
                    <div className="tile-head">Our Promise</div>
                    <p className="tile-text">
                      Premium tools, meticulous attention, and a relaxed experience every visit.
                    </p>
                    <div className="d-grid gap-2">
                      <div className="list-pill">
                        <span>Precision Cuts</span>
                      </div>
                      <div className="list-pill">
                        <span>Hot Towel Shaves</span>
                      </div>
                      <div className="list-pill">
                        <span>Beard Mastery</span>
                      </div>
                      <div className="list-pill">
                        <span>Scalp Care</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <div className="tile">
                    <div className="tile-head">Meet Your Barbers</div>
                    <p className="tile-text">
                      A team of seasoned pros focused on getting every detail right.
                    </p>
                    <div className="avatar-row">
                      <span className="avatar" />
                      <span className="avatar" />
                      <span className="avatar" />
                      <span className="avatar" />
                    </div>
                    <div className="d-flex gap-2 mt-2">
                      <a href="/about" className="btn-ghost btn-sm">Our Story</a>
                      <a href="/team" className="btn-cta btn-sm">Meet the Team</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="section section-accent">
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-2 mb-3">
            <h2 className="section-title text-on-dark mb-0">Featured Services</h2>
            <p className="text-on-dark-70 mb-0">
              A few of our most-booked options. Explore the full list on Services.
            </p>
          </div>

          <div className="row g-3">
            {[
              { name: 'Classic Cut', price: 30, desc: 'Clean, timeless haircut with precise finish.' },
              { name: 'Hot Towel Shave', price: 35, desc: 'Traditional shave with rich lather and close finish.' },
              { name: 'Beard Shape', price: 25, desc: 'Define lines, trim length, and condition.' },
            ].map((s, i) => (
              <div className="col-12 col-md-6 col-lg-4" key={i}>
                <div className="service-card">
                  <div className="d-flex justify-content-between align-items-start">
                    <h3 className="service-title">{s.name}</h3>
                    <span className="price">${s.price}</span>
                  </div>
                  <p className="service-desc">{s.desc}</p>
                  <a href="/booking" className="btn-cta w-100">Book</a>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-3">
            <a href="/services" className="btn-ghost">View All Services</a>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section">
        <div className="container">
          <div className="row g-3 align-items-start">
            <div className="col-12 col-lg-4">
              <h2 className="section-title mb-1">Testimonials</h2>
              <p className="text-muted mb-0">What our clients say about their Sharp Look.</p>
            </div>
            <div className="col-12 col-lg-8">
              <div className="row g-3">
                {[
                  { name: 'Marcus T.', svc: 'Classic Cut', text: "Best fade I've had in years. The detail is next-level." },
                  { name: 'Alex B.', svc: 'Beard Shape', text: 'They really listen and shape to your face. Clean lines.' },
                  { name: 'Jordan P.', svc: 'Hot Towel Shave', text: 'Relaxing and precise. Walked out feeling brand new.' },
                ].map((t, i) => (
                  <div className="col-12 col-md-6 col-xl-4" key={i}>
                    <div className="testimonial-card">
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <span className="avatar avatar-sm" />
                        <div>
                          <div className="fw-semibold">{t.name}</div>
                          <div className="text-muted small">{t.svc}</div>
                        </div>
                      </div>
                      <p className="mb-0">{t.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="cta-band">
        <div className="container">
          <div className="cta-wrap">
            <div className="cta-text">Ready for your next cut? Secure your time now.</div>
            <a href="/booking" className="btn-ghost btn-ghost--light">
              <FiCalendar aria-hidden="true" />
              <span>Book Appointment</span>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}