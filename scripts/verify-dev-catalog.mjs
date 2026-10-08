import assert from 'node:assert/strict';
import { products } from '../src/data/catalog.ts';
import { assets } from '../src/data/assets.generated.ts';
const base = 'http://127.0.0.1:4321';
const catalog = await fetch(`${base}/produtos/`);
assert.equal(catalog.status, 200);
const html = await catalog.text();
assert.ok(html.includes('Ambiente de desenvolvimento.'));
assert.equal((html.match(/data-catalog-item/g) ?? []).length, products.length);
for (const product of products) {
  const response = await fetch(`${base}/produtos/${product.slug}/`);
  assert.equal(response.status, 200, product.slug);
  const detail = await response.text();
  assert.equal((detail.match(/<h1(?:\s|>)/g) ?? []).length, 1);
  assert.ok(detail.includes(product.name), product.slug);
  assert.ok(detail.includes('Demonstração de desenvolvimento.'));
  assert.ok(detail.includes(`/contato/?material=${product.slug}#atendimento`));
  assert.ok(detail.includes('corporate-site'));
  assert.ok(detail.includes(assets[product.image].src));
  const image = await fetch(`${base}${assets[product.image].src}`);
  assert.equal(image.status, 200, `Imagem de ${product.slug}`);
  assert.match(image.headers.get('content-type'), /image\/webp/);
}
const contact = await fetch(`${base}/contato/?material=pedrisco`);
assert.equal(contact.status, 200);
assert.ok((await contact.text()).includes('data-quote-form'));
console.log(`Catálogo, ${products.length} detalhes, ${products.length} fotografias e contato: HTTP 200; material encaminhado ao orçamento e identidade editorial preservados.`);
