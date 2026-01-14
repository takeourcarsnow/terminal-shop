// ═══════════════════════════════════════════════════════════════════════════════
// INPUT COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  prefix?: string;
  suffix?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, prefix, suffix, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-terminal-muted text-sm font-mono mb-1">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {prefix && (
            <span className="absolute left-3 text-terminal-green font-mono">
              {prefix}
            </span>
          )}
          <input
            ref={ref}
            className={cn(
              'w-full bg-terminal-bg border border-terminal-border rounded',
              'px-4 py-2 font-mono text-terminal-text',
              'focus:outline-none focus:border-terminal-green focus:ring-1 focus:ring-terminal-green',
              'placeholder:text-terminal-muted',
              'transition-colors duration-200',
              prefix ? 'pl-8' : '',
              suffix ? 'pr-10' : '',
              error ? 'border-terminal-red focus:border-terminal-red focus:ring-terminal-red' : '',
              className
            )}
            {...props}
          />
          {suffix && (
            <div className="absolute right-3 text-terminal-muted">
              {suffix}
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1 text-sm text-terminal-red font-mono">
            ERROR: {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

// Textarea Component
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-terminal-muted text-sm font-mono mb-1">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={cn(
            'w-full bg-terminal-bg border border-terminal-border rounded',
            'px-4 py-2 font-mono text-terminal-text',
            'focus:outline-none focus:border-terminal-green focus:ring-1 focus:ring-terminal-green',
            'placeholder:text-terminal-muted',
            'transition-colors duration-200 resize-none',
            error && 'border-terminal-red focus:border-terminal-red focus:ring-terminal-red',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-terminal-red font-mono">
            ERROR: {error}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

// Select Component
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-terminal-muted text-sm font-mono mb-1">
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={cn(
            'w-full bg-terminal-bg border border-terminal-border rounded',
            'px-4 py-2 font-mono text-terminal-text',
            'focus:outline-none focus:border-terminal-green focus:ring-1 focus:ring-terminal-green',
            'transition-colors duration-200',
            'appearance-none cursor-pointer',
            error && 'border-terminal-red focus:border-terminal-red focus:ring-terminal-red',
            className
          )}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2300ff00'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 0.5rem center',
            backgroundSize: '1.5em 1.5em',
          }}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="mt-1 text-sm text-terminal-red font-mono">
            ERROR: {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
