// ═══════════════════════════════════════════════════════════════════════════════
// ORDERS TABLE COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Eye, Search, Filter } from 'lucide-react';
import { Order, OrderStatus } from '@/types';
import { formatPrice, formatDateTime } from '@/lib/utils';
import {
  Table,
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableEmpty,
  StatusBadge,
  Button,
  TerminalWindow,
  Input,
  Select,
} from '@/components/ui';

interface OrdersTableProps {
  orders: Order[];
}

export function OrdersTable({ orders }: OrdersTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'pending', label: 'Pending' },
    { value: 'processing', label: 'Processing' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'refunded', label: 'Refunded' },
  ];

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = !statusFilter || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <TerminalWindow title="~/orders/list.sh">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Input
            placeholder="Search orders..."
            prefix="$"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            suffix={<Search className="w-4 h-4" />}
          />
        </div>
        <div className="w-full sm:w-48">
          <Select
            options={statusOptions}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          />
        </div>
      </div>

      {/* Terminal output */}
      <div className="font-mono text-sm text-terminal-muted mb-4">
        <span className="text-terminal-green">$</span> find orders/ -name "*" 
        {statusFilter && <span className="text-terminal-cyan"> --status={statusFilter}</span>}
        <br />
        <span className="text-terminal-yellow">→</span> {filteredOrders.length} results
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell header>Order ID</TableCell>
              <TableCell header>Customer</TableCell>
              <TableCell header>Items</TableCell>
              <TableCell header>Total</TableCell>
              <TableCell header>Status</TableCell>
              <TableCell header>Date</TableCell>
              <TableCell header>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.length === 0 ? (
              <TableEmpty message="No orders found" colSpan={7} />
            ) : (
              filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <span className="text-terminal-cyan font-medium">
                      {order.id}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="text-terminal-text">{order.customerName}</div>
                      <div className="text-xs text-terminal-muted">
                        {order.customerEmail}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-terminal-muted">
                      {order.items.reduce((sum, item) => sum + item.quantity, 0)} items
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-terminal-green font-medium">
                      {formatPrice(order.total)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={order.status} />
                  </TableCell>
                  <TableCell>
                    <span className="text-terminal-muted text-xs">
                      {formatDateTime(order.createdAt)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Link href={`/dashboard/orders/${order.id}`}>
                      <Button variant="ghost" size="sm" className="p-2">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </TerminalWindow>
  );
}
