// ═══════════════════════════════════════════════════════════════════════════════
// ERROR BOUNDARY COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import React, { Component, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button, TerminalWindow } from '@/components/ui';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[400px] flex items-center justify-center p-4">
          <TerminalWindow title="~/error.log" className="max-w-md">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-terminal-red">
                <AlertTriangle className="w-5 h-5" />
                <span className="font-mono text-sm">System Error</span>
              </div>

              <div className="text-terminal-muted text-sm font-mono">
                An unexpected error occurred while rendering this component.
              </div>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="bg-terminal-bg border border-terminal-border rounded p-3">
                  <div className="text-terminal-yellow text-xs font-mono mb-1">
                    Error Details:
                  </div>
                  <div className="text-terminal-text text-xs font-mono break-all">
                    {this.state.error.message}
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => this.setState({ hasError: false, error: undefined })}
                  icon={<RefreshCw className="w-4 h-4" />}
                >
                  Retry
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => window.location.reload()}
                >
                  Reload Page
                </Button>
              </div>
            </div>
          </TerminalWindow>
        </div>
      );
    }

    return this.props.children;
  }
}

// Hook for functional components
export function useErrorHandler() {
  return (error: Error, errorInfo?: { componentStack?: string }) => {
    console.error('Error handled:', error, errorInfo);
    // Could integrate with error reporting service here
  };
}