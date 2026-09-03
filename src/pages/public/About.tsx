import React from 'react';
import { Leaf, Users, ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="flex flex-col gap-16 md:gap-24 pt-8">
      {/* Hero */}
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Bridging the Gap for Indian Artisans</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          KalaSetu is a Smart India Hackathon (SIH26090) initiative dedicated to bringing the power of Artificial Intelligence to marginalized craftsmen, enabling direct market linkage without intermediaries.
        </p>
      </section>

      {/* Mission */}
      <section className="bg-white rounded-3xl p-8 md:p-12 border border-secondary shadow-sm">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
              <Leaf size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">Empowering Crafts</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">Preserving traditional Indian arts by providing modern digital tools specifically designed for low digital literacy.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-accent/10 text-accent rounded-2xl flex items-center justify-center mb-6">
              <Users size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">Direct Linkage</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">Connecting buyers directly to makers via simple interfaces like WhatsApp. Zero commissions, pure commerce.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-success/10 text-success rounded-2xl flex items-center justify-center mb-6">
              <ShieldCheck size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">Fair Pricing</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">AI analysis helps suggest fair market prices, ensuring artisans are not exploited and buyers get authentic value.</p>
          </div>
        </div>
      </section>

      {/* The Problem & Solution */}
      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-6">The Problem Statement</h2>
          <p className="text-muted-foreground mb-4">
            Millions of highly skilled artisans in rural India lack the technical literacy, English proficiency, and marketing skills required to sell on complex modern e-commerce platforms like Amazon or Flipkart.
          </p>
          <p className="text-muted-foreground mb-6">
            They struggle to write SEO-optimized descriptions, take professional photos, or determine competitive pricing, leaving them reliant on middlemen who absorb the majority of the profit margins.
          </p>
          <Button variant="outline" asChild>
             <a href="#" target="_blank" rel="noopener">Read SIH26090 Brief</a>
          </Button>
        </div>
        <div className="bg-primary text-primary-foreground rounded-3xl p-8 md:p-12">
           <h2 className="text-2xl font-bold mb-6">The KalaSetu Solution</h2>
           <ul className="space-y-6">
             <li className="flex gap-4">
                <div className="bg-white/20 text-white w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold">1</div>
                <div>
                   <h4 className="font-bold mb-1">One-Click AI Cataloging</h4>
                   <p className="text-sm text-primary-foreground/80">Turn a raw mobile photo into a complete, bilingual, SEO-ready listing automatically.</p>
                </div>
             </li>
             <li className="flex gap-4">
                <div className="bg-white/20 text-white w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold">2</div>
                <div>
                   <h4 className="font-bold mb-1">Bilingual Accessibility</h4>
                   <p className="text-sm text-primary-foreground/80">Artisans interact in Hindi, buyers browse in English. Seamless auto-translation.</p>
                </div>
             </li>
             <li className="flex gap-4">
                <div className="bg-white/20 text-white w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold">3</div>
                <div>
                   <h4 className="font-bold mb-1">WhatsApp First Connection</h4>
                   <p className="text-sm text-primary-foreground/80">Instead of complex shopping carts, buyers directly initiate WhatsApp chats with makers.</p>
                </div>
             </li>
           </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center bg-secondary/40 rounded-3xl p-12">
        <h2 className="text-3xl font-bold mb-4">Support Indian Artisans Today</h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-8">
          Every purchase made through KalaSetu puts 100% of the money directly into the hands of the creator.
        </p>
        <Button size="lg" asChild className="group">
          <Link to="/marketplace">Explore the Marketplace <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" /></Link>
        </Button>
      </section>
    </div>
  );
}
