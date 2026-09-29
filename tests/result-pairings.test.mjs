import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const archetypeSlugs = ['sprinter', 'planner', 'anchor', 'explorer', 'finisher'];

test('pairing data gives every result five pairings including its own type', async () => {
  const source = await readFile('src/data/quiz.ts', 'utf8');
  const keys = [...source.matchAll(/^  '([a-z]+):([a-z]+)':/gm)].map(match => match.slice(1));

  assert.equal(keys.length, 15);
  for (const archetype of archetypeSlugs) {
    assert.equal(keys.filter(pair => pair.includes(archetype)).length, 5);
    assert.ok(keys.some(pair => pair[0] === archetype && pair[1] === archetype));
  }
  assert.match(source, /partner === type \? 'another'/);
});

test('result screen has five pairing rows and no extra share controls', async () => {
  const source = await readFile('src/components/QuizApp.astro', 'utf8');
  const resultMarkup = source.match(/<section class="screen" data-screen="result">[\s\S]*?<section class="screen" data-screen="offer">/)?.[0] ?? '';

  assert.match(source, /pairingsFor\(resultSlug\)/);
  assert.equal((resultMarkup.match(/<article class="share card">/g) ?? []).length, 1);
  assert.equal((resultMarkup.match(/data-result-(?:whatsapp|share|save)/g) ?? []).length, 3);
  assert.doesNotMatch(source.match(/<section class="fit-list"[\s\S]*?<\/section>/)?.[0] ?? '', /<(?:a|button)\b/);
});
