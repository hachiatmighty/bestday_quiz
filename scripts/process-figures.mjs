import sharp from 'sharp';
import { mkdir, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

export const areas = ['work', 'money', 'health', 'relationships', 'growth', 'rest', 'home', 'meaning'];
export const colours = { yellow: [255, 222, 89], grey: [74, 72, 66], cream: [255, 252, 239] };
const directory = fileURLToPath(new URL('../life-audit/public/assets/figures/', import.meta.url));

// Yellow over white: blue-channel coverage is robust to slight generated hue variation.
// Reject near-neutral background noise, preserve subpixel coverage at the silhouette.
export function coverage(r, g, b, alpha = 255) {
  if (r - b < 12 || g - b < 8) return 0;
  return Math.round(Math.min(1, (255 - b) / 166) * alpha);
}

async function exactColour(pipeline, rgb) {
  const { data, info } = await pipeline.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let p = 0; p < data.length; p += 4) data.set(rgb, p);
  return sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } });
}

// The supporting ring keeps the generated transparency; normalise its ink and
// discard low-alpha noise before resizing, just as the individual figures do.
async function processHeroRing() {
  const source = `${directory}/raw/hero-ring.png`;
  try { await access(source); } catch { return; }
  const { data, info } = await sharp(source).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const mask = Buffer.alloc(info.width * info.height);
  for (let p = 0; p < mask.length; p++) mask[p] = data[p * 4 + 3] >= 128 ? 255 : 0;
  const alpha = await sharp(mask, { raw: { width: info.width, height: info.height, channels: 1 } })
    .median(3).resize(1024, 1024).raw().toBuffer({ resolveWithObject: true });
  const pixels = Buffer.alloc(1024 * 1024 * 4);
  for (let p = 0; p < 1024 * 1024; p++) { pixels.set(colours.yellow, p * 4); pixels[p * 4 + 3] = alpha.data[p * alpha.info.channels]; }
  await sharp(pixels, { raw: { width: 1024, height: 1024, channels: 4 } }).png().toFile(`${directory}/hero-ring.png`);
}

export async function processFigures() {
  await mkdir(directory, { recursive: true });
  const sheets = { yellow: [], grey: [] };
  for (const [index, area] of areas.entries()) {
    const { data, info } = await sharp(`${directory}/raw/${area}.png`).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    const mask = Buffer.alloc(info.width * info.height);
    let left = info.width, top = info.height, right = -1, bottom = -1;
    for (let y = 0; y < info.height; y++) for (let x = 0; x < info.width; x++) {
      const p = (y * info.width + x) * 4;
      const a = coverage(...data.subarray(p, p + 4));
      mask[y * info.width + x] = a;
      if (a) { left = Math.min(left, x); right = Math.max(right, x); top = Math.min(top, y); bottom = Math.max(bottom, y); }
    }
    if (right < left) throw new Error(`No yellow subject found: ${area}`);
    const scaled = await sharp(mask, { raw: { width: info.width, height: info.height, channels: 1 } })
      .extract({ left, top, width: right - left + 1, height: bottom - top + 1 })
      .resize({ width: 820, height: 820, fit: 'inside' }).raw().toBuffer({ resolveWithObject: true });
    // Sharp expands a single-channel image to RGB. Read the first channel only.
    for (const [colour, rgb] of Object.entries(colours)) {
      const suffix = colour === 'yellow' ? '' : `-${colour}`;
      const { width, height, channels } = scaled.info;
      const pixels = Buffer.alloc(width * height * 4);
      for (let p = 0; p < width * height; p++) {
        pixels.set(rgb, p * 4); pixels[p * 4 + 3] = scaled.data[p * channels];
      }
      const cropped = await sharp(pixels, { raw: { width, height, channels: 4 } }).png().toBuffer();
      const png = await sharp({ create: { width: 1024, height: 1024, channels: 4, background: '#00000000' } })
        .composite([{ input: cropped, left: Math.floor((1024 - width) / 2), top: Math.floor((1024 - height) / 2) }]).png().toBuffer();
      await (await exactColour(sharp(png), rgb)).png().toFile(`${directory}/${area}${suffix}.png`);
      await (await exactColour(sharp(cropped).resize({ width: 512, height: 512, fit: 'inside' }), rgb)).webp({ lossless: true }).toFile(`${directory}/${area}${suffix}.webp`);
      if (sheets[colour]) {
        const x = index % 4 * 300, y = Math.floor(index / 4) * 340;
        sheets[colour].push({ input: await sharp(png).resize(280, 280).toBuffer(), left: x + 10, top: y + 5 });
        sheets[colour].push({ input: Buffer.from(`<svg width="300" height="45"><text x="150" y="29" text-anchor="middle" font-family="sans-serif" font-size="19" fill="#FFFCEF">${area}</text></svg>`), left: x, top: y + 285 });
      }
    }
  }
  await processHeroRing();
  for (const [colour, layers] of Object.entries(sheets)) {
    await sharp({ create: { width: 1200, height: 680, channels: 4, background: '#0D0D0D' } })
      .composite(layers).png().toFile(`${directory}/contact-sheet${colour === 'yellow' ? '' : '-grey'}.png`);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) await processFigures();
