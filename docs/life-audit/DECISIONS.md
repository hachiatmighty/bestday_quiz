# Life Audit: decisions log for Hachi

Decisions made during the build without interrupting you. Each has the reasoning and what to change if you disagree. Status: **Open** = needs your call, **Made** = my call, easy to reverse.

## Agreed with you before the build

| # | Decision |
| --- | --- |
| A1 | Shared Mixpanel project 4068985, `quiz: 'life_audit'` on every event. |
| A2 | Playbook gate: wheel and chosen focus are free, goal suggestions and full result need first name and email. |
| A3 | Pre-written goal suggestions, no AI, no backend in v1. |
| A4 | `/life-audit` on bestday.ai, built from this repo next to `/quiz`. |

## Made during the build

| # | Decision | Reasoning | Status |
| --- | --- | --- | --- |
| D1 | Based `codex/new-quiz` on `claude/quiz-playbook-skill`, not the repo default branch. | The default branch (`feat/reviewable-quiz-funnel`) is 8 commits behind the live quiz (manifesto landing, redesigned results, Branch links). Building from it would have lost live work. | Made |
| D2 | Voice follows the Notion "Bestday Voice Guide" (9 Nov 2026), copied to `docs/life-audit/VOICE.md`. | It says it wins over older docs. Practical effect: numerals ("3 minutes") instead of the playbook's "three minutes". The existing `/quiz` still says "three minutes"; I did not change it. | Open: confirm numerals for the audit |
| D3 | The 0 to 10 answers are never called "scores" in copy. | "score" is on the voice guide's banned list (standard, milestone instead of streak, score, points). Copy says "your wheel" and "you rated it 4". | Made |
| D4 | Pricing line "Premium is $99 a year. Your people join free." | Matches `publicPricing.ts` (yearly is the default period) and the live quiz. The voice guide's "$10 a month" example is also true but the quiz line keeps the two funnels consistent. | Made |
| D5 | Codex runs with its own workspace sandbox; I review, commit and push. | A run with the sandbox disabled was refused by the session's safety check, and Codex's sandbox makes `.git` read-only, so every commit on this branch has passed my review first. | Made |
| D6 | I rewrote all area copy (reflections, 96 goal suggestions, first steps) instead of keeping Codex's draft. | The draft was generic and habit-tracker-like ("…for four weeks" on every line, no second person). The rewrite follows the voice guide: concrete goals, a person in most first steps, British spelling, numerals. | Open: please read `life-audit/data/audit.mjs` |
| D7 | Goal suggestions never state a duration. | The person picks 4, 8 or 12 weeks on the result, so "for four weeks" in the goal would contradict their choice. A test enforces it. | Made |
| D8 | Each goal suggestion carries its own first step, prefilled and editable. | The brief asks for "a first action for the coming week"; a blank box is where people stall. | Made |
| D9 | Time options read "About 1 hour", "2 to 3 hours", "More than that", "I'm not sure". | Voice guide numerals rule. | Made |
| D10 | Share URLs carry only the chosen area (`/life-audit/r/relationships`), never the goal or ratings. The personal card is drawn in the browser. | The brief says scores and answers stay private by default and must stay out of public links. | Made |
| D11 | The share card shows only the commitment by default; "Include my wheel" is an opt-in tick box. | Brief: "scores and personal answers remain private by default". Voice guide: celebrate in public, hold struggle in private. | Made |
| D12 | A friend arriving from a share link sees "Your friend chose X. You chose Y." with one thing to do for each other. No 8x8 grid of written pairings. | The archetype quiz's hand-written pairings fit 5 results; 64 area pairings would be filler. Two templated variants (same area, different areas) keep it honest. | Made |
| D13 | Recommend adding only `/life-audit/` to the sitemap, not the 8 share pages. | Share pages are thin and near-duplicate; one strong page is better for search, as the research recommends. | Made |
| D14 | Until the Life Audit has its own Branch links, "Start your circle" falls back to the archetype quiz's `quizw` link. The launch build refuses to run while the dedicated links are missing. | A dead button in review hides the real flow; a fallback keeps it testable. Using `quizw` in production would mix attribution, so launch is blocked until you supply `LIFE_AUDIT_WEB` and `LIFE_AUDIT_EMAIL` (and desktop fallbacks). | Open: create 2 Branch links |
| D15 | Hero: "Look at your whole life. Then choose one thing." Subline names the 8 areas, the wheel, one goal, a first step "to tell someone you trust", 3 minutes. | Codex's "Your life. One clear choice." repeated the eyebrow and had no second person. The research's promise is "see which part of your life deserves attention, then choose one achievable goal"; this says it in Bestday's plain voice. | Open: copy sign-off |
| D16 | Result copy names areas by their short names ("Health and Home are where you feel most satisfied right now"). | The long names made "Health and energy and Home and everyday life", which reads badly. | Made |
| D17 | The opening question's answer (segment) tints nothing on the result yet and is not shown. It goes to analytics only. | The playbook wants the first answer to tailor the result. With 4 segments x 8 areas, tailored lines would be thin. Better use: tailor the emails (a "new season" person gets a January-flavoured note). Logged as a v1.1 idea. | Open |

