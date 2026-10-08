import sharp from 'sharp';
import { mkdir, readdir } from 'node:fs/promises';

await mkdir('artifacts/assets', { recursive: true });
const names = (await readdir('imagens')).filter(name => /\.(jpg|svg)$/i.test(name));
const cells = await Promise.all(names.map(async (name, index) => {
  const image = await sharp(`imagens/${name}`).resize(290, 210, {
    fit: 'contain', background: '#f7f4ef',
  }).png().toBuffer();
  const label = Buffer.from(`<svg width="290" height="45"><rect width="290" height="45" fill="#fff"/><text x="10" y="25" font-size="12">${name}</text></svg>`);
  return [
    { input: image, left: index % 3 * 300, top: Math.floor(index / 3) * 265 },
    { input: label, left: index % 3 * 300, top: Math.floor(index / 3) * 265 + 210 },
  ];
}));
await sharp({ create: { width: 900, height: Math.ceil(names.length / 3) * 265, channels: 3, background: '#deded6' } })
  .composite(cells.flat()).png().toFile('artifacts/assets/contact-sheet.png');
