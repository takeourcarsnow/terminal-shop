// ═══════════════════════════════════════════════════════════════════════════════
// PRODUCT FILTERS COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Filter, X } from 'lucide-react';
import { categories } from '@/data/categories';
import { Button, Select } from '@/components/ui';
import { cn } from '@/lib/utils';

interface ProductFiltersProps {
  showMobileFilters?: boolean;
  onToggleMobileFilters?: () => void;
}

export function ProductFilters({
  showMobileFilters,
  onToggleMobileFilters,
}: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const currentCategory = searchParams.get('category') || '';
  const currentSort = searchParams.get('sort') || 'newest';
  const currentSearch = searchParams.get('search') || '';

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/products?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push('/products');
  };

  const hasActiveFilters = currentCategory || currentSearch;

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'name-asc', label: 'Name: A to Z' },
    { value: 'name-desc', label: 'Name: Z to A' },
  ];

  const categoryOptions = [
    { value: '', label: 'All Categories' },
    ...categories.map(cat => ({ value: cat.slug, label: cat.name })),
  ];

  return (
    <div className="space-y-4">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden">
        <Button
          variant="secondary"
          onClick={onToggleMobileFilters}
          icon={<Filter className="w-4 h-4" />}
          className="w-full"
        >
          {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
        </Button>
      </div>

      {/* Filters */}
      <div
        className={cn(
          'space-y-4',
          'lg:block',
          showMobileFilters ? 'block' : 'hidden lg:block'
        )}
      >
        {/* Terminal Header */}
        <div className="font-mono text-sm text-terminal-muted border-b border-terminal-border pb-2">
          <span className="text-terminal-green">$</span> ./filter.sh --interactive
        </div>

        {/* Category Filter */}
        <div>
          <label className="block font-mono text-xs text-terminal-muted uppercase tracking-wider mb-2">
            --category
          </label>
          <Select
            options={categoryOptions}
            value={currentCategory}
            onChange={(e) => updateFilters('category', e.target.value)}
          />
        </div>

        {/* Sort */}
        <div>
          <label className="block font-mono text-xs text-terminal-muted uppercase tracking-wider mb-2">
            --sort-by
          </label>
          <Select
            options={sortOptions}
            value={currentSort}
            onChange={(e) => updateFilters('sort', e.target.value)}
          />
        </div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="pt-4 border-t border-terminal-border">
            <div className="font-mono text-xs text-terminal-muted mb-2">
              Active filters:
            </div>
            <div className="flex flex-wrap gap-2">
              {currentCategory && (
                <button
                  onClick={() => updateFilters('category', '')}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-terminal-header border border-terminal-border rounded text-xs font-mono hover:border-terminal-red hover:text-terminal-red transition-colors"
                >
                  category:{currentCategory}
                  <X className="w-3 h-3" />
                </button>
              )}
              {currentSearch && (
                <button
                  onClick={() => updateFilters('search', '')}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-terminal-header border border-terminal-border rounded text-xs font-mono hover:border-terminal-red hover:text-terminal-red transition-colors"
                >
                  search:{currentSearch}
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="mt-2 text-terminal-red"
            >
              Clear all filters
            </Button>
          </div>
        )}

        {/* Categories List */}
        <div className="pt-4 border-t border-terminal-border">
          <div className="font-mono text-xs text-terminal-muted uppercase tracking-wider mb-3">
            Browse categories:
          </div>
          <div className="space-y-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => updateFilters('category', cat.slug)}
                className={cn(
                  'w-full text-left px-3 py-2 rounded font-mono text-sm transition-colors',
                  currentCategory === cat.slug
                    ? 'bg-terminal-green text-terminal-bg'
                    : 'text-terminal-muted hover:bg-terminal-header hover:text-terminal-text'
                )}
              >
                <span className="mr-2">{cat.icon}</span>
                {cat.name}
                <span className="float-right text-xs">
                  ({cat.productCount})
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
