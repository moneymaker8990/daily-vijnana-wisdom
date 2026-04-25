import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";
import { buildCorsHeaders } from "../_shared/cors.ts";

function corsHeaders(req: Request) {
  return buildCorsHeaders(req, "GET, OPTIONS");
}

function jsonResponse(
  body: Record<string, unknown>,
  status = 200,
  req: Request
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders(req), "Content-Type": "application/json" },
  });
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders(req) });
  }

  if (req.method !== "GET") {
    return jsonResponse({ error: "Method not allowed" }, 405, req);
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return jsonResponse({ error: "Missing authorization header" }, 401, req);
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return jsonResponse({ error: "Unauthorized" }, 401, req);
    }

    const { data, error } = await supabase
      .from("user_entitlements")
      .select("tier, source, current_period_end")
      .eq("user_id", user.id)
      .maybeSingle();

    if (error) {
      console.error("check-entitlement query error:", error);
      return jsonResponse({ error: "Database error" }, 500, req);
    }

    return jsonResponse(
      {
        tier: data?.tier ?? "free",
        source: data?.source ?? null,
        current_period_end: data?.current_period_end ?? null,
      },
      200,
      req
    );
  } catch (error) {
    console.error("check-entitlement error:", error);
    return jsonResponse(
      {
        error:
          error instanceof Error ? error.message : "Internal server error",
      },
      500,
      req
    );
  }
});
