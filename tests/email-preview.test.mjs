import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

const emailSlugs = ['result', 'people', 'quiet', 'one-goal'];
const archetypeSlugs = ['sprinter', 'planner', 'anchor', 'explorer', 'finisher'];

test('built email previews use real links and sentence-case styling', async () => {
  for (const archetype of archetypeSlugs) {
    for (const slug of emailSlugs) {
      const file = path.resolve('dist', 'email', archetype, slug, 'index.html');
      const html = await readFile(file, 'utf8');
      assert.doesNotMatch(html, /href=["']#["']/i, `${archetype}/${slug} contains a placeholder link`);
      assert.doesNotMatch(html, /text-transform\s*:\s*uppercase/i, `${archetype}/${slug} contains uppercase text-transform`);
      assert.doesNotMatch(html, /letter-spacing\s*:/i, `${archetype}/${slug} contains letter-spacing`);
    }
  }
});

test('email preheaders stay hidden and the people email uses a compact list', async () => {
  const resultHtml = await readFile(path.resolve('dist', 'email', 'anchor', 'result', 'index.html'), 'utf8');
  assert.match(resultHtml, /display:none;max-height:0;overflow:hidden;mso-hide:all/);
  assert.equal((resultHtml.match(/Your full read, and the kind of person who helps you most\./g) ?? []).length, 1);

  const peopleHtml = await readFile(path.resolve('dist', 'email', 'anchor', 'people', 'index.html'), 'utf8');
  assert.match(peopleHtml, /<ul[^>]*>/);
  assert.equal((peopleHtml.match(/<li(?:\s|>)/g) ?? []).length, 3);
});

test('result email includes the card, headings, and email redirect URL', async () => {
  const html = await readFile(path.resolve('dist', 'email', 'anchor', 'result', 'index.html'), 'utf8');
  assert.match(html, /https:\/\/bestday\.ai\/quiz\/assets\/cards\/anchor\.png/);
  assert.match(html, /Your Bestday card: The Anchor/);
  assert.match(html, /Your strengths/);
  assert.match(html, /The pattern to watch/);
  assert.match(html, /What you need/);
  assert.match(html, /https:\/\/bestday\.ai\/quiz\/start\?ref=email&amp;type=anchor/);
});

test('people email links to the sender-specific referral route', async () => {
  const html = await readFile(path.resolve('dist', 'email', 'anchor', 'people', 'index.html'), 'utf8');
  assert.match(html, /https:\/\/bestday\.ai\/quiz\/r\/anchor\?ref=anchor/);
});
