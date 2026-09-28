export const eventNames = [
  'landing_view', 'quiz_start', 'question_answered', 'quiz_complete',
  'teaser_view', 'capture_submit', 'result_view', 'share_click',
  'card_download', 'referral_landing', 'signup_click',
] as const;

type EventName = (typeof eventNames)[number];
let projectToken = '';
let distinctId = '';

export function initAnalytics(token?: string) {
  projectToken = token ?? '';
  distinctId = localStorage.getItem('bestday:quiz-id') ?? crypto.randomUUID();
  localStorage.setItem('bestday:quiz-id', distinctId);
}

export function trackingContext() {
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get('utm_source'),
    utm_medium: params.get('utm_medium'),
    utm_campaign: params.get('utm_campaign'),
    utm_content: params.get('utm_content'),
    utm_term: params.get('utm_term'),
    ref: params.get('ref'),
  };
}

export function track(name: EventName, properties: Record<string, unknown> = {}) {
  const payload = { ...trackingContext(), ...properties };
  if (!projectToken) {
    console.info('[analytics:no-op]', name, payload);
    return;
  }

  void fetch('https://api-js.mixpanel.com/track?ip=1', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify([{
      event: name,
      properties: {
        token: projectToken,
        distinct_id: distinctId,
        time: Math.floor(Date.now() / 1000),
        ...payload,
      },
    }]),
    keepalive: true,
  }).catch(error => console.warn('[analytics:error]', error));
}
