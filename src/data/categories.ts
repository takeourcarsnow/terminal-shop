// ═══════════════════════════════════════════════════════════════════════════════
// DEMO CATEGORIES DATA
// ═══════════════════════════════════════════════════════════════════════════════

import { Category } from '@/types';

export const categories: Category[] = [
  {
    id: 'cat_001',
    name: 'Keyboards',
    slug: 'keyboards',
    description: 'Mechanical keyboards for the discerning developer',
    icon: '⌨️',
    productCount: 2,
  },
  {
    id: 'cat_002',
    name: 'Monitors',
    slug: 'monitors',
    description: 'High-resolution displays with terminal aesthetics',
    icon: '🖥️',
    productCount: 1,
  },
  {
    id: 'cat_003',
    name: 'Apparel',
    slug: 'apparel',
    description: 'Wear your code pride',
    icon: '👕',
    productCount: 2,
  },
  {
    id: 'cat_004',
    name: 'Accessories',
    slug: 'accessories',
    description: 'Essential gear for your workstation',
    icon: '🎧',
    productCount: 5,
  },
  {
    id: 'cat_005',
    name: 'Hardware',
    slug: 'hardware',
    description: 'Single board computers and dev boards',
    icon: '🔧',
    productCount: 1,
  },
  {
    id: 'cat_006',
    name: 'Security',
    slug: 'security',
    description: 'Protect your digital identity',
    icon: '🔐',
    productCount: 1,
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(c => c.slug === slug);
}
