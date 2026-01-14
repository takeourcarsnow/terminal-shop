// ═══════════════════════════════════════════════════════════════════════════════
// PRODUCT DETAIL PAGE
// ═══════════════════════════════════════════════════════════════════════════════

import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { products, getProductBySlug, getProductsByCategory } from '@/data/products';
import { ProductDetail, ProductDescription, ProductGrid } from '@/components/products';
import { TerminalWindow, AsciiDivider } from '@/components/ui';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Get related products from same category
  const relatedProducts = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm font-mono text-terminal-muted mb-8">
          <Link href="/" className="hover:text-terminal-green transition-colors">
            ~
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/products" className="hover:text-terminal-green transition-colors">
            products
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link
            href={`/products?category=${product.category}`}
            className="hover:text-terminal-green transition-colors"
          >
            {product.category}
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-terminal-text">{product.slug}</span>
        </nav>

        {/* Product Detail */}
        <ProductDetail product={product} />

        {/* Product Description */}
        <div className="mt-12">
          <h2 className="text-xl font-mono text-terminal-text mb-4">
            <span className="text-terminal-green">$</span> cat product_info.txt
          </h2>
          <ProductDescription product={product} />
        </div>

        <AsciiDivider className="my-12" />

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <div className="mb-6">
              <div className="font-mono text-sm text-terminal-muted mb-1">
                <span className="text-terminal-green">$</span> find . -category="{product.category}" --limit=4
              </div>
              <h2 className="text-xl font-mono text-terminal-text">
                Related Products
              </h2>
            </div>
            <ProductGrid products={relatedProducts} columns={4} />
          </section>
        )}
      </div>
    </div>
  );
}
