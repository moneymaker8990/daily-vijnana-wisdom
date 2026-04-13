import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import Stripe from "https://esm.sh/stripe@17.7.0?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
  apiVersion: "2025-04-30.basil",
});

const endpointSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET")!;

function supabaseAdmin() {
  return createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );
}

async function upsertEntitlement(
  userId: string,
  tier: "free" | "premium",
  customerId: string,
  subscriptionId: string,
  periodEnd: string | null
) {
  const sb = supabaseAdmin();
  const { error } = await sb.from("user_entitlements").upsert(
    {
      user_id: userId,
      tier,
      source: "stripe",
      stripe_customer_id: customerId,
      stripe_subscription_id: subscriptionId,
      current_period_end: periodEnd,
    },
    { onConflict: "user_id" }
  );

  if (error) {
    console.error("upsertEntitlement error:", error);
    throw error;
  }
}

function resolveUserId(obj: Stripe.Subscription | Stripe.Checkout.Session): string | null {
  const meta = obj.metadata;
  return meta?.supabase_user_id ?? null;
}

Deno.serve(async (req: Request) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return new Response("Missing signature", { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(body, sig, endpointSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return new Response("Invalid signature", { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = resolveUserId(session);
        if (!userId || !session.subscription) break;

        const subscription = await stripe.subscriptions.retrieve(
          session.subscription as string
        );

        await upsertEntitlement(
          userId,
          "premium",
          subscription.customer as string,
          subscription.id,
          subscription.current_period_end
            ? new Date(subscription.current_period_end * 1000).toISOString()
            : null
        );
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const userId = resolveUserId(subscription);
        if (!userId) break;

        const isActive =
          subscription.status === "active" ||
          subscription.status === "trialing";

        await upsertEntitlement(
          userId,
          isActive ? "premium" : "free",
          subscription.customer as string,
          subscription.id,
          subscription.current_period_end
            ? new Date(subscription.current_period_end * 1000).toISOString()
            : null
        );
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const userId = resolveUserId(subscription);
        if (!userId) break;

        await upsertEntitlement(
          userId,
          "free",
          subscription.customer as string,
          subscription.id,
          null
        );
        break;
      }

      default:
        break;
    }
  } catch (error) {
    console.error(`Error handling ${event.type}:`, error);
    return new Response("Webhook handler error", { status: 500 });
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
});
