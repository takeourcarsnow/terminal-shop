// ═══════════════════════════════════════════════════════════════════════════════
// TABLE COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface TableProps {
  children: React.ReactNode;
  className?: string;
}

export function Table({ children, className }: TableProps) {
  return (
    <div className={cn('overflow-x-auto', className)}>
      <table className="w-full font-mono text-sm">
        {children}
      </table>
    </div>
  );
}

export function TableHead({ children, className }: TableProps) {
  return (
    <thead className={cn('border-b border-terminal-border', className)}>
      {children}
    </thead>
  );
}

// Header cell for table (th element)
interface TableHeaderCellProps {
  children?: React.ReactNode;
  className?: string;
}

export function TableHeader({ children, className }: TableHeaderCellProps) {
  return (
    <th
      className={cn(
        'px-4 py-3 text-left text-terminal-muted font-normal uppercase text-xs tracking-wider',
        className
      )}
    >
      {children}
    </th>
  );
}

export function TableBody({ children, className }: TableProps) {
  return <tbody className={className}>{children}</tbody>;
}

export function TableRow({ children, className }: TableProps) {
  return (
    <tr
      className={cn(
        'border-b border-terminal-border/50 hover:bg-terminal-header/50 transition-colors',
        className
      )}
    >
      {children}
    </tr>
  );
}

interface TableCellProps {
  children?: React.ReactNode;
  className?: string;
  header?: boolean;
}

export function TableCell({ children, className, header = false }: TableCellProps) {
  const Component = header ? 'th' : 'td';
  
  return (
    <Component
      className={cn(
        'px-4 py-3 text-left',
        header
          ? 'text-terminal-muted font-normal uppercase text-xs tracking-wider'
          : 'text-terminal-text',
        className
      )}
    >
      {children}
    </Component>
  );
}

// Empty state for tables
interface TableEmptyProps {
  message?: string;
  colSpan: number;
}

export function TableEmpty({ message = 'No data found', colSpan }: TableEmptyProps) {
  return (
    <tr>
      <td colSpan={colSpan} className="px-4 py-12 text-center">
        <div className="text-terminal-muted font-mono">
          <div className="mb-2">┌─────────────────┐</div>
          <div>│   {message.padEnd(15, ' ')} │</div>
          <div className="mt-2">└─────────────────┘</div>
        </div>
      </td>
    </tr>
  );
}
