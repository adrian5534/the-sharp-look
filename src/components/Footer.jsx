import { FiPhone, FiMapPin, FiMail, FiInstagram, FiFacebook } from 'react-icons/fi'
import '../styles/footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer py-5" role="contentinfo">
      <div className="container">
        <div className="row gy-5 gx-lg-4 align-items-start">
          {/* Brand + blurb */}
          <div className="col-12 col-lg-4">
            <div className="d-inline-flex align-items-center gap-2 mb-1 footer-brand">
              <img
                className="footer-logo"
                src="/images/logo.png"
                alt="The Sharp Look"
                width={36}
                height={36}
                loading="lazy"
                decoding="async"
              />
              <span className="fw-bold fs-5">The Sharp Look</span>
            </div>
            <p className="brand-blurb mb-3">
              Premium grooming with a modern edge. Open 7 days a week.
            </p>

            <div className="d-flex flex-wrap gap-2" aria-label="Primary contact methods">
              <a className="chip d-inline-flex align-items-center gap-2" href="tel:+15551234567" aria-label="Call us">
                <FiPhone aria-hidden="true" /> <span>(555) 123-4567</span>
              </a>
              <a
                className="chip d-inline-flex align-items-center gap-2"
                href="https://maps.apple.com/?q=221+Barber+St,+Suite+3"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get directions"
              >
                <FiMapPin aria-hidden="true" /> <span>221 Barber St, Suite 3</span>
              </a>
            </div>
          </div>

          {/* Explore */}
          <nav className="col-6 col-md-4 col-lg-2" aria-label="Explore">
            <h6 className="footer-title fw-bold mb-3">Explore</h6>
            <ul className="list-unstyled d-grid gap-2 mb-0">
              <li><a href="/">Home</a></li>
              <li><a href="/services">Services</a></li>
              <li><a href="/booking">Booking</a></li>
              <li><a href="/gallery">Gallery</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </nav>

          {/* Hours */}
          <section className="col-6 col-md-4 col-lg-3" aria-label="Hours">
            <h6 className="footer-title fw-bold mb-3">Hours</h6>
            <ul className="hours-list mb-0">
              <li><span>Mon–Fri</span><span>9:00a – 8:00p</span></li>
              <li><span>Sat</span><span>9:00a – 6:00p</span></li>
              <li><span>Sun</span><span>10:00a – 4:00p</span></li>
              <li className="mt-2"><a className="hours-link" href="/hours">Holiday Hours</a></li>
            </ul>
          </section>

          {/* Get in touch */}
          <nav className="col-12 col-md-4 col-lg-3" aria-label="Get in touch">
            <h6 className="footer-title fw-bold mb-3">Get in touch</h6>
            <ul className="list-unstyled d-grid gap-2 mb-0">
              <li>
                <a href="mailto:hello@thesharplook.com" className="d-inline-flex align-items-center gap-2">
                  <FiMail aria-hidden="true" /> <span>hello@thesharplook.com</span>
                </a>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="d-inline-flex align-items-center gap-2">
                  <FiInstagram aria-hidden="true" /> <span>Instagram</span>
                </a>
              </li>
              <li>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="d-inline-flex align-items-center gap-2">
                  <FiFacebook aria-hidden="true" /> <span>Facebook</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <hr className="footer-divider my-4" />

        <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3 text-white-50 small">
          <div className="d-flex flex-column gap-1">
            <span>© {year} The Sharp Look. All rights reserved.</span>
            <span className="footer-credits">Credits: Adrian Reynolds  |  Powered by YSB Academy LLC</span>
          </div>
          <nav aria-label="Legal">
            <ul className="nav gap-3">
              <li className="nav-item"><a className="nav-link p-0" href="/privacy">Privacy</a></li>
              <li className="nav-item"><a className="nav-link p-0" href="/terms">Terms</a></li>
              <li className="nav-item"><a className="nav-link p-0" href="/accessibility">Accessibility</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}