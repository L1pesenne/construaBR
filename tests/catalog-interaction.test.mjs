import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { stripTypeScriptTypes } from 'node:module';
import { runInNewContext } from 'node:vm';
import { matchesCatalogFilter } from '../src/lib/catalog.ts';
import { products } from '../src/data/catalog.ts';

// Executa o controlador real em uma superfície DOM mínima; não substitui QA visual.
function mount(initialUrl) {
  const search = Object.assign(new EventTarget(), { value: '', focused: false, focus() { this.focused = true; } });
  const checkboxes = [...new Set(products.map(p => p.category))].map(value => ({ value, checked: false }));
  const items = products.map(p => ({ hidden: false, dataset: { searchText: `${p.name} ${p.category} ${p.description} ${p.detailedDescription}`, category: p.category } }));
  const count = { textContent: '' }, empty = { hidden: true };
  const clear = Object.assign(new EventTarget(), { hidden: true }), clearEmpty = new EventTarget();
  const form = Object.assign(new EventTarget(), {
    hidden: true,
    querySelector: () => search,
    querySelectorAll: () => checkboxes,
    reset() { search.value = ''; checkboxes.forEach(input => { input.checked = false; }); },
  });
  const selectors = { form, '[data-results-count]': count, '[data-catalog-empty]': empty, '[data-clear-filters]': clear, '[data-clear-empty]': clearEmpty };
  const catalog = { querySelector: key => selectors[key], querySelectorAll: () => items };
  const location = { href: initialUrl, get search() { return new URL(this.href).search; } };
  const window = new EventTarget();
  const source = readFileSync('src/components/CatalogBrowser.astro', 'utf8').match(/<script>([\s\S]*?)<\/script>/)[1].replace(/import \{ matchesCatalogFilter \} from '[^']+';/, '');
  runInNewContext(stripTypeScriptTypes(source), {
    document: { querySelector: key => key === '[data-catalog]' ? catalog : {} },
    window, location, URL, URLSearchParams, matchesCatalogFilter,
    history: { replaceState(_state, _title, url) { location.href = String(url); } },
  });
  return { search, checkboxes, items, count, empty, clear, clearEmpty, form, location, window };
}

test('controlador restaura URL, combina filtros e informa demonstração e ausência de resultados', () => {
  const ui = mount('http://localhost/produtos/?q=VOLEI&categoria=Esportes');
  assert.equal(ui.form.hidden, false);
  assert.equal(ui.items.filter(item => !item.hidden).length, 1);
  assert.match(ui.count.textContent, /1 referência em demonstração de 11/);
  ui.search.value = 'branca fina';
  ui.search.dispatchEvent(new Event('input'));
  assert.equal(ui.empty.hidden, false);
  ui.checkboxes.forEach(input => { input.checked = ['Areias', 'Alvenaria'].includes(input.value); });
  ui.form.dispatchEvent(new Event('change'));
  assert.equal(ui.items.filter(item => !item.hidden).length, 1);
  assert.equal(ui.empty.hidden, true);
  assert.deepEqual(new URL(ui.location.href).searchParams.getAll('categoria'), ['Areias', 'Alvenaria']);
  ui.search.value = 'inexistente';
  ui.search.dispatchEvent(new Event('input'));
  assert.equal(ui.empty.hidden, false);
  assert.match(ui.count.textContent, /^0 referências/);
  ui.clearEmpty.dispatchEvent(new Event('click'));
  assert.equal(ui.items.filter(item => !item.hidden).length, 11);
  assert.equal(ui.location.search, '');
  assert.equal(ui.search.focused, true);
  assert.equal(ui.clear.hidden, true);
  ui.location.href = 'http://localhost/produtos/?q=pedrisco';
  ui.window.dispatchEvent(new Event('popstate'));
  assert.equal(ui.items.filter(item => !item.hidden).length, 1);
  assert.equal(ui.search.value, 'pedrisco');
  ui.clear.dispatchEvent(new Event('click'));
  assert.equal(ui.items.filter(item => !item.hidden).length, 11);
});
