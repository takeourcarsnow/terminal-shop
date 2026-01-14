// ═══════════════════════════════════════════════════════════════════════════════
// DASHBOARD STATS CARDS COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import React from 'react';
import { DollarSign, Package, ShoppingCart, Users } from 'lucide-react';
import { StatsCard } from '@/components/ui';
import { formatPrice } from '@/lib/utils';

interface DashboardStatsProps {
  stats: {
    totalRevenue: number;
    totalOrders: number;
    totalProducts: number;
    totalCustomers: number;
    revenueChange?: string;
    ordersChange?: string;
  };
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard
        title="Total Revenue"
        value={formatPrice(stats.totalRevenue)}
        change={stats.revenueChange || '+12.5% from last month'}
        changeType="positive"
        icon={<DollarSign className="w-6 h-6" />}
      />
      <StatsCard
        title="Total Orders"
        value={stats.totalOrders.toString()}
        change={stats.ordersChange || '+8.2% from last month'}
        changeType="positive"
        icon={<ShoppingCart className="w-6 h-6" />}
      />
      <StatsCard
        title="Products"
        value={stats.totalProducts.toString()}
        change="Active in catalog"
        changeType="neutral"
        icon={<Package className="w-6 h-6" />}
      />
      <StatsCard
        title="Customers"
        value={stats.totalCustomers.toString()}
        change="+23 this week"
        changeType="positive"
        icon={<Users className="w-6 h-6" />}
      />
    </div>
  );
}
