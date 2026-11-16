import { useState } from 'react'
import { Link, Navigate, Route, Routes } from 'react-router-dom'
import { QuotationRequestPage } from './quotations/QuotationRequestPage'
import type { QuotationRequest } from './quotations/quotation-request-schema'
import './App.css'

function App() {
  // Above the routes: navigating does not erase the last valid request.
  const [lastValidRequest, setLastValidRequest] = useState<QuotationRequest | null>(null)
  return (
    <>
      <header className="site-header">
        <Link className="brand" to="/cotizaciones/nueva" aria-label="Distrisel, solicitar cotización"><span className="brand-mark" aria-hidden="true">D↗</span>DISTR<span>ISEL</span></Link>
        <nav aria-label="Navegación principal"><Link to="/cotizaciones/nueva">Solicitar cotización</Link><span className="demo-badge">Demostración</span></nav>
      </header>
      <Routes>
        <Route path="/" element={<Navigate to="/cotizaciones/nueva" replace />} />
        <Route path="/cotizaciones/nueva" element={<QuotationRequestPage lastValidRequest={lastValidRequest} onValidRequest={setLastValidRequest} />} />
        <Route path="*" element={<main className="not-found"><h1>Página no encontrada</h1><Link to="/cotizaciones/nueva">Solicitar una cotización</Link></main>} />
      </Routes>
    </>
  )
}
export default App
