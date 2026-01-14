// ═══════════════════════════════════════════════════════════════════════════════
// BUTTON COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = `
    inline-flex items-center justify-center gap-2
    font-mono font-medium
    border transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-terminal-bg
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const variants = {
    primary: `
      bg-terminal-green text-terminal-bg
      border-terminal-green
      hover:bg-transparent hover:text-terminal-green
      focus:ring-terminal-green
    `,
    secondary: `
      bg-transparent text-terminal-text
      border-terminal-border
      hover:border-terminal-text hover:text-terminal-text
      focus:ring-terminal-text
    `,
    ghost: `
      bg-transparent text-terminal-muted
      border-transparent
      hover:text-terminal-text hover:bg-terminal-header
      focus:ring-terminal-text
    `,
    danger: `
      bg-terminal-red text-white
      border-terminal-red
      hover:bg-transparent hover:text-terminal-red
      focus:ring-terminal-red
    `,
    success: `
      bg-terminal-green text-terminal-bg
      border-terminal-green
      hover:bg-terminal-green/90
      focus:ring-terminal-green
    `,
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <LoadingSpinner />
          <span>Processing...</span>
        </>
      ) : (
        <>
          {icon && <span className="shrink-0">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
}

function LoadingSpinner() {
  return (
    <svg
      className="animate-spin h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

// Link-styled button
interface LinkButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'default' | 'muted';
}

export function LinkButton({
  children,
  variant = 'default',
  className,
  ...props
}: LinkButtonProps) {
  return (
    <a
      className={cn(
        'font-mono underline underline-offset-4 transition-colors',
        variant === 'default'
          ? 'text-terminal-cyan hover:text-terminal-green'
          : 'text-terminal-muted hover:text-terminal-text',
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
}
