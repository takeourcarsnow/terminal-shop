// ═══════════════════════════════════════════════════════════════════════════════
// DASHBOARD ANALYTICS PAGE
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import React, { useState } from 'react';
import { TerminalWindow } from '@/components/ui/terminal-window';
import { Button } from '@/components/ui/button';
import { products } from '@/data/products';
import { orders } from '@/data/orders';
import { formatPrice } from '@/lib/utils';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  PieChart, 
  Activity,
  Users,
  ShoppingCart,
  DollarSign,
  Package,
  Clock
} from 'lucide-react';

// Demo analytics data
const dailyStats = [
  { date: '2024-01-10', visitors: 245, orders: 12, revenue: 189900 },
  { date: '2024-01-11', visitors: 312, orders: 18, revenue: 284700 },
  { date: '2024-01-12', visitors: 289, orders: 15, revenue: 234500 },
  { date: '2024-01-13', visitors: 356, orders: 22, revenue: 342100 },
  { date: '2024-01-14', visitors: 278, orders: 14, revenue: 198900 },
  { date: '2024-01-15', visitors: 401, orders: 28, revenue: 456700 },
  { date: '2024-01-16', visitors: 367, orders: 25, revenue: 398200 },
];

const trafficSources = [
  { source: 'Direct', visits: 1245, percentage: 35 },
  { source: 'Organic Search', visits: 892, percentage: 25 },
  { source: 'Social Media', visits: 678, percentage: 19 },
  { source: 'Referral', visits: 534, percentage: 15 },
  { source: 'Email', visits: 213, percentage: 6 },
];

const topProducts = products.slice(0, 5).map((p, i) => ({
  ...p,
  sold: Math.floor(Math.random() * 50) + 10,
  revenue: p.price * (Math.floor(Math.random() * 50) + 10),
})).sort((a, b) => b.sold - a.sold);

const conversionFunnel = [
  { stage: 'Visitors', count: 3562, percentage: 100 },
  { stage: 'Product Views', count: 2134, percentage: 60 },
  { stage: 'Add to Cart', count: 534, percentage: 15 },
  { stage: 'Checkout', count: 178, percentage: 5 },
  { stage: 'Purchase', count: 134, percentage: 3.8 },
];

type TimeRange = '7d' | '30d' | '90d';

