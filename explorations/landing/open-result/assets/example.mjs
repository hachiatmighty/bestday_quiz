// Fictional answers to the retained statements in QUESTIONS-V3.md.
// Never a visitor's audit state. Check values are illustrative while mapping is under review.
export const scale = ['Not me', 'Mostly not me', 'A bit like me', 'Mostly me', "That's me"];
export const firstStatement = 'I got something done on the work I wanted to do.';
const area = (id, name, statements, responses, check, checkValue) => ({ id, name, statements, responses, check, checkValue });
export const exampleAreas = [
  area('work', 'Work and direction', ["I got something done on the work I wanted to do.","My work left me time for something else.","Work kept eating into my personal time.","I kept doing work I am trying to move away from."], [3, 2, 4, 3], 'Slower than I’d like', 1),
  area('money', 'Money', ["I covered the costs I needed to cover.","I put money aside for something I named.","I put off a payment because the money was not there.","A cost came up that I had not planned for."], [3, 3, 1, 1], 'Fine', 2),
  area('health', 'Health and energy', ["I did some exercise I had planned to do.","I had enough energy to do what I had planned.","I kept putting off the exercise I had planned.","I was too tired to finish what I had planned."], [3, 2, 2, 2], 'Slower than I’d like', 1),
  area('relationships', 'Relationships', ["I made time to catch up with someone close to me.","Someone close to me checked in without me asking.","I was usually the one chasing a reply.","I kept putting off a call I wanted to make."], [2, 1, 3, 4], 'Not where I want it', 0),
  area('growth', 'Learning and growth', ["I spent time learning something I wanted to learn.","I tried out something I had been learning.","The reading I planned stayed unread.","I kept moving the time I had set aside to learn."], [3, 2, 2, 1], 'Fine', 2),
  area('rest', 'Rest and enjoyment', ["I did something just because I enjoyed it.","I had time off with no work to catch up on.","Work turned up in time I had set aside to rest.","I kept scrolling instead of doing something I wanted to do."], [1, 0, 4, 4], 'Not where I want it', 0),
  area('home', 'Home and everyday life', ["I got the everyday jobs done before they piled up.","I could use the space at home for what I needed.","Everyday jobs piled up until I had to cancel something else.","Something at home kept getting in the way of my day."], [null, null, null, null], 'Skipped this area', null),
  area('meaning', 'Meaning and contribution', ["I made time for something that matters beyond paid work.","I passed on an opportunity that could help someone else.","Something I wanted to give time to kept getting pushed back.","I agreed to help, then could not find time for it."], [3, 3, 1, 2], 'Fine', 2),
];
export const priorities = ['work', 'health', 'relationships'];
export const circleEvidence = [
  ['I kept a goal quiet until I could do it for sure.', 4],
  ['Someone I know could name a goal I am working on.', 0],
];
export const goal = 'Reconnect with one person each week';
export const firstStep = 'Write the names of 4 people you miss and message the first one today.';

// Matches the v3 proposal: 2 working items, 2 cost items reversed, plus the flat check.
export function areaReading(item) {
  const answers = item.responses.map((v, i) => v === null ? null : i < 2 ? v : 4 - v);
  answers.push(item.checkValue);
  const present = answers.filter(v => v !== null);
  return present.length < 3 ? null : present.reduce((a, b) => a + b, 0) / present.length;
}
export function suggestedFocus(items = exampleAreas, selected = priorities) {
  const readable = items.filter(item => areaReading(item) !== null);
  const chosen = readable.filter(item => selected.includes(item.id));
  const candidates = selected.length ? chosen : readable;
  const lowest = Math.min(...candidates.map(areaReading));
  const matches = candidates.filter(item => areaReading(item) === lowest);
  return matches.length === 1 ? matches[0].id : null;
}
