import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { openSync, closeSync, readFileSync, unlinkSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { areas, contextOptions, timeOptions, horizonOptions } from '../life-audit/data/audit.mjs';
import * as audit from '../src/lib/life-audit.mjs';
import { lifeAuditProperties } from '../src/lib/life-audit-analytics.mjs';

test('data follows spec order and has three concrete suggestions for every time budget', () => {
  assert.deepEqual(areas.map(a => a.id), ['work','money','health','relationships','growth','rest','home','meaning']);
  assert.equal(contextOptions.length, 4);
  assert.equal(timeOptions.length, 4);
  assert.deepEqual(horizonOptions.map(o => o.id), [4,8,12]);
  for (const area of areas) {
    assert.ok(area.name && area.short && area.prompt && area.reflection);
    for (const time of timeOptions) {
      const suggestions = audit.suggestionsFor(area.id, time.id);
      assert.equal(suggestions.length, 3);
      assert.equal(new Set(suggestions.map(item => item.goal)).size, 3);
      for (const { goal, firstStep } of suggestions) {
        assert.ok(goal.length > 10 && firstStep.length > 10);
        // The person picks 4, 8 or 12 weeks separately, so goals never state a duration.
        assert.doesNotMatch(goal, /\b(four|eight|twelve|\d+) weeks\b/);
      }
      suggestions.pop();
      assert.equal(audit.suggestionsFor(area.id, time.id).length, 3);
    }
  }
  assert.doesNotMatch(JSON.stringify(areas), /—/);
  assert.deepEqual(audit.suggestionsFor('unknown', 'hour'), []);
});

test('answers advance, back retains and replaces ratings, focus respects choice', () => {
  const state = audit.createAuditState();
  audit.goBack(state);
  assert.equal(state.questionIndex, 0);
  audit.recordSegment(state, 'curious');
  audit.startAudit(state);
  audit.recordRating(state, 'work', 0);
  audit.goBack(state);
  assert.equal(state.ratings.work, 0);
  audit.recordRating(state, 'work', 10);
  for (const area of areas.slice(1)) audit.recordRating(state, area.id, null);
  assert.deepEqual(audit.focusOptions(state).map(a => a.id), ['work']);
  assert.throws(() => audit.recordFocus(state, 'money'));
  audit.recordFocus(state, 'work');
  audit.recordTime(state, 'hour');
  assert.equal(state.questionIndex, 12);
  while (state.questionIndex > 2) audit.goBack(state);
  audit.recordRating(state, 'work', null);
  assert.equal(state.focusArea, null);
  assert.equal(state.timeOption, null);
  assert.deepEqual(audit.focusOptions(state), []);
});

test('focus offers every rated area in spec order and validates input', () => {
  assert.deepEqual(audit.focusOptions({ratings:{ meaning:0, work:10, money:null, health:5 }}).map(a => a.id), ['work','health','meaning']);
  for (const value of [-1,11,1.5,'5',undefined,NaN]) {
    const state = audit.createAuditState(); state.questionIndex = 2;
    assert.throws(() => audit.recordRating(state,'work',value));
    assert.deepEqual(state.ratings, {});
  }
  assert.throws(() => audit.recordSegment(audit.createAuditState(), 'bad'));
  assert.throws(() => audit.recordTime(audit.createAuditState(), 'hour'));
});

test('wheel is deterministic with eight equal sectors and distinct missing versus zero', () => {
  const ratings = { work:0, money:10, health:5, relationships:null };
  const wheel = audit.wheelGeometry(ratings);
  assert.deepEqual(wheel, audit.wheelGeometry(ratings));
  assert.equal(wheel.length, 8);
  assert.equal(wheel[0].radius, 0); assert.equal(wheel[0].missing, false);
  assert.equal(wheel[1].radius, 100); assert.equal(wheel[2].radius, 50);
  for (const sector of wheel) {
    assert.ok(Math.abs(sector.endAngle-sector.startAngle-Math.PI/4) < 1e-12);
    assert.match(sector.sectorPath, /^M /);
    assert.doesNotMatch(sector.sectorPath, /NaN|Infinity/);
  }
  for (const sector of wheel.slice(3)) {
    assert.equal(sector.missing, true); assert.equal(sector.radius, null); assert.equal(sector.path, null);
  }
  assert.equal(audit.wheelGeometry({ money:10 }, 50)[1].radius, 50);
  assert.throws(() => audit.wheelGeometry({}, 0));
  assert.ok(!Object.keys(audit).some(key => /score|average|grade/i.test(key)));
});

test('analytics strips rating values, PII, free text and overrides of the quiz identifier', () => {
  const payload = lifeAuditProperties({ quiz:'other', ratings:{work:2}, rating:2, value:2,
    email:'a@example.com', firstName:'A', name:'A', phone:'123', whatsapp:'123', goal:'free text',
    step:2, area_id:'work', focus_area_id:'money', segment:'curious', time_option:'hour',
    horizon:4, channel:'share', quiz_version:'abcdef0', utm_source:'newsletter', ref:'friend' });
  assert.deepEqual(payload, {quiz:'life_audit',step:2,area_id:'work',focus_area_id:'money',segment:'curious',time_option:'hour',horizon:4,channel:'share',quiz_version:'abcdef0',utm_source:'newsletter',ref:'friend'});
  assert.deepEqual(lifeAuditProperties({step:'private text', area_id:3, segment:'my name', ref:'a@example.com',utm_source:'123456789',channel:{email:'private'}}), {quiz:'life_audit'});
});

test('Life Audit source never links directly to app stores', async () => {
  async function scan(dir) {
    for (const entry of await readdir(dir,{withFileTypes:true})) {
      const path = `${dir}/${entry.name}`;
      if (entry.isDirectory()) await scan(path);
      else assert.doesNotMatch(await readFile(path,'utf8'), /(?:apps|itunes)\.apple\.com|play\.google\.com|market:\/\//i, path);
    }
  }
  await scan('life-audit');
});

test('production build rejects an empty token', () => {
  const log = `/tmp/life-audit-token-${process.pid}.log`;
  const fd = openSync(log, 'w');
  const result = spawnSync('node_modules/.bin/astro', ['build','--config','astro.life-audit.config.mjs'], {
    encoding:'utf8', stdio:['ignore',fd,fd], env:{...process.env,PUBLIC_MIXPANEL_TOKEN:' ',LIFE_AUDIT_ALLOW_NO_TOKEN:'0',ASTRO_TELEMETRY_DISABLED:'1'}
  });
  closeSync(fd);
  const output = readFileSync(log, 'utf8');
  unlinkSync(log);
  assert.notEqual(result.status, 0);
  assert.match(output, /PUBLIC_MIXPANEL_TOKEN is required/);
});

test('review output is isolated and has canonical, metadata and default noindex', async () => {
  const html = await readFile('dist-life-audit/index.html', 'utf8');
  assert.match(html, /<title>Bestday Life Audit \| Bestday<\/title>/);
  assert.match(html, /name="description"/);
  assert.match(html, /href="https:\/\/bestday.ai\/life-audit\/"/);
  assert.match(html, /name="robots" content="noindex"/);
  const layout = await readFile('life-audit/layouts/AuditLayout.astro', 'utf8');
  assert.match(layout, /PUBLIC_LIFE_AUDIT_NOINDEX !== 'false'/);
  const config = await readFile('astro.life-audit.config.mjs', 'utf8');
  assert.match(config, /srcDir: '\.\/life-audit'/);
  assert.match(config, /outDir: '\.\/dist-life-audit'/);
});

test('completed result restores choices without trusting malformed storage', () => {
  const saved = {state:{ratings:{work:0,money:null},segment:'curious',focusArea:'work',timeOption:'hour'},screen:'result',selected:2,goal:'My own goal',firstStep:'Ask a friend',horizon:8,day:'Wed'};
  const restored = audit.restoreAuditProgress(JSON.stringify(saved));
  assert.equal(restored.state.questionIndex,12);
  assert.equal(restored.state.ratings.work,0);
  assert.equal(restored.state.ratings.money,null);
  assert.equal(restored.goal,'My own goal');
  assert.equal(restored.horizon,8);
  assert.equal(restored.selected,2);
  assert.equal(restored.day,'Wed');
  for (const raw of [null,'broken','{}',JSON.stringify({...saved,state:{...saved.state,focusArea:'money'}}),JSON.stringify({...saved,state:{...saved.state,ratings:{work:99}}})]) assert.equal(audit.restoreAuditProgress(raw),null);
  const fallback=audit.restoreAuditProgress(JSON.stringify({...saved,selected:90,horizon:90,day:'private',goal:[]}));
  assert.equal(fallback.selected,0); assert.equal(fallback.horizon,4); assert.equal(fallback.day,null); assert.equal(fallback.goal,'');
});
