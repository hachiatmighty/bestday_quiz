# Voice and copy for Bestday quizzes

The full brand voice lives in `docs/BESTDAY_SOCIAL_SKILL.md` in the quiz repo (`hachiatmighty/bestday_quiz`). Read it when writing a lot of new copy. This file has what matters most for quizzes.

## The voice

Bestday sounds like the **Devoted Ruler**: an auntie who remembers the goal you set six months ago, asks warmly and pointedly how it's going, celebrates loudly, and won't let you quietly give up on yourself. It has five qualities, each with a limit:
- warm, never just soft;
- exacting, never harsh;
- present, not merely available;
- grounded, never plain;
- rousing, never loud.

In practice:
- write short, plain sentences with concrete verbs (set, slip, notice, ask, hold, finish);
- describe real human behaviour, not uplift;
- call people forward, never out;
- use British spelling.

**The brand-only test:** if a line could sit unchanged on a gym app, habit tracker or motivational poster, it has drifted. Rewrite it until a real relationship changes its meaning, such as people you respect, a promise remembered, or a return after silence.

## Word choices

| Use | Not |
| --- | --- |
| the quiz's own result word, consistently (the current quiz says "archetype") | type, personality type, profile, assessment, test |
| three minutes | two minutes, 90 seconds, "quick" |
| your circle, two or three people you trust | your network, community, group, followers |
| members (people on Bestday) | users, customers |
| follow your goal with you | hold you accountable, track you |
| Start your circle / Add them to your circle | Invite them onto your goals, Join now |
| `Bestday` / `Do it. Together.` (email sign-off) | The Bestday team, Cheers |
| the pricing line from `publicPricing.ts` | free trial, 7-day trial, Save X% |

- Use "circle" only for real, identifiable people.
- Only promise features that are live. Human coaches can appear in copy, but don't promise everyone a dedicated coach, and don't say the AI "remembers everything".

## Banned phrases and AI tells (search for these before shipping)

- **Em dashes:** use a full stop, comma or line break instead.
- **"It's not just X, it's Y"** and its variants.
- **Hype:** unlock, level up, crush your goals, stay motivated, become your best self, dream big, game-changer, elevate, journey.
- **Padding:**
  - lists of three on autopilot;
  - throat-clearing ("Moreover", "That said", "It's worth noting");
  - rhetorical questions answered in the next line;
  - exclamation-mark enthusiasm.
- **Clinical or diagnostic language:** assessment, trauma, self-sabotage, burnout as an identity.
- **False specificity:** "after a few weeks", not "at week three".

Read every line aloud.

## Writing results

Whatever a quiz is about, each result needs these pieces. The current quiz's field names are in brackets.

| Piece | Job |
| --- | --- |
| Name (`name`) | A role people would be proud to forward. Never a verdict. |
| Identity line (`identity`) | One line that leads with strength. Goes on the card. |
| Free section (`atBest`) | Shown in the teaser, so it has to make them want the rest. |
| Strengths, how others see you (`strength`, `othersSee`) | Concrete and generous. |
| The pattern (`tendency`) | A pattern, never a flaw. Its first sentence works as a pull quote. |
| What you need, who you work best with (`need`, `worksBestWith`) | Why other people help *this* result in particular. Each must be different. |
| A question to sit with (`question`) | Asked, not answered. |
| First step (`firstStep`) | One small action that involves two or three people. |
| Card line (`cardLine`) | First person, about 12 words or fewer. |
| Share message (`forward`) | In the member's own voice. Ends with an invitation ("Take the quiz and tell me yours:"). |
| Landing line (`manifestoLines`) | One sentence of six words or fewer that the result would recognise with a smile. |
| Pairings (`pairings`) | One line for every pair of results, including a result paired with itself. Name both roles, then one thing to do for each other. |

Each result follows the same arc: a human truth, then why other people help, then one easy invitation.

**Swap test:** swap two results' "what you need" lines. If both still read as true, they're too generic.

## Copy checklist

- [ ] No em dashes, no banned phrases, no "it's not just".
- [ ] It says "three minutes" and uses the result word consistently.
- [ ] The pricing line matches `publicPricing.ts`, with no trial or savings language.
- [ ] Every product claim is live today.
- [ ] Results lead with strength and frame the difficulty as a pattern.
- [ ] Each result passes the swap test.
- [ ] Emails sign off "Bestday / Do it. Together."
- [ ] Copy tests and any approved-copy doc are updated in the same change. The current quiz pins its result copy to `docs/copy/RESULT_COPY_V4.md`.
- [ ] Read aloud once.
