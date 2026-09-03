import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Image as ImageIcon, CheckCircle, Store, Users, Heart } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { useAppData } from '../../context/AppDataContext';
import { ProductCard } from '../../components/ui/ProductCard';
import { ImageWithFallback } from '../../components/ui/ImageWithFallback';

export default function Home() {
  const { products, artisans } = useAppData();
  const featuredProducts = products.filter(p => p.status === 'published').slice(0, 4);

  return (
    <div className="flex flex-col gap-16 md:gap-24">
      {/* Hero Section */}
      <section className="pt-8 md:pt-16 pb-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6 text-center md:text-left"
          >
            <span className="text-accent font-bold text-xs uppercase tracking-[0.2em] mb-2 mx-auto md:mx-0">Empowering Marginalized Artisans</span>
            <h1 className="text-[48px] md:text-[64px] lg:text-[72px] font-serif leading-[1.05] text-primary mb-2">
              Your Craft.<br />
              Your Story.<br />
              <span className="italic text-accent">Your Market.</span>
            </h1>
            <p className="text-lg text-secondary-foreground leading-relaxed max-w-md mx-auto md:mx-0">
              KalaSetu bridges the gap between India's traditional artisans and the global market. Use AI to transform a single photo into a professional, high-value listing instantly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4 justify-center md:justify-start">
              <Button size="lg" variant="accent" asChild className="group">
                <Link to="/auth/register">
                  Start Selling
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="bg-white border-secondary hover:bg-muted">
                <Link to="/marketplace">Explore Marketplace</Link>
              </Button>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative">
              <ImageWithFallback 
                src="https://upload.wikimedia.org/wikipedia/commons/7/7d/Handloom_weaver_in_Maheshwar_fort%2C_Khargone_district%2C_Madhya_Pradesh.jpg" 
                alt="Indian Artisan" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              <div className="absolute top-0 left-0 w-full h-1 bg-accent shadow-[0_0_15px_rgba(188,90,61,0.8)] opacity-60" />
              
              {/* Floating AI Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute bottom-6 left-6 right-6 bg-background rounded-3xl p-4 shadow-xl border border-secondary"
              >
                <div className="flex flex-col">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-bold text-accent uppercase tracking-widest">AI Scanning...</span>
                    <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1 p-3 bg-muted border border-secondary rounded-xl">
                      <div className="text-[9px] uppercase tracking-widest text-muted-foreground mb-1">Detected Craft</div>
                      <div className="text-sm font-bold text-primary truncate">Hand-Woven Bamboo</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-secondary/30 rounded-3xl p-8 md:p-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">How KalaSetu Works</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-12">We use accessible AI to remove digital barriers for artisans with low digital literacy.</p>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-white shadow-sm flex items-center justify-center text-primary border-4 border-secondary">
              <ImageIcon size={32} />
            </div>
            <h3 className="text-xl font-bold">1. Take a Photo</h3>
            <p className="text-muted-foreground text-sm">Artisan simply takes a clear picture of their handcrafted product using their phone.</p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-white shadow-sm flex items-center justify-center text-accent border-4 border-secondary">
              <Sparkles size={32} />
            </div>
            <h3 className="text-xl font-bold">2. AI Magic</h3>
            <p className="text-muted-foreground text-sm">Our AI analyzes the image, identifies the craft, writes descriptions (En/Hi), and suggests pricing.</p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-white shadow-sm flex items-center justify-center text-success border-4 border-secondary">
              <Store size={32} />
            </div>
            <h3 className="text-xl font-bold">3. Start Selling</h3>
            <p className="text-muted-foreground text-sm">Artisan reviews, approves, and instantly publishes to the national marketplace.</p>
          </div>
        </div>
      </section>

      {/* Featured Products Preview */}
      <section>
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Discover Handicrafts</h2>
            <p className="text-muted-foreground">Authentic products directly from the makers.</p>
          </div>
          <Button variant="ghost" asChild className="hidden sm:flex">
            <Link to="/marketplace">View All <ArrowRight size={16} className="ml-2" /></Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {featuredProducts.map(product => {
            const artisan = artisans.find(a => a.id === product.artisanId);
            return <ProductCard key={product.id} product={product} artisan={artisan} />;
          })}
        </div>
        
        <Button variant="outline" className="w-full mt-8 sm:hidden" asChild>
          <Link to="/marketplace">View All Products</Link>
        </Button>
      </section>
      
      {/* Impact Section */}
      <section className="bg-primary text-primary-foreground rounded-3xl p-8 md:p-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Bridging the Gap</h2>
            <p className="text-primary-foreground/80 mb-8 text-lg">
              KalaSetu empowers marginalized Indian artisans by removing the technical complexities of online selling. No need to worry about writing SEO descriptions, translating to English, or figuring out competitive pricing.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <CheckCircle className="text-accent" size={24} />
                <span>Zero commission marketplace</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="text-accent" size={24} />
                <span>Bilingual support (Hindi & English)</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="text-accent" size={24} />
                <span>Direct WhatsApp connection <span className="opacity-70 italic text-sm">(Coming Soon)</span></span>
              </li>
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/10 flex flex-col items-center justify-center text-center">
                <Users size={32} className="text-accent mb-3" />
                <div className="text-3xl font-bold mb-1">500+</div>
                <div className="text-sm text-primary-foreground/70">Demo Artisans</div>
             </div>
             <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/10 flex flex-col items-center justify-center text-center">
                <Heart size={32} className="text-accent mb-3" />
                <div className="text-3xl font-bold mb-1">2,000+</div>
                <div className="text-sm text-primary-foreground/70">Demo Listings</div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
