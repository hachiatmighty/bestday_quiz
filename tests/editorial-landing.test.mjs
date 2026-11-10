import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { resolve } from 'node:path';
import vm from 'node:vm';
import postcss from 'postcss';

const root = resolve('explorations/landing/editorial');
const html = await readFile(`${root}/index.html`, 'utf8');
const css = await readFile(`${root}/assets/editorial.css`, 'utf8');
const sandbox = vm.createContext({});
vm.runInContext(await readFile(`${root}/assets/state.js`, 'utf8'), sandbox);
const { createExplorationState, selectAnswer, openAudit, closeAudit } = sandbox.BestdayEditorialState;

test('editorial practice and personal answers remain separate through the handoff', () => {
  const state = createExplorationState();
  assert.equal(selectAnswer(state, 'practice', 4), true);
  openAudit(state, 5320);
  assert.equal(state.screen, 'audit');
  assert.equal(state.answer, null);
  assert.equal(selectAnswer(state, 'answer', 0), true);
  assert.equal(state.practice, 4);
  assert.equal(closeAudit(state), 5320);
  assert.equal(state.screen, 'landing');
  openAudit(state, 0);
  assert.equal(state.answer, 0);
  assert.equal(createExplorationState().answer, null);
});

test('editorial scale accepts only the five answers and rejects invalid state writes', () => {
  for (let value = 0; value <= 4; value++) {
    const state = createExplorationState();
    assert.equal(selectAnswer(state, 'answer', value), true);
    assert.equal(state.answer, value);
  }
  const state = createExplorationState();
  for (const value of [-1, 5, 2.5, '3', null, undefined, NaN, Infinity]) {
    assert.equal(selectAnswer(state, 'answer', value), false);
    assert.equal(state.answer, null);
  }
  for (const channel of ['screen', 'returnY', '__proto__', 'missing']) {
    assert.equal(selectAnswer(state, channel, 2), false);
  }
  for (const value of [-1, NaN, Infinity, undefined]) {
    assert.equal(openAudit(state, value).returnY, 0);
  }
});

