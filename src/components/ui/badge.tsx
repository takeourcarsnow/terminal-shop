// ═══════════════════════════════════════════════════════════════════════════════
// BADGE COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md';
  className?: string;
}

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  className,
}: BadgeProps) {
  const variants = {
    default: 'bg-terminal-header text-terminal-text border-terminal-border',
    secondary: 'bg-terminal-muted/20 text-terminal-muted border-terminal-muted',
    success: 'bg-terminal-green/20 text-terminal-green border-terminal-green',
    warning: 'bg-terminal-yellow/20 text-terminal-yellow border-terminal-yellow',
    error: 'bg-terminal-red/20 text-terminal-red border-terminal-red',
    info: 'bg-terminal-cyan/20 text-terminal-cyan border-terminal-cyan',
  };

  const sizes = {
    sm: 'px-1.5 py-0.5 text-xs',
    md: 'px-2 py-1 text-xs',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center font-mono border rounded',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}

// Status Badge with dot indicator
interface StatusBadgeProps {
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const statusConfig = {
    pending: { label: 'PENDING', variant: 'warning' as const },
    processing: { label: 'PROCESSING', variant: 'info' as const },
    shipped: { label: 'SHIPPED', variant: 'info' as const },
    delivered: { label: 'DELIVERED', variant: 'success' as const },
    cancelled: { label: 'CANCELLED', variant: 'error' as const },
    refunded: { label: 'REFUNDED', variant: 'error' as const },
  };

  const config = statusConfig[status];

  return (
    <Badge variant={config.variant} className={className}>
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5" />
      {config.label}
    </Badge>
  );
}

// Stock Badge
interface StockBadgeProps {
  stock: number;
  className?: string;
}

export function StockBadge({ stock, className }: StockBadgeProps) {
  if (stock === 0) {
    return (
      <Badge variant="error" className={className}>
        OUT OF STOCK
      </Badge>
    );
  }

  if (stock < 10) {
    return (
      <Badge variant="warning" className={className}>
        LOW STOCK: {stock}
      </Badge>
    );
  }

  return (
    <Badge variant="success" className={className}>
      IN STOCK
    </Badge>
  );
}
