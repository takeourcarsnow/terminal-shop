// ═══════════════════════════════════════════════════════════════════════════════
// DASHBOARD LAYOUT
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import React from 'react';
import { DashboardSidebar, DashboardMobileNav } from '@/components/dashboard';
import { DashboardProviders } from '../providers';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardProviders>
      <div className="min-h-screen bg-terminal-bg flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <DashboardSidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Mobile Navigation */}
          <DashboardMobileNav />

          {/* Page Content */}
          <main className="flex-1 p-4 lg:p-8 overflow-x-hidden">
            {children}
          </main>
        </div>
      </div>
    </DashboardProviders>
  );
}
