const s = (goal, firstStep) => ({ goal, firstStep });

export const areas = [
  {
    id: 'work', name: 'Work and direction', short: 'Work',
    prompt: 'Your work, studies or business, and the direction they are taking',
    reflection: 'Work takes most of the week, so it is often the area we review least. Choosing it now says you want to steer it on purpose. Name the one change you would notice by next month, and tell one person who knows your work.',
    suggestions: {
      hour: [
        s('Have one honest conversation a week about where your work is going', 'Message one person whose judgement you trust and ask for 20 minutes this week.'),
        s('Finish the piece of work you keep putting off', 'Write down the piece and the day you will finish it, then tell a colleague or friend.'),
        s('Learn one skill your next role will need, an hour at a time', 'Pick the skill and book your first hour in the calendar.'),
      ],
      'two-three-hours': [
        s('Build one piece of work you can show someone', 'Decide what it is and who you will show it to when it is done.'),
        s('Complete a short course that moves your direction forward', 'Choose the course and tell one person when you will finish the first module.'),
        s('Meet one person a week who does the work you want to do', 'Write a list of 3 names and send the first message.'),
      ],
      more: [
        s('Launch the side project or application you keep coming back to', 'Write the first 3 steps and share them with someone who will ask how it went.'),
        s('Prepare properly for your next role: CV, portfolio and 3 conversations', 'Update one section of your CV and send it to someone for honest feedback.'),
        s('Protect a weekly block for the work that builds your next year', 'Choose the day and time, and tell your circle so they can ask about it.'),
      ],
      unsure: [
        s('Notice which work gives you energy and which takes it', 'At the end of each workday this week, write one line about each.'),
        s('Ask one person you respect how they chose their direction', 'Choose who to ask and send the message this week.'),
        s('Name the one work change you most want, in a single sentence', 'Write it down and read it to someone you trust.'),
      ],
    },
  },
  {
    id: 'money', name: 'Money', short: 'Money',
    prompt: 'How your everyday money choices and arrangements are working for you',
    reflection: 'Money is personal, and many of us manage it quietly, for ourselves and for the people we look after. Choosing this area means you want your arrangements to work for you as well. One clear routine, shared with one person you trust, usually does more than a new spreadsheet.',
    suggestions: {
      hour: [
        s('Hold a 15-minute money check-in every week', 'Choose the day, and ask someone you trust to message you if you miss it.'),
        s('Know exactly what leaves your account each month', 'List every regular payment and cancel one you no longer use.'),
        s('Put a fixed amount aside every payday', 'Decide the amount and set up the transfer this week.'),
      ],
      'two-three-hours': [
        s('Build a simple monthly spending plan and keep to it', 'Look back at last month and write down your 5 biggest categories.'),
        s('Clear the debt or bill that keeps coming back to mind', 'Write down the balance and the amount you will pay each week.'),
        s('Save towards one named goal', 'Name the goal and the amount, and tell one person who will celebrate with you.'),
      ],
      more: [
        s('Get your money organised in one place: accounts, bills, savings and plans', 'Spend your first hour listing every account and what it is for.'),
        s('Start or grow a second source of income', 'Write down one idea and the first person who might pay for it.'),
        s('Agree a shared money plan with the people you share costs with', 'Choose a time to talk and write down what you want to agree.'),
      ],
      unsure: [
        s('Write down what you spend for a while, without judging it', 'Note everything you spend for the next 3 days.'),
        s('Know your 3 numbers: income, regular costs and savings', 'Write the 3 numbers on one page this week.'),
        s('Talk about money with one person you trust', 'Choose who, and ask them for 20 minutes this week.'),
      ],
    },
  },
  {
    id: 'health', name: 'Health and energy', short: 'Health',
    prompt: 'The routines that support your physical wellbeing and energy',
    reflection: 'Energy runs everything else on this wheel. When the week gets full, the routines that keep us well are usually the first to go. Choosing this area means you want something that fits your body and your week. It lasts longer when someone expects to see you there.',
    suggestions: {
      hour: [
        s('Walk for 20 minutes, 3 times a week', 'Choose the 3 days, and ask someone to walk with you on one of them.'),
        s('Go to bed at the same time on weeknights', 'Pick the time and set a reminder 30 minutes before it.'),
        s('Put screens away 30 minutes before bed on weeknights', 'Choose where your phone will charge overnight, away from the bed.'),
      ],
      'two-three-hours': [
        s('Move for 30 minutes, 4 times a week', 'Choose the activity and the days, and tell your circle which ones.'),
        s('Cook your weekday lunches', 'Plan 3 lunches and buy the ingredients this weekend.'),
        s('Join a class or group that meets every week', 'Find one near you and book the first session.'),
      ],
      more: [
        s('Train for a specific event, like a 5k or a long walk', 'Choose the event and the date, and sign up with a friend.'),
        s('Build a weekly routine of training, sleep and meals that suits you', 'Write the routine on one page and share it with someone who will ask about it.'),
        s('Learn a sport or activity you have always wanted to try', 'Book your first lesson or session.'),
      ],
      unsure: [
        s('Find the one routine that gives you the most energy', 'For one week, note your energy each evening and what you did that day.'),
        s('Take a 10-minute walk after one meal a day', 'Choose which meal, and start tomorrow.'),
        s('Book the health check you have been putting off', 'Book it this week, and tell someone the date.'),
      ],
    },
  },
  {
    id: 'relationships', name: 'Relationships', short: 'Relationships',
    prompt: 'Connection with the people who matter to you',
    reflection: 'Many of us look after a lot of people and still feel far from the ones who matter most. Choosing this area is a decision to give a few relationships the attention you give your work. It rarely needs a grand gesture. It needs you to go first.',
    suggestions: {
      hour: [
        s('Reconnect with one person each week', 'Write the names of 4 people you miss and message the first one today.'),
        s('Call someone you love every week, at the same time', 'Choose who and when, and tell them so they can expect it.'),
        s('Reply properly to the messages you keep saving for later', 'Answer the 3 that have waited longest.'),
      ],
      'two-three-hours': [
        s('Share a meal with someone who matters to you every week', 'Invite the first person and agree a day.'),
        s('Have one proper catch-up a week, in person or on a call', 'Choose 4 people and put the first catch-up in your calendar.'),
        s('Bring a small group of friends together', 'Pick a date and send the invitation.'),
      ],
      more: [
        s('Start a regular gathering with people you value', 'Choose 3 people and suggest the first date.'),
        s('Repair one relationship that has gone quiet', 'Write what you want to say, then send a short first message.'),
        s('Keep one evening a week for the people closest to you', 'Choose the evening and tell them it is theirs.'),
      ],
      unsure: [
        s('Notice who you leave feeling better, and see them more', 'This week, write down who those people are.'),
        s('Send one message a week telling someone what they mean to you', 'Choose who gets the first one and send it today.'),
        s('Ask one friend how you could be a better friend to them', 'Choose the friend and ask them over coffee or a call.'),
      ],
    },
  },
  {
    id: 'growth', name: 'Learning and growth', short: 'Growth',
    prompt: 'Space to learn, develop and explore',
    reflection: 'Learning is easy to postpone because nothing breaks when you skip it. Choosing this area means you want to grow on purpose, at a pace your week can hold. Tell someone what you are learning. Being asked about it keeps it going.',
    suggestions: {
      hour: [
        s('Read for 20 minutes, 3 times a week', 'Choose the book and the 3 times.'),
        s('Learn the basics of one skill you are curious about', 'Pick the skill and one free lesson to start with.'),
        s('Write down one thing you learnt each week and share it', 'Choose who you will share it with.'),
      ],
      'two-three-hours': [
        s('Finish one short course', 'Choose it and book your first 2 sessions.'),
        s('Practise a language for 30 minutes, 4 times a week', 'Choose the language and one person to practise with.'),
        s('Read 2 books that matter to your next step', 'Choose the first book and the day you will finish it.'),
      ],
      more: [
        s('Build something real with a new skill', 'Decide what you will build and who will see it first.'),
        s('Study for the qualification you have been considering', 'Find the next start date and the cost.'),
        s('Find a mentor and meet them regularly', 'List 3 people who are where you want to be, and ask the first.'),
      ],
      unsure: [
        s('Notice what you are curious about and follow one thread', 'Write down 3 things you would learn if time were no issue.'),
        s('Listen to one talk a week and discuss it with someone', 'Choose the first talk and who you will discuss it with.'),
        s('Ask someone you admire what they are learning right now', 'Send the message this week.'),
      ],
    },
  },
  {
    id: 'rest', name: 'Rest and enjoyment', short: 'Rest',
    prompt: 'Time to recover and enjoy your life',
    reflection: 'Rest is often the first thing given away, especially by the people everyone relies on. Choosing this area keeps enough in reserve for everything else you want. Rest you plan, and tell someone about, is the rest that actually happens.',
    suggestions: {
      hour: [
        s('Take one evening a week with no work and no admin', 'Choose the evening and tell the people who usually need you then.'),
        s('Do one thing a week purely because you enjoy it', 'Write a list of 5 things and choose this week\'s.'),
        s('Keep your phone away for the first 30 minutes of each day', 'Decide where it will charge overnight.'),
      ],
      'two-three-hours': [
        s('Protect a half day each week for rest and play', 'Choose the half day and put it in your calendar as fixed.'),
        s('Take up a hobby you have missed', 'Get what you need for the first session this week.'),
        s('Plan one outing a week with someone whose company you enjoy', 'Choose the person and the first outing.'),
      ],
      more: [
        s('Plan and take a proper break', 'Choose the dates and tell someone who will make sure you take them.'),
        s('Spend one full day a week away from work', 'Choose the day and what you will do with the first one.'),
        s('Join a club or group built around something you enjoy', 'Find one and go to the first meeting.'),
      ],
      unsure: [
        s('Notice what restores you, and do more of it', 'Each evening this week, write down one thing that gave you energy back.'),
        s('End your workday at a set time', 'Choose the time and tell someone who will ask if you kept it.'),
        s('Say no to one thing a week you would usually accept', 'Decide which request you will decline next.'),
      ],
    },
  },
  {
    id: 'home', name: 'Home and everyday life', short: 'Home',
    prompt: 'How your surroundings and daily arrangements support you',
    reflection: 'Home is where every other area starts and ends each day. When the space and routines around you work, everything else gets a little easier. Choosing this area means you want your days to carry you rather than wear you out. Small fixes count. So does asking for help.',
    suggestions: {
      hour: [
        s('Clear and organise one space a week', 'Choose the first space and set a 30-minute timer.'),
        s('Plan your week every Sunday in 15 minutes', 'This Sunday, write down next week\'s 3 most important things.'),
        s('Fix the small thing that annoys you every day', 'Name it and decide when you will fix it, or who you will ask.'),
      ],
      'two-three-hours': [
        s('Set up a weekly reset: cleaning, laundry and planning in one block', 'Choose the time and share the plan with anyone you live with.'),
        s('Make one room a place you enjoy being', 'Choose the room and the first change.'),
        s('Clear out what you no longer need', 'Fill one bag this week and decide where it goes.'),
      ],
      more: [
        s('Finish the home project you keep postponing', 'Write the steps and set a date for the first one.'),
        s('Agree a fair split of household tasks with the people you live with', 'List the tasks and suggest a time to talk.'),
        s('Work out the home or arrangement that suits the life you want', 'Write down what must change and what you can afford.'),
      ],
      unsure: [
        s('Notice which daily routines drain you most', 'This week, write down the moment each day that feels hardest.'),
        s('Prepare tomorrow the night before', 'Tonight, set out what you need for the morning.'),
        s('Ask for help with one task you carry alone', 'Decide the task and who you will ask.'),
      ],
    },
  },
  {
    id: 'meaning', name: 'Meaning and contribution', short: 'Meaning',
    prompt: 'The activities, values or contributions that give life meaning to you',
    reflection: 'Meaning is personal. For some it comes from values or faith, for others from craft, service or the people they show up for. Choosing this area means you want more of your week to reflect what you care about. Start with one small act, and let someone see it.',
    suggestions: {
      hour: [
        s('Give an hour a week to a cause you care about', 'Choose the cause and find one way to help this week.'),
        s('Write down what matters most to you and check your week against it', 'Write your 3 most important values on one page.'),
        s('Do one deliberate kind thing a week for someone', 'Choose who this week, and do it.'),
      ],
      'two-three-hours': [
        s('Volunteer regularly with an organisation you believe in', 'Find one and ask about their next session.'),
        s('Make time each week for the practice that grounds you', 'Choose the time and protect it in your calendar.'),
        s('Mentor someone who is a few steps behind you', 'Think of one person and offer them an hour.'),
      ],
      more: [
        s('Start something that serves the people around you', 'Write down the idea and one person to start it with.'),
        s('Take on a role in a group you care about', 'Ask the organiser what help they need most.'),
        s('Create something that expresses what you care about', 'Decide what it is and when you will share it.'),
      ],
      unsure: [
        s('Notice when you feel most like yourself', 'Each evening this week, write down one moment that felt right.'),
        s('Ask 3 people what they think you care about most', 'Send the first message today.'),
        s('Give one quiet hour a week to what you want your life to stand for', 'Choose the hour and where you will spend it.'),
      ],
    },
  },
];

export const contextOptions = [
  { id: 'season', label: 'A new year or season' },
  { id: 'change', label: 'A big change' },
  { id: 'stuck', label: 'Feeling stuck' },
  { id: 'curious', label: 'Just curious' },
];

export const timeOptions = [
  { id: 'hour', label: 'About 1 hour' },
  { id: 'two-three-hours', label: '2 to 3 hours' },
  { id: 'more', label: 'More than that' },
  { id: 'unsure', label: 'I\'m not sure' },
];

export const horizonOptions = [
  { id: 4, label: '4 weeks' },
  { id: 8, label: '8 weeks' },
  { id: 12, label: '12 weeks' },
];
