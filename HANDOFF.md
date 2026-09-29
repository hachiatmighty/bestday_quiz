# Bestday quiz static handoff

This package is a static build of the Bestday goal-archetype quiz for the existing `kayakinwunmi/bestday-ai-landing-page` Vite project. It does not need its own Vercel project.

## Install

1. Download the `bestday-quiz-<shortsha>.zip` asset from the matching GitHub Release.
2. In the landing-page repository, delete the existing `public/quiz/` folder if one exists.
3. Create `public/quiz/` and unzip the archive directly into it. The result must contain `public/quiz/index.html`, `public/quiz/r/`, and `public/quiz/assets/`—not another nested `bestday-quiz-*` or `quiz` folder.
4. Insert the following entries at the top of the existing `rewrites` array in `vercel.json`, before the SPA catch-all. Do not replace the file or remove the catch-all.

```json
{ "source": "/quiz", "destination": "/quiz/index.html" },
{ "source": "/quiz/", "destination": "/quiz/index.html" },
{ "source": "/quiz/r/:slug", "destination": "/quiz/r/:slug/index.html" },
{ "source": "/quiz/r/:slug/", "destination": "/quiz/r/:slug/index.html" },
```

The quiz has no other clean-URL routes. Files under `/quiz/assets/` are served directly. The handoff archive intentionally excludes the internal `/email` previews and `/assets/review/` images.

## Verify after deployment

```sh
curl -sI https://bestday.ai/quiz/
```

Pass: status is `200` and `content-type` includes `text/html`.

```sh
curl -s https://bestday.ai/quiz/r/anchor | grep 'bestday.ai/quiz/assets/og/anchor.png'
```

Pass: the command prints the Anchor page's OG image tag. This proves the landing-page SPA did not swallow the route.

```sh
curl -sI https://bestday.ai/quiz/assets/og/anchor.png
```

Pass: status is `200` and `content-type` is `image/png`.

```sh
curl -sI https://bestday.ai/quiz/email
```

Pass: it must not serve a quiz email-preview page. A landing-page response or `404` is acceptable; quiz email content is not.

The handoff ships with `<meta name="robots" content="noindex">`. Keep it in place for review. For launch, rebuild with `PUBLIC_QUIZ_NOINDEX=false` before replacing the folder.

## Current build

- The quiz has one category question followed by a 20-statement scale (21 question screens total).
- Changelog: 20-statement scale, new landing page, new character art on all result surfaces.

## Not wired yet

- There is no Mixpanel token. Analytics calls are a no-op.
- There is no capture endpoint or Firestore integration. The capture form stores submissions in the visitor's browser only.
- No result or follow-up emails are collected server-side or sent.
- `PUBLIC_MIXPANEL_TOKEN`, `PUBLIC_CAPTURE_ENDPOINT`, and `PUBLIC_QUIZ_NOINDEX` are baked into the static files at build time. Adding or changing them requires a rebuild and a fresh drop-in.

## Update later

From this repository, check out the desired commit, set any required `PUBLIC_*` environment variables, and run:

```sh
npm ci
npm run build:handoff
```

Replace the landing repository's entire `public/quiz/` folder with the contents of the new archive. Do not merge old and new files.

## Rollback

Delete `public/quiz/` and remove only the four `/quiz` rewrite entries added above. Leave the landing-page SPA catch-all unchanged.

## Local verification boundary

The package is tested by unzipping it into a scratch Vite SPA, running `vite build` and `vite preview`, and loading `/quiz/`, `/quiz/r/anchor/`, and quiz assets. Vite preview does not read `vercel.json`, so the clean-URL rewrite entries are verified from Vercel's rewrite behavior and their explicit file destinations, not exercised by the local preview server.
