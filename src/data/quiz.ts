export const archetypeOrder = ['sprinter', 'planner', 'anchor', 'explorer', 'finisher'] as const;
export type ArchetypeSlug = (typeof archetypeOrder)[number];

export const categories = [
  { slug: 'career', label: 'Career or business', color: '#2196F3' },
  { slug: 'money', label: 'Money', color: '#F39C12' },
  { slug: 'health', label: 'Health', color: '#4CAF50' },
  { slug: 'family', label: 'Family', color: '#9B59B6' },
  { slug: 'relationships', label: 'Relationships', color: '#E91E63' },
  { slug: 'faith', label: 'Faith', color: '#8E44AD' },
  { slug: 'just-for-me', label: 'Something just for me', color: '#E74C3C' },
] as const;
export type CategorySlug = (typeof categories)[number]['slug'];

export const archetypes: Record<ArchetypeSlug, {
  name: string; identity: string; strength: string; tendency: string; need: string;
  cardLine: string; caption: string; forward: string; pictogram: string; emailPick: string;
}> = {
  sprinter: {
    name: 'The Sprinter',
    identity: 'You create momentum. People feel it when you start.',
    strength: "You move before you're ready, and that is a gift. While others are still deciding, you've begun. Your energy pulls people along with you, and things that would never have started, start because of you.",
    tendency: 'After a few weeks, the fuel can dip. The start was loud. The middle is quiet, and quiet is where good goals slip away without anyone noticing, sometimes not even you.',
    need: 'Someone who notices when the pace drops, and asks at the right moment, "How\'s it really going?" Put two or three people you respect on your goal, so the quiet middle has company. You go fast alone. You go far with someone beside you in the middle.',
    cardLine: 'I bring the momentum. My circle keeps it going.',
    caption: "Apparently I'm a Sprinter. Fast start, needs someone to notice the middle. Sounds about right. What are you?",
    forward: "I'm a Sprinter, apparently. You'd know if that's true. Do it and tell me yours",
    pictogram: '03_willpower.png',
    emailPick: "Pick someone who'll check in during the quiet middle, not only at the start.",
  },
  planner: {
    name: 'The Planner',
    identity: 'You build the structure other people borrow.',
    strength: 'You think in systems. You see the steps, the dates and the risks before anyone else does. What you plan tends to be well made, and people trust it.',
    tendency: 'Energy can go into preparing rather than starting. The plan gets better, and the start date moves again.',
    need: 'Someone who will say, kindly and clearly, "It\'s ready. Start." Put the people who\'d tell you the truth on your goal, and give them a start date to hold you to. A good plan with a witness beats a perfect plan kept private.',
    cardLine: 'My plan is ready. My circle knows my start date.',
    caption: "I'm a Planner. Great plans, slow starts. Needs someone to say go. Do the quiz and tell me yours.",
    forward: "I'm a Planner, apparently. You'd know if that's true. Do it and tell me yours",
    pictogram: '02_goal.png',
    emailPick: "Pick someone who'll hold you to a start date.",
  },
  anchor: {
    name: 'The Anchor',
    identity: "You're the one everyone leans on.",
    strength: "You find a way when there isn't one. When something goes wrong, people call you. You hold family, work and friends together, often without anyone asking how you are doing.",
    tendency: "You can carry things alone longer than you need to. Your own goal waits at the back of the queue, and you don't tell anyone it's waiting.",
    need: 'To be held by someone, for once. Letting people in is how the person who holds everyone keeps going. Choose two or three people you respect and let them in on one goal that is yours.',
    cardLine: "I hold everyone. This goal, I'm not carrying alone.",
    caption: "I'm an Anchor. Holds everyone, rarely asks for help. Annoyingly accurate. Which one are you?",
    forward: "I'm an Anchor, apparently. You'd know if that's true. Do it and tell me yours",
    pictogram: '11_isolation_community.png',
    emailPick: 'Pick someone you usually look after. Let it go the other way for once.',
  },
  explorer: {
    name: 'The Explorer',
    identity: 'You see possibilities other people walk past.',
    strength: 'You ask questions nobody else thought to ask. You learn fast and move easily between ideas. Rooms are more interesting with you in them.',
    tendency: 'Direction can stay loose. Every new idea is a good one, so the goal you started with gets swapped for the next.',
    need: 'Someone who remembers which goal you chose, and asks about it. Put people you trust on one goal, so someone notices when it starts to change. Keep exploring. Just let one goal have a witness.',
    cardLine: "I'll always find a new idea. My circle keeps me on the one that matters.",
    caption: 'Got Explorer. Curious about everything, needs someone to keep me on one thing. Try it.',
    forward: "I'm an Explorer, apparently. You'd know if that's true. Do it and tell me yours",
    pictogram: '06_witnessed.png',
    emailPick: "Pick someone who'll ask about the same goal twice.",
  },
  finisher: {
    name: 'The Finisher',
    identity: "You're the rare one who finishes.",
    strength: 'You finish what you start. People trust your word because you keep it, and they bring you the things that have to get done.',
    tendency: 'You can take on more than one finish line at a time. Because you always deliver, people keep handing you the next one.',
    need: "Someone who asks, \"Which of these is yours?\" and waits for the answer. Put two or three people you respect on the one goal that belongs to you, so it gets the same care you give everyone else's.",
    cardLine: 'I finish things for everyone. My circle makes sure one is mine.',
    caption: 'Finisher. I finish things, sometimes too many at once. What did you get?',
    forward: "I'm a Finisher, apparently. You'd know if that's true. Do it and tell me yours",
    pictogram: '05_success.png',
    emailPick: "Pick someone who'll ask which goal is really yours.",
  },
};

