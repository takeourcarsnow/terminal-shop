// ═══════════════════════════════════════════════════════════════════════════════
// DEMO ORDERS DATA
// ═══════════════════════════════════════════════════════════════════════════════

import { Order } from '@/types';
import { products } from './products';

export const orders: Order[] = [
  {
    id: 'ord_001',
    items: [
      { product: products[0], quantity: 1 },
      { product: products[4], quantity: 2 },
    ],
    subtotal: 19997,
    tax: 2000,
    shipping: 999,
    total: 22996,
    status: 'delivered',
    customerEmail: 'alice@terminal.sh',
    customerName: 'Alice Developer',
    shippingAddress: {
      line1: '123 Code Street',
      line2: 'Apt 404',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94102',
      country: 'US',
    },
    createdAt: '2025-01-05T10:30:00Z',
    updatedAt: '2025-01-08T14:20:00Z',
  },
  {
    id: 'ord_002',
    items: [
      { product: products[1], quantity: 1 },
    ],
    subtotal: 59999,
    tax: 6000,
    shipping: 0,
    total: 65999,
    status: 'shipped',
    customerEmail: 'bob@kernel.io',
    customerName: 'Bob Hacker',
    shippingAddress: {
      line1: '456 Binary Blvd',
      city: 'Seattle',
      state: 'WA',
      postalCode: '98101',
      country: 'US',
    },
    paymentIntentId: 'pi_test_123456',
    createdAt: '2025-01-10T08:15:00Z',
    updatedAt: '2025-01-12T11:45:00Z',
  },
  {
    id: 'ord_003',
    items: [
      { product: products[2], quantity: 1 },
      { product: products[11], quantity: 2 },
    ],
    subtotal: 13997,
    tax: 1400,
    shipping: 599,
    total: 15996,
    status: 'processing',
    customerEmail: 'carol@unix.com',
    customerName: 'Carol Admin',
    shippingAddress: {
      line1: '789 Shell Lane',
      city: 'Austin',
      state: 'TX',
      postalCode: '78701',
      country: 'US',
    },
    createdAt: '2025-01-13T16:00:00Z',
    updatedAt: '2025-01-13T16:00:00Z',
  },
  {
    id: 'ord_004',
    items: [
      { product: products[6], quantity: 2 },
      { product: products[7], quantity: 1 },
    ],
    subtotal: 31497,
    tax: 3150,
    shipping: 0,
    total: 34647,
    status: 'pending',
    customerEmail: 'dave@github.dev',
    customerName: 'Dave Ops',
    shippingAddress: {
      line1: '321 Docker Drive',
      city: 'Portland',
      state: 'OR',
      postalCode: '97201',
      country: 'US',
    },
    createdAt: '2025-01-14T09:30:00Z',
    updatedAt: '2025-01-14T09:30:00Z',
  },
  {
    id: 'ord_005',
    items: [
      { product: products[9], quantity: 1 },
    ],
    subtotal: 29999,
    tax: 3000,
    shipping: 1499,
    total: 34498,
    status: 'delivered',
    customerEmail: 'eve@ssh.net',
    customerName: 'Eve Crypto',
    shippingAddress: {
      line1: '555 Encryption Ave',
      city: 'Denver',
      state: 'CO',
      postalCode: '80201',
      country: 'US',
    },
    createdAt: '2025-01-02T12:00:00Z',
    updatedAt: '2025-01-07T18:30:00Z',
  },
];

export function getOrderById(id: string): Order | undefined {
  return orders.find(o => o.id === id);
}

export function getOrdersByStatus(status: string): Order[] {
  return orders.filter(o => o.status === status);
}
