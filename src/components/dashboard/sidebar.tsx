// ═══════════════════════════════════════════════════════════════════════════════
// DASHBOARD SIDEBAR COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  BarChart2,
  Tag,
  Terminal,
  LogOut,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  {
    href: '/dashboard',
    label: 'Overview',
    icon: LayoutDashboard,
    command: 'stats',
  },
  {
    href: '/dashboard/products',
    label: 'Products',
    icon: Package,
    command: 'ls products/',
  },
  {
    href: '/dashboard/orders',
    label: 'Orders',
    icon: ShoppingCart,
    command: 'ls orders/',
  },
  {
    href: '/dashboard/customers',
    label: 'Customers',
    icon: Users,
    command: 'ls users/',
  },
  {
    href: '/dashboard/categories',
    label: 'Categories',
    icon: Tag,
    command: 'cat tags',
  },
  {
    href: '/dashboard/analytics',
    label: 'Analytics',
    icon: BarChart2,
    command: './analytics.sh',
  },
  {
    href: '/dashboard/settings',
    label: 'Settings',
    icon: Settings,
    command: 'vim config',
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-terminal-bg border-r border-terminal-border h-screen sticky top-0 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-terminal-border">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Terminal className="w-6 h-6 text-terminal-green" />
          <span className="font-mono">
            <span className="text-terminal-green">admin</span>
            <span className="text-terminal-muted">@</span>
            <span className="text-terminal-text">terminal.shop</span>
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <div className="font-mono text-xs text-terminal-muted uppercase tracking-wider mb-3">
          Navigation
        </div>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded font-mono text-sm transition-colors',
                isActive
                  ? 'bg-terminal-green text-terminal-bg'
                  : 'text-terminal-muted hover:bg-terminal-header hover:text-terminal-text'
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span className="flex-1">{item.label}</span>
              <span
                className={cn(
                  'text-xs',
                  isActive ? 'text-terminal-bg/70' : 'text-terminal-border'
                )}
              >
                {item.command}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-terminal-border">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2 rounded font-mono text-sm text-terminal-muted hover:bg-terminal-header hover:text-terminal-text transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Exit Dashboard</span>
        </Link>
        <div className="mt-4 px-3 font-mono text-xs text-terminal-muted">
          <div>Session: {new Date().toLocaleDateString()}</div>
          <div className="text-terminal-green">● System Online</div>
        </div>
      </div>
    </aside>
  );
}

// Mobile sidebar toggle
export function DashboardMobileNav() {
  const pathname = usePathname();

  return (
    <div className="lg:hidden bg-terminal-bg border-b border-terminal-border p-4 overflow-x-auto">
      <div className="flex gap-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-2 px-3 py-2 rounded font-mono text-xs whitespace-nowrap transition-colors',
                isActive
                  ? 'bg-terminal-green text-terminal-bg'
                  : 'bg-terminal-header text-terminal-muted'
              )}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
