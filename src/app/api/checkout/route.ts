// ═══════════════════════════════════════════════════════════════════════════════
// CHECKOUT API ROUTE
// ═══════════════════════════════════════════════════════════════════════════════

import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe - use empty string if not configured (for demo)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_demo', {
  apiVersion: '2025-12-15.clover',
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, customerEmail, customerName, shippingAddress } = body;

    // Validate request
    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'No items in cart' },
        { status: 400 }
      );
    }

    // Calculate totals
    const subtotal = items.reduce(
      (sum: number, item: { price: number; quantity: number }) =>
        sum + item.price * item.quantity,
      0
    );
    const tax = Math.round(subtotal * 0.1);
    const shipping = subtotal >= 10000 ? 0 : 999;
    const total = subtotal + tax + shipping;

    // Create line items for Stripe
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map(
      (item: { name: string; price: number; quantity: number }) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
          },
          unit_amount: item.price,
        },
        quantity: item.quantity,
      })
    );

    // Add tax as a line item
    lineItems.push({
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'Tax (10%)',
        },
        unit_amount: tax,
      },
      quantity: 1,
    });

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/checkout?cancelled=true`,
      customer_email: customerEmail,
      metadata: {
        customerName,
        shippingAddress: JSON.stringify(shippingAddress),
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: shipping,
              currency: 'usd',
            },
            display_name: shipping === 0 ? 'Free Shipping' : 'Standard Shipping',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 5 },
              maximum: { unit: 'business_day', value: 7 },
            },
          },
        },
      ],
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    
    // Return demo URL if Stripe is not configured
    if ((error as Error).message?.includes('Invalid API Key')) {
      return NextResponse.json({
        url: '/checkout/success?demo=true',
        message: 'Demo mode - Stripe not configured',
      });
    }

    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
