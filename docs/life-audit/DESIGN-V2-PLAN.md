# Life Audit v2 design plan

The memorable object is a circle of people, not a dashboard. Everything else gives it room.

Tokens: black #0D0D0D, cream #FFFCEF, yellow #FFDE59, unlit figure grey #4A4842, muted readable grey #B6B4AB. Unlit text uses muted grey, never figure grey. Allowed text/surface pairs: black/cream, cream/black, yellow/black, muted/black. Cream buttons contain a black pill with yellow text; black sections contain yellow pills with black text.

Urbanist 500 for prose and 800 for headings/actions. Mobile scale: 14, 16, 18, 28, 40, 48px; desktop: 16, 18, 24, 42, 64, 96px. Headlines tight, -.045em; prose 1.6 leading, maximum 65ch. No separate data face.

Landing centres the belief and the live wheel. Manifesto alternates on desktop, aligns left on mobile. Rating is a quiet single column with the current figure large, then pills. Result pins the wheel beside left-aligned editorial copy on desktop and stacks on mobile.

390 landing                 1440 landing
+---------------------+     +------------------------------------------+
| Bestday             |     | Bestday                                  |
| Look at your        |     |       Look at your whole life.           |
| whole life. Then    |     |        Then choose one thing.            |
| choose one thing.   |     |              subline                     |
| subline             |     |           (figure wheel)                 |
|   (figure wheel)    |     |        Try it. Then take the real one.   |
| Try it. Then ...    |     |              [Start]                     |
| [Start life audit]  |     +------------------------------------------+
+---------------------+     | figure  Some seasons, work takes ...     |
| fig Some seasons... |     |              Some never look ...  fig   |
| fig Some never ...  |     |             ...                          |
| ...                 |     |        Which one needs you now? [Start]  |
| Which one ...       |     |     1 Take stock 2 Choose 3 Tell         |
| [Start]             |     |     method / FAQ                         |
| 1 / 2 / 3 / FAQ     |     +------------------------------------------+
+---------------------+

390 rating                  1440 rating
+---------------------+     +------------------------------------------+
| Back                |     | Back                                     |
| Area 1 of 8 (wheel) |     |          Area 1 of 8       (wheel)       |
|     large figure    |     |                 large figure             |
| Work and direction  |     |             Work and direction           |
| prompt              |     |             prompt                       |
| 0 1 2 3 4 5         |     |          0 1 2 3 4 5 6 7 8 9 10         |
| 6 7 8 9 10          |     |          scale labels / Skip             |
| scale / Skip        |     +------------------------------------------+
+---------------------+

390 result                   1440 result
+---------------------+     +------------------------------------------+
|    figure wheel     |     |   figure wheel  | What your wheel shows  |
| focus / context     |     |   focus name    | Why this area          |
| What wheel shows    |     |   context       | Goals / editable goal  |
| Why / goals         |     |   (sticky)      | Horizon / first step   |
| horizon / step      |     |                 | Commitment / sharing   |
| commitment / share  |     |                 | Start your circle      |
+---------------------+     +------------------------------------------+

## Review and revision before building

Rejected a split hero and repeated bordered cards: both would make the wheel look like an analytics product. Revised to one centred disc with pictograms at its rim, with no numeric legend. Removed eyebrows, middle-dot meta strings, decorative arrows and section numbering. Kept rounded forms only for actionable pills, focus tiles and the wheel itself. No gradients, shadows or ornamental rules. The three how-it-works numbers describe a real sequence. One focus lift-and-settle is the sole result motion; manifesto reveal reuses the archetype observer. Grey waiting text remains AA readable rather than reproducing the archetype's low-contrast waiting text.

Demo state is local to the demo module and sends a single value-free event. Static wheel markup remains readable without JavaScript. Rating pills remain the accessible answer path; dragging is confined to the demo.
