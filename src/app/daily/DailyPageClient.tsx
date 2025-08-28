'use client';

import { DailyPrintLayout } from '@/components/ui/DailyPrintLayout';
import { Calendar, Plus } from 'lucide-react';
import Link from 'next/link';
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
  term: {
    name: string;
  };
  weeklyPlan?: WeeklyPlan;
  days: DailyEntry[];
}

interface DailyEntry {
  id: string;
  date: Date;
  dayOfWeek: string;
  activities: Record<string, Array<{ area: string; activity: string }>>;
  reflections?: string;
}

interface DailyPageClientProps {
  week: Week;
}

export default function DailyPageClient({ week }: DailyPageClientProps) {
  const [showPrintModal, setShowPrintModal] = useState(false);
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const hasDailyEntries = week.days.length > 0;

  return (
    <>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Daily Plans</h1>
              <p className="text-slate-600">
                {week.term.name}: Week {week.number} — {week.title || 'Theme TBD'}
              </p>
              <p className="text-sm text-slate-500 mt-1">
                {week.startDate.toLocaleDateString()} → {week.endDate.toLocaleDateString()}
              </p>
            </div>
            
            <div className="flex gap-3">
              <Link
                href={`/weeks/${week.id}`}
                className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 px-4 py-2 rounded-lg font-medium hover:bg-slate-200 transition-colors"
              >
                <Calendar className="w-4 h-4" />
                View Week
              </Link>
              
              {!hasDailyEntries && (
                <Link
                  href={`/weeks/${week.id}`}
                  className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-medium hover:bg-blue-200 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Generate Daily Plans
                </Link>
              )}
              
              {hasDailyEntries && (
                <button
                  onClick={() => setShowPrintModal(true)}
                  className="inline-flex items-center gap-2 border border-slate-300 text-slate-700 px-4 py-2 rounded-lg font-medium hover:bg-slate-50 transition-colors"
                >
                  Print Daily Plans
                </button>
              )}
            </div>
          </div>
        </div>

        {!hasDailyEntries ? (
          <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-xl">
            <div className="text-slate-500 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">No Daily Plans Yet</h3>
            <p className="text-slate-600 mb-4">
              Daily plans haven&apos;t been generated for this week yet.
            </p>
            <Link
              href={`/weeks/${week.id}`}
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Generate Daily Plans
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {week.days.map((day, index) => (
              <div key={day.id} className="border border-slate-200 rounded-xl p-4 text-center hover:shadow-md transition-shadow">
                <div className="text-lg font-semibold text-slate-900 mb-2">
                  {daysOfWeek[index]}
                </div>
                <div className="text-sm text-slate-600 mb-3">
                  {day.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
                
                {/* Quick summary of activities */}
                <div className="text-xs text-slate-500 mb-3 text-left">
                  {day.activities && typeof day.activities === 'object' ? (
                    <div className="space-y-1">
                      {Object.entries(day.activities).slice(0, 3).map(([time, data]: [string, any]) => (
                        <div key={time} className="truncate">
                          <span className="font-medium">{time.split(' ')[0]}</span>
                          {data?.plannedActivity ? `: ${data.plannedActivity}` : ': No activity planned'}
                        </div>
                      ))}
                      {Object.keys(day.activities).length > 3 && (
                        <div className="text-slate-400">+{Object.keys(day.activities).length - 3} more slots</div>
                      )}
                    </div>
                  ) : (
                    <div className="text-slate-400">No activities planned</div>
                  )}
                </div>
                
                <Link 
                  href={`/daily/${day.id}`}
                  className="inline-block w-full px-3 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  View & Edit Day
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Print Modal */}
      {showPrintModal && (
        <DailyPrintLayout
          week={week}
          onClose={() => setShowPrintModal(false)}
        />
      )}
    </>
  );
}
