import { company } from '../config/company';

export const faq = [
  { question: 'Vocês vendem materiais ensacados?', answer: 'Não. A ConstruaBR trabalha exclusivamente com materiais a granel. Não oferecemos produtos ensacados ou fracionados.' },
  { question: 'Como solicitar um orçamento?', answer: 'Preencha o formulário de contato com seu nome, material e local de entrega. Revise a mensagem e abra o WhatsApp para confirmar o envio. A equipe verifica disponibilidade, quantidade e condições do pedido. Enquanto o número oficial estiver pendente, o site permite preparar a mensagem, mas não encaminhá-la.' },
  { question: 'Como funciona a entrega?', answer: 'O transporte é realizado exclusivamente em caminhões basculantes, dimensionados conforme o volume do pedido. Informe o endereço e as condições de acesso à obra para a equipe confirmar a viabilidade da entrega.' },
  { question: 'Qual é o prazo de entrega?', answer: `O prazo é de ${company.deliveryHours} horas após a aprovação do pedido pelo WhatsApp, conforme as condições operacionais da empresa. Solicitar um orçamento não significa que o pedido foi aprovado.` },
  { question: 'Quais regiões são atendidas?', answer: `As regiões de destaque são Baixada Fluminense, Região Metropolitana do RJ, Niterói, São Gonçalo, Angra dos Reis, Volta Redonda e Barra Mansa. Cada endereço deve estar no raio máximo de ${company.serviceRadiusKm} km da base e depende da cobertura efetiva e das condições operacionais. Consulte a equipe antes de confirmar o pedido.` },
  { question: 'Como informar a quantidade necessária?', answer: 'Informe uma estimativa e a unidade de referência, se souber. Esses campos são opcionais. Caso tenha dúvidas, descreva a necessidade da obra nas observações para alinhar o volume com a equipe.' },
  { question: 'É possível pagar pelo site?', answer: 'Não. O site apresenta a empresa e permite preparar solicitações de orçamento. A negociação e as condições do pedido são tratadas diretamente pelo WhatsApp; não há vendas ou pagamentos no site.' },
];
