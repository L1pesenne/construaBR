import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { products } from '../src/data/catalog.ts';
import { canPublishProduct, selectVisibleProducts, matchesCatalogFilter } from '../src/lib/catalog.ts';
import { buildWhatsAppUrl, productRequestMessage } from '../src/lib/quotation.ts';

const search = (query, categories = []) => products.filter(product => matchesCatalogFilter(`${product.name} ${product.description} ${product.detailedDescription}`, product.category, query, categories));

test('busca normaliza acentos, maiúsculas, espaços e combina termos', () => {
  assert.deepEqual(search('  VOLEI  ').map(product => product.slug), ['areia-quadra-esportiva']);
  assert.deepEqual(search('  branca  FINA ').map(product => product.slug), ['areia-lavada-fina-branca']);
  assert.equal(search('material inexistente').length, 0);
});

test('categorias combinam por união e restringem a pesquisa', () => {
  const categories = ['Esportes', 'Alvenaria'];
  assert.equal(search('', categories).length, 3);
  assert.equal(search('volei', categories).length, 1);
  assert.equal(search('volei', ['Areias']).length, 0);
  assert.equal(search('', []).length, products.length);
});

test('aprovação isolada não publica pendências ou referências de fornecedor', () => {
  const samples = [
    { status: 'approved', confirmation: 'confirmed' },
    { status: 'approved', confirmation: 'pending' },
    { status: 'approved', confirmation: 'supplier-reference' },
    { status: 'demo', confirmation: 'pending' },
    { status: 'draft', confirmation: 'confirmed' },
  ];
  assert.deepEqual(selectVisibleProducts(samples, false), [samples[0]]);
  assert.deepEqual(selectVisibleProducts(samples, true), [samples[0], samples[3]]);
  assert.equal(canPublishProduct(samples[2]), false);
  assert.equal(selectVisibleProducts(products, false).length, 0);
  assert.equal(selectVisibleProducts(products, true).length, 11);
});

test('orçamento identifica cada material; número ausente ou inválido não gera contato', () => {
  // Número sintético apenas para testar formatação; nunca renderizado nem utilizado para enviar mensagem.
  const fixtureNumber = `55219${'0'.repeat(8)}`;
  for (const product of products) {
    const message = productRequestMessage(product.name);
    assert.ok(message.includes(product.name));
    assert.equal(buildWhatsAppUrl(null, message), null);
    assert.equal(buildWhatsAppUrl('pendente', message), null);
    assert.equal(new URL(buildWhatsAppUrl(fixtureNumber, message)).searchParams.get('text'), message);
  }
});

test('referências têm IDs/URLs únicos, fonte existente e nenhuma ficha técnica inventada', () => {
  assert.equal(new Set(products.map(product => product.id)).size, products.length);
  assert.equal(new Set(products.map(product => product.slug)).size, products.length);
  for (const product of products) {
    assert.match(product.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.ok(existsSync(product.sourceDocument.path));
    assert.ok(existsSync(product.sourceImage));
    assert.ok(product.detailedDescription.length > product.description.length);
    assert.equal(product.referenceUnit, null);
    assert.equal(product.technicalCharacteristics.length, 0);
  }
});
