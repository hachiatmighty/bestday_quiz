import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { resolve } from 'node:path';
import { answerLabels, answerSelection, sharePreview } from '../explorations/landing/people-first/assets/preview.mjs';
import { areas } from '../life-audit/data/audit.mjs';
import { runInNewContext } from 'node:vm';

const root = resolve('explorations/landing/people-first');
const html = await readFile(resolve(root, 'index.html'), 'utf8');
const css = await readFile(resolve(root, 'assets/style.css'), 'utf8');

test('people-first sharing starts private and requires explicit inclusion of the wheel', () => {
  for (const value of [undefined, false, null, 'true', 1]) assert.equal(sharePreview(value).includeWheel, false);
  assert.equal(sharePreview(true).includeWheel, true);
  assert.match(sharePreview().description, /wheel stays private/);
  assert.match(html, /id="shared-wheel" hidden/);
  assert.doesNotMatch(html.match(/<input[^>]+id="include-wheel"[^>]*>/)[0], /\bchecked\b/);
  const suggestion = areas.find(area => area.id === 'relationships').suggestions.hour[0];
  assert.equal(sharePreview().goal, suggestion.goal);
  assert.equal(sharePreview().firstStep, suggestion.firstStep);
});

test('people-first question accepts exactly the five visible responses', () => {
  const buttons = [...html.matchAll(/data-answer="(\d)" aria-pressed="false">([^<]+)<\/button>/g)];
  assert.equal(buttons.length, 5);
  buttons.forEach((button, index) => {
    assert.equal(Number(button[1]), index);
    assert.equal(button[2], answerLabels[index]);
    assert.deepEqual(answerSelection(index), { value: index, label: button[2] });
  });
  for (const invalid of [-1, 5, 1.5, '1', NaN, null]) assert.throws(() => answerSelection(invalid), RangeError);
});

test('people-first handoff and circle statements follow the v3 question bank', async () => {
  const bank = await readFile('docs/life-audit/QUESTIONS-V3.md', 'utf8');
  const first = bank.match(/\| work\.W1 \| ([^|]+) \|/)[1].trim();
  assert.equal(html.match(/id="question-title" tabindex="-1">([^<]+)/)[1], first);
  for (const id of ['S3', 'S4', 'S5', 'work.C1']) {
    const statement = bank.match(new RegExp(`\\| ${id} \\| ([^|]+) \\|`))[1].trim();
    assert.ok(html.includes(statement), id);
  }
  for (const label of answerLabels) assert.ok(bank.includes(label), label);
});

test('people-first is self-contained with real destinations and local assets', async () => {
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length);
  for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
    const target = match[1];
    if (target.startsWith('#')) assert.ok(ids.includes(target.slice(1)), `Missing anchor ${target}`);
    else {
      assert.ok(!target.startsWith('/') && !target.includes('://'), `External dependency ${target}`);
      await access(resolve(root, target));
    }
  }
  for (const match of css.matchAll(/url\('([^']+)'\)/g)) await access(resolve(root, 'assets', match[1]));
  const script = await readFile(resolve(root, 'assets/page.js'), 'utf8');
  for (const match of script.matchAll(/from '([^']+)'/g)) await access(resolve(root, 'assets', match[1]));
  assert.doesNotMatch(script, /localStorage|sessionStorage|fetch\(|sendBeacon|XMLHttpRequest/);
});

test('people-first sells v3, labels fictional results and discloses the email boundary', () => {
  assert.match(html, /About 8 minutes, free/);
  assert.match(html, /8 areas and 5 parts, with about 52 answers/);
  assert.match(html, /Fictional answers/);
  assert.match(html, /Example share preview/);
  assert.match(html, /First name and email open the rest/);
  for (const area of areas) assert.ok(html.includes(area.name), area.name);
  assert.doesNotMatch(html, /—|three minutes|0 to 10|95%|testimonial/i);
});

