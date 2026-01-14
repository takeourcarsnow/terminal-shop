// ═══════════════════════════════════════════════════════════════════════════════
// TERMINAL WINDOW COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface TerminalWindowProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  showControls?: boolean;
  variant?: 'default' | 'compact' | 'full';
}

export function TerminalWindow({
  title = 'terminal',
  children,
  className,
  showControls = true,
  variant = 'default',
}: TerminalWindowProps) {
  return (
    <div
      className={cn(
        'terminal-window border border-terminal-border rounded-lg overflow-hidden',
        'bg-terminal-bg shadow-lg',
        variant === 'full' && 'h-full',
        className
      )}
    >
      {/* Title Bar */}
      <div className="terminal-titlebar flex items-center gap-2 px-4 py-2 bg-terminal-header border-b border-terminal-border">
        {showControls && (
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-terminal-red" />
            <div className="w-3 h-3 rounded-full bg-terminal-yellow" />
            <div className="w-3 h-3 rounded-full bg-terminal-green" />
          </div>
        )}
        <div className="flex-1 text-center">
          <span className="text-terminal-muted text-sm font-mono">
            {title}
          </span>
        </div>
        {showControls && <div className="w-14" />}
      </div>

      {/* Content */}
      <div
        className={cn(
          'terminal-content font-mono',
          variant === 'compact' ? 'p-3' : 'p-4 md:p-6',
          variant === 'full' && 'h-[calc(100%-40px)] overflow-auto'
        )}
      >
        {children}
      </div>
    </div>
  );
}

// Terminal Line Component
interface TerminalLineProps {
  prompt?: string;
  command?: string;
  output?: React.ReactNode;
  className?: string;
}

export function TerminalLine({
  prompt = '$',
  command,
  output,
  className,
}: TerminalLineProps) {
  return (
    <div className={cn('terminal-line mb-2', className)}>
      {command && (
        <div className="flex gap-2 items-start">
          <span className="text-terminal-green shrink-0">{prompt}</span>
          <span className="text-terminal-text">{command}</span>
        </div>
      )}
      {output && (
        <div className="text-terminal-muted mt-1 ml-4">{output}</div>
      )}
    </div>
  );
}

// Terminal Cursor Component
export function TerminalCursor({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-block w-2 h-4 bg-terminal-green animate-terminal-blink',
        className
      )}
    />
  );
}

// ASCII Box Component
interface AsciiBoxProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export function AsciiBox({ children, title, className }: AsciiBoxProps) {
  return (
    <div className={cn('font-mono text-sm', className)}>
      {title && (
        <div className="text-terminal-cyan mb-1">╔═ {title} ═╗</div>
      )}
      <div className="border border-terminal-border p-4 rounded">
        {children}
      </div>
    </div>
  );
}
