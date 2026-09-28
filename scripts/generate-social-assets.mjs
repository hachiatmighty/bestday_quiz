import { mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const asset = (...parts) => path.join(root, 'public', 'assets', ...parts);
const fontMedium = (await readFile(asset('fonts', 'Urbanist-Medium.ttf'))).toString('base64');
const fontBold = (await readFile(asset('fonts', 'Urbanist-ExtraBold.ttf'))).toString('base64');
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
const fonts = `<style>
  @font-face { font-family: Urbanist; src: url(data:font/ttf;base64,${fontMedium}); font-weight: 500; }
  @font-face { font-family: Urbanist; src: url(data:font/ttf;base64,${fontBold}); font-weight: 800; }
  text { font-family: Urbanist, sans-serif; }
</style>`;

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
  </svg>`;
  await sharp(Buffer.from(og)).png({ compressionLevel: 9, palette: true, quality: 90 }).toFile(asset('og', `${slug}.png`));

  const story = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1920">${fonts}
    <rect width="1080" height="1920" fill="#FFDE59"/>
    <circle cx="540" cy="570" r="390" fill="#0D0D0D"/>
    <image href="${illustration}" x="220" y="250" width="640" height="640"/>
    <image href="data:image/png;base64,${wordmarkBlack}" x="80" y="80" width="190" height="60" preserveAspectRatio="xMinYMid meet"/>
    <text x="80" y="1160" font-size="44" font-weight="800" letter-spacing="4">I'M</text>
    <text x="80" y="1300" font-size="122" font-weight="800">${name}</text>
    ${textLines(wrap(cardLine, 27), 80, 1455, 64, 'font-size="48" font-weight="500"')}
    <text x="80" y="1818" font-size="30" font-weight="800" letter-spacing="3">HOW DO YOU GO AFTER A GOAL?</text>
  </svg>`;
  await sharp(Buffer.from(story)).png({ compressionLevel: 9, palette: true, quality: 92 }).toFile(asset('cards', `${slug}.png`));
}

const defaultOg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">${fonts}
  <rect width="1200" height="630" fill="#0D0D0D"/>
  <image href="data:image/png;base64,${wordmarkWhite}" x="80" y="65" width="155" height="50" preserveAspectRatio="xMinYMid meet"/>
  <text x="80" y="270" fill="#FFFCEF" font-size="78" font-weight="800">How do you really</text>
  <text x="80" y="360" fill="#FFFCEF" font-size="78" font-weight="800">go after a goal?</text>
  <rect x="80" y="455" width="285" height="78" rx="39" fill="#FFDE59"/>
  <text x="131" y="506" fill="#0D0D0D" font-size="30" font-weight="800">Find my type</text>
</svg>`;
await sharp(Buffer.from(defaultOg)).png({ compressionLevel: 9, palette: true, quality: 90 }).toFile(asset('og', 'default.png'));

const [anchorName, anchorLine, anchorPictogram] = cards.anchor;
const anchorIllustration = await dataUri(anchorPictogram);
const anchorDark = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1920">${fonts}
  <rect width="1080" height="1920" fill="#0D0D0D"/>
  <image href="${anchorIllustration}" x="220" y="250" width="640" height="640"/>
  <image href="data:image/png;base64,${wordmarkWhite}" x="80" y="80" width="190" height="60" preserveAspectRatio="xMinYMid meet"/>
  <text x="80" y="1160" fill="#FFDE59" font-size="44" font-weight="800" letter-spacing="4">I'M</text>
  <text x="80" y="1300" fill="#FFFCEF" font-size="122" font-weight="800">${anchorName}</text>
  ${textLines(wrap(anchorLine, 27), 80, 1455, 64, 'fill="#FFFCEF" font-size="48" font-weight="500"')}
  <text x="80" y="1818" fill="#FFDE59" font-size="30" font-weight="800" letter-spacing="3">HOW DO YOU GO AFTER A GOAL?</text>
</svg>`;
await sharp(Buffer.from(anchorDark)).png({ compressionLevel: 9, palette: true, quality: 92 }).toFile(asset('review', 'anchor-dark-1080x1920.png'));

await sharp({ create: { width: 64, height: 64, channels: 4, background: '#FFDE59' } })
  .composite([{ input: Buffer.from('<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="32" r="20" fill="#0D0D0D"/><circle cx="32" cy="32" r="8" fill="#FFDE59"/></svg>') }])
  .png()
  .toFile(path.join(root, 'public', 'favicon.png'));
