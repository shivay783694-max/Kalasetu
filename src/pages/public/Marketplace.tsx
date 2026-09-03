import React, { useState } from 'react';
import { Search, Filter, SlidersHorizontal, ChevronRight } from 'lucide-react';
import { mockCategories } from '../../data/mock';
import { ProductCard } from '../../components/ui/ProductCard';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useAppData } from '../../context/AppDataContext';
import { useLanguage } from '../../context/LanguageContext';

export default function Marketplace() {
  const { products, artisans } = useAppData();
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.craftType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category.toLowerCase() === selectedCategory.toLowerCase();
    
    return matchesSearch && matchesCategory && product.status === 'published';
  });

  return (
    <div className="flex flex-col gap-8">
      {/* Header & Search */}
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Discover Handmade India</h1>
          <p className="text-muted-foreground">Support authentic artisans across the country.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <Input 
              type="text" 
              placeholder="Search products, crafts or artisans..." 
              className="pl-12 w-full rounded-full bg-white shadow-sm border-secondary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="rounded-full gap-2 shrink-0">
            <SlidersHorizontal size={18} /> Filters
          </Button>
        </div>
      </div>

      {/* Categories */}
      <div className="relative">
        <div className="flex overflow-x-auto pb-4 gap-3 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`shrink-0 px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-colors border ${
              selectedCategory === 'all' 
                ? 'bg-primary text-white border-primary' 
                : 'bg-white text-foreground border-secondary hover:border-primary/50'
            }`}
          >
            All Crafts
          </button>
          {mockCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.name.toLowerCase())}
              className={`shrink-0 px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-colors border ${
                selectedCategory === category.name.toLowerCase()
                  ? 'bg-primary text-white border-primary' 
                  : 'bg-white text-foreground border-secondary hover:border-primary/50'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
        <div className="absolute right-0 top-0 bottom-4 w-12 bg-gradient-to-l from-background to-transparent pointer-events-none sm:hidden" />
      </div>

      {/* Results */}
      <div>
        <div className="mb-6 flex justify-between items-center">
          <p className="text-sm font-medium text-muted-foreground">
            Showing {filteredProducts.length} results
          </p>
          <select className="bg-transparent text-sm font-medium focus:outline-none cursor-pointer">
            <option>Recommended</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest Arrivals</option>
          </select>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map(product => {
              const artisan = artisans.find(a => a.id === product.artisanId);
              return <ProductCard key={product.id} product={product} artisan={artisan} />;
            })}
          </div>
        ) : (
          <div className="py-24 flex flex-col items-center justify-center text-center bg-white rounded-3xl border border-secondary border-dashed">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <Search className="text-muted-foreground" size={24} />
            </div>
            <h3 className="text-lg font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground max-w-sm">
              We couldn't find any products matching your search criteria. Try adjusting your filters or search term.
            </p>
            <Button 
              variant="outline" 
              className="mt-6"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
