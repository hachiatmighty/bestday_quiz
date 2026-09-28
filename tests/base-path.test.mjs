import test from 'node:test';
import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const dist = path.resolve('dist');
const configuredBasePath = process.env.QUIZ_BASE_PATH ?? '/quiz';
const base = `/${configuredBasePath.split('/').filter(Boolean).join('/')}/`;

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
      rootRelativeReferences.filter(reference => !reference.startsWith(base)),
      [],
      `${path.relative(dist, file)} contains references outside ${base}`,
    );
  }
});
