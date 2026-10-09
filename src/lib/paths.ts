/** Prefixa somente caminhos locais com a base configurada no Astro. */
export function withBase(url: string, base = import.meta.env?.BASE_URL ?? '/') {
  if (!url.startsWith('/') || url.startsWith('//')) return url;
  return base.replace(/\/$/, '') + url;
}
export function withBaseSrcSet(srcSet: string | undefined) {
  return srcSet?.split(',').map(candidate => {
    const [url, ...descriptor] = candidate.trim().split(/\s+/);
    return [withBase(url), ...descriptor].join(' ');
  }).join(', ');
}
