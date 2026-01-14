// ═══════════════════════════════════════════════════════════════════════════════
// PRODUCTS API ROUTE
// ═══════════════════════════════════════════════════════════════════════════════

import { NextResponse } from 'next/server';
import { products, searchProducts, getProductsByCategory } from '@/data/products';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  const search = searchParams.get('search');
  const category = searchParams.get('category');
  const sort = searchParams.get('sort') || 'newest';
  const featured = searchParams.get('featured');
  const limit = searchParams.get('limit');

  let filteredProducts = [...products];

  // Filter by search query
  if (search) {
    filteredProducts = searchProducts(search);
  }

  // Filter by category
  if (category) {
    filteredProducts = filteredProducts.filter(p => p.category === category);
  }

  // Filter by featured
  if (featured === 'true') {
    filteredProducts = filteredProducts.filter(p => p.featured);
  }

  // Sort products
  switch (sort) {
    case 'price-asc':
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case 'name-asc':
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'name-desc':
      filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case 'newest':
    default:
      filteredProducts.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  }

  // Limit results
  if (limit) {
    filteredProducts = filteredProducts.slice(0, parseInt(limit));
  }

  return NextResponse.json({
    products: filteredProducts,
    total: filteredProducts.length,
  });
}
