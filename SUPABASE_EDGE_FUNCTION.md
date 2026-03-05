# Supabase Edge Function — hyper-processor

**Multi-type AI handler** that routes all AI requests through a single edge function.

Dashboard: https://supabase.com/dashboard/project/coihujjfdhpqfwmibfbi/functions/hyper-processor/code
Local source of truth: `supabase/functions/hyper-processor/index.ts`

## Edge Function Code

```typescript
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

/**
 * Call Claude API with a system prompt and user message.
 */
async function callClaude(
  apiKey: string,
  system: string,
  userMessage: string,
  maxTokens = 1024
): Promise<string> {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: maxTokens,
      system,
      messages: [{ role: 'user', content: userMessage }],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Claude API error:', errorText);
    throw new Error(`Claude API error: ${response.status}`);
  }

  const data = await response.json();
  return data.content[0]?.text ?? '';
}

/**
 * Handle dream interpretation (legacy format: { dream: "..." })
 */
async function handleDream(apiKey: string, dream: string): Promise<Response> {
  const system = `You are a wise dream interpreter who draws from multiple spiritual traditions including Jungian psychology, Eastern philosophy (Vedanta, Tantra, Taoism), and mystical wisdom.`;
  const userMessage = `Interpret the following dream from a non-dual, psychologically grounded, and mystical perspective. Your interpretation should:

1. Start with a brief overview of the dream's core message
2. Explore the psychological significance (what aspects of the psyche are speaking)
3. Offer a spiritual perspective (how this relates to consciousness, awareness, or inner wisdom)
4. Conclude with a gentle practice or reflection for the dreamer

Keep the tone warm, insightful, and non-dogmatic. Avoid fortune-telling or overly literal interpretations. Write 3-4 paragraphs.

Dream: "${dream}"`;

  const interpretation = await callClaude(apiKey, system, userMessage);
  return new Response(
    JSON.stringify({ interpretation }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

/**
 * Handle spiritual guide chat
 */
async function handleSpiritualGuide(
  apiKey: string,
  system: string,
  message: string
): Promise<Response> {
  const response = await callClaude(apiKey, system, message, 1024);
  return new Response(
    JSON.stringify({ response }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

/**
 * Handle text explanation
 */
async function handleExplain(
  apiKey: string,
  prompt: string,
  text: string,
  source: string
): Promise<Response> {
  const system = 'You are a wise spiritual teacher explaining sacred texts.';
  const response = await callClaude(apiKey, system, prompt, 1024);
  return new Response(
    JSON.stringify({ response }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

/**
 * Handle voice journal reflection
 */
async function handleVoiceReflection(
  apiKey: string,
  system: string,
  message: string
): Promise<Response> {
  const response = await callClaude(apiKey, system, message, 1024);

  // Try to parse structured reflection from the response
  try {
    const parsed = JSON.parse(response);
    return new Response(
      JSON.stringify({ reflection: parsed }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch {
    // Return as plain text response
    return new Response(
      JSON.stringify({ response }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}

// ---------- Main handler ----------

Deno.serve(async (req: Request) => {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const claudeApiKey = Deno.env.get('CLAUDE_API_KEY');

    if (!claudeApiKey) {
      return new Response(
        JSON.stringify({ error: 'CLAUDE_API_KEY not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Health check — used by the client to verify the function is reachable
    if (body.type === 'health-check') {
      return new Response(
        JSON.stringify({ status: 'ok' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Route by type
    const { type, system, message, dream, text, source, prompt } = body;

    // Legacy dream format (no type field, just { dream: "..." })
    if (dream && !type) {
      return await handleDream(claudeApiKey, dream);
    }

    switch (type) {
      case 'spiritual-guide':
        if (!message) throw new Error('message is required');
        return await handleSpiritualGuide(claudeApiKey, system || '', message);

      case 'dream-interpretation':
        return await handleDream(claudeApiKey, dream || message || '');

      case 'explain':
        if (!prompt && !text) throw new Error('prompt or text is required');
        return await handleExplain(claudeApiKey, prompt || '', text || '', source || '');

      case 'voice-reflection':
        if (!message) throw new Error('message is required');
        return await handleVoiceReflection(claudeApiKey, system || '', message);

      default:
        // If a system + message is provided without a type, treat as generic chat
        if (system && message) {
          return await handleSpiritualGuide(claudeApiKey, system, message);
        }
        return new Response(
          JSON.stringify({ error: `Unknown request type: ${type || '(none)'}` }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
```

## Setup Steps

1. **Add the CLAUDE_API_KEY secret:**
   - Go to: https://supabase.com/dashboard/project/coihujjfdhpqfwmibfbi/settings/functions
   - Or: Edge Functions > Secrets
   - Name: `CLAUDE_API_KEY`
   - Value: Your Anthropic API key (starts with `sk-ant-...`)

2. **Deploy the function code (recommended via CLI):**
   ```bash
   npx supabase login
   npx supabase link --project-ref coihujjfdhpqfwmibfbi
   npx supabase functions deploy hyper-processor
   ```
   Dashboard code editor can still be used for quick hotfixes, but keep `supabase/functions/hyper-processor/index.ts` in sync.

3. **Test each request type:**

   **Health check:**
   ```json
   { "type": "health-check" }
   ```
   Expected: `{ "status": "ok" }`

   **Spiritual Guide:**
   ```json
   {
     "type": "spiritual-guide",
     "system": "You are a wise spiritual guide.",
     "message": "How can I find inner peace?"
   }
   ```
   Expected: `{ "response": "..." }`

   **Dream Interpretation:**
   ```json
   {
     "dream": "I was flying over a vast ocean at sunset."
   }
   ```
   Expected: `{ "interpretation": "..." }`

   **Text Explanation:**
   ```json
   {
     "type": "explain",
     "text": "Be still and know that I am God.",
     "source": "Psalm 46:10",
     "prompt": "Explain this passage from Psalm 46:10..."
   }
   ```
   Expected: `{ "response": "..." }`

## Request Types Summary

| Type | Required Fields | Response Field |
|------|----------------|----------------|
| `health-check` | none | `status` |
| `spiritual-guide` | `message`, `system` | `response` |
| `dream-interpretation` | `dream` or `message` | `interpretation` |
| `explain` | `prompt` or `text` | `response` |
| `voice-reflection` | `message`, `system` | `reflection` or `response` |
| _(legacy)_ | `dream` (no type) | `interpretation` |

## Troubleshooting

- **500 error**: Check that `CLAUDE_API_KEY` is set correctly in Edge Function Secrets
- **AI unavailable in app**: Deploy this updated function — the old version only handled dream requests
- **CORS errors**: The function includes wildcard CORS headers; if issues persist, check Supabase project settings
- **Check logs**: Go to Edge Functions > Logs to see detailed error messages
- **Verify deployment**: The function should show a green status indicator after deploying
