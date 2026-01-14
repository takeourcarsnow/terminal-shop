// ═══════════════════════════════════════════════════════════════════════════════
// CHECKOUT FORM COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CreditCard, Lock, Loader2 } from 'lucide-react';
import { useCartStore } from '@/store';
import { formatPrice } from '@/lib/utils';
import { Button, Input, Select, TerminalWindow } from '@/components/ui';
import { useToast } from '@/components/ui/toast';

interface CheckoutFormData {
  email: string;
  name: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export function CheckoutForm() {
  const router = useRouter();
  const { items, getTotal, clearCart } = useCartStore();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CheckoutFormData>({
    email: '',
    name: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'US',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create checkout session
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items.map(item => ({
            productId: item.product.id,
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
          })),
          customerEmail: formData.email,
          customerName: formData.name,
          shippingAddress: {
            line1: formData.address,
            city: formData.city,
            state: formData.state,
            postalCode: formData.postalCode,
            country: formData.country,
          },
        }),
      });

      const data = await response.json();

      if (data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        throw new Error('Failed to create checkout session');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      addToast('error', 'Checkout failed', 'Please try again later');
      setLoading(false);
    }
  };

  const countryOptions = [
    { value: 'US', label: 'United States' },
    { value: 'CA', label: 'Canada' },
    { value: 'GB', label: 'United Kingdom' },
    { value: 'AU', label: 'Australia' },
    { value: 'DE', label: 'Germany' },
    { value: 'FR', label: 'France' },
    { value: 'JP', label: 'Japan' },
  ];

  if (items.length === 0) {
    return (
      <TerminalWindow title="~/checkout">
        <div className="text-center py-12">
          <p className="font-mono text-terminal-muted mb-4">
            $ cat cart.txt<br />
            Error: cart is empty
          </p>
          <Button onClick={() => router.push('/products')}>
            Browse Products
          </Button>
        </div>
      </TerminalWindow>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Contact Information */}
      <TerminalWindow title="step_1: contact_info">
        <div className="space-y-4">
          <div className="font-mono text-sm text-terminal-muted mb-4">
            <span className="text-terminal-green">$</span> ./checkout.sh --step=contact
          </div>
          <Input
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="user@terminal.sh"
            prefix="@"
            required
          />
          <Input
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Developer"
            required
          />
        </div>
      </TerminalWindow>

      {/* Shipping Address */}
      <TerminalWindow title="step_2: shipping_address">
        <div className="space-y-4">
          <div className="font-mono text-sm text-terminal-muted mb-4">
            <span className="text-terminal-green">$</span> ./checkout.sh --step=shipping
          </div>
          <Input
            label="Street Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="123 Code Street"
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="San Francisco"
              required
            />
            <Input
              label="State/Province"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="CA"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Postal Code"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              placeholder="94102"
              required
            />
            <Select
              label="Country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              options={countryOptions}
            />
          </div>
        </div>
      </TerminalWindow>

      {/* Payment */}
      <TerminalWindow title="step_3: payment">
        <div className="space-y-4">
          <div className="font-mono text-sm text-terminal-muted mb-4">
            <span className="text-terminal-green">$</span> ./checkout.sh --step=payment
          </div>
          
          <div className="flex items-center gap-3 p-4 bg-terminal-header rounded border border-terminal-border">
            <CreditCard className="w-8 h-8 text-terminal-green" />
            <div>
              <p className="font-mono text-terminal-text">
                Secure payment via Stripe
              </p>
              <p className="font-mono text-xs text-terminal-muted">
                You'll be redirected to complete payment
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-terminal-muted text-xs font-mono">
            <Lock className="w-4 h-4" />
            <span>256-bit SSL encryption • PCI compliant</span>
          </div>
        </div>
      </TerminalWindow>

      {/* Submit */}
      <div className="flex flex-col items-center gap-4">
        <Button
          type="submit"
          size="lg"
          disabled={loading}
          className="w-full max-w-md"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Lock className="w-4 h-4" />
              Pay {formatPrice(getTotal())} Securely
            </>
          )}
        </Button>
        <p className="font-mono text-xs text-terminal-muted text-center">
          By completing this purchase, you agree to our Terms of Service
        </p>
      </div>
    </form>
  );
}
