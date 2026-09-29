import { Buffer } from 'node:buffer';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright-core';

const root = process.cwd();
const basePath = `/${(process.env.QUIZ_BASE_PATH ?? '/quiz').split('/').filter(Boolean).join('/')}`;
const cardFooter = `bestday.ai${basePath}`;
const asset = (...parts) => path.join(root, 'public', 'assets', ...parts);
const fontMedium = (await readFile(asset('fonts', 'Urbanist-Medium.ttf'))).toString('base64');
const fontBold = (await readFile(asset('fonts', 'Urbanist-ExtraBold.ttf'))).toString('base64');
const wordmarkWhite = (await readFile(asset('logos', 'wordmark-white.png'))).toString('base64');

const cards = {
  sprinter: ['The Sprinter', 'I bring the momentum. My circle keeps it going.'],
  planner: ['The Planner', 'My plan is ready. My circle knows my start date.'],
  anchor: ['The Anchor', "I hold everyone. This goal, I'm not carrying alone."],
  explorer: ['The Explorer', "I'll always find a new idea. My circle keeps me on the one that matters."],
  finisher: ['The Finisher', 'I finish things for everyone. My circle makes sure one is mine.'],
};

const dataUri = async (...parts) => `data:image/png;base64,${(await readFile(asset(...parts))).toString('base64')}`;
const fonts = `
  @font-face { font-family: Urbanist; src: url(data:font/ttf;base64,${fontMedium}) format('truetype'); font-weight: 500; }
  @font-face { font-family: Urbanist; src: url(data:font/ttf;base64,${fontBold}) format('truetype'); font-weight: 800; }
`;
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
const documentFor = (content, width, height) => `<!doctype html><html><head><style>${fonts}
  * { box-sizing: border-box; }
  html, body { margin: 0; width: ${width}px; height: ${height}px; overflow: hidden; }
  body { font-family: Urbanist, sans-serif; font-weight: 500; }
  #card { position: relative; width: ${width}px; height: ${height}px; overflow: hidden; }
</style></head><body>${content}</body></html>`;

await mkdir(asset('og'), { recursive: true });
await mkdir(asset('cards'), { recursive: true });
await mkdir(asset('review'), { recursive: true });

const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const page = await browser.newPage({ deviceScaleFactor: 1 });
const render = async (content, width, height, output) => {
  await page.setViewportSize({ width, height });
  await page.setContent(documentFor(content, width, height), { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  const screenshot = await page.locator('#card').screenshot({ type: 'png' });
  await writeFile(output, stripPngMetadata(screenshot));
};

for (const [slug, [name, cardLine]] of Object.entries(cards)) {
  const illustration = await dataUri('archetypes', `${slug}.png`);
  const og = `<article id="card" style="background:#0D0D0D;color:#FFFCEF;padding:58px 68px">
    <img src="data:image/png;base64,${wordmarkWhite}" style="width:142px;height:45px;object-fit:contain;object-position:left center">
    <img src="${illustration}" style="position:absolute;right:94px;top:70px;width:316px;height:316px;object-fit:contain">
    <div style="position:absolute;left:68px;right:510px;top:218px"><div style="color:#FFDE59;font-size:32px;font-weight:800;letter-spacing:3px">I'M</div><div style="color:#FFDE59;font-size:92px;line-height:1;font-weight:800;margin-top:12px;white-space:nowrap">${name}</div><div style="font-size:32px;line-height:1.36;margin-top:92px">${cardLine}</div></div>
    <div style="position:absolute;left:68px;bottom:48px;color:#FFFCEF;font-size:24px">${cardFooter}</div>
  </article>`;
  await render(og, 1200, 630, asset('og', `${slug}.png`));

  const story = `<article id="card" style="background:#0D0D0D;color:#FFFCEF;padding:80px">
    <img src="data:image/png;base64,${wordmarkWhite}" style="width:190px;height:60px;object-fit:contain;object-position:left center">
    <img src="${illustration}" style="position:absolute;left:220px;top:250px;width:640px;height:640px;object-fit:contain">
    <div style="position:absolute;left:80px;right:80px;top:1130px"><div style="color:#FFDE59;font-size:44px;font-weight:800;letter-spacing:4px">I'M</div><div style="color:#FFDE59;font-size:122px;line-height:1;font-weight:800;margin-top:22px">${name}</div><div style="font-size:48px;line-height:1.34;margin-top:78px;max-width:900px">${cardLine}</div></div>
    <div style="position:absolute;left:80px;bottom:80px;color:#FFFCEF;font-size:30px">${cardFooter}</div>
  </article>`;
  await render(story, 1080, 1920, asset('cards', `${slug}.png`));
}

const defaultOg = `<article id="card" style="background:#0D0D0D;color:#FFFCEF;padding:65px 80px">
  <img src="data:image/png;base64,${wordmarkWhite}" style="width:155px;height:50px;object-fit:contain;object-position:left center">
  <div style="font-size:78px;line-height:1.15;font-weight:800;margin-top:125px">How do you really<br>go after a goal?</div>
  <div style="display:grid;place-items:center;width:285px;height:78px;border-radius:999px;background:#FFDE59;color:#0D0D0D;font-size:30px;font-weight:800;margin-top:75px">Find my type</div>
</article>`;
await render(defaultOg, 1200, 630, asset('og', 'default.png'));

const [anchorName, anchorLine] = cards.anchor;
const anchorIllustration = await dataUri('archetypes', 'anchor.png');
const anchorDark = `<article id="card" style="background:#0D0D0D;color:#FFFCEF;padding:80px">
  <img src="data:image/png;base64,${wordmarkWhite}" style="width:190px;height:60px;object-fit:contain;object-position:left center">
  <img src="${anchorIllustration}" style="position:absolute;left:220px;top:250px;width:640px;height:640px;object-fit:contain">
  <div style="position:absolute;left:80px;right:80px;top:1130px"><div style="color:#FFDE59;font-size:44px;font-weight:800;letter-spacing:4px">I'M</div><div style="color:#FFDE59;font-size:122px;line-height:1;font-weight:800;margin-top:22px">${anchorName}</div><div style="font-size:48px;line-height:1.34;margin-top:78px;max-width:900px">${anchorLine}</div></div>
  <div style="position:absolute;left:80px;bottom:80px;color:#FFFCEF;font-size:30px">${cardFooter}</div>
</article>`;
await render(anchorDark, 1080, 1920, asset('review', 'anchor-dark-1080x1920.png'));

await browser.close();
