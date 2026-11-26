const API_BASE = 'https://generativelanguage.googleapis.com/v1beta/models';
const DEFAULT_MODEL = 'gemini-3.5-flash-lite';
const REQUEST_TIMEOUT_MS = 30000;

export class GeminiRequestError extends Error {
  constructor(code, message) {
    super(message);
    this.name = 'GeminiRequestError';
    this.code = code;
  }
}

async function loadConfig() {
  let module;

  try {
    module = await import('../config.js');
  } catch {
    throw new GeminiRequestError('config', 'AI configuration is missing');
  }

  const config = module.config ?? module.default ?? module;

  if (!config || typeof config.apiKey !== 'string' || !config.apiKey.trim()) {
    throw new GeminiRequestError('config', 'AI configuration is missing an API key');
  }

  return {
    apiKey: config.apiKey.trim(),
    model:
      typeof config.model === 'string' && config.model.trim()
        ? config.model.trim()
        : DEFAULT_MODEL,
  };
}

function extractResultText(payload) {
  const parts = payload?.candidates?.[0]?.content?.parts;

  if (!Array.isArray(parts)) {
    throw new GeminiRequestError('invalid', 'AI response contained no candidate');
  }

  const text = parts
    .map((part) => (typeof part?.text === 'string' ? part.text : ''))
    .join('');

  if (!text.trim()) {
    throw new GeminiRequestError('invalid', 'AI response was empty');
  }

  return text;
}

export async function requestStructuredContent({
  prompt,
  schema,
  temperature = 0.2,
  maxOutputTokens = 800,
  signal,
}) {
  const { apiKey, model } = await loadConfig();
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  const abortFromExternal = () => controller.abort();

  if (signal) {
    if (signal.aborted) {
      controller.abort();
    } else {
      signal.addEventListener('abort', abortFromExternal, { once: true });
    }
  }

  try {
    const response = await fetch(
      `${API_BASE}/${encodeURIComponent(model)}:generateContent`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey,
        },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: {
            temperature,
            maxOutputTokens,
            responseMimeType: 'application/json',
            responseSchema: schema,
          },
        }),
        signal: controller.signal,
      },
    );

    if (!response.ok) {
      const code = response.status === 429 ? 'quota' : 'http';
      throw new GeminiRequestError(code, `AI request failed with status ${response.status}`);
    }

    let payload;

    try {
      payload = await response.json();
    } catch {
      throw new GeminiRequestError('invalid', 'AI response was not valid JSON');
    }

    return extractResultText(payload);
  } catch (error) {
    if (error instanceof GeminiRequestError) {
      throw error;
    }

    if (error?.name === 'AbortError') {
      throw new GeminiRequestError('timeout', 'AI request timed out');
    }

    throw new GeminiRequestError('network', 'AI request could not be completed');
  } finally {
    clearTimeout(timeoutId);

    if (signal) {
      signal.removeEventListener('abort', abortFromExternal);
    }
  }
}

export { API_BASE, DEFAULT_MODEL, REQUEST_TIMEOUT_MS };
