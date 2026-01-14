// ═══════════════════════════════════════════════════════════════════════════════
// PRODUCT DETAIL COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Minus, Plus, Heart, Share2, Truck, Shield, RotateCcw } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice, cn } from '@/lib/utils';
import { useCartStore } from '@/store';
import { Button, Badge, StockBadge, TerminalWindow, AsciiArt } from '@/components/ui';
import { useToast } from '@/components/ui/toast';

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const { addItem, openCart } = useCartStore();
  const { addToast } = useToast();

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addItem(product, quantity);
    addToast('success', 'Added to cart', `${product.name} x${quantity}`);
    openCart();
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
      {/* Left - Product Image/ASCII */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <TerminalWindow title={`~/products/${product.slug}`}>
          <div className="aspect-square flex items-center justify-center bg-terminal-header/50 rounded">
            {product.ascii_art ? (
              <AsciiArt
                art={product.ascii_art}
                color="green"
                className="text-xs md:text-sm"
              />
            ) : (
              <div className="text-6xl">📦</div>
            )}
          </div>
          
          {/* Image Thumbnails Placeholder */}
          <div className="flex gap-2 mt-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={cn(
                  'w-16 h-16 rounded border flex items-center justify-center cursor-pointer',
                  i === 1
                    ? 'border-terminal-green bg-terminal-header'
                    : 'border-terminal-border hover:border-terminal-green'
                )}
              >
                <span className="text-xs font-mono text-terminal-muted">img_{i}</span>
              </div>
            ))}
          </div>
        </TerminalWindow>
      </motion.div>

      {/* Right - Product Info */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-6"
      >
        {/* Breadcrumb */}
        <div className="font-mono text-sm text-terminal-muted">
          <span className="text-terminal-green">$</span> pwd
          <div className="mt-1">
            ~/shop/{product.category}/{product.slug}
          </div>
        </div>

        {/* Badges */}
        <div className="flex gap-2">
          {product.featured && (
            <Badge variant="success">FEATURED</Badge>
          )}
          {discount > 0 && (
            <Badge variant="warning">-{discount}% OFF</Badge>
          )}
          <StockBadge stock={product.stock} />
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-mono text-terminal-text">
          {product.name}
        </h1>

        {/* Price */}
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-mono text-terminal-green">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <>
              <span className="text-xl font-mono text-terminal-muted line-through">
                {formatPrice(product.originalPrice)}
              </span>
              <span className="text-terminal-yellow text-sm font-mono">
                Save {formatPrice(product.originalPrice - product.price)}
              </span>
            </>
          )}
        </div>

        {/* Short Description */}
        <p className="font-mono text-terminal-muted">
          {product.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs font-mono text-terminal-cyan border border-terminal-cyan/30 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Quantity Selector */}
        <div className="space-y-2">
          <label className="font-mono text-sm text-terminal-muted">
            Quantity:
          </label>
          <div className="flex items-center gap-4">
            <div className="flex items-center border border-terminal-border rounded">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 flex items-center justify-center hover:bg-terminal-header transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-16 text-center font-mono">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="w-10 h-10 flex items-center justify-center hover:bg-terminal-header transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <span className="text-sm font-mono text-terminal-muted">
              {product.stock} available
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            icon={<ShoppingCart className="w-4 h-4" />}
            className="flex-1"
            size="lg"
          >
            {product.stock === 0 ? 'Out of Stock' : `Add to Cart - ${formatPrice(product.price * quantity)}`}
          </Button>
          <Button variant="secondary" size="lg" className="px-4">
            <Heart className="w-5 h-5" />
          </Button>
          <Button variant="secondary" size="lg" className="px-4">
            <Share2 className="w-5 h-5" />
          </Button>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-terminal-border">
          <div className="text-center">
            <Truck className="w-6 h-6 mx-auto text-terminal-green mb-2" />
            <div className="text-xs font-mono text-terminal-muted">
              Free shipping<br />over $100
            </div>
          </div>
          <div className="text-center">
            <Shield className="w-6 h-6 mx-auto text-terminal-green mb-2" />
            <div className="text-xs font-mono text-terminal-muted">
              1 Year<br />Warranty
            </div>
          </div>
          <div className="text-center">
            <RotateCcw className="w-6 h-6 mx-auto text-terminal-green mb-2" />
            <div className="text-xs font-mono text-terminal-muted">
              30 Day<br />Returns
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Product Description Tab
export function ProductDescription({ product }: { product: Product }) {
  return (
    <TerminalWindow title="cat description.txt">
      <pre className="font-mono text-sm text-terminal-text whitespace-pre-wrap">
        {product.longDescription}
      </pre>
    </TerminalWindow>
  );
}
