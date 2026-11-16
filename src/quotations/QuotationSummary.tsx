import type { QuotationRequest } from './quotation-request-schema'

export function QuotationSummary({ request }: { request: QuotationRequest | null }) {
  return (
    <section className="summary-card" aria-labelledby="summary-title" aria-live="polite" aria-atomic="true">
      <span className="eyebrow">TU SOLICITUD</span>
      <h2 id="summary-title">{request ? 'Solicitud registrada' : 'Resumen de solicitud'}</h2>
      {request ? <>
        <p className="success-message" role="status">Solicitud recibida en esta demostración. Pendiente de cotización</p>
        <dl className="summary-details">
          <div><dt>Producto</dt><dd>Diésel</dd></div>
          <div><dt>Galones</dt><dd>{request.gallons.toLocaleString('es-EC', { maximumSignificantDigits: 21 })}</dd></div>
          <div><dt>Nombre</dt><dd>{request.name}</dd></div>
          <div><dt>Correo electrónico</dt><dd>{request.email}</dd></div>
          <div><dt>Teléfono</dt><dd>{request.phone || 'No proporcionado'}</dd></div>
          <div><dt>Lugar de entrega</dt><dd>{request.deliveryLocation}</dd></div>
        </dl>
        <p className="summary-note">Este es el último envío válido. Se conserva mientras esta página permanezca abierta.</p>
      </> : <div className="empty-summary"><span aria-hidden="true">▤</span><h3>Aún no hay una solicitud</h3><p>Completa el formulario y envíalo para ver aquí el resumen de tu requerimiento.</p></div>}
    </section>
  )
}
