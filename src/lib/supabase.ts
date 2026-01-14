// ═══════════════════════════════════════════════════════════════════════════════
// SUPABASE CLIENT CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════════

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create Supabase client for client-side operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type definitions for Supabase tables (for future use)
export type Database = {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string;
          long_description: string;
          price: number;
          original_price: number | null;
          category: string;
          tags: string[];
          images: string[];
          ascii_art: string | null;
          stock: number;
          featured: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['products']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['products']['Insert']>;
      };
      orders: {
        Row: {
          id: string;
          items: unknown;
          subtotal: number;
          tax: number;
          shipping: number;
          total: number;
          status: string;
          customer_email: string;
          customer_name: string;
          shipping_address: unknown;
          payment_intent_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['orders']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['orders']['Insert']>;
      };
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          role: 'customer' | 'admin';
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['users']['Insert']>;
      };
    };
  };
};
