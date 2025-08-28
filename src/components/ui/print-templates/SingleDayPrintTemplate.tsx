'use client';

import { forwardRef } from 'react';
import ReactMarkdown from 'react-markdown';

interface DayData {
  id: string;
  date: string;
  reflections?: string;
  activities?: Record<string, { plannedActivity: string; materials: string }>;
}

interface WeekData {
  id: string;
  number: number;
  title?: string;
  term?: {
    name: string;
    id: string;
  };
}

interface CurriculumContext {
  weekNumber: number;
  theme: string;
  stretch: {
    numeracy: string;
    literacy: string;
    creative: string;
    motor: {
      fine: string;
      gross: string;
      practicalLife: string;
    };
    socialEmotional: string;
    scienceInquiry: string;
    resources: {
      books: string[];
      songs: string[];
      materials: string[];
    };
  };
}

interface SingleDayPrintTemplateProps {
  day: DayData;
  week: WeekData;
  curriculumContext?: CurriculumContext;
}

const PENGUIN_CLASS_SLOTS = [
  '07h00–07h30 Morning care & breakfast',
  '07h30–08h00 Arrival / Free play',
  '08h00–08h40 Morning ring / News',
  '08h40–09h00 Music / Movement',
  '09h00–09h30 Free play & Fruit routine',
  '09h30–10h30 Creative art activities',
  '10h30–11h00 Toilet routine & Snack',
  '11h00–11h20 Free play',
  '11h20–12h00 Structured outside play',
  '12h00–12h30 Story time',
  '12h30–12h40 Pack away time',
  '12h40 Home time'
];

export const SingleDayPrintTemplate = forwardRef<HTMLDivElement, SingleDayPrintTemplateProps>(
  ({ day, week, curriculumContext }, ref) => {
    const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
      });
    };

    const formatDayOfWeek = (dateString: string) => {
      return new Date(dateString).toLocaleDateString('en-US', { weekday: 'long' });
    };

    return (
      <div 
        ref={ref} 
        data-day={JSON.stringify(day)}
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
            Daily Activity Plan
          </h1>
          <h2 className="text-2xl font-semibold text-blue-700 mb-2">
            {formatDayOfWeek(day.date)} - {formatDate(day.date)}
          </h2>
          <h3 className="text-xl text-gray-800 mb-2">
            {week.term?.name} - Week {week.number}
          </h3>
          <h4 className="text-lg text-gray-600 mb-2">
            Theme: {week.title || 'Theme TBD'}
          </h4>
          <p className="text-sm text-gray-500 mt-2">
            Generated on {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Day Overview */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Day Details</h3>
            <div className="space-y-2 text-sm">
              <div><strong>Day:</strong> {formatDayOfWeek(day.date)}</div>
              <div><strong>Date:</strong> {formatDate(day.date)}</div>
              <div><strong>Week:</strong> {week.number}</div>
              <div><strong>Theme:</strong> {week.title || 'Theme TBD'}</div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Activity Status</h3>
            <div className="space-y-2 text-sm">
              <div><strong>Total Time Slots:</strong> {PENGUIN_CLASS_SLOTS.length}</div>
              <div><strong>Planned Activities:</strong> {day.activities ? Object.values(day.activities).filter(a => a.plannedActivity).length : 0}</div>
              <div><strong>Class:</strong> Penguin Class</div>
              <div><strong>Reflections:</strong> {day.reflections ? 'Completed' : 'Not added'}</div>
            </div>
          </div>
        </div>

        {/* Curriculum Context */}
        {curriculumContext && (
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-300 pb-2">
              Week {curriculumContext.weekNumber} Curriculum Framework
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Learning Areas */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="text-lg font-semibold text-blue-900 mb-3 flex items-center gap-2">
                  <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                  Learning Areas
                </h4>
                <div className="space-y-2 text-sm text-blue-800">
                  <p><strong>Numeracy:</strong> {curriculumContext.stretch.numeracy}</p>
                  <p><strong>Literacy:</strong> {curriculumContext.stretch.literacy}</p>
                  <p><strong>Creative:</strong> {curriculumContext.stretch.creative}</p>
                </div>
              </div>
              
              {/* Development Goals */}
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="text-lg font-semibold text-green-900 mb-3 flex items-center gap-2">
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  Development Goals
                </h4>
                <div className="space-y-2 text-sm text-green-800">
                  <p><strong>Fine Motor:</strong> {curriculumContext.stretch.motor.fine}</p>
                  <p><strong>Gross Motor:</strong> {curriculumContext.stretch.motor.gross}</p>
                  <p><strong>Social-Emotional:</strong> {curriculumContext.stretch.socialEmotional}</p>
                  <p><strong>Science:</strong> {curriculumContext.stretch.scienceInquiry}</p>
                </div>
              </div>
            </div>

            {/* Resources */}
            <div className="mt-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Available Resources</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                  <h5 className="font-medium text-yellow-900 mb-2">Books</h5>
                  <ul className="text-sm text-yellow-800 space-y-1">
                    {curriculumContext.stretch.resources.books.map((book, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-yellow-600 mt-1">•</span>
                        <span>{book}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                  <h5 className="font-medium text-yellow-900 mb-2">Songs</h5>
                  <ul className="text-sm text-yellow-800 space-y-1">
                    {curriculumContext.stretch.resources.songs.map((song, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-yellow-600 mt-1">•</span>
                        <span>{song}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                  <h5 className="font-medium text-yellow-900 mb-2">Materials</h5>
                  <ul className="text-sm text-yellow-800 space-y-1">
                    {curriculumContext.stretch.resources.materials.map((material, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-yellow-600 mt-1">•</span>
                        <span>{material}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Daily Schedule */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-300 pb-2">
            Penguin Class Daily Schedule
          </h3>
          
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-200">
                    Time Slot
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-200">
                    Planned Activity
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Materials Needed
                  </th>
                </tr>
              </thead>
              <tbody>
                {PENGUIN_CLASS_SLOTS.map((slot, index) => {
                  const activity = day.activities?.[slot];
                  return (
                    <tr key={slot} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 border-r border-gray-200">
                        {slot}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-200">
                        {activity?.plannedActivity ? (
                          <div className="text-blue-700 font-medium">
                            {activity.plannedActivity}
                          </div>
                        ) : (
                          <span className="text-gray-500 italic">No activity planned</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {activity?.materials ? (
                          <div className="text-green-700">
                            {activity.materials}
                          </div>
                        ) : (
                          <span className="text-gray-500 italic">No materials specified</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Daily Reflections */}
        {day.reflections && (
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-300 pb-2">
              Daily Reflections
            </h3>
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <ReactMarkdown className="prose prose-sm max-w-none text-green-800">
                {day.reflections}
              </ReactMarkdown>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 border-t border-gray-300 pt-4">
          <p>This document was generated from the Curriculum Builder application</p>
          <p>For questions or updates, please contact your curriculum coordinator</p>
        </div>
      </div>
    );
  }
);

SingleDayPrintTemplate.displayName = 'SingleDayPrintTemplate';
