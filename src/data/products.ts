import { products } from './catalog';
import { selectVisibleProducts } from '../lib/catalog';
export { products } from './catalog';
export type { Product } from './catalog';

export const visibleProducts = selectVisibleProducts(products, import.meta.env.DEV);
export const hasDemoProducts = visibleProducts.some(product => product.status === 'demo');
