'use client';

import { CurriculumPrintLayout } from '@/components/ui/CurriculumPrintLayout';
import { TermCard } from '@/components/ui/TermCard';
import { useState } from 'react';

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
    id: string;
    weekId: string | null;
    curriculumWeekId: string | null;
    goals: any;
    notes: string | null;
    resources: any;
    stretch: any;
    createdAt: Date;
    updatedAt: Date;
  } | null;
  days: DailyEntry[];
}

interface DailyEntry {
  id: string;
  weekId: string;
  createdAt: Date;
  updatedAt: Date;
  date: Date;
  dayOfWeek: any;
  activities: any;
  reflections: string | null;
}

interface CurriculumPageClientProps {
  terms: Term[];
}

export default function CurriculumPageClient({ terms }: CurriculumPageClientProps) {
  const [showPrintModal, setShowPrintModal] = useState(false);

  return (
    <>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h1 className="text-3xl font-bold text-slate-900">Curriculum Overview</h1>
            <button
              onClick={() => setShowPrintModal(true)}
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              📖 Print Full Curriculum
            </button>
          </div>
          <p className="text-lg text-slate-600">Navigate through your academic year structure</p>
        </div>
        
        {/* Special Curriculum Framework Section */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-2xl p-8 mb-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-indigo-900 mb-3">
                Hybrid Stretch Framework
              </h2>
              <p className="text-indigo-700 max-w-2xl mx-auto">
                Complete Montessori + Singapore NEL integration framework that can be applied to any curriculum term. 
                Includes themed learning activities, motor skills development, and comprehensive resource guides.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">📚</span>
                </div>
                <h3 className="font-semibold text-indigo-900 mb-2">Learning Areas</h3>
                <p className="text-sm text-indigo-700">Numeracy, Literacy, Creative Arts</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🧠</span>
                </div>
                <h3 className="font-semibold text-purple-900 mb-2">Development</h3>
                <p className="text-sm text-purple-700">Motor Skills, Social-Emotional, Science</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🎨</span>
                </div>
                <h3 className="font-semibold text-green-900 mb-2">Resources</h3>
                <p className="text-sm text-green-700">Books, Songs, Materials</p>
              </div>
            </div>
            
            <div className="text-center">
              <a
                href="/curriculum/term1"
                className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
              >
                View Term 1 Example
              </a>
            </div>
          </div>
        </div>

        {/* All Curriculum Years */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            All Curriculum Years
          </h2>
          <p className="text-slate-600 text-center mb-6 max-w-2xl mx-auto">
            The Hybrid Stretch Framework can be implemented across any of these curriculum years. 
            Term 1 shows a complete example implementation.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {terms.map(term => (
            <TermCard
              key={term.id}
              id={term.id}
              name={term.name}
              startDate={term.startDate}
              endDate={term.endDate}
              weekCount={term.weeks.length}
              href={`/curriculum/term/${term.id}`}
            />
          ))}
        </div>
      </div>

      {/* Print Modal */}
      {showPrintModal && (
        <CurriculumPrintLayout
          terms={terms}
          onClose={() => setShowPrintModal(false)}
        />
      )}
    </>
  );
}
