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
