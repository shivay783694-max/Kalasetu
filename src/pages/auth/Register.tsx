import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Logo } from '../../components/ui/Logo';
import { ShieldCheck } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({ name: '', mobile: '', craftType: '', state: '', district: '' });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.mobile || formData.mobile.length < 10) newErrors.mobile = 'Valid mobile is required';
    if (!formData.craftType) newErrors.craftType = 'Craft type is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Mock register, redirect to artisan dashboard
    navigate('/artisan/dashboard');
  };

  return (
    <div className="max-w-xl mx-auto w-full pt-8 md:pt-16 pb-12 px-4">
      <div className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-secondary text-center">
        <div className="flex justify-center mb-4">
          <Logo iconOnly />
        </div>
        <h1 className="text-2xl font-serif font-bold mb-2">Join KalaSetu</h1>
        <p className="text-muted-foreground mb-8 text-sm">Create your free artisan store and connect with buyers across India.</p>
        
        <form onSubmit={handleRegister} className="space-y-5 text-left">
          <div className="grid md:grid-cols-2 gap-5">
            <Input 
              label="Full Name" 
              placeholder="E.g. Ramesh Kumar" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              error={errors.name}
            />
            <Input 
              label="Mobile Number" 
              type="tel" 
              placeholder="+91" 
              value={formData.mobile}
              onChange={(e) => setFormData({...formData, mobile: e.target.value})}
              error={errors.mobile}
            />
          </div>
          
          <Input 
            label="Craft Type" 
            placeholder="E.g. Terracotta Pottery, Bamboo Weaving" 
            value={formData.craftType}
            onChange={(e) => setFormData({...formData, craftType: e.target.value})}
            error={errors.craftType}
          />
          
          <div className="grid md:grid-cols-2 gap-5">
            <Input 
              label="State" 
              placeholder="E.g. Rajasthan" 
              value={formData.state}
              onChange={(e) => setFormData({...formData, state: e.target.value})}
            />
            <Input 
              label="District / City" 
              placeholder="E.g. Udaipur" 
              value={formData.district}
              onChange={(e) => setFormData({...formData, district: e.target.value})}
            />
          </div>

          <div className="flex items-start gap-3 mt-6 p-4 bg-success/10 rounded-xl text-success-foreground border border-success/20">
            <ShieldCheck className="shrink-0 text-success mt-0.5" size={20} />
            <p className="text-sm">Your information is secure. We will only use this to set up your public store and connect you with verified buyers.</p>
          </div>
          
          <Button type="submit" className="w-full mt-4" size="lg">
            Create Artisan Account
          </Button>
        </form>
        
        <div className="mt-8 pt-6 border-t border-secondary">
          <p className="text-muted-foreground text-sm">
            Already have an account?{' '}
            <Link to="/auth/login" className="text-primary font-bold hover:underline">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
