// ═══════════════════════════════════════════════════════════════════════════════
// DASHBOARD CATEGORIES PAGE
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import React, { useState } from 'react';
import { categories } from '@/data/categories';
import { products } from '@/data/products';
import { TerminalWindow } from '@/components/ui/terminal-window';
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input, Textarea } from '@/components/ui/input';
import { Modal } from '@/components/ui/modal';
import { Plus, Edit, Trash2, Package, FolderTree } from 'lucide-react';

interface CategoryFormData {
  name: string;
  slug: string;
  description: string;
}

export default function DashboardCategoriesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [formData, setFormData] = useState<CategoryFormData>({
    name: '',
    slug: '',
    description: '',
  });

  const categoriesWithCount = categories.map((category) => ({
    ...category,
    productCount: products.filter((p) => p.category === category.slug).length,
  }));

  const totalProducts = products.length;
  const totalCategories = categories.length;
  const avgProductsPerCategory = Math.round(totalProducts / totalCategories);

  const handleEdit = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId);
    if (category) {
      setFormData({
        name: category.name,
        slug: category.slug,
        description: category.description,
      });
      setEditingCategory(categoryId);
      setIsModalOpen(true);
    }
  };

  const handleCreate = () => {
    setFormData({ name: '', slug: '', description: '' });
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would save to database
    console.log('Saving category:', formData);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="font-mono text-sm text-terminal-muted mb-2">
            <span className="text-terminal-green">admin@terminal-shop:~$</span> tree /categories
          </div>
          <h1 className="text-2xl md:text-3xl font-mono text-terminal-text">
            Categories
          </h1>
          <p className="text-terminal-muted font-mono text-sm mt-1">
            Organize your product catalog
          </p>
        </div>
        <Button onClick={handleCreate} className="self-start">
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <TerminalWindow title="total.txt" className="p-4">
          <div className="flex items-center space-x-3">
            <FolderTree className="w-5 h-5 text-terminal-green" />
            <div>
              <p className="text-terminal-muted text-xs font-mono">Total Categories</p>
              <p className="text-2xl font-mono text-terminal-text">{totalCategories}</p>
            </div>
          </div>
        </TerminalWindow>

        <TerminalWindow title="products.txt" className="p-4">
          <div className="flex items-center space-x-3">
            <Package className="w-5 h-5 text-terminal-green" />
            <div>
              <p className="text-terminal-muted text-xs font-mono">Total Products</p>
              <p className="text-2xl font-mono text-terminal-text">{totalProducts}</p>
            </div>
          </div>
        </TerminalWindow>

        <TerminalWindow title="avg.txt" className="p-4">
          <div className="flex items-center space-x-3">
            <Package className="w-5 h-5 text-terminal-green" />
            <div>
              <p className="text-terminal-muted text-xs font-mono">Avg Products/Category</p>
              <p className="text-2xl font-mono text-terminal-text">{avgProductsPerCategory}</p>
            </div>
          </div>
        </TerminalWindow>
      </div>

      {/* Categories Tree View */}
      <TerminalWindow title="tree_output.txt">
        <div className="p-4 font-mono text-sm">
          <div className="text-terminal-green mb-2">.</div>
          {categoriesWithCount.map((category, index) => {
            const isLast = index === categoriesWithCount.length - 1;
            const prefix = isLast ? '└── ' : '├── ';
            return (
              <div key={category.id} className="flex items-center">
                <span className="text-terminal-muted">{prefix}</span>
                <span className="text-terminal-accent">{category.slug}/</span>
                <span className="text-terminal-muted ml-2">
                  ({category.productCount} products)
                </span>
              </div>
            );
          })}
          <div className="mt-4 text-terminal-muted">
            {totalCategories} directories, {totalProducts} files
          </div>
        </div>
      </TerminalWindow>

      {/* Categories Table */}
      <TerminalWindow title="categories.db">
        <div className="overflow-x-auto">
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>Category</TableHeader>
                <TableHeader className="hidden md:table-cell">Slug</TableHeader>
                <TableHeader>Products</TableHeader>
                <TableHeader className="hidden sm:table-cell">Description</TableHeader>
                <TableHeader>Actions</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {categoriesWithCount.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <FolderTree className="w-4 h-4 text-terminal-accent" />
                      <span className="font-mono text-terminal-text">{category.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant="secondary">{category.slug}</Badge>
                  </TableCell>
                  <TableCell>
                    <span className="font-mono text-terminal-green">
                      {category.productCount}
                    </span>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <span className="text-terminal-muted text-sm line-clamp-1">
                      {category.description}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(category.id)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-terminal-error hover:text-terminal-error"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </TerminalWindow>

      {/* Category Form Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCategory ? 'Edit Category' : 'Create Category'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-mono text-terminal-muted mb-1">
              Name
            </label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Category name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-mono text-terminal-muted mb-1">
              Slug
            </label>
            <Input
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder="category-slug"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-mono text-terminal-muted mb-1">
              Description
            </label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Category description"
              rows={3}
            />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {editingCategory ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
