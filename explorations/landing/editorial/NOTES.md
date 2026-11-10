# Editorial: you already audit yourself

Kind: software, a free reflection tool from Bestday.
Direction: cream editorial opening, a ruled masthead, one reading column and a black close, pill actions, one type-setting moment. Bestday's supplied palette and Urbanist remain in use.

This page treats the monthly or yearly audit someone already does with a friend as something worth writing down. A single reading column makes the case for looking across 8 areas before choosing one goal, with the actual question format and an example of the result inside the essay.

## Round 2 changes

- The opening is cream, with black type and a black button with yellow text. The new headline is “A life audit for the friend everyone counts on.” The first screen has no pictogram or split composition.
- The masthead stays in document flow, uses the existing black Bestday wordmark, a rule and one link, “On taking stock”. It shares the reading column's edges.
- The column is 800px at desktop, giving 320px outer margins at 1440. Phone gutters remain 24px. The standfirst starts with a dropped capital. The opening uses 96px type at desktop and 50px at 390, with “counts on.” kept together.
- The wheel now sits in the reading column after its example label. The circle statement “Someone could name a goal I’m working on.” is pulled from v3 and set at 72px on desktop and 42px on phones. Its section heading is smaller so the statement leads.
- Replaced the closing's two-fragment heading with “A goal your people can follow with you.” All other headings name their subject in one phrase. Re-read `references/copy-tells.md`; direct copy lint reports 0 FAIL and 0 WARN.
- Kept the selected v3 Work statements, practice scale, handoff, return position, keyboard focus, reduced-motion support and example disclosures. Both scale labels now use the bank's exact `That's me` apostrophe. The copy agreement test checks every scale label and the new circle statement against `QUESTIONS-V3.md`.
- Reserved space for the figure in the example circle read so it cannot overlap the copy as the column narrows.

## Screen plan (taste skill step 3)

- `opening`: name the category and the friend everyone counts on; cream, oversized live typography and a dropped-cap standfirst, kind type; 1 screen including the masthead. Hero entrance once: the headline arrives first, followed by the invitation and action.
- `whole-life`: explain why all 8 areas belong in the review; two short paragraphs and an example wheel made from the existing pictograms, kind diagram; 1 screen. The wheel is static, with fictional readings explicitly identified before it.
- `five-parts`: explain the audit as a real sequence, including the circle and the final goal; 5 editorial list rows, kind type; 1 screen, taller content-led layout on small phones. The context question is acknowledged separately from the 5 parts.
- `questions`: let the situations persuade; 4 original Work statements set as large live text and an operable practice scale, kind type/UI; 1 screen. The only scroll-triggered moment sets the 4 statements in sequence, once, so each can be read. All words remain visible and the still is complete without JS or with reduced motion.
- `circle`: introduce the questions about real people; one exact v3 statement set large and one explicitly fictional circle read in live product HTML, with a small relationships pictogram, kind type/UI; 1 screen, content-led on phones.
- `method`: explain where the wheel and suggested focus come from, skips, limits and the email gate; editorial method note, kind type; 1 screen.
- `closing`: bring the reader to one sentence, a first step, a day and a person; large typography and the main action, kind type; 1 screen. Footer belongs to this screen.
- `audit`: separate in-page handoff, outside the landing's screen sequence; Part 1 / area 1 / statement 1, 5-point scale, keyboard access and a return to the exact reading position. The handoff explicitly stops after that answer; this exploration does not implement the audit.

## Design plan

- Palette: `#0D0D0D` ground/ink; `#FFFCEF` ground/ink; `#FFDE59` action and focus on black only. Original grey figure variants only inside the example wheel. Black buttons with yellow text on cream; yellow buttons with black text on black. Focus is black on cream and yellow on black. HTML and body each declare both background and font.
- Type: locally copied Urbanist 500 and 800 only. At 1440: opening and close 96px, pulled circle statement 72px, section heads 56px, Work statements 30px, standfirst 26px, reading text 22px, method text 21px, UI/metadata 16px. At 390: opening 50px, pull 42px, heads 38px, Work statements 24px, standfirst 21px, reading 20px, UI 16px. Tight display tracking and comfortable body leading.
- Layout: one 800px column with equal outer margins (320px at 1440); 24px phone gutters. The standfirst uses a 720px measure. The wheel enters after the argument, never in the hero. At 1440x900 the 88px masthead and 812px opening fill the first screen; following landing sections are 900px. Phone sections can grow to keep text and controls legible; no scroll snapping or hidden overflow to conceal layout errors.
- Motion: adapted taste-skill `motion.css` and `motion.js` provide the hero entrance and button/link states. One section-local statement-setting sequence; no other scroll motion or loops. Reduced motion shows the finished composition. Native anchor scrolling throughout.
- Voice card: capable, flat and specific; “you” and actual friends; monthly reviews, work taking personal time, the person who checks in. No testimonials, coaching claims, invented evidence or borrowed authority.

