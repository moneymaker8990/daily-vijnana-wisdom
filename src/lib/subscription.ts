import { STORAGE_KEYS } from './constants';
import { Capacitor } from '@capacitor/core';
import { Purchases } from '@revenuecat/purchases-capacitor';
import { supabase, supabaseApiOrigin, SUPABASE_ANON_KEY } from './supabase';

export type AppTab = 'daily' | 'courses' | 'library' | 'journal' | 'dreams';
export type EntitlementTier = 'free' | 'premium';
export type BillingMode = 'scaffold' | 'revenuecat' | 'stripe';

export type EntitlementState = {
  tier: EntitlementTier;
  activatedAt?: string;
  source?: 'scaffold' | 'revenuecat' | 'stripe';
  productId?: string;
  lastSyncedAt?: string;
};

type PurchaseResult = {
  ok: boolean;
  state: EntitlementState;
  error?: string;
  redirectUrl?: string;
};

type RevenueCatInfo = {
  activeEntitlements?: string[];
};

type RevenueCatBridge = {
  purchasePackage: (productId: string) => Promise<RevenueCatInfo>;
  restorePurchases: () => Promise<RevenueCatInfo>;
  getCustomerInfo: () => Promise<RevenueCatInfo>;
};

declare global {
  interface Window {
    RevenueCatPurchases?: {
      purchasePackage: (productId: string) => Promise<RevenueCatInfo>;
      restorePurchases: () => Promise<RevenueCatInfo>;
      getCustomerInfo: () => Promise<RevenueCatInfo>;
    };
  }
}

const PREMIUM_TABS: AppTab[] = ['courses', 'library', 'dreams'];
const ENTITLEMENT_KEY = 'mindvanta_entitlement_state';
const DEFAULT_PRODUCT_ID = 'mindvanta_premium_monthly';
const DEFAULT_ENTITLEMENT_ID = 'premium';
const DEFAULT_REVENUECAT_OFFERING = 'default';
let revenueCatConfigured = false;

export function isNativePlatform(): boolean {
  const platform = Capacitor.getPlatform();
  return platform === 'ios' || platform === 'android';
}

function getBillingMode(): BillingMode {
  if (isNativePlatform()) {
    const configuredMode = import.meta.env.VITE_BILLING_MODE === 'revenuecat' ? 'revenuecat' : 'scaffold';
    if (import.meta.env.PROD) return 'revenuecat';
    return configuredMode;
  }
  return 'stripe';
}

function getRevenueCatApiKey(): string | null {
  const platform = Capacitor.getPlatform();
  if (platform === 'ios') return import.meta.env.VITE_REVENUECAT_API_KEY_IOS || null;
  if (platform === 'android') return import.meta.env.VITE_REVENUECAT_API_KEY_ANDROID || null;
  return null;
}

function getRevenueCatEntitlementId(): string {
  return import.meta.env.VITE_REVENUECAT_ENTITLEMENT_ID || DEFAULT_ENTITLEMENT_ID;
}

function getRevenueCatOfferingId(): string {
  return import.meta.env.VITE_REVENUECAT_OFFERING_ID || DEFAULT_REVENUECAT_OFFERING;
}

function mapCustomerInfoToEntitlements(customerInfo: any): RevenueCatInfo {
  const active = customerInfo?.entitlements?.active;
  const ids = active && typeof active === 'object' ? Object.keys(active) : [];
  return { activeEntitlements: ids };
}

async function ensureRevenueCatConfigured(): Promise<boolean> {
  if (revenueCatConfigured) return true;
  const apiKey = getRevenueCatApiKey();
  if (!apiKey) return false;

  await Purchases.configure({ apiKey });
  revenueCatConfigured = true;
  return true;
}

