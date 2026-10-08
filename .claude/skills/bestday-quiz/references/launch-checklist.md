# Before a quiz goes live

Run through this before opening the `develop` to `main` release PR. Put anything that isn't done in the PR description as an open item, and tell Hachi.

## Analytics
- [ ] Hachi has decided between a new Mixpanel project and the shared Bestday Quiz project with a `quiz` property, and the token is in the build.
- [ ] In a local browser run with the Mixpanel requests intercepted, `landing_view`, `quiz_start` and `question_answered` fire with the right token, the EU host and the UTM values.
- [ ] After release: events whose URL is on bestday.ai appear in Mixpanel within the hour. Check this and report it. Don't assume it.

## Opt-in and email
- [ ] Free value (the teaser) comes before the email gate.
- [ ] The consent line says what they'll receive, says "Unsubscribe any time", and links to the privacy policy.
- [ ] WhatsApp is optional, with its own consent checkbox that's off by default.
- [ ] The unsubscribe link in the emails works. It must not 404.
- [ ] The email templates for this quiz exist in `quizCaptureWeb` and have been tested on staging (`bestday-staging`) before production (`getbestday-88ef7`).

## Links
- [ ] Every app link is a Branch link made for this quiz and channel. The build contains no App Store or Google Play URLs.
- [ ] Each Branch link has a desktop fallback, confirmed by whoever owns Branch.
- [ ] The share page for each result has its own Open Graph image, and the link preview looks right in WhatsApp.

## Experience
- [ ] Every screen checked at 390px and 1440px: no sideways scrolling, no overlapping elements, no heading wrapping to three lines.
- [ ] Motion is visible on the real preview and turned off with reduced motion.
- [ ] Back button and progress indicator work, and the browser's back button doesn't break the quiz.
- [ ] The referral path works end to end: shared page, take the quiz, see the pairing.
- [ ] A scoring simulation shows no result winning far more often than the others.

## Copy
- [ ] It says "three minutes" everywhere, uses the chosen result word consistently, and has no em dashes or banned phrases (`voice.md`).
- [ ] The pricing line matches `publicPricing.ts`, with no trial or savings language.
- [ ] Every product claim is live today.
- [ ] Hachi has signed off the result copy.

## Process
- [ ] The source change is pushed to the quiz repo, and the PR names the source commit.
- [ ] The website build passes, and lint is clean on the changed files.
- [ ] Known failures are named, not hidden. `claude-review` fails while its OAuth token in the repo secrets is expired.
