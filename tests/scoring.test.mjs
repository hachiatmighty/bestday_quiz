import test from 'node:test';
import assert from 'node:assert/strict';

const order = ['sprinter', 'planner', 'anchor', 'explorer', 'finisher'];
function scoreQuiz(answers) {
  const scores = Object.fromEntries(order.map(slug => [slug, 0]));
  for (const answer of answers) scores[answer.archetype] += answer.weight;
  const highest = Math.max(...Object.values(scores));
  let tied = order.filter(slug => scores[slug] === highest);
  if (tied.length === 1) return tied[0];
  const decisiveScores = Object.fromEntries(order.map(slug => [slug, 0]));
  for (const answer of answers.filter(item => item.questionId === 3 || item.questionId === 8)) decisiveScores[answer.archetype] += answer.weight;
  const decisiveHigh = Math.max(...tied.map(slug => decisiveScores[slug]));
  tied = tied.filter(slug => decisiveScores[slug] === decisiveHigh);
  if (tied.length === 1) return tied[0];
  for (const questionId of [3, 8]) {
    const answer = answers.find(item => item.questionId === questionId);
    if (answer && tied.includes(answer.archetype)) return answer.archetype;
  }
  return tied[0];
}

test('returns the highest weighted archetype', () => {
  assert.equal(scoreQuiz([{ questionId: 2, archetype: 'anchor', weight: 1 }, { questionId: 3, archetype: 'anchor', weight: 2 }, { questionId: 4, archetype: 'planner', weight: 1 }]), 'anchor');
});

test('uses Q3 before Q8 after decisive scores remain tied', () => {
  assert.equal(scoreQuiz([{ questionId: 3, archetype: 'planner', weight: 2 }, { questionId: 8, archetype: 'anchor', weight: 2 }, { questionId: 4, archetype: 'planner', weight: 1 }, { questionId: 5, archetype: 'anchor', weight: 1 }]), 'planner');
});

for (const archetype of order) {
  test(`returns ${archetype} for a consistent answer path`, () => {
    const answers = Array.from({ length: 11 }, (_, index) => ({
      questionId: index + 2,
      archetype,
      weight: index === 1 || index === 6 ? 2 : 1,
    }));
    assert.equal(scoreQuiz(answers), archetype);
  });
}