| D18 | Email form posts in two stages: contact details at the gate, then the chosen goal, horizon, first step and day once the person stops editing. If sending fails, the result still shows. | The gate fires before a goal exists, so a single post could never carry what the first email promises. The playbook gate trades name and email for the full result; a delivery failure must not withhold it. Contract for `quizCaptureWeb`: `docs/life-audit/CAPTURE-CONTRACT.md`. | Made |
| D19 | Fonts load with `swap`, a size-matched Arial fallback and preloads. | Codex chose `optional`, which drops Urbanist entirely on a slow first visit, the common case for a WhatsApp link on a phone. | Made |
| D20 | Email sequence: result now, day 2 "Who knows your first step?", day 4 "How did {day} go?", day 7 "One week in". Pricing line only on the first and last. | Comes back to the first step and the person who will ask about it, as the voice guide asks; no hype, one next step each. | Open: copy sign-off |
| D21 | The share card's focus sector is drawn full length, not at its rating. | Showing a 4/10 on a public card would reveal a rating by default. "Include my wheel" shows the real shape. | Made |

## v2 redesign (after your review on 10 Nov)

| # | Decision | Reasoning | Status |
| --- | --- | --- | --- |
| V1 | The wheel is made of people: 8 pictogram figures, one per area, standing at the rim of their slices. Codex generated them in the archetype quiz's figure style. | v1 had no illustration and a chart-like wheel. The figures are Bestday's signature; this puts the Life Audit in the same family as the archetype quiz. | Open: please look at the figures |
| V2 | The landing hero is a live demo: tap or drag any slice of the wheel. | The frontend-design skill: open with the most characteristic thing in the subject's world, in its most fitting form. For a wheel of life that is touching the wheel. | Made |
| V3 | A scroll-lit manifesto band, one line per area ("Some seasons, work takes everything." … "Which one needs you now?"), same mechanics as the archetype quiz. | Ties the two quizzes together and gives each figure a human truth. | Open: copy sign-off |
| V4 | Contrast rules are enforced by a test: explicit html and body backgrounds; only black on cream, cream on black, yellow on black and muted grey on black; buttons on cream are black with yellow text. | v1 relied on the host for the body background, so the Artifact viewer showed cream and yellow text on white. A yellow button also sat on the cream hero. | Made |
| V5 | v1's generic tells are removed: eyebrow labels, "↗" on buttons, "A · B" strings, decorative numbering. | Called out by the frontend-design skill as markers of generated pages. | Made |
| V6 | Rest's figure redrawn in a hammock. | The reclined first version was ambiguous at small sizes. | Made |

## Verified during the build

- `npm run build`, `npm run build:life-audit` and `npm test` pass (64 tests at the last count). The live `/quiz` build is unchanged.
- Full walk-through in Chromium at 390px and 1440px: every screen, skip-all recovery, Back keeping a 0 rating, reload restoring the result, share page, referral card and personal card. No sideways scroll on any screen, no page errors. Screenshots: `review/life-audit/` (regenerate with `scripts/life-audit-screens.mjs`).
- Mixpanel, with the real Bestday Quiz token and every request intercepted (no test events reached the project): 28 events to `api-eu.mixpanel.com` only, all with `quiz: life_audit`, UTM values, version, segment, focus area and time. No names, emails, ratings or goal text in any event.
- Website handoff: review zip builds; a launch build is refused while the Branch links are missing. Email previews are excluded from the zip.

## Before launch (needs you or someone else)

| Item | Owner | Status |
| --- | --- | --- |
| Create Branch links `LIFE_AUDIT_WEB` and `LIFE_AUDIT_EMAIL` with desktop fallbacks; put them in `life-audit/data/links.mjs`. | Hachi / Branch owner | Blocks launch build |
| Update `quizCaptureWeb` for the two-stage Life Audit payload and add the 4 emails, tested on `bestday-staging`. | Backend | Not started |
| Fix `bestday.ai/unsubscribe` (404 today, same gap as the archetype quiz). | Backend | Not started |
| Sign off copy: hero (D15), area reflections and goals (D6), emails (D20), numerals (D2). | Hachi | Open |
| Carry the chosen goal through signup into the app (opaque reference, app side). | App team | Out of scope for this static build |
| Five usability sessions before promotion, as the Notion brief asks. | Growth | Not started |
| After release: query Mixpanel for `quiz = life_audit` events from bestday.ai within the hour. | Whoever ships | After launch |
| Set owner, cost ceiling, thresholds and review dates on the Notion experiment. | Hachi | Open |
