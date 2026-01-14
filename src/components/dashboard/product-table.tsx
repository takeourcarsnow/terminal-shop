// ═══════════════════════════════════════════════════════════════════════════════
// PRODUCT MANAGEMENT TABLE COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Edit, Trash2, Plus, Search } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice, truncate } from '@/lib/utils';
import {
  Table,
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableEmpty,
  StockBadge,
  Badge,
  Button,
  TerminalWindow,
  Input,
  ConfirmModal,
} from '@/components/ui';
import { useToast } from '@/components/ui/toast';

interface ProductTableProps {
  products: Product[];
}

export function ProductTable({ products }: ProductTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; product: Product | null }>({
    open: false,
    product: null,
  });
  const { addToast } = useToast();

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = () => {
    if (deleteModal.product) {
      // In a real app, this would call an API
      addToast('success', 'Product deleted', deleteModal.product.name);
    }
  };

  return (
    <>
      <TerminalWindow title="~/products/manage.sh">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="grep -i 'product name'"
              prefix="$"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              suffix={<Search className="w-4 h-4" />}
            />
          </div>
          <Link href="/dashboard/products/new">
            <Button icon={<Plus className="w-4 h-4" />}>
              Add Product
            </Button>
          </Link>
        </div>

        {/* Terminal output */}
        <div className="font-mono text-sm text-terminal-muted mb-4">
          <span className="text-terminal-green">$</span> ls -la products/ | grep{' '}
          <span className="text-terminal-cyan">
            "{searchQuery || '*'}"
          </span>
          <br />
          Found {filteredProducts.length} items
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell header>Product</TableCell>
                <TableCell header>Category</TableCell>
                <TableCell header>Price</TableCell>
                <TableCell header>Stock</TableCell>
                <TableCell header>Status</TableCell>
                <TableCell header>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProducts.length === 0 ? (
                <TableEmpty message="No products found" colSpan={6} />
              ) : (
                filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-terminal-header rounded flex items-center justify-center text-lg">
                          📦
                        </div>
                        <div>
                          <div className="text-terminal-text font-medium">
                            {truncate(product.name, 25)}
                          </div>
                          <div className="text-xs text-terminal-muted">
                            {product.id}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-terminal-cyan">/{product.category}</span>
                    </TableCell>
                    <TableCell>
                      <div>
                        <span className="text-terminal-green">
                          {formatPrice(product.price)}
                        </span>
                        {product.originalPrice && (
                          <div className="text-xs text-terminal-muted line-through">
                            {formatPrice(product.originalPrice)}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <StockBadge stock={product.stock} />
                    </TableCell>
                    <TableCell>
                      {product.featured ? (
                        <Badge variant="success">Featured</Badge>
                      ) : (
                        <Badge variant="default">Standard</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Link href={`/dashboard/products/${product.id}`}>
                          <Button variant="ghost" size="sm" className="p-2">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-2 text-terminal-red hover:text-terminal-red"
                          onClick={() => setDeleteModal({ open: true, product })}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </TerminalWindow>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, product: null })}
        onConfirm={handleDelete}
        title="rm -rf product"
        message={`Are you sure you want to delete "${deleteModal.product?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        variant="danger"
      />
    </>
  );
}
