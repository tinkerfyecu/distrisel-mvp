import { Button, Group, TextInput, Textarea } from '@mantine/core'
import { schemaResolver, useForm } from '@mantine/form'
import { initialQuotationValues, quotationRequestSchema } from './quotation-request-schema'
import type { QuotationFormValues, QuotationRequest } from './quotation-request-schema'

export function QuotationRequestForm({ onValidRequest }: { onValidRequest: (request: QuotationRequest) => void }) {
  const form = useForm<QuotationFormValues>({
    mode: 'controlled', initialValues: initialQuotationValues,
    validate: schemaResolver(quotationRequestSchema, { sync: true }),
  })
  function handleValidSubmit(values: QuotationFormValues) {
    const result = quotationRequestSchema.safeParse(values)
    // Only a valid request can update the summary; invalid attempts keep it intact.
    if (result.success) onValidRequest(result.data)
  }
  function handleCancel() { form.reset() }

  return (
    <form noValidate onSubmit={form.onSubmit(handleValidSubmit)}>
      <div className="section-heading"><span>01</span><div><h2>Datos de contacto</h2><p>Cuéntanos a nombre de quién es la solicitud.</p></div></div>
      <div className="form-fields">
        <TextInput label="Nombre" placeholder="Nombre de la persona o empresa" autoComplete="name" required {...form.getInputProps('name')} />
        <div className="field-grid">
          <TextInput label="Correo electrónico" placeholder="nombre@empresa.com" type="email" autoComplete="email" required {...form.getInputProps('email')} />
          <TextInput label="Teléfono" placeholder="Ej. 0991234567" type="tel" autoComplete="tel" inputMode="numeric" description="Opcional · de 7 a 15 dígitos" {...form.getInputProps('phone')} />
        </div>
      </div>
      <div className="section-heading delivery-heading"><span>02</span><div><h2>Tu requerimiento</h2><p>Indica la cantidad y el lugar de entrega.</p></div></div>
      <div className="product-row"><div><span className="eyebrow">PRODUCTO</span><strong>Diésel</strong></div><span className="product-tag">Producto fijo</span></div>
      <div className="form-fields">
        <TextInput label="Cantidad en galones" placeholder="Ej. 500" inputMode="decimal" required {...form.getInputProps('gallons')} />
        <Textarea label="Lugar de entrega" placeholder="Ciudad, dirección y referencias de ubicación" autoComplete="street-address" minRows={3} required {...form.getInputProps('deliveryLocation')} />
      </div>
      <p className="required-note">Los campos marcados con * son obligatorios.</p>
      <Group justify="flex-end" className="form-actions">
        <Button type="button" variant="default" onClick={handleCancel}>Cancelar</Button>
        <Button type="submit" color="teal.9">Enviar solicitud ↗</Button>
      </Group>
    </form>
  )
}
