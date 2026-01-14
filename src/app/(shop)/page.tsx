// ═══════════════════════════════════════════════════════════════════════════════
// HOME PAGE
// ═══════════════════════════════════════════════════════════════════════════════

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Terminal, Zap, Shield, Truck } from 'lucide-react';
import { products, getFeaturedProducts } from '@/data/products';
import { categories } from '@/data/categories';
import { ProductGrid } from '@/components/products';
import { Button, TerminalWindow, LogoAscii, AsciiDivider } from '@/components/ui';

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();

  return (
    <div suppressHydrationWarning={true} className="min-h-screen">
      {/* Hero Section */}
      <section className="py-12 md:py-20 border-b border-terminal-border">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left - Content */}
            <div className="space-y-6">
              <div className="font-mono text-terminal-green text-sm">
                <span className="animate-terminal-blink">█</span> system boot complete
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-mono leading-tight">
                <span className="text-terminal-text">Gear for</span>
                <br />
                <span className="text-terminal-green">Developers</span>
                <span className="text-terminal-muted">,</span>
                <br />
                <span className="text-terminal-text">by Developers</span>
              </h1>

              <p className="text-terminal-muted text-lg max-w-md font-mono">
                Premium hardware, apparel, and accessories with 
                authentic terminal aesthetics. Built for those who 
                live in the command line.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/products">
                  <Button size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                    $ browse --all
                  </Button>
                </Link>
                <Link href="/categories">
                  <Button variant="secondary" size="lg">
                    $ cat categories
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="flex gap-8 pt-6 border-t border-terminal-border">
                <div>
                  <div className="text-2xl font-mono text-terminal-green">12+</div>
                  <div className="text-sm font-mono text-terminal-muted">Products</div>
                </div>
                <div>
                  <div className="text-2xl font-mono text-terminal-green">1000+</div>
                  <div className="text-sm font-mono text-terminal-muted">Customers</div>
                </div>
                <div>
                  <div className="text-2xl font-mono text-terminal-green">99%</div>
                  <div className="text-sm font-mono text-terminal-muted">Satisfaction</div>
                </div>
              </div>
            </div>

            {/* Right - ASCII Logo */}
            <div className="hidden lg:block">
              <TerminalWindow title="~/welcome.sh">
                <LogoAscii className="text-xs xl:text-sm" />
                <div className="mt-6 space-y-2 text-sm">
                  <div className="text-terminal-muted">
                    <span className="text-terminal-green">$</span> ./init.sh
                  </div>
                  <div className="text-terminal-text">
                    Welcome to Terminal Shop v2.0.26
                  </div>
                  <div className="text-terminal-text">
                    Loading product catalog...
                  </div>
                  <div className="text-terminal-green">
                    ✓ {products.length} products loaded
                  </div>
                  <div className="text-terminal-green">
                    ✓ {categories.length} categories active
                  </div>
                  <div className="text-terminal-cyan">
                    Ready to serve requests.
                  </div>
                </div>
              </TerminalWindow>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 border-b border-terminal-border bg-terminal-header/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <FeatureCard
              icon={<Truck className="w-6 h-6" />}
              title="Free Shipping"
              description="Orders over $100"
            />
            <FeatureCard
              icon={<Shield className="w-6 h-6" />}
              title="Secure Payment"
              description="256-bit SSL"
            />
            <FeatureCard
              icon={<Zap className="w-6 h-6" />}
              title="Fast Delivery"
              description="2-5 business days"
            />
            <FeatureCard
              icon={<Terminal className="w-6 h-6" />}
              title="Dev Support"
              description="24/7 terminal help"
            />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="font-mono text-sm text-terminal-muted mb-1">
                <span className="text-terminal-green">$</span> ls featured/ --sort=popular
              </div>
              <h2 className="text-2xl md:text-3xl font-mono text-terminal-text">
                Featured Products
              </h2>
            </div>
            <Link href="/products?featured=true">
              <Button variant="secondary">View All →</Button>
            </Link>
          </div>

          <ProductGrid products={featuredProducts} columns={4} />
        </div>
      </section>

      <AsciiDivider className="container mx-auto px-4" />

      {/* Categories */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <div className="font-mono text-sm text-terminal-muted mb-1">
              <span className="text-terminal-green">$</span> tree categories/
            </div>
            <h2 className="text-2xl md:text-3xl font-mono text-terminal-text">
              Browse by Category
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link key={category.id} href={`/products?category=${category.slug}`}>
                <div className="group p-4 border border-terminal-border rounded-lg hover:border-terminal-green transition-all bg-terminal-bg hover:bg-terminal-header">
                  <div className="text-3xl mb-2">{category.icon}</div>
                  <h3 className="font-mono text-terminal-text group-hover:text-terminal-green transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-xs font-mono text-terminal-muted mt-1">
                    {category.productCount} items
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 border-t border-terminal-border bg-terminal-header/30">
        <div className="container mx-auto px-4 text-center">
          <TerminalWindow title="~/newsletter.sh" className="max-w-2xl mx-auto">
            <div className="py-8">
              <div className="text-terminal-green mb-4">
                <pre className="text-xs">
{`   _______________
  |  ___________  |
  | |           | |
  | |  JOIN US  | |
  | |___________| |
  |_______________|`}
                </pre>
              </div>
              <h3 className="text-xl font-mono text-terminal-text mb-2">
                Subscribe to our newsletter
              </h3>
              <p className="text-terminal-muted font-mono text-sm mb-6">
                Get notified about new products, deals, and developer tips.
              </p>
              <form className="flex gap-2 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="user@terminal.sh"
                  className="flex-1 bg-terminal-bg border border-terminal-border rounded px-4 py-2 font-mono focus:outline-none focus:border-terminal-green"
                />
                <Button type="submit">Subscribe</Button>
              </form>
              <p className="text-xs font-mono text-terminal-muted mt-4">
                $ echo "No spam, unsubscribe anytime"
              </p>
            </div>
          </TerminalWindow>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center text-center p-4">
      <div className="text-terminal-green mb-2">{icon}</div>
      <h3 className="font-mono text-sm text-terminal-text">{title}</h3>
      <p className="font-mono text-xs text-terminal-muted">{description}</p>
    </div>
  );
}
