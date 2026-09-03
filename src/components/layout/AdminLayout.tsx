import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, ShoppingBag, ShieldCheck, LogOut } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { cn } from '../../lib/utils';
import { Button } from '../ui/Button';

export function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Users, label: 'Artisans', path: '/admin/artisans' },
    { icon: ShoppingBag, label: 'Products', path: '/admin/products' },
    { icon: ShieldCheck, label: 'Verification', path: '/admin/verification' },
  ];

  return (
    <div className="min-h-screen flex bg-muted/30">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-[#1a1a1a] text-white border-r border-[#333] h-screen sticky top-0">
        <div className="p-6">
          <Link to="/admin" className="flex items-center gap-2">
            <ShieldCheck size={24} className="text-accent" />
            <span className="font-bold text-xl tracking-tight">KalaSetu Admin</span>
          </Link>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-widest transition-colors",
                  isActive
                    ? "bg-accent text-white"
                    : "text-gray-400 hover:bg-white/10 hover:text-white"
                )}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-[#333]">
          <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-white hover:bg-white/10" onClick={handleLogout}>
            <LogOut size={18} className="mr-3" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto pb-24 md:pb-8">
        {/* Mobile Header */}
        <header className="md:hidden sticky top-0 z-40 bg-[#1a1a1a] text-white border-b border-[#333] p-4 flex items-center justify-between">
          <Link to="/admin" className="flex items-center gap-2">
            <ShieldCheck size={20} className="text-accent" />
            <span className="font-bold">Admin</span>
          </Link>
          <Button variant="ghost" size="icon" onClick={handleLogout} className="text-gray-400">
             <LogOut size={20} />
          </Button>
        </header>

        <div className="p-4 md:p-8">
          <Outlet />
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#1a1a1a] text-gray-400 border-t border-[#333] flex items-center justify-around z-50 pb-safe">
        {navItems.map((item) => {
           const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
           return (
            <Link 
              key={item.path}
              to={item.path} 
              className={cn(
                "flex flex-col items-center p-2", 
                isActive ? 'text-accent' : 'hover:text-white'
              )}
            >
              <item.icon size={20} />
              <span className="text-[9px] mt-1 font-bold uppercase tracking-widest">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
