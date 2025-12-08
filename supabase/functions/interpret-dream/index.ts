// Supabase Edge Function for AI Dream Interpretation
// Uses Claude API to analyze dreams through a spiritual/psychological lens

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface DreamRequest {
  dreamContent: string;
  mood?: string;
}

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const ANTHROPIC_API_KEY = Deno.env.get('ANTHROPIC_API_KEY');
    
    if (!ANTHROPIC_API_KEY) {
      throw new Error('ANTHROPIC_API_KEY not configured');
    }

    const { dreamContent, mood } = (await req.json()) as DreamRequest;

    if (!dreamContent) {
      return new Response(
        JSON.stringify({ error: 'dreamContent is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Craft the prompt for Claude
    const systemPrompt = `You are a dream interpreter who combines Jungian psychological insight with non-dual spiritual wisdom from traditions like Kashmir Shaivism, Taoism, the Upanishads, and the Yoga Sutras.

Your interpretations should be:
- Psychologically grounded but spiritually aware
- Warm and supportive, never alarming
- Focused on growth and self-understanding
- Connected to the user's inner wisdom tradition
- Practical, offering actionable insight

You speak in a calm, contemplative voice—like a wise friend who understands both the depths of the psyche and the heights of spiritual realization.`;

    const userPrompt = `Please interpret this dream${mood ? ` (the dreamer felt ${mood} during/after the dream)` : ''}:

"${dreamContent}"

Provide your response in this exact JSON format:
{
  "summary": "A 2-3 sentence overview of the dream's core meaning",
  "symbols": [
    {"symbol": "symbol name", "meaning": "what this symbol represents"},
    {"symbol": "another symbol", "meaning": "its meaning"}
  ],
  "psychologicalInsight": "What this dream reveals about the dreamer's inner state, patterns, or growth edges",
  "spiritualConnection": "How this dream connects to contemplative wisdom—draw from Vijnana Bhairava, Tao Te Ching, Upanishads, Yoga Sutras, or similar traditions",
  "actionSuggestion": "One practical suggestion for working with this dream's message"
}

Return ONLY valid JSON, no markdown or additional text.`;

    // Call Claude API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: userPrompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Claude API error:', errorText);
      throw new Error(`Claude API error: ${response.status}`);
    }

    const claudeResponse = await response.json();
    const content = claudeResponse.content[0]?.text;

    if (!content) {
      throw new Error('No content in Claude response');
    }

    // Parse the JSON response from Claude
    let interpretation;
    try {
      interpretation = JSON.parse(content);
    } catch {
      // If Claude didn't return valid JSON, wrap the response
      interpretation = {
        summary: content,
        symbols: [],
        psychologicalInsight: 'Unable to parse structured interpretation.',
        spiritualConnection: '',
        actionSuggestion: '',
      };
    }

    return new Response(
      JSON.stringify(interpretation),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});



