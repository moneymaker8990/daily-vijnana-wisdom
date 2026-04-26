import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import Stripe from "https://esm.sh/stripe@17.7.0?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";
import { buildCorsHeaders } from "../_shared/cors.ts";

/**
 * POST body (JSON):
 * - { "sessionId": "cs_..." } — verify that Checkout session and upsert (after return URL).
 * - { "lookupByEmail": true } — find an active/trialing/past_due subscription in Stripe for the user's email, upsert.
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

type SubShape = {
  id: string;
  customer: string;
  current_period_end: number | null;
  status: string;
  metadata: Stripe.Metadata | null;
};

function isPremiumishStatus(s: string): boolean {
  return s === "active" || s === "trialing" || s === "past_due";
}

async function upsertFromSubscription(
  userId: string,
  sub: SubShape
): Promise<void> {
  const admin = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );
  const { error } = await admin.from("user_entitlements").upsert(
    {
      user_id: userId,
      tier: isPremiumishStatus(sub.status) ? "premium" : "free",
      source: "stripe",
      stripe_customer_id: sub.customer,
      stripe_subscription_id: sub.id,
      current_period_end: sub.current_period_end
        ? new Date(sub.current_period_end * 1000).toISOString()
        : null,
    },
    { onConflict: "user_id" }
  );
  if (error) {
    console.error("stripe-reconcile upsert error:", error);
    throw error;
  }
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

  let body: { sessionId?: string; lookupByEmail?: boolean };
  try {
    body = (await req.json()) as { sessionId?: string; lookupByEmail?: boolean };
  } catch {
    return j({ error: "Invalid JSON" }, 400, req);
  }

  const sessionId = (body?.sessionId ?? "").trim();
  const lookupByEmail = body?.lookupByEmail === true;

  // --- 1) Lookup by email (e.g. "Restore purchases" on web) ---
  if (lookupByEmail) {
    if (!user.email) {
      return j({ ok: false, error: "no_email" }, 200, req);
    }

    const customers = await stripe.customers.list({
      email: user.email,
      limit: 20,
    });

    if (customers.data.length === 0) {
      return j(
        {
          ok: false,
          error: "no_stripe_customer",
        },
        200,
        req
      );
    }

    let best: Stripe.Subscription | null = null;
    for (const customer of customers.data) {
      const subs = await stripe.subscriptions.list({
        customer: customer.id,
        status: "all",
        limit: 30,
      });
      for (const sub of subs.data) {
        if (!isPremiumishStatus(sub.status)) continue;
        const metaUid = sub.metadata?.supabase_user_id;
        if (metaUid && metaUid !== user.id) continue;
        if (!best) {
          best = sub;
          continue;
        }
        const bestEnd = best.current_period_end ?? 0;
        const subEnd = sub.current_period_end ?? 0;
        if (subEnd > bestEnd) best = sub;
      }
    }

    if (!best) {
      return j({ ok: false, error: "no_active_subscription" }, 200, req);
    }

    try {
      await upsertFromSubscription(user.id, {
        id: best.id,
        customer: best.customer as string,
        current_period_end: best.current_period_end,
        status: best.status,
        metadata: best.metadata,
      });
    } catch {
      return j({ error: "Database error" }, 500, req);
    }
    return j({ ok: true, tier: "premium", source: "email_lookup" }, 200, req);
  }

  // --- 2) Specific Checkout session ---
  if (!sessionId) {
    return j(
      { error: "Send sessionId, or { lookupByEmail: true }" },
      400,
      req
    );
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

  try {
    await upsertFromSubscription(user.id, {
      id: subscription.id,
      customer: subscription.customer as string,
      current_period_end: subscription.current_period_end,
      status: subscription.status,
      metadata: subscription.metadata,
    });
  } catch {
    return j({ error: "Database error" }, 500, req);
  }

  return j({ ok: true, tier: "premium", source: "checkout_session" }, 200, req);
});
