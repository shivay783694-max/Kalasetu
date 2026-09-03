import React from 'react';
import { Product, Artisan } from '../../types';
import { Card, CardContent } from './Card';
import { Badge } from './Badge';
import { MapPin, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ImageWithFallback } from './ImageWithFallback';

export interface ProductCardProps {
  product: Product;
  artisan?: Artisan;
  key?: React.Key;
}

export function ProductCard({ product, artisan }: ProductCardProps) {
  return (
    <Link to={`/products/${product.id}`} className="group block h-full">
      <Card className="h-full flex flex-col hover:shadow-md transition-shadow duration-300 border-secondary/60 hover:border-primary/30">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <ImageWithFallback 
            src={product.imageUrl} 
            alt={product.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="backdrop-blur-md bg-background/80 shadow-sm">{product.category}</Badge>
          </div>
        </div>
        
        <CardContent className="p-4 flex-1 flex flex-col">
          <h3 className="font-semibold text-lg line-clamp-2 mb-1 group-hover:text-primary transition-colors">{product.title}</h3>
          
          <div className="flex items-baseline gap-1 mb-3">
            <span className="text-sm text-muted-foreground">₹</span>
            <span className="font-bold text-lg">{product.priceMin}</span>
            <span className="text-sm text-muted-foreground mx-1">-</span>
            <span className="text-sm text-muted-foreground">₹{product.priceMax}</span>
          </div>
          
          <div className="mt-auto pt-3 border-t border-secondary/50">
            {artisan ? (
              <div className="flex items-center gap-2">
                <ImageWithFallback 
                  src={artisan.profileImage} 
                  alt={artisan.name} 
                  className="w-6 h-6 rounded-full object-cover bg-muted flex-shrink-0" 
                  fallbackIconSize={12}
                />
                <div className="flex-1 overflow-hidden">
                  <p className="text-xs font-medium text-foreground truncate flex items-center gap-1">
                    {artisan.name}
                    {artisan.isVerified && <ShieldCheck size={12} className="text-success inline" />}
                  </p>
                  <p className="text-[10px] text-muted-foreground flex items-center gap-0.5 truncate">
                    <MapPin size={10} /> {product.location}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <MapPin size={12} /> {product.location}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
