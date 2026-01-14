// ═══════════════════════════════════════════════════════════════════════════════
// DASHBOARD CUSTOMERS PAGE
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import React, { useState } from 'react';
import { TerminalWindow } from '@/components/ui/terminal-window';
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { formatDate, formatPrice } from '@/lib/utils';
import { Search, Mail, MapPin, ShoppingBag, Calendar, User } from 'lucide-react';

// Demo customer data
const demoCustomers = [
  {
    id: 'cust_1',
    name: 'John Doe',
    email: 'john@example.com',
    location: 'San Francisco, CA',
    totalOrders: 5,
    totalSpent: 54999,
    lastOrder: '2024-01-15',
    status: 'active' as const,
    joinedAt: '2023-06-12',
  },
  {
    id: 'cust_2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    location: 'New York, NY',
    totalOrders: 12,
    totalSpent: 189999,
    lastOrder: '2024-01-14',
    status: 'active' as const,
    joinedAt: '2023-02-28',
  },
  {
    id: 'cust_3',
    name: 'Bob Wilson',
    email: 'bob@example.com',
    location: 'Austin, TX',
    totalOrders: 3,
    totalSpent: 24999,
    lastOrder: '2024-01-10',
    status: 'active' as const,
    joinedAt: '2023-09-15',
  },
  {
    id: 'cust_4',
    name: 'Alice Brown',
    email: 'alice@example.com',
    location: 'Seattle, WA',
    totalOrders: 8,
    totalSpent: 112499,
    lastOrder: '2024-01-08',
    status: 'active' as const,
    joinedAt: '2023-04-20',
  },
  {
    id: 'cust_5',
    name: 'Charlie Davis',
    email: 'charlie@example.com',
    location: 'Denver, CO',
    totalOrders: 1,
    totalSpent: 14999,
    lastOrder: '2023-12-20',
    status: 'inactive' as const,
    joinedAt: '2023-12-15',
  },
  {
    id: 'cust_6',
    name: 'Eva Martinez',
    email: 'eva@example.com',
    location: 'Miami, FL',
    totalOrders: 15,
    totalSpent: 249999,
    lastOrder: '2024-01-16',
    status: 'active' as const,
    joinedAt: '2022-11-08',
  },
  {
    id: 'cust_7',
    name: 'Frank Lee',
    email: 'frank@example.com',
    location: 'Portland, OR',
    totalOrders: 2,
    totalSpent: 32999,
    lastOrder: '2024-01-05',
    status: 'active' as const,
    joinedAt: '2023-10-30',
  },
  {
    id: 'cust_8',
    name: 'Grace Kim',
    email: 'grace@example.com',
    location: 'Chicago, IL',
    totalOrders: 6,
    totalSpent: 87999,
    lastOrder: '2024-01-12',
    status: 'active' as const,
    joinedAt: '2023-07-22',
  },
];

type CustomerStatus = 'active' | 'inactive';

export default function DashboardCustomersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | CustomerStatus>('all');

  const filteredCustomers = demoCustomers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalCustomers = demoCustomers.length;
  const activeCustomers = demoCustomers.filter((c) => c.status === 'active').length;
  const totalRevenue = demoCustomers.reduce((sum, c) => sum + c.totalSpent, 0);
  const avgOrderValue = totalRevenue / demoCustomers.reduce((sum, c) => sum + c.totalOrders, 0);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <div className="font-mono text-sm text-terminal-muted mb-2">
          <span className="text-terminal-green">admin@terminal-shop:~$</span> cat /etc/customers | head -20
        </div>
        <h1 className="text-2xl md:text-3xl font-mono text-terminal-text">
          Customers
        </h1>
        <p className="text-terminal-muted font-mono text-sm mt-1">
          Manage and view customer information
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <TerminalWindow title="total.txt" className="p-4">
          <div className="flex items-center space-x-3">
            <User className="w-5 h-5 text-terminal-green" />
            <div>
              <p className="text-terminal-muted text-xs font-mono">Total Customers</p>
              <p className="text-xl font-mono text-terminal-text">{totalCustomers}</p>
            </div>
          </div>
        </TerminalWindow>

        <TerminalWindow title="active.txt" className="p-4">
          <div className="flex items-center space-x-3">
            <User className="w-5 h-5 text-terminal-green" />
            <div>
              <p className="text-terminal-muted text-xs font-mono">Active</p>
              <p className="text-xl font-mono text-terminal-text">{activeCustomers}</p>
            </div>
          </div>
        </TerminalWindow>

        <TerminalWindow title="revenue.txt" className="p-4">
          <div className="flex items-center space-x-3">
            <ShoppingBag className="w-5 h-5 text-terminal-green" />
            <div>
              <p className="text-terminal-muted text-xs font-mono">Total Revenue</p>
              <p className="text-xl font-mono text-terminal-text">{formatPrice(totalRevenue)}</p>
            </div>
          </div>
        </TerminalWindow>

        <TerminalWindow title="avg.txt" className="p-4">
          <div className="flex items-center space-x-3">
            <ShoppingBag className="w-5 h-5 text-terminal-green" />
            <div>
              <p className="text-terminal-muted text-xs font-mono">Avg Order</p>
              <p className="text-xl font-mono text-terminal-text">{formatPrice(avgOrderValue)}</p>
            </div>
          </div>
        </TerminalWindow>
      </div>

      {/* Filters */}
      <TerminalWindow title="filter.sh">
        <div className="p-4 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-terminal-muted" />
            <Input
              placeholder="Search customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={statusFilter === 'all' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setStatusFilter('all')}
            >
              All
            </Button>
            <Button
              variant={statusFilter === 'active' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setStatusFilter('active')}
            >
              Active
            </Button>
            <Button
              variant={statusFilter === 'inactive' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setStatusFilter('inactive')}
            >
              Inactive
            </Button>
          </div>
        </div>
      </TerminalWindow>

      {/* Customers Table */}
      <TerminalWindow title="customers.db">
        <div className="overflow-x-auto">
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>Customer</TableHeader>
                <TableHeader className="hidden md:table-cell">Location</TableHeader>
                <TableHeader>Orders</TableHeader>
                <TableHeader className="hidden sm:table-cell">Total Spent</TableHeader>
                <TableHeader className="hidden lg:table-cell">Last Order</TableHeader>
                <TableHeader>Status</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded bg-terminal-green/20 flex items-center justify-center">
                        <span className="text-terminal-green font-mono text-sm">
                          {customer.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-mono text-terminal-text">{customer.name}</p>
                        <p className="text-xs text-terminal-muted flex items-center">
                          <Mail className="w-3 h-3 mr-1" />
                          {customer.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <span className="flex items-center text-terminal-muted text-sm">
                      <MapPin className="w-3 h-3 mr-1" />
                      {customer.location}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="font-mono text-terminal-text">
                      {customer.totalOrders}
                    </span>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <span className="font-mono text-terminal-green">
                      {formatPrice(customer.totalSpent)}
                    </span>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <span className="flex items-center text-terminal-muted text-sm">
                      <Calendar className="w-3 h-3 mr-1" />
                      {formatDate(customer.lastOrder)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={customer.status === 'active' ? 'success' : 'secondary'}>
                      {customer.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {filteredCustomers.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-terminal-muted font-mono">
              No customers found matching your criteria
            </p>
          </div>
        )}
      </TerminalWindow>
    </div>
  );
}
