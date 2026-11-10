# R2: Life Audit landing pages, flows and results

Research date: 10 November 2026. Deliverable: four landing page explorations, not an implementation. No site code changed.

## Design decision

Explore four different reasons to start: **try the real controls**, **read a persuasive invitation**, **inspect the finished report**, and **see what a commitment means between two people**. Keep Bestday's colour discipline and pictogram figures. Do not repeat the archetype quiz's centred hero followed by a scroll-lit manifesto and result gallery.

These are design hypotheses, not proven conversion winners. The sources show interfaces, publisher claims and documented flows. They do not establish comparative conversion rates for Bestday.

## Scope, evidence and limits

Read the [Life Audit spec](../SPEC.md), [v2 direction](../DESIGN-V2.md), [current voice](../VOICE.md), [quiz playbook](../../../.claude/skills/bestday-quiz/SKILL.md), and its voice and archetype references. The spec controls the audit's behaviour. The current voice controls new copy. The four concepts deliberately explore alternatives to DESIGN-V2's landing structure, as requested; they do not propose changing the agreed audit logic.

Evidence labels used below:

- **Opened:** the public page returned readable content. This establishes exposed content, links and controls, not a completed interactive session or measured mobile layout.
- **Indexed:** search returned content, but opening the page failed or produced a JavaScript shell. Findings are limited to that indexed content.
- **Documented:** an official guide or an identified creator's account explains the experience. Historical examples are dated and are not presented as today's live UI.
- **Unverified:** the relevant state was not accessible. In particular, absence from extracted HTML does not establish absence from the product.
- **Proposal:** an original recommendation for Bestday, with inspiration linked where relevant.

Public pages were searched extensively and opened, including product, method, registration, purchase, sample-report and help pages. No accounts were created, no email addresses submitted, and no paid tests purchased. The local Chromium process could not launch because of sandbox restrictions, so there are no claimed hands-on completions or verified 390px/1440px screenshots in this research. Hero descriptions below concern content hierarchy and exposed media, not pixel measurements.

### US and UK search sampling

The requested **verified US and UK page-one ranking census remains incomplete**. Country-specific Google calls through treg were blocked by the environment's approval policy. Direct Google result-page opens were also inaccessible. The general web search tool does not expose a country selector or reliable rank positions. It would be misleading to call the following a measured top ten in either country.

