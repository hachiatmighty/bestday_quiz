import test from 'node:test';
import assert from 'node:assert/strict';
import { createQuizState, goBack, recordAnswer, recordCategory } from '../src/lib/quiz-state.mjs';
import { scoreQuiz } from '../src/lib/scoring.mjs';

test('going back replaces the previous answer without double-counting it', () => {
  const state = createQuizState();
  recordCategory(state, 'work');
  for (let questionId = 2; questionId <= 21; questionId += 1) recordAnswer(state, { questionId, value: 0 });

  goBack(state);
  recordAnswer(state, { questionId: 21, value: 4 });

  assert.equal(state.questionIndex, 21);
  assert.equal(state.answers.length, 20);
  assert.equal(state.answers.at(-1).value, 4);
  assert.equal(scoreQuiz(state.answers), 'planner');
});
