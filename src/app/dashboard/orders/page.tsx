// ═══════════════════════════════════════════════════════════════════════════════
// DASHBOARD ORDERS PAGE
// ═══════════════════════════════════════════════════════════════════════════════

import React from 'react';
import { orders } from '@/data/orders';
import { OrdersTable } from '@/components/dashboard';

export default function DashboardOrdersPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <div className="font-mono text-sm text-terminal-muted mb-2">
          <span className="text-terminal-green">admin@terminal-shop:~$</span> cat /var/log/orders.log
        </div>
        <h1 className="text-2xl md:text-3xl font-mono text-terminal-text">
          Orders
        </h1>
        <p className="text-terminal-muted font-mono text-sm mt-1">
          View and manage customer orders
        </p>
      </div>

      {/* Orders Table */}
      <OrdersTable orders={orders} />
    </div>
  );
}
