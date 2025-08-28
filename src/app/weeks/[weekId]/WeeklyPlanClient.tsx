'use client';
import React from 'react';

export default function WeeklyPlanClient({ weekId, initial }: any) {
  const [form, setForm] = React.useState<any>({
    weekId,
    goals: initial?.goals || { maths: [], literacy: [], lifeSkills: [], science: [], creativeArts: [], other: [] },
    notes: initial?.notes || '',
    resources: initial?.resources || { links: [], files: [], materials: [] },
  });

  async function save() {
    try {
      const response = await fetch('/api/weekly-plan', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form) 
      });
      
      if (response.ok) {
        alert('Weekly plan saved successfully!');
      } else {
        alert('Error saving weekly plan');
      }
    } catch (error) {
      alert('Error saving weekly plan');
      console.error(error);
    }
  }

  function TagInput({ field, title }: { field: string; title: string }) {
    const [text, setText] = React.useState('');
    const list: string[] = form.goals[field] || [];
    
    const addGoal = () => {
      if (text.trim()) {
        setForm((f: any) => ({ 
          ...f, 
          goals: { 
            ...f.goals, 
            [field]: [...list, text.trim()] 
          } 
        }));
        setText('');
      }
    };

    const removeGoal = (index: number) => {
      setForm((f: any) => ({
        ...f,
        goals: {
          ...f.goals,
          [field]: list.filter((_, idx) => idx !== index)
        }
      }));
    };

    return (
      <div className="space-y-3">
        <div className="font-medium text-gray-700">{title}</div>
        <div className="flex gap-2">
          <input 
            className="border rounded p-2 flex-1" 
            value={text} 
            onChange={e => setText(e.target.value)} 
            placeholder={`Add ${title.toLowerCase()} goal`}
            onKeyPress={(e) => e.key === 'Enter' && addGoal()}
          />
          <button 
            className="rounded border px-3 py-2 bg-blue-50 hover:bg-blue-100 transition-colors" 
            onClick={addGoal}
          >
            Add
          </button>
        </div>
        <div className="flex gap-2 flex-wrap">
          {list.map((g, i) => (
            <span key={i} className="text-xs border rounded px-2 py-1 bg-gray-50 flex items-center gap-1">
              {g}
              <button 
                onClick={() => removeGoal(i)}
                className="text-red-500 hover:text-red-700"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>
    );
  }

  function ResourcesInput() {
    const [text, setText] = React.useState('');
    const list: string[] = form.resources.links || [];

    const addResource = () => {
      if (text.trim()) {
        setForm((f: any) => ({
          ...f,
          resources: {
            ...f.resources,
            links: [...list, text.trim()]
          }
        }));
        setText('');
      }
    };

    const removeResource = (index: number) => {
      setForm((f: any) => ({
        ...f,
        resources: {
          ...f.resources,
          links: list.filter((_, idx) => idx !== index)
        }
      }));
    };

    return (
      <div className="space-y-3">
        <div className="font-medium text-gray-700">Resources & Links</div>
        <div className="flex gap-2">
          <input 
            className="border rounded p-2 flex-1" 
            value={text} 
            onChange={e => setText(e.target.value)} 
            placeholder="Add resource link or material"
            onKeyPress={(e) => e.key === 'Enter' && addResource()}
          />
          <button 
            className="rounded border px-3 py-2 bg-green-50 hover:bg-green-100 transition-colors" 
            onClick={addResource}
          >
            Add
          </button>
        </div>
        <div className="flex gap-2 flex-wrap">
          {list.map((r, i) => (
            <span key={i} className="text-xs border rounded px-2 py-1 bg-green-50 flex items-center gap-1">
              {r}
              <button 
                onClick={() => removeResource(i)}
                className="text-red-500 hover:text-red-700"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <TagInput field="maths" title="Maths" />
        <TagInput field="literacy" title="Literacy" />
        <TagInput field="lifeSkills" title="Life Skills" />
        <TagInput field="science" title="Science" />
        <TagInput field="creativeArts" title="Creative Arts" />
        <TagInput field="other" title="Other" />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Weekly Notes</h3>
        <textarea 
          className="w-full border rounded p-3" 
          rows={6} 
          placeholder="General notes, observations, or special considerations for this week..." 
          value={form.notes} 
          onChange={e => setForm({...form, notes: e.target.value})} 
        />
      </div>

      <ResourcesInput />

      <button 
        className="rounded bg-blue-600 text-white px-6 py-3 font-medium hover:bg-blue-700 transition-colors" 
        onClick={save}
      >
        Save Weekly Plan
      </button>
    </div>
  );
}
