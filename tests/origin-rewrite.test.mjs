import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import test from 'node:test';

const exec = promisify(execFile);
const script = path.resolve('scripts/set-quiz-origin.mjs');
const placeholder = 'https://__QUIZ_ORIGIN__';

const cases = [
  ['production', { VERCEL_ENV: 'production', VERCEL_PROJECT_PRODUCTION_URL: 'bestday.ai' }, 'https://bestday.ai'],
  ['preview branch', { VERCEL_ENV: 'preview', VERCEL_BRANCH_URL: 'feature-quiz.vercel.app', VERCEL_URL: 'fallback.vercel.app' }, 'https://feature-quiz.vercel.app'],
  ['missing variables', {}, 'https://bestday.ai'],
];

for (const [name, variables, expectedOrigin] of cases) {
  test(`origin rewrite handles ${name}`, async () => {
    const fixture = await mkdtemp(path.join(os.tmpdir(), 'quiz-origin-'));
    const quiz = path.join(fixture, 'dist', 'quiz');
    await mkdir(path.join(quiz, 'assets'), { recursive: true });
    await writeFile(path.join(quiz, 'index.html'), `<meta property="og:image" content="${placeholder}/quiz/assets/og/default.png"><script src="${placeholder}/quiz/app.js"></script>`);
    await writeFile(path.join(quiz, 'app.js'), `const shareUrl = "${placeholder}/quiz/r/anchor";`);
    await writeFile(path.join(quiz, 'data.json'), JSON.stringify({ image: `${placeholder}/quiz/assets/og/anchor.png` }));

    try {
      const { stdout } = await exec(process.execPath, [script], {
        cwd: fixture,
        env: { PATH: process.env.PATH, ...variables },
      });
      assert.match(stdout, new RegExp(`Bestday quiz origin: ${expectedOrigin.replaceAll('.', '\\.').replaceAll('/', '\\/')}`));
      const outputs = await Promise.all(['index.html', 'app.js', 'data.json'].map(file => readFile(path.join(quiz, file), 'utf8')));
      assert.ok(outputs.every(output => output.includes(expectedOrigin)));
      assert.ok(outputs.every(output => !output.includes('__QUIZ_ORIGIN__')));
      assert.match(outputs[0], /assets\/og\/default\.png/);
      assert.match(outputs[2], /assets\/og\/anchor\.png/);
    } finally {
      await rm(fixture, { recursive: true, force: true });
    }
  });
}
