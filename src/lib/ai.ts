/**
 * AI helpers for automating enquiry processing.
 *
 * Every booking request — in any of the 7 supported languages — is passed
 * through `translateToRussian` so the operations team always reads a single,
 * consistent Russian version. When `ANTHROPIC_API_KEY` is configured the call
 * uses the Claude API; otherwise it degrades gracefully and returns the
 * original text so the booking pipeline never breaks.
 */

export type TranslationResult = {
  russian: string;
  detectedLanguage?: string;
  provider: 'anthropic' | 'none';
};

const ANTHROPIC_MODEL = process.env.ANTHROPIC_MODEL ?? 'claude-opus-4-8';

export async function translateToRussian(text: string, sourceLocale?: string): Promise<TranslationResult> {
  const trimmed = (text ?? '').trim();
  if (!trimmed) {
    return { russian: '', provider: 'none' };
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    // No model configured — keep the original so a human can read it.
    return { russian: trimmed, detectedLanguage: sourceLocale, provider: 'none' };
  }

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: ANTHROPIC_MODEL,
        max_tokens: 1024,
        system:
          'You are a translation engine for a Kazakhstan jeep-tour operator. Translate the user message into natural Russian. Reply with ONLY the Russian translation, no preamble.',
        messages: [{ role: 'user', content: trimmed }]
      })
    });

    if (res.ok) {
      const data = (await res.json()) as { content?: Array<{ text?: string }> };
      const russian = data.content?.map((c) => c.text ?? '').join('').trim();
      if (russian) {
        return { russian, detectedLanguage: sourceLocale, provider: 'anthropic' };
      }
    }
  } catch {
    // fall through
  }

  return { russian: trimmed, detectedLanguage: sourceLocale, provider: 'none' };
}
