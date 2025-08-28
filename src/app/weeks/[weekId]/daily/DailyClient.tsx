'use client';
import React from 'react';

// Penguin Class timetable slots (exactly as specified)
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

export default function DailyClient({ weekId }: { weekId: string }) {
  const [date, setDate] = React.useState<string>(new Date().toISOString().slice(0,10));
  const [dayOfWeek, setDOW] = React.useState<'MON'|'TUE'|'WED'|'THU'|'FRI'|'SAT'|'SUN'>('MON');
  const [activities, setActivities] = React.useState<any>(()=>Object.fromEntries(PENGUIN_CLASS_SLOTS.map(s=>[s,[]])));
  const [reflections, setReflections] = React.useState('');

  function add(slot: string, area: string, activity: string) {
    setActivities((a:any)=>({ ...a, [slot]: [...a[slot], { area, activity }] }));
  }

  function remove(slot: string, index: number) {
    setActivities((a:any)=>({ 
      ...a, 
      [slot]: a[slot].filter((_: any, i: number) => i !== index) 
    }));
  }

  async function save() {
    const payload = { weekId, date, dayOfWeek, activities, reflections };
    await fetch('/api/daily', { method:'POST', body: JSON.stringify(payload) });
    alert('Saved daily entry');
  }

  return (
    <div className="space-y-6 border rounded-lg p-6 bg-white">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Create New Daily Plan</h3>
        <div className="grid grid-cols-2 gap-3">
          <input 
            type="date" 
            className="border rounded p-2" 
            value={date} 
            onChange={e=>setDate(e.target.value)} 
          />
          <select 
            className="border rounded p-2" 
            value={dayOfWeek} 
            onChange={e=>setDOW(e.target.value as any)}
          >
            {['MON','TUE','WED','THU','FRI','SAT','SUN'].map(d=> 
              <option key={d} value={d}>{d}</option>
            )}
          </select>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Timetable Activities</h3>
        {PENGUIN_CLASS_SLOTS.map(slot => (
          <div key={slot} className="border rounded-lg p-4 space-y-3">
            <div className="font-medium text-sm text-gray-700">{slot}</div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              <input 
                className="border rounded p-2 text-sm" 
                placeholder="Area (e.g., Free play)" 
                id={`area-${slot}`} 
              />
              <input 
                className="border rounded p-2 text-sm" 
                placeholder="Activity (e.g., Blocks & shapes)" 
                id={`activity-${slot}`} 
              />
              <button 
                className="rounded border px-3 py-2 text-sm bg-blue-50 hover:bg-blue-100 transition-colors" 
                onClick={()=>{
                  const area = (document.getElementById(`area-${slot}`) as HTMLInputElement).value;
                  const act = (document.getElementById(`activity-${slot}`) as HTMLInputElement).value;
                  if(area && act) {
                    add(slot, area, act);
                    (document.getElementById(`area-${slot}`) as HTMLInputElement).value = '';
                    (document.getElementById(`activity-${slot}`) as HTMLInputElement).value = '';
                  }
                }}
              >
                Add
              </button>
            </div>
            <div className="flex gap-2 flex-wrap">
              {(activities[slot]||[]).map((a:any,i:number)=> (
                <span key={i} className="text-xs border rounded px-2 py-1 bg-gray-50 flex items-center gap-1">
                  <span className="font-medium">{a.area}:</span> {a.activity}
                  <button 
                    onClick={()=>remove(slot, i)}
                    className="text-red-500 hover:text-red-700 ml-1"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold">End-of-Day Reflections</h3>
        <textarea 
          className="w-full border rounded p-3" 
          rows={4} 
          placeholder="How did the day go? What worked well? What could be improved?" 
          value={reflections} 
          onChange={e=>setReflections(e.target.value)} 
        />
      </div>
      
      <button 
        className="rounded bg-blue-600 text-white px-6 py-3 font-medium hover:bg-blue-700 transition-colors" 
        onClick={save}
      >
        Save Daily Plan
      </button>
    </div>
  );
}
