// ═══════════════════════════════════════════════════════════════════════════════
// ORDER SUMMARY COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import React from 'react';
import Link from 'next/link';
import { Edit3 } from 'lucide-react';
import { useCartStore } from '@/store';
import { formatPrice } from '@/lib/utils';
import { TerminalWindow, Button } from '@/components/ui';

export function OrderSummary() {
  const { items, getSubtotal, getTax, getShipping, getTotal } = useCartStore();

  return (
    <TerminalWindow title="~/cart/summary.txt">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center pb-3 border-b border-terminal-border">
          <span className="font-mono text-terminal-muted">
            Order Summary ({items.length} items)
          </span>
          <Link href="/cart">
            <Button variant="ghost" size="sm">
              <Edit3 className="w-4 h-4 mr-1" />
              Edit
            </Button>
          </Link>
        </div>

        {/* Items */}
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="flex justify-between items-start text-sm font-mono"
            >
              <div className="flex-1">
                <span className="text-terminal-text">{item.product.name}</span>
                <span className="text-terminal-muted ml-2">x{item.quantity}</span>
              </div>
              <span className="text-terminal-green ml-4">
                {formatPrice(item.product.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="pt-4 border-t border-terminal-border space-y-2 font-mono text-sm">
          <div className="flex justify-between text-terminal-muted">
            <span>Subtotal:</span>
            <span>{formatPrice(getSubtotal())}</span>
          </div>
          <div className="flex justify-between text-terminal-muted">
            <span>Tax (10%):</span>
            <span>{formatPrice(getTax())}</span>
          </div>
          <div className="flex justify-between text-terminal-muted">
            <span>Shipping:</span>
            <span>
              {getShipping() === 0 ? (
                <span className="text-terminal-green">FREE</span>
              ) : (
                formatPrice(getShipping())
              )}
            </span>
          </div>
          <div className="h-px bg-terminal-border my-2" />
          <div className="flex justify-between text-lg">
            <span className="text-terminal-text">Total:</span>
            <span className="text-terminal-green">{formatPrice(getTotal())}</span>
          </div>
        </div>

        {/* Promo Code */}
        <div className="pt-4 border-t border-terminal-border">
          <div className="font-mono text-xs text-terminal-muted mb-2">
            $ apply --promo-code
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="PROMO_CODE"
              className="flex-1 bg-terminal-bg border border-terminal-border rounded px-3 py-2 font-mono text-sm focus:outline-none focus:border-terminal-green"
            />
            <Button variant="secondary" size="sm">
              Apply
            </Button>
          </div>
        </div>

        {/* Shipping Notice */}
        {getSubtotal() < 10000 && (
          <div className="text-xs font-mono text-terminal-yellow bg-terminal-yellow/10 border border-terminal-yellow/30 rounded p-3">
            ⚠ Add {formatPrice(10000 - getSubtotal())} more for FREE shipping!
          </div>
        )}
      </div>
    </TerminalWindow>
  );
}
