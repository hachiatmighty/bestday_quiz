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
| D14 | Until the Life Audit has its own Branch links, "Start your circle" falls back to the archetype quiz's `quizw` link. The launch build refuses to run while the dedicated links are missing. | A dead button in review hides the real flow; a fallback keeps it testable. Using `quizw` in production would mix attribution, so launch is blocked until you supply `LIFE_AUDIT_WEB` and `LIFE_AUDIT_EMAIL` (and desktop fallbacks). | Open: create 2 Branch links |
| D15 | Hero: "Look at your whole life. Then choose one thing." Subline names the 8 areas, the wheel, one goal, a first step "to tell someone you trust", 3 minutes. | Codex's "Your life. One clear choice." repeated the eyebrow and had no second person. The research's promise is "see which part of your life deserves attention, then choose one achievable goal"; this says it in Bestday's plain voice. | Open: copy sign-off |
| D16 | Result copy names areas by their short names ("Health and Home are where you feel most satisfied right now"). | The long names made "Health and energy and Home and everyday life", which reads badly. | Made |
| D17 | The opening question's answer (segment) tints nothing on the result yet and is not shown. It goes to analytics only. | The playbook wants the first answer to tailor the result. With 4 segments x 8 areas, tailored lines would be thin. Better use: tailor the emails (a "new season" person gets a January-flavoured note). Logged as a v1.1 idea. | Open |
| D13 | Recommend adding only `/life-audit/` to the sitemap, not the 8 share pages. | Share pages are thin and near-duplicate; one strong page is better for search, as the research recommends. | Made |
