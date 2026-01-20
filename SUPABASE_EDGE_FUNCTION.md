# Supabase Edge Function Code

Copy this code into your Edge Function at:
https://supabase.com/dashboard/project/coihujjfdhpqfwmibfbi/functions/hyper-processor/code

## Edge Function Code

```typescript
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { dream } = await req.json();
    const claudeApiKey = Deno.env.get('CLAUDE_API_KEY');

    if (!claudeApiKey) {
      throw new Error('CLAUDE_API_KEY not configured');
    }

    if (!dream) {
      throw new Error('No dream content provided');
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': claudeApiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: 1024,
        messages: [
          {
            role: 'user',
            content: `You are a wise dream interpreter who draws from multiple spiritual traditions including Jungian psychology, Eastern philosophy (Vedanta, Tantra, Taoism), and mystical wisdom.

Interpret the following dream from a non-dual, psychologically grounded, and mystical perspective. Your interpretation should:

1. Start with a brief overview of the dream's core message
2. Explore the psychological significance (what aspects of the psyche are speaking)
3. Offer a spiritual perspective (how this relates to consciousness, awareness, or inner wisdom)
4. Conclude with a gentle practice or reflection for the dreamer

Keep the tone warm, insightful, and non-dogmatic. Avoid fortune-telling or overly literal interpretations. Write 3-4 paragraphs.

Dream: "${dream}"`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Claude API error:', errorData);
      throw new Error(`Claude API error: ${response.status}`);
    }

    const data = await response.json();
    const interpretation = data.content[0].text;

    return new Response(JSON.stringify({ interpretation }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
```

## Setup Steps

1. **Add the CLAUDE_API_KEY secret:**
   - Go to: Edge Functions > Secrets
   - Name: `CLAUDE_API_KEY`
   - Value: Your Claude API key

2. **Update the function code:**
   - Go to the Code tab of your function
   - Select all (Ctrl+A) and replace with the code above
   - Click "Deploy updates"

3. **Test the function:**
   - Click the "Test" button
   - Use this test payload:
   ```json
   {
     "dream": "I was flying over a vast ocean at sunset. The water was calm and reflected golden light."
   }
   ```

## Troubleshooting

- If you get a 500 error, check that CLAUDE_API_KEY is set correctly
- Check the function logs for detailed error messages
- Make sure the function is deployed (green status indicator)




