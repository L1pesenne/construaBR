/** null = informação pendente de confirmação por Alessandro. */
export const company = {
  name: 'ConstruaBR Distribuidora',
  contactName: 'Alessandro',
  whatsapp: '5521995471761' as string | null, // Atendimento oficial: (21) 99547-1761.
  email: 'atendimento@construabr.com' as string | null,
  address: null as string | null,
  baseCity: null as string | null,
  domain: null as string | null, // URL HTTPS oficial, sem barra final.
  businessHours: null as string | null,
  socialLinks: [] as { label: string; url: string }[],
  deliveryHours: 24,
  serviceRadiusKm: 120,
  deliveryConditions: 'Após a aprovação do pedido pelo WhatsApp, conforme as condições operacionais da empresa.',
};

export function whatsappUrl(message = 'Olá! Gostaria de solicitar um orçamento de materiais a granel.') {
  return buildWhatsAppUrl(company.whatsapp, message);
}
import { buildWhatsAppUrl } from '../lib/quotation.ts';

