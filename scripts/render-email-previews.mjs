import { mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright-core';

const root = process.cwd();
const outputDirectory = path.join(root, 'public', 'assets', 'review', 'emails');
await mkdir(outputDirectory, { recursive: true });

const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
await page.route('https://bestday.ai/quiz/assets/**', async route => {
  const relativePath = new URL(route.request().url()).pathname.replace('/quiz/assets/', '');
  await route.fulfill({ body: await readFile(path.join(root, 'public', 'assets', relativePath)), contentType: 'image/png' });
});
const previews = [
  ['anchor-result', 'anchor/result'],
  ['anchor-people', 'anchor/people'],
  ['anchor-quiet', 'anchor/quiet'],
  ['anchor-one-goal', 'anchor/one-goal'],
  ['sprinter-result', 'sprinter/result'],
];

for (const [name, route] of previews) {
  await page.goto(`http://127.0.0.1:4321/quiz/email/${route}`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(outputDirectory, `${name}-390.png`), fullPage: true });
}

await browser.close();
