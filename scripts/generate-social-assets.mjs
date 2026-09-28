import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { Buffer } from 'node:buffer';
import path from 'node:path';

const root = process.cwd();
const asset = (...parts) => path.join(root, 'public', 'assets', ...parts);
const fontCachePath = path.join(root, '.astro', 'font-cache');
const fontConfigPath = path.join(root, '.astro', 'fontconfig.xml');
await mkdir(fontCachePath, { recursive: true });
await writeFile(fontConfigPath, `<?xml version="1.0"?><!DOCTYPE fontconfig SYSTEM "fonts.dtd"><fontconfig><dir>${asset('fonts')}</dir><cachedir>${fontCachePath}</cachedir></fontconfig>`);
process.env.FONTCONFIG_FILE = fontConfigPath;
const { default: sharp } = await import('sharp');
const wordmarkBlack = (await readFile(asset('logos', 'wordmark-black.png'))).toString('base64');
const wordmarkWhite = (await readFile(asset('logos', 'wordmark-white.png'))).toString('base64');

const cards = {
  sprinter: ['The Sprinter', 'I bring the momentum. My circle keeps it going.', '03_willpower.png'],
  planner: ['The Planner', 'My plan is ready. My circle knows my start date.', '02_goal.png'],
  anchor: ['The Anchor', "I hold everyone. This goal, I'm not carrying alone.", '11_isolation_community.png'],
  explorer: ['The Explorer', "I'll always find a new idea. My circle keeps me on the one that matters.", '06_witnessed.png'],
  finisher: ['The Finisher', 'I finish things for everyone. My circle makes sure one is mine.', '05_success.png'],
};

const escapeXml = value => value.replaceAll('&', '&amp;').replaceAll("'", '&apos;');
const dataUri = async filename => `data:image/png;base64,${(await readFile(asset('illustrations', filename))).toString('base64')}`;
const fonts = `<style>text { font-family: 'Urbanist Medium'; } text[font-weight='800'] { font-family: 'Urbanist ExtraBold'; }</style>`;

const wrap = (text, limit) => {
  const lines = [];
  for (const word of text.split(' ')) {
    const candidate = `${lines.at(-1) || ''} ${word}`.trim();
    if (candidate.length > limit && lines.length) lines.push(word);
    else if (lines.length) lines[lines.length - 1] = candidate;
    else lines.push(candidate);
  }
  return lines;
};

const textLines = (lines, x, y, gap, attributes) => lines.map((line, index) => `<text x="${x}" y="${y + index * gap}" ${attributes}>${escapeXml(line)}</text>`).join('');
const stripPngMetadata = buffer => {
  const chunks = [buffer.subarray(0, 8)];
  for (let offset = 8; offset < buffer.length;) {
    const length = buffer.readUInt32BE(offset);
    const end = offset + length + 12;
    const type = buffer.toString('ascii', offset + 4, offset + 8);
    if (type === 'IHDR' || type === 'IDAT' || type === 'IEND') chunks.push(buffer.subarray(offset, end));
    offset = end;
  }
  return Buffer.concat(chunks);
};
const renderPng = async (svg, output) => {
  const buffer = await sharp(Buffer.from(svg)).flatten().removeAlpha().png({ compressionLevel: 9 }).toBuffer();
  await writeFile(output, stripPngMetadata(buffer));
};

await mkdir(asset('og'), { recursive: true });
await mkdir(asset('cards'), { recursive: true });
await mkdir(asset('review'), { recursive: true });

for (const [slug, [name, cardLine, pictogram]] of Object.entries(cards)) {
  const illustration = await dataUri(pictogram);
  const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">${fonts}
    <rect width="1200" height="630" rx="12" fill="#FFDE59"/>
    <circle cx="948" cy="228" r="190" fill="#0D0D0D"/>
    <image href="${illustration}" x="790" y="70" width="316" height="316"/>
    <image href="data:image/png;base64,${wordmarkBlack}" x="68" y="58" width="142" height="45" preserveAspectRatio="xMinYMid meet"/>
    <text x="68" y="230" font-size="32" font-weight="800" letter-spacing="3">I'M</text>
    <text x="68" y="330" font-size="92" font-weight="800">${name}</text>
    ${textLines(wrap(cardLine, 44), 68, 455, 44, 'font-size="32" font-weight="500"')}
    <text x="68" y="575" font-size="24" font-weight="500">quiz.bestday.ai</text>
  </svg>`;
  await renderPng(og, asset('og', `${slug}.png`));

  const story = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1920">${fonts}
    <rect width="1080" height="1920" fill="#FFDE59"/>
    <circle cx="540" cy="570" r="390" fill="#0D0D0D"/>
    <image href="${illustration}" x="220" y="250" width="640" height="640"/>
    <image href="data:image/png;base64,${wordmarkBlack}" x="80" y="80" width="190" height="60" preserveAspectRatio="xMinYMid meet"/>
    <text x="80" y="1160" font-size="44" font-weight="800" letter-spacing="4">I'M</text>
    <text x="80" y="1300" font-size="122" font-weight="800">${name}</text>
    ${textLines(wrap(cardLine, 27), 80, 1455, 64, 'font-size="48" font-weight="500"')}
    <text x="80" y="1818" font-size="30" font-weight="500">quiz.bestday.ai</text>
  </svg>`;
  await renderPng(story, asset('cards', `${slug}.png`));
}

const defaultOg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">${fonts}
  <rect width="1200" height="630" fill="#0D0D0D"/>
  <image href="data:image/png;base64,${wordmarkWhite}" x="80" y="65" width="155" height="50" preserveAspectRatio="xMinYMid meet"/>
  <text x="80" y="270" fill="#FFFCEF" font-size="78" font-weight="800">How do you really</text>
  <text x="80" y="360" fill="#FFFCEF" font-size="78" font-weight="800">go after a goal?</text>
  <rect x="80" y="455" width="285" height="78" rx="39" fill="#FFDE59"/>
  <text x="131" y="506" fill="#0D0D0D" font-size="30" font-weight="800">Find my type</text>
</svg>`;
await renderPng(defaultOg, asset('og', 'default.png'));

const [anchorName, anchorLine, anchorPictogram] = cards.anchor;
const anchorIllustration = await dataUri(anchorPictogram);
const anchorDark = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1920">${fonts}
  <rect width="1080" height="1920" fill="#0D0D0D"/>
  <image href="${anchorIllustration}" x="220" y="250" width="640" height="640"/>
  <image href="data:image/png;base64,${wordmarkWhite}" x="80" y="80" width="190" height="60" preserveAspectRatio="xMinYMid meet"/>
  <text x="80" y="1160" fill="#FFDE59" font-size="44" font-weight="800" letter-spacing="4">I'M</text>
  <text x="80" y="1300" fill="#FFFCEF" font-size="122" font-weight="800">${anchorName}</text>
  ${textLines(wrap(anchorLine, 27), 80, 1455, 64, 'fill="#FFFCEF" font-size="48" font-weight="500"')}
  <text x="80" y="1818" fill="#FFDE59" font-size="30" font-weight="500">quiz.bestday.ai</text>
</svg>`;
await renderPng(anchorDark, asset('review', 'anchor-dark-1080x1920.png'));

await sharp({ create: { width: 64, height: 64, channels: 4, background: '#FFDE59' } })
  .composite([{ input: Buffer.from('<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="32" r="20" fill="#0D0D0D"/><circle cx="32" cy="32" r="8" fill="#FFDE59"/></svg>') }])
  .png()
  .toFile(path.join(root, 'public', 'favicon.png'));
