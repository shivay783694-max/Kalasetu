import React, { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ImageWithFallbackProps {
  fallbackIconSize?: number;
  containerClassName?: string;
  src?: string | null;
  alt?: string;
  className?: string;
  loading?: "lazy" | "eager";
}

export function ImageWithFallback({ 
  src, 
  alt, 
  className, 
  containerClassName,
  fallbackIconSize = 24, 
  loading,
  ...props 
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div className={cn("flex items-center justify-center bg-muted text-muted-foreground", containerClassName, className)}>
        <ImageIcon size={fallbackIconSize} />
      </div>
    );
  }

  return (
    <img 
      src={src || undefined} 
      alt={alt} 
      className={className} 
      onError={() => setError(true)} 
      loading={loading}
      referrerPolicy="no-referrer"
      {...props} 
    />
  );
}
