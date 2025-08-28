'use client';
import { Breadcrumbs } from '@/components/nav/Breadcrumbs';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { ArrowLeft, BookOpen, Brain, Calendar, Heart, Music, Palette } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface StretchData {
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
}

interface CurriculumWeek {
  id: string;
  term: string;
  weekNumber: number;
  theme: string;
  dates: string | null;
  weeklyPlan?: {
    stretch: StretchData;
  };
}

export default function Term1CurriculumPage() {
  const [weeks, setWeeks] = useState<CurriculumWeek[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurriculum = async () => {
      try {
        const response = await fetch('/api/terms');
        if (response.ok) {
          const data = await response.json();
          // Filter for Term 1 and sort by week number
          const term1Weeks = data
            .filter((week: CurriculumWeek) => week.term === 'Term 1')
            .sort((a: CurriculumWeek, b: CurriculumWeek) => a.weekNumber - b.weekNumber);
          setWeeks(term1Weeks);
        }
      } catch (error) {
        console.error('Error fetching curriculum:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurriculum();
  }, []);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="text-center">Loading curriculum...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <Breadcrumbs items={[
          { label: 'Curriculum Builder', href: '/' },
          { label: 'Curriculum', href: '/curriculum' },
          { label: 'Term 1 - Hybrid Stretch' }
        ]} />
        
        <div className="flex items-center gap-4 mb-4">
          <Link 
            href="/curriculum"
            className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Curriculum
          </Link>
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Term 1 - Hybrid Stretch Curriculum
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Montessori + Singapore NEL Framework integration for early childhood development
          </p>
          <div className="flex items-center justify-center gap-6 mt-6">
            <Badge variant="theme" className="text-sm">
              <Calendar className="w-4 h-4 mr-2" />
              {weeks.length} Weeks
            </Badge>
            <Badge variant="theme" className="text-sm">
              <Brain className="w-4 h-4 mr-2" />
              Integrated Learning
            </Badge>
            <Badge variant="theme" className="text-sm">
              <Heart className="w-4 h-4 mr-2" />
              Child-Centered
            </Badge>
          </div>
        </div>
      </div>

      {/* Curriculum Overview */}
      <div className="space-y-8">
        {weeks.map((week) => (
          <Card key={week.id} className="p-6">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <Badge variant="theme" className="text-lg px-4 py-2">
                  Week {week.weekNumber}
                </Badge>
                <h2 className="text-2xl font-bold text-slate-900">{week.theme}</h2>
              </div>
              {week.dates && (
                <p className="text-slate-600 text-sm">
                  {new Date(week.dates).toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </p>
              )}
            </div>

            {week.weeklyPlan?.stretch && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Learning Areas */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <Brain className="w-5 h-5 text-indigo-600" />
                    Learning Areas
                  </h3>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-slate-800 mb-1 flex items-center gap-2">
                        <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                        Numeracy
                      </h4>
                      <p className="text-sm text-slate-700">{week.weeklyPlan.stretch.numeracy}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-slate-800 mb-1 flex items-center gap-2">
                        <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                        Literacy
                      </h4>
                      <p className="text-sm text-slate-700">{week.weeklyPlan.stretch.literacy}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-slate-800 mb-1 flex items-center gap-2">
                        <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
                        Creative Arts
                      </h4>
                      <p className="text-sm text-slate-700">{week.weeklyPlan.stretch.creative}</p>
                    </div>
                  </div>
                </div>

                {/* Development Areas */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-indigo-600" />
                    Development Areas
                  </h3>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-slate-800 mb-1 flex items-center gap-2">
                        <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
                        Motor Skills
                      </h4>
                      <div className="text-sm text-slate-700 space-y-1">
                        <p><strong>Fine:</strong> {week.weeklyPlan.stretch.motor.fine}</p>
                        <p><strong>Gross:</strong> {week.weeklyPlan.stretch.motor.gross}</p>
                        <p><strong>Practical Life:</strong> {week.weeklyPlan.stretch.motor.practicalLife}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-slate-800 mb-1 flex items-center gap-2">
                        <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                        Social-Emotional
                      </h4>
                      <p className="text-sm text-slate-700">{week.weeklyPlan.stretch.socialEmotional}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-slate-800 mb-1 flex items-center gap-2">
                        <span className="w-3 h-3 bg-teal-500 rounded-full"></span>
                        Science & Inquiry
                      </h4>
                      <p className="text-sm text-slate-700">{week.weeklyPlan.stretch.scienceInquiry}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Resources */}
            {week.weeklyPlan?.stretch && (
              <div className="mt-6 pt-6 border-t border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-indigo-600" />
                  Resources & Materials
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-medium text-slate-800 mb-2 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-blue-600" />
                      Books
                    </h4>
                    <ul className="text-sm text-slate-700 space-y-1">
                      {week.weeklyPlan.stretch.resources.books.map((book, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                          {book}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-slate-800 mb-2 flex items-center gap-2">
                      <Music className="w-4 h-4 text-green-600" />
                      Songs & Rhymes
                    </h4>
                    <ul className="text-sm text-slate-700 space-y-1">
                      {week.weeklyPlan.stretch.resources.songs.map((song, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                          {song}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-slate-800 mb-2 flex items-center gap-2">
                      <Palette className="w-4 h-4 text-purple-600" />
                      Materials
                    </h4>
                    <ul className="text-sm text-slate-700 space-y-1">
                      {week.weeklyPlan.stretch.resources.materials.map((material, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></span>
                          {material}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-6 pt-6 border-t border-slate-200">
              <div className="flex gap-3">
                <Link
                  href={`/weeks?term=Term 1&week=${week.weekNumber}`}
                  className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
                >
                  Plan This Week
                </Link>
                <Link
                  href={`/daily?week=${week.weekNumber}`}
                  className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors"
                >
                  View Daily Plans
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Footer Actions */}
      <div className="mt-12 text-center">
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-3">Ready to Start Planning?</h3>
          <p className="text-slate-600 mb-4">
            Use this curriculum framework to guide your weekly and daily planning. Each week&apos;s activities are designed to support holistic child development.
          </p>
          <div className="flex gap-3 justify-center">
            <Link
              href="/weeks"
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Start Weekly Planning
            </Link>
            <Link
              href="/curriculum-years"
              className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 px-6 py-3 rounded-lg font-medium hover:bg-slate-200 transition-colors"
            >
              Manage Curriculum Years
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
