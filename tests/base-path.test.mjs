import test from 'node:test';
import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const dist = path.resolve('dist');
const configuredBasePath = process.env.QUIZ_BASE_PATH ?? '/quiz';
const base = `/${configuredBasePath.split('/').filter(Boolean).join('/')}/`;
const rootIcons = ['/favicon.svg', '/favicon-32x32.png', '/favicon-16x16.png', '/apple-touch-icon.png'];

async function htmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(entry => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? htmlFiles(target) : target.endsWith('.html') ? [target] : [];
  }));
  return files.flat();
}

test('every built HTML asset and internal route uses the configured base path', async () => {
  const files = await htmlFiles(dist);
  assert.ok(files.length > 0, 'run npm run build before npm test');

  for (const file of files) {
    const html = await readFile(file, 'utf8');
    const rootRelativeReferences = [...html.matchAll(/(?:href|src)="(\/[^"]*)"/g)].map(match => match[1]);
    assert.deepEqual(
      rootRelativeReferences.filter(reference => !reference.startsWith(base) && !rootIcons.includes(reference)),
      [],
      `${path.relative(dist, file)} contains references outside ${base}`,
    );
  }
});

test('every social page uses the configured origin and complete Bestday metadata', async () => {
  const origin = process.env.PUBLIC_SITE_ORIGIN ?? 'https://bestday.ai';
  const files = [path.join(dist, 'index.html')];
  for (const slug of ['sprinter', 'planner', 'anchor', 'explorer', 'finisher']) files.push(path.join(dist, 'r', slug, 'index.html'));

  for (const file of files) {
    const html = await readFile(file, 'utf8');
    assert.match(html, /<meta property="og:site_name" content="Bestday">/);
    assert.match(html, /<meta property="og:locale" content="en_US">/);
    assert.match(html, /<meta property="og:image:alt" content="[^"]+">/);
    assert.match(html, /<meta name="twitter:image:alt" content="[^"]+">/);
    const ogImage = html.match(/<meta property="og:image" content="([^"]+)">/)?.[1];
    const ogUrl = html.match(/<meta property="og:url" content="([^"]+)">/)?.[1];
    assert.ok(ogImage?.startsWith(origin), `${path.relative(dist, file)} has the wrong OG image origin`);
    assert.ok(ogUrl?.startsWith(origin), `${path.relative(dist, file)} has the wrong OG URL origin`);
  }

  const landing = await readFile(path.join(dist, 'index.html'), 'utf8');
  assert.match(landing, /<title>Everyone in your circle goes after goals differently\. \| Bestday<\/title>/);
  assert.match(landing, new RegExp(`data-public-url="${origin.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}${base}"`));
});
