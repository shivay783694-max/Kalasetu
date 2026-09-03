import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Package, PlusCircle, User, LogOut } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { cn } from '../../lib/utils';
import { Button } from '../ui/Button';

export function ArtisanLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Mock logout
    navigate('/');
  };

  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/artisan/dashboard' },
    { icon: PlusCircle, label: 'Add Product', path: '/artisan/products/add' },
    { icon: Package, label: 'My Products', path: '/artisan/products' },
    { icon: User, label: 'Profile', path: '/artisan/profile' },
  ];

  return (
    <div className="min-h-screen flex bg-muted/30">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-background border-r border-secondary h-screen sticky top-0">
        <div className="p-6">
          <Logo />
        </div>
        <nav className="flex-1 px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors",
                location.pathname === item.path || (item.path !== '/artisan/dashboard' && location.pathname.startsWith(item.path))
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <item.icon size={20} />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-secondary">
          <Button variant="ghost" className="w-full justify-start text-error hover:text-error hover:bg-error/10" onClick={handleLogout}>
            <LogOut size={20} className="mr-3" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-5xl mx-auto pb-24 md:pb-8">
        {/* Mobile Header */}
        <header className="md:hidden sticky top-0 z-40 bg-background border-b border-secondary p-4 flex items-center justify-between">
          <Logo />
          <Button variant="ghost" size="icon" onClick={handleLogout}>
             <LogOut size={20} />
          </Button>
        </header>

        <div className="p-4 md:p-8">
          <Outlet />
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-background border-t border-secondary flex items-center justify-around z-50 pb-safe shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        {navItems.map((item) => (
          <Link 
            key={item.path}
            to={item.path} 
            className={cn(
              "flex flex-col items-center p-2 relative w-16", 
              location.pathname === item.path || (item.path !== '/artisan/dashboard' && location.pathname.startsWith(item.path))
                ? 'text-primary' 
                : 'text-muted-foreground'
            )}
          >
            {location.pathname === item.path || (item.path !== '/artisan/dashboard' && location.pathname.startsWith(item.path)) ? (
              <div className="absolute -top-3 bg-primary text-primary-foreground p-2 rounded-full shadow-md">
                <item.icon size={20} />
              </div>
            ) : (
              <item.icon size={22} />
            )}
            <span className={cn("text-[10px] font-medium transition-all", 
               (location.pathname === item.path || (item.path !== '/artisan/dashboard' && location.pathname.startsWith(item.path))) ? "mt-5 opacity-100" : "mt-1 opacity-80"
            )}>
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
