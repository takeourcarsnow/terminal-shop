// ═══════════════════════════════════════════════════════════════════════════════
// CARD COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function Card({ children, className, hover = false, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'bg-terminal-bg border border-terminal-border rounded-lg overflow-hidden',
        hover && 'hover:border-terminal-green transition-colors cursor-pointer',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('px-4 py-3 border-b border-terminal-border bg-terminal-header', className)}>
      {children}
    </div>
  );
}

export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('p-4', className)}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('px-4 py-3 border-t border-terminal-border bg-terminal-header', className)}>
      {children}
    </div>
  );
}

// Stats Card
interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: React.ReactNode;
}

export function StatsCard({ title, value, change, changeType = 'neutral', icon }: StatsCardProps) {
  const changeColors = {
    positive: 'text-terminal-green',
    negative: 'text-terminal-red',
    neutral: 'text-terminal-muted',
  };

  return (
    <Card className="p-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-terminal-muted text-xs font-mono uppercase tracking-wider">
            {title}
          </p>
          <p className="text-2xl font-mono text-terminal-text mt-1">
            {value}
          </p>
          {change && (
            <p className={cn('text-xs font-mono mt-1', changeColors[changeType])}>
              {changeType === 'positive' && '↑ '}
              {changeType === 'negative' && '↓ '}
              {change}
            </p>
          )}
        </div>
        {icon && (
          <div className="text-terminal-green">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}
