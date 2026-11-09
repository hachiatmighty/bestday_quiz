# Bestday quiz funnel

Review build for the Bestday goal archetype quiz.

## Commands

```sh
npm install
npm run dev
npm test
npm run build
```

Mixpanel stays disabled when `PUBLIC_MIXPANEL_TOKEN` is empty. Capture submissions stay in the browser console and local storage when `PUBLIC_CAPTURE_ENDPOINT` is empty.

Production deployment is intentionally out of scope until Hachi approves it.

`QUIZ_BASE_PATH` defaults to `/quiz` and controls the deployment path, public share URLs, and rendered card footer.
The quiz project's `vercel.json` maps that public path back to the static build root so standalone Vercel previews work at `/quiz/`.

## Life Audit foundations

The independent static output is `dist-life-audit/`, served at `/life-audit/`.
Shared logic and analytics live in `src/lib/`. The page is a placeholder, not a finished flow.

```sh
npm run dev:life-audit
LIFE_AUDIT_ALLOW_NO_TOKEN=1 npm run build:life-audit
npm run build
npm test
```

`LIFE_AUDIT_ALLOW_NO_TOKEN=1` is for local review builds only. Production builds require
`PUBLIC_MIXPANEL_TOKEN` for the existing Bestday Quiz project. The Life Audit defaults to
`noindex`; set `PUBLIC_LIFE_AUDIT_NOINDEX=false` to allow indexing.
The build lists `LIFE_AUDIT_WEB` and `LIFE_AUDIT_EMAIL` from `life-audit/data/links.mjs`.
Both are TODO null placeholders pending dedicated Branch links and desktop fallbacks.

Ratings use integers 0 through 10; `null` means skipped and absent keys mean unanswered.
The state index runs context (0), intro (1), areas (2–9), focus (10), time (11), then teaser (12).
Back preserves answers. Missing wheel sectors have `path: null` and a full `sectorPath`
for a distinct outline or hatch; a zero rating has radius 0 and is not missing.
Life Audit events must use `trackLifeAudit`, which only permits defined metadata keys
and controlled values. Attribution accepts short campaign slugs, not arbitrary URL text.
