import { FiSearch, FiFilter, FiTag, FiScissors, FiSlash, FiDroplet, FiWind, FiLayers } from 'react-icons/fi'
import { LuSprayCan } from 'react-icons/lu';
import { TbBlade, TbScissors  } from 'react-icons/tb';
import { GiTowel, GiBeard, GiHeartBottle } from 'react-icons/gi';
import { SiKingstontechnology } from 'react-icons/si';
import { PiMaskHappyFill, PiTowelDuotone } from 'react-icons/pi';
import ServiceCard from '../components/ServiceCard.jsx'
import '../styles/service.css'

export default function Services() {
  const featured = [
    { icon: TbScissors, title: 'Classic Cut', price: 30, desc: 'Clean, timeless haircut with precise finish. Includes style.', duration: '30 min', tags: ['Clipper & Shears'], barber: 'Any' },
    { icon: SiKingstontechnology, title: 'Skin Fade', price: 40, desc: 'Ultra-clean fade with razor detailing for a sharp profile.', duration: '45 min', tags: ['Razor Detail'], barber: 'Senior' },
    { icon: GiTowel, title: 'Hot Towel Shave', price: 35, desc: 'Traditional shave, hot towels, rich lather, close finish.', duration: '30 min', tags: ['Straight Razor'], barber: 'Any' },
    { icon: GiBeard, title: 'Beard Shape & Line-Up', price: 25, desc: 'Define lines, trim length, and condition for balance.', duration: '20 min', tags: ['Beard Oil'], barber: 'Any' },
    { icon: LuSprayCan, title: 'Scalp Treatment', price: 28, desc: 'Deep cleanse and rejuvenation for a healthier scalp.', duration: '20 min', tags: ['Cooling Massage'], barber: 'Any' },
    { icon: TbBlade, title: 'The Sharp Package', price: 65, desc: 'Cut + Beard + Hot Towel Shave. Complete refresh.', duration: '75 min', tags: ['Bundle'], barber: 'Senior' },
  ]

  const addons = [
    { icon: PiTowelDuotone, title: 'Hot Towel', price: 8, desc: 'Relaxing towel prep to soften and soothe.', duration: '+10 min' },
    { icon: GiHeartBottle, title: 'Beard Oil Finish', price: 6, desc: 'Condition and shine for a clean finish.', duration: '+5 min' },
    { icon: PiMaskHappyFill, title: 'Black Mask', price: 10, desc: 'Deep pore cleanse for a crisp complexion.', duration: '+10 min' },
  ]

  const categories = [
    { name: 'Haircuts', count: 4 },
    { name: 'Beard', count: 3 },
    { name: 'Shaves', count: 2 },
    { name: 'Treatments', count: 2 },
    { name: 'Packages', count: 3 },
  ]

  return (
    <section className="services-page section">
      <div className="container">
        <header className="mb-3">
          <h1 className="page-title mb-1">Our Services</h1>
          <p className="text-muted mb-2">Premium grooming with a modern edge. Choose a service to book instantly.</p>

          {/* Filter/Search bar */}
          <div className="filter-bar">
            <div className="filter-row">
              <div className="search-wrap">
                <FiSearch className="search-icon" aria-hidden="true" />
                <input className="form-control search-input" type="search" placeholder="Search services" aria-label="Search services" />
              </div>

              <div className="chip-row">
                <button type="button" className="chip" aria-pressed="false">Under 30 min</button>
                <button type="button" className="chip" aria-pressed="false">Budget</button>
              </div>

              <button type="button" className="chip chip-dark">
                <FiFilter aria-hidden="true" />
                <span>Sort</span>
              </button>
            </div>
          </div>
        </header>

        <div className="row g-4">
          {/* Sidebar */}
          <aside className="col-12 col-lg-3">
            <div className="category-card">
              <div className="category-head">Categories</div>
              <ul className="category-list">
                {categories.map((c, i) => (
                  <li key={i}>
                    <a href="#" onClick={(e) => e.preventDefault()} className="category-link">
                      <span>{c.name}</span>
                      <span className="count">{c.count}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Main content */}
          <div className="col-12 col-lg-9">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-2">
              <h2 className="section-title mb-0">Featured</h2>
              <small className="text-muted">Popular picks curated by our barbers.</small>
            </div>

            {/* Featured grid (equal height) */}
            <div className="row g-3 row-eq">
              {featured.map((s, i) => (
                <div key={i} className="col-12 col-md-6 col-xl-4">
                  <ServiceCard {...s} />
                </div>
              ))}
            </div>

            {/* Quick book callout */}
            <div className="quick-book mt-4">
              <div className="quick-book-inner">
                <div className="fw-bold text-white">Know what you want? Book your slot now.</div>
                <a className="btn-ghost btn-ghost--light" href="/booking">Quick Book</a>
              </div>
            </div>

            {/* Add-ons */}
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mt-4 mb-2">
              <h2 className="section-title mb-0">Add-Ons</h2>
              <small className="text-muted">Enhance your service.</small>
            </div>
            <div className="row g-3 row-eq">
              {addons.map((s, i) => (
                <div key={i} className="col-12 col-md-6 col-xl-4">
                  <ServiceCard {...s} addon />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}