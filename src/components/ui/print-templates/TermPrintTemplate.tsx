'use client';

import { formatDate, formatDayOfWeek } from '@/lib/utils/dateFormatters';
import { forwardRef } from 'react';

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

interface TermPrintTemplateProps {
  term: Term;
}

export const TermPrintTemplate = forwardRef<HTMLDivElement, TermPrintTemplateProps>(
  ({ term }, ref) => {
    return (
      <div 
        ref={ref} 
        data-term={JSON.stringify(term)}
        style={{
          backgroundColor: '#ffffff',
          color: '#000000',
          padding: '32px',
          maxWidth: 'none',
          fontFamily: 'Arial, sans-serif'
        }}
      >
        {/* Header Section */}
        <div className="text-center border-b-2 border-gray-300 pb-6 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Term Overview
          </h1>
          <h2 className="text-2xl font-semibold text-blue-700 mb-2">
            {term.name}
          </h2>
          <h3 className="text-xl text-gray-800 mb-2">
            {term.project.title} - {term.project.year}
          </h3>
          <p className="text-lg text-gray-600 mb-2">
            Age Group: {term.project.ageGroup}
          </p>
          <p className="text-lg text-gray-600">
            {formatDate(term.startDate)} → {formatDate(term.endDate)}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Generated on {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Term Overview Grid */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Term Details</h3>
            <div className="space-y-2 text-sm">
              <div><strong>Term Name:</strong> {term.name}</div>
              <div><strong>Project:</strong> {term.project.title}</div>
              <div><strong>Year:</strong> {term.project.year}</div>
              <div><strong>Age Group:</strong> {term.project.ageGroup}</div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Term Statistics</h3>
            <div className="space-y-2 text-sm">
              <div><strong>Total Weeks:</strong> {term.weeks.length}</div>
              <div><strong>Weeks with Plans:</strong> {term.weeks.filter(w => w.days.length > 0).length}</div>
              <div><strong>Total Daily Plans:</strong> {term.weeks.reduce((total, week) => total + week.days.length, 0)}</div>
              <div><strong>Duration:</strong> {Math.ceil((new Date(term.endDate).getTime() - new Date(term.startDate).getTime()) / (1000 * 60 * 60 * 24 * 7))} weeks</div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Planning Status</h3>
            <div className="space-y-2 text-sm">
              <div><strong>Completion:</strong> {Math.round((term.weeks.filter(w => w.days.length > 0).length / term.weeks.length) * 100)}%</div>
              <div><strong>Total Activities:</strong> {term.weeks.reduce((total, week) => total + week.days.reduce((dayTotal, day) => dayTotal + Object.keys(day.activities).length, 0), 0)}</div>
            </div>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-300 pb-2">
            Weekly Plans Overview
          </h3>
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-200">
                    Week
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-200">
                    Theme
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-200">
                    Date Range
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Daily Plans
                  </th>
                </tr>
              </thead>
              <tbody>
                {term.weeks.map((week, index) => (
                  <tr key={week.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 border-r border-gray-200">
                      Week {week.number}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-200">
                      {week.title || 'Theme TBD'}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-200">
                      {formatDate(week.startDate)} → {formatDate(week.endDate)}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {week.days.length > 0 ? (
                        <span className="text-green-600 font-medium">{week.days.length} days planned</span>
                      ) : (
                        <span className="text-gray-500 italic">Not planned yet</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Weekly Plans - Full Expanded View */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-300 pb-2">
            Detailed Weekly Plans
          </h3>
          
          {term.weeks.map((week) => (
            <div key={week.id} className="border-2 border-gray-200 rounded-lg p-6 bg-gray-50 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xl font-bold text-gray-900">
                  Week {week.number}: {week.title || 'Theme TBD'}
                </h4>
                <div className="text-sm text-gray-600 bg-white px-3 py-1 rounded-full border">
                  {formatDate(week.startDate)} → {formatDate(week.endDate)}
                </div>
              </div>

              {/* Weekly Goals */}
              {week.weeklyPlan?.goals && Object.keys(week.weeklyPlan.goals).length > 0 && (
                <div className="mb-6">
                  <h5 className="text-lg font-semibold text-gray-800 mb-3">Weekly Learning Goals</h5>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(week.weeklyPlan.goals).map(([subject, goals]) => (
                      <div key={subject} className="bg-indigo-50 p-3 rounded-lg border border-indigo-200">
                        <h6 className="font-semibold text-indigo-900 capitalize mb-2">{subject}</h6>
                        {Array.isArray(goals) && goals.length > 0 ? (
                          <ul className="space-y-1">
                            {goals.map((goal: string, index: number) => (
                              <li key={index} className="flex items-start gap-2 text-sm text-indigo-800">
                                <span className="text-indigo-600 mt-1">•</span>
                                <span>{goal}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-sm text-indigo-600 italic">No specific goals set</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Weekly Notes */}
              {week.weeklyPlan?.notes && (
                <div className="mb-6">
                  <h5 className="text-lg font-semibold text-gray-800 mb-3">Weekly Notes</h5>
                  <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                    <div className="prose prose-sm max-w-none">
                      {week.weeklyPlan.notes}
                    </div>
                  </div>
                </div>
              )}

              {/* Daily Plans */}
              {week.days.length > 0 ? (
                <div className="mb-6">
                  <h5 className="text-lg font-semibold text-gray-800 mb-3">Daily Plans</h5>
                  <div className="space-y-4">
                    {week.days.map((day) => (
                      <div key={day.id} className="bg-white rounded-lg border border-gray-200 p-4">
                        <h6 className="font-semibold text-gray-800 mb-3">
                          {formatDayOfWeek(day.dayOfWeek)} - {formatDate(day.date)}
                        </h6>
                        
                        {/* Activities Table */}
                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                          <table className="w-full">
                            <thead className="bg-gray-100">
                              <tr>
                                <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 border-r border-gray-200">
                                  Time
                                </th>
                                <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700 border-r border-gray-200">
                                  Area
                                </th>
                                <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700">
                                  Activity
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {Object.entries(day.activities).map(([timeSlot, activities], index) => (
                                <tr key={timeSlot} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                  <td className="px-3 py-2 text-xs font-medium text-gray-900 border-r border-gray-200">
                                    {timeSlot}
                                  </td>
                                  <td className="px-3 py-2 text-xs text-gray-700 border-r border-gray-200">
                                    {Array.isArray(activities) && activities.length > 0 ? (
                                      <div className="space-y-1">
                                        {activities.map((activity, actIndex) => (
                                          <div key={actIndex} className="font-medium text-blue-700">
                                            {activity.area}
                                          </div>
                                        ))}
                                      </div>
                                    ) : (
                                      <span className="text-gray-500 italic">No activities</span>
                                    )}
                                  </td>
                                  <td className="px-3 py-2 text-xs text-gray-700">
                                    {Array.isArray(activities) && activities.length > 0 ? (
                                      <div className="space-y-1">
                                        {activities.map((activity, actIndex) => (
                                          <div key={actIndex}>
                                            {activity.activity}
                                          </div>
                                        ))}
                                      </div>
                                    ) : (
                                      <span className="text-gray-500 italic">No activities planned</span>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        {/* Daily Reflections */}
                        {day.reflections && (
                          <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                            <h6 className="font-semibold text-green-800 mb-2">Daily Reflections</h6>
                            <div className="prose prose-sm max-w-none text-green-700">
                              {day.reflections}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mb-6">
                  <h5 className="text-lg font-semibold text-gray-800 mb-3">Daily Plans</h5>
                  <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                    <p className="text-gray-600 mb-2">No daily plans have been generated yet.</p>
                    <p className="text-gray-500 text-sm">Daily activities will appear here once they are created.</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 border-t border-gray-300 pt-4">
          <p>This document was generated from the Curriculum Builder application</p>
          <p>For questions or updates, please contact your curriculum coordinator</p>
        </div>
      </div>
    );
  }
);

TermPrintTemplate.displayName = 'TermPrintTemplate';
