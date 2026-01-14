// ═══════════════════════════════════════════════════════════════════════════════
// HEADER COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ShoppingCart, 
  Menu, 
  X, 
  Terminal, 
  Sun, 
  Moon,
  User,
  Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useCartStore, useThemeStore } from '@/store';
import { Button } from '@/components/ui';

const navItems = [
  { href: '/', label: 'home', command: '~' },
  { href: '/products', label: 'products', command: 'ls' },
  { href: '/categories', label: 'categories', command: 'cat' },
  { href: '/about', label: 'about', command: 'man' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const { getTotalItems, openCart } = useCartStore();
  const { theme, toggleTheme } = useThemeStore();
  const cartCount = getTotalItems();

  return (
    <header suppressHydrationWarning={true} className="sticky top-0 z-40 bg-terminal-bg/95 backdrop-blur border-b border-terminal-border">
      {/* Top Bar - ASCII decoration */}
      <div className="hidden md:block text-terminal-muted text-xs font-mono text-center py-1 border-b border-terminal-border/50 bg-terminal-header">
        ═══════════════════════════════════════ TERMINAL.SHOP v2.0.26 ═══════════════════════════════════════
      </div>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Terminal className="w-6 h-6 text-terminal-green" />
            <span className="font-mono text-lg hidden sm:block">
              <span className="text-terminal-green">terminal</span>
              <span className="text-terminal-muted">.</span>
              <span className="text-terminal-text">shop</span>
            </span>
            <span className="text-terminal-green animate-terminal-blink hidden sm:inline">█</span>
          </Link>

          {/* Desktop Navigation */}
          <nav id="navigation" className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'px-4 py-2 font-mono text-sm transition-colors rounded',
                  'hover:bg-terminal-header hover:text-terminal-green',
                  pathname === item.href
                    ? 'text-terminal-green bg-terminal-header'
                    : 'text-terminal-muted'
                )}
              >
                <span className="text-terminal-cyan">{item.command}</span>
                <span className="text-terminal-muted mx-1">→</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Search Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2"
            >
              <Search className="w-5 h-5" />
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="p-2"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>

            {/* Dashboard Link */}
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="p-2 hidden sm:flex">
                <User className="w-5 h-5" />
              </Button>
            </Link>

            {/* Cart */}
            <Button
              variant="ghost"
              size="sm"
              onClick={openCart}
              className="p-2 relative"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-terminal-green text-terminal-bg text-xs font-mono rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 md:hidden"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="py-4 border-t border-terminal-border">
                <form action="/products" className="flex gap-2">
                  <div className="flex-1 relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-terminal-green font-mono">
                      $
                    </span>
                    <input
                      type="text"
                      name="search"
                      placeholder="grep -i 'product name'"
                      className="w-full bg-terminal-bg border border-terminal-border rounded pl-8 pr-4 py-2 font-mono text-sm focus:outline-none focus:border-terminal-green"
                    />
                  </div>
                  <Button type="submit">Search</Button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-terminal-bg border-t border-terminal-border"
          >
            <nav className="container mx-auto px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'block px-4 py-3 font-mono text-sm rounded',
                    'hover:bg-terminal-header',
                    pathname === item.href
                      ? 'text-terminal-green bg-terminal-header'
                      : 'text-terminal-muted'
                  )}
                >
                  <span className="text-terminal-cyan">{item.command}</span>
                  <span className="mx-2">→</span>
                  <span>{item.label}</span>
                </Link>
              ))}
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 font-mono text-sm rounded hover:bg-terminal-header text-terminal-muted"
              >
                <span className="text-terminal-cyan">sudo</span>
                <span className="mx-2">→</span>
                <span>dashboard</span>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
