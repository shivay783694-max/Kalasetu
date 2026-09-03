import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Edit, Trash2, Search, Filter } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useAppData } from '../../context/AppDataContext';
import { EmptyState } from '../../components/ui/EmptyState';
import { ConfirmModal } from '../../components/ui/Modal';
import { useToast } from '../../context/ToastContext';
import { Package } from 'lucide-react';

import { ImageWithFallback } from '../../components/ui/ImageWithFallback';

export default function MyProducts() {
  const { products, deleteProduct } = useAppData();
  const { addToast } = useToast();
  const artisanId = 'a1'; // Mocked logged in user
  
  const myProducts = products.filter(p => p.artisanId === artisanId);
  const [activeTab, setActiveTab] = useState<'all' | 'published' | 'draft'>('all');
  
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  const filteredProducts = myProducts.filter(p => activeTab === 'all' || p.status === activeTab);

  const handleDelete = () => {
    if (productToDelete) {
      deleteProduct(productToDelete);
      addToast('Product deleted successfully', 'success');
      setProductToDelete(null);
    }
  };

  if (myProducts.length === 0) {
    return (
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold">My Products</h1>
        <EmptyState 
          icon={<Package size={32} />}
          title="Your craft deserves to be seen."
          description="Add your first product and let KalaSetu help you create a professional listing in seconds."
          actionText="Add Product"
          actionLink="/artisan/products/add"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Products</h1>
          <p className="text-muted-foreground">Manage your artisan store catalog.</p>
        </div>
        <Button asChild className="gap-2">
          <Link to="/artisan/products/add">
            <PlusCircle size={18} /> Add Product
          </Link>
        </Button>
      </div>

      <div className="flex gap-2 border-b border-secondary pb-1 overflow-x-auto no-scrollbar">
        <button 
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 font-bold text-xs uppercase tracking-widest border-b-2 transition-colors ${activeTab === 'all' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
        >
          All ({myProducts.length})
        </button>
        <button 
          onClick={() => setActiveTab('published')}
          className={`px-4 py-2 font-bold text-xs uppercase tracking-widest border-b-2 transition-colors ${activeTab === 'published' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
        >
          Published ({myProducts.filter(p => p.status === 'published').length})
        </button>
        <button 
          onClick={() => setActiveTab('draft')}
          className={`px-4 py-2 font-bold text-xs uppercase tracking-widest border-b-2 transition-colors ${activeTab === 'draft' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
        >
          Drafts ({myProducts.filter(p => p.status === 'draft').length})
        </button>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="py-12 text-center text-muted-foreground bg-white rounded-3xl border border-secondary border-dashed">
          No products found in this category.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-3xl border border-secondary overflow-hidden group">
              <div className="relative aspect-[4/3] bg-muted">
                <ImageWithFallback src={product.imageUrl} alt={product.title} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3">
                  <Badge variant={product.status === 'published' ? 'success' : 'warning'} className="backdrop-blur-md bg-background/90 shadow-sm">
                    {product.status}
                  </Badge>
                </div>
              </div>
              <div className="p-5">
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">{product.category}</p>
                <h3 className="font-bold text-lg line-clamp-1 mb-2">{product.title}</h3>
                <p className="font-bold text-foreground">₹{product.priceMin} - ₹{product.priceMax}</p>
                
                <div className="flex gap-2 mt-5 pt-5 border-t border-secondary">
                  <Button variant="outline" className="flex-1 text-[10px] h-8">
                    <Edit size={14} className="mr-1.5" /> Edit
                  </Button>
                  <Button variant="ghost" className="px-3 h-8 text-error hover:bg-error/10 hover:text-error" onClick={() => setProductToDelete(product.id)}>
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmModal
        isOpen={!!productToDelete}
        onClose={() => setProductToDelete(null)}
        title="Delete Product"
        message="Are you sure you want to delete this product? This action cannot be undone."
        confirmText="Delete"
        isDestructive={true}
        onConfirm={handleDelete}
      />
    </div>
  );
}
