# Life Audit capture contract

The external quizCaptureWeb function must dispatch on `quiz: 'life_audit'` before archetype handling. These payloads never contain archetype or category. The existing archetype contract stays unchanged. Deploy backend support before enabling delivery.

```ts
type Capture = {
  quiz: 'life_audit'; stage: 'capture'; attemptId: string;
  firstName: string; email: string; whatsapp: string;
  whatsappConsent: boolean; consent: boolean;
  focusArea: string; segment: string; timeOption: string;
  ratings: Record<string, number | null>;
  source: Record<string, string | null>; quizVersion: string;
};
type Commitment = {
  quiz: 'life_audit'; stage: 'commitment'; attemptId: string; email: string;
  goal: string; goalEdited: boolean; horizon: 4 | 8 | 12;
  firstStep: string; day: string | null;
};
```

The stage discriminator versions the two-stage protocol; quizVersion identifies the build. attemptId is a random opaque UUID retained in session storage, never placed in URLs or analytics. Day is optional in meaning: accept null or an absent day and use this week phrasing. Current client uses Mon through Sun and sends null when unchosen. Ratings are integers 0 to 10 or null for skipped areas.

Stage 1 creates the contact, respecting separate email and WhatsApp consent. Wait for stage 2 before sending the result. If no stage 2 arrives within 30 minutes, send a fallback result with the wheel and the three suggestions for focusArea and timeOption from life-audit/data/audit.mjs. Do not invent a chosen goal or day.

Stage 2 upserts the latest commitment by attemptId. Accept duplicate deliveries idempotently and acknowledge only after durable processing. Subsequent edits update the commitment used by unsent notes; do not restart the email sequence or resend the immediate email. The browser debounces edits for 4 seconds, serialises requests, and skips unchanged successfully delivered payloads. Lifecycle beacons are best effort and may repeat because queue acceptance is not server acknowledgement. Support JSON POST and JSON Blob beacons, including CORS where deployed across origins.

The four previews and canonical copy source are life-audit/data/emails.mjs: result immediately after commitment, people on day 2, return on day 4, week on day 7. Use the first result email as the sequence anchor, including when the 30-minute fallback is used. Render without a day using this week wording. Sign off every email with Bestday followed by Do it. Together. Every email must have a working unsubscribe link before launch, and the service must honour unsubscribes for remaining notes. The existing /unsubscribe destination is a launch dependency to verify.

Ratings, goal text, first step, contact details and attemptId are personal data for email delivery only. Never forward them to analytics. Only capture_submit status ok or failed is tracked alongside the existing allowlisted non-personal context. A failed stage 1 still reveals the full result and offers a retry with the same attemptId. The client retains the contact in session storage for retry; it does not persist it in a URL.
