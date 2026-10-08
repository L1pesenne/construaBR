import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { quoteRequestMessage, validateQuote, buildWhatsAppUrl } from '../src/lib/quotation.ts';
import { company, whatsappUrl } from '../src/config/company.ts';

const request = { name: ' Cliente de teste ', city: ' São Gonçalo ', neighborhood: ' Referência de teste ', material: 'Areia Lavada', quantity: '', unit: '', notes: '' };

test('orçamento exige quatro campos e aceita quantidade, unidade e observações vazias', () => {
  assert.deepEqual(validateQuote(request), {});
  for (const field of ['name', 'city', 'neighborhood', 'material']) {
    assert.equal(validateQuote({ ...request, [field]: '   ' })[field], 'Preencha este campo.');
  }
  assert.ok(validateQuote({ ...request, notes: 'a'.repeat(1001) }).notes);
});

test('mensagem preserva acentos e observações, omite opcionais vazios e codifica caracteres especiais', () => {
  const message = quoteRequestMessage({ ...request, quantity: ' 10 ', unit: ' unidade a confirmar ', notes: 'Acesso: portão & referência #1\nConfirmar veículo.' });
  assert.ok(message.startsWith('Olá, ConstruaBR!\n\nGostaria de solicitar um orçamento.'));
  assert.ok(message.includes('Quantidade: 10 unidade a confirmar'));
  assert.ok(message.includes('Cidade: São Gonçalo'));
  assert.ok(message.includes('Observações: Acesso: portão & referência #1\nConfirmar veículo.'));
  const url = new URL(buildWhatsAppUrl(`55219${'0'.repeat(8)}`, message));
  assert.equal(url.searchParams.get('text'), message);
  assert.equal(url.searchParams.size, 1);
  assert.equal(url.hash, '');
  assert.ok(!quoteRequestMessage(request).includes('Quantidade:'));
  assert.ok(!quoteRequestMessage(request).includes('Observações:'));
  assert.ok(quoteRequestMessage({ ...request, unit: 'a confirmar' }).includes('Unidade de referência: a confirmar'));
  assert.equal(buildWhatsAppUrl(null, message), null);
});

test('produção oferece formulário e FAQ, usa contato oficial e exclui produtos demonstrativos das opções', () => {
  const contact = readFileSync('dist/contato/index.html', 'utf8');
  assert.ok(contact.includes('data-quote-form'));
  assert.ok(contact.includes('Informar material / consultar disponibilidade'));
  assert.ok(!contact.includes('value="areia-lavada"'));
  assert.equal((contact.match(/<details\b/g) ?? []).length, 7);
  if (whatsappUrl()) {
    assert.ok(contact.includes(`data-number="${company.whatsapp}"`));
    assert.ok(!contact.includes('WhatsApp em preparação.'));
    assert.ok(contact.includes(`href="mailto:${company.email}"`));
  } else {
    assert.ok(contact.includes('WhatsApp em preparação.'));
    assert.ok(!contact.includes('data-number='));
  }
  for (const route of ['index.html', 'sobre/index.html', 'entregas/index.html', 'contato/index.html']) {
    const html = readFileSync(`dist/${route}`, 'utf8');
    assert.ok(html.includes('class="floating-contact"'));
    assert.ok(!html.includes('institucional em preparação'));
  }
});
