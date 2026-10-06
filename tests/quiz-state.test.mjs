import test from 'node:test';
import assert from 'node:assert/strict';
import { createQuizState, goBack, questionIndexForStep, recordAnswer, recordCategory, startQuiz, stepCount, stepFor } from '../src/lib/quiz-state.mjs';
import { scoreQuiz } from '../src/lib/scoring.mjs';

test('going back preserves answers and replaces a changed answer without double-counting it', () => {
  const state = createQuizState();
  recordCategory(state, 'work');
  startQuiz(state);
  for (let questionId = 2; questionId <= 6; questionId += 1) recordAnswer(state, { questionId, value: 0 });

  goBack(state);
  goBack(state);
  goBack(state);

  assert.equal(state.questionIndex, 4);
  assert.deepEqual(state.answers.map(answer => answer.value), [0, 0, 0, 0, 0]);

  recordAnswer(state, { questionId: 4, value: 4 });
  recordAnswer(state, { questionId: 5, value: 0 });
  recordAnswer(state, { questionId: 6, value: 0 });

  assert.equal(state.questionIndex, 7);
  assert.equal(state.answers.length, 5);
  assert.equal(state.answers.find(answer => answer.questionId === 4).value, 4);

  for (let questionId = 7; questionId <= 21; questionId += 1) recordAnswer(state, { questionId, value: 0 });
  assert.equal(scoreQuiz(state.answers), 'anchor');
});

test('going back to the category keeps the stored selection', () => {
  const state = createQuizState();
  recordCategory(state, 'health');
  goBack(state);

  assert.equal(state.questionIndex, 0);
  assert.equal(state.category, 'health');
});

test('goal, intro, and first statement navigation preserves category and answers', () => {
  const state = createQuizState();
  recordCategory(state, 'health');

  assert.equal(state.questionIndex, 1);
  startQuiz(state);
  assert.equal(state.questionIndex, 2);

  recordAnswer(state, { questionId: 2, value: 4 });
  goBack(state);
  assert.equal(state.questionIndex, 2);
  assert.deepEqual(state.answers, [{ questionId: 2, value: 4 }]);

  goBack(state);
  assert.equal(state.questionIndex, 1);
  assert.equal(state.category, 'health');

  startQuiz(state);
  assert.equal(state.questionIndex, 2);
  assert.deepEqual(state.answers, [{ questionId: 2, value: 4 }]);
});

test('each quiz screen has its own step key, and keys map back to the same screen', () => {
  assert.deepEqual(stepFor(0), { number: 1, key: 'goal', statement: null });
  assert.deepEqual(stepFor(1), { number: 2, key: 'intro', statement: null });
  assert.deepEqual(stepFor(2), { number: 3, key: 'statement-1', statement: 1 });
  assert.deepEqual(stepFor(21), { number: stepCount, key: 'statement-20', statement: 20 });
  for (let questionIndex = 0; questionIndex < stepCount; questionIndex += 1) {
    assert.equal(questionIndexForStep(stepFor(questionIndex).key), questionIndex);
  }
  for (const key of [null, '', 'statement-0', 'statement-21', 'result']) assert.equal(questionIndexForStep(key), null);
});
