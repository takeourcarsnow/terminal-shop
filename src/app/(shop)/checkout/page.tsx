// ═══════════════════════════════════════════════════════════════════════════════
// CHECKOUT PAGE
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { AlertCircle } from 'lucide-react';
import { CheckoutForm, OrderSummary } from '@/components/checkout';
import { AsciiLoader } from '@/components/ui';

function CheckoutContent() {
  const searchParams = useSearchParams();
  const cancelled = searchParams.get('cancelled');

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="mb-8">
          <div className="font-mono text-sm text-terminal-muted mb-2">
            <span className="text-terminal-green">$</span> ./checkout.sh --secure
          </div>
          <h1 className="text-2xl md:text-3xl font-mono text-terminal-text">
            Checkout
          </h1>
        </div>

        {/* Cancelled Notice */}
        {cancelled && (
          <div className="mb-6 p-4 bg-terminal-yellow/10 border border-terminal-yellow rounded-lg flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-terminal-yellow" />
            <p className="font-mono text-sm text-terminal-yellow">
              Payment was cancelled. Your cart is still saved.
            </p>
          </div>
        )}

        {/* Main Content */}
        <div className="grid lg:grid-cols-[1fr_400px] gap-8">
          {/* Checkout Form */}
          <div>
            <CheckoutForm />
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen py-8">
          <div className="container mx-auto px-4">
            <AsciiLoader />
          </div>
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
