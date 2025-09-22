import React, { useEffect } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import routes from './routes/routes.jsx'
import Navbar from './components/navbar.jsx'
import Footer from './components/footer.jsx'

// Optional: updates document.title from route meta
function MetaUpdater({ routes }) {
  const location = useLocation()
  useEffect(() => {
    const match = routes.find(r => r.path === location.pathname)
    if (match?.meta?.title) {
      document.title = `${match.meta.title} · The Sharp Look`
    }
  }, [location.pathname, routes])
  return null
}

function App() {
  // Shared props injected into all routed pages (ensure pages accept props)
  const sharedProps = { brand: 'The Sharp Look' }

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <main className="App-main">
          <MetaUpdater routes={routes} />
          <Routes>
            {routes.map(({ path, element }, idx) => (
              <Route
                key={idx}
                path={path}
                element={React.cloneElement(element, sharedProps)}
              />
            ))}
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App