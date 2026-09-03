import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Eye, FileText, MessageCircle, PlusCircle, Edit, Trash2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useAppData } from '../../context/AppDataContext';

import { ImageWithFallback } from '../../components/ui/ImageWithFallback';

export default function ArtisanDashboard() {
  const { artisans, products } = useAppData();
  const artisan = artisans[0]; // Mocking logged in artisan
  const artisanProducts = products.filter(p => p.artisanId === artisan.id);
  
  // Calculate dynamic stats
  const totalProducts = artisanProducts.length;
  const publishedCount = artisanProducts.filter(p => p.status === 'published').length;
  const draftCount = artisanProducts.filter(p => p.status === 'draft').length;

  return (
    <div className="flex flex-col gap-8">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome, {artisan.name.split(' ')[0]} 👋</h1>
          <p className="text-muted-foreground">Here is what's happening with your store today.</p>
        </div>
        <Button asChild size="lg" className="shrink-0 gap-2">
          <Link to="/artisan/products/add">
            <PlusCircle size={20} /> Add New Product
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-secondary flex flex-col">
          <span className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest mb-2 flex items-center gap-2"><Package size={16}/> Total Products</span>
          <span className="text-3xl font-serif font-bold">{totalProducts}</span>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-secondary flex flex-col">
          <span className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest mb-2 flex items-center gap-2"><Eye size={16}/> Published</span>
          <span className="text-3xl font-serif font-bold text-success">{publishedCount}</span>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-secondary flex flex-col">
          <span className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest mb-2 flex items-center gap-2"><FileText size={16}/> Drafts</span>
          <span className="text-3xl font-serif font-bold text-amber-500">{draftCount}</span>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-secondary flex flex-col">
          <span className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest mb-2 flex items-center gap-2"><MessageCircle size={16}/> Enquiries</span>
          <span className="text-3xl font-serif font-bold text-primary">{artisan.stats.enquiries}</span>
        </div>
      </div>

      {/* Recent Products */}
      {totalProducts === 0 ? (
        <div className="bg-white rounded-3xl border border-secondary p-12 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
            <Package className="text-muted-foreground" size={32} />
          </div>
          <h2 className="text-2xl font-bold mb-2">Your craft deserves to be seen.</h2>
          <p className="text-muted-foreground max-w-md mb-8">
            Add your first product and let KalaSetu's AI help you create a professional, bilingual listing instantly.
          </p>
          <Button asChild size="lg" className="gap-2">
            <Link to="/artisan/products/add">
              <PlusCircle size={20} /> Add Product
            </Link>
          </Button>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-secondary overflow-hidden">
          <div className="p-6 border-b border-secondary flex justify-between items-center">
            <h2 className="text-xl font-bold">Recent Products</h2>
            <Link to="/artisan/products" className="text-sm font-medium text-primary hover:underline">View All</Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-muted/50 text-muted-foreground">
                <tr>
                  <th className="p-4 font-medium">Product</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Price Range</th>
                  <th className="p-4 font-medium">Date</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary">
                {artisanProducts.slice(0, 5).map(product => (
                  <tr key={product.id} className="hover:bg-muted/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <ImageWithFallback src={product.imageUrl} alt={product.title} className="w-12 h-12 rounded-lg object-cover bg-muted" fallbackIconSize={16} />
                        <div>
                          <p className="font-semibold text-foreground max-w-[200px] truncate">{product.title}</p>
                          <p className="text-xs text-muted-foreground">{product.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant={product.status === 'published' ? 'success' : 'warning'}>
                        {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="p-4 font-medium">
                      ₹{product.priceMin} - ₹{product.priceMax}
                    </td>
                    <td className="p-4 text-muted-foreground">
                      {new Date(product.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                          <Edit size={16} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-error">
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
