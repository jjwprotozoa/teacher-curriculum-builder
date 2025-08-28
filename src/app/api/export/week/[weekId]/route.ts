import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(_: Request, { params }: { params: { weekId: string } }) {
  const week = await prisma.week.findUnique({
    where: { id: params.weekId },
    include: { 
      days: { 
        orderBy: [{ date: 'asc' }] 
      },
      term: true,
      project: true
    },
  });
  
  if (!week) return new NextResponse('Not found', { status: 404 });

  // CSV headers
  const headers = [
    'WeekNumber',
    'Term',
    'Theme',
    'StartDate',
    'EndDate',
    'DayId',
    'Date',
    'DayOfWeek',
    'TimeSlot',
    'Area',
    'Activity',
    'Reflections'
  ];

  const rows = [headers];

  // Add week meta + all daily slot activities
  week.days.forEach(day => {
    if (day.activities && typeof day.activities === 'object') {
      Object.entries(day.activities as Record<string, any>).forEach(([timeSlot, activities]) => {
        if (Array.isArray(activities) && activities.length > 0) {
          // Each activity gets its own row
          activities.forEach((activity: any) => {
            rows.push([
              week.number.toString(),
              week.term.name,
              week.title || '',
              week.startDate?.toISOString().slice(0, 10) || '',
              week.endDate?.toISOString().slice(0, 10) || '',
              day.id,
              day.date?.toISOString().slice(0, 10) || '',
              day.dayOfWeek || '',
              timeSlot,
              activity.area || '',
              activity.activity || '',
              day.reflections || ''
            ]);
          });
        } else {
          // Empty time slot - still include a row
          rows.push([
            week.number.toString(),
            week.term.name,
            week.title || '',
            week.startDate?.toISOString().slice(0, 10) || '',
            week.endDate?.toISOString().slice(0, 10) || '',
            day.id,
            day.date?.toISOString().slice(0, 10) || '',
            day.dayOfWeek || '',
            timeSlot,
            '',
            '',
            day.reflections || ''
          ]);
        }
      });
    }
  });

  const csv = rows.map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
  
  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename=week-${week.number}-${week.title?.replace(/[^a-zA-Z0-9]/g, '-') || 'theme'}.csv`,
    },
  });
}
