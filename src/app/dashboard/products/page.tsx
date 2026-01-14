// ═══════════════════════════════════════════════════════════════════════════════
// DASHBOARD PRODUCTS PAGE
// ═══════════════════════════════════════════════════════════════════════════════

import React from 'react';
import { products } from '@/data/products';
import { ProductTable } from '@/components/dashboard';

export default function DashboardProductsPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <div className="font-mono text-sm text-terminal-muted mb-2">
          <span className="text-terminal-green">admin@terminal-shop:~$</span> ls -la products/
        </div>
        <h1 className="text-2xl md:text-3xl font-mono text-terminal-text">
          Product Management
        </h1>
        <p className="text-terminal-muted font-mono text-sm mt-1">
          Manage your product catalog
        </p>
      </div>

      {/* Product Table */}
      <ProductTable products={products} />
    </div>
  );
}
