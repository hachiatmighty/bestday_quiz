export function createQuizState() {
  return {
    category: null,
    questionIndex: 0,
    answers: [],
  };
}

export function recordCategory(state, category) {
  state.category = category;
  state.questionIndex = 1;
}

export function startQuiz(state) {
  if (state.questionIndex === 1) state.questionIndex = 2;
}

export function recordAnswer(state, answer) {
  const existingIndex = state.answers.findIndex(item => item.questionId === answer.questionId);
  if (existingIndex === -1) state.answers.push(answer);
  else state.answers[existingIndex] = answer;
  state.questionIndex += 1;
}

export function goBack(state) {
  if (state.questionIndex === 0) return;
  state.questionIndex -= 1;
}

export const stepCount = 22;

export function stepFor(questionIndex) {
  const number = questionIndex + 1;
  if (questionIndex === 0) return { number, key: 'goal', statement: null };
  if (questionIndex === 1) return { number, key: 'intro', statement: null };
  const statement = questionIndex - 1;
  return { number, key: `statement-${statement}`, statement };
}

export function questionIndexForStep(key) {
  if (key === 'goal') return 0;
  if (key === 'intro') return 1;
  const match = /^statement-(\d+)$/.exec(key ?? '');
  const statement = match ? Number(match[1]) : NaN;
  return statement >= 1 && statement <= 20 ? statement + 1 : null;
}
