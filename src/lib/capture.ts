export type LifeAuditCapturePayload = {
 quiz: 'life_audit'; stage: 'capture'; attemptId: string; firstName: string; email: string;
 whatsapp: string; whatsappConsent: boolean; consent: boolean; focusArea: string;
 segment: string; timeOption: string; ratings: Record<string, number | null>;
 source: Record<string, string | null>; quizVersion: string;
};
export type LifeAuditCommitmentPayload = {
 quiz: 'life_audit'; stage: 'commitment'; attemptId: string; email: string;
 goal: string; goalEdited: boolean; horizon: number; firstStep: string; day: string | null;
};
export type CapturePayload = {
  firstName: string;
  email: string;
  whatsapp: string;
  whatsappConsent: boolean;
  consent: boolean;
  archetype: string;
  category: string;
  source: Record<string, string | null>;
};

export async function submitCapture(payload: CapturePayload | LifeAuditCapturePayload | LifeAuditCommitmentPayload, endpoint?: string) {
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
