// ═══════════════════════════════════════════════════════════════════════════════
// ACCESSIBILITY UTILITIES
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import React from 'react';
import { cn } from '@/lib/utils';

// Screen reader only text
export function ScreenReaderOnly({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn('sr-only', className)}>
      {children}
    </span>
  );
}

// Skip link for keyboard navigation
export function SkipLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-terminal-green text-terminal-bg px-4 py-2 rounded font-mono text-sm z-50"
    >
      {children}
    </a>
  );
}

// Focus trap utility (for modals)
export function useFocusTrap(ref: React.RefObject<HTMLElement>) {
  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    function handleTabKey(e: KeyboardEvent) {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    }

    element.addEventListener('keydown', handleTabKey);
    firstElement?.focus();

    return () => {
      element.removeEventListener('keydown', handleTabKey);
    };
  }, [ref]);
}

// Accessible button with proper ARIA attributes
interface AccessibleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  'aria-label'?: string;
  'aria-describedby'?: string;
  'aria-expanded'?: boolean;
  'aria-controls'?: string;
}

export function AccessibleButton({
  children,
  className,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  'aria-expanded': ariaExpanded,
  'aria-controls': ariaControls,
  ...props
}: AccessibleButtonProps) {
  return (
    <button
      className={className}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
      {...props}
    >
      {children}
    </button>
  );
}

// Loading announcement for screen readers
export function LoadingAnnouncement({ loading, message }: { loading: boolean; message: string }) {
  return (
    <div aria-live="polite" aria-atomic="true" className="sr-only">
      {loading ? message : ''}
    </div>
  );
}

// Error announcement
export function ErrorAnnouncement({ error }: { error: string | null }) {
  return (
    <div aria-live="assertive" aria-atomic="true" className="sr-only">
      {error}
    </div>
  );
}

// High contrast mode toggle
export function useHighContrast() {
  const [highContrast, setHighContrast] = React.useState(false);

  React.useEffect(() => {
    const saved = localStorage.getItem('terminal-shop-high-contrast');
    if (saved) {
      setHighContrast(JSON.parse(saved));
    }
  }, []);

  const toggleHighContrast = () => {
    const newValue = !highContrast;
    setHighContrast(newValue);
    localStorage.setItem('terminal-shop-high-contrast', JSON.stringify(newValue));

    if (newValue) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  };

  return { highContrast, toggleHighContrast };
}