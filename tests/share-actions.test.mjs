import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const componentUrl = new URL('../src/components/ShareActions.astro', import.meta.url);
const quizUrl = new URL('../src/components/QuizApp.astro', import.meta.url);

test('every share surface renders the same four accessible icon actions', async () => {
  const actions = await readFile(componentUrl, 'utf8');
  const quiz = await readFile(quizUrl, 'utf8');

  assert.match(quiz, /<ShareActions \/>/);
  assert.match(quiz, /<ShareActions prefix="result-" \/>/);
  assert.match(quiz, /<ShareActions prefix="end-" \/>/);
  assert.equal((actions.match(/class="share-action(?: whatsapp| brand)?"/g) ?? []).length, 4);
  assert.match(actions, /aria-label="Share to Instagram"/);
  assert.match(actions, /dataAttribute\('instagram'\)/);
  assert.match(actions, /aria-label="Send to WhatsApp"/);
  assert.match(actions, /aria-label="Share"/);
  assert.match(actions, /aria-label="Save card"/);
  assert.match(actions, /dataAttribute\('whatsapp'\)/);
  assert.match(actions, /dataAttribute\('share'\)/);
  assert.match(actions, /dataAttribute\('save'\)/);
  assert.match(actions, /download/);
  assert.doesNotMatch(actions, />Send to WhatsApp</);
  assert.doesNotMatch(actions, />Save card</);
});

test('existing share behavior and analytics hooks stay intact', async () => {
  const quiz = await readFile(quizUrl, 'utf8');

  assert.match(quiz, /https:\/\/wa\.me\/\?text=\$\{encodeURIComponent\(message\)\}/);
  assert.match(quiz, /url\.searchParams\.set\('ref', resultSlug\)/);
  assert.match(quiz, /navigator\.share\(\{ title: result\.name, text: result\.forward, url: shareUrl\(\)\.toString\(\) \}\)/);
  assert.match(quiz, /navigator\.clipboard\.writeText\(message\)/);
  assert.match(quiz, /saveLink\.href = cardUrl\(\)/);
  assert.match(quiz, /track\('share_click', \{ channel: 'whatsapp'/);
  assert.match(quiz, /track\('share_click', \{ channel: navigator\.share \? 'native' : 'clipboard'/);
  assert.match(quiz, /track\('card_download'/);
  assert.match(quiz, /track\('share_click', \{ channel: 'instagram'/);
  assert.match(quiz, /navigator\.share\(\{ files: \[cardFile\], text: message \}\)/);
  assert.match(quiz, /min-width:44px;min-height:44px/);
  assert.match(quiz, /\.share-action:focus-visible/);
});
