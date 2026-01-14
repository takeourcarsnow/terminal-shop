// ═══════════════════════════════════════════════════════════════════════════════
// CART DRAWER COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store';
import { formatPrice, cn } from '@/lib/utils';
import { Button } from '@/components/ui';

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    getSubtotal,
    getTax,
    getShipping,
    getTotal,
    clearCart,
  } = useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-terminal-bg border-l border-terminal-border z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-terminal-border bg-terminal-header">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-terminal-red" />
                  <div className="w-2.5 h-2.5 rounded-full bg-terminal-yellow" />
                  <div className="w-2.5 h-2.5 rounded-full bg-terminal-green" />
                </div>
                <h2 className="font-mono text-terminal-text ml-2">
                  ~/cart ({items.length} items)
                </h2>
              </div>
              <Button variant="ghost" size="sm" onClick={closeCart} className="p-1">
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="w-16 h-16 text-terminal-muted mb-4" />
                  <p className="font-mono text-terminal-muted mb-2">
                    $ ls cart/
                  </p>
                  <p className="font-mono text-terminal-text mb-4">
                    No items found.
                  </p>
                  <Button onClick={closeCart}>
                    <Link href="/products">Browse Products</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <CartItem
                      key={item.product.id}
                      item={item}
                      onUpdateQuantity={(qty) => updateQuantity(item.product.id, qty)}
                      onRemove={() => removeItem(item.product.id)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-terminal-border p-4 bg-terminal-header">
                {/* Totals */}
                <div className="space-y-2 font-mono text-sm mb-4">
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
                  <div className="flex justify-between text-terminal-text text-lg">
                    <span>Total:</span>
                    <span className="text-terminal-green">{formatPrice(getTotal())}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  <Link href="/checkout" onClick={closeCart} className="block">
                    <Button className="w-full">
                      $ checkout --proceed
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    className="w-full text-terminal-red"
                    onClick={clearCart}
                  >
                    $ rm -rf cart/*
                  </Button>
                </div>

                {/* Free shipping notice */}
                {getSubtotal() < 10000 && (
                  <p className="text-xs font-mono text-terminal-muted mt-4 text-center">
                    Add {formatPrice(10000 - getSubtotal())} more for free shipping!
                  </p>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

interface CartItemProps {
  item: {
    product: {
      id: string;
      name: string;
      price: number;
      originalPrice?: number;
      images: string[];
    };
    quantity: number;
  };
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
}

function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  return (
    <div className="border border-terminal-border rounded-lg p-3 bg-terminal-bg">
      <div className="flex gap-3">
        {/* Product Image Placeholder */}
        <div className="w-16 h-16 bg-terminal-header rounded border border-terminal-border flex items-center justify-center shrink-0">
          <span className="text-2xl">📦</span>
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <h3 className="font-mono text-sm text-terminal-text truncate">
            {item.product.name}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="font-mono text-terminal-green">
              {formatPrice(item.product.price)}
            </span>
            {item.product.originalPrice && (
              <span className="font-mono text-xs text-terminal-muted line-through">
                {formatPrice(item.product.originalPrice)}
              </span>
            )}
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => onUpdateQuantity(item.quantity - 1)}
                className={cn(
                  'w-6 h-6 flex items-center justify-center rounded border border-terminal-border',
                  'hover:border-terminal-green hover:text-terminal-green transition-colors'
                )}
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="font-mono text-sm w-8 text-center">
                {item.quantity}
              </span>
              <button
                onClick={() => onUpdateQuantity(item.quantity + 1)}
                className={cn(
                  'w-6 h-6 flex items-center justify-center rounded border border-terminal-border',
                  'hover:border-terminal-green hover:text-terminal-green transition-colors'
                )}
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
            <button
              onClick={onRemove}
              className="text-terminal-muted hover:text-terminal-red transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