async function getRevenueCatBridge(): Promise<RevenueCatBridge | null> {
  if (window.RevenueCatPurchases) {
    return window.RevenueCatPurchases;
  }

  const configured = await ensureRevenueCatConfigured();
  if (!configured) return null;

  return {
    async purchasePackage(productId: string): Promise<RevenueCatInfo> {
      const offerings = await Purchases.getOfferings();
      const targetOffering = offerings.all?.[getRevenueCatOfferingId()] ?? offerings.current;
      const allPackages = targetOffering?.availablePackages ?? [];
      if (allPackages.length === 0) return { activeEntitlements: [] };

      const packageToBuy =
        allPackages.find((pkg: any) => pkg?.product?.identifier === productId) ?? allPackages[0];
      const result = await Purchases.purchasePackage({ aPackage: packageToBuy });
      return mapCustomerInfoToEntitlements(result.customerInfo);
    },
    async restorePurchases(): Promise<RevenueCatInfo> {
      const result = await Purchases.restorePurchases();
      return mapCustomerInfoToEntitlements(result.customerInfo);
    },
    async getCustomerInfo(): Promise<RevenueCatInfo> {
      const result = await Purchases.getCustomerInfo();
      return mapCustomerInfoToEntitlements(result.customerInfo);
    },
  };
}

function saveEntitlementState(state: EntitlementState): EntitlementState {
  localStorage.setItem(ENTITLEMENT_KEY, JSON.stringify(state));
  return state;
}

export function getEntitlementState(): EntitlementState {
  try {
    const raw = localStorage.getItem(ENTITLEMENT_KEY);
    if (!raw) return { tier: 'free' };
    const parsed = JSON.parse(raw) as EntitlementState;
    return parsed.tier === 'premium' ? parsed : { tier: 'free' };
  } catch {
    return { tier: 'free' };
  }
}

export function hasPremiumAccess(): boolean {
  return getEntitlementState().tier === 'premium';
}

/**
 * Short-lived user JWT for Edge Functions. Refreshes when the access token is near expiry
 * or getUser() fails, then optional second attempt after 401.
 */
async function getAuthToken(): Promise<string | null> {
  const { data: s0, error: se } = await supabase.auth.getSession();
  if (se || !s0.session) return null;

  const at = s0.session.expires_at;
  const expMs = typeof at === 'number' ? at * 1000 : null;
  const needsRefresh = expMs === null || expMs < Date.now() + 120_000;

  if (needsRefresh) {
    const { data: r } = await supabase.auth.refreshSession();
    if (r.session?.access_token) return r.session.access_token;
  }

  const { data: u, error: ue } = await supabase.auth.getUser();
  if (ue || !u.user) {
    const { data: r2 } = await supabase.auth.refreshSession();
    return r2.session?.access_token ?? s0.session.access_token;
  }

  const { data: s2 } = await supabase.auth.getSession();
  return s2.session?.access_token ?? s0.session.access_token;
}

/** Call a user-gated edge function; retry once on 401 after refreshSession. */
async function userFetch(
  functionName: 'stripe-checkout' | 'check-entitlement' | 'stripe-reconcile',
  init: { method: 'GET' | 'POST'; body?: object }
): Promise<Response> {
  const url = `${supabaseApiOrigin}/functions/v1/${functionName}`;
  const withToken = (token: string) => {
    const h: Record<string, string> = {
      Authorization: `Bearer ${token}`,
      apikey: SUPABASE_ANON_KEY,
    };
    if (init.method === 'POST') h['Content-Type'] = 'application/json';
    return fetch(url, {
      method: init.method,
      headers: h,
      body: init.method === 'POST' && init.body !== undefined ? JSON.stringify(init.body) : undefined,
    });
  };

  let token = await getAuthToken();
  if (!token) {
    return new Response(JSON.stringify({ error: 'Not authenticated' }), { status: 401 });
  }
  let res = await withToken(token);
  if (res.status === 401) {
    await supabase.auth.refreshSession();
    token = await getAuthToken();
    if (token) {
      res = await withToken(token);
    }
  }
  return res;
}

export async function createStripeCheckoutSession(priceId?: string): Promise<PurchaseResult> {
  try {
    if (!(await getAuthToken())) {
      return { ok: false, error: 'Sign in to subscribe', state: getEntitlementState() };
    }

    const response = await userFetch('stripe-checkout', {
      method: 'POST',
      body: { priceId: priceId || undefined },
    });

    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      return {
        ok: false,
        error: (body as Record<string, string>).error || 'Could not create checkout session',
        state: getEntitlementState(),
      };
    }

    const { url: checkoutUrl } = (await response.json()) as { url: string };
    return { ok: true, redirectUrl: checkoutUrl, state: getEntitlementState() };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : 'Network error. Check your connection and try again.',
      state: getEntitlementState(),
    };
  }
}

