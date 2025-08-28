'use client';

import { PrintPreviewModal } from '@/components/ui/PrintPreviewModal';
import Link from 'next/link';
import { useState } from 'react';
import RegenerateDaysButton from './RegenerateDaysButton';

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

interface WeekPageClientProps {
  week: Week;
}

export default function WeekPageClient({ week }: WeekPageClientProps) {
  const [showPrintModal, setShowPrintModal] = useState(false);
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const hasDailyEntries = week.days.length > 0;

  return (
    <>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                {week.term.name}: Week {week.number} — {week.title || 'Theme TBD'}
              </h1>
              <div className="text-sm text-slate-600">
                {week.startDate.toLocaleDateString()} → {week.endDate.toLocaleDateString()}
              </div>
            </div>
            
            <button
              onClick={() => setShowPrintModal(true)}
              className="inline-flex items-center gap-2 border border-slate-300 text-slate-700 px-4 py-2 rounded-lg font-medium hover:bg-slate-50 transition-colors"
            >
              🖨️ Print & Export
            </button>
          </div>
        </div>
        
        {/* Curriculum Context Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                <span className="text-indigo-600 font-semibold text-sm">🎯</span>
              </div>
              <h2 className="text-xl font-bold text-indigo-900">
                Week {week.number} Curriculum Framework
              </h2>
              <Link 
                href={`/curriculum/term1`}
                className="ml-auto text-sm text-indigo-600 hover:text-indigo-700 font-medium"
              >
                View Full Framework →
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Learning Areas */}
              <div>
                <h3 className="font-semibold text-indigo-900 mb-3 flex items-center gap-2">
                  <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                  Learning Areas
                </h3>
                <div className="text-sm text-indigo-800 space-y-2">
                  <p><strong>Numeracy:</strong> Counting, patterns, measurement</p>
                  <p><strong>Literacy:</strong> Letter recognition, vocabulary, stories</p>
                  <p><strong>Creative:</strong> Art, music, imaginative play</p>
                </div>
              </div>
              
              {/* Development Goals */}
              <div>
                <h3 className="font-semibold text-indigo-900 mb-3 flex items-center gap-2">
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  Development Goals
                </h3>
                <div className="text-sm text-indigo-800 space-y-2">
                  <p><strong>Motor Skills:</strong> Fine & gross motor development</p>
                  <p><strong>Social-Emotional:</strong> Self-awareness & relationships</p>
                  <p><strong>Science:</strong> Exploration & inquiry</p>
                </div>
              </div>
              
              {/* Weekly Focus */}
              <div>
                <h3 className="font-semibold text-indigo-900 mb-3 flex items-center gap-2">
                  <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
                  Weekly Focus
                </h3>
                <div className="text-sm text-indigo-800 space-y-2">
                  <p><strong>Theme:</strong> {week.title || 'Theme TBD'}</p>
                  <p><strong>Days:</strong> {week.days.length} daily plans</p>
                  <p><strong>Status:</strong> {hasDailyEntries ? 'Ready' : 'Planning needed'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-slate-900">Daily Plans</h2>
            <RegenerateDaysButton weekId={week.id} />
          </div>
          
          {!hasDailyEntries ? (
            <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-xl">
              <div className="text-slate-500 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">No Daily Plans Yet</h3>
              <p className="text-slate-600 mb-4">
                Click the &quot;Regenerate Days&quot; button above to create Monday-Friday daily plans for this week.
              </p>
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
      </div>

      {/* Print Modal */}
      {showPrintModal && (
        <PrintPreviewModal
          type="weekly"
          data={week}
          onClose={() => setShowPrintModal(false)}
        />
      )}
    </>
  );
}
