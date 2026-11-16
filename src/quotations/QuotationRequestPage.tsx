import { QuotationRequestForm } from './QuotationRequestForm'
import { QuotationSummary } from './QuotationSummary'
import type { QuotationRequest } from './quotation-request-schema'

type Props = {
  lastValidRequest: QuotationRequest | null
  onValidRequest: (request: QuotationRequest) => void
}
export function QuotationRequestPage({ lastValidRequest, onValidRequest }: Props) {
  return (
    <main className="quotation-page">
      <div className="page-intro"><span className="eyebrow">DISTRIBUCIÓN DE COMBUSTIBLE</span><h1>Tu próxima entrega<br /><span>comienza aquí.</span></h1><p>Solicita una cotización de diésel con los datos de tu requerimiento.</p></div>
      <div className="demo-notice"><span aria-hidden="true">ⓘ</span><p><strong>Estás en una demostración.</strong> Los datos se guardan solo en esta página. No se envían solicitudes ni correos reales.</p></div>
      <div className="quotation-layout">
        <section className="form-card" aria-labelledby="form-title"><div className="card-heading"><h2 id="form-title">Solicitar cotización</h2><span>Sin registro</span></div><QuotationRequestForm onValidRequest={onValidRequest} /></section>
        <aside><QuotationSummary request={lastValidRequest} /><section className="next-card"><span className="eyebrow">EL SIGUIENTE PASO</span><h2>Primero, tu requerimiento.</h2><p>El resumen confirma los datos de esta demostración. La preparación de una cotización queda pendiente.</p></section></aside>
      </div>
      <footer className="page-footer"><strong>DISTR<span>ISEL</span></strong><span>Solicitud pública de cotización · Demostración</span></footer>
    </main>
  )
}
