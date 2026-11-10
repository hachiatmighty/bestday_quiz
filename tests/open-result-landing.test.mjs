import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { areas } from '../life-audit/data/audit.mjs';
import { exampleAreas, areaReading, suggestedFocus, priorities, firstStatement, goal, firstStep } from '../explorations/landing/open-result/assets/example.mjs';

const root = resolve('explorations/landing/open-result');
const html = await readFile(resolve(root, 'index.html'), 'utf8');

test('open-result example applies v3 reversal and missing-answer rules', () => {
  const base = exampleAreas[0];
  assert.equal(areaReading({ ...base, responses: [4, 4, 0, 0], checkValue: 4 }), 4);
  assert.equal(areaReading({ ...base, responses: [0, 0, 4, 4], checkValue: 0 }), 0);
  assert.equal(areaReading({ ...base, responses: [4, null, 0, null], checkValue: null }), null);
  assert.equal(areaReading({ ...base, responses: [4, null, 0, null], checkValue: 1 }), 3);
  assert.equal(areaReading(exampleAreas.find(a => a.id === 'home')), null);
});

test('open-result focus follows chosen priorities rather than lowest overall area', () => {
  assert.equal(suggestedFocus(), 'relationships');
  assert.equal(suggestedFocus(exampleAreas, []), 'rest');
  assert.equal(suggestedFocus(exampleAreas, ['home']), null);
  assert.equal(suggestedFocus([], priorities), null);
  assert.equal(suggestedFocus([exampleAreas[0], { ...exampleAreas[0], id: 'tie' }], []), null);
  assert.ok(areaReading(exampleAreas.find(a => a.id === 'rest')) < areaReading(exampleAreas.find(a => a.id === 'relationships')));
});

test('open-result uses the reviewed goal and first step verbatim', () => {
  const reviewed = areas.find(a => a.id === 'relationships').suggestions.hour[0];
  assert.equal(goal, reviewed.goal);
  assert.equal(firstStep, reviewed.firstStep);
  assert.ok(html.includes(goal));
  assert.ok(html.includes(firstStep));
});

