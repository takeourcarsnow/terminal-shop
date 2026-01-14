// ═══════════════════════════════════════════════════════════════════════════════
// CHECKOUT SUCCESS PAGE
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import React, { useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Package, Mail, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store';
import { Button, TerminalWindow, AsciiLoader } from '@/components/ui';

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const isDemo = searchParams.get('demo');
  const { clearCart } = useCartStore();

  // Clear cart on successful payment
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <TerminalWindow title="~/orders/success.log">
          <div className="text-center py-8">
            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-terminal-green/20 flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-terminal-green" />
              </div>
            </div>

            {/* Success Message */}
            <div className="font-mono text-terminal-green mb-2">
              ✓ PAYMENT SUCCESSFUL
            </div>
            <h1 className="text-2xl md:text-3xl font-mono text-terminal-text mb-4">
              Thank you for your order!
            </h1>

            {/* ASCII Art Celebration */}
            <pre className="text-terminal-green text-xs mb-6 inline-block">
{`
   ★  ★     ★
     \\|/
   ★ -●- ★
     /|\\
   ★     ★  ★
`}
            </pre>

            {/* Order Details */}
            <div className="bg-terminal-header border border-terminal-border rounded-lg p-4 mb-6 text-left">
              <div className="space-y-3 font-mono text-sm">
                {isDemo ? (
                  <>
                    <div className="text-terminal-yellow">
                      ⚠ Demo Mode - Stripe not configured
                    </div>
                    <div className="text-terminal-muted">
                      In production, this would process a real payment.
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between">
                      <span className="text-terminal-muted">Session ID:</span>
                      <span className="text-terminal-cyan truncate ml-4">
                        {sessionId?.slice(0, 20)}...
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-terminal-muted">Status:</span>
                      <span className="text-terminal-green">CONFIRMED</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* What's Next */}
            <div className="grid md:grid-cols-2 gap-4 mb-8 text-left">
              <div className="p-4 border border-terminal-border rounded-lg">
                <Mail className="w-6 h-6 text-terminal-cyan mb-2" />
                <h3 className="font-mono text-terminal-text mb-1">
                  Confirmation Email
                </h3>
                <p className="font-mono text-xs text-terminal-muted">
                  You'll receive an order confirmation with tracking details.
                </p>
              </div>
              <div className="p-4 border border-terminal-border rounded-lg">
                <Package className="w-6 h-6 text-terminal-cyan mb-2" />
                <h3 className="font-mono text-terminal-text mb-1">
                  Shipping Updates
                </h3>
                <p className="font-mono text-xs text-terminal-muted">
                  We'll notify you when your order ships with tracking info.
                </p>
              </div>
            </div>

            {/* Terminal Output */}
            <div className="bg-terminal-bg border border-terminal-border rounded-lg p-4 text-left mb-8">
              <div className="font-mono text-sm">
                <div className="text-terminal-green">$ process_order.sh</div>
                <div className="text-terminal-muted mt-2">Processing payment...</div>
                <div className="text-terminal-green">✓ Payment authorized</div>
                <div className="text-terminal-green">✓ Order created</div>
                <div className="text-terminal-green">✓ Confirmation sent</div>
                <div className="text-terminal-green">✓ Added to shipping queue</div>
                <div className="text-terminal-cyan mt-2">
                  Order complete! Thank you for shopping with Terminal Shop.
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button icon={<ArrowRight className="w-4 h-4" />}>
                  Continue Shopping
                </Button>
              </Link>
              <Link href="/">
                <Button variant="secondary">
                  Return Home
                </Button>
              </Link>
            </div>
          </div>
        </TerminalWindow>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
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
      <SuccessContent />
    </Suspense>
  );
}
