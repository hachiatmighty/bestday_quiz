/* Independent five-point prototype. Sector geometry adapted from src/lib/wheel-of-figures.mjs. */
(() => {
  const questions = Object.freeze([
    { text: 'I got something done on the work I wanted to do.', cost: false },
    { text: 'My work left me time for something else.', cost: false },
    { text: 'Work kept eating into my personal time.', cost: true },
  ]);
  const areas = Object.freeze([
    ['work', 'Work and direction'], ['money', 'Money'], ['health', 'Health and energy'],
    ['relationships', 'Relationships'], ['growth', 'Learning and growth'],
    ['rest', 'Rest and enjoyment'], ['home', 'Home and everyday life'], ['meaning', 'Meaning and contribution'],
  ]);
  function reading(answers) {
    if (!answers.length) return null;
    return answers.reduce((sum, value, index) => sum + (questions[index].cost ? 4 - value : value), 0) / answers.length;
  }
  function answer(answers, value) {
    if (!Number.isInteger(value) || value < 0 || value > 4) throw new RangeError('Choose one of the five answers.');
    return answers.length < questions.length ? [...answers, value] : [...answers];
  }
  function sectorPath(index, value, radius = 100) {
    const r = radius * Math.max(0, Math.min(4, value)) / 4;
    const a = -Math.PI / 2 + index * Math.PI / 4, b = a + Math.PI / 4;
    return `M 0 0 L ${Math.cos(a) * r} ${Math.sin(a) * r} A ${r} ${r} 0 0 1 ${Math.cos(b) * r} ${Math.sin(b) * r} Z`;
  }
  globalThis.WorkingAudit = Object.freeze({ questions, areas, reading, answer, sectorPath });
})();
