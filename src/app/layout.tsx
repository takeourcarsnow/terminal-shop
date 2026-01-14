// ═══════════════════════════════════════════════════════════════════════════════
// ROOT LAYOUT
// ═══════════════════════════════════════════════════════════════════════════════

import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Terminal Shop | Gear for Developers',
  description: 'Premium developer gear with terminal aesthetics. Keyboards, monitors, apparel, and accessories for the discerning developer.',
  keywords: ['developer', 'terminal', 'keyboard', 'merchandise', 'ascii', 'linux', 'unix'],
  authors: [{ name: 'Terminal Shop' }],
  openGraph: {
    title: 'Terminal Shop',
    description: 'Gear for Developers, by Developers',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${jetbrainsMono.variable} font-mono antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
