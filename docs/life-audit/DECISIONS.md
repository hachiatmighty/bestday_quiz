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
| D5 | Codex runs with its own workspace sandbox, commits locally; I review and push. | A run with the sandbox disabled was refused by the session's safety check. | Made |
