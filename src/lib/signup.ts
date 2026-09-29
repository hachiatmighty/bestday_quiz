export function signupDestination(userAgent: string) {
  if (/Android/i.test(userAgent)) return { platform: 'android', url: 'https://play.google.com/store/apps/details?id=com.getbestday.ai' };
  if (/iPhone|iPad|iPod/i.test(userAgent)) return { platform: 'ios', url: 'https://apps.apple.com/app/id6463491722' };
  return { platform: 'desktop', url: 'https://bestday.ai' };
}
