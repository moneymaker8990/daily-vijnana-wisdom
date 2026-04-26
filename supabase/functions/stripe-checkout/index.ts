import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import Stripe from "https://esm.sh/stripe@17.7.0?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";
import { buildCorsHeaders } from "../_shared/cors.ts";

function corsHeaders(req: Request) {
  return buildCorsHeaders(req, "POST, OPTIONS");
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

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405, req);
  }

  try {
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeSecretKey) {
      return jsonResponse({ error: "Stripe is not configured" }, 500, req);
    }

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

    const { priceId, successUrl, cancelUrl } = await req.json();

    const stripePriceId =
      priceId || Deno.env.get("STRIPE_PRICE_ID_MONTHLY");

    if (!stripePriceId) {
      return jsonResponse(
        { error: "No price ID provided and no default configured" },
        400,
        req
      );
    }

    const stripe = new Stripe(stripeSecretKey, { apiVersion: "2025-04-30.basil" });

    const appBaseUrl =
      Deno.env.get("APP_BASE_URL") || "https://mindvanta.io";

    // Optional: set STRIPE_TRIAL_PERIOD_DAYS=7 (Supabase function secret) for a card-on-file
    // free trial. Stripe will create the subscription in `trialing` status; your webhook
    // already maps `trialing` → premium in user_entitlements.
    const rawTrial = Deno.env.get("STRIPE_TRIAL_PERIOD_DAYS");
    const trialPeriodDays = rawTrial ? parseInt(rawTrial, 10) : 0;
    const subscriptionData: {
      metadata: { supabase_user_id: string };
      trial_period_days?: number;
    } = { metadata: { supabase_user_id: user.id } };
    if (Number.isFinite(trialPeriodDays) && trialPeriodDays > 0) {
      subscriptionData.trial_period_days = Math.min(365, Math.floor(trialPeriodDays));
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer_email: user.email,
      client_reference_id: user.id,
      metadata: { supabase_user_id: user.id },
      subscription_data: subscriptionData,
      line_items: [{ price: stripePriceId, quantity: 1 }],
      success_url:
        successUrl || `${appBaseUrl}?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${appBaseUrl}?checkout=cancelled`,
    });

    return jsonResponse({ url: session.url }, 200, req);
  } catch (error) {
    console.error("stripe-checkout error:", error);
    return jsonResponse(
      { error: error instanceof Error ? error.message : "Internal server error" },
      500,
      req
    );
  }
});
