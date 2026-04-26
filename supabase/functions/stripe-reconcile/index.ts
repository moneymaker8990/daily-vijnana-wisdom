import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import Stripe from "https://esm.sh/stripe@17.7.0?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";
import { buildCorsHeaders } from "../_shared/cors.ts";

/**
 * If the async webhook lags or failed, the client can call this after
 * return from Checkout with ?checkout=success&session_id=...
 * to upsert user_entitlements using the same rules as stripe-webhook.
 */
function corsH(req: Request) {
  return buildCorsHeaders(req, "POST, OPTIONS");
}

function j(body: Record<string, unknown>, status: number, req: Request) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsH(req), "Content-Type": "application/json" },
  });
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsH(req) });
  }
  if (req.method !== "POST") {
    return j({ error: "Method not allowed" }, 405, req);
  }

  const secret = Deno.env.get("STRIPE_SECRET_KEY");
  if (!secret) {
    return j({ error: "Stripe not configured" }, 500, req);
  }
  const stripe = new Stripe(secret, { apiVersion: "2025-04-30.basil" });

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const supabaseAnon = Deno.env.get("SUPABASE_ANON_KEY")!;

  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
    return j({ error: "Missing authorization" }, 401, req);
  }

  const supa = createClient(supabaseUrl, supabaseAnon, {
    global: { headers: { Authorization: authHeader } },
  });
  const {
    data: { user },
    error: userErr,
  } = await supa.auth.getUser();
  if (userErr || !user) {
    return j({ error: "Unauthorized" }, 401, req);
  }

  let sessionId: string;
  try {
    const body = await req.json() as { sessionId?: string };
    sessionId = (body?.sessionId ?? "").trim();
  } catch {
    return j({ error: "Invalid JSON" }, 400, req);
  }
  if (!sessionId) {
    return j({ error: "sessionId required" }, 400, req);
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["subscription"],
  });

  if (session.mode !== "subscription" || !session.subscription) {
    return j({ error: "Not a subscription checkout" }, 400, req);
  }

  if (session.payment_status !== "paid" && session.payment_status !== "no_payment_required") {
    return j({ error: "Checkout not paid yet" }, 400, req);
  }

  const metaUid =
    session.metadata?.supabase_user_id || session.client_reference_id || null;
  if (metaUid !== user.id) {
    return j({ error: "Session does not match signed-in user" }, 403, req);
  }

  const subId =
    typeof session.subscription === "string"
      ? session.subscription
      : session.subscription.id;
  const subscription = await stripe.subscriptions.retrieve(subId);

  const admin = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );
  const { error } = await admin.from("user_entitlements").upsert(
    {
      user_id: user.id,
      tier: "premium" as const,
      source: "stripe",
      stripe_customer_id: subscription.customer as string,
      stripe_subscription_id: subscription.id,
      current_period_end: subscription.current_period_end
        ? new Date(subscription.current_period_end * 1000).toISOString()
        : null,
    },
    { onConflict: "user_id" }
  );

  if (error) {
    console.error("stripe-reconcile upsert error:", error);
    return j({ error: "Database error" }, 500, req);
  }

  return j({ ok: true, tier: "premium" }, 200, req);
});
