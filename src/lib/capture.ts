export type CapturePayload = {
  firstName: string;
  email: string;
  whatsapp: string;
  whatsappConsent: boolean;
  consent: boolean;
  quiz?: 'life_audit';
  focusArea?: string;
  segment?: string;
  timeOption?: string;
  horizon?: number;
  ratings?: Record<string, number | null>;
  archetype: string;
  category: string;
  source: Record<string, string | null>;
};

export async function submitCapture(payload: CapturePayload, endpoint?: string) {
  if (endpoint) {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error('Capture failed');
    return;
  }

  const existing = JSON.parse(localStorage.getItem('bestday:quiz-captures') ?? '[]');
  localStorage.setItem('bestday:quiz-captures', JSON.stringify([...existing, payload]));
  console.info('[capture:local-stub]', payload);
}
