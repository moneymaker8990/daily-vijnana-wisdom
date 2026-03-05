import { STORAGE_KEYS } from './constants';
import { Capacitor } from '@capacitor/core';
import { Purchases } from '@revenuecat/purchases-capacitor';

export type AppTab = 'daily' | 'courses' | 'library' | 'journal' | 'dreams';
export type EntitlementTier = 'free' | 'premium';
export type BillingMode = 'scaffold' | 'revenuecat';

export type EntitlementState = {
  tier: EntitlementTier;
  activatedAt?: string;
  source?: 'scaffold' | 'revenuecat';
  productId?: string;
  lastSyncedAt?: string;
};

type PurchaseResult = {
  ok: boolean;
  state: EntitlementState;
  error?: string;
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

function getBillingMode(): BillingMode {
  return import.meta.env.VITE_BILLING_MODE === 'revenuecat' ? 'revenuecat' : 'scaffold';
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

export async function purchasePremium(productId: string = DEFAULT_PRODUCT_ID): Promise<PurchaseResult> {
  const mode = getBillingMode();
  if (mode === 'revenuecat') {
    try {
      const sdk = await getRevenueCatBridge();
      if (!sdk) {
        return { ok: false, error: 'RevenueCat SDK unavailable', state: getEntitlementState() };
      }
      const info = await sdk.purchasePackage(productId);
      const state = mapRevenueCatToEntitlement(info, productId);
      return { ok: state.tier === 'premium', state };
    } catch (error) {
      return { ok: false, error: 'Purchase failed', state: getEntitlementState() };
    }
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

  // Scaffold restore: use existing local entitlement if present.
  const state = getEntitlementState();
  return { ok: state.tier === 'premium', state, error: state.tier === 'premium' ? undefined : 'No purchases found' };
}

export async function syncEntitlements(): Promise<EntitlementState> {
  if (getBillingMode() !== 'revenuecat') {
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