export default function DashboardAnalyticsPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>('7d');

  // Calculate totals
  const totalVisitors = dailyStats.reduce((sum, d) => sum + d.visitors, 0);
  const totalOrders = dailyStats.reduce((sum, d) => sum + d.orders, 0);
  const totalRevenue = dailyStats.reduce((sum, d) => sum + d.revenue, 0);
  const conversionRate = ((totalOrders / totalVisitors) * 100).toFixed(2);
  const avgOrderValue = totalRevenue / totalOrders;

  // ASCII bar chart helper
  const renderAsciiBar = (percentage: number, maxWidth: number = 20) => {
    const filled = Math.round((percentage / 100) * maxWidth);
    return '█'.repeat(filled) + '░'.repeat(maxWidth - filled);
  };

  // ASCII sparkline helper
  const renderSparkline = (data: number[]) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    const chars = ['▁', '▂', '▃', '▄', '▅', '▆', '▇', '█'];
    return data.map(v => {
      const index = Math.floor(((v - min) / range) * 7);
      return chars[index];
    }).join('');
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="font-mono text-sm text-terminal-muted mb-2">
            <span className="text-terminal-green">admin@terminal-shop:~$</span> ./analytics --report
          </div>
          <h1 className="text-2xl md:text-3xl font-mono text-terminal-text">
            Analytics
          </h1>
          <p className="text-terminal-muted font-mono text-sm mt-1">
            Performance metrics and insights
          </p>
        </div>
        <div className="flex gap-2">
          {(['7d', '30d', '90d'] as TimeRange[]).map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setTimeRange(range)}
            >
              {range}
            </Button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <TerminalWindow title="visitors.txt" className="p-4">
          <div className="flex items-center space-x-3">
            <Users className="w-5 h-5 text-terminal-green" />
            <div>
              <p className="text-terminal-muted text-xs font-mono">Visitors</p>
              <p className="text-xl font-mono text-terminal-text">{totalVisitors.toLocaleString()}</p>
              <div className="flex items-center text-xs text-terminal-green">
                <TrendingUp className="w-3 h-3 mr-1" />
                +12.5%
              </div>
            </div>
          </div>
        </TerminalWindow>

        <TerminalWindow title="orders.txt" className="p-4">
          <div className="flex items-center space-x-3">
            <ShoppingCart className="w-5 h-5 text-terminal-green" />
            <div>
              <p className="text-terminal-muted text-xs font-mono">Orders</p>
              <p className="text-xl font-mono text-terminal-text">{totalOrders}</p>
              <div className="flex items-center text-xs text-terminal-green">
                <TrendingUp className="w-3 h-3 mr-1" />
                +8.3%
              </div>
            </div>
          </div>
        </TerminalWindow>

        <TerminalWindow title="revenue.txt" className="p-4">
          <div className="flex items-center space-x-3">
            <DollarSign className="w-5 h-5 text-terminal-green" />
            <div>
              <p className="text-terminal-muted text-xs font-mono">Revenue</p>
              <p className="text-xl font-mono text-terminal-text">{formatPrice(totalRevenue)}</p>
              <div className="flex items-center text-xs text-terminal-green">
                <TrendingUp className="w-3 h-3 mr-1" />
                +15.2%
              </div>
            </div>
          </div>
        </TerminalWindow>

        <TerminalWindow title="conversion.txt" className="p-4">
          <div className="flex items-center space-x-3">
            <Activity className="w-5 h-5 text-terminal-green" />
            <div>
              <p className="text-terminal-muted text-xs font-mono">Conv. Rate</p>
              <p className="text-xl font-mono text-terminal-text">{conversionRate}%</p>
              <div className="flex items-center text-xs text-terminal-error">
                <TrendingDown className="w-3 h-3 mr-1" />
                -2.1%
              </div>
            </div>
          </div>
        </TerminalWindow>

        <TerminalWindow title="aov.txt" className="p-4">
          <div className="flex items-center space-x-3">
            <Package className="w-5 h-5 text-terminal-green" />
            <div>
              <p className="text-terminal-muted text-xs font-mono">Avg Order</p>
              <p className="text-xl font-mono text-terminal-text">{formatPrice(avgOrderValue)}</p>
              <div className="flex items-center text-xs text-terminal-green">
                <TrendingUp className="w-3 h-3 mr-1" />
                +5.7%
              </div>
            </div>
          </div>
        </TerminalWindow>
      </div>

      {/* Revenue Chart (ASCII) */}
      <TerminalWindow title="revenue_chart.sh">
        <div className="p-4 font-mono text-sm">
          <div className="flex items-center mb-4">
            <BarChart3 className="w-4 h-4 text-terminal-green mr-2" />
            <span className="text-terminal-text">Daily Revenue (Last 7 Days)</span>
          </div>
          <div className="space-y-2">
            {dailyStats.map((day) => {
              const maxRevenue = Math.max(...dailyStats.map(d => d.revenue));
              const barLength = Math.round((day.revenue / maxRevenue) * 30);
              return (
                <div key={day.date} className="flex items-center gap-2">
                  <span className="text-terminal-muted w-20">{day.date.slice(5)}</span>
                  <span className="text-terminal-green">{'█'.repeat(barLength)}</span>
                  <span className="text-terminal-accent">{formatPrice(day.revenue)}</span>
                </div>
              );
            })}
          </div>
          <div className="mt-4 pt-4 border-t border-terminal-border">
            <span className="text-terminal-muted">Sparkline: </span>
            <span className="text-terminal-green text-lg">
              {renderSparkline(dailyStats.map(d => d.revenue))}
            </span>
          </div>
        </div>
      </TerminalWindow>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Traffic Sources */}
        <TerminalWindow title="traffic_sources.log">
          <div className="p-4 font-mono text-sm">
            <div className="flex items-center mb-4">
              <PieChart className="w-4 h-4 text-terminal-green mr-2" />
              <span className="text-terminal-text">Traffic Sources</span>
            </div>
            <div className="space-y-3">
              {trafficSources.map((source) => (
                <div key={source.source}>
                  <div className="flex justify-between mb-1">
                    <span className="text-terminal-text">{source.source}</span>
                    <span className="text-terminal-muted">{source.percentage}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-terminal-green">
                      {renderAsciiBar(source.percentage)}
                    </span>
                    <span className="text-terminal-accent text-xs">
                      {source.visits.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TerminalWindow>

        {/* Conversion Funnel */}
        <TerminalWindow title="funnel.sh">
          <div className="p-4 font-mono text-sm">
            <div className="flex items-center mb-4">
              <Activity className="w-4 h-4 text-terminal-green mr-2" />
              <span className="text-terminal-text">Conversion Funnel</span>
            </div>
            <div className="space-y-2">
              {conversionFunnel.map((stage, index) => {
                const barWidth = Math.round((stage.percentage / 100) * 25);
                const indent = index * 2;
                return (
                  <div key={stage.stage} className="flex items-center">
                    <span className="text-terminal-muted w-28">{stage.stage}</span>
                    <span style={{ marginLeft: `${indent * 8}px` }} className="text-terminal-green">
                      {'█'.repeat(barWidth)}
                    </span>
                    <span className="text-terminal-accent ml-2">
                      {stage.count} ({stage.percentage}%)
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 pt-4 border-t border-terminal-border text-terminal-muted">
              <span>Overall Conversion: </span>
              <span className="text-terminal-green">{conversionFunnel[4].percentage}%</span>
            </div>
          </div>
        </TerminalWindow>
      </div>

      {/* Top Products */}
      <TerminalWindow title="top_products.db">
        <div className="p-4 font-mono text-sm">
          <div className="flex items-center mb-4">
            <Package className="w-4 h-4 text-terminal-green mr-2" />
            <span className="text-terminal-text">Top Selling Products</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-terminal-muted border-b border-terminal-border">
                  <th className="text-left py-2 pr-4">#</th>
                  <th className="text-left py-2 pr-4">Product</th>
                  <th className="text-right py-2 pr-4">Units Sold</th>
                  <th className="text-right py-2">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((product, index) => (
                  <tr key={product.id} className="border-b border-terminal-border/50">
                    <td className="py-2 pr-4 text-terminal-muted">{index + 1}</td>
                    <td className="py-2 pr-4 text-terminal-text">{product.name}</td>
                    <td className="py-2 pr-4 text-right text-terminal-accent">{product.sold}</td>
                    <td className="py-2 text-right text-terminal-green">{formatPrice(product.revenue)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </TerminalWindow>

      {/* Real-time Activity */}
      <TerminalWindow title="activity.log">
        <div className="p-4 font-mono text-sm">
          <div className="flex items-center mb-4">
            <Clock className="w-4 h-4 text-terminal-green mr-2 animate-pulse" />
            <span className="text-terminal-text">Recent Activity</span>
            <span className="ml-2 text-terminal-muted text-xs">(simulated)</span>
          </div>
          <div className="space-y-1 text-xs">
            <div className="flex">
              <span className="text-terminal-muted w-20">[14:32:15]</span>
              <span className="text-terminal-green">INFO</span>
              <span className="text-terminal-text ml-2">New order #1089 from San Francisco, CA</span>
            </div>
            <div className="flex">
              <span className="text-terminal-muted w-20">[14:31:42]</span>
              <span className="text-terminal-accent">VIEW</span>
              <span className="text-terminal-text ml-2">Product viewed: Mechanical Keyboard</span>
            </div>
            <div className="flex">
              <span className="text-terminal-muted w-20">[14:30:58]</span>
              <span className="text-terminal-green">INFO</span>
              <span className="text-terminal-text ml-2">Cart updated: +1 Terminal Monitor</span>
            </div>
            <div className="flex">
              <span className="text-terminal-muted w-20">[14:29:33]</span>
              <span className="text-terminal-accent">VIEW</span>
              <span className="text-terminal-text ml-2">New visitor from New York, NY</span>
            </div>
            <div className="flex">
              <span className="text-terminal-muted w-20">[14:28:17]</span>
              <span className="text-terminal-warning">WARN</span>
              <span className="text-terminal-text ml-2">Low stock alert: USB Hub (3 remaining)</span>
            </div>
            <div className="flex">
              <span className="text-terminal-muted w-20">[14:27:45]</span>
              <span className="text-terminal-green">INFO</span>
              <span className="text-terminal-text ml-2">Payment received: $149.99</span>
            </div>
          </div>
        </div>
      </TerminalWindow>
    </div>
  );
}
