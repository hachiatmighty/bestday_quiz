import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

const emailSlugs = ['result', 'people', 'quiet', 'one-goal'];

test('built email previews use real links and sentence-case styling', async () => {
  for (const slug of emailSlugs) {
    const file = path.resolve('dist', 'email', 'anchor', slug, 'index.html');
    const html = await readFile(file, 'utf8');
    assert.doesNotMatch(html, /href=["']#["']/i, `${slug} contains a placeholder link`);
    assert.doesNotMatch(html, /text-transform\s*:\s*uppercase/i, `${slug} contains uppercase text-transform`);
    assert.doesNotMatch(html, /letter-spacing\s*:/i, `${slug} contains letter-spacing`);
  }
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
