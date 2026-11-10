# Life Audit v2: art direction

v1 was rejected by Hachi: not ambitious, plain chart-like wheel, no illustration, and unreadable contrast (cream and yellow text over a white body in the Artifact viewer; a yellow button on a cream hero). v2 is a redesign built on the archetype quiz's visual language, not a reskin.

Process: `docs/life-audit/FRONTEND-DESIGN-SKILL.md` (Anthropic's frontend-design skill). Follow it: plan, review against generic defaults, build, critique with screenshots.

## What the archetype quiz established (keep it)

Study it in a browser before building: `npm run build`, then serve `dist/` under `/quiz/` and walk the landing, a share page and a result.

- **Pictogram figures are the brand's signature.** Flat brand-yellow `#FFDE59` figures: a circle head, rounded capsule torso and limbs, no faces, no outlines, caught mid-action. On black tiles, or grey `#3a3a35`-ish when "not yet lit". References: `public/assets/archetypes/*.png`, `public/assets/illustrations/*.png`.
- **The hero is one belief, huge, centred, black on cream.** The CTA on cream is a **black pill with yellow text**. Yellow never sits on cream.
- **Below the hero, a black manifesto band:** big lines that wait in grey and light up to cream as you reach them, each with a figure that turns from grey to yellow, the result name small under the line. Ends with "Which one are you?" and a yellow pill on black.
- Urbanist 500 and 800 only. Sentence case. No eyebrow labels, no ALL CAPS, no "↗" on buttons, no middle-dot meta strings, no 01/02/03 unless it is a real sequence.

## The idea: the wheel is made of people

Each of the 8 life areas gets its own pictogram figure, drawn in the archetype style, acting out that part of life. The wheel of life becomes 8 figures standing in a ring, each at the rim of its slice. Rating an area fills that slice from the centre out to the figure. Your focus area's figure turns yellow and moves, in character, once. Everything else stays quiet.

One bold thing: the wheel of figures. Everything around it is calm, generous, black and cream.

## Figures (assets)

| Area | Figure, mid-action |
| --- | --- |
| Work and direction | Figure stepping up onto a block, arm forward, like climbing the next step |
| Money | Figure placing a coin on a short stack of coins |
| Health and energy | Figure mid-stride, running |
| Relationships | Two figures, one hand on the other's shoulder, leaning in |
| Learning and growth | Figure sitting cross-legged with an open book |
| Rest and enjoyment | Figure lying back in a hammock or reclined, one arm behind head |
| Home and everyday life | Figure under a simple roof shape (an inverted V), arms relaxed |
| Meaning and contribution | Figure kneeling, planting a small sapling |

Each in yellow on transparent, plus a grey "unlit" variant and a cream variant (for black backgrounds where yellow is reserved for the focus). Same stroke weight, head size and proportions across all 8 and matching the archetype figures. 1024x1024 PNG, figure centred with even padding, plus a tight-cropped WebP for the web.

Supporting asset: a hero illustration of the 8 figures standing in a ring, holding the rim of the wheel, for the OG image and the landing hero on no-JS.

## Screens

- **Landing hero (cream):** the headline "Look at your whole life. Then choose one thing." large and centred, black. Under it, the live wheel of figures on a black disc, interactive: tap or drag any slice and it fills; a small line under the wheel reads "Try it. Then take the real one." The CTA is a black pill with yellow text, "Start your life audit". This is a live demo as the hero.
- **Manifesto band (black):** 8 lines that light grey to cream as they reach the middle of the screen, alternating left and right, each with its area figure turning grey to yellow, the area name small under the line (same mechanics as the archetype quiz; reuse its code if possible). Lines (reviewed copy, use exactly):
  - Work: "Some seasons, work takes everything."
  - Money: "Some never look at the numbers."
  - Health: "Some keep going on empty."
  - Relationships: "Some mean to call back. For months."
  - Learning: "Some have meant to learn it for years."
  - Rest: "Some can't remember their last real day off."
  - Home: "Some live around the thing that's broken."
  - Meaning: "Some wonder what it all adds up to."
  - Close: "Which one needs you now?" with a yellow pill on black, "Start your life audit".
- **Then on black, quietly:** how it works (3 short real steps, a sequence), the method, the FAQ. Keep for search, keep calm.
- **Rating screens:** the area's figure large at the top. The 0 to 10 control stays one tap (pills), and the figure's slice on a small wheel fills as you answer. Bonus if it holds up: you can also drag the slice edge on the wheel itself (radial slider), keyboard and pills remain the accessible path.
- **Focus screen:** the 8 figures as large tappable tiles (black tiles like the archetype landing), each with its rating; selected tile's figure turns yellow.
- **Teaser and result:** the wheel of figures is the hero; the focus slice and figure are yellow; the figure makes one in-character move (about 1.5s, starts when the wheel reaches mid-screen, reduced motion shows the end pose). On wide screens the wheel stays pinned beside the text.
- **Share card and OG images:** the focus figure big on black, the commitment in cream, the area name in yellow.

## Colour and contrast (hard rules, test them)

- Tokens: black `#0D0D0D`, cream `#FFFCEF`, yellow `#FFDE59`, grey for unlit lines and figures, a muted text grey for secondary copy on black. Define them once.
- `html` **and** `body` set an explicit background. Every section sets its own background. Never rely on the host.
- Allowed text pairs only: black on cream, cream on black, yellow on black, muted grey on black (at least 4.5:1). **Never** yellow on cream, cream on cream, grey on cream for body copy.
- Buttons: on cream, black pill with yellow text; on black, yellow pill with black text.
- Add a test that parses the built CSS tokens and asserts every declared text/background pair meets WCAG AA, and that body has a background.
