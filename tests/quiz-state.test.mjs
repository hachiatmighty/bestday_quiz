import test from 'node:test';
import assert from 'node:assert/strict';
import { createQuizState, goBack, recordAnswer, recordCategory } from '../src/lib/quiz-state.mjs';
import { scoreQuiz } from '../src/lib/scoring.mjs';

test('going back preserves answers and replaces a changed answer without double-counting it', () => {
  const state = createQuizState();
  recordCategory(state, 'work');
  for (let questionId = 2; questionId <= 6; questionId += 1) recordAnswer(state, { questionId, value: 0 });

  goBack(state);
  goBack(state);
  goBack(state);

  assert.equal(state.questionIndex, 3);
  assert.deepEqual(state.answers.map(answer => answer.value), [0, 0, 0, 0, 0]);

  recordAnswer(state, { questionId: 4, value: 4 });
  recordAnswer(state, { questionId: 5, value: 0 });
  recordAnswer(state, { questionId: 6, value: 0 });

  assert.equal(state.questionIndex, 6);
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
