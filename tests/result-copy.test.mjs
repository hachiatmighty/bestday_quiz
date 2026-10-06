import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const archetypes = {
  'The Sprinter': 'sprinter',
  'The Planner': 'planner',
  'The Anchor': 'anchor',
  'The Explorer': 'explorer',
  'The Finisher': 'finisher',
};
const fields = {
  'At your best': 'atBest',
  'Your strengths': 'strength',
  'How others see you': 'othersSee',
  'The pattern to watch': 'tendency',
  'What you need': 'need',
  'Who you work best with': 'worksBestWith',
  'A question to sit with': 'question',
  'Your first step': 'firstStep',
};
const allFields = ['identity', ...Object.values(fields)];

function parseCopyDocument(source) {
  return Object.fromEntries(source.split(/^## /m).slice(1).map(chunk => {
    const [name, ...bodyLines] = chunk.split('\n');
    const body = bodyLines.join('\n');
    const identity = body.match(/^\*\*(.+)\*\*$/m)?.[1] ?? '';
    const sections = Object.fromEntries(body.split(/^### /m).slice(1).map(section => {
      const [heading, ...lines] = section.split('\n');
      return [fields[heading.trim()], lines.join('\n').trim()];
    }));
    return [archetypes[name.trim()], { identity, ...sections }];
  }));
}

function parseQuizData(source, slug) {
  const block = source.match(new RegExp(`  ${slug}: \\{([\\s\\S]*?)\\n  \\},`))?.[1] ?? '';
  return Object.fromEntries(allFields.map(field => {
    const literal = block.match(new RegExp(`^    ${field}: (.+),$`, 'm'))?.[1] ?? "''";
    return [field, Function(`return (${literal})`)()];
  }));
}

test('quiz archetype fields exactly match the approved copy document', async () => {
  const [copySource, dataSource] = await Promise.all([
    readFile('docs/copy/RESULT_COPY_V4.md', 'utf8'),
    readFile('src/data/quiz.ts', 'utf8'),
  ]);
  const approved = parseCopyDocument(copySource);

  for (const slug of Object.values(archetypes)) {
    const actual = parseQuizData(dataSource, slug);
    for (const field of allFields) {
      assert.ok(actual[field], `${slug}.${field} must not be empty`);
      assert.equal(actual[field], approved[slug][field], `${slug}.${field} must match the copy document`);
      assert.doesNotMatch(actual[field], /—/, `${slug}.${field} must not contain an em dash`);
      assert.doesNotMatch(actual[field], /\bmay\b/i, `${slug}.${field} must not contain “may”`);
    }
  }
});

test('result renders all approved sections in order', async () => {
  const source = await readFile('src/components/QuizApp.astro', 'utf8');
  const result = source.match(/<section class="screen" data-screen="result">[\s\S]*?<article class="share card">/)?.[0] ?? '';
  const markers = [
    'data-result-identity', 'data-even-note', '>At your best<', '>Your strengths<',
    '>How others see you<', '>The pattern to watch<', '>What you need<',
    '>Who you work best with<', '>How you fit with each type<',
    '>A question to sit with<', '>Your first step<',
  ];
  let previous = -1;
  for (const marker of markers) {
    const position = result.indexOf(marker);
    assert.ok(position > previous, `${marker} must appear in the approved order`);
    previous = position;
  }
  assert.match(result, /<section class="first-step" data-result-first-step-section>\s*<h3>Your first step<\/h3>/);
  assert.match(source, /\[data-result-first-step-section\]'\)\.hidden = !result\.firstStep/);
});

test('preview shows at your best and the full pattern but not strengths', async () => {
  const source = await readFile('src/components/QuizApp.astro', 'utf8');
  const preview = source.match(/<section class="screen" data-screen="teaser">[\s\S]*?<section class="screen" data-screen="capture">/)?.[0] ?? '';

  assert.match(preview, />At your best</);
  assert.match(preview, /data-teaser-at-best/);
  assert.match(preview, />The pattern to watch</);
  assert.match(preview, /data-teaser-pattern/);
  assert.doesNotMatch(preview, /data-teaser-strength/);
  assert.match(source, /\[data-teaser-pattern\].*result\.tendency/);
  assert.doesNotMatch(source, /firstSentence/);
});
