import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Bootstrap CSS, then your global overrides
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

// Bootstrap JS (navbar collapse, dropdowns, etc.)
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)