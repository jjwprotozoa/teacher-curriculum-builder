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

interface WeeklyPrintTemplateProps {
  week: Week;
}

export const WeeklyPrintTemplate = forwardRef<HTMLDivElement, WeeklyPrintTemplateProps>(
  ({ week }, ref) => {
    return (
      <div 
        ref={ref} 
        data-week={JSON.stringify(week)}
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
            Weekly Curriculum Plan
          </h1>
          <h2 className="text-2xl font-semibold text-blue-700 mb-2">
            {week.term.name} - Week {week.number}
          </h2>
          <h3 className="text-xl text-gray-800 mb-2">
            {week.title || 'Theme TBD'}
          </h3>
          <p className="text-lg text-gray-600">
            {formatDate(week.startDate)} → {formatDate(week.endDate)}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Generated on {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Weekly Overview Grid */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Week Details</h3>
            <div className="space-y-2 text-sm">
              <div><strong>Week Number:</strong> {week.number}</div>
              <div><strong>Term:</strong> {week.term.name}</div>
              <div><strong>Theme:</strong> {week.title || 'Theme TBD'}</div>
              <div><strong>Duration:</strong> {Math.ceil((new Date(week.endDate).getTime() - new Date(week.startDate).getTime()) / (1000 * 60 * 60 * 24))} days</div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Daily Plans Status</h3>
            <div className="space-y-2 text-sm">
              <div><strong>Total Days:</strong> {week.days.length}/5</div>
              <div><strong>Days with Activities:</strong> {week.days.filter(d => Object.keys(d.activities).length > 0).length}</div>
              <div><strong>Total Time Slots:</strong> {week.days.reduce((total, day) => total + Object.keys(day.activities).length, 0)}</div>
            </div>
          </div>
        </div>

        {/* Curriculum Framework Section */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-300 pb-2">
            Week {week.number} Curriculum Framework
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Learning Areas */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="text-lg font-semibold text-blue-900 mb-3 flex items-center gap-2">
                <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                Learning Areas
              </h4>
              <div className="space-y-2 text-sm text-blue-800">
                <p><strong>Numeracy:</strong> Counting, patterns, measurement</p>
                <p><strong>Literacy:</strong> Letter recognition, vocabulary, stories</p>
                <p><strong>Creative:</strong> Art, music, imaginative play</p>
              </div>
            </div>
            
            {/* Development Goals */}
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="text-lg font-semibold text-green-900 mb-3 flex items-center gap-2">
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                Development Goals
              </h4>
              <div className="space-y-2 text-sm text-green-800">
                <p><strong>Motor Skills:</strong> Fine & gross motor development</p>
                <p><strong>Social-Emotional:</strong> Self-awareness & relationships</p>
                <p><strong>Science:</strong> Exploration & inquiry</p>
              </div>
            </div>
            
            {/* Weekly Focus */}
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h4 className="text-lg font-semibold text-purple-900 mb-3 flex items-center gap-2">
                <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
                Weekly Focus
              </h4>
              <div className="space-y-2 text-sm text-purple-800">
                <p><strong>Theme:</strong> {week.title || 'Holiday Safety'}</p>
                <p><strong>Days:</strong> 5 daily plans</p>
                <p><strong>Status:</strong> Ready</p>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Learning Goals Section */}
        {week.weeklyPlan?.goals && Object.keys(week.weeklyPlan.goals).length > 0 && (
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">
              Weekly Learning Goals
            </h3>
            <div className="grid grid-cols-2 gap-6">
              {Object.entries(week.weeklyPlan.goals).map(([subject, goals]) => (
                <div key={subject} className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                  <h4 className="text-lg font-semibold text-indigo-900 capitalize mb-3">{subject}</h4>
                  {Array.isArray(goals) && goals.length > 0 ? (
                    <ul className="space-y-2">
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

        {/* Stretch Curriculum Section */}
        {week.weeklyPlan?.stretch && (
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">
              Stretch Curriculum Activities
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Learning Areas from Stretch */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                  Learning Areas
                </h4>
                
                {(week.weeklyPlan.stretch as any)?.numeracy && (
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                    <h5 className="font-medium text-blue-900 mb-1">Numeracy</h5>
                    <p className="text-sm text-blue-800">{(week.weeklyPlan.stretch as any)?.numeracy as string}</p>
                  </div>
                )}
                
                {(week.weeklyPlan.stretch as any)?.literacy && (
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                    <h5 className="font-medium text-blue-900 mb-1">Literacy</h5>
                    <p className="text-sm text-blue-800">{(week.weeklyPlan.stretch as any)?.literacy as string}</p>
                  </div>
                )}
                
                {(week.weeklyPlan.stretch as any)?.creative && (
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                    <h5 className="font-medium text-blue-900 mb-1">Creative Arts</h5>
                    <p className="text-sm text-blue-800">{(week.weeklyPlan.stretch as any)?.creative as string}</p>
                  </div>
                )}
              </div>

              {/* Development Areas from Stretch */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  Development Areas
                </h4>
                
                {(week.weeklyPlan.stretch as any)?.motor && (
                  <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                    <h5 className="font-medium text-green-900 mb-1">Motor Skills</h5>
                    <div className="text-sm text-green-800 space-y-1">
                      {(week.weeklyPlan.stretch as any)?.motor.fine && (
                        <p><strong>Fine:</strong> {(week.weeklyPlan.stretch as any)?.motor.fine as string}</p>
                      )}
                      {(week.weeklyPlan.stretch as any)?.motor.gross && (
                        <p><strong>Gross:</strong> {(week.weeklyPlan.stretch as any)?.motor.gross as string}</p>
                      )}
                      {(week.weeklyPlan.stretch as any)?.motor.practicalLife && (
                        <p><strong>Practical Life:</strong> {(week.weeklyPlan.stretch as any)?.motor.practicalLife as string}</p>
                      )}
                    </div>
                  </div>
                )}
                
                {(week.weeklyPlan.stretch as any)?.socialEmotional && (
                  <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                    <h5 className="font-medium text-green-900 mb-1">Social-Emotional</h5>
                    <p className="text-sm text-green-800">{(week.weeklyPlan.stretch as any)?.socialEmotional as string}</p>
                  </div>
                )}
                
                {(week.weeklyPlan.stretch as any)?.scienceInquiry && (
                  <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                    <h5 className="font-medium text-green-900 mb-1">Science & Inquiry</h5>
                    <p className="text-sm text-green-800">{(week.weeklyPlan.stretch as any)?.scienceInquiry as string}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Resources from Stretch */}
            {(week.weeklyPlan.stretch as any)?.resources && (
              <div className="mt-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Resources & Materials</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {(week.weeklyPlan.stretch as any)?.resources.books && (
                    <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                      <h5 className="font-medium text-yellow-900 mb-2">Books</h5>
                      <ul className="text-sm text-yellow-800 space-y-1">
                        {((week.weeklyPlan.stretch as any)?.resources.books as string[]).map((book, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-yellow-600 mt-1">•</span>
                            <span>{book}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {(week.weeklyPlan.stretch as any)?.resources.songs && (
                    <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                      <h5 className="font-medium text-yellow-900 mb-2">Songs</h5>
                      <ul className="text-sm text-yellow-800 space-y-1">
                        {((week.weeklyPlan.stretch as any)?.resources.songs as string[]).map((song, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-yellow-600 mt-1">•</span>
                            <span>{song}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {(week.weeklyPlan.stretch as any)?.resources.materials && (
                    <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                      <h5 className="font-medium text-yellow-900 mb-2">Materials</h5>
                      <ul className="text-sm text-yellow-800 space-y-1">
                        {((week.weeklyPlan.stretch as any)?.resources.materials as string[]).map((material, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-yellow-600 mt-1">•</span>
                            <span>{material}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Weekly Notes */}
        {week.weeklyPlan?.notes && (
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">
              Weekly Notes & Resources
            </h3>
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <div className="prose prose-sm max-w-none">
                {week.weeklyPlan.notes}
              </div>
            </div>
          </div>
        )}

        {/* Daily Plans - Full Expanded View */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-300 pb-2">
            Daily Activity Plans
          </h3>
          
          {week.days.length > 0 ? (
            <div className="space-y-8">
              {week.days.map((day) => (
                <div key={day.id} className="border-2 border-gray-200 rounded-lg p-6 bg-gray-50">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xl font-bold text-gray-900">
                      {formatDayOfWeek(day.dayOfWeek)} - {formatDate(day.date)}
                    </h4>
                    <div className="text-sm text-gray-600 bg-white px-3 py-1 rounded-full border">
                      <strong>Time Slots:</strong> {Object.keys(day.activities).length}
                    </div>
                  </div>

                  {/* Daily Schedule Table */}
                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-200">
                            Time Slot
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-200">
                            Learning Area
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                            Activity Description
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(day.activities).map(([timeSlot, activities], index) => (
                          <tr key={timeSlot} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="px-4 py-3 text-sm font-medium text-gray-900 border-r border-gray-200">
                              {timeSlot}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-200">
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
                            <td className="px-4 py-3 text-sm text-gray-700">
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
                    <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                      <h5 className="font-semibold text-green-800 mb-2">Daily Reflections</h5>
                      <div className="prose prose-sm max-w-none text-green-700">
                        {day.reflections}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
              <p className="text-lg text-gray-600 mb-2">No daily plans have been generated yet.</p>
              <p className="text-gray-500">Daily activities will appear here once they are created.</p>
            </div>
          )}
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

WeeklyPrintTemplate.displayName = 'WeeklyPrintTemplate';
