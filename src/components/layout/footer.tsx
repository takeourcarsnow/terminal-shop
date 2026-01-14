// ═══════════════════════════════════════════════════════════════════════════════
// FOOTER COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import React from 'react';
import Link from 'next/link';
import { Terminal, Github, Twitter, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-terminal-header border-t border-terminal-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Terminal className="w-6 h-6 text-terminal-green" />
              <span className="font-mono text-lg">
                <span className="text-terminal-green">terminal</span>
                <span className="text-terminal-muted">.</span>
                <span className="text-terminal-text">shop</span>
              </span>
            </Link>
            <p className="text-terminal-muted font-mono text-sm">
              Gear for developers,<br />
              by developers.
            </p>
            <pre className="text-terminal-green text-xs mt-4 hidden md:block">
{`  .--.
 |o_o |
 |:_/ |
//   \\ \\
(|     | )
/'\\_   _/\`\\
\\___)=(___/`}
            </pre>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-mono text-terminal-cyan text-sm uppercase tracking-wider mb-4">
              /nav
            </h3>
            <ul className="space-y-2 font-mono text-sm">
              <li>
                <Link href="/products" className="text-terminal-muted hover:text-terminal-green transition-colors">
                  $ ls products/
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-terminal-muted hover:text-terminal-green transition-colors">
                  $ cat categories
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-terminal-muted hover:text-terminal-green transition-colors">
                  $ man terminal-shop
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-terminal-muted hover:text-terminal-green transition-colors">
                  $ sudo dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-mono text-terminal-cyan text-sm uppercase tracking-wider mb-4">
              /support
            </h3>
            <ul className="space-y-2 font-mono text-sm">
              <li>
                <Link href="/faq" className="text-terminal-muted hover:text-terminal-green transition-colors">
                  $ ./faq.sh
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-terminal-muted hover:text-terminal-green transition-colors">
                  $ cat shipping.txt
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-terminal-muted hover:text-terminal-green transition-colors">
                  $ git revert order
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-terminal-muted hover:text-terminal-green transition-colors">
                  $ mail support@
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-mono text-terminal-cyan text-sm uppercase tracking-wider mb-4">
              /connect
            </h3>
            <div className="flex gap-4 mb-6">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-terminal-muted hover:text-terminal-green transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-terminal-muted hover:text-terminal-green transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="mailto:hello@terminal.shop"
                className="text-terminal-muted hover:text-terminal-green transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <div className="font-mono text-xs text-terminal-muted">
              <p>$ echo $PAYMENT_METHODS</p>
              <p className="text-terminal-text">VISA MC AMEX STRIPE</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-terminal-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="font-mono text-xs text-terminal-muted">
              <span className="text-terminal-green">$</span> echo "© {currentYear} terminal.shop - All rights reserved"
            </div>
            <div className="flex gap-6 font-mono text-xs">
              <Link href="/privacy" className="text-terminal-muted hover:text-terminal-green transition-colors">
                privacy.md
              </Link>
              <Link href="/terms" className="text-terminal-muted hover:text-terminal-green transition-colors">
                terms.md
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
