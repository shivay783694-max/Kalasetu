import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, Search, ShoppingBag, User, Menu, X } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';
import { useLanguage } from '../../context/LanguageContext';

export function PublicLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.marketplace'), path: '/marketplace' },
    { name: t('nav.about'), path: '/about' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      {/* Desktop & Mobile Header */}
      <header className="sticky top-0 z-50 w-full border-b border-secondary/50 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Logo />

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "transition-colors hover:text-accent",
                  location.pathname === link.path ? "text-accent" : "text-foreground"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher />
            <Button variant="outline" asChild>
              <Link to="/auth/login">{t('nav.login')}</Link>
            </Button>
            <Button variant="default" asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link to="/auth/register">{t('nav.register')}</Link>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-16 left-0 w-full bg-background border-b border-secondary/50 shadow-lg z-40"
          >
            <div className="flex flex-col p-4 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-xl text-base font-medium transition-colors",
                    location.pathname === link.path ? "bg-secondary text-primary" : "text-muted-foreground hover:bg-muted"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-px bg-secondary my-2 w-full" />
              <Button variant="outline" className="w-full justify-center" asChild onClick={() => setIsMobileMenuOpen(false)}>
                <Link to="/auth/login">Login</Link>
              </Button>
              <Button variant="accent" className="w-full justify-center" asChild onClick={() => setIsMobileMenuOpen(false)}>
                <Link to="/auth/register">Join as Artisan</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 md:pb-12">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation (App-like feel) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-background border-t border-secondary/50 flex items-center justify-around z-50 pb-safe">
        <Link to="/" className={cn("flex flex-col items-center p-2", location.pathname === '/' ? 'text-accent' : 'text-muted-foreground')}>
          <Home size={20} />
          <span className="text-[10px] mt-1 font-medium">Home</span>
        </Link>
        <Link to="/marketplace" className={cn("flex flex-col items-center p-2", location.pathname.includes('/marketplace') ? 'text-accent' : 'text-muted-foreground')}>
          <Search size={20} />
          <span className="text-[10px] mt-1 font-medium">Market</span>
        </Link>
        <Link to="/auth/login" className={cn("flex flex-col items-center p-2", location.pathname.includes('/auth') ? 'text-accent' : 'text-muted-foreground')}>
          <User size={20} />
          <span className="text-[10px] mt-1 font-medium">Artisan</span>
        </Link>
      </div>
      
      {/* Footer (Desktop) */}
      <footer className="hidden md:block bg-primary text-primary-foreground py-12 mt-auto">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Logo className="text-white" />
            <p className="mt-4 text-sm text-primary-foreground/80">
              AI-Driven Market Linkage for Marginalized Indian Artisans.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><Link to="/marketplace">Marketplace</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/auth/login">Artisan Login</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>Textile</li>
              <li>Terracotta</li>
              <li>Bamboo Weaving</li>
              <li>Handicrafts</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Project Info</h4>
            <p className="text-sm text-primary-foreground/80">
              Smart India Hackathon 2026<br/>
              SIH26090<br/>
              <span className="italic opacity-80">(Demo Application)</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
