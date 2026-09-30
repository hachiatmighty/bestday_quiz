import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const analytics = await readFile(new URL('../src/lib/analytics.ts', import.meta.url), 'utf8');
const quizApp = await readFile(new URL('../src/components/QuizApp.astro', import.meta.url), 'utf8');
const startPage = await readFile(new URL('../src/pages/start.astro', import.meta.url), 'utf8');
const trackingSources = `${quizApp}\n${startPage}`;

test('Mixpanel uses the EU endpoint without persistence, IP, or automatic tracking', () => {
  assert.match(analytics, /from 'mixpanel-browser\/src\/loaders\/loader-module-core'/);
  assert.match(analytics, /api_host: 'https:\/\/api-eu\.mixpanel\.com'/);
  assert.match(analytics, /disable_persistence: true/);
  assert.match(analytics, /batch_requests: false/);
  assert.match(analytics, /ip: false/);
  assert.match(analytics, /track_pageview: false/);
  assert.match(analytics, /autocapture: false/);
  assert.match(analytics, /record_sessions_percent: 0/);
  assert.doesNotMatch(analytics, /localStorage/);
});

test('every event includes campaign context, quiz version, and base path', () => {
  assert.match(analytics, /\.\.\.trackingContext\(\)/);
  assert.match(analytics, /quiz_version: quizVersion/);
  assert.match(analytics, /base_path: basePath/);
});

test('track calls never include capture personal data', () => {
  const calls = [...trackingSources.matchAll(/track\([\s\S]*?\);/g)].map(match => match[0]);
  assert.ok(calls.length > 0);
  for (const call of calls) {
    assert.doesNotMatch(call, /\b(?:firstName|first_name|email|whatsapp|whatsapp_number|phone)\s*:/i);
  }
});
