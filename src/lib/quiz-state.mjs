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
  state.answers.push(answer);
  state.questionIndex += 1;
}

export function goBack(state) {
  if (state.questionIndex === 0) return;
  if (state.questionIndex === 1) state.category = null;
  else state.answers.pop();
  state.questionIndex -= 1;
}
