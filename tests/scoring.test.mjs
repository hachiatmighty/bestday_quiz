import test from 'node:test';
import assert from 'node:assert/strict';
import { archetypeOrder, scoreQuiz, scoreQuizWithDetails, statementScoring } from '../src/lib/scoring.mjs';

const answersFromValues = values => statementScoring.map((statement, index) => ({ questionId: statement.questionId, value: values[index] }));
const valuesFor = (archetype, matchingValue = 4, otherValue = 0) => statementScoring.map(statement => statement.archetype === archetype ? matchingValue : otherValue);

for (const archetype of archetypeOrder) {
  test(`returns ${archetype} for a clear ${archetype} respondent`, () => {
    assert.equal(scoreQuiz(answersFromValues(valuesFor(archetype))), archetype);
  });
}

test('returns the primary score winner without a tie-break', () => {
  const result = scoreQuizWithDetails(answersFromValues(valuesFor('explorer', 3, 1)));
  assert.equal(result.winner, 'explorer');
  assert.equal(result.tieStage, 0);
});

test('tie-break 1 uses the most strongest answers', () => {
  const values = Array(20).fill(0);
  values[0] = 4; values[6] = 2;
  values[1] = 3; values[12] = 3;
  const result = scoreQuizWithDetails(answersFromValues(values));
  assert.equal(result.winner, 'sprinter');
  assert.equal(result.tieStage, 1);
});

test('tie-break 2 uses the higher cost-statement score', () => {
  const values = Array(20).fill(0);
  values[0] = 4; values[10] = 2;
  values[1] = 4; values[5] = 2;
  values[15] = 1; values[12] = 1;
  const result = scoreQuizWithDetails(answersFromValues(values));
  assert.equal(result.winner, 'sprinter');
  assert.equal(result.tieStage, 2);
});

test('tie-break 3 deterministically hashes the full answer string', () => {
  const answers = answersFromValues(Array(20).fill(2));
  const first = scoreQuizWithDetails(answers);
  const second = scoreQuizWithDetails(answers);
  assert.equal(first.tieStage, 3);
  assert.deepEqual(second, first);
});
