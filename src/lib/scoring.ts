import { archetypeOrder, type ArchetypeSlug } from '../data/quiz';

export type ScoredAnswer = { questionId: number; archetype: ArchetypeSlug; weight: number };

export function scoreQuiz(answers: ScoredAnswer[]): ArchetypeSlug {
  const scores = Object.fromEntries(archetypeOrder.map(slug => [slug, 0])) as Record<ArchetypeSlug, number>;
  for (const answer of answers) scores[answer.archetype] += answer.weight;

  const highest = Math.max(...Object.values(scores));
  let tied = archetypeOrder.filter(slug => scores[slug] === highest);
  if (tied.length === 1) return tied[0];

  const decisive = answers.filter(answer => answer.questionId === 3 || answer.questionId === 8);
  const decisiveScores = Object.fromEntries(archetypeOrder.map(slug => [slug, 0])) as Record<ArchetypeSlug, number>;
  for (const answer of decisive) decisiveScores[answer.archetype] += answer.weight;
  const decisiveHigh = Math.max(...tied.map(slug => decisiveScores[slug]));
  tied = tied.filter(slug => decisiveScores[slug] === decisiveHigh);
  if (tied.length === 1) return tied[0];

  for (const questionId of [3, 8]) {
    const answer = answers.find(item => item.questionId === questionId);
    if (answer && tied.includes(answer.archetype)) return answer.archetype;
  }

  return tied[0];
}
