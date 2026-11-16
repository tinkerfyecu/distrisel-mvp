import { z } from 'zod'

export const quotationRequestSchema = z.object({
  name: z.string().trim().min(2, 'Escribe un nombre de al menos 2 caracteres.'),
  email: z.string().trim().email('Escribe un correo electrónico válido.'),
  phone: z.string().trim().regex(/^(?:[0-9]{7,15})?$/, 'Escribe entre 7 y 15 dígitos o deja el teléfono vacío.'),
  gallons: z.string().trim()
    .refine((value) => value !== '' && Number.isFinite(Number(value)) && Number(value) > 0,
      'Escribe una cantidad numérica mayor que cero.')
    .transform(Number),
  deliveryLocation: z.string().trim().min(2, 'Escribe un lugar de entrega de al menos 2 caracteres.'),
})

// Editing values remain strings; a validated request has numeric gallons.
export type QuotationFormValues = z.input<typeof quotationRequestSchema>
export type QuotationRequest = z.output<typeof quotationRequestSchema>
export const initialQuotationValues: QuotationFormValues = {
  name: '', email: '', phone: '', gallons: '', deliveryLocation: '',
}
