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
  name: string; identity: string; atBest: string; strength: string; othersSee: string;
  tendency: string; need: string; worksBestWith: string; question: string; firstStep: string;
  cardLine: string; caption: string; forward: string; pictogram: string; emailPick: string;
}> = {
  sprinter: {
    name: 'The Sprinter',
    identity: 'You create momentum. People feel it when you start.',
    atBest: "There's a spark in you that shows up the moment something feels possible. When an idea lands, you'd rather move than wait, and the people around you feel the room lift. At your best, you're the reason things begin.",
    strength: "You move before you feel fully ready, and that is a real gift. While others are still weighing it up, you've usually taken the first step. Your enthusiasm is easy to catch. People find themselves saying yes to things because you made them feel doable. Plenty of good things, in your own life and in other people's, started simply because you were willing to go first.",
    othersSee: "To most people, you're the energetic one, the person who gets things moving. Some admire how quickly you act. A few quietly wish they could do the same. What they don't always see is how much you care about the things you start, even the ones that drifted. Your excitement is real, and so is your wish to follow through.",
    tendency: "Once the novelty burns out, your energy can dry up. The beginning is bright and full of feeling, and the middle feels quiet by comparison. Your attention often drifts toward the next exciting thing while the current goal waits. It rarely feels like giving up. It feels more like life getting busy. Over time, a goal that mattered can slip away without anyone noticing, sometimes not even you.",
    need: "Company in the middle. You rarely need help getting started, but you'll go further with someone who notices when the pace drops and asks, gently, how it's really going. A few people you respect, who know what you're working toward, turn the quiet stretch into something shared.",
    worksBestWith: "You work best with someone steady. Look for a person who stays calm when your energy runs hot and stays interested when it cools. They help you pace yourself, so you don't spend everything at the start. When you burn out, they encourage you without making you feel judged. When a shiny new idea appears, they gently bring your eyes back to the goal you chose. With them beside you, your speed carries you further.",
    question: "What's one goal you started with real excitement that deserves a second chance?",
    firstStep: "Choose one goal and two or three people you trust. Tell them what it is and when you'd like to reach it. Ask them to check in later on, once the early excitement has settled. That's where your momentum gets to last.",
    cardLine: 'I bring the momentum. My circle keeps it going.',
    caption: "Apparently I'm a Sprinter. Fast start, needs someone to notice the middle. Sounds about right. What are you?",
    forward: "I'm a Sprinter, apparently. You'd know if that's true. Do it and tell me yours",
    pictogram: '03_willpower.png',
    emailPick: "Pick someone who'll check in during the quiet middle, not only at the start.",
  },
  planner: {
    name: 'The Planner',
    identity: 'You build the structure other people borrow.',
    atBest: "You bring calm to messy situations. When things feel uncertain, you're often the one who sees the path through, step by step. People feel safer when you're involved, because they can tell you've thought it through.",
    strength: "You think in systems. You see the steps, the timing and the risks before others do, and what you build is usually well made. People trust your plans and borrow your way of thinking for their own goals. You turn a big, vague hope into something people can actually follow. There's a quiet confidence in how you prepare, and it shows.",
    othersSee: "To most people, you're organised and thoughtful, the one who has things under control. What they don't always see is the pressure you put on yourself to get it right, or how much you'd like to feel free to begin before everything is perfect. Being prepared is a strength. Sometimes it's also a place to hide.",
    tendency: "Your energy can go into getting ready rather than getting going. There always seems to be one more thing to research, one more detail to settle, one more reason the timing isn't quite right. Each step feels sensible on its own. Over time, though, the plan keeps improving while the start keeps moving. Underneath it, there's sometimes a wish to get it right before anyone sees you try.",
    need: "Someone who will say, kindly and clearly, \"It's ready. Start.\" A start date shared with people you respect holds better than one kept to yourself. They don't need to check every detail. They only need to notice whether you've begun.",
    worksBestWith: "You work best with someone who nudges you into motion. Look for a person who respects your thinking but isn't afraid to say, \"That's enough planning for now.\" They're comfortable with rough first attempts and help you see that starting imperfectly is still progress. When you're tempted to push the start date back, they ask what's really holding you up. With them beside you, your plans stop waiting and start working.",
    question: "What would you start this week if you trusted that your plan was already good enough?",
    firstStep: "Choose one goal you've been preparing for. Share it with two or three people who would tell you the truth, and give them a start date. Let them see the first rough step. A good plan with a witness goes further than a perfect one kept private.",
    cardLine: 'My plan is ready. My circle knows my start date.',
    caption: "I'm a Planner. Great plans, slow starts. Needs someone to say go. Do the quiz and tell me yours.",
    forward: "I'm a Planner, apparently. You'd know if that's true. Do it and tell me yours",
    pictogram: '02_goal.png',
    emailPick: "Pick someone who'll hold you to a start date.",
  },
  anchor: {
    name: 'The Anchor',
    identity: "You're the one everyone leans on.",
    atBest: "You have a gift for holding things together. When life gets hard, people turn to you, because you stay steady when others can't. At your best, you make the people around you feel safe.",
    strength: "You find a way when there doesn't seem to be one. You're often the person family, friends and colleagues call when something goes wrong. You notice what people need, sometimes before they say it, and you show up without being asked. Many people are where they are partly because you carried something for them along the way.",
    othersSee: "To most people, you're the strong one, always there. They assume you're fine, because you so often are. What they don't always see is how tired you get, or how much you'd value someone asking about you and really waiting for the answer. You can be the strong one and still need looking after.",
    tendency: "You might find yourself carrying things alone for longer than you need to. Your own goals wait quietly at the back of the queue while everyone else's needs come first. When someone asks how you are, it's easier to say \"fine\" and turn the attention back to them. Asking for help feels like adding to someone else's load. Over time, the goal that was yours becomes something you'll get to \"when things calm down\".",
    need: "To be held by someone, for once. Letting people in might feel unfamiliar, yet it's how the person who holds everyone keeps going. A few people you respect, who know about one goal that's yours alone, can give you the support you so readily give others. You don't have to stop being there for people. You deserve the same in return.",
    worksBestWith: "You work best with someone who looks out for you the way you look out for everyone else. Look for a person who notices when you're tired, asks how you're really doing and waits for the answer. They're happy to take something off your plate, and they never make you feel guilty for letting them. They remind you that your own goal counts too, and they keep asking about it when life gets busy. With them beside you, you get to be held as well as hold.",
    question: "If someone offered to carry something for you this month, what would you let them take?",
    firstStep: "Choose one goal that belongs only to you. Tell two or three people you trust, and include at least one person you usually look after. Ask them to check on it, even when you say you're fine.",
    cardLine: "I hold everyone. This goal, I'm not carrying alone.",
    caption: "I'm an Anchor. Holds everyone, rarely asks for help. Annoyingly accurate. Which one are you?",
    forward: "I'm an Anchor, apparently. You'd know if that's true. Do it and tell me yours",
    pictogram: '11_isolation_community.png',
    emailPick: 'Pick someone you usually look after. Let it go the other way for once.',
  },
  explorer: {
    name: 'The Explorer',
    identity: 'You see possibilities other people walk past.',
    atBest: "Your curiosity is a kind of energy. When something interests you, you light up, and the people around you get pulled into the possibilities with you. At your best, you make life feel bigger.",
    strength: "You ask questions others don't think to ask. You learn quickly, move easily between ideas and see more than one route to where you want to go. People come to you when they feel stuck, because you can usually find a fresh way in. Your curiosity has taken you places a straight line never would.",
    othersSee: "To most people, you're curious and full of ideas. Some admire your range. A few wonder how you keep up with it all. What they don't always see is how much you'd like to finish something you're proud of, and how frustrating it feels when the next idea pulls you away from the last.",
    tendency: "Direction can stay loose. Every new idea feels like a good one, so the goal you started with gets swapped for the next. Each change makes sense in the moment. Yet some of the most rewarding parts of a goal come after the exciting beginning has passed, and you don't always stay long enough to reach them. Looking back, you might see many promising starts and fewer things that feel complete.",
    need: "Someone who remembers which goal you chose, and asks about it. You don't need to stop exploring. What helps is a few people you respect who notice, kindly, when your attention starts to wander, and help you decide whether the new idea replaces the old one or sits beside it.",
    worksBestWith: "You work best with someone who keeps a steady focus. Look for a person who loves hearing your ideas and still remembers which goal you chose. When something new catches your eye, they help you think it through before you switch, and ask whether it belongs now or later. They bring structure without boxing you in, and they celebrate the progress that comes from staying with one thing. With them beside you, your curiosity has somewhere to land.",
    question: "Of all the things you've been curious about lately, which one would you most like to see through?",
    firstStep: "Choose one goal to stay with for the next few months. Tell two or three people you trust what it is, and ask them to notice if it starts to change. Keep a list of your other ideas somewhere safe. They'll still be there when you're ready.",
    cardLine: "I'll always find a new idea. My circle keeps me on the one that matters.",
    caption: 'Got Explorer. Curious about everything, needs someone to keep me on one thing. Try it.',
    forward: "I'm an Explorer, apparently. You'd know if that's true. Do it and tell me yours",
    pictogram: '06_witnessed.png',
    emailPick: "Pick someone who'll ask about the same goal twice.",
  },
  finisher: {
    name: 'The Finisher',
    identity: "You're the rare one who finishes.",
    atBest: "You have a quiet strength people rely on. When you say something will be done, it usually is. At your best, you bring a calm certainty that helps everyone around you breathe a little easier.",
    strength: "You finish what you start. People trust your word because you keep it, and they bring you the things that really need to get done. You stay with something long after the excitement has faded. When something matters, people feel calmer once they know it's in your hands. Being dependable is a quieter talent than being brilliant, and a rarer one.",
    othersSee: "To most people, you're dependable and calm under pressure. They assume you can always take on a little more. What they don't always see is how full your plate gets, or how rarely you put your own goal first. Being the person everyone counts on can be lonely, even when you're proud of it.",
    tendency: "There are times when you take on more than one finish line at once. Because you so often deliver, people keep handing you the next thing, and saying no feels like letting someone down. Your days fill with other people's goals, and you finish every one of them. Meanwhile, your own goal is often the one with no deadline and no one waiting on it, so it's the one that quietly slips.",
    need: "Someone who asks, \"Which of these is yours?\" and waits for the answer. A few people you respect, who know about the one goal that truly belongs to you, help it get the same care you give everyone else's. It doesn't have to be a big goal. It just has to be yours.",
    worksBestWith: "You work best with someone who protects your time. Look for a person who notices when you're saying yes to too much and asks, kindly, what that yes is costing you. They help you choose what matters most, alongside what's due. They're happy for you to lean on them, and they remind you that rest and your own goals deserve space on the list. With them beside you, the one goal that's yours gets finished too.",
    question: "If you could only finish one thing this year, which would you choose for yourself?",
    firstStep: "Choose the one goal that's yours. Share it with two or three people you trust and give it a real date. Ask them to notice when you say yes to something new, and to ask what it might cost your goal.",
    cardLine: 'I finish things for everyone. My circle makes sure one is mine.',
    caption: 'Finisher. I finish things, sometimes too many at once. What did you get?',
    forward: "I'm a Finisher, apparently. You'd know if that's true. Do it and tell me yours",
    pictogram: '05_success.png',
    emailPick: "Pick someone who'll ask which goal is really yours.",
  },
};

// One manifesto line per archetype: the landing page and the shared result pages lead with these.
export const manifestoLines: Record<ArchetypeSlug, string> = {
  sprinter: "Some start before they're ready.",
  planner: 'Some plan it perfectly, then wait.',
  anchor: "Some carry everyone else's goals.",
  explorer: 'Some have a new idea by Friday.',
  finisher: 'Some finish everything but their own.',
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
