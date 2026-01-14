// ═══════════════════════════════════════════════════════════════════════════════
// PROVIDERS WRAPPER
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import React, { useEffect } from 'react';
import { useThemeStore } from '@/store';
import { ToastProvider } from '@/components/ui/toast';
import { Header, Footer, CartDrawer } from '@/components/layout';

export function Providers({ children }: { children: React.ReactNode }) {
  const { theme } = useThemeStore();

  // Apply theme on mount and changes
  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  return (
    <ToastProvider>
      <div className="min-h-screen flex flex-col bg-terminal-bg text-terminal-text">
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <CartDrawer />
      </div>
    </ToastProvider>
  );
}

// Dashboard specific provider (without header/footer)
export function DashboardProviders({ children }: { children: React.ReactNode }) {
  const { theme } = useThemeStore();

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  return (
    <ToastProvider>
      {children}
    </ToastProvider>
  );
}
