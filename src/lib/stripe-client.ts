// ═══════════════════════════════════════════════════════════════════════════════
// STRIPE CLIENT CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════════

import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
    );
  }
  return stripePromise;
};

export const STRIPE_CONFIG = {
  // Shipping rates
  shipping: {
    standard: {
      id: 'standard',
      name: 'Standard Shipping',
      price: 999,
      estimatedDays: '5-7',
    },
    express: {
      id: 'express',
      name: 'Express Shipping',
      price: 1999,
      estimatedDays: '2-3',
    },
    overnight: {
      id: 'overnight',
      name: 'Overnight Shipping',
      price: 3999,
      estimatedDays: '1',
    },
  },
  
  // Free shipping threshold (in cents)
  freeShippingThreshold: 10000,
  
  // Tax rate (10%)
  taxRate: 0.1,
};
