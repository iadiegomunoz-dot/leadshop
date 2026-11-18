export interface LeadPayload {
  name?: string;
  company?: string;
  contact: string;
  targetDesc?: string;
  query?: string;
  country?: string;
  source: 'contact' | 'order';
  plan?: string;
  lang: string;
  termsAccepted?: boolean;
  website?: string; // honeypot
}

const ENDPOINT = import.meta.env.VITE_API_URL || '/api/leads';

/** Stores a lead via the /api/leads serverless function. Never throws. */
export async function submitLead(payload: LeadPayload): Promise<boolean> {
  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch {
    return false;
  }
}
