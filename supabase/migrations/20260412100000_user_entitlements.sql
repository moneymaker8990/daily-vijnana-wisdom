-- User Entitlements Table
-- Stores premium subscription state synced from Stripe (web) and RevenueCat (native).
-- The webhook edge functions upsert rows here; the client reads via check-entitlement.

-- Ensure trigger helper exists (remote DBs may predate the initial_schema migration).
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE IF NOT EXISTS user_entitlements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  tier TEXT NOT NULL DEFAULT 'free' CHECK (tier IN ('free', 'premium')),
  source TEXT CHECK (source IN ('stripe', 'revenuecat', 'manual')),
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE user_entitlements ENABLE ROW LEVEL SECURITY;

-- Users can read their own entitlement row
CREATE POLICY "Users can view own entitlement"
  ON user_entitlements FOR SELECT
  USING (auth.uid() = user_id);

-- Only service_role (edge functions) can insert/update/delete.
-- No INSERT/UPDATE/DELETE policies for authenticated users — writes go through
-- the stripe-webhook edge function which uses the service_role key.

CREATE INDEX IF NOT EXISTS idx_user_entitlements_user_id
  ON user_entitlements(user_id);

CREATE INDEX IF NOT EXISTS idx_user_entitlements_stripe_customer_id
  ON user_entitlements(stripe_customer_id);

CREATE TRIGGER update_user_entitlements_updated_at
  BEFORE UPDATE ON user_entitlements
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
