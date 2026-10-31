const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000').replace(/\/$/, '');

const TIMEOUT_MS = 20_000;

const FALLBACK_ERROR = 'Something went wrong while sending your message. Please try again.';

/** Posts a public form to Laravel and normalizes the outcomes the UI cares about. */
export async function submitForm(path, payload) {
  let response;

  try {
    response = await fetch(`${API_URL}/api/v1${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
  } catch {
    return { ok: false, message: 'We could not reach the server. Please check your connection and try again.' };
  }

  const body = await response.json().catch(() => ({}));

  if (response.ok) {
    return { ok: true, message: body.message };
  }

  if (response.status === 422) {
    return { ok: false, fieldErrors: body.errors ?? {}, message: 'Please check the highlighted fields.' };
  }

  if (response.status === 429) {
    return { ok: false, message: 'You have sent several requests in a short time. Please wait a minute and try again.' };
  }

  return { ok: false, message: FALLBACK_ERROR };
}
