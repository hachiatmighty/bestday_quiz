---
name: bestday-quiz
description: Bestday's playbook for planning, designing, writing and launching quizzes on any topic. It covers the decisions already made on the first quiz (the goal-archetype quiz at bestday.ai/quiz), including layout, how clean a screen should be, animation, how questions are asked and answered, the email opt-in gate, sharing, analytics and Mixpanel, and what must be true before launch. Use this whenever someone plans, designs, writes, builds, reviews or ships a Bestday quiz, assessment, "which one are you" funnel or result page. That includes changes to the existing goal-archetype quiz, even when the request only says "the quiz", "a new quiz", "the result page" or "the funnel".
---

# Bestday quiz playbook

These are decisions Hachi has already made on Bestday's first quiz. Apply them to every new quiz by default, so the same corrections don't have to be made twice. They're recommendations, not a template. A quiz on a different topic can depart from them, but say which one you're departing from and why, and check with Hachi before building on the departure.

The goal-archetype quiz at bestday.ai/quiz is the worked example. Look at it to see any of these choices in practice: `references/goal-archetype-quiz.md` says where it lives and how it's built and shipped.

## 1. What a Bestday quiz is for

- **It gives something back.** A survey takes from the person, a quiz gives back. The payoff is an identity or a named result the person recognises, not a score or a report.
- **The result is the advertisement.** People forward a result they're proud of, so build the share card to be screenshotted and sent on WhatsApp first. Name results after roles, never verdicts ("Explorer", not "Drifter").
- **It arrives at Bestday's belief without a sales turn.** Every result should come back to *No one achieves alone*: this person does better with a few people who know their goal. It should feel like recognition. Copy that tells people they need Bestday is a sales turn.
- **Lead with strength.** Each result opens with what the person is good at. The difficulty comes second, framed as a pattern, never a flaw.

## 2. Layout

- **Mobile first.** Design at 390px wide, then 1440px. Most visitors arrive from WhatsApp on a phone. Check every screen at both widths before showing it to Hachi: no sideways scrolling, no heading wrapping to three lines, no overlapping cards.
- **Palette.** Bestday's palette is black `#0D0D0D` and cream `#FFFCEF`, with yellow `#FFDE59` **only as an accent**: names, the primary button, focus rings. The website isn't yellow, so never design a yellow page or yellow section backgrounds.
- **Type.** Urbanist, Medium and ExtraBold, in sentence case everywhere. Headlines are large and tight. Use pill buttons and generous spacing.
- **Landing page.** One bold belief as the headline, one subline that says what you'll find out, and one call to action. A short visual tour of the possible results can follow. On the current quiz this is a cream hero, then one line per result on black.
- **Result page.**
  - Show the result card early and keep it in view: it stays pinned beside the text on wide screens.
  - Break long copy into short sections with clear headings.
  - Give one or two moments their own cream block, for example the pull quote and the question to sit with.
- **Teaser before the full result.** After the last answer, show the result name, card and one or two free sections. List the rest as visibly locked tiles, with a count ("Seven more things in your result"). Locked should look locked, not missing.

## 3. Keep it clean

- **One job per screen** and one primary call to action.
- **No clutter.** Leave out draft paragraphs, explanations of the mechanics, placeholder text, and "coming soon" copy. If you can't say why a paragraph is on the page, remove it.
- **Share buttons are icons with small captions,** not text links. The current set is WhatsApp, Instagram, Share and Save. Don't add buttons nobody asked for (X/Twitter was removed).
- **Never invent proof.** Don't make up testimonials, counts or statistics, including the unverified "95%".
- **Show designs before building.** For anything visual, show Hachi PNG screenshots or a preview in the chat before opening a PR. Offer a few options when the direction is open.

## 4. Animation

- **Yes, but purposeful.** Use motion to reveal meaning: lines that stay grey until you scroll to them, or a figure that makes one move in character. Never decoration for its own sake.
- **Make it visible.** Moves should be big enough, start late enough and run slowly enough to be noticed: about 1.5 seconds, starting from a clearly different pose, triggered when the element reaches the middle of the screen. The first version was too subtle and Hachi couldn't see it.
- **Respect reduced motion,** and make sure the page reads fine with no JavaScript.
- **Judge motion on the real preview** (Vercel or a local server), not the chat artifact viewer, which doesn't show scroll effects reliably.

## 5. Questions and answers

- **Length:** about three minutes, and say "three minutes" everywhere. More questions means more drop-off.
- **Open with an easy, personal question that also segments.** The current quiz asks "Which goal is top of mind for you right now?" with a few categories. A new quiz should open the same way, with a context question in its own topic that's answered with one tap. Use the answer to tailor or tint the result.
- **Then set expectations on one short screen:** what you'll find out, how long it takes, and how to answer ("Answer for how you are, not how you'd like to be"). This is "Before you start" in the current quiz.
- **Ask about real behaviour in real situations,** not abstract self-description. "I start working on a new goal the same day I set it" beats "I am impulsive". Each statement should be something the person can picture themselves doing.
- **Plain, global English** that reads the same in Lagos, Accra, Nairobi and London. Avoid idioms that only land in one place, and never assume faith or family structure.
- **Answers are one tap.**
  - Use a five-point scale from "Not me" to "That's me" for statements.
  - Use single-choice buttons for context questions.
  - Move to the next question automatically, but provide a Back button and a progress indicator.
  - No typing until the opt-in gate.