| Search set | Queries issued | Useful candidates returned, subsequently opened or attempted |
| --- | --- | --- |
| Broad category discovery | life audit tool; wheel of life assessment online | [Ken Hellem](https://kenhellem.com/life-audit/), [Suited Monk](https://www.suitedmonk.com/life-audit/), [Varch](https://varch.club/life-audit/), [Wheeloflife.io](https://wheeloflife.io/), [101 Planners](https://www.101planners.com/wheel-of-life-assessment/), [Dream Coach Match](https://dreamcoachmatch.com/wheel-of-life) |
| UK-intent discovery, not UK rank verification | life audit tool UK; wheel of life assessment UK; life audit online free tool UK | [PrimeCoach](https://primecoach.uk/wheel-of-life-assessment/), [Ascend](https://ascendcoaching.co.uk/life-audit/), [Johnny Lawrence](https://www.johnnylawrence.co.uk/free-life-audit), [Mindtools](https://www.mindtools.com/ak6jd6w/the-wheel-of-life/) |
| US-intent and established category discovery, not US rank verification | life audit worksheet tool United States; wheel of life online free assessment United States; wheel of life Mindtools Tony Robbins assessment | [Tony Robbins](https://www.tonyrobbins.com/quiz/wheel-of-life), [Noomii](https://wheeloflife.noomii.com/), [Coachful](https://www.coachful.co/tools/wheel-of-life), [loggd.life](https://loggd.life/tools/life-audit) |
| Additional interaction discovery | wheel of life assessment; satisfaction motivation wheel | [Janette Possul](https://wheel.janettepossul.com/), [Manifestream](https://manifestream.com/tools/wheel-of-life) |

Required follow-up for a rank-based acquisition decision: capture the first ten organic results for the exact queries life audit and wheel of life in Google US and UK, English, page one, with date, country and ads distinguished. The sample here is sufficient to generate design alternatives; it is not evidence about market share or search dominance.

## Category research

Each entry covers arrival, credibility, preview, flow, reveal, sharing and gate. Publisher claims are attributed, not independently validated.

### C1. Noomii Wheel of Life

**Arrival / proof / preview:** a literal tool title, wheel illustration, free promise and short time estimate. The provider identifies itself as Noomii and explains the coaching exercise below the entry. The wheel image previews the output. **Flow / reveal / share / gate:** the page describes one area at a time, a wheel built during answering, and print/PDF/social sharing afterwards. The precise interactive progress control and any identity fields were not recovered. Its advice to exaggerate ratings and prioritise the lowest area is an anti-reference for Bestday. [Public landing and instructions](https://wheeloflife.noomii.com/).

### C2. Tony Robbins Wheel of Life

**Arrival / proof / preview:** a problem-led headline about an overlooked area holding life back, a less-than-ten-minutes estimate and a free-start button. The exposed page offers no inspectable sample report; the recognised author brand supplies the immediate authority. **Flow / reveal / share / gate:** the landing opened, but the question application did not expose subsequent states. Sections, progress, reveal, sharing and capture placement are unverified. Borrow its single clear next action, not the causal claim that one hidden deficiency limits everything. [Live entry](https://www.tonyrobbins.com/quiz/wheel-of-life).

### C3. Mindtools Wheel of Life

**Arrival / proof / preview:** an editorial article with a named author, named reviewer, date, wheel example and blank worksheet. Method explanation is the credibility device. **Flow / reveal / share / gate:** the article walks from choosing dimensions to current attention, an ideal-attention overlay and action planning; the drawing itself reveals the comparison. A worksheet supports use away from the page. An interactive tool is referenced, but its completion and capture behaviour were not verified. This is useful editorial and overlay inspiration, not evidence that satisfaction and attention are interchangeable measures. [Article and method](https://www.mindtools.com/ak6jd6w/the-wheel-of-life/).

### C4. 101 Planners

**Arrival / proof / preview:** a tool-and-guide page with a dated author byline. It explains the eventual printable and optional action plan before completion. **Flow / reveal / share / gate:** documented steps are template selection, category customisation, ratings, results, then an optional plan. Its controls support sliders, number entry and clicking the wheel; an optional dashed target outline shows gaps. The page states that results/PDF need no account or email and that same-browser progress can resume. These are public instructions, not a completed session. The large publishing navigation is a useful warning about competing attention. [Tool, instructions and FAQ](https://www.101planners.com/wheel-of-life-assessment/).

### C5. Dream Coach Match

**Arrival / proof / preview:** the actual first question is exposed in the landing content, alongside an eight-area scope and short duration. Method and interpretation text sit below it. **Flow / reveal / share / gate:** the interface exposes 1/8, Back/Next, dot/keyboard/radial input and a message about answering enough areas to reveal a reflection. Its FAQ says wheel and reflection require no signup or email; a printable is linked. Exact finished share controls were not inspected. The instructions that favour extreme ratings or the lowest spoke should not transfer to Bestday. [Tool, first question and FAQ](https://dreamcoachmatch.com/wheel-of-life).

### C6. Coachful

**Arrival / proof / preview:** sliders and example values appear directly after the title, so the tool itself demonstrates the promise. Explanatory coaching instructions follow. **Flow / reveal / share / gate:** eight areas share a page, then a button requests interpretation. The page describes an average, spread and suggested focus areas, plus copying the summary and repeating the exercise later. Its FAQ promises no account, email or PDF paywall. Useful distinction: copying a portable text summary is a result format. Its defaults, averages and automatic prioritisation conflict with Bestday's spec. [Tool and instructions](https://www.coachful.co/tools/wheel-of-life).

### C7. Varch Life Audit

**Arrival / proof / preview:** the headline promises a view across past, present and future; an immediate statement says answers remain in the browser. The temporal structure is explained before the controls. **Flow / reveal / share / gate:** three domains are rated at three time points with sliders and continuation controls. The stated output projects pace and a domain at risk of missing its target. Downstream sharing and any gate are unverified. Borrow the legible time comparison, but do not treat recalled history or projected futures as observed data in Bestday. [Audit entry and exposed form](https://varch.club/life-audit/).

### C8. loggd.life Life Audit

**Arrival / proof / preview:** a working-tool layout explains its keep/change/stop method and browser-only data promise. **Flow / reveal / share / gate:** each of eight areas combines a rating with factual notes and a verdict; Audit, Summary and History are separate views. Completion requires ratings and verdicts for all areas. Copy-as-text and locally stored dated comparisons are documented. This is a deeper exercise with substantial typing, rather than a three-minute funnel. Borrow its clear summary-to-first-action handoff, not compulsory disclosure, overall averages or verdict language. [Tool and method](https://loggd.life/tools/life-audit).

### C9. Ascend Coaching, UK

**Arrival / proof / preview:** a typographic opening promises a ten-minute reflection across six areas, backed by the coaching practice's own framework. The content explains the output but does not expose a completed report sample. **Flow / reveal / share / gate:** the page describes ten questions, immediate automated results and automatic entry into its Basecamp community. The linked assessment's progress, sharing and precise capture sequence were not inspected. The lesson for Bestday is to disclose the relationship that follows the audit; automatic community enrolment is not a pattern to adopt. [Dedicated Life Audit page](https://ascendcoaching.co.uk/life-audit/).

### C10. Johnny Lawrence, UK

**Arrival / proof / preview:** a personal-author brand and four named pillars make the method memorable. The opened page describes twelve questions; indexed copy also describes twenty questions and ten minutes. Record that inconsistency rather than choosing one version. **Flow / reveal / share / gate:** an access link is visible, but the downstream audit, completed result and share mechanism were not exposed. The footer newsletter form is observable; it does not prove that the audit itself is gated there. Take the legible method, and keep Bestday's count and time language consistent across entry points. [Audit landing](https://www.johnnylawrence.co.uk/free-life-audit).

### C11. Ken Hellem Life Audit

**Indexed only; open failed.** The indexed landing pairs an example chart with a written-report outline, a sixteen-question/four-minute promise and a start button. Its exposed form text describes a seven-step starting-point section. Privacy and email delivery are stated. This is a particularly relevant result-before-start reference, but exact capture placement, reveal transition, sharing and visual layout remain unverified. [Indexed public page](https://kenhellem.com/life-audit/).

### C12. Suited Monk Life Audit

**Indexed only; open failed.** Named authorship by Raf Adams and the Suit/Monk/Gap framework provide provenance and an explicit result model. Indexed copy names thirty-five statements, seven areas, a short duration, a five-point response scale and email delivery. Optional words are described as personalising the report. The rendered hero, progress mechanism, finished report, sharing and precise email gate remain unverified. Useful lesson: explain what the output represents before asking for input. [Indexed public page](https://www.suitedmonk.com/life-audit/).

### C13. Other interaction candidates

- **PrimeCoach, UK:** the opened page offers a brief coaching-led proposition and a test link, without an exposed sample or time estimate. That link led to a general resources page with no readable questionnaire. Progress, reveal, sharing and gate are unverified. This is a practical caution about a start action that does not visibly reach the promised tool. [Landing](https://primecoach.uk/wheel-of-life-assessment/), [linked destination](https://primecoach.uk/coaching-resources/).
- **Wheeloflife.io:** indexed content previews a twelve-domain wheel and describes the exercise. Opening returned no readable application content; controls, length, method proof, reveal, sharing and gates are unverified. [Public entry](https://wheeloflife.io/).
- **Janette Possul:** indexed instructions distinguish current satisfaction from motivation to improve, then a priority chart. This is useful evidence for a second dimension, but it is not the same as importance. No time estimate, full result, sharing or gate was verified. [Public entry](https://wheel.janettepossul.com/).
- **Manifestream:** indexed content exposes sliders, a chosen focus and an if-then plan, with a browser-local privacy explanation and no-account promise. It explicitly avoids a total or average. The page did not open successfully, so result interactions and sharing were not verified. [Public tool](https://manifestream.com/tools/wheel-of-life).

## Assessment and onboarding benchmarks outside the category

### B1. 16Personalities

**Hero / credibility:** an emotional promise of feeling understood, an illustrated social scene, a ten-minute estimate, usage counters and attributed testimonials. The site discloses that feedback is rewarded; its displayed accuracy figure is a publisher claim, not independent validation. [Homepage](https://www.16personalities.com/).

**Preview / flow / reveal / share / gate:** public type pages let someone inspect an illustrated named outcome and substantial chapters before taking the test. Premium material is distinguished in the navigation. The test URL opened as a JavaScript shell, so current question grouping, progress, exact result animation and post-test sharing/capture were not verified. Do not quietly substitute an older walkthrough. [Public example outcome](https://www.16personalities.com/infj-personality), [test entry](https://www.16personalities.com/free-personality-test).

**Bestday implication:** preview the depth and tone of a result. Keep the Life Audit a reflection, with no personality classification or accuracy badge. 16Personalities also publishes its own framework; do not describe it as the official MBTI. [Framework](https://www.16personalities.com/articles/our-theory).

### B2. Official Myers-Briggs / MBTIonline

**Hero / credibility / preview:** the homepage presents personal, career and team routes. The personal product page discloses a price, official status, research provenance and an individual report plus learning materials. It supplies a product video and features rather than an exposed personalised sample report. [Homepage](https://www.mbtionline.com/), [personal product](https://www.mbtionline.com/products/for-you).

**Flow / reveal / share / gate:** purchase or redeem access first. The official overview describes answering, then learning the framework and verifying best fit before receiving results, followed by practical learning. Exact question progress and in-product sharing were not inspected. The verification step is more useful inspiration than a dramatic algorithmic verdict. [Official sequence](https://www.mbtionline.com/how-it-works/overview).

**Bestday implication:** explain the meaning of the graphic and explicitly leave the choice with the person. Do not import the paid-first model or imply Bestday has equivalent psychometric validation.

### B3. Gallup CliftonStrengths

**Hero / credibility / preview:** a branded assessment proposition, video, visible usage claim and report/pricing routes. Crucially, a report page offers a sample alongside the purchase action. Numbers are Gallup's claims, not transferable proof for Bestday. [Homepage](https://www.gallup.com/cliftonstrengths/en/home.aspx), [report product and preview](https://www.gallup.com/cliftonstrengths/en/403127/cliftonstrengths-34-report.aspx).

**Flow / reveal / share / gate:** the official guide describes a thirty-minute paired-statement assessment with five response positions, then reports and an account dashboard. The public sample is a substantial ranked report with interpretation and action guidance. This is a paid product, not an email teaser; exact live progress and social-share controls were not inspected. Use the current official guide's duration rather than repeating a remembered item count. [How it works](https://www.gallup.com/cliftonstrengths/en/253676/how-cliftonstrengths-works.aspx), [sample PDF](https://www.gallup.com/file/cliftonstrengths/en/260807/CliftonStrengths_34_Report.pdf).

**Bestday implication:** a real sample can demonstrate usefulness more directly than benefit claims. Show a small readable excerpt, not a miniature unreadable report cover.

### B4. VIA Character Strengths

**Hero / credibility / preview:** the homepage leads with strengths and links to research, named testimonials and scale claims. The registration page includes a sample response item. The paid report page exposes a look-inside presentation and graphs. [Homepage](https://www.viacharacter.org/), [report preview](https://www.viacharacter.org/reports2026/total-24).

**Flow / reveal / share / gate:** the free-survey CTA goes to registration, including identity, age, email, password and terms. The page distinguishes a free ranked strengths list from paid interpretation. Its survey estimate is ten minutes there, while the report page says fifteen; do not flatten the discrepancy. The paid report is an immediate PDF download through the account. Questionnaire progress and public result sharing were not inspected. [Registration and free/paid distinction](https://www.viacharacter.org/account/register), [delivery FAQ](https://www.viacharacter.org/reports2026/total-24).

**Bestday implication:** showing a real question helps explain effort. Bestday should disclose its different gate clearly: the wheel and one reflection appear before name and email.

### B5. The Enneagram Institute

**Hero / credibility / preview:** the RHETI page is an explanation-led product page. It names its method, version, paired statements, duration and report contents. Its validation claims belong to the publisher. Public type descriptions are inspectable before purchase, although they are not a personalised report. [RHETI overview](https://www.enneagraminstitute.com/rheti/), [type library](https://www.enneagraminstitute.com/type-descriptions/).

**Flow / reveal / share / gate:** the purchase page states 144 questions, forty minutes, a price including the report and a single-use code. The overview describes a PDF with all nine results and fuller material for the leading three. Paid question screens, progress and social sharing were not inspected. [Purchase and access mechanics](https://tests.enneagraminstitute.com/orders/create).

**Bestday implication:** name the output and the commitment before the CTA. Avoid importing type labels or language that makes a self-reflection sound like a diagnosis.

### B6. Headspace

**Current landing / credibility / preview:** the opened homepage was promotion-led, with the familiar illustrated face, subscription terms, a needs selector and content-library examples. Science and teachers have dedicated links. That is not evidence that the same hero will run in every campaign. [Current homepage](https://www.headspace.com/).

**Documented onboarding / flow / reveal:** Headspace designer Vicki Tan describes a historical shipped flow: experience level, reason for meditating, a routine to anchor the habit, then a recap and first meditation. The payoff is an activity suited to the inputs, not a personality report. This is a creator's account of an earlier design, not a November 2026 live walkthrough. Exact current progress, sharing and onboarding gate placement remain unverified. [Designer account and screens](https://dribbble.com/shots/4931482-Headspace-Onboarding-Redesign).

**Bestday implication:** let the next useful action follow the answer. Its focus/time/first-action sequence can feel coherent without adding encouragement interstitials after every rating.

### B7. Calm

**Hero / credibility / preview:** the marketing-quiz URL opened as an empty application shell and the homepage returned 403, so their visual treatment and current steps are unverified. [Quiz entry](https://quiz.calm.com/), [homepage](https://www.calm.com/).

**Accessible assessment / flow / reveal / share / gate:** Calm's separate editorial Sleep Persona Quiz exposes eight questions, a question counter, Back controls and a final result button. The introduction promises a persona plus a downloadable booklet; a product preview appears later on the page. The exposed question content does not establish the eventual email requirement, result layout or share controls. Do not conflate this editorial quiz with the inaccessible onboarding funnel. [Opened Sleep Persona Quiz](https://www.calm.com/blog/sleep-persona-quiz).

**Bestday implication:** count the task and name the takeaway. The Audit needs no persona taxonomy; a wheel, reflection and chosen next action are already specific outputs.

### B8. Noom

**Current entry / credibility / preview:** indexed official content separates medication qualification from a psychology-based programme and says a quiz personalises the plan. The homepage opened as a JavaScript shell. This is a plan-selection funnel, not a neutral life reflection. [Official entry](https://www.noom.com/).

**Documented flow / reveal / share / gate:** Daphne Tideman's April 2026 walkthrough, updated in May, documents a variant with up to 113 screens over 10 to 15 minutes: personal questions, contextual explanations, progress, email before a timeline, further profile questions, loaders and a later paywall with urgency. It also documents the lack of clear everyday product UI. These are the author's observed paths, not a completion performed for this report or a universal Noom flow. Public sharing was not established. [Opened walkthrough with screenshots](https://www.revenuecat.com/blog/growth/web-to-app-onboarding-funnel).

**Bestday implication:** use explanatory context sparingly. Do not borrow duration ambiguity, false computation theatre or countdown pressure. The reviewed Bestday suggestions are pre-written and need no artificial analysis ritual.

### B9. Typeform showcase and example quizzes

**Hero / credibility / preview:** the personality-quiz template page advertises a preview and shows example screens before the builder signup action. Its claims about completion or sharing are vendor marketing, not Bestday benchmarks. [Template and preview](https://www.typeform.com/templates/personality-quiz-template).

**Flow / reveal / share / gate:** the public Match quiz guide documents answer-to-ending rules, picture/choice/rating inputs and final screens or redirects. Separate creation guidance exposes configurable social-share icons on endings. One-question pacing, branches, capture and length depend on each author; they are not a fixed Typeform funnel. The published community Easter example provides another playful result-matching use case, not validated self-knowledge. [Match quiz mechanics](https://help.typeform.com/hc/en-us/articles/36816470244756-Create-a-Match-quiz-with-Typeform), [ending/share configuration](https://help.typeform.com/hc/en-us/articles/42749720615060-Use-AI-to-create-a-personality-quiz-with-Typeform), [community example](https://community.typeform.com/typeform-guides-19/what-easter-treat-are-you-take-the-quiz-to-find-out-17915).

**Bestday implication:** reuse the clarity of a focused question, not default form styling or an outcome classifier. Brand-specific imagery and a visible payoff should carry the experience.

### B10. BuzzFeed-style outcomes

BuzzFeed exposes outcome-led headlines, bylines and comments. [Index](https://www.buzzfeed.com/quizzes). The cat example previews possible identities; interactive results were not exposed. [Example](https://www.buzzfeed.com/chelseamarshall/what-kind-of-cat-are-you).

**Evidence limit:** length/progress, final reveal, share controls and gate were not verified. **Proposal:** borrow the communicable result unit: one visual and one sentence a person understands outside the original page. Bestday's unit should be a chosen commitment with optional wheel inclusion, as required by the spec. Do not borrow arbitrary matching, an accuracy joke or an identity verdict. Typeform's documented custom endings provide a separately inspectable reference for implementing that kind of concise output. [Custom endings](https://help.typeform.com/hc/en-us/articles/36816470244756-Create-a-Match-quiz-with-Typeform).

### B11. Spotify Wrapped, used as a result format

**Entry / credibility / preview:** Spotify's 2025 announcement shows branded artwork, previews the stories and explains eligibility. Its separate methodology page explains why different stories use different metrics. This is a recap from accumulated activity, not a quiz landing page. [Experience and examples](https://newsroom.spotify.com/2025-12-03/2025-wrapped-user-experience/), [method explanation](https://newsroom.spotify.com/2025-12-05/wrapped-methodology-explained/).

**Flow / reveal / share / gate:** official documentation describes an app-based sequence of personalised stories with share cards, and sharing through Spotify Messages or external channels. The access condition is a qualifying account/listening history, rather than a newly submitted email for an assessment report. No personal Wrapped was opened here. Study the documented 2025 edition; do not assume a November 2026 visitor has a released 2026 edition. [Official access and sharing](https://newsroom.spotify.com/2025-12-03/2025-wrapped-user-experience/).

**Bestday implication:** reveal one meaningful piece at a time, allow direct access to the readable whole, and design an export that stands on its own. Never manufacture annual history or percentiles from eight self-ratings.

### B12. Strava Year in Sport

**Entry / credibility / preview:** distinguish the public aggregate Trend Report from the individual's recap. Strava's own press page states that subscribers receive a personalised December recap of progress and milestones. [Official description](https://press.strava.com/en-gb/articles/strava-mid-year-data-shows-how-athletes-are-tracking-toward-2025-goals).

**Documented flow / reveal / share / gate:** a January 2026 first-person account documents the 2025 mobile experience: a play entry, segmented story progress and save/shareable images or videos. The article's direct open returned 403; these details were available in indexed text. The precise current experience and entitlement were not personally tested. [Dated walkthrough](https://tantek.com/2026/002/t1/find-export-strava-year-in-sport).

**Bestday implication:** give the result a useful saved form and an obvious end. Avoid endless stories. Bestday's shared object must express a commitment without revealing all private ratings.

### B13. Apple Health summaries

**Entry / credibility / preview:** this is an in-app information hierarchy, not an acquisition funnel. Apple's official guide shows a Summary view, pinned data and Highlights with category detail. The result is accumulated source data rather than a generated identity. [Guide and screenshots](https://support.apple.com/en-us/104997).

**Flow / reveal / share / gate:** summaries lead into detail instead of forcing an all-at-once reveal. Sharing is a separate, person-specific setup: choose a contact, choose topics and review/change what is shared. The sharing guide's instructions were available in indexed text, while direct opening was rate-limited; the app itself was not opened here. This is setup, not an assessment email gate. [Official sharing controls](https://support.apple.com/guide/iphone/share-your-health-data-iph5ede58c3d/27/ios/27).

**Bestday implication:** an overview plus optional detail supports calm reading. More importantly, preview precisely what leaves the private result before the person invokes sharing. A wheel is not automatically a public identity card.

## Award and gallery research

Gallery inclusion, a design award, scientific credibility and conversion performance are different claims. Only the first two can be established from the following design sources.

| Reference | What is established | Landing, flow and result lesson | Limits |
| --- | --- | --- | --- |
| Adobe Creative Types, original edition | The Webby Awards identifies a 2020 winner and interviews its makers. They describe character design and answer-related video interstitials. [Award and creator interview](https://www.webbyawards.com/qa-how-adobe-helped-us-discover-our-creative-personality-types/). | The makers deliberately connected each character's form to its meaning. Interstitials responded to answers rather than decorating an unrelated loading screen. For Bestday, the figure should enact the area it represents. | This is a historical edition. The award does not validate a psychological model or establish conversion. Its exact progress, capture and sharing were not inspected here. |
| Adobe Creative Types, later edition | Adobe documents a new 2025 quiz and Firefly integration. The current indexed entry presents a short start proposition and a browsable type library; the opened app is an empty shell. [Adobe's 2025 account](https://blog.adobe.com/en/publish/2025/04/08/adobe-ted-team-up-again-reimagine-future-creativity), [entry](https://mycreativetype.com/), [type preview](https://mycreativetype.com/the-creative-types/). | Named creator ownership and inspectable outcomes can support a visually ambitious assessment. The value is a recognisable outcome, with further creation offered afterwards. | Do not combine the original interstitials, later result names and current access rules into a fictional single walkthrough. Question progress, result animation and gates remain unverified. |
| Google Your Plan, Your Planet | The live page names Google, the California Academy of Sciences and Ellen MacArthur Foundation, and exposes four topic entries, tips, pledges and a reminder link. A credited designer links its Awwwards recognition. [Live experience](https://yourplanyourplanet.sustainability.google/), [designer's award record](https://asmezquita.squarespace.com/), [Awwwards destination](https://www.awwwards.com/sites/your-plan-your-planet). | An explorable topic map can be the entrance; an action or pledge is the payoff. The landing also exposes sign-in to save progress. It is interactive education, not a psychometric assessment. | The Awwwards page timed out and a topic page failed. No verified full journey, time estimate, progress mechanism or share flow. Use the named-partner provenance, not borrowed logos. |
| Land-book: DeFi Safety Quiz | An opened listing credits Daybreak Studio and supplies a screenshot. [Specific listing](https://land-book.com/websites/84829-defi-safety-quiz). | A concrete quiz reference was found, rather than treating a whole inspiration gallery as one funnel. | The listing does not establish live controls, method, result preview, progress, reveal, sharing, gate or an award. Do not infer those from a thumbnail. |
| Godly | The requested domain redirected to recent.design during opening; the destination could not be read. [Requested gallery](https://godly.website/). | No assessment-specific design claim is made. | Search/open attempted. No verified qualifying example. |
| Siteinspire | The opened gallery exposes typographic, minimal and unusual-layout browsing categories. [Gallery](https://www.siteinspire.com/). | Useful as a future visual-reference source for the editorial exploration. | No assessment-specific funnel was verified. A gallery listing alone would not prove conversion. |

The strongest verified award-related reference is Adobe's creator interview. It supports purposeful character design without requiring Bestday to copy a long audiovisual experience. [Webby interview](https://www.webbyawards.com/qa-how-adobe-helped-us-discover-our-creative-personality-types/).

## Patterns to test, with their limits

These are proposed mechanisms for Bestday, not causal conclusions from the source sites.

| Pattern | Observable evidence | Bestday application and test |
| --- | --- | --- |
| Make the output concrete before asking for effort | Gallup exposes a real sample report at the purchase decision. [Report preview](https://www.gallup.com/cliftonstrengths/en/403127/cliftonstrengths-34-report.aspx). | Show a legible wheel, focus reflection and the shape of the next step. Ask a reviewer to explain what they expect to receive before pressing Start. |
| Show the actual interaction | Dream Coach Match exposes its first question and input instructions. [Live entry](https://dreamcoachmatch.com/wheel-of-life). | Offer one practice rating using the real UI, with the example clearly labelled. Test whether people distinguish practice from their personal answers. |
| Signal effort honestly | RHETI names both question count and duration before purchase. [Purchase page](https://tests.enneagraminstitute.com/orders/create). | Say three minutes consistently. Explain eight life areas; do not imply eight taps describe the entire context/focus/time/capture flow. Measure actual time to teaser. |
| Establish provenance through inspectable method | Mindtools has an author/reviewer and method; MBTIonline explains interpretation before results. [Mindtools](https://www.mindtools.com/ak6jd6w/the-wheel-of-life/), [MBTI process](https://www.mbtionline.com/how-it-works/overview). | Explain past four weeks, direct 0 to 10 ratings, optional skips and self-chosen focus. Attribute Bestday's authorship. Do not claim scientific validation. |
| Explain what happens after giving an email | VIA distinguishes free ranking from paid interpretation; registration is an explicit step. [Free/paid distinction](https://www.viacharacter.org/account/register). | Disclose the free wheel/reflection and name/email requirement for the full result near the start. Test whether the later gate feels expected. |
| Make privacy specific | Apple separates the recipient from the topics to share. [Sharing guide](https://support.apple.com/guide/iphone/share-your-health-data-iph5ede58c3d/27/ios/27). | Distinguish private ratings, email capture and optional sharing. Avoid an absolute promise that nothing is collected when analytics and capture exist. |
| Use honest social proof with provenance | 16Personalities attributes testimonials and discloses incentives. [Homepage](https://www.16personalities.com/). | Show genuine founder/editor authorship and a labelled sample now. Add real member quotations only with permission and a source. Never borrow another tool's usage count. |
| Connect the answer to a next action | Headspace's designer describes a needs-to-recap-to-practice sequence. [Creator account](https://dribbble.com/shots/4931482-Headspace-Onboarding-Redesign). | Make focus, available time, goal and first action visibly related. Each screen should do work rather than merely reassure. |
| Make the shared unit understandable alone | Spotify documents story-specific share cards. [Sharing and stories](https://newsroom.spotify.com/2025-12-03/2025-wrapped-user-experience/). | A first-person commitment card should make sense in a WhatsApp conversation without the report. Test comprehension with the originating page hidden. |

### Anti-patterns

| Anti-pattern | Evidence or contrast | Avoid in Bestday |
| --- | --- | --- |
| Treating an uneven wheel as a mechanical failure | Noomii's instructions use the smooth-wheel metaphor and recommend the lowest area. [Instructions](https://wheeloflife.noomii.com/). | Do not shame an uneven outline, optimise roundness or impose the lowest rating as the focus. |
| Filling personal ratings with defaults | Coachful exposes prefilled values. [Tool](https://www.coachful.co/tools/wheel-of-life). | Examples may be seeded, but a real unanswered area must stay unanswered. A skipped area must not become zero. |
| Calling generic reassurance personal analysis | The Noom walkthrough documents repeated explanations, loaders and selective responses. [Walkthrough](https://www.revenuecat.com/blog/growth/web-to-app-onboarding-funnel). | Use one brief purposeful transition. Do not imply AI, diagnosis or extensive computation for static reviewed copy. |
| Delaying the commercial relationship until after effort | Ascend discloses automatic community entry; Noom's documented variant has a later paywall. [Ascend](https://ascendcoaching.co.uk/life-audit/), [Noom walkthrough](https://www.revenuecat.com/blog/growth/web-to-app-onboarding-funnel). | Explain the gate early, obtain the specified consent and make optional channels visibly optional. |
| Inconsistent time or question promises | Johnny Lawrence's indexed and opened versions differ. [Landing](https://www.johnnylawrence.co.uk/free-life-audit). | One source of truth for three minutes, eight areas and what is free. |
| Default quiz-template identity machinery | Typeform documents matching answers to fixed endings. [Match quiz](https://help.typeform.com/hc/en-us/articles/36816470244756-Create-a-Match-quiz-with-Typeform). | Do not manufacture types, a total, a rank or a personality certificate from the wheel. |
| Decorative spectacle between every answer | Adobe's original interstitials were deliberately answer-related. [Creator interview](https://www.webbyawards.com/qa-how-adobe-helped-us-discover-our-creative-personality-types/). | Bestday gets one meaningful figure movement, not eight mandatory films or scroll effects that delay the task. |
| A screenshot pretending to be a working tool | The distinction between inspectable controls and sample imagery is explicit across the live category tools and report previews. [Dream Coach Match](https://dreamcoachmatch.com/wheel-of-life), [Gallup sample](https://www.gallup.com/cliftonstrengths/en/403127/cliftonstrengths-34-report.aspx). | Clearly label examples. If the hero invites a tap, it must respond as the real control would. |

**What looks templated is a design judgement:** the same centred slogan, tiny report mock-up, generic benefit cards, unsupported logo strip, numbered how-it-works row, testimonial carousel and final CTA, in that order. Replacing colours or illustrations does not create a new concept. The four proposals below change the visitor's first task, the order of evidence and the reason to start. The source examples demonstrate possible components, not proof that any one arrangement is inherently bad.

## Wheel interaction opportunities

All rows are proposals. The last column distinguishes possible v1 presentation work from product changes that would need a revised spec.

| Interaction | Proposed behaviour and reference | Boundaries and scope |
| --- | --- | --- |
| Radial rating | Select a slice, then tap its radius or drag the boundary to preview a value. Keep a visible number and the same 0 to 10 options. Category precedent exposes radial input. [Dream Coach Match](https://dreamcoachmatch.com/wheel-of-life). | Enhancement only. Pills remain the reliable answer path. A drag must not auto-advance through intermediate values; committing on release would need behaviour review and tests. Keep the demo simpler if that cannot be resolved. |
| Accessible alternative to radial drag | Provide tap targets and keyboard-operable controls with clear value meanings. W3C distinguishes non-drag pointer access from keyboard access and documents slider semantics. [Dragging](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html), [slider pattern](https://www.w3.org/WAI/ARIA/apg/patterns/slider/). | Required design constraint for any radial experiment. Eleven tiny targets across a phone are unsuitable; use a comfortable wrapped arrangement. The minimum-target criterion has explicit size/spacing rules. [Target size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html). |
| Build the wheel as answers arrive | After each committed answer, fill that slice from the centre. Keep untouched/skip states distinct from a genuine zero. Noomii documents a growing wheel. [Instructions](https://wheeloflife.noomii.com/). | Fits the existing v2 direction. Use the ring to show areas visited, while ordinary text explains progress through the wider audit. Do not hide Back. |
| Separate focus from satisfaction | Let a person choose any rated area. Move yellow emphasis to the selected figure without changing the underlying radius. | Directly required by the Bestday spec. A strong example should show a selected focus that is not the lowest rating, demonstrating agency rather than an algorithm's judgement. |
| Compare over time | Offer dated side-by-side wheels with the same area order and scale, plus a list of changes. loggd.life documents dated local history. [History description](https://loggd.life/tools/life-audit). | Future work: v1 has no agreed history store or recovery promise. No fabricated baseline, smooth progress story or forecast. Never advertise a return-comparison feature before it exists. |
| Your wheel versus what matters | Distinguish satisfaction from importance using a solid shape and a clearly labelled outline, plus a table. Mindtools compares current and ideal attention; 101 Planners offers current and desired ratings. [Attention overlay](https://www.mindtools.com/ak6jd6w/the-wheel-of-life/), [target overlay](https://www.101planners.com/wheel-of-life-assessment/). | Neither precedent measures exactly the proposed importance construct. Eight importance answers would add a new measure and extend the audit. Keep this as a labelled research prototype. V1 can express priority through the existing chosen focus without an extra scale or computed gap. |
| Animate the reveal | Briefly assemble the eight already answered slices, then emphasise the chosen figure once. Provide a static complete view and direct access to text. Spotify documents stories and an overall personalised experience. [Wrapped](https://newsroom.spotify.com/2025-12-03/2025-wrapped-user-experience/). | V1 presentation candidate. Preserve missing areas. Do not force timed playback, confetti, dramatic warnings or a fake calculation. Follow DESIGN-V2's reduced-motion end pose. |
| Share a commitment, selectively | Offer a square card, a portrait story card and copyable text, each previewing exactly what will be sent. Default to the commitment; include the wheel only after explicit selection. Apple demonstrates topic-specific control. [Sharing guide](https://support.apple.com/guide/iphone/share-your-health-data-iph5ede58c3d/27/ios/27). | Core privacy behaviour comes from the spec. Multiple export aspect ratios are an exploration, not a current feature claim. Personal ratings must not enter the referral URL. |

## Shared contract for all four concepts

These are constraints, not four more design ideas. Source: [SPEC](../SPEC.md), [VOICE](../VOICE.md), [DESIGN-V2](../DESIGN-V2.md).

- Retain black #0D0D0D, cream #FFFCEF, accent yellow #FFDE59, Urbanist 500/800 and the eight Bestday pictogram figures. On cream use a black CTA with yellow text; on black use a yellow CTA with black text. No yellow text on cream. Grey is only the specified supporting/unlit token, not a new accent family.
- At 390px the first viewport must communicate a belief, what someone gets, three minutes and the Start action. Scale imagery to the available height; do not depend on a 1440px composition shrinking intact. At 1440px create space with columns where useful. No horizontal overflow or mandatory horizontal carousel.
- Every primary start button says **Start your life audit**. Every path enters the existing context question, then Before you start, eight ratings, chosen focus and available time. Demo interactions never silently submit personal answers or skip agreed screens.
- Say **your wheel**, **ratings** and **focus**. No overall grade, average, percentile, diagnosis, prediction or invented testimonial. Ratings concern the past four weeks. Skipping remains possible and missing areas remain missing.
- Clearly disclose that the wheel, chosen focus and one reflection are visible before the gate. First name and email open goals, editing, time horizon, first action, the full write-up and share card. Preserve the agreed locked-tile count/grouping. No start-screen signup wall.
- Use the approved gate action **Show my full result**, followed by **We'll send you a copy too.** State what email follow-up includes, link privacy and provide the specified consent. Optional WhatsApp consent stays separate and off by default.
- Show only labelled fictional examples. Use existing reviewed reflections and suggestions from [audit.mjs](../../../life-audit/data/audit.mjs) unchanged. Example values are demonstration data, never a member's anonymous testimony or a typical result.
- After results, the person can choose a goal, a horizon and a first action, then **Start your circle** through Branch. Do not imply that their goal is already carried into app signup; that is explicitly out of scope in v1.

## Four landing page explorations

The screen lists describe successive landing sections, not additional mandatory audit questions. Each has one primary start action, repeated where useful. Optional inspection does not block starting.

| Concept | First task | Structural idea | What makes it distinct |
| --- | --- | --- | --- |
| 1. The working wheel | Try an actual rating control | Short product demonstration, then a compact explanation | The audit's own live UI is the hero; interaction provides the first proof. |
| 2. A note before the next month | Read a short letter | Editorial argument, concrete example in the middle, practical close | Typography and reasoning carry the page; the wheel illustrates the argument later. |
| 3. Open the result | Inspect a finished sample | Report preview first, annotated evidence, then how to make your own | The result is the page's organising object, rather than an illustration beside a pitch. |
| 4. Put one thing between you | Watch a commitment pass to a person | Human scene, private/public boundary, action, method appendix | A small circle is the destination from the first screen; sharing is shown as a deliberate human act. |

### 1. The working wheel

**Core idea:** let someone understand the audit by trying one of its real controls before reading about it.

**Hero:** a compact left-aligned belief, proposed as “Look at your whole life. Then choose one thing.” Below it, the real rating component for Work and direction sits beside/above its wheel of figures, with the actual prompt, 0 to 10 options and Skip. A persistent **Example. Your answers start after you begin.** label distinguishes the demo state. Subline: “See your wheel and choose one goal to share with your people. About three minutes.” The Start CTA stays visible without requiring a practice answer. At 390px show one usable control and a compact wheel; at 1440px the control and wheel form the main two-column composition.

**Page, screen by screen:**

1. **Try one rating.** The hero above. The demo is a single practice area, not a miniature eight-question audit. It uses the real component and renderer with isolated demonstration state.
2. **See what changed.** The same example wheel now has one affected slice, with a simple rating-to-radius explanation. Unanswered examples stay visibly missing. A text list makes the visual readable without colour or motion.
3. **Choose what matters next.** A fixed full example shows Relationships selected even though another area is lower. Show one existing reflection and a compact preview of the gated next steps, labelled as sample material.
4. **Know what you are starting.** A quiet method/privacy/FAQ section: eight areas, past four weeks, skips, chosen focus, free teaser and email for the full result. Repeat Start.

**Signature interaction:** a practice tap changes the matching slice and figure immediately. It does not advance to another practice question, classify the person or imply a saved answer.

**Credibility and sample:** the functioning control is the evidence, supported by transparent method and a labelled output. Inspiration: the exposed question at [Dream Coach Match](https://dreamcoachmatch.com/wheel-of-life). Do not reproduce its interpretive claims.

**Handoff:** Start closes demonstration state and opens the agreed context question. Announce the beginning of the real audit and preserve its normal Back/progress behaviour. Demo state must never reach capture or analytics as personal ratings.

**Risks:** practice can be mistaken for actual progress; 0 to 10 controls can crowd the phone; a wheel-only drag is difficult to discover and operate. Test the boundary between example and personal audit first. If there is insufficient first-screen space, shrink the wheel rather than the targets. This is a product-led workshop, with no manifesto band.

### 2. A note before the next month

**Core idea:** use a short editorial invitation to make choosing one area feel more useful than creating another complete life plan.

**Hero:** large left-aligned Urbanist type on cream: proposed headline **Make room for one thing.** A short opening paragraph names the person who carries plans and responsibilities, then gives them permission to choose where attention goes next. Proposed subline: “See your wheel, then choose one goal your people can follow with you. About three minutes.” Start sits immediately below. One small relationships figure supplies warmth; no chart dominates the first screen.

**Page, screen by screen:**

1. **The opening note.** A short byline, “Bestday”, identifies the actual author organisation without inventing an expert credential or founder quotation. CTA and time estimate are already present.
2. **The argument.** One readable article column explains why the whole view can help, while the next step can stay small. Use two short paragraphs and a single margin figure, not eight scroll-triggered lines.
3. **An example in the margin.** A labelled wheel and the unchanged Relationships reflection interrupt the article. A plain caption explains that focus is a choice. On mobile they sit between paragraphs; wide screens can place the wheel in a generous margin.
4. **The method note.** A compact explanation of direct ratings, skips and the past four weeks, followed by precisely what is free and what name/email opens. This is the equivalent of an honest editorial footnote, not a fake research citation.
5. **The practical close.** Explain the one-goal/first-action/circle outcome. Repeat Start, with a small FAQ below it for search visitors.

**Signature interaction:** the sample wheel supports tap-to-read labels in the article; the prose remains ordinary scrollable text. No scroll-jacking, disappearing paragraphs or required animation.

**Credibility and sample:** named authorship, inspectable method and a real sample reflection. Inspiration is the method-led structure of [Mindtools](https://www.mindtools.com/ak6jd6w/the-wheel-of-life/), without copying its photograph, categories or measures.

**Handoff:** Start enters the existing context question. The context question becomes a natural personal answer after a public editorial note, without adding a new free-text reflection.

**Risks:** too much prose could obscure the useful output or sound like coaching. Keep Start in the hero, make every paragraph specific, and test whether readers can explain the result. Use present organisational authorship only. This is one article with an example, not the archetype manifesto broken into smaller text.

### 3. Open the result

**Core idea:** put a readable finished example on the first screen so the visitor can judge whether the output deserves three minutes.

**Hero:** a report spread is the dominant object, labelled **Example result**. It shows a sample wheel with Relationships highlighted, one short excerpt of its reviewed reflection, and a clear indication that there is more below. A compact headline, proposed as **A clearer view. One next step.**, sits alongside it. Subline: “Make your wheel and choose one goal your people can follow with you. About three minutes.” Start remains the main action. At 390px show the wheel plus one readable excerpt, not a shrunken desktop report. At 1440px open it as a generous two-column spread.

**Page, screen by screen:**

1. **The sample, already open.** Start with value, not a report cover. Values are explicitly fictional. No visitor is asked to identify with this example.
2. **Read the wheel.** A small annotation explains how ratings become slices and how a skipped area stays missing. The sample focus is not the lowest area. Use normal scroll and optional labelled annotations.
3. **Read the next step.** Show the existing suggestion “Reconnect with one person each week” and its existing first action, unchanged, as a labelled full-result sample. A horizontal rule and plain caption distinguish free teaser content from the full-result material that requires name/email in the real audit.
4. **Know how yours is made.** A compact real sequence: rate eight areas, choose focus/time, see your wheel, then open the full result if wanted. Include method, privacy and gate terms.
5. **Make your own.** Repeat Start with a small FAQ. The sample report does not lead into a gallery of eight outcome identities.

**Signature interaction:** tap an annotation to connect a slice to its input and a focus to the resulting action. Opening annotations never changes a personal answer. On desktop the report can stay pinned beside its explanation; on mobile everything reads in a single column.

**Credibility and sample:** tangible output, unchanged reviewed copy, transparent rules. Inspiration: [Gallup's sample report beside its purchase action](https://www.gallup.com/cliftonstrengths/en/403127/cliftonstrengths-34-report.aspx). Bestday is showing a reflection, not borrowing Gallup's claims or authority.

**Handoff:** Start leaves the sample and opens the normal context question. Near Start, say which real content will be visible free and which requires name/email, so a public example of full-result content does not create a misleading access promise.

**Risks:** an extensive public sample could be mistaken for the visitor's own result or create the expectation that everything is ungated. Label it at entry and again beside gated examples. Keep excerpts legible and short. This concept is a report walkthrough, not a hero screenshot followed by generic feature cards.

### 4. Put one thing between you

**Core idea:** make the audit's purpose a specific commitment that can be witnessed by a few trusted people.

**Hero:** two Bestday figures face a small cream commitment card on black. One figure reaches towards it; the other is present, not supervising. Proposed headline: **Let your people in.** Subline: “See your wheel and choose one achievable goal. About three minutes.” A yellow pill with black text is the single main Start action. The scene is an illustration of a relationship, clearly not a real member testimonial or a simulated incoming message.

**Page, screen by screen:**

1. **The human destination.** The two-person scene and a simple caption explain that the audit helps someone choose what to give attention to. No names, avatars, fabricated chat or participation count.
2. **What stays with you.** A labelled sample wheel appears on a private-result panel. Its Relationships focus connects to an existing reviewed suggestion. Explain that the whole picture can remain private.
3. **What you choose to send.** A sample export preview switches between commitment-only and commitment-plus-wheel. It starts without the wheel. Keep a visible **Example share preview** label. This is a demonstration of the boundary, not a live share action or an early goal picker.
4. **What a next step looks like.** Show the reviewed first action and how the full result lets the person choose a day and horizon. The second figure makes one small in-character movement towards the commitment. There is no assumed response from a friend.
5. **How you get there.** Give the method, three-minute expectation, skip policy, teaser/email split and short FAQ. Repeat Start. The circle is a small set of chosen people, not automatic community membership.

**Signature interaction:** a transparent export preview makes the sharing choice tangible. The wheel never crosses into the sample share card until the visitor deliberately includes it. Reduced motion shows both figures in their settled pose.

**Credibility and sample:** demonstrate the product's privacy boundary and the concrete commitment rather than claiming social proof. Inspiration: recipient/topic choice in [Apple Health](https://support.apple.com/guide/iphone/share-your-health-data-iph5ede58c3d/27/ios/27). The relational meaning and figures come from Bestday's own voice and direction.

**Handoff:** Start enters the same context question and audit. No recipient contact details are requested on the landing page. Only after the approved result gate does actual sharing become available. The eventual friend link uses the area's greeting page, with no personal values in the URL.

**Risks:** this could appear to require public vulnerability or to prioritise app acquisition over reflection. Keep the private result visible before the export demonstration, show optional sharing plainly, and lead the final result with what is working. Do not claim the audit automatically creates a circle or preserves the goal through signup. This concept is a human handoff, not another sample-report-first page.

## What to compare in the explorations

Proposed evaluation, not research findings:

- Show each first screen at 390px and 1440px. Ask what the audit gives, how long it takes, what requires email and what will remain private.
- Test whether a sample interaction is mistaken for a personal answer and whether people can start without inspecting every landing section.
- Compare comprehension of the wheel, chosen focus and next action. Avoid selecting a winner on visual preference alone.
- If implemented later, compare landing-to-start and start-to-teaser completion, then gate-to-result and result-to-circle actions. Use existing analytics events with an approved variant identifier; never send ratings, names, email or goal text as event properties.
- Keep the core audit/gate constant while comparing landings. Do not accidentally test four different questionnaires or capture policies at once.
- Treat time comparisons, importance overlays and additional export ratios as separate product investigations. They are not promised by these v1 landings.

## References table

Access notes describe this research session, not a permanent judgement about the site. All URLs below were opened or attempted; indexed fallback is labelled. Findings and proposals cite the relevant page again where used.

| Ref | Page | Evidence available | Main use |
| --- | --- | --- | --- |
| R01 | [Noomii](https://wheeloflife.noomii.com/) | Opened | Entry, instructions, export promise |
| R02 | [Tony Robbins](https://www.tonyrobbins.com/quiz/wheel-of-life) | Opened landing | Problem-led entry |
| R03 | [Mindtools](https://www.mindtools.com/ak6jd6w/the-wheel-of-life/) | Opened | Editorial method and overlay |
| R04 | [101 Planners](https://www.101planners.com/wheel-of-life-assessment/) | Opened | Input modes, target overlay, PDF |
| R05 | [Dream Coach Match](https://dreamcoachmatch.com/wheel-of-life) | Opened | Exposed first question, radial input |
| R06 | [Coachful](https://www.coachful.co/tools/wheel-of-life) | Opened | Same-page sliders and portable summary |
| R07 | [Varch](https://varch.club/life-audit/) | Opened | Past/present/future structure |
| R08 | [loggd.life](https://loggd.life/tools/life-audit) | Opened | Summary, actions, dated history |
| R09 | [Ascend Life Audit](https://ascendcoaching.co.uk/life-audit/) | Opened | Editorial entry and subsequent enrolment |
| R10 | [Johnny Lawrence](https://www.johnnylawrence.co.uk/free-life-audit) | Opened and indexed versions differ | Named method, expectation consistency |
| R11 | [Ken Hellem](https://kenhellem.com/life-audit/) | Indexed; open failed | Chart/report preview candidate |
| R12 | [Suited Monk](https://www.suitedmonk.com/life-audit/) | Indexed; open failed | Authorship and named result model |
| R13 | [PrimeCoach landing](https://primecoach.uk/wheel-of-life-assessment/) | Opened | Coaching entry |
| R14 | [PrimeCoach linked resources](https://primecoach.uk/coaching-resources/) | Opened | Start destination check |
| R15 | [Wheeloflife.io](https://wheeloflife.io/) | Indexed; opened shell | Twelve-domain candidate |
| R16 | [Janette Possul](https://wheel.janettepossul.com/) | Indexed; opened shell | Satisfaction/motivation distinction |
| R17 | [Manifestream](https://manifestream.com/tools/wheel-of-life) | Indexed; open failed | Focus, local privacy and plan |
| R18 | [16Personalities home](https://www.16personalities.com/) | Opened | Hero, publisher proof and disclosure |
| R19 | [16Personalities test](https://www.16personalities.com/free-personality-test) | Opened shell | Interactive-access limit |
| R20 | [16Personalities example outcome](https://www.16personalities.com/infj-personality) | Opened | Public result preview |
| R21 | [16Personalities framework](https://www.16personalities.com/articles/our-theory) | Opened | Framework attribution |
| R22 | [MBTIonline home](https://www.mbtionline.com/) | Opened | Product-route hierarchy |
| R23 | [MBTIonline personal product](https://www.mbtionline.com/products/for-you) | Opened | Official provenance and purchase entry |
| R24 | [MBTIonline process](https://www.mbtionline.com/how-it-works/overview) | Opened official guide | Interpretation before result |
| R25 | [CliftonStrengths home](https://www.gallup.com/cliftonstrengths/en/home.aspx) | Opened | Proposition and proof claims |
| R26 | [CliftonStrengths report product](https://www.gallup.com/cliftonstrengths/en/403127/cliftonstrengths-34-report.aspx) | Opened | Sample beside purchase action |
| R27 | [CliftonStrengths process](https://www.gallup.com/cliftonstrengths/en/253676/how-cliftonstrengths-works.aspx) | Opened official guide | Response format and length |
| R28 | [CliftonStrengths sample PDF](https://www.gallup.com/file/cliftonstrengths/en/260807/CliftonStrengths_34_Report.pdf) | Opened PDF text | Actual report structure |
| R29 | [VIA home](https://www.viacharacter.org/) | Opened | Strength-led entry and proof |
| R30 | [VIA registration](https://www.viacharacter.org/account/register) | Opened | Account gate and sample question |
| R31 | [VIA Total 24 report](https://www.viacharacter.org/reports2026/total-24) | Opened | Free/paid distinction, preview, delivery |
| R32 | [RHETI overview](https://www.enneagraminstitute.com/rheti/) | Opened | Method, duration and report contents |
| R33 | [Enneagram type library](https://www.enneagraminstitute.com/type-descriptions/) | Opened | Browsable outcomes |
| R34 | [Enneagram purchase](https://tests.enneagraminstitute.com/orders/create) | Opened | Paid access and question count |
| R35 | [Headspace home](https://www.headspace.com/) | Opened | Current campaign entry |
| R36 | [Headspace designer's account](https://dribbble.com/shots/4931482-Headspace-Onboarding-Redesign) | Opened historical creator account | Purpose, anchor, recap, activity |
| R37 | [Calm home](https://www.calm.com/) | Open returned 403 | Access limit |
| R38 | [Calm onboarding quiz](https://quiz.calm.com/) | Indexed; opened shell | Access limit |
| R39 | [Calm Sleep Persona Quiz](https://www.calm.com/blog/sleep-persona-quiz) | Opened | Accessible separate editorial quiz |
| R40 | [Noom home](https://www.noom.com/) | Indexed; opened shell | Current plan/qualification entry |
| R41 | [Noom walkthrough](https://www.revenuecat.com/blog/growth/web-to-app-onboarding-funnel) | Opened dated third-party observation | Progress, interstitials, gates |
| R42 | [Typeform template](https://www.typeform.com/templates/personality-quiz-template) | Opened | Preview and one-question presentation |
| R43 | [Typeform Match quiz guide](https://help.typeform.com/hc/en-us/articles/36816470244756-Create-a-Match-quiz-with-Typeform) | Opened official guide | Inputs and custom endings |
| R44 | [Typeform ending/share settings](https://help.typeform.com/hc/en-us/articles/42749720615060-Use-AI-to-create-a-personality-quiz-with-Typeform) | Opened official guide | Sharing configuration |
| R45 | [Typeform Easter example](https://community.typeform.com/typeform-guides-19/what-easter-treat-are-you-take-the-quiz-to-find-out-17915) | Opened creator explanation | Playful outcome example |
| R46 | [BuzzFeed quiz index](https://www.buzzfeed.com/quizzes) | Opened | Entry conventions |
| R47 | [BuzzFeed cat example](https://www.buzzfeed.com/chelseamarshall/what-kind-of-cat-are-you) | Opened editorial content | Outcome preview |
| R48 | [Spotify Wrapped 2025 experience](https://newsroom.spotify.com/2025-12-03/2025-wrapped-user-experience/) | Opened official account | Stories, eligibility and share cards |
| R49 | [Spotify methodology](https://newsroom.spotify.com/2025-12-05/wrapped-methodology-explained/) | Opened official account | Explain the underlying measures |
| R50 | [Strava official recap description](https://press.strava.com/en-gb/articles/strava-mid-year-data-shows-how-athletes-are-tracking-toward-2025-goals) | Opened official account | Personal recap and subscribers |
| R51 | [Strava 2025 first-person walkthrough](https://tantek.com/2026/002/t1/find-export-strava-year-in-sport) | Indexed; open returned 403 | Segmented reveal and saved output |
| R52 | [Apple Health overview](https://support.apple.com/en-us/104997) | Opened official guide | Summary, pinned data, detail |
| R53 | [Apple Health sharing](https://support.apple.com/guide/iphone/share-your-health-data-iph5ede58c3d/27/ios/27) | Indexed official guide; open returned 429 | Person/topic-specific sharing |
| R54 | [Adobe / Webby creator interview](https://www.webbyawards.com/qa-how-adobe-helped-us-discover-our-creative-personality-types/) | Opened award body's creator interview | Original edition, characters, interstitials |
| R55 | [Adobe TED2025 account](https://blog.adobe.com/en/publish/2025/04/08/adobe-ted-team-up-again-reimagine-future-creativity) | Opened official account | Later edition and customisation |
| R56 | [Creative Types entry](https://mycreativetype.com/) | Indexed; opened shell | Start proposition |
| R57 | [Creative Types outcome library](https://mycreativetype.com/the-creative-types/) | Indexed; opened shell | Inspectable outcome candidate |
| R58 | [Your Plan, Your Planet](https://yourplanyourplanet.sustainability.google/) | Opened landing; topic failed | Topic map, partners, pledge |
| R59 | [Credited designer's awards](https://asmezquita.squarespace.com/) | Opened creator account | Awwwards provenance |
| R60 | [Awwwards project destination](https://www.awwwards.com/sites/your-plan-your-planet) | Open timed out | Award link, not inspected funnel |
| R61 | [Land-book DeFi Safety Quiz](https://land-book.com/websites/84829-defi-safety-quiz) | Opened listing | Credited gallery example |
| R62 | [Godly](https://godly.website/) | Redirect; destination inaccessible | Gallery access limit |
| R63 | [Siteinspire](https://www.siteinspire.com/) | Opened gallery | Editorial visual-reference browsing |
| R64 | [W3C dragging movements](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html) | Opened official guidance | Non-drag pointer alternative |
| R65 | [W3C slider pattern](https://www.w3.org/WAI/ARIA/apg/patterns/slider/) | Opened official guidance | Keyboard and value semantics |
| R66 | [W3C target size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) | Opened official guidance | Target size and spacing |

## Delivery and verification

Changed only this research document. No site behaviour, approved reflection, goal suggestion or test was edited. No commit, push or branch change.

Ran npm run build && npm test. The build passed with zero Astro diagnostics and 32 generated pages. Tests passed in 19 of 20 test files. tests/origin-rewrite.test.mjs failed with ERR_TEST_FAILURE, consistent with the repo's documented sandbox-sensitive child-process caveat; it was not modified. No new logic was introduced, so no new tests were added.

Unfinished evidence: verified country-specific page-one ranks, inaccessible paid/account/app states, several JavaScript-only interactions, and assessment-specific examples from Godly and Siteinspire. Those gaps are labelled rather than filled with assumptions. The four concepts are ready for visual exploration; they are proposals, not approved designs or shipped features.

## 15-line summary

1. Treat the sources as interface evidence, not proof of a conversion uplift.
2. US and UK country-specific page-one rankings still need verification.
3. Make the promised output legible before asking for effort.
4. Keep the three-minute promise consistent across every entry.
5. Explain the method through ratings, skips and personal choice.
6. Show the free teaser and disclose the full-result email gate early.
7. Use genuine authorship and labelled examples instead of invented proof.
8. Let the chosen focus differ from the lowest rating.
9. Keep radial input optional, with accessible tap and keyboard controls.
10. Reserve history comparisons and importance overlays for further research.
11. The working wheel opens with the audit's real live UI.
12. A note before the next month makes the case through editorial writing.
13. Open the result lets someone inspect a finished sample first.
14. Put one thing between you leads towards a deliberate human commitment.
15. Compare all four structures while keeping the audit and capture flow constant.
