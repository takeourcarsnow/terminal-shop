// ═══════════════════════════════════════════════════════════════════════════════
// PRODUCT CARD COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingCart, Eye } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice, cn, truncate } from '@/lib/utils';
import { useCartStore } from '@/store';
import { Button, Badge, StockBadge, AsciiArt, useToast } from '@/components/ui';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem, openCart } = useCartStore();
  const { showToast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    
    // Show success toast
    showToast(`${product.name} added to cart!`, 'success');
    
    openCart();
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      suppressHydrationWarning={true}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Link href={`/products/${product.slug}`}>
        <div
          className={cn(
            'group border border-terminal-border rounded-lg overflow-hidden',
            'bg-terminal-bg hover:border-terminal-green transition-all duration-300',
            'hover:shadow-lg hover:shadow-terminal-green/10'
          )}
        >
          {/* Image Area */}
          <div className="relative aspect-square bg-terminal-header p-4 flex items-center justify-center overflow-hidden">
            {/* ASCII Art Background */}
            {product.ascii_art && (
              <AsciiArt
                art={product.ascii_art}
                color="green"
                className="opacity-80 group-hover:opacity-100 transition-opacity text-[8px] md:text-xs"
              />
            )}

            {/* Badges */}
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {product.featured && (
                <Badge variant="success" size="sm">
                  FEATURED
                </Badge>
              )}
              {discount > 0 && (
                <Badge variant="warning" size="sm">
                  -{discount}%
                </Badge>
              )}
            </div>

            {/* Quick Actions */}
            <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                className="w-8 h-8 bg-terminal-bg border border-terminal-border rounded flex items-center justify-center hover:border-terminal-green hover:text-terminal-green transition-colors"
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 border-t border-terminal-border">
            {/* Category */}
            <div className="text-terminal-cyan text-xs font-mono uppercase tracking-wider mb-1">
              /{product.category}
            </div>

            {/* Name */}
            <h3 className="font-mono text-terminal-text group-hover:text-terminal-green transition-colors mb-2">
              {truncate(product.name, 30)}
            </h3>

            {/* Description */}
            <p className="text-terminal-muted text-xs font-mono mb-3 line-clamp-2">
              {product.description}
            </p>

            {/* Price & Stock */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-lg text-terminal-green">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="font-mono text-sm text-terminal-muted line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
              <StockBadge stock={product.stock} />
            </div>

            {/* Add to Cart */}
            <Button
              onClick={handleAddToCart}
              className="w-full"
              disabled={product.stock === 0}
              icon={<ShoppingCart className="w-4 h-4" />}
            >
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// Compact variant for sidebars
export function ProductCardCompact({ product }: { product: Product }) {
  const { addItem } = useCartStore();
  const { showToast } = useToast();

  const handleAddToCart = () => {
    addItem(product);
    showToast(`${product.name} added to cart!`, 'success');
  };

  return (
    <div className="flex gap-3 p-3 border border-terminal-border rounded-lg hover:border-terminal-green transition-colors">
      <div className="w-16 h-16 bg-terminal-header rounded flex items-center justify-center shrink-0">
        <span className="text-xl">📦</span>
      </div>
      <div className="flex-1 min-w-0">
        <Link href={`/products/${product.slug}`}>
          <h4 className="font-mono text-sm text-terminal-text hover:text-terminal-green truncate">
            {product.name}
          </h4>
        </Link>
        <p className="text-terminal-green font-mono text-sm mt-1">
          {formatPrice(product.price)}
        </p>
        <button
          onClick={handleAddToCart}
          className="text-xs font-mono text-terminal-cyan hover:text-terminal-green transition-colors"
        >
          + Add to cart
        </button>
      </div>
    </div>
  );
}
