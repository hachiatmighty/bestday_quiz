import { readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const placeholder = 'https://__QUIZ_ORIGIN__';
const targetDirectory = path.resolve('dist/quiz');
const rewriteExtensions = new Set(['.html', '.js', '.json']);

const hostname = process.env.VERCEL_ENV === 'production'
  ? process.env.VERCEL_PROJECT_PRODUCTION_URL
  : process.env.VERCEL_ENV === 'preview'
    ? process.env.VERCEL_BRANCH_URL ?? process.env.VERCEL_URL
    : undefined;
const origin = new URL(/^https?:\/\//.test(hostname ?? '') ? hostname : `https://${hostname || 'bestday.ai'}`).origin;

const files = [];
const collectFiles = async directory => {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) await collectFiles(target);
    else if (rewriteExtensions.has(path.extname(entry.name))) files.push(target);
  }
};

await collectFiles(targetDirectory);
for (const file of files) {
  const source = await readFile(file, 'utf8');
  await writeFile(file, source.replaceAll(placeholder, origin));
}

const unresolved = [];
for (const file of files) {
  if ((await readFile(file, 'utf8')).includes('__QUIZ_ORIGIN__')) unresolved.push(path.relative(targetDirectory, file));
}
if (unresolved.length) throw new Error(`Quiz origin placeholder remains in: ${unresolved.join(', ')}`);

console.log(`Bestday quiz origin: ${origin}`);
