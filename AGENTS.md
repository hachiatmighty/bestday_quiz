# Working in this repo

This repo builds Bestday's quizzes as static Astro sites. `/quiz` is the live goal-archetype quiz. `/life-audit` is the Bestday Life Audit, being built now.

## Read first

1. `docs/life-audit/SPEC.md` for the Life Audit. It overrides the playbook where they differ.
1. `docs/life-audit/VOICE.md` for all copy. It overrides the playbook's `voice.md`.
2. `.claude/skills/bestday-quiz/SKILL.md` and `references/voice.md`, `references/goal-archetype-quiz.md`.

## Rules

- Do not change the behaviour, copy or output of the existing `/quiz` build unless the task says so. `npm run build` and `npm test` must stay green.
- Reuse existing code (analytics, capture, share actions, styles) by importing or extracting shared modules. Do not copy-paste large blocks.
- Mobile first: 390px, then 1440px. No sideways scroll.
- Palette black `#0D0D0D`, cream `#FFFCEF`, yellow `#FFDE59` only as an accent. Urbanist. Sentence case.
- No secrets or tokens in source. Mixpanel token comes from `PUBLIC_MIXPANEL_TOKEN` at build time.
- No em dashes in user-facing copy. No invented statistics or testimonials.
- Add or update tests in `tests/` for every logic change. Run `npm run build && npm test` before you finish and report the result honestly.
- Do not commit, push or switch branches. `.git` is read-only in your sandbox; the reviewer commits after review.
- `tests/origin-rewrite.test.mjs` can fail inside your sandbox because it spawns a child process. Do not edit it to work around that; mention it in your report.
- The goal suggestions and area reflections in `life-audit/data/audit.mjs` are reviewed copy. Do not rewrite them; you may add fields.
- Finish with a short report: what you changed, files touched, test results, anything you were unsure about or left undone.
