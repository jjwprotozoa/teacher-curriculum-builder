'use client';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { DaySlotPanel } from '@/components/ui/DaySlotPanel';
import { PrintPreviewModal } from '@/components/ui/PrintPreviewModal';
import { ArrowLeft, Clock, Plus, Save } from 'lucide-react';
import Link from 'next/link';
import { use, useEffect, useState } from 'react';

// Penguin Class timetable slots (exactly as specified in the system)
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

interface DayData {
  id: string;
  date: string;
  reflections?: string;
  activities?: Record<string, unknown>;
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

interface DayPageProps {
  params: Promise<{ dayId: string }>;
}

export default function DayPage({ params }: DayPageProps) {
  // Unwrap params using React.use() for Next.js 15 compatibility
  const { dayId } = use(params);
  
  const [day, setDay] = useState<DayData | null>(null);
  const [week, setWeek] = useState<WeekData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [creating, setCreating] = useState(false);
  const [activities, setActivities] = useState<Record<string, { plannedActivity: string; materials: string }>>({});
  const [reflections, setReflections] = useState('');
  const [dayNotFound, setDayNotFound] = useState(false);
  const [curriculumContext, setCurriculumContext] = useState<CurriculumContext | null>(null);
  const [showPrintModal, setShowPrintModal] = useState(false);

  useEffect(() => {
    const fetchDay = async () => {
      try {
        const response = await fetch(`/api/daily/${dayId}`);
        if (!response.ok) {
          if (response.status === 404) {
            setDayNotFound(true);
          } else {
            throw new Error('Failed to fetch day');
          }
          return;
        }
        
        const data = await response.json();
        setDay(data.day);
        setWeek(data.week);
        
        // Initialize activities from existing data or empty
        if (data.day?.activities) {
          const existingActivities: Record<string, { plannedActivity: string; materials: string }> = {};
          PENGUIN_CLASS_SLOTS.forEach(slot => {
            const slotData = data.day.activities[slot];
            existingActivities[slot] = {
              plannedActivity: slotData?.plannedActivity || '',
              materials: slotData?.materials || ''
            };
          });
          setActivities(existingActivities);
        } else {
          const emptyActivities: Record<string, { plannedActivity: string; materials: string }> = {};
          PENGUIN_CLASS_SLOTS.forEach(slot => {
            emptyActivities[slot] = { plannedActivity: '', materials: '' };
          });
          setActivities(emptyActivities);
        }
        
        setReflections(data.day?.reflections || '');
        
        // Fetch curriculum context if we have week data
        if (data.week) {
          await fetchCurriculumContext(data.week.number);
        }
      } catch (error) {
        console.error('Error fetching day:', error);
        setDayNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    const fetchCurriculumContext = async (weekNumber: number) => {
      try {
        const response = await fetch('/api/terms');
        if (response.ok) {
          const data = await response.json();
          const weekData = data.find((week: any) => 
            week.term === 'Term 1' && week.weekNumber === weekNumber
          );
          if (weekData?.weeklyPlan?.stretch) {
            setCurriculumContext({
              weekNumber: weekData.weekNumber,
              theme: weekData.theme,
              stretch: weekData.weeklyPlan.stretch
            });
          }
        }
      } catch (error) {
        console.error('Error fetching curriculum context:', error);
      }
    };

    fetchDay();
  }, [dayId]);

  const handleActivityChange = (time: string, field: 'plannedActivity' | 'materials', value: string) => {
    setActivities(prev => ({
      ...prev,
      [time]: {
        ...prev[time],
        [field]: value
      }
    }));
  };

  const handleCreateDay = async () => {
    if (!week) return;
    
    setCreating(true);
    try {
      // Create a new daily entry
      const payload = {
        weekId: week.id,
        date: new Date().toISOString().split('T')[0], // Today's date
        dayOfWeek: 'MON', // Default to Monday
        activities: Object.fromEntries(
          PENGUIN_CLASS_SLOTS.map(slot => [slot, []])
        ),
        reflections: ''
      };

      const response = await fetch('/api/daily', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const newDay = await response.json();
        setDay(newDay);
        setDayNotFound(false);
        alert('Daily entry created successfully!');
      } else {
        throw new Error('Failed to create daily entry');
      }
    } catch (error) {
      console.error('Error creating day:', error);
      alert('Error creating daily entry');
    } finally {
      setCreating(false);
    }
  };

  const handleSave = async () => {
    if (!day || !week) return;
    
    setSaving(true);
    try {
      const payload = {
        weekId: week.id,
        date: day.date,
        dayOfWeek: 'MON', // Default to Monday
        activities: activities,
        reflections: reflections
      };

      const response = await fetch('/api/daily', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        alert('Day plan saved successfully!');
      } else {
        throw new Error('Failed to save day plan');
      }
    } catch (error) {
      console.error('Error saving day plan:', error);
      alert('Error saving day plan');
    } finally {
      setSaving(false);
    }
  };

  const handlePrint = () => {
    setShowPrintModal(true);
  };

  const getCurriculumSuggestions = (timeSlot: string) => {
    if (!curriculumContext) return undefined;
    
    // Map time slots to curriculum areas
    const slotMappings: Record<string, { area: string; materials: string[] }> = {
      '07h00–07h30 Morning care & breakfast': {
        area: 'Practical life skills and social interaction',
        materials: ['Breakfast items', 'Utensils', 'Napkins']
      },
      '07h30–08h00 Arrival / Free play': {
        area: 'Social-emotional development and free exploration',
        materials: ['Building blocks', 'Soft toys', 'Puzzles']
      },
      '08h00–08h40 Morning ring / News': {
        area: 'Literacy and communication',
        materials: curriculumContext.stretch.resources.books.slice(0, 2),
        ...curriculumContext.stretch.resources.materials.slice(0, 3)
      },
      '08h40–09h00 Music / Movement': {
        area: 'Creative arts and gross motor development',
        materials: curriculumContext.stretch.resources.songs.slice(0, 2),
        ...curriculumContext.stretch.resources.materials.filter(m => m.includes('music') || m.includes('dance'))
      },
      '09h00–09h30 Free play & Fruit routine': {
        area: 'Practical life and healthy eating',
        materials: ['Fruit', 'Cutting board', 'Child-safe knives', 'Plates']
      },
      '09h30–10h30 Creative art activities': {
        area: curriculumContext.stretch.creative,
        materials: curriculumContext.stretch.resources.materials.filter(m => 
          m.includes('paint') || m.includes('paper') || m.includes('crayons') || m.includes('clay')
        )
      },
      '10h30–11h00 Toilet routine & Snack': {
        area: 'Practical life and hygiene',
        materials: ['Snack items', 'Cups', 'Napkins', 'Handwashing supplies']
      },
      '11h00–11h20 Free play': {
        area: 'Social-emotional development',
        materials: ['Role-play props', 'Dolls', 'Kitchen set']
      },
      '11h20–12h00 Structured outside play': {
        area: curriculumContext.stretch.motor.gross,
        materials: ['Balls', 'Hula hoops', 'Balance beams', 'Obstacle course items']
      },
      '12h00–12h30 Story time': {
        area: curriculumContext.stretch.literacy,
        materials: curriculumContext.stretch.resources.books
      },
      '12h30–12h40 Pack away time': {
        area: 'Practical life and responsibility',
        materials: ['Storage bins', 'Labels', 'Clean-up songs']
      },
      '12h40 Home time': {
        area: 'Transition and social skills',
        materials: ['Goodbye songs', 'Transition objects']
      }
    };

    const mapping = slotMappings[timeSlot];
    if (!mapping) return undefined;

    return {
      activity: mapping.area,
      materials: mapping.materials
    };
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="text-center">Loading day plan...</div>
      </div>
    );
  }

  if (dayNotFound) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link 
              href="/weeks"
              className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Weeks
            </Link>
          </div>
          
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Daily Entry Not Found
          </h1>
          <p className="text-slate-600 mb-6">
            This daily entry doesn&apos;t exist yet. You can create it or return to the weekly view to generate daily entries.
          </p>
          
          <div className="flex gap-4">
            <button
              onClick={handleCreateDay}
              disabled={creating}
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Plus className="w-4 h-4" />
              {creating ? 'Creating...' : 'Create Daily Entry'}
            </button>
            
            <Link
              href="/weeks"
              className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 px-6 py-3 rounded-lg font-medium hover:bg-slate-200 transition-colors"
            >
              Go to Weekly View
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!day || !week) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="text-center">Day not found</div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Day Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Link 
              href={`/weeks/${week.id}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Week
            </Link>
            
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 border border-slate-300 text-slate-700 px-4 py-2 rounded-lg font-medium hover:bg-slate-50 transition-colors"
            >
              🖨️ Print Day Plan
            </button>
          </div>
          
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            {new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' })} — Week {week.number} · {week.title || 'Theme TBD'}
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-600">
            <span>{week.term?.name}</span>
            <span>•</span>
            <span>{new Date(day.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            <Badge variant="theme">{week.title || 'Theme TBD'}</Badge>
          </div>
        </div>

        {/* Curriculum Context Panel */}
        {curriculumContext && (
          <div className="mb-8">
            <Card className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                  <span className="text-indigo-600 font-semibold text-sm">🎯</span>
                </div>
                <h2 className="text-xl font-bold text-indigo-900">
                  Week {curriculumContext.weekNumber} Curriculum Context
                </h2>
                <Badge variant="theme" className="ml-auto">
                  {curriculumContext.theme}
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Learning Objectives */}
                <div>
                  <h3 className="font-semibold text-indigo-900 mb-3 flex items-center gap-2">
                    <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                    Learning Objectives
                  </h3>
                  <div className="space-y-2 text-sm text-indigo-800">
                    <p><strong>Numeracy:</strong> {curriculumContext.stretch.numeracy}</p>
                    <p><strong>Literacy:</strong> {curriculumContext.stretch.literacy}</p>
                    <p><strong>Creative:</strong> {curriculumContext.stretch.creative}</p>
                  </div>
                </div>
                
                {/* Development Goals */}
                <div>
                  <h3 className="font-semibold text-indigo-900 mb-3 flex items-center gap-2">
                    <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                    Development Goals
                  </h3>
                  <div className="space-y-2 text-sm text-indigo-800">
                    <p><strong>Motor Skills:</strong> {curriculumContext.stretch.motor.fine}, {curriculumContext.stretch.motor.gross}</p>
                    <p><strong>Social-Emotional:</strong> {curriculumContext.stretch.socialEmotional}</p>
                    <p><strong>Science:</strong> {curriculumContext.stretch.scienceInquiry}</p>
                  </div>
                </div>
              </div>
              
              {/* Quick Resources */}
              <div className="mt-4 pt-4 border-t border-indigo-200">
                <h4 className="font-medium text-indigo-900 mb-2">Quick Resources:</h4>
                <div className="flex flex-wrap gap-2">
                  {curriculumContext.stretch.resources.books.slice(0, 2).map((book, index) => (
                    <Badge key={index} variant="default" className="text-xs">
                      📚 {book}
                    </Badge>
                  ))}
                  {curriculumContext.stretch.resources.materials.slice(0, 3).map((material, index) => (
                    <Badge key={index} variant="default" className="text-xs">
                      🎨 {material}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Timetable Slots */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-6 h-6 text-slate-600" />
              <h2 className="text-2xl font-bold text-slate-900">Daily Plans - Penguin Class</h2>
            </div>
            
            <div className="space-y-4">
              {PENGUIN_CLASS_SLOTS.map((slot) => (
                <DaySlotPanel
                  key={slot}
                  time={slot}
                  area={slot.split(' ').slice(1).join(' ')} // Remove time from display
                  theme={week.title || 'Theme TBD'}
                  plannedActivity={activities[slot]?.plannedActivity || ''}
                  materials={activities[slot]?.materials || ''}
                  onActivityChange={(value) => handleActivityChange(slot, 'plannedActivity', value)}
                  onMaterialsChange={(value) => handleActivityChange(slot, 'materials', value)}
                  curriculumSuggestions={getCurriculumSuggestions(slot)}
                />
              ))}
            </div>
          </div>

          {/* Right Column - Reflections & Save */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold text-slate-900 mb-4">Daily Reflections</h3>
              <textarea
                value={reflections}
                onChange={(e) => setReflections(e.target.value)}
                placeholder="Reflect on the day's activities, observations, and next steps..."
                className="w-full text-sm border border-slate-200 rounded-lg px-3 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                rows={8}
              />
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-slate-900 mb-4">Save Day Plan</h3>
              <button
                onClick={handleSave}
                disabled={saving}
                className="w-full inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Save className="w-4 h-4" />
                {saving ? 'Saving...' : 'Save Day Plan'}
              </button>
              {saving && (
                <p className="text-sm text-slate-500 mt-2 text-center">Saving your changes...</p>
              )}
            </Card>
          </div>
        </div>
      </div>

      {/* Print Modal */}
      {showPrintModal && day && week && (
        <PrintPreviewModal
          type="singleday"
          data={{
            day: {
              id: day.id,
              date: day.date,
              reflections: reflections,
              activities: activities
            },
            week: week,
            curriculumContext: curriculumContext || undefined
          }}
          onClose={() => setShowPrintModal(false)}
        />
      )}
    </>
  );
}
