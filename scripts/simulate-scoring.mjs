import { archetypeOrder, scoreQuizWithDetails, statementScoring } from '../src/lib/scoring.mjs';

const populationSize = 100_000;
let seed = 0x5eed1234;
const random = () => {
  seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
  return seed / 2 ** 32;
};
const normal = () => Math.sqrt(-2 * Math.log(Math.max(random(), Number.EPSILON))) * Math.cos(2 * Math.PI * random());
const clampLikert = value => Math.max(0, Math.min(4, Math.round(value)));
const answersFromValues = values => statementScoring.map((statement, index) => ({ questionId: statement.questionId, value: values[index] }));

function simulate(name, answerFactory, expectedTypeFactory = null) {
  const winners = Object.fromEntries(archetypeOrder.map(slug => [slug, 0]));
  const tieStages = [0, 0, 0, 0];
  let correct = 0;

  for (let index = 0; index < populationSize; index += 1) {
    const expected = expectedTypeFactory?.(index) ?? null;
    const result = scoreQuizWithDetails(answersFromValues(answerFactory(expected)));
    winners[result.winner] += 1;
    tieStages[result.tieStage] += 1;
    if (expected === result.winner) correct += 1;
  }

  const percent = count => `${(count / populationSize * 100).toFixed(2)}%`;
  return {
    group: name,
    ...Object.fromEntries(archetypeOrder.map(slug => [slug, percent(winners[slug])])),
    primary: percent(tieStages[0]),
    tie1: percent(tieStages[1]),
    tie2: percent(tieStages[2]),
    tie3: percent(tieStages[3]),
    accuracy: expectedTypeFactory ? percent(correct) : '—',
  };
}

const uniform = () => statementScoring.map(() => Math.floor(random() * 5));
const agreeableChoices = [2, 3, 3, 4, 4];
const agreeable = () => statementScoring.map(() => agreeableChoices[Math.floor(random() * agreeableChoices.length)]);
const allMiddle = () => statementScoring.map(() => 2);
const dominantType = index => archetypeOrder[index % archetypeOrder.length];
const latent = noise => expected => {
  return statementScoring.map(statement => clampLikert(2 + (statement.archetype === expected ? 1.5 : 0) + normal() * noise));
};

console.table([
  simulate('Uniform random', uniform),
  simulate('Agreeable', agreeable),
  simulate('All middle', allMiddle),
  simulate('Latent low noise', latent(1.25), dominantType),
  simulate('Latent high noise', latent(1.6), dominantType),
]);