test('open-result shows the complete fictional result, access terms and first statement', () => {
  for (const content of ['Example result', 'Your circle read', 'Your one thing', 'Suggested focus', 'About 8 minutes', 'About 52 answers', 'Name and email for the full result', firstStatement]) {
    assert.ok(html.includes(content), content);
  }
  assert.equal((html.match(/data-area="/g) || []).length, 8);
  assert.equal((html.match(/data-answer="/g) || []).length, 5);
  assert.match(html, /id="audit"[^>]*hidden/);
  assert.doesNotMatch(html, /—|three minutes|3 minutes|https?:\/\//);
});

test('open-result handoff and evidence use retained v3 questions and scale labels', async () => {
  const questions = await readFile('docs/life-audit/QUESTIONS-V3.md', 'utf8');
  assert.equal(firstStatement, 'I got something done on the work I wanted to do.');
  for (const area of exampleAreas) {
    for (const statement of area.statements) assert.ok(questions.includes(statement), statement);
  }
  for (const label of ['Mostly not me', 'A bit like me', "That's me"]) assert.ok(html.includes(label));
});

test('open-result asset references are self-contained and internal links resolve', async () => {
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]));
  for (const match of html.matchAll(/(?:src|href|content)="(assets\/[^"#]+)"/g)) {
    await access(resolve(root, match[1]));
  }
  for (const match of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.has(match[1]), match[1]);
  const css = await readFile(resolve(root, 'assets/style.css'), 'utf8');
  for (const match of css.matchAll(/url\('([^']+)'\)/g)) await access(resolve(root, 'assets', match[1]));
  const js = await readFile(resolve(root, 'assets/app.mjs'), 'utf8');
  for (const match of js.matchAll(/from '([^']+)'/g)) await access(resolve(dirname(resolve(root, 'assets/app.mjs')), match[1]));
  assert.doesNotMatch(js, /fetch\(|localStorage|sessionStorage|sendBeacon|mixpanel|https?:/);
});

test('open-result interactions inspect evidence and keep the handoff isolated', async () => {
  class Control extends EventTarget {
    constructor(dataset = {}) {
      super(); this.dataset = dataset; this.hidden = false; this.attributes = {}; this.children = []; this.textContent = '';
      this.classList = { toggle() {} };
    }
    setAttribute(key, value) { this.attributes[key] = value; }
    replaceChildren(...children) { this.children = children; }
    append(...children) { this.children.push(...children); }
    focus() { focused = this; }
    click() { this.dispatchEvent(new Event('click')); }
  }
  let focused;
  const selectors = new Map(['#area-answers', '#evidence-area', '#evidence-count', '#evidence-intro', '#top', '.closing', '#audit', '.nav__links', '.nav-start', '.nav-back', '.skip-link', '#question-title', '.answer-status'].map(key => [key, new Control()]));
  const areaButtons = exampleAreas.map(area => new Control({ area: area.id }));
  const wheelParts = exampleAreas.map(area => new Control({ wheelArea: area.id }));
  const startButtons = Array.from({ length: 3 }, () => new Control());
  const choices = Array.from({ length: 5 }, (_, answer) => new Control({ answer: String(answer) }));
  const sets = new Map([['[data-area]', areaButtons], ['.large-wheel [data-wheel-area]', wheelParts], ['a[href="#audit"]', startButtons], ['[data-answer]', choices]]);
  const page = new EventTarget();
  page.location = { hash: '' }; page.scrollY = 0;
  page.scrollTo = (_, y) => { page.scrollY = y; };
  const originals = { document: globalThis.document, window: globalThis.window, requestAnimationFrame: globalThis.requestAnimationFrame };
  const snapshot = JSON.stringify(exampleAreas);
  try {
    globalThis.document = { querySelector: key => selectors.get(key), querySelectorAll: key => sets.get(key) || [], createElement: () => new Control(), body: new Control() };
    globalThis.window = page;
    globalThis.requestAnimationFrame = callback => callback();
    await import('../explorations/landing/open-result/assets/app.mjs');
    areaButtons[0].click();
    assert.equal(selectors.get('#evidence-area').textContent, 'Work and direction');
    assert.equal(selectors.get('#area-answers').children.length, 5);
    assert.equal(areaButtons[0].attributes['aria-pressed'], 'true');
    assert.equal(areaButtons[3].attributes['aria-pressed'], 'false');
    areaButtons[6].click();
    assert.match(selectors.get('#evidence-intro').textContent, /stays missing/);
    assert.equal(selectors.get('#area-answers').children.length, 1);
    page.scrollY = 3200;
    startButtons[2].click();
    page.location.hash = '#audit'; page.dispatchEvent(new Event('hashchange'));
    assert.equal(selectors.get('#top').hidden, true);
    assert.equal(selectors.get('.closing').hidden, true);
    assert.equal(selectors.get('#audit').hidden, false);
    assert.equal(focused, selectors.get('#question-title'));
    assert.equal(page.scrollY, 0);
    assert.equal(selectors.get('.skip-link').attributes.href, '#audit');
    choices[1].click(); choices[4].click();
    assert.equal(choices.filter(choice => choice.attributes['aria-pressed'] === 'true').length, 1);
    assert.equal(selectors.get('.answer-status').textContent, 'You chose “That\'s me”.');
    page.location.hash = '#top'; page.dispatchEvent(new Event('hashchange'));
    assert.equal(selectors.get('#top').hidden, false);
    assert.equal(selectors.get('#audit').hidden, true);
    assert.equal(page.scrollY, 3200);
    assert.equal(focused, startButtons[2]);
    assert.equal(JSON.stringify(exampleAreas), snapshot);
  } finally {
    for (const [key, value] of Object.entries(originals)) {
      if (value === undefined) delete globalThis[key]; else globalThis[key] = value;
    }
  }
});
