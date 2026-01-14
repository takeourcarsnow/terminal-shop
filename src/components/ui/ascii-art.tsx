// ═══════════════════════════════════════════════════════════════════════════════
// ASCII ART COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface AsciiArtProps {
  art: string;
  className?: string;
  color?: 'green' | 'cyan' | 'yellow' | 'red' | 'magenta' | 'default';
}

export function AsciiArt({ art, className, color = 'green' }: AsciiArtProps) {
  const colors = {
    green: 'text-terminal-green',
    cyan: 'text-terminal-cyan',
    yellow: 'text-terminal-yellow',
    red: 'text-terminal-red',
    magenta: 'text-terminal-magenta',
    default: 'text-terminal-text',
  };

  return (
    <pre
      className={cn(
        'font-mono text-xs leading-tight whitespace-pre',
        colors[color],
        className
      )}
    >
      {art}
    </pre>
  );
}

// Logo ASCII Art
export function LogoAscii({ className }: { className?: string }) {
  const logo = `
████████╗███████╗██████╗ ███╗   ███╗██╗███╗   ██╗ █████╗ ██╗     
╚══██╔══╝██╔════╝██╔══██╗████╗ ████║██║████╗  ██║██╔══██╗██║     
   ██║   █████╗  ██████╔╝██╔████╔██║██║██╔██╗ ██║███████║██║     
   ██║   ██╔══╝  ██╔══██╗██║╚██╔╝██║██║██║╚██╗██║██╔══██║██║     
   ██║   ███████╗██║  ██║██║ ╚═╝ ██║██║██║ ╚████║██║  ██║███████╗
   ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝
███████╗██╗  ██╗ ██████╗ ██████╗                                 
██╔════╝██║  ██║██╔═══██╗██╔══██╗                                
███████╗███████║██║   ██║██████╔╝                                
╚════██║██╔══██║██║   ██║██╔═══╝                                 
███████║██║  ██║╚██████╔╝██║                                     
╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═╝                                     `;

  return <AsciiArt art={logo} className={cn('hidden md:block', className)} />;
}

// Mobile Logo
export function LogoAsciiMobile({ className }: { className?: string }) {
  const logo = `
╔╦╗┌─┐┬─┐┌┬┐┬┌┐┌┌─┐┬  
 ║ ├┤ ├┬┘│││││││├─┤│  
 ╩ └─┘┴└─┴ ┴┴┘└┘┴ ┴┴─┘
╔═╗┬ ┬┌─┐┌─┐          
╚═╗├─┤│ │├─┘          
╚═╝┴ ┴└─┘┴            `;

  return <AsciiArt art={logo} className={className} />;
}

// Decorative Dividers
export function AsciiDivider({ className }: { className?: string }) {
  return (
    <div className={cn('text-terminal-border font-mono text-xs my-4', className)}>
      ════════════════════════════════════════════════════════════
    </div>
  );
}

export function AsciiDividerDouble({ className }: { className?: string }) {
  return (
    <div className={cn('text-terminal-border font-mono text-xs my-4', className)}>
      ╔══════════════════════════════════════════════════════════╗
    </div>
  );
}

// Loading ASCII Animation
export function AsciiLoader({ className }: { className?: string }) {
  return (
    <div className={cn('font-mono text-terminal-green animate-pulse', className)}>
      <div className="flex items-center gap-2">
        <span>[</span>
        <span className="animate-spin">◐</span>
        <span>] Loading...</span>
      </div>
    </div>
  );
}

// Cart ASCII
export function CartAscii({ className }: { className?: string }) {
  const cart = `
  ┌─────────┐
  │ ≡≡≡≡≡≡≡ │
  │ ≡≡≡≡≡≡≡ │
◯─┴─────────┴─◯`;

  return <AsciiArt art={cart} className={className} color="cyan" />;
}
