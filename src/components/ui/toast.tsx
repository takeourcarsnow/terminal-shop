// ═══════════════════════════════════════════════════════════════════════════════
// TOAST/NOTIFICATION COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (type: ToastType, title: string, message?: string) => void;
  removeToast: (id: string) => void;
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((type: ToastType, title: string, message?: string) => {
    const id = `toast_${Date.now()}`;
    setToasts((prev) => [...prev, { id, type, title, message }]);

    // Auto remove after 5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    addToast(type, message);
  }, [addToast]);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, showToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-md w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
        ))}
      </AnimatePresence>
    </div>
  );
}

interface ToastItemProps {
  toast: Toast;
  onClose: () => void;
}

function ToastItem({ toast, onClose }: ToastItemProps) {
  const icons = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <AlertCircle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />,
    warning: <AlertTriangle className="w-5 h-5" />,
  };

  const colors = {
    success: 'border-terminal-green text-terminal-green',
    error: 'border-terminal-red text-terminal-red',
    info: 'border-terminal-cyan text-terminal-cyan',
    warning: 'border-terminal-yellow text-terminal-yellow',
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      className={cn(
        'pointer-events-auto bg-terminal-bg border rounded-lg p-4 shadow-lg',
        'flex items-start gap-3',
        colors[toast.type]
      )}
    >
      <div className="shrink-0">{icons[toast.type]}</div>
      <div className="flex-1 font-mono text-sm">
        <div className="font-medium text-terminal-text">{toast.title}</div>
        {toast.message && (
          <div className="text-terminal-muted mt-1">{toast.message}</div>
        )}
      </div>
      <button
        onClick={onClose}
        className="shrink-0 text-terminal-muted hover:text-terminal-text transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}
