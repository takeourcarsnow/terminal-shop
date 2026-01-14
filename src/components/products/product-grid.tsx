// ═══════════════════════════════════════════════════════════════════════════════
// PRODUCT GRID COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import React from 'react';
import { Product } from '@/types';
import { ProductCard } from './product-card';
import { cn } from '@/lib/utils';

interface ProductGridProps {
  products: Product[];
  columns?: 2 | 3 | 4;
  className?: string;
}

export function ProductGrid({ products, columns = 3, className }: ProductGridProps) {
  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="font-mono text-terminal-muted mb-4">
          <div>┌──────────────────────────────┐</div>
          <div>│     No products found        │</div>
          <div>│     Try a different search   │</div>
          <div>└──────────────────────────────┘</div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('grid gap-6', gridCols[columns], className)}>
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
}
