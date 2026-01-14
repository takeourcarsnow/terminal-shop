// ═══════════════════════════════════════════════════════════════════════════════
// RECENT ORDERS TABLE COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import React from 'react';
import Link from 'next/link';
import { Eye } from 'lucide-react';
import { Order } from '@/types';
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
} from '@/components/ui';

interface RecentOrdersProps {
  orders: Order[];
}

export function RecentOrders({ orders }: RecentOrdersProps) {
  return (
    <TerminalWindow title="~/orders/recent.log" className="h-full">
      <div className="font-mono text-sm text-terminal-muted mb-4">
        <span className="text-terminal-green">$</span> tail -n 10 orders.log | sort -r
      </div>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell header>Order ID</TableCell>
            <TableCell header>Customer</TableCell>
            <TableCell header>Status</TableCell>
            <TableCell header>Total</TableCell>
            <TableCell header>Date</TableCell>
            <TableCell header>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.length === 0 ? (
            <TableEmpty message="No orders found" colSpan={6} />
          ) : (
            orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <span className="text-terminal-cyan">{order.id}</span>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="text-terminal-text">{order.customerName}</div>
                    <div className="text-xs text-terminal-muted">{order.customerEmail}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <StatusBadge status={order.status} />
                </TableCell>
                <TableCell>
                  <span className="text-terminal-green">{formatPrice(order.total)}</span>
                </TableCell>
                <TableCell>
                  <span className="text-terminal-muted text-xs">
                    {formatDateTime(order.createdAt)}
                  </span>
                </TableCell>
                <TableCell>
                  <Link href={`/dashboard/orders/${order.id}`}>
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {orders.length > 0 && (
        <div className="mt-4 text-center">
          <Link href="/dashboard/orders">
            <Button variant="secondary" size="sm">
              View All Orders →
            </Button>
          </Link>
        </div>
      )}
    </TerminalWindow>
  );
}