test('editorial DOM handoff keeps practice separate and restores reading position and focus', async () => {
  class Element {
    constructor(text = '') { this.textContent = text; this.listeners = {}; this.attributes = {}; this.dataset = {}; this.hidden = false; this.focusCount = 0; }
    addEventListener(name, handler) { this.listeners[name] = handler; }
    setAttribute(name, value) { this.attributes[name] = value; }
    focus() { this.focusCount++; }
  }
  const selectors = ['#landing', '#audit', '#audit-heading', '.skip-link', '[data-return]', '.nav .brand', '[data-practice-scale]', '[data-audit-scale]', '[data-practice-status]', '[data-audit-status]', '.statements'];
  const nodes = Object.fromEntries(selectors.map(selector => [selector, new Element()]));
  const starts = [new Element(), new Element()];
  const labels = ['Not me', 'Mostly not me', 'A bit like me', 'Mostly me', "That's me"];
  for (const selector of ['[data-practice-scale]', '[data-audit-scale]']) {
    const buttons = labels.map((label, i) => {
      const button = new Element(label);
      button.dataset.value = String(i);
      button.attributes['aria-pressed'] = 'false';
      return button;
    });
    nodes[selector].buttons = buttons;
    nodes[selector].contains = button => buttons.includes(button);
    nodes[selector].querySelectorAll = () => buttons;
  }
  const document = { querySelector: selector => nodes[selector], querySelectorAll: () => starts };
  const location = { hash: '#closing', pathname: '/editorial/index.html', search: '' };
  const window = { scrollY: 5400, listeners: {}, scrollTo(_x, y) { this.scrollY = y; }, addEventListener(name, fn) { this.listeners[name] = fn; } };
  const history = {
    state: null,
    pushState(state, _title, hash) { this.state = state; location.hash = hash; },
    back() { this.state = null; location.hash = '#closing'; window.listeners.popstate(); window.listeners.hashchange(); }
  };
  const context = vm.createContext({ document, window, location, history, matchMedia: () => ({ matches: true }) });
  vm.runInContext(await readFile(`${root}/assets/state.js`, 'utf8'), context);
  vm.runInContext(await readFile(`${root}/assets/editorial.js`, 'utf8'), context);
  function choose(selector, value) {
    const button = nodes[selector].buttons[value];
    nodes[selector].listeners.click({ target: { closest: () => button } });
  }
  choose('[data-practice-scale]', 2);
  assert.match(nodes['[data-practice-status]'].textContent, /A bit like me/);
  starts[1].listeners.click({ preventDefault() {} });
  assert.equal(location.hash, '#audit');
  assert.equal(nodes['#landing'].hidden, true);
  assert.equal(nodes['#audit'].hidden, false);
  assert.equal(window.scrollY, 0);
  assert.ok(nodes['#audit-heading'].focusCount > 0);
  assert.ok(nodes['[data-audit-scale]'].buttons.every(button => button.attributes['aria-pressed'] === 'false'));
  choose('[data-audit-scale]', 4);
  assert.match(nodes['[data-audit-status]'].textContent, /That's me/);
  assert.equal(nodes['[data-practice-scale]'].buttons[2].attributes['aria-pressed'], 'true');
  nodes['[data-return]'].listeners.click({ preventDefault() {} });
  assert.equal(nodes['#landing'].hidden, false);
  assert.equal(nodes['#audit'].hidden, true);
  assert.equal(window.scrollY, 5400);
  assert.equal(starts[1].focusCount, 1);
  assert.equal(nodes['.skip-link'].href, '#content');
});

test('editorial has complete relative assets and valid in-page destinations', async () => {
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length, 'IDs are unique');
  const refs = [...html.matchAll(/\b(?:src|href|content)="(assets\/[^"#]+)"/g)].map(match => match[1]);
  for (const ref of refs) await access(resolve(root, ref));
  for (const [, id] of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.includes(id), id);
  for (const [, font] of css.matchAll(/url\('([^']+)'\)/g)) await access(resolve(root, 'assets', font));
  for (const file of ['editorial.js', 'state.js', 'motion.js']) {
    const js = await readFile(`${root}/assets/${file}`, 'utf8');
    new vm.Script(js, { filename: file });
    assert.doesNotMatch(js, /\b(?:import|export)\s+(?:\{|function|const|default)/, 'direct file opening needs no module server');
  }
  assert.doesNotMatch(html, /(?:src|href)="(?:https?:|\/\/|\/)/);
});

test('editorial sells v3 and uses the selected Work statements and scale from the question bank', async () => {
  assert.match(html, /About 8 minutes/);
  assert.match(html, /About 52 answers/);
  assert.match(html, /A review in 5 parts/);
  assert.match(html, /First name and email open the rest/);
  const first = html.match(/<ol class="statements">\s*<li><span>(.*?)<\/span>/)[1];
  assert.equal(html.match(/<h1 id="audit-heading"[^>]*>(.*?)<\/h1>/)[1], first);
  const bank = await readFile('docs/life-audit/QUESTIONS-V3.md', 'utf8');
  const selected = [...bank.matchAll(/\| work\.(?:W1|W2|C1|C2) \| ([^|]+) \|/g)].map(m => m[1].trim());
  const example = [...html.match(/<ol class="statements">([\s\S]*?)<\/ol>/)[1].matchAll(/<span>(.*?)<\/span>/g)].map(m => m[1]);
  assert.equal(selected.length, 4);
  assert.deepEqual(example, selected);
  const circleStatement = bank.match(/\| S1 \| ([^|]+) \|/)[1].trim();
  assert.equal(html.match(/<blockquote class="pull-statement">(.*?)<\/blockquote>/)[1], circleStatement);
  assert.match(html, /A bit like me/);
  assert.doesNotMatch(html, /In between/);
  for (const scale of ['data-practice-scale', 'data-audit-scale']) {
    const body = html.slice(html.indexOf(scale)).split('</div>')[0];
    assert.deepEqual([...body.matchAll(/data-value="(\d)"/g)].map(m => Number(m[1])), [0, 1, 2, 3, 4]);
    const labels = [...bank.matchAll(/\| (Not me|Mostly not me|A bit like me|Mostly me|That's me) \| \d \|/g)].map(m => m[1]);
    assert.deepEqual([...body.matchAll(/<button[^>]+>(.*?)<\/button>/g)].map(m => m[1]), labels);
  }
  assert.doesNotMatch(html, /—|three minutes|0 to 10|unlock|wellbeing|mindset/);
});

test('editorial surfaces and text pairs meet AA, with no yellow on cream', () => {
  const tree = postcss.parse(css), tokens = {};
  tree.walkRules(':root', rule => rule.walkDecls(/^--/, d => tokens[d.prop] = d.value));
  const luminance = hex => {
    const rgb = hex.slice(1).match(/../g).map(c => parseInt(c, 16) / 255).map(c => c <= .04045 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4);
    return rgb.reduce((sum, c, i) => sum + c * [.2126, .7152, .0722][i], 0);
  };
  for (const [front, back] of [['black', 'cream'], ['cream', 'black'], ['yellow', 'black']]) {
    const a = luminance(tokens[`--${front}`]), b = luminance(tokens[`--${back}`]);
    assert.ok((Math.max(a,b) + .05) / (Math.min(a,b) + .05) >= 4.5);
  }
  for (const selector of ['html', 'body']) {
    let bg = false, font = false;
    tree.walkRules(selector, rule => rule.walkDecls(d => {
      if (d.prop === 'background') bg = true;
      if (d.prop === 'font-family') font = true;
    }));
    assert.ok(bg && font, `${selector} must set background and font`);
  }
  assert.match(css, /\.paper\s*\{[^}]*--action:var\(--black\)/);
  assert.match(css, /\.paper \.answer-scale button\[aria-pressed="true"\]\{background:var\(--black\);color:var\(--yellow\)/);
  assert.match(css, /prefers-reduced-motion:reduce/);
  assert.doesNotMatch(css, /overflow-x:\s*hidden|scroll-snap/);
});
