import React from 'react';
import { Leaf } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
}

export function Logo({ className, iconOnly = false }: LogoProps) {
  return (
    <Link to="/" className={cn("flex items-center gap-2 group", className)}>
      <div className="bg-primary text-background p-1.5 rounded-lg group-hover:bg-accent transition-colors">
        <Leaf size={24} strokeWidth={2.5} />
      </div>
      {!iconOnly && (
        <span className="text-2xl font-serif font-bold tracking-tight text-primary">
          KalaSetu
        </span>
      )}
    </Link>
  );
}