test('people-first brand text pairs meet AA and both root surfaces are explicit', () => {
  const rgb = hex => hex.match(/[a-f\d]{2}/gi).map(value => parseInt(value, 16) / 255).map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4);
  const luminance = hex => rgb(hex).reduce((sum, value, index) => sum + value * [.2126, .7152, .0722][index], 0);
  const contrast = (a, b) => (Math.max(luminance(a), luminance(b)) + .05) / (Math.min(luminance(a), luminance(b)) + .05);
  const tokens = Object.fromEntries([...css.matchAll(/--(black|cream|yellow):\s*(#[\da-f]{6})/gi)].map(m => [m[1], m[2]]));
  for (const [fg, bg] of [['black', 'cream'], ['cream', 'black'], ['yellow', 'black']]) assert.ok(contrast(tokens[fg], tokens[bg]) >= 4.5);
  for (const element of ['html', 'body']) assert.match(css, new RegExp(`${element}\\{[^}]*background:var\\(--black\\)[^}]*font-family:Urbanist`));
  assert.match(css, /\.cream \.btn--primary\{background:var\(--black\);color:var\(--yellow\)\}/);
  assert.match(css, /prefers-reduced-motion:reduce/);
});

test('people-first controls apply sharing, answer and history changes to the interface', async () => {
  const source = (await readFile(resolve(root, 'assets/page.js'), 'utf8')).replace(/^import[^\n]+\n/, '');
  function element(dataset = {}) {
    const listeners = {};
    return {
      dataset, hidden: false, checked: false, attrs: {}, textContent: '', focused: false,
      classList: { toggle() {} },
      addEventListener(type, callback) { listeners[type] = callback; },
      dispatch(type) { listeners[type]?.(); },
      setAttribute(name, value) { this.attrs[name] = value; },
      focus() { this.focused = true; },
    };
  }
  const sections = [element(), element()];
  const start = element();
  const answers = answerLabels.map((_, index) => element({ answer: String(index) }));
  const ids = Object.fromEntries(['#first-question', '#start', '#include-wheel', '#shared-wheel', '#share-status', '#return-landing', '#question-title', '#answer-status', '.nav-links', '.nav-start', '.share-export'].map(id => [id, element()]));
  const events = {};
  const location = { hash: '' };
  let scroll = [];
  const document = {
    title: '',
    querySelector: selector => ids[selector],
    querySelectorAll: selector => selector === '[data-start]' ? [start] : selector === '[data-answer]' ? answers : sections,
  };
  const history = { back() { location.hash = ''; events.hashchange(); } };
  runInNewContext(source, { document, location, history, answerSelection, sharePreview, window: { scrollY: 450, scrollTo: (...values) => { scroll = values; }, addEventListener: (type, callback) => { events[type] = callback; } } });
  ids['#include-wheel'].checked = true;
  ids['#include-wheel'].dispatch('change');
  assert.equal(ids['#shared-wheel'].hidden, false);
  ids['#include-wheel'].checked = false;
  ids['#include-wheel'].dispatch('change');
  assert.equal(ids['#shared-wheel'].hidden, true);
  assert.match(ids['#share-status'].textContent, /wheel stays private/);
  start.dispatch('click');
  location.hash = '#first-question';
  events.hashchange();
  assert.ok(sections.every(section => section.hidden));
  assert.equal(ids['#first-question'].hidden, false);
  assert.ok(ids['#question-title'].focused);
  answers[4].dispatch('click');
  answers[1].dispatch('click');
  assert.equal(answers.filter(answer => answer.attrs['aria-pressed'] === 'true').length, 1);
  assert.equal(answers[1].attrs['aria-pressed'], 'true');
  assert.match(ids['#answer-status'].textContent, /Mostly not me/);
  ids['#return-landing'].dispatch('click');
  assert.ok(sections.every(section => !section.hidden));
  assert.equal(ids['#first-question'].hidden, true);
  assert.ok(start.focused);
  assert.deepEqual(scroll, [0, 450]);
});
