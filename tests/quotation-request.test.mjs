import test from 'node:test'
import assert from 'node:assert/strict'
import { schemaResolver, useForm } from '@mantine/form'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { quotationRequestSchema, initialQuotationValues } from '../src/quotations/quotation-request-schema.ts'

const validValues = {
  name: 'Empresa Prueba', email: 'cliente@example.com', phone: '',
  gallons: '500.5', deliveryLocation: 'Guayaquil, bodega 2',
}

test('accepts optional phone, normalizes text and returns numeric gallons', () => {
  const parsed = quotationRequestSchema.parse({ ...validValues, name: '  Ana  ' })
  assert.equal(parsed.name, 'Ana')
  assert.equal(parsed.gallons, 500.5)
  assert.equal(parsed.phone, '')
})

for (const [field, values] of Object.entries({
  name: ['', 'A', '   '],
  email: ['', 'cliente', 'cliente@', 'cliente@dominio'],
  phone: ['123456', '1234567890123456', '+5931234567', '099 1234567', 'abcdefg'],
  gallons: ['', ' ', '0', '-1', 'abc', 'Infinity', 'NaN'],
  deliveryLocation: ['', 'A', '   '],
})) {
  for (const value of values) {
    test(`rejects ${field}=${JSON.stringify(value)} with field error and preserves input`, async () => {
      const input = { ...validValues, [field]: value }
      const before = { ...input }
      const errors = await schemaResolver(quotationRequestSchema)(input)
      assert.ok(errors[field])
      assert.equal(quotationRequestSchema.safeParse(input).success, false)
      assert.deepEqual(input, before)
    })
  }
}

for (const phone of ['', '1234567', '123456789012345']) {
  test(`accepts phone boundary ${JSON.stringify(phone)}`, () => {
    assert.equal(quotationRequestSchema.safeParse({ ...validValues, phone }).success, true)
  })
}

test('accepts minimum name/location length and small positive quantities', () => {
  assert.equal(quotationRequestSchema.safeParse({ ...validValues, name: 'Ab', deliveryLocation: 'Cd', gallons: '0.01' }).success, true)
})

test('empty form produces required errors except optional phone', async () => {
  const errors = await schemaResolver(quotationRequestSchema)(initialQuotationValues)
  assert.deepEqual(Object.keys(errors).sort(), ['deliveryLocation', 'email', 'gallons', 'name'])
})

test('Mantine submit rejects invalid attempts, preserves values and keeps last valid callback result after reset', () => {
  let form
  let summary = null
  let submissions = 0
  function FormProbe() {
    form = useForm({
      mode: 'controlled', initialValues: initialQuotationValues,
      validate: schemaResolver(quotationRequestSchema, { sync: true }),
    })
    return null
  }
  renderToString(createElement(FormProbe))
  const submit = form.onSubmit((values) => {
    summary = quotationRequestSchema.parse(values)
    submissions += 1
  })
  submit()
  assert.equal(summary, null)
  form.setValues(validValues)
  submit()
  assert.equal(submissions, 1)
  const lastValid = summary
  form.setFieldValue('gallons', '-5')
  submit()
  assert.equal(submissions, 1)
  assert.equal(summary, lastValid)
  assert.equal(form.getValues().gallons, '-5')
  assert.equal(form.getValues().email, validValues.email)
  form.reset()
  assert.deepEqual(form.getValues(), initialQuotationValues)
  assert.equal(summary, lastValid)
  assert.equal(submissions, 1)
})
