# Open the result

A finished example report opens the page, so someone can decide whether the result is worth their time before answering anything. Each following screen opens one piece of that report and connects it to the specific answers that produced it.

## Screen plan

Kind: software, a free reflection tool from Bestday.
Direction: brand palette and Urbanist; report-led hero with a wide opened spread, a compact invitation beside it and one navigation link, pill buttons, cream report surfaces, black circle-read and method screens, typographic close and dark footer. Black provides a strong ground for the figures and cream makes the report read like paper; the supplied concept and brand replace random dealing. No taste scripts were run in the initial exploration.

- `hero`: inspect the complete example before starting; live HTML report spread and wheel of figures, kind object; 1 screen; one load entrance lets the report settle as a single piece.
- `wheel`: each slice comes from five answers; wheel and an interactive answer ledger, kind parts; 1 screen; selecting an area changes its evidence without changing the example.
- `readback`: the result gives your answers back to you; two exact answer excerpts and their source statements, kind type/UI; 1 screen.
- `focus`: importance this quarter changes the suggested focus; priority selection and the suggestion with its reason, kind diagram/UI; 1 screen.
- `circle`: the people around a goal matter too; a circle-read result and its two triggering answers, kind parts; 1 screen; a single user-triggered expansion connects the pattern to its evidence.
- `goal`: finish with a goal, first step, day and chosen people; large commitment sheet using the reviewed Relationships suggestion, kind UI; 1 screen.
- `parts`: understand the work before starting; five-part ordered question index, including the closing checks interleaved with the area statements, kind UI; 1 screen.
- `method`: make the method and the email boundary inspectable; method ledger and access/privacy terms, kind type; 1 screen.
- `faq`: resolve practical doubts; six open answers in a two-column list, kind type; 1 screen.
- `start`: make your own report; typographic close, Start and footer, kind type; 1 screen.

At 390px the report opens the page, recomposed into a compact summary. The headline and start button follow it. The hero and other sections grow with their content. At tablet sizes, the split layouts stack and grow as needed. At 1440x900 every main section occupies one screen.

## Design plan

- Palette: #0D0D0D for dark grounds, ink and report buttons; #FFFCEF for paper and reverse text; #FFDE59 only for primary actions on black, the focus slice/figure, and black-button text. Grey only for the supplied skipped figure; secondary text uses neutral opacity. No yellow on cream.
- Type: locally served Urbanist Medium 500 and ExtraBold 800. Desktop h1 40px, h2 56px, report titles 26–34px, body 18px. All reading text within the desktop example report is at least 16px. Mobile h1 30px, h2 36px, body 17px, compact report text 13px minimum.
- Layout: shared 1280px content width, 80px outer edges at 1440px, 24px at 390px. The first screen gives 896px to the report, a 64px gutter and 320px to the invitation at 1440px. The following sections retain their 6/6 split and 24px gutters. Left-aligned headings and complete report boundaries. Fine rules belong to report rows rather than decorating the page. Pill actions; minimal rounding on paper.
- Motion: supplied taste motion layer, one hero entrance, quiet hover/press feedback. Evidence opens only on request. No scroll reveals, parallax, timed loops or hidden-at-rest content. Reduced motion leaves everything at rest.
- Voice: Bestday's present, exacting member register. You have plans already; the audit gives you a view of where things stand and names the people around the goal. No invented proof or diagnosis.

## Difference from the other concepts

The working wheel starts with input; this starts with a finished output. The note starts with an argument; this lets the report make the case. Put one thing between you starts with a commitment passing between people; here the circle read is one inspectable part of a wider report. This is neither an archetype gallery nor a manifesto band.

## Assets and reuse

- No generated raster assets. The supplied eight pictograms already provide the required illustration system; the report and wheel are live product UI, not flattened images.
- Copied locally: Urbanist Medium/ExtraBold, both Bestday wordmarks, all eight cream figure WebPs, the yellow Relationships figure and grey Home figure. The existing Life Audit default OG image is copied as `assets/share.png`. No remote asset dependencies.
- Copied the taste skill's `motion.css` and `motion.js` into `assets/motion/`. Its scripts were not installed or run.
- Wheel paths are pre-rendered with the existing `sectorPath` function in `src/lib/wheel-of-figures.mjs`. The finished HTML needs no build step. The reviewed Relationships goal and first step are used verbatim from `life-audit/data/audit.mjs`.
- No analytics or capture copied into this exploration. There are no network submissions, tokens, personal-result URLs or persistent answers.