- **Score so the result can't be gamed.**
  - Spread statements evenly across the results.
  - Mix statements describing a strength with ones describing a cost, so agreeing with flattering lines doesn't decide the result.
  - Use deterministic tie-breaks, so the same answers always give the same result.
  - Simulate random answers before launch and check no result wins far more often than the others.

## 6. The opt-in gate (email capture)

- **The gate comes after value, not before.** The teaser shows the result for free. The full result is unlocked with first name and email. The button reads "Show my full result", with "We'll send you a copy too."
- **Consent is explicit and honest.** One line under the email field says what they'll get ("your result and a few short notes over the next week"), "Unsubscribe any time", and links to the privacy policy.
- **WhatsApp is optional and has its own consent.** The checkbox appears only once a number is typed, and it's off by default.
- **Every email needs a working unsubscribe link before launch.** The current quiz's template links to `bestday.ai/unsubscribe`, which doesn't exist yet. Don't launch another quiz into the same gap.
- **The emails are sent by a Cloud Function (`quizCaptureWeb`), not by the quiz site.** Email copy in the quiz repo only drives the previews. A new quiz needs its own templates added there.

## 7. Analytics (decide before building, verify before launch)

- **Mixpanel, EU servers,** with no persistence, no IP address, no autocapture and no session recording. That's how the current quiz is set up.
- **Every quiz must ship with tracking live.** The first quiz ran untracked from launch for over a week because it was built with an empty token. A build without a token must fail.
- **Ask Hachi before building a new quiz:** "New Mixpanel project with its own token, or the existing Bestday Quiz project (4068985) with a `quiz` property on every event?" Separate projects keep reports clean. A shared project makes it easy to compare quizzes. Don't pick for them. Then get the token with Mixpanel's `Get-Project-Token`. Pass it in at build time and keep it out of source files and the skill.
- **Events to track** (the current set, which a funnel can be built from):
  - `landing_view`, `quiz_start`, `step_view`, `question_answered`, `quiz_complete`;
  - `teaser_view`, `capture_submit`, `result_view`;
  - `share_click` (with the channel), `card_download`, `referral_landing`, `signup_click`.

  Attach the result, the segment from the first question, and the UTM and `ref` values.
- **Verify twice:**
  1. **Before merge:** run the build in a browser and intercept the Mixpanel requests, so test events don't reach the real project. Check they carry the right token.
  2. **After release:** within the hour, query Mixpanel for events whose URL is on bestday.ai. If there are none, tracking isn't live, whatever the code says.

## 8. Links and sharing

- **App links go through Branch,** never straight to the App Store or Google Play. Each quiz and channel gets its own link, so attribution stays clean. The current quiz uses:
  - `quizw` for the quiz pages;
  - `quize` for the emails, through `/quiz/start`;
  - `web01` for the site header and footer.

  Ask Hachi for new links for a new quiz, and ask whoever owns Branch to set a desktop fallback for each one.
- **Share mechanics:**
  - the share message is written in the person's own voice and ends with an invitation ("Take the quiz and tell me yours:");
  - a friend who opens a shared result lands on a greeting page ("Your friend is…") that starts the quiz;
  - after they finish, they see how the two results fit together.
- **Ask for a few trusted people, not "share with friends".** The current heading is "Who would tell you if this is true?"

## 9. Words

- Use the result word chosen for the quiz consistently. On the current quiz that's "archetype", never "type" or "personality type".
- Calls to action talk about people: "Start your circle", "Add them to your circle". Avoid old-sounding phrasing such as "invite them onto your goals".
- Pricing comes from the website's `src/config/publicPricing.ts`. Today the line is "Premium is $99 a year. Your people join free." Never mention a free trial or claim savings.
- Every email signs off `Bestday` / `Do it. Together.`
- For the full voice rules, banned phrases and the copy checklist, read `references/voice.md`.

## 10. How work gets shipped

Work on a new branch, then open a PR into `develop` on the website repo (`kayakinwunmi/bestday-ai-landing-page`). Going live is a separate release PR from `develop` into `main`. Never commit to `main`. Before the release PR, run through `references/launch-checklist.md`.

## Reference files

- `references/launch-checklist.md`: what must be true before any quiz goes live. Read it before every release PR.
- `references/voice.md`: Bestday's voice, banned phrases and AI tells, how to write result copy, and the copy checklist.
- `references/goal-archetype-quiz.md`: the worked example. Where it lives, how it's built and shipped, the `scripts/ship-quiz.sh` build script, and the gotchas that have bitten before.
