import { prisma } from '@/lib/db';
import { Calendar } from 'lucide-react';
import Link from 'next/link';
import DailyPageClient from './DailyPageClient';

export default async function DailyPage() {
  // Get the current week's daily entries
  const currentDate = new Date();
  const currentWeek = await prisma.week.findFirst({
    where: {
      startDate: { lte: currentDate },
      endDate: { gte: currentDate }
    },
    include: {
      term: true,
      days: {
        orderBy: [{ date: 'asc' }]
      }
    }
  });

  // If no current week, get the most recent week
  const recentWeek = currentWeek || await prisma.week.findFirst({
    include: {
      term: true,
      days: {
        orderBy: [{ date: 'asc' }]
      }
    },
    orderBy: [{ startDate: 'desc' }]
  });

  if (!recentWeek) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="text-center py-12">
          <Calendar className="mx-auto h-12 w-12 text-slate-400 mb-4" />
          <h1 className="text-2xl font-bold text-slate-900 mb-2">No Weekly Plans Available</h1>
          <p className="text-lg text-slate-600 mb-6">
            No weekly plans have been created yet. Start by creating a curriculum year and terms.
          </p>
          <Link
            href="/curriculum"
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            Go to Curriculum Builder
          </Link>
        </div>
      </div>
    );
  }

  return <DailyPageClient week={recentWeek as any} />;
}