## Open questions and limits

- `QUESTIONS-V3.md` appeared during implementation. The page was updated to use its first retained Work statement, all 32 retained area statements, five answer labels and the “The quiet planner” circle pattern with its exact two triggering statements. The handoff is Part 1, area 1, first statement, as requested, rather than the context question.
- V3 is still labelled a proposal in the structure source and a draft in the question bank. This exploration follows the requested about 8 minutes, about 52 answers and five-part presentation. Parts 1 and 2 are interleaved in the actual questions; context is introductory, not a sixth advertised part.
- The closing-check mapping is unresolved in the question draft, especially “Not on my mind right now”. Example fixtures use explicit illustrative values for Fine, Slower than I’d like and Not where I want it. They do not implement or decide the production mapping, and the attention-only option is not used in the example.
- The time estimate needs real completion testing. It is always qualified as “about”.
- All result content is a clearly labelled fictional example, including circle patterns, answer values, selected priorities, day and people. No member quotation is presented as a review.
- Wheel, suggested focus and one area read precede the name/email gate. The example displays full-result content publicly, with this access boundary stated on the landing.
- The handoff ends after the first statement. It accepts a local selection, supports browser Back and return to the report, and does not simulate a completed audit or email delivery.
- This is a local exploration, not a production privacy policy or a deployed audit. Production legal/consent copy, capture, analytics and approved v3 questions remain in the product workflow.

## Round 2 revision, 10 November 2026

- Re-read the taste skill’s `references/copy-tells.md`, located in the earlier scratchpad, alongside the Life Audit voice and v3 question bank.
- New h1: “Your next goal, from a life audit for people with plans.” It names the result, category and reader, and replaces the headline shared with editorial.
- The report is first in the document and the visual reading order. At 1440px it is a wide opened spread on the left with a central fold, a larger wheel and facing columns. The headline and button sit compactly to its right. At 390px the full example comes first, followed by the invitation. Content can grow vertically on smaller screens.
- The header has the Bestday wordmark and one “Read the example” link. The primary start action stays beside the report; returning from the question still restores scroll and keyboard focus.
- Desktop report labels, example tag, answer excerpts, focus explanation and first-step note are all 16px or larger. The compact phone report retains its separate layout.
- Replaced the two-fragment method line and closing heading with “A wheel from your answers.” and “Your goal for this quarter.” Rewrote the focus explanation as a positive statement. The supplied “The quiet planner” role, its description and exact question statements remain intact.
- Checked all 32 area statements and both circle evidence statements against `QUESTIONS-V3.md`. The closing-check prompt and question instruction now also use the exact bank wording.
- Files changed in this round: `index.html`, `assets/style.css`, `assets/app.mjs`, this `NOTES.md`, and `tests/open-result-landing.test.mjs`. The example data, figures, fonts, motion files and production quiz were not edited.

## Verification

- `npm run build && npm test`: build passes, 0 errors and 0 warnings (3 existing unused-variable hints in copied motion assets). Test runner reports 23 passing test files, 1 failure: the existing sandbox-sensitive `tests/origin-rewrite.test.mjs`. It was not edited.
- All 7 open-result tests in `tests/open-result-landing.test.mjs` pass, including fixture arithmetic, priorities, skipped areas, ties, reviewed-copy preservation, exact v3 area and circle questions, the exact closing-check prompt, relative asset/link resolution, evidence changes, answer isolation, handoff selection, simplified navigation visibility, focus, scroll restoration and returning to the landing.
- Round 2 CSS passes the CSS Tree parser; HTML parses and has no duplicate IDs. All local image, font, module and internal-anchor references resolve.
- Round 2 browser verification is blocked by this sandbox: binding a local HTTP socket returns `PermissionError: [Errno 1] Operation not permitted`; Chromium exits on Crashpad `setsockopt: Operation not permitted`. No screenshots or claims of rendered 390px/1440px verification. The page has explicit layouts for these widths, and the reviewer should check their rendered fit.
- Taste skill scripts were not run in this revision. Copy was reviewed directly against `copy-tells.md`; no gate, layout, copy-lint or performance pass is claimed.
- Only the `open-result` exploration and its test file were edited for this task. The live quiz code, reviewed suggestions/reflections and Git metadata were untouched. Other concurrent explorations in this workspace are outside this task.
