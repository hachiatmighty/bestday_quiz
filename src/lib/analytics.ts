import mixpanel from 'mixpanel-browser/src/loaders/loader-module-core';

export const eventNames = [
  'landing_view', 'quiz_start', 'intro_view', 'intro_start', 'question_answered', 'quiz_complete',
  'teaser_view', 'capture_submit', 'result_view', 'share_click',
  'card_download', 'referral_landing', 'signup_click',
] as const;

type EventName = (typeof eventNames)[number];
let analyticsEnabled = false;

const quizVersion = import.meta.env.PUBLIC_QUIZ_VERSION || 'dev';
const basePath = import.meta.env.BASE_URL.replace(/\/$/, '') || '/';

export function initAnalytics(token?: string) {
  analyticsEnabled = Boolean(token);
  if (!token) return;

  mixpanel.init(token, {
    api_host: 'https://api-eu.mixpanel.com',
    disable_persistence: true,
    batch_requests: false,
    ip: false,
    track_pageview: false,
    autocapture: false,
    record_sessions_percent: 0,
  });
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
  const payload = {
    ...trackingContext(),
    quiz_version: quizVersion,
    base_path: basePath,
    ...properties,
  };
  if (!analyticsEnabled) {
    console.info('[analytics:no-op]', name, payload);
    return;
  }

  mixpanel.track(name, payload);
}
