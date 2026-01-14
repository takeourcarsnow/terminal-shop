// ═══════════════════════════════════════════════════════════════════════════════
// PROGRESS INDICATOR COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  progress: number; // 0-100
  className?: string;
  showPercentage?: boolean;
  color?: 'green' | 'cyan' | 'yellow' | 'red';
}

export function ProgressBar({
  progress,
  className,
  showPercentage = false,
  color = 'green'
}: ProgressBarProps) {
  const colorClasses = {
    green: 'bg-terminal-green',
    cyan: 'bg-terminal-cyan',
    yellow: 'bg-terminal-yellow',
    red: 'bg-terminal-red',
  };

  return (
    <div className={cn("w-full bg-terminal-border rounded-full h-2", className)}>
      <div
        className={cn(
          "h-2 rounded-full transition-all duration-300 ease-out",
          colorClasses[color]
        )}
        style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
      />
      {showPercentage && (
        <div className="text-xs text-terminal-muted mt-1 text-center font-mono">
          {Math.round(progress)}%
        </div>
      )}
    </div>
  );
}

// Terminal-style progress indicator
export function TerminalProgress({
  progress,
  label,
  className
}: {
  progress: number;
  label?: string;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <div className="text-terminal-muted text-sm font-mono">
          {label}
        </div>
      )}
      <div className="flex items-center gap-3">
        <div className="flex-1 bg-terminal-border rounded h-1">
          <div
            className="bg-terminal-green h-1 rounded transition-all duration-300"
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        </div>
        <div className="text-terminal-green text-xs font-mono min-w-[3ch]">
          {Math.round(progress)}%
        </div>
      </div>
    </div>
  );
}

// Loading dots animation
export function LoadingDots({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="w-1 h-1 bg-terminal-green rounded-full animate-pulse" />
      <div className="w-1 h-1 bg-terminal-green rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
      <div className="w-1 h-1 bg-terminal-green rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
    </div>
  );
}

// Typing indicator for chat-like interfaces
export function TypingIndicator({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2 text-terminal-muted", className)}>
      <span className="font-mono text-sm">Typing</span>
      <LoadingDots />
    </div>
  );
}

// Page loading overlay
export function PageLoadingOverlay({
  message = "Loading...",
  className
}: {
  message?: string;
  className?: string;
}) {
  return (
    <div className={cn(
      "fixed inset-0 bg-terminal-bg/80 backdrop-blur-sm z-50 flex items-center justify-center",
      className
    )}>
      <div className="bg-terminal-header border border-terminal-border rounded-lg p-6 text-center">
        <LoadingDots className="mb-4" />
        <div className="text-terminal-text font-mono">{message}</div>
      </div>
    </div>
  );
}