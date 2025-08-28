'use client';

import { useEffect, useState } from 'react';

interface Term {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  weeks: Week[];
}

interface Week {
  id: string;
  number: number;
  title: string;
  startDate: Date;
  endDate: Date;
  weeklyPlan?: {
    goals?: Record<string, string[]>;
    notes?: string;
    stretch?: Record<string, unknown>;
  };
  days: DailyEntry[];
}

interface DailyEntry {
  id: string;
  date: Date;
  dayOfWeek: string;
  activities: Record<string, Array<{ area: string; activity: string }>>;
  reflections?: string;
}

interface CurriculumPrintLayoutProps {
  terms: Term[];
  onClose: () => void;
}

export function CurriculumPrintLayout({ terms, onClose }: CurriculumPrintLayoutProps) {
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
          <h2 className="text-2xl font-bold text-slate-900">Print Full Curriculum</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            ✕
          </button>
        </div>
        
        <div className="space-y-4 mb-6">
          <p className="text-slate-600">
            This will print the complete curriculum in a book format with:
          </p>
          <ul className="list-disc list-inside text-slate-600 space-y-1 ml-4">
            <li>Curriculum overview and framework</li>
            <li>All terms with weekly plans</li>
            <li>Daily activities and schedules</li>
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
            Print Full Curriculum
          </button>
        </div>

        {/* Hidden print content */}
        <div className="hidden print:block curriculum-print">
          {/* Title Page */}
          <div className="page-break-after">
            <div className="text-center py-20">
              <h1 className="text-4xl font-bold text-slate-900 mb-4">
                Curriculum Overview
              </h1>
              <h2 className="text-2xl font-semibold text-indigo-700 mb-8">
                Hybrid Stretch Framework
              </h2>
              <p className="text-lg text-slate-600">
                Complete Montessori + Singapore NEL Integration
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

          {/* Table of Contents */}
          <div className="page-break-after">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Table of Contents</h2>
            <div className="space-y-2">
              {terms.map((term) => (
                <div key={term.id} className="page-break-inside-avoid">
                  <div className="font-semibold text-slate-800">
                    {term.name} ({formatDate(term.startDate)} - {formatDate(term.endDate)})
                  </div>
                  <div className="ml-4 space-y-1 text-sm text-slate-600">
                    {term.weeks.map((week) => (
                      <div key={week.id} className="page-break-inside-avoid">
                        Week {week.number}: {week.title}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Framework Overview */}
          <div className="page-break-after">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Hybrid Stretch Framework</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border border-slate-200 rounded-lg page-break-inside-avoid">
                  <div className="text-2xl mb-2">📚</div>
                  <h3 className="font-semibold text-slate-900 mb-2">Learning Areas</h3>
                  <p className="text-sm text-slate-700">Numeracy, Literacy, Creative Arts</p>
                </div>
                <div className="text-center p-4 border border-slate-200 rounded-lg page-break-inside-avoid">
                  <div className="text-2xl mb-2">🧠</div>
                  <h3 className="font-semibold text-slate-900 mb-2">Development</h3>
                  <p className="text-sm text-slate-700">Motor Skills, Social-Emotional, Science</p>
                </div>
                <div className="text-center p-4 border border-slate-200 rounded-lg page-break-inside-avoid">
                  <div className="text-2xl mb-2">🎨</div>
                  <h3 className="font-semibold text-slate-900 mb-2">Resources</h3>
                  <p className="text-sm text-slate-700">Books, Songs, Materials</p>
                </div>
              </div>
            </div>
          </div>

          {/* Terms and Weeks */}
          {terms.map((term) => (
            <div key={term.id}>
              {/* Term Header */}
              <div className="page-break-after">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">{term.name}</h2>
                <p className="text-lg text-slate-600 mb-6">
                  {formatDate(term.startDate)} → {formatDate(term.endDate)}
                </p>
                
                {/* Term Overview */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-slate-800 mb-4">Term Overview</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              </div>

              {/* Weeks */}
              {term.weeks.map((week) => (
                <div key={week.id} className="page-break-after">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">
                    Week {week.number}: {week.title}
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

                  {/* Daily Plans */}
                  {week.days.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-slate-800 mb-3">Daily Plans</h4>
                      <div className="space-y-4">
                        {week.days.map((day) => (
                          <div key={day.id} className="border border-slate-200 rounded-lg p-4 page-break-inside-avoid">
                            <h5 className="font-semibold text-slate-800 mb-3">
                              {formatDayOfWeek(day.dayOfWeek)} - {formatDate(day.date)}
                            </h5>
                            
                            {/* Activities */}
                            <div className="space-y-3">
                              {Object.entries(day.activities).map(([timeSlot, activities]) => (
                                <div key={timeSlot} className="page-break-inside-avoid">
                                  <div className="font-medium text-slate-700 text-sm mb-2">
                                    {timeSlot}
                                  </div>
                                  {Array.isArray(activities) && activities.length > 0 ? (
                                    <div className="ml-4 space-y-1">
                                      {activities.map((activity, index: number) => (
                                        <div key={index} className="text-sm text-slate-600 page-break-inside-avoid">
                                          <span className="font-medium">{activity.area}:</span> {activity.activity}
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <p className="text-sm text-slate-500 italic ml-4">No activities planned</p>
                                  )}
                                </div>
                              ))}
                            </div>

                            {/* Reflections */}
                            {day.reflections && (
                              <div className="mt-4 pt-3 border-t border-slate-200 page-break-inside-avoid">
                                <div className="font-medium text-slate-700 text-sm mb-2">Reflections</div>
                                <p className="text-sm text-slate-600 italic">{day.reflections}</p>
                              </div>
                            )}
                          </div>
                        ))}
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
            </div>
          ))}

          {/* Appendix */}
          <div className="page-break-after">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Appendix</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Curriculum Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-slate-200 rounded-lg page-break-inside-avoid">
                    <div className="font-semibold text-slate-800">Total Terms</div>
                    <div className="text-2xl font-bold text-indigo-600">{terms.length}</div>
                  </div>
                  <div className="p-4 border border-slate-200 rounded-lg page-break-inside-avoid">
                    <div className="font-semibold text-slate-800">Total Weeks</div>
                    <div className="text-2xl font-bold text-indigo-600">
                      {terms.reduce((total, term) => total + term.weeks.length, 0)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
