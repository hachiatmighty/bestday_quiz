import { archetypes, type ArchetypeSlug } from './quiz';

export const postalAddress = 'Soft Signal Ltd, 20-22 Wenlock Road, London N1 7GU, United Kingdom';

export const emails = [
  {
    slug: 'result', timing: 'Immediately', subject: "You're The {type}", preview: 'Your full read, and the kind of person who helps you most.',
    paragraphs: ["Hi {first_name},", "Here's your full result.", '[Identity line]\n\n[Strengths]\n\n[The pattern to watch]\n\n[What you need]', 'Willpower runs out. Two or three people who know your goal, and ask about it, last longer.'],
    cta: 'Start your circle', note: 'Premium is $99 a year. Your people join free.', signoff: 'Bestday\nDo it. Together.',
  },
  {
    slug: 'people', timing: 'Day 2', subject: 'The two or three people', preview: "Not the loudest people you know. The ones who'd tell you the truth.",
    paragraphs: ["Hi {first_name},", 'When you picture someone asking how your goal is going, who comes to mind?', 'Skip the person who says "you\'ve got this" to everyone. Pick the one who remembers what you said last month, and will ask about it.', 'Three questions help:\n\n• Would they notice if you went quiet?\n• Would they tell you the truth, kindly?\n• Would you feel proud telling them you\'d done it?', "If a name fits all three, that's your first circle member.", '[Type-specific line]\n\nSprinter: Pick someone who\'ll check in during the quiet middle, not only at the start.\nPlanner: Pick someone who\'ll hold you to a start date.\nAnchor: Pick someone you usually look after. Let it go the other way for once.\nExplorer: Pick someone who\'ll ask about the same goal twice.\nFinisher: Pick someone who\'ll ask which goal is really yours.'],
    cta: 'Send them the quiz', note: undefined, signoff: 'Bestday\nDo it. Together.',
  },
  {
    slug: 'quiet', timing: 'Day 4', subject: 'When a goal goes quiet', preview: 'Everyone has one. Almost nobody mentions it.',
    paragraphs: ["Hi {first_name},", 'Every goal has a week where it goes quiet. You miss a day, then three, and it gets easier not to mention it.', 'A slip is ordinary. It happens when a goal only lives in your head. Hiding it is what turns it into a pattern.', "On Bestday, the people you invite follow your goal with you, so it doesn't only live in your head. Coming back is easier when someone already knows the goal."],
    cta: 'Start your circle', note: 'Premium is $99 a year. Your people join free.', signoff: 'Bestday\nDo it. Together.',
  },
  {
    slug: 'one-goal', timing: 'Day 7', subject: 'Pick one goal', preview: "Not five. One, and the people who'll ask about it.",
    paragraphs: ["Hi {first_name},", "A week ago you found out you're The {type}.", 'If you do one thing with that, make it this: choose one goal that matters to you, and let two or three people in on it.', "That's all Bestday is: one goal, and the people who'll ask about it."],
    cta: 'Start your circle', note: 'Premium is $99 a year. Your people join free.', signoff: 'Bestday\nDo it. Together.',
  },
] as const;

export function renderEmailPreview(email: (typeof emails)[number], type: ArchetypeSlug) {
  const result = archetypes[type];
  const replaceFields = (value: string) => value
    .replaceAll('{first_name}', 'Amara')
    .replaceAll('{type}', result.name.replace('The ', ''));
  const paragraphs = email.paragraphs.map(paragraph => {
    if (paragraph.startsWith('[Identity line]')) return `${result.identity}\n\n${result.strength}\n\n${result.tendency}\n\n${result.need}`;
    if (paragraph.startsWith('[Type-specific line]')) return result.emailPick;
    return replaceFields(paragraph);
  });
  return { ...email, subject: replaceFields(email.subject), paragraphs };
}
