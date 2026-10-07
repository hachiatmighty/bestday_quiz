import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('quiz pages send people to the web Branch link and the email redirect to the email one', async () => {
  const signup = await readFile('src/lib/signup.ts', 'utf8');
  const quiz = await readFile('src/components/QuizApp.astro', 'utf8');
  const start = await readFile('src/pages/start.astro', 'utf8');

  assert.match(signup, /web: 'https:\/\/getbestdayapp\.app\.link\/quizw'/);
  assert.match(signup, /email: 'https:\/\/getbestdayapp\.app\.link\/quize'/);
  assert.doesNotMatch(signup, /apps\.apple\.com|play\.google\.com/);
  assert.match(quiz, /signupDestination\(navigator\.userAgent, 'web'\)/);
  assert.equal((quiz.match(/href=\{appLinks\.web\} data-signup/g) ?? []).length, 3);
  assert.match(start, /signupDestination\(navigator\.userAgent, 'email'\)/);
  assert.match(start, /href=\{appLinks\.email\}/);
});
