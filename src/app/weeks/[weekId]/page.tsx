import { prisma } from '@/lib/db';
import WeekPageClient from './WeekPageClient';

export default async function WeekPage({ params }: { params: { weekId: string } }) {
  const week = await prisma.week.findFirst({ 
    where: { id: params.weekId }, 
    include: { 
      weeklyPlan: true, 
      term: true,
      days: {
        orderBy: [{ date: 'asc' }]
      }
    } 
  });
  
  if (!week) return <div className="p-6">Not found</div>;

  return <WeekPageClient week={week} />;
}
