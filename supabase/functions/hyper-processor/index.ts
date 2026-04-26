import "jsr:@supabase/functions-js/edge-runtime.d.ts";

/**
 * This function is a public AI proxy: the Supabase anon key already ships in the app bundle.
 * Use Access-Control-Allow-Origin: * so Capacitor / mobile WebViews (https://localhost,
 * capacitor://localhost, or missing/opaque Origins) are not blocked by a production allowlist.
 */
function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Max-Age": "86400",
  };
}

function jsonResponse(
  body: Record<string, unknown>,
  status = 200
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders(), "Content-Type": "application/json" },
  });
}

type RequestBody = {
  type?: string;
  system?: string;
  message?: string;
  prompt?: string;
  text?: string;
  source?: string;
  dream?: string;
  mood?: string;
};

function getAnthropicText(data: unknown): string {
  if (!data || typeof data !== "object" || !("content" in data)) {
    return "";
  }
  const content = (data as { content?: unknown }).content;
  if (!Array.isArray(content)) return "";
  for (const block of content) {
    if (block && typeof block === "object" && (block as { type?: string }).type === "text") {
      const t = (block as { text?: string }).text;
      if (typeof t === "string") return t;
    }
  }
  return "";
}

const DEFAULT_MODEL = "claude-3-5-sonnet-20241022";

const DREAM_SYSTEM = `You are a compassionate dream interpretation guide drawing from depth psychology, contemplative traditions, and common dream symbolism. Offer insight without being dogmatic. Keep the interpretation to 3–5 short paragraphs. Write as a supportive guide, not a medical or clinical authority.`;

async function callAnthropic(
  claudeKey: string,
  system: string,
  user: string
): Promise<{ text: string } | { error: string; status: number; log?: string }> {
  const model = (Deno.env.get("CLAUDE_MODEL") ?? DEFAULT_MODEL).trim();
  const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": claudeKey,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model,
      max_tokens: 4096,
      system,
      messages: [{ role: "user", content: user }],
    }),
  });

  const rawText = await anthropicRes.text();
  if (!anthropicRes.ok) {
    return {
      error: "Upstream AI error",
      status: 502,
      log: `[hyper-processor] Anthropic ${anthropicRes.status} ${rawText.slice(0, 500)}`,
    };
  }

  let data: unknown;
  try {
    data = JSON.parse(rawText) as unknown;
  } catch {
    return { error: "Invalid AI response", status: 502 };
  }

  const text = getAnthropicText(data);
  return { text };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders() });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  const claudeKey = (Deno.env.get("CLAUDE_API_KEY") ?? "").trim();
  const aiConfigured = claudeKey.length > 0;

  let body: RequestBody;
  try {
    body = (await req.json()) as RequestBody;
  } catch {
    return jsonResponse({ error: "Invalid JSON" }, 400);
  }

  const type = body.type ?? "";

  if (type === "health-check") {
    return jsonResponse(
      { status: "ok", ai_configured: aiConfigured },
      200
    );
  }

  const knownTypes = ["spiritual-guide", "explain", "voice-reflection", "dream-interpretation"] as const;
  if (!knownTypes.includes(type as (typeof knownTypes)[number])) {
    return jsonResponse({ error: "Unknown type" }, 400);
  }

  if (!aiConfigured) {
    return jsonResponse(
      { error: "AI is not configured", response: "" },
      503
    );
  }

  if (type === "spiritual-guide") {
    const system =
      typeof body.system === "string" && body.system.trim() ? body.system.trim() : "You are a helpful spiritual guide.";
    const message = typeof body.message === "string" ? body.message : "";
    if (!message.trim()) {
      return jsonResponse({ error: "Missing message" }, 400);
    }
    const result = await callAnthropic(claudeKey, system, message);
    if ("error" in result) {
      if (result.log) console.error(result.log);
      return jsonResponse({ error: result.error, response: "" }, result.status);
    }
    return jsonResponse({ response: result.text }, 200);
  }

  if (type === "explain") {
    const prompt = typeof body.prompt === "string" ? body.prompt : "";
    if (!prompt.trim()) {
      return jsonResponse({ error: "Missing prompt" }, 400);
    }
    const system =
      "You are a wise spiritual teacher explaining sacred texts. Follow the user's instructions. Use the section labels and format they request (e.g. MEANING, CONTEXT, PRACTICAL APPLICATION).";
    const result = await callAnthropic(claudeKey, system, prompt);
    if ("error" in result) {
      if (result.log) console.error(result.log);
      return jsonResponse({ error: result.error, response: "" }, result.status);
    }
    return jsonResponse({ response: result.text }, 200);
  }

  if (type === "voice-reflection") {
    const system =
      typeof body.system === "string" && body.system.trim() ? body.system.trim() : "You are a compassionate journal assistant.";
    const message = typeof body.message === "string" ? body.message : "";
    if (!message.trim()) {
      return jsonResponse({ error: "Missing message" }, 400);
    }
    const result = await callAnthropic(claudeKey, system, message);
    if ("error" in result) {
      if (result.log) console.error(result.log);
      return jsonResponse({ error: result.error, response: "" }, result.status);
    }
    return jsonResponse({ response: result.text }, 200);
  }

  if (type === "dream-interpretation") {
    const dream =
      typeof body.dream === "string" && body.dream.trim()
        ? body.dream
        : typeof body.message === "string"
          ? body.message
          : "";
    if (!dream.trim()) {
      return jsonResponse({ error: "Missing dream content" }, 400);
    }
    const mood = typeof body.mood === "string" && body.mood.trim() ? body.mood.trim() : "";
    const user = mood
      ? `The dreamer reports overall mood/feel: ${mood}\n\nDream text:\n${dream}`
      : `Dream text:\n${dream}`;
    const result = await callAnthropic(claudeKey, DREAM_SYSTEM, user);
    if ("error" in result) {
      if (result.log) console.error(result.log);
      return jsonResponse({ error: result.error, interpretation: "" }, result.status);
    }
    return jsonResponse({ interpretation: result.text }, 200);
  }

  return jsonResponse({ error: "Unhandled type" }, 500);
});
