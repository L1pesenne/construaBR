export function productRequestMessage(name: string): string {
  return `Olá! Estou no site da ConstruaBR Distribuidora e gostaria de solicitar um orçamento para ${name}.`;
}

export function buildWhatsAppUrl(number: string | null, message: string): string | null {
  if (!number || !/^55\d{10,11}$/.test(number)) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export interface QuoteRequest {
  name: string;
  city: string;
  neighborhood: string;
  material: string;
  quantity: string;
  unit: string;
  notes: string;
}

export const quoteLimits = { name: 100, city: 100, neighborhood: 160, material: 160, quantity: 80, unit: 40, notes: 1000 };

export function validateQuote(data: QuoteRequest): Partial<Record<keyof QuoteRequest, string>> {
  const errors: Partial<Record<keyof QuoteRequest, string>> = {};
  for (const field of ['name', 'city', 'neighborhood', 'material'] as const) {
    if (!data[field].trim()) errors[field] = 'Preencha este campo.';
  }
  for (const field of Object.keys(quoteLimits) as (keyof QuoteRequest)[]) {
    if (data[field].length > quoteLimits[field]) errors[field] = `Use até ${quoteLimits[field]} caracteres.`;
  }
  return errors;
}

export function quoteRequestMessage(data: QuoteRequest): string {
  // Campos curtos em uma linha; observações podem preservar parágrafos.
  const line = (value: string) => value.trim().replace(/\s+/g, ' ');
  const quantity = [line(data.quantity), line(data.unit)].filter(Boolean).join(' ');
  return [
    'Olá, ConstruaBR!', '', 'Gostaria de solicitar um orçamento.', '',
    `Nome: ${line(data.name)}`, `Material: ${line(data.material)}`,
    ...(quantity ? [`${data.quantity.trim() ? 'Quantidade' : 'Unidade de referência'}: ${quantity}`] : []),
    `Cidade: ${line(data.city)}`, `Bairro / referência: ${line(data.neighborhood)}`,
    ...(data.notes.trim() ? [`Observações: ${data.notes.trim()}`] : []),
  ].join('\n');
}
