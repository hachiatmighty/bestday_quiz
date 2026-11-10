Kind: software. A free reflection tool from Bestday.
Design selection: black stage, cream reading surfaces, yellow actions and one focus figure; Urbanist 500/800, split hero, centred navigation, pill buttons, cream middle band, type close. Brand and the fixed people-first concept determine these choices; no skill scripts were run, as requested.

# Concept

The Life Audit looks at the people around a goal as well as the goal itself. Two figures passing a small card introduce a page that moves from familiar situations to a private result and a deliberately small sharing choice.

# Screen plan

- `home`: the audit includes your people; custom two-figure pictogram (object); 1 screen; hero entrance puts the name before the action and settles the illustration once.
- `people`: recognise the circle questions; 3 concrete statements with pictograms (type); 1 screen; still text, no scroll reveals.
- `audit`: the whole audit, beyond relationships; live HTML overview with eight areas and five ordered parts (UI); 1 screen at 1440, grows naturally on mobile.
- `sharing`: separate the private picture from the chosen commitment; interactive HTML export preview (UI fragment); 1 screen; one user-triggered moment places the wheel in the export only when requested.
- `result`: the wheel, circle read and one goal; labelled fictional result with a wheel of figures (UI); 1 screen; text remains readable without motion.
- `method`: the rules behind the wheel and focus; situational statement and input-to-reading diagram (diagram); 1 screen.
- `questions`: practical answers before starting; four answers shown in full (type); 1 screen.
- `start`: choose the one thing to tell your people; big typographic close and wordmark (type); 1 screen, footer included.
- `handoff`: Start replaces the landing with Part 1, Work and direction, first statement and five selectable answers; 1 screen. Return restores the landing position and focus. Browser history works in both directions.

# Design plan

- Palette: `#0D0D0D` is the main stage and product surface. `#FFFCEF` is text on black and the full audit/method ground. `#FFDE59` is limited to actions, the focus figure, selected answers and focus states on black. Secondary text is cream at reduced opacity on black. Cream-ground actions use black with yellow text. Both html and body own their background and font.
- Type: local Urbanist Medium 500 for prose and controls, ExtraBold 800 for headings. Desktop h1 88px, h2 64px, h3 28px, lead 22px, body 18px, labels 14px. Mobile h1 48px, h2 38px (44px in the close), h3 25px, body 17px. No tracked capitals or decorative eyebrows.
- Layout: equal 80px edges at 1440 and 24px at 390, maximum 1280px. All splits use the same 6/6 columns. Hero is exactly the first viewport. Desktop sections are one viewport each at 1440x900; mobile sections grow for legibility. No sideways scroll or fixed mobile action bar.
- Voice: Bestday's current voice; capable, specific, warm; second person; member nouns (goal, people, check in, slipping); no coach language, invented reviews or member counts.
- Motion: adapted taste-skill motion layer, one hero entrance; the optional-wheel interaction is the page's additional orchestrated moment. No timers, loops, parallax, scroll reveals or libraries. Reduced motion rests immediately.
- Deliberate departure from the skill: labelled examples are required by the brief; brand fonts, weights, colours and pictograms override dealt defaults. The user explicitly prohibits installation and script execution. No photograph, shader, or extra effect fits this concept. The first-question handoff is intentionally a bounded preview, not a second audit implementation.

# Difference from the other directions

This starts with a relationship, rather than letting visitors try audit controls, opening an editorial invitation, or showing a report first. Its main interactive demonstration concerns the boundary between a private result and a chosen commitment. It does not ask for a friend, email, public post or contact permission.

# Assets

- Generated with the built-in imagegen tool: `assets/people-handoff.webp`, two faceless cream/yellow figures passing one small cream card on black. One initial generation and one colour-flattening revision. Original prompt and revision are in `assets/hero-prompt.md`. The PNG source is retained outside the repo by the image tool; the selected optimised WebP is self-contained here.
- Copied from `life-audit/public/assets`: Urbanist Medium/ExtraBold, the white Bestday wordmark, eight cream area figures, yellow Work and Relationships figures. These are brand assets, not generated for this exploration.
- Copied taste-skill `motion.css` and `motion.js` into the local assets folder; no installation or skill scripts.
- Wheel/diagram: live HTML and SVG based on the actual v3 result structure, with explicitly fictional readings. No generated product screenshot.

# Open questions and boundaries

- `QUESTIONS-V3.md` appeared during implementation. The final handoff uses its exact `work.W1`: “I got something done on the work I wanted to do.” The five answer labels, introductory instruction, three circle statements (S3, S4, S5), method example (`work.C1`) and example circle role now follow that draft. Its copy is still a proposal for review, not a validated instrument.
- V3 gives “about 52 answers”, five parts plus context, and “about 8 minutes”. It embeds the one-word check inside each area while retaining its Part 2 label. The page follows this wording and five-part naming; the estimate still needs timed member testing.
- The whole result beyond the wheel, suggested focus and one area read requires first name and email. This is disclosed, not implemented in this landing exploration.
- Commitment-only sharing is the default demonstration; actual sharing, export, capture, analytics and the remaining audit are outside this standalone landing/handoff scope. No data leaves the page and nothing is persisted.
- The v3 question draft leaves the numerical treatment of “Not on my mind right now” unresolved. This page does not implement scoring; its example readings are explicitly fictional.
- Final hosting/canonical URL remains undecided. All runtime assets and navigation are relative or in-page.

# Validation

The taste-skill checker, dealer, gate and other scripts were deliberately not run, per the brief.

- All 7 targeted checks in `tests/people-first-landing.test.mjs` pass: default privacy, the five-answer selection contract, exact v3 question-bank wording, relative asset/anchor resolution, honest v3/gate copy, AA brand pairs and explicit root surfaces, and event-driven routing/sharing/answer state with a DOM test double.
- `node --check` passes for the page and copied motion module.
- Final `npm run build && npm test`: build passes (32 static pages). Full test run passes 23 of 24 test files. `tests/origin-rewrite.test.mjs` fails with `ERR_TEST_FAILURE`, consistent with the documented sandbox-sensitive child-process limitation. It was not edited.
- Chromium and the available headless-shell launch were blocked by the sandbox (`Operation not permitted` / `SIGTRAP`). No screenshots, real-browser layout, touch, reduced-motion rendering or browser performance checks could be completed. The page includes responsive CSS for 390, 768, 1024 and 1440, but this is not a claim of verified rendering. The reviewer should visually check those sizes.
- Total page source and local assets are approximately 450 KB. No source files, capture/analytics modules, reviewed audit data or quiz behaviour were changed. Other landing explorations and `QUESTIONS-V3.md` appeared concurrently in the shared workspace and were left alone.
