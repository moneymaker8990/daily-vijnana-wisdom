import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const allowedOrigin = Deno.env.get("ALLOWED_ORIGIN") ?? "*";

const corsHeaders = {
  "Access-Control-Allow-Origin": allowedOrigin,
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const MAX_MESSAGE_CHARS = 12000;

function sanitizeInput(value: unknown, fieldName: string): string {
  if (typeof value !== "string") {
    throw new Error(`${fieldName} must be a string`);
  }

  const trimmed = value.trim();
  if (!trimmed) {
    throw new Error(`${fieldName} is required`);
  }

  if (trimmed.length > MAX_MESSAGE_CHARS) {
    throw new Error(`${fieldName} must be <= ${MAX_MESSAGE_CHARS} characters`);
  }

  return trimmed;
}

async function callClaude(
  apiKey: string,
  system: string,
  userMessage: string,
  maxTokens = 1024
): Promise<string> {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: maxTokens,
      system,
      messages: [{ role: "user", content: userMessage }],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Claude API error:", errorText);
    throw new Error(`Claude API error: ${response.status}`);
  }

  const data = await response.json();
  return data.content?.[0]?.text ?? "";
}

async function handleDream(apiKey: string, dream: string): Promise<Response> {
  const system = "You are a wise dream interpreter who draws from multiple spiritual traditions including Jungian psychology, Eastern philosophy (Vedanta, Tantra, Taoism), and mystical wisdom.";
  const userMessage = `Interpret the following dream from a non-dual, psychologically grounded, and mystical perspective.

Start with a brief overview of the dream's core message, then explore:
1. The psychological significance
2. A spiritual perspective
3. One gentle practice or reflection

Keep the tone warm, insightful, and non-dogmatic. Avoid fortune-telling.

Dream: "${dream}"`;

  const interpretation = await callClaude(apiKey, system, userMessage);
  return new Response(JSON.stringify({ interpretation }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

async function handleSpiritualGuide(
  apiKey: string,
  system: string,
  message: string
): Promise<Response> {
  const response = await callClaude(apiKey, system, message, 1024);
  return new Response(JSON.stringify({ response }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

async function handleExplain(
  apiKey: string,
  prompt: string
): Promise<Response> {
  const system = "You are a wise spiritual teacher explaining sacred texts.";
  const response = await callClaude(apiKey, system, prompt, 1024);
  return new Response(JSON.stringify({ response }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

async function handleVoiceReflection(
  apiKey: string,
  system: string,
  message: string
): Promise<Response> {
  const response = await callClaude(apiKey, system, message, 1024);
  try {
    const parsed = JSON.parse(response);
    return new Response(JSON.stringify({ reflection: parsed }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch {
    return new Response(JSON.stringify({ response }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
}

Deno.serve(async (req: Request) => {
  if (req.method !== "POST" && req.method !== "OPTIONS") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = await req.json();

    if (body.type === "health-check") {
      const hasKey = Boolean(Deno.env.get("CLAUDE_API_KEY"));
      return new Response(JSON.stringify({ status: "ok", ai_configured: hasKey }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const claudeApiKey = Deno.env.get("CLAUDE_API_KEY");

    if (!claudeApiKey) {
      return new Response(JSON.stringify({ error: "CLAUDE_API_KEY not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { type, system, message, dream, prompt, text, source } = body;

    if (dream && !type) {
      return await handleDream(claudeApiKey, sanitizeInput(dream, "dream"));
    }

    switch (type) {
      case "spiritual-guide":
        return await handleSpiritualGuide(
          claudeApiKey,
          typeof system === "string" ? system : "",
          sanitizeInput(message, "message")
        );
      case "dream-interpretation":
        return await handleDream(claudeApiKey, sanitizeInput(dream || message, "dream"));
      case "explain":
        if (!prompt && !text && !message) throw new Error("prompt, text, or message is required");
        return await handleExplain(
          claudeApiKey,
          sanitizeInput(
            prompt || `Explain this passage from ${source || "a sacred text"} in a warm, practical, and non-dogmatic way:\n\n"${text || message || ""}"`,
            "prompt"
          )
        );
      case "voice-reflection":
        return await handleVoiceReflection(
          claudeApiKey,
          typeof system === "string" ? system : "",
          sanitizeInput(message, "message")
        );
      default:
        if (system && message) {
          return await handleSpiritualGuide(
            claudeApiKey,
            sanitizeInput(system, "system"),
            sanitizeInput(message, "message")
          );
        }
        return new Response(JSON.stringify({ error: `Unknown request type: ${type || "(none)"}` }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
