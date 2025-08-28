'use client';

import { WeeklyPrintLayout } from '@/components/ui/WeeklyPrintLayout';
import { Calendar, Clock, Users } from 'lucide-react';
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
  _count: {
    days: number;
  };
}

interface DailyEntry {
  id: string;
  date: Date;
  dayOfWeek: string;
  activities: Record<string, Array<{ area: string; activity: string }>>;
  reflections?: string;
}

interface WeeksPageClientProps {
  weeks: Week[];
}

export default function WeeksPageClient({ weeks }: WeeksPageClientProps) {
  const [selectedWeek, setSelectedWeek] = useState<Week | null>(null);
  const [showPrintModal, setShowPrintModal] = useState(false);

  if (weeks.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="text-center py-12">
          <Calendar className="mx-auto h-12 w-12 text-slate-400 mb-4" />
          <h1 className="text-2xl font-bold text-slate-900 mb-2">No Weeks Available</h1>
          <p className="text-slate-600 mb-6">
            No weekly plans have been created yet. Start by creating a curriculum year and terms.
          </p>
          <Link
            href="/curriculum"
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            Go to Curriculum Builder
          </Link>
        </div>
      </div>
    );
  }

  const handlePrintWeek = (week: Week) => {
    setSelectedWeek(week);
    setShowPrintModal(true);
  };

  return (
    <>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Weekly Plans</h1>
              <p className="text-slate-600">
                Manage your weekly curriculum plans and daily activities
              </p>
            </div>
            
            <div className="text-sm text-slate-500">
              Click on individual weeks to print detailed plans
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {weeks.map((week) => (
            <div key={week.id} className="border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900 mb-1">
                    Week {week.number}
                  </h2>
                  <p className="text-sm text-slate-600 mb-2">
                    {week.term.name}
                  </p>
                  <p className="text-lg font-medium text-slate-800">
                    {week.title || 'Theme TBD'}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-500 mb-1">Daily Plans</div>
                  <div className="text-2xl font-bold text-indigo-600">
                    {week._count.days}/5
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {week.startDate.toLocaleDateString()} → {week.endDate.toLocaleDateString()}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Clock className="w-4 h-4" />
                  <span>
                    {week.days.length === 0 ? 'No daily plans' : 
                     week.days.length === 5 ? 'Complete week' : 
                     `${week.days.length} days planned`}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <Link
                  href={`/weeks/${week.id}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  View Week
                </Link>
                
                {week.days.length > 0 && (
                  <button
                    onClick={() => handlePrintWeek(week)}
                    className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors"
                  >
                    Print Week
                  </button>
                )}
                
                {week.days.length === 0 && (
                  <Link
                    href={`/weeks/${week.id}`}
                    className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
                  >
                    <Users className="w-4 h-4" />
                    Start Planning
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Print Modal */}
      {showPrintModal && selectedWeek && (
        <WeeklyPrintLayout
          week={selectedWeek}
          onClose={() => {
            setShowPrintModal(false);
            setSelectedWeek(null);
          }}
        />
      )}
    </>
  );
}
