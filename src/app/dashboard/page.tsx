// ═══════════════════════════════════════════════════════════════════════════════
// DASHBOARD OVERVIEW PAGE
// ═══════════════════════════════════════════════════════════════════════════════

import React from 'react';
import { products } from '@/data/products';
import { orders } from '@/data/orders';
import { DashboardStats, RecentOrders, RevenueChart, AsciiRevenueChart } from '@/components/dashboard';
import { TerminalWindow, TerminalLine } from '@/components/ui';

export default function DashboardPage() {
  // Calculate stats from demo data
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const uniqueCustomers = new Set(orders.map(o => o.customerEmail)).size;

  const stats = {
    totalRevenue,
    totalOrders: orders.length,
    totalProducts: products.length,
    totalCustomers: uniqueCustomers,
  };

  // Get recent orders (sorted by date)
  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <div className="font-mono text-sm text-terminal-muted mb-2">
          <span className="text-terminal-green">admin@terminal-shop:~$</span> ./dashboard.sh --overview
        </div>
        <h1 className="text-2xl md:text-3xl font-mono text-terminal-text">
          Dashboard Overview
        </h1>
        <p className="text-terminal-muted font-mono text-sm mt-1">
          Welcome back! Here's what's happening with your store.
        </p>
      </div>

      {/* Stats Cards */}
      <DashboardStats stats={stats} />

      {/* Charts and Tables */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Revenue Chart */}
        <RevenueChart />

        {/* Quick Stats Terminal */}
        <TerminalWindow title="~/stats/quick.sh">
          <div className="space-y-2">
            <TerminalLine
              command="echo $STORE_STATUS"
              output={<span className="text-terminal-green">● Online and operational</span>}
            />
            <TerminalLine
              command="uptime"
              output="99.99% - Last 30 days"
            />
            <TerminalLine
              command="cat /var/log/orders.log | tail -1"
              output={`Last order: ${orders[0]?.id || 'No orders yet'}`}
            />
            <TerminalLine
              command="df -h inventory"
              output={`${products.reduce((sum, p) => sum + p.stock, 0)} items in stock`}
            />
            <TerminalLine
              command="ps aux | grep payments"
              output={<span className="text-terminal-green">Stripe integration active</span>}
            />
            <TerminalLine
              command="cat /etc/version"
              output="Terminal Shop v2.0.26"
            />
          </div>
        </TerminalWindow>
      </div>

      {/* Recent Orders */}
      <RecentOrders orders={recentOrders} />

      {/* System Status */}
      <div className="grid md:grid-cols-3 gap-4">
        <StatusCard
          title="API Status"
          status="operational"
          description="All endpoints responding"
        />
        <StatusCard
          title="Payment Gateway"
          status="operational"
          description="Stripe connected"
        />
        <StatusCard
          title="Database"
          status="operational"
          description="Supabase ready"
        />
      </div>
    </div>
  );
}

function StatusCard({
  title,
  status,
  description,
}: {
  title: string;
  status: 'operational' | 'degraded' | 'down';
  description: string;
}) {
  const statusColors = {
    operational: 'text-terminal-green',
    degraded: 'text-terminal-yellow',
    down: 'text-terminal-red',
  };

  const statusIcons = {
    operational: '●',
    degraded: '◐',
    down: '○',
  };

  return (
    <div className="border border-terminal-border rounded-lg p-4 bg-terminal-bg">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-mono text-terminal-text">{title}</h3>
        <span className={`font-mono ${statusColors[status]}`}>
          {statusIcons[status]} {status}
        </span>
      </div>
      <p className="font-mono text-xs text-terminal-muted">{description}</p>
    </div>
  );
}
