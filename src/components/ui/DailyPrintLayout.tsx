'use client';

import { PrintPreviewModal } from './PrintPreviewModal';

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

interface DailyPrintLayoutProps {
  week: Week;
  onClose: () => void;
}

export function DailyPrintLayout({ week, onClose }: DailyPrintLayoutProps) {
  return (
    <PrintPreviewModal 
      type="daily" 
      data={week} 
      onClose={onClose} 
    />
  );
}
