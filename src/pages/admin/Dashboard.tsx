import React from 'react';
import { useAppData } from '../../context/AppDataContext';
import { Users, ShoppingBag, ShieldAlert, Activity } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';

export default function AdminDashboard() {
  const { artisans, products } = useAppData();

  const totalArtisans = artisans.length;
  const verifiedArtisans = artisans.filter(a => a.isVerified).length;
  const pendingArtisans = totalArtisans - verifiedArtisans;
  
  const totalProducts = products.length;
  const publishedProducts = products.filter(p => p.status === 'published').length;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Admin Overview</h1>
        <p className="text-muted-foreground">Platform statistics and recent activity.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <Card className="border-secondary">
          <CardContent className="p-6 flex flex-col">
            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
              <Users size={20} />
            </div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Total Artisans</p>
            <p className="text-3xl font-serif font-bold text-foreground">{totalArtisans}</p>
          </CardContent>
        </Card>

        <Card className="border-secondary">
          <CardContent className="p-6 flex flex-col">
            <div className="w-10 h-10 rounded-full bg-success/10 text-success flex items-center justify-center mb-4">
              <ShoppingBag size={20} />
            </div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Active Products</p>
            <p className="text-3xl font-serif font-bold text-foreground">{publishedProducts}</p>
          </CardContent>
        </Card>

        <Card className="border-secondary">
          <CardContent className="p-6 flex flex-col">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center mb-4">
              <ShieldAlert size={20} />
            </div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Pending Verifications</p>
            <p className="text-3xl font-serif font-bold text-foreground">{pendingArtisans}</p>
          </CardContent>
        </Card>

        <Card className="border-secondary">
          <CardContent className="p-6 flex flex-col">
            <div className="w-10 h-10 rounded-full bg-accent/10 text-accent flex items-center justify-center mb-4">
              <Activity size={20} />
            </div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Total Catalog</p>
            <p className="text-3xl font-serif font-bold text-foreground">{totalProducts}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mt-4">
         <div className="bg-white p-6 rounded-3xl border border-secondary">
            <h3 className="font-bold text-lg mb-4">Recent Artisans</h3>
            <div className="space-y-4">
              {artisans.slice(0, 5).map(artisan => (
                <div key={artisan.id} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-muted overflow-hidden shrink-0">
                    <img src={artisan.profileImage} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-bold text-sm">{artisan.name}</p>
                    <p className="text-xs text-muted-foreground">{artisan.craftType}</p>
                  </div>
                </div>
              ))}
            </div>
         </div>
         <div className="bg-white p-6 rounded-3xl border border-secondary">
            <h3 className="font-bold text-lg mb-4">Recent Products</h3>
            <div className="space-y-4">
              {products.slice(0, 5).map(product => (
                <div key={product.id} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-muted overflow-hidden shrink-0">
                    <img src={product.imageUrl} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-bold text-sm line-clamp-1">{product.title}</p>
                    <p className="text-xs text-muted-foreground">₹{product.priceMin} - {product.status}</p>
                  </div>
                </div>
              ))}
            </div>
         </div>
      </div>
    </div>
  );
}
