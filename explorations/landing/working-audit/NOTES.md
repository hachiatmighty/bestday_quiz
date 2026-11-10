Kind: software
Direction: Bestday black/cream, Urbanist 500/800, split live-UI hero, pill actions, wordmark nav, cream result spread, black circle section. These are the supplied brand and concept, not a random deal; the founder explicitly requested no installation or taste scripts.

The working audit lets someone feel the audit's one-tap pace before deciding to start. Three practice answers build one provisional slice, then a readable example shows where the full audit leads: a wheel, a circle read and one goal.

## Screen plan (taste step 3)

- `hero` | Learn the pace by answering | object: working question card and small wheel of eight figures | 1 screen | One load entrance; taps update the provisional Work slice, and completion settles it once.
- `result` | Inspect what your own answers give back | object: labelled fictional result spread, wheel and answer-linked reading, circle read and one goal | 1 screen | Static, readable UI; no scroll reveal.
- `parts` | Understand the actual effort | parts: five-part progress list beside the eight area figures | 1 screen | Still. 32 + 8 + 1 + 6 + 4 answers, plus the opening context tap, about 52 altogether.
- `circle` | See the questions about your people | use: large Relationships figure and three of the six situational statements | 1 screen | Still; the question content carries the section.
- `method` | Know how the result is built and what email opens | diagram: answers → area reading → chosen focus; open access rows | 1 screen | Still.
- `questions` | Resolve practical search questions | type: six open FAQs | 1 screen | Still.
- `close` | Start with a clear expectation | type: large next-quarter line and primary action, footer links | 1 screen | Quiet hover/press only.

Desktop sections occupy 100svh at 1440×900. On phones and tablets, content stacks and sections grow as needed; the hero remains one screen at 390×844. This prioritises readable controls over forcing whole-screen heights on every phone.

## Design plan

- Palette roles: #0D0D0D page, cream #FFFCEF text and result surfaces, #FFDE59 focus, wheel slice and primary action on black. Black actions with yellow text on cream. Supporting grey only for unlit figures, wheel outlines and secondary labels on black.
- Type: local Urbanist Medium (500) for all reading text; ExtraBold (800) for headings and important UI. Desktop h1 76px, h2 56px, card statement 34px, body 18px, labels 14px. Phone h1 40px, h2 36px, question 23px, body 16px. No all-caps or decorative eyebrows.
- Layout: equal 80px desktop edges and 24px phone edges; left-aligned split hero, result as one continuous product spread, five-part ruled list, large circle figure, method/access comparison, open FAQ. No repeated feature-card grid, gradient, shadow, stock photography or manifesto.
- One system: 24px panel radius, 999px actions, 12px answer controls; 8/16/24/32/48/64/96 spacing. Taste's supplied motion layer handles entrance and primary button feedback. The second meaningful moment is the visitor-driven slice build; no auto loops or scroll animation.

## Copy and source decisions

Voice: Bestday's flat, specific member register; capable second-person address; situations before abstractions; no humour, hype or borrowed proof. The v3 structure and this brief override the older three-minute, 0–10 spec and original research concept. All full-result content is labelled as a fictional example, as explicitly required by the brief (overriding taste's generic ban on example labels).

QUESTIONS-V3.md arrived during the build. The demo now uses the exact first three selected Work statements (W1, W2, C1), and the handoff uses work.W1: “I got something done on the work I wanted to do.” All five answer labels, the three circle questions and the quiet-planner example are taken from that bank. The demo previews three of the five Work answers; the full audit adds C2 and the closing check. The Start handoff opens Part 1, area 1 directly, as requested, rather than recreating the context flow or implying this is the complete audit.

The practice wheel is explicitly provisional: each tap previews a slice, only three answers completes the demo area, and no full area reading is claimed from one answer. Cost items are reversed. An all-minimum reading remains an answered area rather than a skipped area. Starting clears practice answers; returning restores an empty demo. Everything is memory-only, with no analytics, network submission, cookies or browser storage. The handoff accepts one answer and identifies the end of this exploration.

## Difference from the other directions

This earns the start through using the controls. The editorial concept earns it through an invitation; the report concept starts with a completed result; the people concept starts with a commitment between two people. The working audit has no letter, report-first hero or staged sharing handoff.

## Assets

No images generated: the product UI and supplied figures are the visual subject, and new raster art would distract from the working control. Copied local Urbanist 500/800, Bestday black/white logo PNGs, and the existing eight yellow/cream/grey WebP figures. Wheel geometry adapts the small `sectorPath` helper from `src/lib/wheel-of-figures.mjs`; the existing audit's rendering, capture, analytics, copy and styles are untouched. The independent five-point demo has its own tested logic because the existing renderer implements the older 0–10 audit.

Taste motion.css is copied unchanged from the requested skill assets. motion.js is wrapped in a closure with module exports removed so it also works when opened directly from disk; no skill scripts run, no installation. No external dependencies or assets. Serve the folder with any static server, or open index.html directly.

## Open questions

- The question bank is still a copy and measurement draft. Confirm its final approval before production.
- About 8 minutes is the brief's estimate; time the complete v3 audit before launch.
- v3 says five parts but places Part 2's checks at the end of each area. The list explains that placement rather than promising a separate eight-answer block.
- This is a local landing exploration with a one-question handoff. Production analytics, capture, persistence, delivery, real consent and full audit routing belong to the chosen direction's implementation.
- Confirm final v3 circle patterns, first-name/email gate wording and privacy policy before production. This page promises only the stated gate, not a storage policy for the future audit.

## Verification

- New tests cover five-point arithmetic, reverse cost items, three-answer completion, empty versus zero, clamping, demo back/reset, clean handoff, selection/return, exact v3 source copy, relative asset resolution, inline no-JavaScript wheels, CSS parsing and the three allowed text-colour contrasts.
- `npm run build && npm test`: build passed with 0 errors and 0 warnings. Final full-suite run: 22 of 24 test files passed. `tests/origin-rewrite.test.mjs` failed as documented for this sandbox; the concurrently added `tests/open-result-landing.test.mjs` also failed. Neither file was edited. This exploration’s `tests/working-audit.test.mjs` passes, including its DOM-flow tests.
- Preview server and Chromium launch both failed with sandbox `Operation not permitted` errors. No browser screenshot, overflow or rendered-layout verification is claimed at 390 or 1440. Responsive rules are present, but the reviewer must verify the rendered page.
- The founder-requested taste scripts were not run. No install, commit, push, branch change or deployment.
