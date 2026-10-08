import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { resolve, join, extname } from 'node:path';
import { homedir } from 'node:os';
import { createServer } from 'node:http';

// Navegador local autorizado pelo proprietário; perfil temporário, sem sessão pessoal.
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_PATH || join(homedir(), '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright'));
const output = resolve('artifacts/revisao-final');
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.BROWSER_PATH || 'C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe', headless: true });
const failures = [];
const report = { pages: [], interactions: [], errors: [], screenshots: [] };
const context = await browser.newContext({ deviceScaleFactor: 1, locale: 'pt-BR', reducedMotion: 'reduce' });
const page = await context.newPage();
page.on('pageerror', error => report.errors.push(String(error)));
page.on('console', message => { if (message.type() === 'error') report.errors.push(message.text()); });
const base = 'http://127.0.0.1:4321';
const routes = [['home', '/'], ['catalogo', '/produtos/'], ['produto', '/produtos/areia-lavada/'], ['contato', '/contato/'], ['sobre', '/sobre/'], ['entregas', '/entregas/']];
async function settle() {
  await page.evaluate(async () => {
    await document.fonts.ready;
    for (let top = 0; top < document.body.scrollHeight; top += innerHeight) { scrollTo(0, top); await new Promise(r => setTimeout(r, 70)); }
    scrollTo(0, 0);
    await Promise.all(Array.from(document.images).map(img => img.complete ? Promise.resolve() : new Promise(r => { img.onload = r; img.onerror = r; })));
  });
}
async function snapshot(name, fullPage = true) {
  const path = join(output, `${name}.png`);
  await page.screenshot({ path, fullPage });
  report.screenshots.push(path);
}
try {
  for (const width of [1440, 390, 320]) {
    await page.setViewportSize({ width, height: width === 1440 ? 1000 : 844 });
    for (const [name, route] of routes) {
      const response = await page.goto(base + route, { waitUntil: 'networkidle' });
      assert.equal(response.status(), 200, route);
      await settle();
      const layout = await page.evaluate(() => ({
        viewport: innerWidth, width: document.documentElement.scrollWidth,
        brokenImages: Array.from(document.images).filter(img => !img.complete || !img.naturalWidth).map(img => img.src),
        h1: document.querySelectorAll('h1').length,
      }));
      report.pages.push({ route, requestedWidth: width, ...layout });
      if (layout.width > width + 1) failures.push(`Overflow ${route}: ${layout.width}/${width}`);
      assert.equal(layout.brokenImages.length, 0, `Fotografia quebrada: ${route}`);
      assert.equal(layout.h1, 1, route);
      if (width !== 320) await snapshot(`${name}-${width}`);
      if (width !== 320) await snapshot(`${name}-primeira-tela-${width}`, false);
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.locator('.menu-toggle').click();
  assert.equal(await page.locator('#main-navigation').isVisible(), true);
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('#main-navigation').isVisible(), false);
  assert.equal(await page.locator('.menu-toggle').evaluate(el => el === document.activeElement), true);
  report.interactions.push('Menu mobile abre, fecha por Escape e devolve foco ao botão.');
  await page.goto(base + '/produtos/?q=VOLEI&categoria=Esportes', { waitUntil: 'networkidle' });
  const visible = page.locator('[data-catalog-item]:visible');
  assert.equal(await visible.count(), 1);
  await page.locator('#material-search').fill('branca fina');
  assert.equal(await visible.count(), 0);
  assert.equal(await page.locator('[data-catalog-empty]').isVisible(), true);
  await page.locator('[data-clear-empty]').click();
  assert.equal(await visible.count(), 11);
  assert.equal(await page.locator('#material-search').evaluate(el => el === document.activeElement), true);
  await page.locator('input[value="Areias"]').focus();
  await page.keyboard.press('Space');
  await page.locator('input[value="Alvenaria"]').check();
  await page.locator('#material-search').fill('branca fina');
  assert.equal(await visible.count(), 1);
  await page.reload({ waitUntil: 'networkidle' });
  assert.equal(await visible.count(), 1);
  report.interactions.push('Busca sem acentos, filtros por teclado, categorias combinadas, zero resultados, limpeza/foco e persistência por URL.');
  await page.goto(base + '/produtos/pedrisco/', { waitUntil: 'networkidle' });
  await page.locator('.material-summary .button').click();
  await page.locator('[data-quote-form]').waitFor({ state: 'visible' });
  assert.equal(await page.locator('#quote-material').inputValue(), 'pedrisco');
  await page.locator('[data-quote-form] button[type="submit"]').click();
  assert.equal(await page.locator('[aria-invalid="true"]').count(), 3);
  await page.locator('#quote-name').fill('Teste de revisão visual');
  await page.locator('#quote-city').fill('Cidade de teste');
  await page.locator('#quote-neighborhood').fill('Referência de teste');
  await page.locator('[data-quote-form] button[type="submit"]').click();
  assert.equal(await page.locator('[data-quote-review]').isVisible(), true);
  const whatsapp = new URL(await page.locator('[data-quote-open]').getAttribute('href'));
  assert.equal(whatsapp.pathname, '/5521995471761');
  assert.match(whatsapp.searchParams.get('text'), /Material: Pedrisco/);
  await page.locator('#quote-notes').fill('Teste local, sem envio.');
  assert.equal(await page.locator('[data-quote-review]').isVisible(), false);
  await page.locator('[data-quote-form] button[type="reset"]').click();
  assert.equal(await page.locator('#quote-name').inputValue(), '');
  assert.equal(await page.locator('#quote-material').inputValue(), '');
  report.interactions.push('Produto → orçamento, material pré-selecionado, obrigatórios, revisão, telefone oficial, edição e limpeza. Nenhuma mensagem enviada.');

  const dist = resolve('dist');
  const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.woff2': 'font/woff2' };
  const server = createServer(async (req, res) => {
    try {
      const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
      const file = resolve(dist, '.' + (pathname.endsWith('/') ? pathname + 'index.html' : pathname));
      if (!file.startsWith(dist + '/') && !file.startsWith(dist + '\\')) { res.writeHead(403).end(); return; }
      res.setHeader('Content-Type', types[extname(file)] || 'application/octet-stream');
      res.end(await readFile(file));
    } catch { res.writeHead(404).end(); }
  });
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  try {
    const publicBase = `http://127.0.0.1:${server.address().port}`;
    for (const width of [1440, 390]) {
      await page.setViewportSize({ width, height: width === 1440 ? 1000 : 844 });
      await page.goto(publicBase + '/produtos/', { waitUntil: 'networkidle' });
      await settle();
      assert.equal(await page.locator('.catalog-material').count(), 0);
      assert.equal(await page.locator('.portfolio-pending').isVisible(), true);
      await snapshot(`catalogo-publico-${width}`);
    }
    report.interactions.push('Build público: catálogo em preparação, zero demonstrações publicadas.');
  } finally { await new Promise(r => server.close(r)); }
  assert.equal(report.errors.length, 0, 'Erros de console ou JavaScript');
  assert.equal(failures.length, 0, failures.join('\n'));
} finally {
  report.failures = failures;
  await writeFile(join(output, 'relatorio.json'), JSON.stringify(report, null, 2));
  await browser.close();
}
console.log(JSON.stringify(report, null, 2));
