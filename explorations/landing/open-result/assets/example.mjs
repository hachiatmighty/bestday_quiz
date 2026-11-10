// Fictional answers to the retained statements in QUESTIONS-V3.md.
// Never a visitor's audit state. Check values are illustrative while mapping is under review.
export const scale = ['Not me', 'Mostly not me', 'A bit like me', 'Mostly me', "That's me"];
export const firstStatement = 'I moved forward on work I actually care about.';
const area = (id, name, statements, responses, check, checkValue) => ({ id, name, statements, responses, check, checkValue });
export const exampleAreas = [
  area('work', 'Work and direction', ["I moved forward on work I actually care about.","Work stayed inside its hours most days.","Work kept eating into my personal time.","Most of my week went on work I’m trying to leave behind."], [3, 2, 4, 3], 'Slower than I’d like', 1),
  area('money', 'Money', ["I covered the costs I needed to cover.","I put money aside for something specific.","I pushed a payment back because the money wasn’t there.","A cost I didn’t see coming threw the month off."], [3, 3, 1, 1], 'Fine', 2),
  area('health', 'Health and energy', ["I kept to the exercise I’d planned, most weeks.","I had the energy for what my days asked of me.","I meant to get back to the gym, and didn’t.","I ran on less sleep than I needed."], [3, 2, 2, 2], 'Slower than I’d like', 1),
  area('relationships', 'Relationships', ["I properly caught up with someone close to me.","Someone close to me checked in without me asking.","I was the one chasing everyone for a reply.","I kept putting off a call I wanted to make."], [2, 1, 3, 4], 'Not where I want it', 0),
  area('growth', 'Learning and growth', ["I gave real time to something I wanted to learn.","I used something I’ve been learning.","The reading I planned stayed unread.","The time I set aside to learn kept moving."], [3, 2, 2, 1], 'Fine', 2),
  area('rest', 'Rest and enjoyment', ["I did something just because I enjoy it.","I had a day off that was really off.","Work found its way into my rest.","I scrolled through time I meant to enjoy."], [1, 0, 4, 4], 'Not where I want it', 0),
  area('home', 'Home and everyday life', ["I got the everyday jobs done before they piled up.","Home worked for what I needed it for.","Chores piled up until something else had to give.","Something at home kept getting in the way of my day."], [null, null, null, null], 'Skipped this area', null),
  area('meaning', 'Meaning and contribution', ["I made time for something that matters to me beyond work.","I helped someone get a step closer to something they want.","Something I wanted to give time to kept getting pushed back.","I said yes to helping, then couldn’t find the time."], [3, 3, 1, 2], 'Fine', 2),
];
export const priorities = ['work', 'health', 'relationships'];
export const circleEvidence = [
  ['I kept a goal to myself until I was sure I could do it.', 4],
  ['Someone could name a goal I’m working on.', 0],
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