## Copy and product truth

The source is `STRUCTURE-V3.md`, taking precedence over the older 3-minute / 0–10 spec. About 8 minutes, about 52 answers, 5 parts plus context; timings are estimates pending testing. The wheel, a suggested focus and one area read are free; first name and email open the rest. The page says so before the final action.

`QUESTIONS-V3.md` appeared during the final checks and was incorporated before completion. The handoff and example now use its selected Work W1, W2, C1 and C2, its exact scale labels, and its “The checking pair” role and complete description. The first question is “I moved forward on work I actually care about.” The bank is still a copy and measurement draft; the exploration implements no v3 scoring.

All wheel readings and the circle read are labelled examples, not member results or endorsements. The practice answer and handoff answer stay in memory only, separately. No analytics, capture, network calls, account creation or storage are part of this local exploration. Reviewed `audit.mjs` goal suggestions and reflections remain untouched.

## Difference from the other directions

The working-wheel concept asks for a practice interaction immediately; this page asks someone to read an argument. The report concept organises everything around the finished result; this page introduces its wheel only after the reason to look at all 8 areas. The commitment concept opens with a scene between people; this page introduces the circle after the reader understands the audit. There is no centred belief hero, scroll-lit manifesto, feature-card grid or result gallery.

## Assets

No AI images generated: the concept needs typography and the existing, consistent pictograms. Copied locally: both Urbanist fonts, the black and white Bestday wordmarks, 8 cream figures and the yellow relationships figure. The new black wordmark is copied from `public/assets/logos/wordmark-black.png`. `wheel-example.svg` reuses the repo's existing `figureWheel` renderer and `sectorPath` geometry with fictional normalised readings; its embedded figures make the file portable. The accessible description names the chosen focus, with no numeric ratings shown. `favicon.svg` is a small geometric brand figure, not a generated raster asset. `motion.css` and `motion.js` come from the requested taste skill; JS exports are adapted to an IIFE so the page also works directly from a file, without a module server. The existing motion files were not edited in round 2.

## Open questions

- Approve the question-bank draft and its scale labels before production use.
- Time the full v3 audit on phones before treating “about 8 minutes” as a tested estimate.
- Confirm the final circle-read wording and what remains behind email in the v3 production flow.
- This is an isolated exploration, not wired to the live audit or its analytics/capture.

## Validation

`GATE: ERROR (copy-lint.mjs could not run (exit 0: spawnSync /opt/node22/bin/node EPERM); consistency.mjs gave no report (exit 2); check.mjs could not run (exit 2))`

The gate's `gaming-suspect` finding on `assets/motion.js` was waived as directed by `references/gate.md`: it is the kit's existing `shot()` check inside its classic-script wrapper. The page declares `data-motion="live"`, so this check does not change its behaviour in headless browsers. The waiver and gate diagnostics are in `.taste-skill/`. There are no unwaived static findings; browser checks and performance are unverified. Directly running copy lint succeeds: 0 FAIL, 0 WARN.

The 6 focused tests in `tests/editorial-landing.test.mjs` pass. They cover scale validation, example/personal answer isolation, the actual DOM event handlers for handoff/return/focus, local asset completeness, script syntax, exact question-bank agreement and contrast pairs. Direct-file operation uses classic scripts and relative URLs. Static text-measure checks use the actual Urbanist fonts at 320, 390, 768, 1024 and 1440; these are not browser layout verification.

Fresh browser screenshots are blocked: the skill's screenshot server cannot bind any port in 5300–5399 in this sandbox. The reviewer should open `index.html` at 390x844 and 1440x900, scroll each screen, try the practice scale, start from both CTAs, choose an answer and return via Back and the in-page link. Check reduced motion and direct `#audit` entry as well.

`npm run build && npm test`: build passed with 0 errors, 0 warnings and 3 existing hints. Tests: 23 files passed and 1 failed (`tests/origin-rewrite.test.mjs`, the pre-existing sandbox-sensitive child-process test documented in AGENTS.md). That test is unchanged. No quiz production source or reviewed audit data was edited. No commit, push or branch switch.

Files touched in round 2: `index.html`, `assets/editorial.css`, `assets/wordmark-black.png`, `NOTES.md`, `tests/editorial-landing.test.mjs`, and local `.taste-skill/` diagnostics. Production v3 decisions remain the open questions listed above.
