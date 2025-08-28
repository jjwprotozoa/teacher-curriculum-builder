import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'theme' | 'accent';
  className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
  
  const variants = {
    default: "bg-slate-100 text-slate-800",
    theme: "bg-indigo-100 text-indigo-800",
    accent: "bg-indigo-600 text-white"
  };
  
  return (
    <span className={cn(baseClasses, variants[variant], className)}>
      {children}
    </span>
  );
}
