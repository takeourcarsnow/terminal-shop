// ═══════════════════════════════════════════════════════════════════════════════
// ABOUT PAGE
// ═══════════════════════════════════════════════════════════════════════════════

import React from 'react';
import { Terminal, Code, Heart, Zap } from 'lucide-react';
import { TerminalWindow, AsciiDivider } from '@/components/ui';

export default function AboutPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Page Header */}
        <div className="mb-8">
          <div className="font-mono text-sm text-terminal-muted mb-2">
            <span className="text-terminal-green">$</span> man terminal-shop
          </div>
          <h1 className="text-2xl md:text-3xl font-mono text-terminal-text">
            About Terminal Shop
          </h1>
        </div>

        {/* Main Content */}
        <TerminalWindow title="TERMINAL-SHOP(1) - Manual Page">
          <div className="space-y-8 font-mono">
            {/* Name Section */}
            <section>
              <h2 className="text-terminal-cyan text-lg mb-2">NAME</h2>
              <p className="text-terminal-text pl-4">
                terminal-shop - Premium gear for developers, by developers
              </p>
            </section>

            {/* Synopsis */}
            <section>
              <h2 className="text-terminal-cyan text-lg mb-2">SYNOPSIS</h2>
              <p className="text-terminal-muted pl-4">
                <span className="text-terminal-green">terminal-shop</span> [--browse] [--checkout] [--support]
              </p>
            </section>

            {/* Description */}
            <section>
              <h2 className="text-terminal-cyan text-lg mb-2">DESCRIPTION</h2>
              <div className="text-terminal-muted pl-4 space-y-4">
                <p>
                  Terminal Shop is an e-commerce platform designed specifically for 
                  developers who appreciate the aesthetics of command-line interfaces 
                  and terminal environments.
                </p>
                <p>
                  Founded by developers who spent countless hours in terminals, we 
                  understand what makes great developer gear. Every product is selected 
                  with input from our community.
                </p>
                <p>
                  Our mission is simple: provide high-quality products that celebrate 
                  the hacker culture and make developers smile.
                </p>
              </div>
            </section>

            {/* Options/Values */}
            <section>
              <h2 className="text-terminal-cyan text-lg mb-2">VALUES</h2>
              <div className="pl-4 space-y-4">
                <div className="flex gap-4">
                  <Terminal className="w-6 h-6 text-terminal-green shrink-0 mt-1" />
                  <div>
                    <h3 className="text-terminal-text">--authenticity</h3>
                    <p className="text-terminal-muted text-sm">
                      We're developers ourselves. We know what works because we use it.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Code className="w-6 h-6 text-terminal-green shrink-0 mt-1" />
                  <div>
                    <h3 className="text-terminal-text">--quality</h3>
                    <p className="text-terminal-muted text-sm">
                      Every product is tested and approved by our team of developers.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Heart className="w-6 h-6 text-terminal-green shrink-0 mt-1" />
                  <div>
                    <h3 className="text-terminal-text">--community</h3>
                    <p className="text-terminal-muted text-sm">
                      Built with love for the developer community. Part of our profits 
                      go to open source projects.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Zap className="w-6 h-6 text-terminal-green shrink-0 mt-1" />
                  <div>
                    <h3 className="text-terminal-text">--performance</h3>
                    <p className="text-terminal-muted text-sm">
                      Fast shipping, responsive support, and a seamless shopping experience.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <AsciiDivider />

            {/* Team ASCII */}
            <section>
              <h2 className="text-terminal-cyan text-lg mb-4">THE TEAM</h2>
              <pre className="text-terminal-green text-xs pl-4">
{`┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   ╔═══╗ ╔═══╗ ╔═══╗ ╔═══╗   Built by developers who love:      │
│   ║ > ║ ║ > ║ ║ > ║ ║ > ║   • Mechanical keyboards             │
│   ║   ║ ║   ║ ║   ║ ║   ║   • Late night coding sessions       │
│   ╚═══╝ ╚═══╝ ╚═══╝ ╚═══╝   • Open source software             │
│                              • Terminal aesthetics              │
│   Alex   Sam    Jordan  Pat   • Coffee (lots of it)             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘`}
              </pre>
            </section>

            {/* See Also */}
            <section>
              <h2 className="text-terminal-cyan text-lg mb-2">SEE ALSO</h2>
              <p className="text-terminal-muted pl-4">
                <a href="/products" className="text-terminal-cyan hover:text-terminal-green">products(1)</a>,{' '}
                <a href="/categories" className="text-terminal-cyan hover:text-terminal-green">categories(1)</a>,{' '}
                <a href="/contact" className="text-terminal-cyan hover:text-terminal-green">contact(1)</a>
              </p>
            </section>

            {/* Version */}
            <section>
              <h2 className="text-terminal-cyan text-lg mb-2">VERSION</h2>
              <p className="text-terminal-muted pl-4">
                Terminal Shop v2.0.26 - January 2026
              </p>
            </section>

            {/* Footer */}
            <div className="pt-4 border-t border-terminal-border text-center text-terminal-muted text-xs">
              Terminal Shop Manual - Page 1 of 1
            </div>
          </div>
        </TerminalWindow>
      </div>
    </div>
  );
}
