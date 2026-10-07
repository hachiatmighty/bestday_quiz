// Branch links: each opens the right app store on a phone, and Branch's fallback elsewhere.
export const appLinks = {
  web: 'https://getbestdayapp.app.link/quizw', // buttons on the quiz pages
  email: 'https://getbestdayapp.app.link/quize', // the quiz emails, through /quiz/start
} as const;

export function platformOf(userAgent: string) {
  if (/Android/i.test(userAgent)) return 'android';
  if (/iPhone|iPad|iPod/i.test(userAgent)) return 'ios';
  return 'desktop';
}

export function signupDestination(userAgent: string, channel: keyof typeof appLinks) {
  return { platform: platformOf(userAgent), url: appLinks[channel] };
}
