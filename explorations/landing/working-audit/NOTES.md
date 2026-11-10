Kind: software
Direction: Bestday black/cream, Urbanist 500/800, live question card with a wheel that builds as you answer. Supplied brand and concept. No installation or taste scripts.

## Round 2 changes

- The opening now centres on the practice controls. A compact headline sits above the card and wheel; the start action follows them. At 1440 the wheel has its own 360px column beside the card. On phones it occupies 164px inside the card, up from 86px. The old headline-left/card-right arrangement is removed.
- Navigation is the wordmark and one text link, “See an example result”. The three-link navigation and header start pill are removed. Both remaining start buttons use “Start your life audit” without a plus or other glyph.
- The 3 taps now preview 3 separate areas: work.W1, health.W1 and rest.C1, copied exactly from QUESTIONS-V3.md. The area name and figure change with the question. This replaces the previous 3 Work statements contributing to one small slice.
- Every answer adds that area's slice while its rim figure fades from grey to cream over 700ms. Earlier slices stay in place. The Rest cost statement is reversed. A zero answer lights the figure and adds a small marker near the centre; it is never drawn as an unanswered area or inflated into a positive reading.
- A visible “0 of 3 areas tried” counter accompanies the wheel. Desktop also says “Practice preview”. This is a demonstration of the controls, with one answer per area, not a completed area reading. Completion explains that the full audit asks more questions for each area. The wheel's accessible name includes the same distinction.
- Back removes the most recent preview and returns to that question. Reset and starting the audit clear all previews. Keyboard focus follows the question or reset control. Reduced motion shows the final slices and cream figures immediately.
- Re-read the taste skill's references/copy-tells.md. Replaced the paired headings with “The 5 parts of your audit”, “How your result comes together” and “A goal for your next quarter”. Removed the method and FAQ contrast frames. The demo, handoff, example Work statements and three circle statements use the v3 bank. “The quiet planner” and its description remain exact source copy.

## Screen plan

- `hero`: try 3 questions and see the wheel build. Compact heading, working card, prominent wheel, one start action. One load entrance and visitor-triggered slice/figure changes.
- `result`: inspect a labelled fictional result. Existing wheel, answer-linked reading, circle read and one goal.
- `parts`: understand the effort. Existing five-part list beside the eight area figures.
- `circle`: read 3 of the 6 source statements about the people around your goals.
- `method`: understand how the result is built and what first name/email open.
- `questions`: six open FAQs.
- `close`: start the audit, with a next-quarter goal heading and footer links.

Desktop sections retain their whole-screen layout at 1440×900. The hero uses natural height on phones and short desktop viewports so controls remain reachable. The mobile layout targets 390px with 24px edges; desktop sections retain 80px edges, with a centred practice workspace. This round could not verify those layouts in a browser.

## Copy and source decisions

The v3 structure and exploration brief govern the about-8-minutes, five-part audit, overriding the older three-minute, single-rating spec for this exploration. Full-result content remains labelled as fictional. Existing reviewed goals/reflections in life-audit/data/audit.mjs and the production quizzes are untouched.

The practice preview stores independent per-area values and does not average across areas. One response per area is enough only for this explicitly labelled demonstration. The method section still explains that the full audit requires at least 3 answers to draw an area. Untouched areas stay missing.

The Start handoff opens Part 1, area 1 directly, as in the original exploration. It accepts one answer and identifies the end of the exploration. Starting clears practice answers; returning shows an empty demo. Everything is memory-only, with no analytics, network submission, cookies or browser storage.

## Assets and implementation

Local Urbanist Medium/ExtraBold, the existing Bestday wordmark and eight supplied figure sets. No generated images, new dependencies or external assets. Existing inline wheels render without JavaScript. Serve the folder with a static server or open index.html directly.

The small sector geometry helper adapts src/lib/wheel-of-figures.mjs. The shared wheel renderer serves the demo and fictional result within this exploration. The supplied taste motion layer is unchanged; the new slice and figure animations live in assets/style.css. No installation, taste scripts, deployment, commit, push or branch change.

Files changed in round 2:

- index.html
- assets/style.css
- assets/app.js
- assets/logic.js
- NOTES.md
- ../../../tests/working-audit.test.mjs

## Verification

- Focused tests pass. Coverage includes independent slices, cost reversal, missing versus zero, earlier answers surviving later taps, Back/reset, duplicate completion clicks, cream/grey figure states, clean handoff and return, exact v3 statements, relative assets, inline no-JavaScript wheels, CSS parsing and text contrast.
- `npm run build && npm test`: build passed with 0 errors, 0 warnings and 3 unused-variable hints in the existing motion files. 23 of 24 test files passed, including working-audit. Only tests/origin-rewrite.test.mjs failed, the sandbox-sensitive child-process test documented in AGENTS.md. That test was not edited.
- A local HTTP server failed with `PermissionError: [Errno 1] Operation not permitted`. Chromium also failed at launch in this sandbox. No new screenshots, rendered overflow check or visual animation verification is claimed at 390 or 1440; the reviewer needs to check these.

## Open questions

- The v3 question bank is still a copy/measurement draft. Confirm final approval and time the complete audit before production.
- The full audit's check mapping, circle patterns, consent, privacy, analytics, capture and delivery remain production implementation work. This round keeps the original one-question handoff.
