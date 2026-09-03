import React from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionText?: string;
  actionLink?: string;
  actionClick?: () => void;
}

export function EmptyState({ icon, title, description, actionText, actionLink, actionClick }: EmptyStateProps) {
  return (
    <div className="py-16 md:py-24 flex flex-col items-center justify-center text-center bg-white rounded-3xl border border-secondary border-dashed px-6">
      <div className="w-20 h-20 bg-muted text-muted-foreground rounded-full flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground max-w-sm mb-8">
        {description}
      </p>
      
      {actionText && (
        actionLink ? (
          <Button asChild>
            <Link to={actionLink}>{actionText}</Link>
          </Button>
        ) : (
          <Button onClick={actionClick}>
            {actionText}
          </Button>
        )
      )}
    </div>
  );
}
