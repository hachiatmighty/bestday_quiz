export const answerLabels = ['Not me', 'Mostly not me', 'A bit like me', 'Mostly me', "That's me"];

export function answerSelection(value) {
  if (!Number.isInteger(value) || value < 0 || value >= answerLabels.length) throw new RangeError('Choose one of the five answers.');
  return { value, label: answerLabels[value] };
}

export function sharePreview(includeWheel = false) {
  return {
    includeWheel: includeWheel === true,
    goal: 'Reconnect with one person each week',
    firstStep: 'Write the names of 4 people you miss and message the first one today.',
    description: includeWheel === true ? 'Your commitment and example wheel are included.' : 'Only your commitment is included. Your wheel stays private.',
  };
}
