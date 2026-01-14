// ═══════════════════════════════════════════════════════════════════════════════
// CATEGORIES PAGE
// ═══════════════════════════════════════════════════════════════════════════════

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { categories } from '@/data/categories';
import { TerminalWindow, Button } from '@/components/ui';

export default function CategoriesPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="mb-8">
          <div className="font-mono text-sm text-terminal-muted mb-2">
            <span className="text-terminal-green">$</span> tree --directories-only categories/
          </div>
          <h1 className="text-2xl md:text-3xl font-mono text-terminal-text">
            Browse Categories
          </h1>
        </div>

        {/* Category Tree Visualization */}
        <TerminalWindow title="~/categories/" className="mb-8">
          <pre className="text-terminal-green text-sm">
{`categories/
├── keyboards/
│   └── mechanical, ergonomic, wireless
├── monitors/
│   └── 4k, curved, ultrawide
├── apparel/
│   └── t-shirts, hoodies, accessories
├── hardware/
│   └── raspberry pi, arduino, dev boards
├── security/
│   └── yubikey, hardware tokens
└── accessories/
    └── mugs, mousepads, plushies`}
          </pre>
        </TerminalWindow>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link key={category.id} href={`/products?category=${category.slug}`}>
              <div className="group h-full border border-terminal-border rounded-lg overflow-hidden hover:border-terminal-green transition-all bg-terminal-bg">
                {/* Header */}
                <div className="p-4 bg-terminal-header border-b border-terminal-border flex items-center gap-3">
                  <span className="text-3xl">{category.icon}</span>
                  <div>
                    <h2 className="font-mono text-lg text-terminal-text group-hover:text-terminal-green transition-colors">
                      {category.name}
                    </h2>
                    <p className="font-mono text-xs text-terminal-muted">
                      {category.productCount} products
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <p className="font-mono text-sm text-terminal-muted mb-4">
                    {category.description}
                  </p>
                  <div className="flex items-center gap-2 text-terminal-cyan font-mono text-sm group-hover:text-terminal-green transition-colors">
                    <span>Browse {category.name}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* All Products CTA */}
        <div className="mt-12 text-center">
          <p className="font-mono text-terminal-muted mb-4">
            Or browse all products without filtering
          </p>
          <Link href="/products">
            <Button size="lg">
              $ ls -la products/ --all
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
