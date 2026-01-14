// ═══════════════════════════════════════════════════════════════════════════════
// PRODUCTS LIST PAGE
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { products } from '@/data/products';
import { ProductGrid, ProductFilters } from '@/components/products';
import { TerminalWindow, AsciiLoader } from '@/components/ui';

function ProductsContent() {
  const searchParams = useSearchParams();
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const category = searchParams.get('category');
  const sort = searchParams.get('sort') || 'newest';
  const search = searchParams.get('search');
  const featured = searchParams.get('featured');

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by search
    if (search) {
      const lowerSearch = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(lowerSearch) ||
          p.description.toLowerCase().includes(lowerSearch) ||
          p.tags.some((t) => t.toLowerCase().includes(lowerSearch))
      );
    }

    // Filter by category
    if (category) {
      result = result.filter((p) => p.category === category);
    }

    // Filter by featured
    if (featured === 'true') {
      result = result.filter((p) => p.featured);
    }

    // Sort
    switch (sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'newest':
      default:
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }

    return result;
  }, [category, sort, search, featured]);

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="mb-8">
          <div className="font-mono text-sm text-terminal-muted mb-2">
            <span className="text-terminal-green">$</span> ls products/
            {category && <span className="text-terminal-cyan"> --filter="{category}"</span>}
            {search && <span className="text-terminal-cyan"> | grep "{search}"</span>}
          </div>
          <h1 className="text-2xl md:text-3xl font-mono text-terminal-text">
            {category ? `/${category}` : 'All Products'}
          </h1>
          <p className="text-terminal-muted font-mono text-sm mt-1">
            {filteredProducts.length} items found
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          {/* Sidebar Filters */}
          <aside>
            <TerminalWindow title="~/filter.sh" variant="compact">
              <ProductFilters
                showMobileFilters={showMobileFilters}
                onToggleMobileFilters={() => setShowMobileFilters(!showMobileFilters)}
              />
            </TerminalWindow>
          </aside>

          {/* Product Grid */}
          <div>
            <ProductGrid products={filteredProducts} columns={3} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
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
      <ProductsContent />
    </Suspense>
  );
}
