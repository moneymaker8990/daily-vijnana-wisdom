// Subscription Management for Daily Vijnana Wisdom
// Uses RevenueCat for cross-platform subscription handling

// RevenueCat configuration (to be set when app is ready for App Store)
const REVENUECAT_API_KEY = import.meta.env.VITE_REVENUECAT_API_KEY || '';

export type SubscriptionTier = 'free' | 'premium';

export type SubscriptionState = {
  tier: SubscriptionTier;
  isActive: boolean;
  expiresAt?: string;
  entitlements: string[];
};

// Premium entitlements
export const PREMIUM_ENTITLEMENTS = {
  FULL_LIBRARY: 'full_library',
  DREAM_INTERPRETATION: 'dream_interpretation',
  UNLIMITED_FAVORITES: 'unlimited_favorites',
  CUSTOM_REMINDERS: 'custom_reminders',
  OFFLINE_ACCESS: 'offline_access',
};

// Check if user has premium (placeholder - will integrate with RevenueCat)
export function isPremium(): boolean {
  // For development, check localStorage
  const stored = localStorage.getItem('vijnana_premium');
  if (stored) {
    return JSON.parse(stored);
  }
  // Default to true for testing
  return true;
}

// Get current subscription state
export function getSubscriptionState(): SubscriptionState {
  const premium = isPremium();
  return {
    tier: premium ? 'premium' : 'free',
    isActive: premium,
    entitlements: premium ? Object.values(PREMIUM_ENTITLEMENTS) : [],
  };
}

// Check specific entitlement
export function hasEntitlement(entitlement: string): boolean {
  const state = getSubscriptionState();
  return state.entitlements.includes(entitlement);
}

// Initialize RevenueCat (to be called on app start)
export async function initializeSubscriptions(): Promise<void> {
  if (!REVENUECAT_API_KEY) {
    console.log('RevenueCat not configured - using mock subscriptions');
    return;
  }

  // RevenueCat initialization will go here
  // Purchases.configure({ apiKey: REVENUECAT_API_KEY });
  console.log('RevenueCat initialized');
}

// Purchase premium subscription
export async function purchasePremium(): Promise<boolean> {
  if (!REVENUECAT_API_KEY) {
    console.log('RevenueCat not configured - simulating purchase');
    localStorage.setItem('vijnana_premium', 'true');
    return true;
  }

  try {
    // RevenueCat purchase flow will go here
    // const offerings = await Purchases.getOfferings();
    // const purchaseResult = await Purchases.purchasePackage(offerings.current.annual);
    return true;
  } catch (error) {
    console.error('Purchase failed:', error);
    return false;
  }
}

// Restore purchases
export async function restorePurchases(): Promise<boolean> {
  if (!REVENUECAT_API_KEY) {
    console.log('RevenueCat not configured - checking local storage');
    return isPremium();
  }

  try {
    // RevenueCat restore flow will go here
    // const customerInfo = await Purchases.restorePurchases();
    return true;
  } catch (error) {
    console.error('Restore failed:', error);
    return false;
  }
}

// Product pricing
export const PRICING = {
  monthly: {
    price: '$4.99',
    pricePerMonth: '$4.99',
    productId: 'com.vijnana.daily.premium.monthly',
  },
  annual: {
    price: '$39.99',
    pricePerMonth: '$3.33',
    savings: '33%',
    productId: 'com.vijnana.daily.premium.annual',
  },
};

// Free tier limits
export const FREE_LIMITS = {
  maxFavorites: 10,
  libraryTexts: ['vijnana'], // Only Vijnana Bhairava available for free
  dreamInterpretations: 0,
};


