import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
const root = 'explorations/landing/working-audit/';
const source = await readFile(root + 'assets/logic.js', 'utf8');
const context = vm.createContext({});
vm.runInContext(source, context);
const logic = context.WorkingAudit;
test('working audit demo reverses cost statements and distinguishes empty from zero', () => {
  assert.equal(logic.reading([]), null);
  assert.equal(logic.reading([0, 0, 4]), 0);
  assert.equal(logic.reading([4, 4, 0]), 4);
  assert.equal(logic.reading([4, 4, 4]), 8 / 3);
});
test('working audit demo completes in three taps without mutating earlier answers', () => {
  const initial = [];
  const first = logic.answer(initial, 4);
  const second = logic.answer(first, 2);
  const third = logic.answer(second, 0);
  assert.equal(initial.length, 0);
  assert.equal(first.length, 1);
  assert.equal(third.length, 3);
  assert.equal(logic.answer(third, 1).length, 3);
  for (const invalid of [-1, 5, .5, NaN, '1']) assert.throws(() => logic.answer([], invalid));
});
test('working audit slice geometry clamps to the five-point range', () => {
  assert.equal(logic.sectorPath(0, -8), logic.sectorPath(0, 0));
  assert.equal(logic.sectorPath(0, 20), logic.sectorPath(0, 4));
  assert.match(logic.sectorPath(0, 2), /A 50 50/);
  assert.equal(logic.areas.length, 8);
});
test('working audit has no recording or submission and clears demo at handoff', async () => {
  const js = await readFile(root + 'assets/app.js', 'utf8');
  assert.doesNotMatch(js + source, /localStorage|sessionStorage|fetch\(|sendBeacon|XMLHttpRequest|mixpanel|document\.cookie/);
  assert.match(js, /if \(audit && !\$\('#landing'\)\.hidden\) \{[\s\S]*?answers = \[\]/);
  assert.match(js, /window\.addEventListener\('hashchange', route\)/);
  const html = await readFile(root + 'index.html', 'utf8');
  assert.match(html, /Fictional answers/);
  assert.match(html, /With first name and email/);
  assert.match(html, /Part 1 of 5/);
  assert.doesNotMatch(html, /—|https?:\/\//);
});

test('working audit DOM flow supports back, reset, clean handoff and return', async () => {
  class Node {
    constructor() { this.hidden = false; this.disabled = false; this.textContent = ''; this.innerHTML = ''; this.dataset = {}; this.attributes = {}; this.listeners = {}; this.classList = { toggle() {} }; }
    addEventListener(name, fn) { this.listeners[name] = fn; }
    setAttribute(name, value) { this.attributes[name] = value; }
    focus() {}
  }
  const selectors = ['.demo', '#demo-count', '#demo-statement', '#demo-answers', '#demo-done', '#demo-back', '#demo-status', '#demo-wheel', '#demo-reset', '#landing', '#handoff', '.nav__links', '.nav-start', '.skip-link', '#return-link', '#handoff-status', '#result-wheel', '#demo-answers .answer'];
  const nodes = Object.fromEntries(selectors.map(key => [key, new Node()]));
  const handoffButtons = Array.from({ length: 5 }, (_, i) => Object.assign(new Node(), { dataset: { handoff: String(i) } }));
  const start = new Node();
  const document = { querySelector: selector => nodes[selector], querySelectorAll: selector => selector === '[data-handoff]' ? handoffButtons : [start], activeElement: start };
  const location = { hash: '', pathname: '/index.html', search: '' };
  const window = { scrollY: 50, scrollTo() {}, addEventListener(name, handler) { this[name] = handler; } };
  const history = { replaceState(_a, _b, path) { location.hash = path.slice(path.indexOf('#')); } };
  const ctx = vm.createContext({ document, window, location, history });
  vm.runInContext(source, ctx);
  vm.runInContext(await readFile(root + 'assets/app.js', 'utf8'), ctx);
  function tap(value) { nodes['#demo-answers'].listeners.click({ target: { closest: () => ({ dataset: { value: String(value) } }) }, detail: 1 }); }
  tap(4);
  assert.equal(nodes['#demo-count'].textContent, '2 of 3');
  assert.match(nodes['#demo-statement'].textContent, /something else/);
  nodes['#demo-back'].listeners.click();
  assert.equal(nodes['#demo-count'].textContent, '1 of 3');
  tap(4); tap(2); tap(0);
  assert.equal(nodes['#demo-answers'].hidden, true);
  assert.equal(nodes['#demo-done'].hidden, false);
  nodes['#demo-reset'].listeners.click();
  assert.equal(nodes['#demo-count'].textContent, '1 of 3');
  tap(3);
  location.hash = '#audit'; window.hashchange();
  assert.equal(nodes['#landing'].hidden, true);
  assert.equal(nodes['#handoff'].hidden, false);
  assert.equal(nodes['#demo-count'].textContent, '1 of 3');
  handoffButtons[2].listeners.click();
  assert.equal(handoffButtons[2].attributes['aria-pressed'], 'true');
  assert.equal(handoffButtons[1].attributes['aria-pressed'], 'false');
  assert.match(nodes['#handoff-status'].textContent, /A bit like me/);
  nodes['#return-link'].listeners.click({ preventDefault() {} });
  assert.equal(nodes['#landing'].hidden, false);
  assert.equal(nodes['#handoff'].hidden, true);
});

test('working audit relative assets and internal links resolve, CSS parses and colours meet AA', async () => {
  const { existsSync } = await import('node:fs');
  const { dirname, resolve } = await import('node:path');
  const { parse } = await import('css-tree');
  const html = await readFile(root + 'index.html', 'utf8');
  const css = await readFile(root + 'assets/style.css', 'utf8');
  parse(css);
  for (const match of html.matchAll(/(?:src|href)="(assets\/[^"$]+)"/g)) assert.ok(existsSync(root + match[1]), match[1]);
  for (const match of css.matchAll(/url\('([^']+)'\)/g)) assert.ok(existsSync(resolve(dirname(root + 'assets/style.css'), match[1])), match[1]);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(ids.length, new Set(ids).size);
  for (const match of html.matchAll(/href="#([^"]+)"/g)) assert.ok(match[1] === 'audit' || ids.includes(match[1]), match[1]);
  assert.equal((html.match(/class="wheel-svg"/g) || []).length, 2, 'Both wheels render before JavaScript');
  const luminance = hex => {
    const rgb = hex.match(/\w\w/g).map(value => parseInt(value, 16) / 255).map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4);
    return rgb[0] * .2126 + rgb[1] * .7152 + rgb[2] * .0722;
  };
  for (const [foreground, background] of [['FFFCEF', '0D0D0D'], ['FFDE59', '0D0D0D'], ['B6B4AB', '0D0D0D']]) {
    const pair = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
    assert.ok((pair[0] + .05) / (pair[1] + .05) >= 4.5);
  }
});

test('working audit uses the current v3 first statements and first handoff question', async () => {
  const bank = await readFile('docs/life-audit/QUESTIONS-V3.md', 'utf8');
  for (const question of logic.questions) assert.ok(bank.includes(question.text), question.text);
  const html = await readFile(root + 'index.html', 'utf8');
  assert.ok(html.includes(`<h1 id="audit-h">${logic.questions[0].text}</h1>`));
  for (const label of ['Mostly not me', 'A bit like me', 'Mostly me']) assert.ok(html.includes(label));
});
