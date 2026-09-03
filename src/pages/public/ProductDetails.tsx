import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppData } from '../../context/AppDataContext';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { MapPin, ShieldCheck, MessageCircle, Heart, ArrowLeft } from 'lucide-react';
import { ProductCard } from '../../components/ui/ProductCard';
import { ImageWithFallback } from '../../components/ui/ImageWithFallback';
import { useToast } from '../../context/ToastContext';

export default function ProductDetails() {
  const { id } = useParams();
  const { products, artisans } = useAppData();
  const { addToast } = useToast();
  
  const product = products.find(p => p.id === id);
  const artisan = product ? artisans.find(a => a.id === product.artisanId) : null;
  
  if (!product || !artisan) {
    return <div className="p-12 text-center">Product not found.</div>;
  }

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id && p.status === 'published').slice(0, 4);

  return (
    <div className="flex flex-col gap-12">
      <Link to="/marketplace" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground w-fit">
        <ArrowLeft size={16} className="mr-2" /> Back to Marketplace
      </Link>

      <div className="grid md:grid-cols-2 gap-8 md:gap-16">
        {/* Product Image Gallery */}
        <div className="rounded-3xl overflow-hidden bg-white border border-secondary p-2 shadow-sm">
          <ImageWithFallback 
            src={product.imageUrl} 
            alt={product.title} 
            className="w-full aspect-[4/5] md:aspect-square object-cover rounded-2xl"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <Badge variant="secondary" className="w-fit mb-4">{product.category}</Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">{product.title}</h1>
          
          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-2xl font-bold">₹{product.priceMin}</span>
            <span className="text-xl text-muted-foreground">-</span>
            <span className="text-2xl font-bold">₹{product.priceMax}</span>
            <span className="text-sm text-muted-foreground ml-2">(Estimated Fair Price)</span>
          </div>

          <div className="space-y-6 mb-8">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-2">Description</h3>
              <p className="text-foreground leading-relaxed">{product.descriptionEn}</p>
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-2">विवरण (Hindi)</h3>
              <p className="text-foreground leading-relaxed font-sans">{product.descriptionHi}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-secondary/30 rounded-2xl p-4 border border-secondary">
              <span className="block text-xs text-muted-foreground font-medium mb-1">Craft Type</span>
              <span className="font-semibold">{product.craftType}</span>
            </div>
            <div className="bg-secondary/30 rounded-2xl p-4 border border-secondary">
              <span className="block text-xs text-muted-foreground font-medium mb-1">Location</span>
              <span className="font-semibold truncate">{product.location}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-auto">
            <Button size="lg" className="flex-1 gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white" onClick={() => addToast('WhatsApp integration coming soon!', 'info')}>
              <MessageCircle size={20} /> Contact Artisan on WhatsApp
            </Button>
            <Button size="lg" variant="outline" className="px-6 shrink-0 gap-2">
              <Heart size={20} /> Save
            </Button>
          </div>
        </div>
      </div>

      {/* Artisan Profile Section */}
      <div className="bg-white rounded-3xl p-6 md:p-10 border border-secondary mt-4">
        <h2 className="text-2xl font-bold mb-8">About the Artisan</h2>
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center">
          <ImageWithFallback src={artisan.profileImage} alt={artisan.name} className="w-24 h-24 rounded-full object-cover shadow-sm ring-4 ring-secondary/50 flex-shrink-0" fallbackIconSize={32} />
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
              <h3 className="text-xl font-bold">{artisan.name}</h3>
              {artisan.isVerified && (
                <Badge variant="success" className="w-fit"><ShieldCheck size={14} className="mr-1" /> Verified Artisan</Badge>
              )}
            </div>
            <p className="text-muted-foreground mb-3 flex items-center gap-2">
              <MapPin size={16} /> {artisan.district}, {artisan.state}
            </p>
            <p className="text-foreground">{artisan.about}</p>
          </div>
          <Button variant="outline">View Full Store</Button>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-6">More from this craft</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map(p => {
              const a = artisans.find(art => art.id === p.artisanId);
              return <ProductCard key={p.id} product={p} artisan={a} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
}
