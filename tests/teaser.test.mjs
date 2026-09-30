import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { firstSentence } from '../src/lib/teaser.mjs';

const archetypeSlugs = ['sprinter', 'planner', 'anchor', 'explorer', 'finisher'];

function archetypeField(source, slug, field) {
  const block = source.match(new RegExp(`  ${slug}: \\{([\\s\\S]*?)\\n  \\},`))?.[1] ?? '';
  return block.match(new RegExp(`    ${field}: (["'])(.*?)\\1,`))?.[2] ?? '';
}

test('all five teaser types use their full strength and a complete first pattern sentence', async () => {
  const data = await readFile('src/data/quiz.ts', 'utf8');

  for (const slug of archetypeSlugs) {
    const strength = archetypeField(data, slug, 'strength');
    const tendency = archetypeField(data, slug, 'tendency');
    const pattern = firstSentence(tendency);

    assert.ok(strength, `${slug} is missing its strengths paragraph`);
    assert.ok(pattern, `${slug} is missing its teaser pattern`);
    assert.match(pattern, /[.!?]$/, `${slug} teaser pattern must end in punctuation`);
    assert.ok(tendency.startsWith(pattern), `${slug} teaser pattern must be the first complete sentence`);
  }
});

test('teaser renders the approved disclosure list without an email bypass', async () => {
  const source = await readFile('src/components/QuizApp.astro', 'utf8');
  const teaser = source.match(/<section class="screen" data-screen="teaser">[\s\S]*?<section class="screen" data-screen="capture">/)?.[0] ?? '';

  assert.match(teaser, /data-teaser-strength/);
  assert.match(teaser, /data-teaser-pattern/);
  assert.match(teaser, /There's more in your full read/);
  assert.match(teaser, /The rest of the pattern to watch/);
  assert.match(teaser, /What you need/);
  assert.match(teaser, /How you fit with each type/);
  assert.match(teaser, /We'll send you a copy too\./);
  assert.doesNotMatch(source, /without an email/i);
  assert.doesNotMatch(source, /data-skip|Not now, just show me/);
});

test('quiz progress uses rounded percentages with an accessible question count', async () => {
  const source = await readFile('src/components/QuizApp.astro', 'utf8');

  assert.match(source, /Math\.round\(\(position \/ 21\) \* 100\)/);
  assert.match(source, /`Question \$\{position\} of 21, \$\{percent\}% done`/);
  assert.match(source, /style\.width = `\$\{percent\}%`/);
  assert.equal(Math.round((1 / 21) * 100), 5);
  assert.equal(Math.round((2 / 21) * 100), 10);
  assert.equal(Math.round((21 / 21) * 100), 100);
});

test('quiz restores stored category and scale selections after Back', async () => {
  const source = await readFile('src/components/QuizApp.astro', 'utf8');

  assert.match(source, /if \(quizState\.category\).*classList\.add\('selected'\)/);
  assert.match(source, /quizState\.answers\.find\(answer => answer\.questionId === question\.id\)/);
  assert.match(source, /storedAnswer\.value.*classList\.add\('selected'\)/);
});

test('teaser keeps the required flow and analytics hooks', async () => {
  const source = await readFile('src/components/QuizApp.astro', 'utf8');

  assert.match(source, /<ShareActions \/>/);
  assert.match(source, /track\('teaser_view'/);
  assert.match(source, /track\('capture_submit'/);
  assert.match(source, /track\('result_view'/);
  assert.match(source, /\[data-unlock\]'\)\.onclick = \(\) => show\('capture'\)/);
  assert.match(source, /firstSentence\(result\.tendency\)/);
});
