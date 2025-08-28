import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Badge } from './Badge';
import { Card } from './Card';

interface WeekCardProps {
  id: string;
  number: number;
  title: string;
  startDate: Date;
  endDate: Date;
  termName: string;
  href: string;
}

export function WeekCard({ id, number, title, startDate, endDate, termName, href }: WeekCardProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <Card className="p-4 hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium text-slate-600">{termName}: Week {number}</span>
            <Badge variant="theme">{title}</Badge>
          </div>
          <p className="text-xs text-slate-500 mb-3">
            {formatDate(startDate)} → {formatDate(endDate)}
          </p>
          <Link 
            href={href}
            className="inline-flex items-center gap-1 text-xs font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            View week plan
            <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="flex-shrink-0 text-slate-400">
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </Card>
  );
}
