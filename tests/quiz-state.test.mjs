import test from 'node:test';
import assert from 'node:assert/strict';
import { createQuizState, goBack, recordAnswer, recordCategory } from '../src/lib/quiz-state.mjs';

const order = ['sprinter', 'planner', 'anchor', 'explorer', 'finisher'];
function scoreQuiz(answers) {
  const scores = Object.fromEntries(order.map(slug => [slug, 0]));
  for (const answer of answers) scores[answer.archetype] += answer.weight;
  return order.reduce((winner, slug) => scores[slug] > scores[winner] ? slug : winner);
}

test('going back replaces the previous answer without double-counting it', () => {
  const state = createQuizState();
  recordCategory(state, 'work');
  recordAnswer(state, { questionId: 2, archetype: 'planner', weight: 1 });
  recordAnswer(state, { questionId: 3, archetype: 'sprinter', weight: 2 });

  goBack(state);
  recordAnswer(state, { questionId: 3, archetype: 'anchor', weight: 2 });
  for (let questionId = 4; questionId <= 12; questionId++) {
    recordAnswer(state, { questionId, archetype: 'anchor', weight: questionId === 8 ? 2 : 1 });
  }

  assert.equal(state.questionIndex, 12);
  assert.equal(state.answers.length, 11);
  assert.equal(state.answers.some(answer => answer.questionId === 3 && answer.archetype === 'sprinter'), false);
  assert.equal(scoreQuiz(state.answers), 'anchor');
});
