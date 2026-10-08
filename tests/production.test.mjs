import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import sharp from 'sharp';
import { products } from '../src/data/catalog.ts';
import { canPublishProduct } from '../src/lib/catalog.ts';
import { company, whatsappUrl } from '../src/config/company.ts';

const dist = resolve('dist');
function htmlFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? htmlFiles(join(dir, entry.name)) : entry.name.endsWith('.html') ? [join(dir, entry.name)] : []);
}

test('build contém todas as rotas institucionais', () => {
  for (const route of ['index.html', 'produtos/index.html', 'sobre/index.html', 'entregas/index.html', 'contato/index.html', '404.html']) {
    assert.ok(existsSync(join(dist, route)), `Rota ausente: ${route}. Execute npm run build antes dos testes.`);
  }
});

test('produção não publica os exemplos de materiais', () => {
  for (const product of products.filter(item => !canPublishProduct(item))) {
    assert.equal(existsSync(join(dist, 'produtos', product.slug, 'index.html')), false, `Referência não aprovada publicada: ${product.slug}`);
  }
  const home = readFileSync(join(dist, 'index.html'), 'utf8');
  assert.ok(!home.includes('Demonstração · pendente de validação'));
  if (!products.some(canPublishProduct)) assert.ok(home.includes('Nosso catálogo está em preparação'));
  const catalog = readFileSync(join(dist, 'produtos/index.html'), 'utf8');
  const contact = readFileSync(join(dist, 'contato/index.html'), 'utf8');
  for (const product of products.filter(item => !canPublishProduct(item))) {
    assert.ok(!catalog.includes(`/produtos/${product.slug}/`));
    assert.ok(!contact.includes(`"slug":"${product.slug}"`), 'Contato público não deve carregar referências não aprovadas');
  }
});

test('links e recursos locais apontam para arquivos existentes; sem recursos remotos', () => {
  for (const file of htmlFiles(dist)) {
    const html = readFileSync(file, 'utf8');
    for (const [, attr, url] of html.matchAll(/\b(href|src)="([^"]+)"/g)) {
      if (!url.startsWith('/')) {
        if (attr === 'src') assert.ok(!/^https?:/.test(url), `Recurso remoto em ${file}: ${url}`);
        continue;
      }
      const pathname = url.split(/[?#]/)[0];
      const target = join(dist, pathname.endsWith('/') ? `${pathname}index.html` : pathname);
      assert.ok(existsSync(target), `Link quebrado em ${file}: ${url}`);
    }
    assert.match(html, /<html lang="pt-BR"/);
    assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length, 1, `Esperado um h1 em ${file}`);
    for (const img of html.matchAll(/<img\b[^>]*>/g)) assert.match(img[0], /\balt="[^"]*"/);
    for (const [, srcset] of html.matchAll(/\bsrcset="([^"]+)"/g)) {
      for (const variant of srcset.split(',')) {
        const src = variant.trim().split(/\s+/)[0];
        assert.ok(src.startsWith('/'), `Imagem responsiva externa: ${src}`);
        assert.ok(existsSync(join(dist, src)), `Imagem responsiva ausente: ${src}`);
      }
    }
    for (const [, href] of html.matchAll(/href="(https:\/\/wa\.me\/[^\"]+)"/g)) {
      assert.ok(whatsappUrl(), 'Não deve existir link WhatsApp sem número configurado');
      const contact = new URL(href.replaceAll('&amp;', '&'));
      assert.equal(contact.pathname, `/${company.whatsapp}`, 'Todos os links devem usar o contato central');
      assert.ok(contact.searchParams.get('text'), 'Conversa deve ter mensagem preparada');
    }
  }
});

test('logo original é preservado e fotos otimizadas mantêm proporção', async () => {
  assert.deepEqual(readFileSync(join(dist, 'images/brand/construabr.svg')), readFileSync('imagens/logo_construabr.svg'));
  const report = JSON.parse(readFileSync('docs/ASSETS_OTIMIZADOS.json', 'utf8'));
  for (const item of report) {
    for (const variant of item.variants) {
      const image = await sharp(join(dist, variant.src)).metadata();
      assert.equal(image.format, 'webp');
      assert.ok(image.width <= item.sourceWidth, `Ampliação artificial: ${variant.src}`);
      const expectedHeight = image.width * item.sourceHeight / item.sourceWidth;
      assert.ok(Math.abs(image.height - expectedHeight) <= 1, `Imagem distorcida: ${variant.src}`);
    }
    const largest = item.variants.at(-1);
    assert.ok(largest.bytes < item.sourceBytes, `Versão otimizada maior que o original: ${item.key}`);
  }
});
