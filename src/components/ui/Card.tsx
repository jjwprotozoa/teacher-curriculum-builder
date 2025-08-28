import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
}

export function Card({ children, className, onClick, href }: CardProps) {
  const baseClasses = "rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-200";
  
  if (href) {
    return (
      <a href={href} className={cn(baseClasses, "block", className)}>
        {children}
      </a>
    );
  }
  
  if (onClick) {
    return (
      <button 
        onClick={onClick} 
        className={cn(baseClasses, "w-full text-left", className)}
      >
        {children}
      </button>
    );
  }
  
  return (
    <div className={cn(baseClasses, className)}>
      {children}
    </div>
  );
}
