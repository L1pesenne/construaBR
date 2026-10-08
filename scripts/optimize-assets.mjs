import sharp from 'sharp';
import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';

// Só redimensiona/converte cópias. Os arquivos de imagens/ permanecem intactos.
const sources = [
  ['areia-de-aterro', 'Areia de Aterro.jpg'],
  ['areia-grama-sintetica', 'Areia Fina para Campo de Grama Sintética.jpg'],
  ['areia-lavada-fina-branca', 'Areia Lavada Fina Branca.jpg'],
  ['areia-lavada-fina', 'Areia Lavada Fina.jpg'],
  ['areia-lavada', 'areia lavada.jpg'],
  ['areia-quadra-esportiva', 'Areia para Quadra Esportiva.jpg'],
  ['areia-relavada-amarela', 'Areia Relavada amarela.jpg'],
  ['areia-relavada-branca', 'Areia Relavada Branca.jpg'],
  ['areia-relavada-creme', 'Areia Relavada creme.jpg'],
  ['areola', 'Areola.jpg'],
  ['pedrisco', 'Pedrisco.jpg'],
];
await mkdir('public/images/materials', { recursive: true });
await mkdir('public/images/brand', { recursive: true });
await mkdir('public/images/illustrations', { recursive: true });
await mkdir('docs', { recursive: true });
await copyFile('imagens/logo_construabr.svg', 'public/images/brand/construabr.svg');
await copyFile('public/images/basculante.svg', 'public/images/illustrations/basculante.svg');

const assets = {};
const report = [];
for (const [key, filename] of sources) {
  const input = await readFile(`imagens/${filename}`);
  const metadata = await sharp(input).metadata();
  const largestWidth = Math.min(metadata.width, key === 'areia-lavada' ? 1560 : 960);
  const widths = [...new Set([Math.min(480, largestWidth), Math.min(960, largestWidth), largestWidth])];
  const variants = [];
  for (const width of widths) {
    let output;
    for (const quality of [82, 76, 70]) {
      output = await sharp(input).rotate().resize({ width, withoutEnlargement: true })
        .webp({ quality, effort: 5 }).toBuffer({ resolveWithObject: true });
      if (output.data.length < input.length) break;
    }
    const src = `/images/materials/${key}-${width}.webp`;
    await writeFile(`public${src}`, output.data);
    variants.push({ src, width: output.info.width, height: output.info.height, bytes: output.data.length });
  }
  const large = variants.at(-1);
  assets[key] = { src: large.src, width: large.width, height: large.height,
    srcSet: variants.map(variant => `${variant.src} ${variant.width}w`).join(', ') };
  report.push({ key, source: `imagens/${filename}`, sourceWidth: metadata.width,
    sourceHeight: metadata.height, sourceBytes: input.length, variants });
}
await writeFile('src/data/assets.generated.ts', `// Gerado por npm run assets:optimize. Não editar manualmente.\nexport const assets = ${JSON.stringify(assets, null, 2)} as const;\nexport type AssetKey = keyof typeof assets;\n`);
await writeFile('docs/ASSETS_OTIMIZADOS.json', `${JSON.stringify(report, null, 2)}\n`);
const inputBytes = report.reduce((total, item) => total + item.sourceBytes, 0);
const outputBytes = report.reduce((total, item) => total + item.variants.at(-1).bytes, 0);
console.log(`${report.length} fotografias otimizadas. Versões maiores: ${inputBytes} → ${outputBytes} bytes (${Math.round((1 - outputBytes / inputBytes) * 100)}% menores).`);
