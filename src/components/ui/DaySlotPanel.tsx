import { Badge } from './Badge';

interface DaySlotPanelProps {
  time: string;
  area: string;
  theme: string;
  plannedActivity: string;
  materials: string;
  onActivityChange: (value: string) => void;
  onMaterialsChange: (value: string) => void;
  curriculumSuggestions?: {
    activity: string;
    materials: string[];
  };
}

export function DaySlotPanel({ 
  time, 
  area, 
  theme, 
  plannedActivity, 
  materials, 
  onActivityChange, 
  onMaterialsChange,
  curriculumSuggestions
}: DaySlotPanelProps) {
  return (
    <div className="border border-slate-200 rounded-xl p-4 bg-white">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="text-xs font-medium text-slate-500 mb-1">{time}</div>
          <h4 className="font-semibold text-slate-900 mb-2">{area}</h4>
        </div>
        <Badge variant="theme">{theme}</Badge>
      </div>
      
      <div className="space-y-3">
        {/* Curriculum Suggestions */}
        {curriculumSuggestions && (
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3 mb-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-indigo-600 text-xs">💡</span>
              <span className="text-xs font-medium text-indigo-700">Curriculum Suggestion</span>
            </div>
            <p className="text-xs text-indigo-800 mb-2">{curriculumSuggestions.activity}</p>
            {curriculumSuggestions.materials.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {curriculumSuggestions.materials.map((material, index) => (
                  <span key={index} className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded">
                    {material}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
        
        <div>
          <label className="block text-xs font-medium text-indigo-700 mb-1">
            Planned Activity
          </label>
          <textarea
            value={plannedActivity}
            onChange={(e) => onActivityChange(e.target.value)}
            placeholder="Describe the planned activity..."
            className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            rows={2}
          />
        </div>
        
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Materials Needed
          </label>
          <input
            type="text"
            value={materials}
            onChange={(e) => onMaterialsChange(e.target.value)}
            placeholder="List materials..."
            className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
}
