// ═══════════════════════════════════════════════════════════════════════════════
// STRIPE SERVER CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════════

import Stripe from 'stripe';

// Create Stripe instance for server-side operations
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-12-15.clover',
  typescript: true,
});

// Helper to create payment intent
export async function createPaymentIntent(
  amount: number,
  metadata?: Stripe.MetadataParam
) {
  return stripe.paymentIntents.create({
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
  return stripe.paymentIntents.retrieve(paymentIntentId);
}

// Helper to create checkout session
export async function createCheckoutSession(
  lineItems: Stripe.Checkout.SessionCreateParams.LineItem[],
  successUrl: string,
  cancelUrl: string,
  metadata?: Stripe.MetadataParam
) {
  return stripe.checkout.sessions.create({
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
