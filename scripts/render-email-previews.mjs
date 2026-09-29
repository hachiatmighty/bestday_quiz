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
  ['explorer-people', 'explorer/people'],
];

for (const [name, route] of previews) {
  await page.goto(`http://127.0.0.1:4321/quiz/email/${route}`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(outputDirectory, `${name}-390.png`), fullPage: true });
}

await page.setViewportSize({ width: 360, height: 844 });
await page.goto('http://127.0.0.1:4321/quiz/', { waitUntil: 'networkidle' });
await page.locator('[data-start]').first().click();
await page.locator('[data-category]').first().click();
const anchorQuestions = new Set([4, 10, 13, 18]);
for (let questionId = 2; questionId <= 21; questionId += 1) {
  await page.locator(`[data-value="${anchorQuestions.has(questionId) ? 4 : 0}"]`).click();
}
await page.locator('[data-unlock]').click();
await page.locator('[data-skip]').click();
await page.evaluate(async () => {
  await document.fonts.ready;
  document.querySelector('.result-card').remove();
  document.querySelector('.pairing').remove();
  document.querySelector('.result-nav').remove();
  const resultCopy = document.querySelector('.result-copy');
  [...resultCopy.children].forEach(node => {
    if (node.matches('[data-result-need], .fit-list') || node.textContent === 'What you need') return;
    node.remove();
  });
});
await page.screenshot({ path: path.join(outputDirectory, 'anchor-fit-result-360.png'), fullPage: true });

await browser.close();
