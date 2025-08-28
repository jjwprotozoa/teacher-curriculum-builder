'use client';

import { PrintPreviewModal } from '@/components/ui/PrintPreviewModal';
import { WeekCard } from '@/components/ui/WeekCard';
import { useState } from 'react';

interface WeeklyPlan {
  id: string;
  goals?: Record<string, string[]>;
  notes?: string;
  stretch?: Record<string, unknown>;
  resources?: Record<string, unknown>;
}

interface Week {
  id: string;
  number: number;
  title: string;
  startDate: Date;
  endDate: Date;
  weeklyPlan?: WeeklyPlan;
  days: DailyEntry[];
}

interface Term {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  project: {
    title: string;
    year: number;
    ageGroup: string;
  };
  weeks: Week[];
}

interface DailyEntry {
  id: string;
  date: Date;
  dayOfWeek: string;
  activities: Record<string, Array<{ area: string; activity: string }>>;
  reflections?: string;
}

interface TermPageClientProps {
  term: Term;
}

export default function TermPageClient({ term }: TermPageClientProps) {
  const [showPrintModal, setShowPrintModal] = useState(false);

  return (
    <>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">{term.name}</h1>
              <p className="text-lg text-slate-600">
                {term.startDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} → {term.endDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
            
            <button
              onClick={() => setShowPrintModal(true)}
              className="inline-flex items-center gap-2 border border-slate-300 text-slate-700 px-4 py-2 rounded-lg font-medium hover:bg-slate-50 transition-colors"
            >
              Print Term
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {term.weeks.map(week => (
            <WeekCard
              key={week.id}
              id={week.id}
              number={week.number}
              title={week.title || 'Theme TBD'}
              startDate={week.startDate}
              endDate={week.endDate}
              termName={term.name}
              href={`/weeks/${week.id}`}
            />
          ))}
        </div>
      </div>

      {/* Print Modal */}
      {showPrintModal && (
        <PrintPreviewModal
          type="term"
          data={term}
          onClose={() => setShowPrintModal(false)}
        />
      )}
    </>
  );
}
