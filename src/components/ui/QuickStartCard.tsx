import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { Card } from './Card';

interface QuickStartCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  cta: string;
}

export function QuickStartCard({ title, description, icon: Icon, href, cta }: QuickStartCardProps) {
  return (
    <Card className="p-6 hover:shadow-md transition-all duration-200">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
          <Icon className="w-6 h-6 text-indigo-600" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
          <p className="text-sm text-slate-600 mb-4 leading-relaxed">{description}</p>
          <Link 
            href={href}
            className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            {cta}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </Card>
  );
}
