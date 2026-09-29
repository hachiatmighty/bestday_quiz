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

export const questions = [
  'I start working on a new goal the same day I set it.',
  "I don't start working on my goals until I have a clear plan.",
  "When things fall apart around me, I'm the one who holds everyone together.",
  'I often abandon old plans for new, exciting ideas.',
  "When I start a new goal, I don't stop until I finish it.",
  'I find myself worrying about making my plans perfect instead of starting.',
  'My energy is highest in the first few weeks after setting a goal.',
  "I'm usually the one who spots a new way to reach a goal.",
  "I rarely tell anyone about the goals I'm working on.",
  'I take on more deadlines than I can comfortably handle.',
  'Once the early excitement of a goal fades, I tend to slow down.',
  'My own goals often wait until everyone else is taken care of.',
  'I like knowing every step of a goal before I begin.',
  "I'm known for getting things done, even when it's hard.",
  'I have more ideas for goals than time to finish them.',
  "I often start goals before I've thought them through.",
  'I can handle hard things on my own.',
  'I find it hard to say no when someone asks me to take on one more thing.',
  'I enjoy trying new approaches more than repeating the same routine.',
  'If something changes my plan, I struggle to get going again.',
].map((prompt, index) => ({ id: index + 2, prompt }));

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

export function pairingsFor(type: ArchetypeSlug) {
  return archetypeOrder.map(partner => ({
    partner,
    label: `With ${partner === type ? 'another' : /^[aeiou]/.test(partner) ? 'an' : 'a'} ${archetypes[partner].name.replace('The ', '')}`,
    line: pairingFor(type, partner),
  }));
}
