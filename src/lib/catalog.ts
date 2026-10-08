export interface CatalogEntry {
  status: 'demo' | 'approved' | 'draft';
  confirmation: 'confirmed' | 'pending' | 'supplier-reference';
}

export function canPublishProduct(product: CatalogEntry): boolean {
  return product.status === 'approved' && product.confirmation === 'confirmed';
}

export function selectVisibleProducts<T extends CatalogEntry>(products: T[], development: boolean): T[] {
  return products.filter(product => canPublishProduct(product) || (development && product.status === 'demo'));
}

export function normalizeSearch(value: string): string {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR').replace(/\s+/g, ' ').trim();
}

export function matchesCatalogFilter(text: string, category: string, query: string, categories: string[]): boolean {
  const terms = normalizeSearch(query).split(' ').filter(Boolean);
  const normalizedText = normalizeSearch(text);
  return (!categories.length || categories.includes(category)) && terms.every(term => normalizedText.includes(term));
}
