import { FiCalendar } from 'react-icons/fi'
import '../styles/navbar.css'

export default function Navbar() {
  return (
    <header className="site-header">
      <nav className="navbar navbar-expand-lg site-navbar sticky-top">
        <div className="container">
          {/* Brand */}
          <a className="navbar-brand d-inline-flex align-items-center gap-2" href="/">
            <span className="brand-icon">
              {/* Decorative logo image; brand text provides the accessible name */}
              <img
                className="brand-logo"
                src="/images/logo.png"
                alt=""
                width={"60px"}
                height={"60px"}
                loading="eager"
                decoding="async"
              />
            </span>
            <span className="brand-name">The Sharp Look</span>
          </a>

          {/* Toggler */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#siteNav"
            aria-controls="siteNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          {/* Nav + CTA */}
          <div className="collapse navbar-collapse" id="siteNav">
            <ul className="navbar-nav mx-lg-auto gap-lg-4 mt-3 mt-lg-0">
              <li className="nav-item"><a className="nav-link" href="/">Home</a></li>
              <li className="nav-item"><a className="nav-link" href="/services">Services</a></li>
              <li className="nav-item"><a className="nav-link" href="/booking">Booking</a></li>
              <li className="nav-item"><a className="nav-link" href="/gallery">Gallery</a></li>
              <li className="nav-item"><a className="nav-link" href="/contact">Contact</a></li>
            </ul>

            <div className="ms-lg-3">
              <a href="/booking" className="nav-cta chip w-100 w-lg-auto d-inline-flex align-items-center justify-content-center gap-2">
                <FiCalendar aria-hidden="true" /> <span>Book Now</span>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}