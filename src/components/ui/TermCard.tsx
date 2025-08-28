import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Badge } from './Badge';
import { Card } from './Card';

interface TermCardProps {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  weekCount: number;
  href: string;
}

export function TermCard({ id, name, startDate, endDate, weekCount, href }: TermCardProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <Card className="p-6 hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <h3 className="text-lg font-semibold text-slate-900">{name}</h3>
            <Badge variant="default">{weekCount} weeks</Badge>
          </div>
          <p className="text-sm text-slate-600 mb-4">
            {formatDate(startDate)} → {formatDate(endDate)}
          </p>
          <Link 
            href={href}
            className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            View weeks & themes
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="flex-shrink-0 text-slate-400">
          <ChevronRight className="w-5 h-5" />
        </div>
      </div>
    </Card>
  );
}