export async function purchasePremium(productId: string = DEFAULT_PRODUCT_ID): Promise<PurchaseResult> {
  const mode = getBillingMode();

  if (mode === 'stripe') {
    return createStripeCheckoutSession();
  }

  if (mode === 'revenuecat') {
    try {
      const sdk = await getRevenueCatBridge();
      if (!sdk) {
        return { ok: false, error: 'RevenueCat SDK unavailable', state: getEntitlementState() };
      }
      const info = await sdk.purchasePackage(productId);
      const state = mapRevenueCatToEntitlement(info, productId);
      return { ok: state.tier === 'premium', state };
    } catch {
      return { ok: false, error: 'Purchase failed', state: getEntitlementState() };
    }
  }

  if (import.meta.env.PROD) {
    return { ok: false, error: 'Scaffold billing is disabled in production', state: getEntitlementState() };
  }

  const state = saveEntitlementState({
    tier: 'premium',
    source: 'scaffold',
    productId,
    activatedAt: new Date().toISOString(),
    lastSyncedAt: new Date().toISOString(),
  });
  return { ok: true, state };
}

export async function restorePurchases(): Promise<PurchaseResult> {
  const mode = getBillingMode();

  if (mode === 'stripe') {
    let serverState = await syncEntitlementsFromServer();
    if (serverState.tier !== 'premium') {
      const fromStripe = await reconcileStripeByEmailFromServer();
      if (fromStripe.synced) {
        serverState = await syncEntitlementsFromServer();
      } else {
        if (fromStripe.code === 'no_stripe_customer') {
          return {
            ok: false,
            state: serverState,
            error:
              'No Stripe customer for this sign-in email. Use the same email you used in Checkout, or contact support with your receipt.',
          };
        }
        if (fromStripe.code === 'no_active_subscription') {
          return {
            ok: false,
            state: serverState,
            error: 'No active subscription found in Stripe for this account. Check billing in Stripe, or the email on your account matches Checkout.',
          };
        }
        if (fromStripe.code === 'no_email') {
          return {
            ok: false,
            state: serverState,
            error: 'Add an email to your account, then try Restore again.',
          };
        }
      }
    }
    return {
      ok: serverState.tier === 'premium',
      state: serverState,
      error: serverState.tier === 'premium' ? undefined : 'No active subscription found',
    };
  }

  if (mode === 'revenuecat') {
    try {
      const sdk = await getRevenueCatBridge();
      if (!sdk) {
        return { ok: false, error: 'RevenueCat SDK unavailable', state: getEntitlementState() };
      }
      const info = await sdk.restorePurchases();
      const state = mapRevenueCatToEntitlement(info);
      return { ok: state.tier === 'premium', state };
    } catch {
      return { ok: false, error: 'Restore failed', state: getEntitlementState() };
    }
  }

  const state = getEntitlementState();
  return { ok: state.tier === 'premium', state, error: state.tier === 'premium' ? undefined : 'No purchases found' };
}

/**
 * After Stripe redirect, the webhook can lag. This calls a server function that
 * verifies the Checkout Session and upserts `user_entitlements` (backup to webhooks).
 */
export async function reconcileStripeCheckoutSession(sessionId: string): Promise<boolean> {
  if (!(await getAuthToken())) return false;
  try {
    const response = await userFetch('stripe-reconcile', {
      method: 'POST',
      body: { sessionId: sessionId.trim() },
    });
    if (!response.ok) return false;
    const data = (await response.json()) as { ok?: boolean };
    return data.ok === true;
  } catch {
    return false;
  }
}

type StripeReconcileByEmailResult =
  | { synced: true }
  | { synced: false; code: 'no_stripe_customer' | 'no_active_subscription' | 'no_email' | 'request_failed' };

