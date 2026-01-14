// ═══════════════════════════════════════════════════════════════════════════════
// TERMINAL SHOP - TYPE DEFINITIONS
// ═══════════════════════════════════════════════════════════════════════════════

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  price: number;
  originalPrice?: number;
  category: string;
  tags: string[];
  images: string[];
  ascii_art?: string;
  stock: number;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  subtotal: number;
  tax: number;
  shipping: number;
  status: OrderStatus;
  customerEmail: string;
  customerName: string;
  shippingAddress: Address;
  paymentIntentId?: string;
  createdAt: string;
  updatedAt: string;
}

export type OrderStatus = 
  | 'pending'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export interface Address {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'admin';
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  productCount: number;
}

export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number;
  recentOrders: Order[];
  topProducts: { product: Product; sales: number }[];
}

export type Theme = 'dark' | 'light';

export interface TerminalCommand {
  command: string;
  output: string;
  timestamp: Date;
}
