import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Logo } from '../../components/ui/Logo';

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login, redirect to artisan dashboard
    navigate('/artisan/dashboard');
  };

  return (
    <div className="max-w-md mx-auto w-full pt-12 md:pt-24 pb-12 px-4">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-secondary text-center">
        <div className="flex justify-center mb-6">
          <Logo iconOnly className="scale-125" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Welcome back</h1>
        <p className="text-muted-foreground mb-8">Login to your Artisan account to manage your products.</p>
        
        <form onSubmit={handleLogin} className="space-y-4 text-left">
          <Input 
            label="Mobile Number" 
            type="tel" 
            placeholder="+91" 
            required 
          />
          <Input 
            label="Password (or OTP)" 
            type="password" 
            placeholder="••••••••" 
            required 
          />
          
          <div className="flex justify-end">
            <Link to="#" className="text-sm text-primary font-medium hover:underline">Forgot password?</Link>
          </div>
          
          <Button type="submit" className="w-full mt-2" size="lg">
            Login Securely
          </Button>
        </form>
        
        <div className="mt-8 pt-6 border-t border-secondary">
          <p className="text-muted-foreground text-sm">
            Don't have an account yet?{' '}
            <Link to="/auth/register" className="text-primary font-bold hover:underline">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