const rows = [
  ["Start that same day. The plan can catch up.", "Map it out. Steps, dates, what I'll need.", 'Get on with it quietly. No need to tell anyone.', 'Look into five different ways to do it.', "Add it to my list with everything else I'm finishing."],
  ["I'm moving fast. The early buzz is starting to fade.", "I'm still getting the plan right.", "I'm getting on with it. I haven't told anyone.", "I've found a new angle I want to try.", "I'm ticking things off, and I've already said yes to something else."],
  ['Tell them to just start.', 'Help them write out the steps.', 'Take some of it on myself.', 'Suggest a completely different way in.', 'Ask what the deadline is.'],
  ['"Great, I\'m on it," even if the pace has dropped.', '"Nearly ready to really start."', '"It\'s fine," then change the subject.', '"I\'ve found a better way to do it."', '"Nearly done. I\'ve got two others going too."'],
  ['The excitement wears off.', 'Waiting until everything is ready.', 'Carrying too much on my own.', 'Too many good options.', 'Taking on too many things at once.'],
  ['A list I wrote in one burst of energy.', 'Plans with dates and headings.', "Nothing written down. It's all in my head.", 'Lots of ideas, half of them started.', 'Several checklists, for different people.'],
  ['Everyone knew when I started. Fewer people know now.', "Nobody yet. I'd rather fix the plan first.", "Nobody. I don't like to burden people.", "Whoever I'm talking to that day.", 'The people waiting on the result.'],
  ['Big bursts of progress.', 'Everything went to plan.', 'Everyone I look after was sorted.', 'I learned something new.', 'I finished something.'],
  ['Good. Catch me when I slow down.', 'Fine, once my plan is sorted.', "That's kind, but I'll be fine.", 'Good. Help me choose what to focus on.', 'Fine, as long as we talk about deadlines.'],
  ['"You started something real. Keep going."', '"The plan is good enough. Start."', '"You don\'t have to carry this alone."', '"This is the one. Stay with it."', '"Pick one. Finish it well."'],
  ['Start the next thing straight away.', 'Look back at what worked, for next time.', 'Move on without telling anyone.', 'Get curious about something completely different.', 'Take a breath, then close the next one.'],
];
const prompts = [
  "You've just decided on a new goal. What do you do first?",
  "It's the second week of a new goal. What's usually happening?",
  "A friend's plan is stuck. What do you do?",
  'A friend asks how your goal is going. You say...',
  'What tends to slow you down?',
  'Which sounds most like the notes on your phone?',
  'When a goal gets hard, who knows?',
  'What does a good week look like?',
  'Someone you respect offers to check in on your goal every week. Your honest first reaction?',
  'Which would you most like someone to say to you?',
  'When you finish something that mattered, you...',
];
export const questions = prompts.map((prompt, index) => ({
  id: index + 2,
  prompt,
  weight: index === 1 || index === 6 ? 2 : 1,
  options: rows[index].map((text, optionIndex) => ({ text, archetype: archetypeOrder[optionIndex] })),
}));

export const pairings: Record<string, string> = {
  'sprinter:sprinter': "Two fast starts. Check on each other's middle.",
  'sprinter:planner': "One of you starts, one of you plans. Swap notes and you'll both move.",
  'sprinter:anchor': "One of you brings the spark, one of you keeps going when it's quiet. Lend each other both.",
  'sprinter:explorer': 'Plenty of energy between you. Pick one goal each and ask about it.',
  'sprinter:finisher': 'One of you starts things, one of you finishes them. Hold each other to one goal.',
  'planner:planner': 'Two good plans. Set each other a start date.',
  'planner:anchor': 'One of you plans, one of you carries. Share the weight of one goal.',
  'planner:explorer': 'One of you sees the options, one of you sees the steps. Choose one goal together.',
  'planner:finisher': "A plan and someone who finishes. Ask each other which goal is yours.",
  'anchor:anchor': 'You both hold everyone. Hold each other, for once.',
  'anchor:explorer': 'One of you brings new ideas, one of you brings steadiness. Stay with one goal each.',
  'anchor:finisher': "You both deliver for everyone else. Ask each other what's yours.",
  'explorer:explorer': 'Twice the ideas. Hold each other to one.',
  'explorer:finisher': "One of you sees what's next, one of you finishes what's now. Trade the habit.",
  'finisher:finisher': 'Two people who finish things. Help each other choose the one that matters.',
};

export function pairingFor(friend: ArchetypeSlug, sender: ArchetypeSlug) {
  const key = [friend, sender].sort((a, b) => archetypeOrder.indexOf(a) - archetypeOrder.indexOf(b)).join(':');
  return pairings[key];
}
