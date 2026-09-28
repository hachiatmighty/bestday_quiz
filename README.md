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
