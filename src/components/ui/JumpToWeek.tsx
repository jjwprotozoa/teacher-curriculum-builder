'use client';
import { Clock, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function JumpToWeek() {
  const [input, setInput] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();

  const handleJump = async () => {
    if (!input.trim()) return;
    
    setIsSearching(true);
    
    try {
      // Parse input for week number and optional day
      const weekMatch = input.match(/(\d+)(?::(\w+))?/);
      if (weekMatch) {
        const weekNumber = parseInt(weekMatch[1]);
        const dayShort = weekMatch[2];
        
        // Search for the week
        const response = await fetch(`/api/weeks?week=${weekNumber}`);
        const data = await response.json();
        
        if (data.weeks && data.weeks.length > 0) {
          const week = data.weeks[0];
          
          if (dayShort) {
            // Navigate to specific day if day shortcut provided
            const dayMap: Record<string, number> = { mon: 0, tue: 1, wed: 2, thu: 3, fri: 4 };
            const dayIndex = dayMap[dayShort.toLowerCase()];
            
            if (dayIndex !== undefined) {
              // Find the day entry for this week and day
              const dayResponse = await fetch(`/api/weeks/${week.id}/daily`);
              const dayData = await dayResponse.json();
              
              if (dayData.days && dayData.days[dayIndex]) {
                router.push(`/daily/${dayData.days[dayIndex].id}`);
                return;
              }
            }
          }
          
          // Navigate to week page
          router.push(`/weeks/${week.id}`);
          return;
        }
      }
      
      // If no match found, show error or search results
      alert('Week not found. Please check the week number.');
    } catch (error) {
      console.error('Error jumping to week:', error);
      alert('Error finding week. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleJump();
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
          <Clock className="w-5 h-5 text-indigo-600" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-900">Jump to Week</h3>
          <p className="text-sm text-slate-600">Quickly navigate to any week or day</p>
        </div>
      </div>
      
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="e.g., 12 or 12:Wed"
            className="w-full pl-10 pr-4 py-3 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <button
          onClick={handleJump}
          disabled={isSearching || !input.trim()}
          className="px-6 py-3 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSearching ? 'Finding...' : 'Jump'}
        </button>
      </div>
      
      <p className="text-xs text-slate-500 mt-2">
        Enter week number (e.g., 12) or week:day (e.g., 12:Wed)
      </p>
    </div>
  );
}
