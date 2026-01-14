// ═══════════════════════════════════════════════════════════════════════════════
// STRIPE SERVER CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════════

import Stripe from 'stripe';

export function getStripe() {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) return null;
  return new Stripe(secret, {
    apiVersion: '2025-12-15.clover',
    typescript: true,
  });
}

// Helper to create payment intent
export async function createPaymentIntent(
  amount: number,
  metadata?: Stripe.MetadataParam
) {
  const s = getStripe();
  if (!s) {
    throw new Error('Stripe is not configured (missing STRIPE_SECRET_KEY)');
  }

  return s.paymentIntents.create({
    amount,
    currency: 'usd',
    automatic_payment_methods: {
      enabled: true,
    },
    metadata,
  });
}

// Helper to retrieve payment intent
export async function retrievePaymentIntent(paymentIntentId: string) {
  const s = getStripe();
  if (!s) {
    throw new Error('Stripe is not configured (missing STRIPE_SECRET_KEY)');
  }
  return s.paymentIntents.retrieve(paymentIntentId);
}

// Helper to create checkout session
export async function createCheckoutSession(
  lineItems: Stripe.Checkout.SessionCreateParams.LineItem[],
  successUrl: string,
  cancelUrl: string,
  metadata?: Stripe.MetadataParam
) {
  const s = getStripe();
  if (!s) {
    throw new Error('Stripe is not configured (missing STRIPE_SECRET_KEY)');
  }

  return s.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata,
    shipping_address_collection: {
      allowed_countries: ['US', 'CA', 'GB', 'AU', 'DE', 'FR', 'JP'],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 999,
            currency: 'usd',
          },
          display_name: 'Standard Shipping',
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 5,
            },
            maximum: {
              unit: 'business_day',
              value: 7,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 1999,
            currency: 'usd',
          },
          display_name: 'Express Shipping',
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 2,
            },
            maximum: {
              unit: 'business_day',
              value: 3,
            },
          },
        },
      },
    ],
  });
}
