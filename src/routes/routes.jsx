import Home from '../pages/Home.jsx'
import Services from '../pages/Services.jsx'
import Booking from '../pages/Booking.jsx'
import Gallery from '../pages/Gallery.jsx'
import Contact from '../pages/Contact.jsx'

// Placeholder factory for pages not built yet (must forward props)
const makePlaceholder = (title) => (props) => (
  <div className="container section">
    <h1 className="section-title">{title}</h1>
    <p className="text-muted">Coming soon.</p>
    {/* Example using forwarded props: */}
    {props?.brand && <small className="text-muted">Brand: {props.brand}</small>}
  </div>
)


const NotFound = makePlaceholder('Not Found')

const routes = [
  {
    path: '/',
    element: <Home />,
    meta: {
      title: 'Home',
      description: 'Premium cuts, shaves, and grooming at The Sharp Look.',
    },
  },
  {
    path: '/services',
    element: <Services />,
    meta: {
      title: 'Services',
      description: 'Explore our haircut, shave, and grooming services.',
    },
  },
  {
    path: '/booking',
    element: <Booking />,
    meta: {
      title: 'Booking',
      description: 'Reserve your appointment at The Sharp Look.',
    },
  },
  {
    path: '/gallery',
    element: <Gallery />,
    meta: {
      title: 'Gallery',
      description: 'See our latest cuts and styles.',
    },
  },
  {
    path: '/contact',
    element: <Contact />,
    meta: {
      title: 'Contact',
      description: 'Get in touch with The Sharp Look.',
    },
  },
  {
    path: '*',
    element: <NotFound />,
    meta: {
      title: 'Not Found',
      description: 'The page you’re looking for does not exist.',
    },
  },
]

export default routes