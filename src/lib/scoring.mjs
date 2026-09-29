export const archetypeOrder = ['sprinter', 'planner', 'anchor', 'explorer', 'finisher'];

export const statementScoring = [
  { questionId: 2, archetype: 'sprinter', kind: 'strength' },
  { questionId: 3, archetype: 'planner', kind: 'strength' },
  { questionId: 4, archetype: 'anchor', kind: 'strength' },
  { questionId: 5, archetype: 'explorer', kind: 'cost' },
  { questionId: 6, archetype: 'finisher', kind: 'strength' },
  { questionId: 7, archetype: 'planner', kind: 'cost' },
  { questionId: 8, archetype: 'sprinter', kind: 'strength' },
  { questionId: 9, archetype: 'explorer', kind: 'strength' },
  { questionId: 10, archetype: 'anchor', kind: 'cost' },
  { questionId: 11, archetype: 'finisher', kind: 'cost' },
  { questionId: 12, archetype: 'sprinter', kind: 'cost' },
  { questionId: 13, archetype: 'anchor', kind: 'cost' },
  { questionId: 14, archetype: 'planner', kind: 'strength' },
  { questionId: 15, archetype: 'finisher', kind: 'strength' },
  { questionId: 16, archetype: 'explorer', kind: 'cost' },
  { questionId: 17, archetype: 'sprinter', kind: 'cost' },
  { questionId: 18, archetype: 'anchor', kind: 'strength' },
  { questionId: 19, archetype: 'finisher', kind: 'cost' },
  { questionId: 20, archetype: 'explorer', kind: 'strength' },
  { questionId: 21, archetype: 'planner', kind: 'cost' },
];

const scoringByQuestion = new Map(statementScoring.map(statement => [statement.questionId, statement]));

function stableHash(value) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function answerString(answers) {
  return [...answers]
    .sort((left, right) => left.questionId - right.questionId)
    .map(answer => `${answer.questionId}:${answer.value}`)
    .join('|');
}

export function scoreQuizWithDetails(answers) {
  const scores = Object.fromEntries(archetypeOrder.map(slug => [slug, 0]));
  const strongestAnswers = Object.fromEntries(archetypeOrder.map(slug => [slug, 0]));
  const costScores = Object.fromEntries(archetypeOrder.map(slug => [slug, 0]));

  for (const answer of answers) {
    const statement = scoringByQuestion.get(answer.questionId);
    if (!statement || !Number.isInteger(answer.value) || answer.value < 0 || answer.value > 4) continue;
    scores[statement.archetype] += answer.value;
    if (answer.value === 4) strongestAnswers[statement.archetype] += 1;
    if (statement.kind === 'cost') costScores[statement.archetype] += answer.value;
  }

  const highestScore = Math.max(...Object.values(scores));
  let tied = archetypeOrder.filter(slug => scores[slug] === highestScore);
  if (tied.length === 1) return { winner: tied[0], tieStage: 0, scores };

  const mostStrongestAnswers = Math.max(...tied.map(slug => strongestAnswers[slug]));
  tied = tied.filter(slug => strongestAnswers[slug] === mostStrongestAnswers);
  if (tied.length === 1) return { winner: tied[0], tieStage: 1, scores };

  const highestCostScore = Math.max(...tied.map(slug => costScores[slug]));
  tied = tied.filter(slug => costScores[slug] === highestCostScore);
  if (tied.length === 1) return { winner: tied[0], tieStage: 2, scores };

  const winner = tied[stableHash(answerString(answers)) % tied.length];
  return { winner, tieStage: 3, scores };
}

export function scoreQuiz(answers) {
  return scoreQuizWithDetails(answers).winner;
}

export function isVeryEven(scores) {
  const values = Object.values(scores);
  return Math.max(...values) - Math.min(...values) <= 2;
}
