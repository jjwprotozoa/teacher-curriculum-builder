'use client';
import { CheckCircle, Circle } from 'lucide-react';

interface ChecklistItem {
  id: string;
  label: string;
  description: string;
  href?: string;
  completed: boolean;
}

interface OnboardingChecklistProps {
  items: ChecklistItem[];
  onItemToggle: (id: string, completed: boolean) => void;
}

export function OnboardingChecklist({ items, onItemToggle }: OnboardingChecklistProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
          <CheckCircle className="w-5 h-5 text-green-600" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-900">Onboarding Checklist</h3>
          <p className="text-sm text-slate-600">Get started with your curriculum planning</p>
        </div>
      </div>
      
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-start gap-3">
            <button
              onClick={() => onItemToggle(item.id, !item.completed)}
              className="flex-shrink-0 mt-0.5"
            >
              {item.completed ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <Circle className="w-5 h-5 text-slate-300 hover:text-slate-400 transition-colors" />
              )}
            </button>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className={`text-sm font-medium ${item.completed ? 'text-slate-500 line-through' : 'text-slate-900'}`}>
                  {item.label}
                </span>
                {item.href && (
                  <a 
                    href={item.href}
                    className="text-xs text-indigo-600 hover:text-indigo-700 underline"
                  >
                    Open →
                  </a>
                )}
              </div>
              <p className={`text-xs ${item.completed ? 'text-slate-400' : 'text-slate-600'} mt-1`}>
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-slate-100">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-600">
            {items.filter(item => item.completed).length} of {items.length} completed
          </span>
          <div className="w-24 bg-slate-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${(items.filter(item => item.completed).length / items.length) * 100}%` 
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
