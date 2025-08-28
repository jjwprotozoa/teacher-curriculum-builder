'use client';

import { Printer, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { DailyPrintTemplate } from './print-templates/DailyPrintTemplate';
import { SingleDayPrintTemplate } from './print-templates/SingleDayPrintTemplate';
import { TermPrintTemplate } from './print-templates/TermPrintTemplate';
import { WeeklyPrintTemplate } from './print-templates/WeeklyPrintTemplate';

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

interface Term {
  id: string;
  name: string;
  weeks: Week[];
}

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

interface SingleDayData {
  day: DayData;
  week: WeekData;
  curriculumContext?: CurriculumContext;
}

type PrintType = 'weekly' | 'daily' | 'term' | 'singleday';

interface PrintPreviewModalProps {
  type: PrintType;
  data: Week | Term | SingleDayData;
  onClose: () => void;
}

export function PrintPreviewModal({ type, data, onClose }: PrintPreviewModalProps) {
  const [isPrinting, setIsPrinting] = useState(false);

  useEffect(() => {
    if (isPrinting) {
      window.print();
      setIsPrinting(false);
    }
  }, [isPrinting]);

  const handlePrint = () => {
    setIsPrinting(true);
  };

  const getTitle = () => {
    switch (type) {
      case 'weekly':
        return 'Weekly Curriculum Plan';
      case 'daily':
        return 'Daily Activity Plans';
      case 'term':
        return 'Term Overview';
      case 'singleday':
        return 'Daily Activity Plan';
      default:
        return 'Curriculum Plan';
    }
  };

  const getDescription = () => {
    switch (type) {
      case 'weekly':
        return 'Complete weekly plan with goals, activities, and resources';
      case 'daily':
        return 'Detailed daily schedules with time slots and activities';
      case 'term':
        return 'Full term overview with all weeks and plans';
      case 'singleday':
        return 'Individual day plan with detailed time slots and activities';
      default:
        return 'Curriculum planning document';
    }
  };

  const renderTemplate = () => {
    switch (type) {
      case 'weekly':
        return <WeeklyPrintTemplate week={data as Week} />;
      case 'daily':
        return <DailyPrintTemplate week={data as Week} />;
      case 'term':
        return <TermPrintTemplate term={data as Term} />;
      case 'singleday':
        const singleDayData = data as SingleDayData;
        return <SingleDayPrintTemplate 
          day={singleDayData.day} 
          week={singleDayData.week} 
          curriculumContext={singleDayData.curriculumContext} 
        />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* Modal Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 print:hidden">
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-7xl w-full max-h-[95vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{getTitle()}</h2>
                <p className="text-gray-600 mt-1">{getDescription()}</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  Print
                </button>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-2"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Preview Content - Scrollable */}
            <div className="flex-1 overflow-y-auto bg-gray-100 p-6">
              <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                {renderTemplate()}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Preview your document before printing. The printed version will match what you see above.
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handlePrint}
                    className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                  >
                    <Printer className="w-4 h-4" />
                    Print Document
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden Print Content */}
      <div className="hidden print:block">
        {renderTemplate()}
      </div>
    </>
  );
}
