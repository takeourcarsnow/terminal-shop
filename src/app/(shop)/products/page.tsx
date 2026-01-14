// ═══════════════════════════════════════════════════════════════════════════════
// PRODUCTS LIST PAGE
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import React, { useState, useMemo, Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { products } from '@/data/products';
import { ProductGrid, ProductFilters } from '@/components/products';
import { TerminalWindow, ProductGridSkeleton } from '@/components/ui';

function ProductsContent() {
  const searchParams = useSearchParams();
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const category = searchParams.get('category');
  const sort = searchParams.get('sort') || 'newest';
  const search = searchParams.get('search');
  const featured = searchParams.get('featured');

  const filteredProducts = useMemo(() => {
    // Simulate loading delay for demo
    setIsLoading(true);

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

    // Simulate async operation
    setTimeout(() => setIsLoading(false), 300);

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
            {isLoading ? 'Loading...' : `${filteredProducts.length} items found`}
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
            {isLoading ? (
              <ProductGridSkeleton count={6} />
            ) : (
              <ProductGrid products={filteredProducts} columns={3} />
            )}
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
            <div className="mb-8">
              <div className="font-mono text-sm text-terminal-muted mb-2">
                <span className="text-terminal-green">$</span> ls products/
              </div>
              <h1 className="text-2xl md:text-3xl font-mono text-terminal-text">
                All Products
              </h1>
              <p className="text-terminal-muted font-mono text-sm mt-1">
                Loading...
              </p>
            </div>
            <div className="grid lg:grid-cols-[280px_1fr] gap-8">
              <aside>
                <div className="bg-terminal-header border border-terminal-border rounded-lg p-4">
                  <div className="animate-pulse space-y-4">
                    <div className="h-4 bg-terminal-border rounded w-3/4"></div>
                    <div className="space-y-2">
                      <div className="h-3 bg-terminal-border rounded"></div>
                      <div className="h-3 bg-terminal-border rounded w-5/6"></div>
                      <div className="h-3 bg-terminal-border rounded w-4/6"></div>
                    </div>
                  </div>
                </div>
              </aside>
              <div>
                <ProductGridSkeleton count={6} />
              </div>
            </div>
          </div>
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}
