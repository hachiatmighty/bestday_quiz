# Bestday Life Audit: build spec

Source: Notion, Growth & Marketing / Experiment Tracker / "Keyword research (Nov 2026)", section "Proposed follow-on experiment: Bestday Life Audit". Playbook: `.claude/skills/bestday-quiz/SKILL.md` and its `references/`. Where this spec and the playbook disagree, this spec wins (the departures below were agreed with Hachi).

## Promise

See which part of your life deserves attention, then choose one achievable goal. About three minutes. Say "three minutes" everywhere.

## Decisions already made

| Topic | Decision |
| --- | --- |
| Route | `/life-audit` on bestday.ai. Built from this repo as a second static output next to `/quiz`. Share pages at `/life-audit/r/:area`. |
| Result | A wheel of eight life areas plus the area the person chooses to focus on. Not an archetype. Never call it a "type", "score" or "grade". The result word is "your wheel". |
| Rating | 0 to 10 per area for the past four weeks. 0 = very dissatisfied, 5 = mixed, 10 = very satisfied. Every area has "Skip this area". Departure from the playbook's five-point scale, agreed. |
| Scoring | Plot each rating directly. A skipped area stays missing, never zero, never filled in. No overall grade, percentile, average or prediction. The person's chosen focus overrides any ranking of low scores. |
| Gate | Playbook gate. Teaser (free): the wheel and the chosen focus area with one short reflection. Locked behind first name and email: goal suggestions, editing a goal, time horizon, first action, the full write-up, share card. Button "Show my full result", with "We'll send you a copy too." Same consent rules as the playbook (section 6), WhatsApp optional with its own off-by-default checkbox. |
| Goal suggestions | Pre-written, no AI, no backend. Three editable suggestions per area, varied by the weekly time the person says they have. |
| Analytics | Existing Mixpanel project "Bestday Quiz" (4068985), EU, same privacy settings as `src/lib/analytics.ts`. Every event carries `quiz: 'life_audit'`. Same event names as the archetype quiz where they apply. Never send ratings, free text, names, emails or phone numbers as event properties. A production build without `PUBLIC_MIXPANEL_TOKEN` must fail. |
| Indexing | The landing page is indexable (no `noindex`) when `PUBLIC_LIFE_AUDIT_NOINDEX=false`; default build stays `noindex` for review. Personal results are never in URLs. |
| Links | App links go through Branch, never store URLs. New Branch links are pending from Hachi: use clearly named placeholder constants and a build check that lists them. |
| Pricing | Only from the website's `publicPricing.ts` line: "Premium is $99 a year. Your people join free." No trial, no savings. |

## Flow (one job per screen)

1. **Landing.** One belief headline, one subline (what you'll find out, three minutes), one CTA "Start your life audit". An example wheel. Below the fold for search: how it works, the method in plain words, short FAQ. Indexable.
2. **Context question (one tap, segments the result).** "What has you taking stock right now?" Options: "A new year or season", "A big change", "Feeling stuck", "Just curious". Stored as `segment`.
3. **Before you start.** What you'll find out, three minutes, "Think about the past four weeks. Answer for how things are, not how you'd like them to be."
4. **Eight rating screens**, one area each, in this order:

   | id | Area | Prompt |
   | --- | --- | --- |
   | work | Work and direction | Your work, studies or business, and the direction they are taking |
   | money | Money | How your everyday money choices and arrangements are working for you |
   | health | Health and energy | The routines that support your physical wellbeing and energy |
   | relationships | Relationships | Connection with the people who matter to you |
   | growth | Learning and growth | Space to learn, develop and explore |
   | rest | Rest and enjoyment | Time to recover and enjoy your life |
   | home | Home and everyday life | How your surroundings and daily arrangements support you |
   | meaning | Meaning and contribution | The activities, values or contributions that give life meaning to you |

   One tap on 0..10 advances automatically. Back keeps the answer. Progress indicator.
5. **Choose your focus.** "Which one area would you most like to give attention to over the next month?" All rated areas are selectable whatever their score; skipped areas are not offered. If every area is skipped, show a gentle screen that lets them go back.
6. **Time available (one tap).** "How much time could you realistically give it each week?" Options: "About an hour", "Two to three hours", "More than that", "I'm not sure".
7. **Loading** (short, purposeful).
8. **Teaser.** The wheel, the focus area highlighted, one free reflection for that area, then locked tiles with a count ("Four more things in your result").
9. **Email gate.** As the playbook.
10. **Full result.** Wheel pinned beside text on wide screens. Sections: what your wheel shows (descriptive, built from their own ratings, no judgement), why this area (their choice respected), three editable goal suggestions (pick one, edit text), time horizon (4 weeks / 8 weeks / 12 weeks), first action this week (pick a day), pull quote in a cream block that comes back to "No one achieves alone" without a sales turn, "Who would tell you if this is true?" asking for a few trusted people, CTA "Start your circle" via Branch.
11. **Share.** Share card shows only the chosen commitment ("This month I'm giving attention to Relationships: reconnect with one friend each week"). No scores, no wheel values unless the person ticks "Include my wheel". Share message in the person's voice, ending "Take the life audit and tell me yours:". Friend lands on `/life-audit/r/:area` greeting page that starts the audit.

## Copy rules

Read `.claude/skills/bestday-quiz/references/voice.md` before writing any copy. Plain, global English for Lagos, Accra, Nairobi, London and the US. Never assume faith or family structure. No em dashes. No invented proof, counts or statistics. No diagnoses, no claims that a score "requires" a goal. Lead with what is working before what is not.

## Out of scope for v1

AI generation, backend storage, preserving the goal through signup into the app (needs an app-side reference, tracked as a pre-launch item), ikigai or other tools, sent-email templates in `quizCaptureWeb` (previews only here).