/**
 * Find Stripe customer + active subscription by the signed-in user's email, then write user_entitlements.
 * Used for web "Restore purchases" when the async webhook never updated the database.
 */
export async function reconcileStripeByEmailFromServer(): Promise<StripeReconcileByEmailResult> {
  if (!(await getAuthToken())) return { synced: false, code: 'request_failed' };
  try {
    const response = await userFetch('stripe-reconcile', {
      method: 'POST',
      body: { lookupByEmail: true },
    });
    const data = (await response.json()) as { ok?: boolean; error?: string };
    if (!response.ok) return { synced: false, code: 'request_failed' };
    if (data.ok === true) return { synced: true };
    if (data.error === 'no_stripe_customer') return { synced: false, code: 'no_stripe_customer' };
    if (data.error === 'no_active_subscription') return { synced: false, code: 'no_active_subscription' };
    if (data.error === 'no_email') return { synced: false, code: 'no_email' };
    return { synced: false, code: 'request_failed' };
  } catch {
    return { synced: false, code: 'request_failed' };
  }
}

/**
 * Poll server until premium or max attempts (webhook + Stripe can be a few seconds behind).
 */
export async function syncEntitlementsWithRetries(
  maxAttempts = 20,
  delayMs = 1500
): Promise<EntitlementState> {
  for (let i = 0; i < maxAttempts; i++) {
    const state = await syncEntitlements();
    if (state.tier === 'premium') return state;
    if (i < maxAttempts - 1) {
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }
  return syncEntitlements();
}

async function syncEntitlementsFromServer(): Promise<EntitlementState> {
  if (!(await getAuthToken())) return getEntitlementState();

  try {
    const response = await userFetch('check-entitlement', { method: 'GET' });

    if (!response.ok) return getEntitlementState();

    const data = (await response.json()) as {
      tier: EntitlementTier;
      source: string | null;
      current_period_end: string | null;
    };

    return saveEntitlementState({
      tier: data.tier,
      source: (data.source as EntitlementState['source']) ?? undefined,
      activatedAt: data.tier === 'premium' ? new Date().toISOString() : undefined,
      lastSyncedAt: new Date().toISOString(),
    });
  } catch {
    return getEntitlementState();
  }
}

export async function syncEntitlements(): Promise<EntitlementState> {
  const mode = getBillingMode();

  if (mode === 'stripe') {
    return syncEntitlementsFromServer();
  }

  if (mode !== 'revenuecat') {
    return getEntitlementState();
  }

  try {
    const sdk = await getRevenueCatBridge();
    if (!sdk) return getEntitlementState();
    const info = await sdk.getCustomerInfo();
    return mapRevenueCatToEntitlement(info);
  } catch {
    return getEntitlementState();
  }
}

function mapRevenueCatToEntitlement(info: RevenueCatInfo, productId: string = DEFAULT_PRODUCT_ID): EntitlementState {
  const entitlementId = getRevenueCatEntitlementId();
  const hasEntitlement = Boolean(
    info.activeEntitlements?.includes(entitlementId) || info.activeEntitlements?.length
  );
  return saveEntitlementState({
    tier: hasEntitlement ? 'premium' : 'free',
    source: hasEntitlement ? 'revenuecat' : undefined,
    productId: hasEntitlement ? productId : undefined,
    activatedAt: hasEntitlement ? new Date().toISOString() : undefined,
    lastSyncedAt: new Date().toISOString(),
  });
}

export function shouldGateTab(tab: AppTab): boolean {
  return PREMIUM_TABS.includes(tab) && !hasPremiumAccess();
}

export function getPaywallTriggerContext(tab: AppTab): string {
  if (tab === 'courses') return 'course_unlock';
  if (tab === 'library') return 'library_unlock';
  if (tab === 'dreams') return 'dreams_unlock';
  return 'generic';
}

export function getCurrentStreakDays(): number {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.STREAK_DATA);
    if (!raw) return 0;
    const parsed = JSON.parse(raw) as { current?: number };
    return typeof parsed.current === 'number' ? parsed.current : 0;
  } catch {
    return 0;
  }
}
