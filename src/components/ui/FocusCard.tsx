import { Card } from './Card';

interface FocusCardProps {
  subject: string;
  icon: React.ReactNode;
  goals: string[];
  onGoalsChange: (goals: string[]) => void;
}

export function FocusCard({ subject, icon, goals, onGoalsChange }: FocusCardProps) {
  const handleGoalChange = (index: number, value: string) => {
    const newGoals = [...goals];
    newGoals[index] = value;
    onGoalsChange(newGoals);
  };

  const addGoal = () => {
    onGoalsChange([...goals, '']);
  };

  const removeGoal = (index: number) => {
    const newGoals = goals.filter((_, i) => i !== index);
    onGoalsChange(newGoals);
  };

  return (
    <Card className="p-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
          {icon}
        </div>
        <h3 className="font-semibold text-slate-900">{subject}</h3>
      </div>
      
      <div className="space-y-3">
        {goals.map((goal, index) => (
          <div key={index} className="flex gap-2">
            <textarea
              value={goal}
              onChange={(e) => handleGoalChange(index, e.target.value)}
              placeholder={`${subject} learning goal...`}
              className="flex-1 text-sm border border-slate-200 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              rows={2}
            />
            <button
              onClick={() => removeGoal(index)}
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        ))}
        
        <button
          onClick={addGoal}
          className="w-full text-sm text-indigo-600 hover:text-indigo-700 font-medium py-2 border border-dashed border-indigo-200 rounded-lg hover:border-indigo-300 transition-colors"
        >
          + Add {subject} goal
        </button>
      </div>
    </Card>
  );
}
