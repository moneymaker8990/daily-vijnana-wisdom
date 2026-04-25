import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@capacitor/core', () => ({
  Capacitor: {
    getPlatform: () => 'web',
  },
}));

vi.mock('@revenuecat/purchases-capacitor', () => ({
  Purchases: {
    configure: vi.fn(),
    getOfferings: vi.fn(),
    purchasePackage: vi.fn(),
    restorePurchases: vi.fn(),
    getCustomerInfo: vi.fn(),
  },
}));

vi.mock('./supabase', () => ({
  supabase: { auth: { getSession: async () => ({ data: { session: null } }) } },
  SUPABASE_URL: 'https://example.supabase.co',
  SUPABASE_ANON_KEY: 'anon-test-key',
}));

import {
  getCurrentStreakDays,
  getEntitlementState,
  getPaywallTriggerContext,
  hasPremiumAccess,
  shouldGateTab,
} from './subscription';
import { STORAGE_KEYS } from './constants';

const ENTITLEMENT_KEY = 'mindvanta_entitlement_state';

describe('getEntitlementState', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns free when storage is empty', () => {
    expect(getEntitlementState()).toEqual({ tier: 'free' });
  });

  it('returns free when stored tier is not premium', () => {
    localStorage.setItem(ENTITLEMENT_KEY, JSON.stringify({ tier: 'free' }));
    expect(getEntitlementState()).toEqual({ tier: 'free' });
  });

  it('returns premium state when stored tier is premium', () => {
    localStorage.setItem(
      ENTITLEMENT_KEY,
      JSON.stringify({ tier: 'premium', source: 'revenuecat', productId: 'mindvanta_premium_monthly' })
    );
    const state = getEntitlementState();
    expect(state.tier).toBe('premium');
    expect(state.source).toBe('revenuecat');
  });

  it('falls back to free on corrupt storage', () => {
    localStorage.setItem(ENTITLEMENT_KEY, 'not-json');
    expect(getEntitlementState()).toEqual({ tier: 'free' });
  });
});

describe('hasPremiumAccess', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('is false by default', () => {
    expect(hasPremiumAccess()).toBe(false);
  });

  it('is true when stored tier is premium', () => {
    localStorage.setItem(ENTITLEMENT_KEY, JSON.stringify({ tier: 'premium' }));
    expect(hasPremiumAccess()).toBe(true);
  });
});

describe('shouldGateTab', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('gates the premium tabs for free users', () => {
    expect(shouldGateTab('courses')).toBe(true);
    expect(shouldGateTab('library')).toBe(true);
    expect(shouldGateTab('dreams')).toBe(true);
  });

  it('never gates the free tabs', () => {
    expect(shouldGateTab('daily')).toBe(false);
    expect(shouldGateTab('journal')).toBe(false);
  });

  it('does not gate anything for premium users', () => {
    localStorage.setItem(ENTITLEMENT_KEY, JSON.stringify({ tier: 'premium' }));
    expect(shouldGateTab('courses')).toBe(false);
    expect(shouldGateTab('library')).toBe(false);
    expect(shouldGateTab('dreams')).toBe(false);
  });
});

describe('getPaywallTriggerContext', () => {
  it('returns a specific string for each premium tab', () => {
    expect(getPaywallTriggerContext('courses')).toBe('course_unlock');
    expect(getPaywallTriggerContext('library')).toBe('library_unlock');
    expect(getPaywallTriggerContext('dreams')).toBe('dreams_unlock');
  });

  it('falls back to generic for non-premium tabs', () => {
    expect(getPaywallTriggerContext('daily')).toBe('generic');
    expect(getPaywallTriggerContext('journal')).toBe('generic');
  });
});

describe('getCurrentStreakDays', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns 0 when no streak data', () => {
    expect(getCurrentStreakDays()).toBe(0);
  });

  it('returns parsed current day count', () => {
    localStorage.setItem(STORAGE_KEYS.STREAK_DATA, JSON.stringify({ current: 12 }));
    expect(getCurrentStreakDays()).toBe(12);
  });

  it('returns 0 when data is corrupt', () => {
    localStorage.setItem(STORAGE_KEYS.STREAK_DATA, 'not-json');
    expect(getCurrentStreakDays()).toBe(0);
  });
});
