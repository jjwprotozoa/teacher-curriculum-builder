'use client';

import { useEffect, useState } from 'react';

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

interface TermPrintLayoutProps {
  term: Term;
  onClose: () => void;
}

export function TermPrintLayout({ term, onClose }: TermPrintLayoutProps) {
  const [isPrinting, setIsPrinting] = useState(false);

  useEffect(() => {
    if (isPrinting) {
      window.print();
      setIsPrinting(false);
      onClose();
    }
  }, [isPrinting, onClose]);

  const handlePrint = () => {
    setIsPrinting(true);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const formatDayOfWeek = (dayOfWeek: string) => {
    const dayMap: Record<string, string> = {
      'MON': 'Monday',
      'TUE': 'Tuesday', 
      'WED': 'Wednesday',
      'THU': 'Thursday',
      'FRI': 'Friday',
      'SAT': 'Saturday',
      'SUN': 'Sunday'
    };
    return dayMap[dayOfWeek] || dayOfWeek;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 print-modal">
      <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Print Term Plan</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            ✕
          </button>
        </div>
        
        <div className="space-y-4 mb-6">
          <p className="text-slate-600">
            This will print the complete term plan with:
          </p>
          <ul className="list-disc list-inside text-slate-600 space-y-1 ml-4">
            <li>Term overview and context</li>
            <li>All weekly plans with detailed daily schedules</li>
            <li>All time slots and activities (no summaries)</li>
            <li>Proper page breaks for logical content flow</li>
          </ul>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handlePrint}
            className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Print Term Plan
          </button>
        </div>

        {/* Hidden print content */}
        <div className="hidden print:block term-print">
          {/* Title Page */}
          <div className="page-break-after">
            <div className="text-center py-20">
              <h1 className="text-4xl font-bold text-slate-900 mb-4">
                Term Plan
              </h1>
              <h2 className="text-2xl font-semibold text-indigo-700 mb-8">
                {term.name}
              </h2>
              <h3 className="text-xl text-slate-800 mb-4">
                {term.project.title} - {term.project.year}
              </h3>
              <p className="text-lg text-slate-600 mb-2">
                Age Group: {term.project.ageGroup}
              </p>
              <p className="text-lg text-slate-600">
                {formatDate(term.startDate)} → {formatDate(term.endDate)}
              </p>
              <p className="text-sm text-slate-500 mt-4">
                {new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>

          {/* Term Overview */}
          <div className="page-break-after">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Term Overview</h2>
            
            {/* Term Details */}
            <div className="mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-slate-200 rounded-lg page-break-inside-avoid">
                  <div className="font-semibold text-slate-800">Term Name</div>
                  <div className="text-2xl font-bold text-indigo-600">{term.name}</div>
                </div>
                <div className="p-4 border border-slate-200 rounded-lg page-break-inside-avoid">
                  <div className="font-semibold text-slate-800">Project</div>
                  <div className="text-lg text-slate-600">{term.project.title}</div>
                </div>
                <div className="p-4 border border-slate-200 rounded-lg page-break-inside-avoid">
                  <div className="font-semibold text-slate-800">Year</div>
                  <div className="text-lg text-slate-600">{term.project.year}</div>
                </div>
                <div className="p-4 border border-slate-200 rounded-lg page-break-inside-avoid">
                  <div className="font-semibold text-slate-800">Age Group</div>
                  <div className="text-lg text-slate-600">{term.project.ageGroup}</div>
                </div>
                <div className="p-4 border border-slate-200 rounded-lg page-break-inside-avoid">
                  <div className="font-semibold text-slate-800">Total Weeks</div>
                  <div className="text-2xl font-bold text-indigo-600">{term.weeks.length}</div>
                </div>
                <div className="p-4 border border-slate-200 rounded-lg page-break-inside-avoid">
                  <div className="font-semibold text-slate-800">Duration</div>
                  <div className="text-lg text-slate-600">
                    {Math.ceil((new Date(term.endDate).getTime() - new Date(term.startDate).getTime()) / (1000 * 60 * 60 * 24 * 7))} weeks
                  </div>
                </div>
              </div>
            </div>

            {/* Table of Contents */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-3">Weekly Plans</h3>
              <div className="space-y-2">
                {term.weeks.map((week) => (
                  <div key={week.id} className="page-break-inside-avoid">
                    <div className="font-medium text-slate-800">
                      Week {week.number}: {week.title || 'Theme TBD'}
                    </div>
                    <div className="ml-4 text-sm text-slate-600">
                      {formatDate(week.startDate)} → {formatDate(week.endDate)}
                      {week.days.length > 0 && (
                        <span className="ml-2 text-indigo-600">
                          ({week.days.length} days with plans)
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Weekly Plans - Full Expanded View */}
          {term.weeks.map((week) => (
            <div key={week.id} className="page-break-after">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Week {week.number}: {week.title || 'Theme TBD'}
              </h3>
              <p className="text-slate-600 mb-4">
                {formatDate(week.startDate)} → {formatDate(week.endDate)}
              </p>

              {/* Weekly Goals */}
              {week.weeklyPlan?.goals && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-slate-800 mb-3">Weekly Goals</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(week.weeklyPlan.goals).map(([subject, goals]) => (
                      <div key={subject} className="p-3 border border-slate-200 rounded-lg page-break-inside-avoid">
                        <div className="font-medium text-slate-800 capitalize mb-2">{subject}</div>
                        {Array.isArray(goals) && goals.length > 0 ? (
                          <ul className="text-sm text-slate-600 space-y-1">
                            {goals.map((goal: string, index: number) => (
                              <li key={index} className="flex items-start gap-2 page-break-inside-avoid">
                                <span className="text-indigo-500 mt-1">•</span>
                                <span>{goal}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-sm text-slate-500 italic">No specific goals set</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Weekly Notes */}
              {week.weeklyPlan?.notes && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-slate-800 mb-3">Notes</h4>
                  <p className="text-slate-600 p-3 bg-slate-50 rounded-lg page-break-inside-avoid">
                    {week.weeklyPlan.notes}
                  </p>
                </div>
              )}

              {/* Daily Plans - Full Expanded View */}
              {week.days.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-slate-800 mb-3">Daily Plans</h4>
                  <div className="space-y-4">
                    {week.days.map((day) => (
                      <div key={day.id} className="border border-slate-200 rounded-lg p-4 page-break-inside-avoid">
                        <h5 className="font-semibold text-slate-800 mb-3">
                          {formatDayOfWeek(day.dayOfWeek)} - {formatDate(day.date)}
                        </h5>
                        
                        {/* Activities - Full Expanded View */}
                        <div className="space-y-3">
                          {Object.entries(day.activities).map(([timeSlot, activities]) => (
                            <div key={timeSlot} className="page-break-inside-avoid">
                              <div className="font-medium text-slate-700 text-base mb-2 border-b border-slate-200 pb-1">
                                {timeSlot}
                              </div>
                              {Array.isArray(activities) && activities.length > 0 ? (
                                <div className="ml-4 space-y-2">
                                  {activities.map((activity, index) => (
                                    <div key={index} className="text-base text-slate-600 page-break-inside-avoid p-2 bg-slate-50 rounded">
                                      <span className="font-medium text-indigo-700">{activity.area}:</span> {activity.activity}
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-base text-slate-500 italic ml-4 p-2 bg-slate-50 rounded">No activities planned for this time slot</p>
                              )}
                            </div>
                          ))}
                        </div>

                        {/* Reflections */}
                        {day.reflections && (
                          <div className="mt-4 pt-3 border-t border-slate-200 page-break-inside-avoid">
                            <div className="font-medium text-slate-700 text-base mb-2">Reflections</div>
                            <p className="text-base text-slate-600 italic p-2 bg-slate-50 rounded">{day.reflections}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* No Daily Plans Message */}
              {week.days.length === 0 && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-slate-800 mb-3">Daily Plans</h4>
                  <div className="text-center py-8 border border-slate-200 rounded-lg">
                    <p className="text-slate-600 mb-2">No daily plans have been generated yet.</p>
                    <p className="text-slate-500 text-sm">Daily activities will appear here once they are created.</p>
                  </div>
                </div>
              )}

              {/* Resources */}
              {week.weeklyPlan?.resources && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-slate-800 mb-3">Resources</h4>
                  <div className="p-3 bg-slate-50 rounded-lg page-break-inside-avoid">
                    <pre className="text-sm text-slate-600 whitespace-pre-wrap">
                      {JSON.stringify(week.weeklyPlan.resources, null, 2)}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Term Summary */}
          <div className="page-break-after">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Term Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-slate-200 rounded-lg page-break-inside-avoid">
                <div className="font-semibold text-slate-800">Total Weeks</div>
                <div className="text-2xl font-bold text-indigo-600">{term.weeks.length}</div>
              </div>
              <div className="p-4 border border-slate-200 rounded-lg page-break-inside-avoid">
                <div className="font-semibold text-slate-800">Weeks with Daily Plans</div>
                <div className="text-2xl font-bold text-indigo-600">
                  {term.weeks.filter(w => w.days.length > 0).length}
                </div>
              </div>
              <div className="p-4 border border-slate-200 rounded-lg page-break-inside-avoid">
                <div className="font-semibold text-slate-800">Total Daily Plans</div>
                <div className="text-2xl font-bold text-indigo-600">
                  {term.weeks.reduce((total, week) => total + week.days.length, 0)}
                </div>
              </div>
              <div className="p-4 border border-slate-200 rounded-lg page-break-inside-avoid">
                <div className="font-semibold text-slate-800">Term Duration</div>
                <div className="text-lg text-slate-600">
                  {Math.ceil((new Date(term.endDate).getTime() - new Date(term.startDate).getTime()) / (1000 * 60 * 60 * 24 * 7))} weeks
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
