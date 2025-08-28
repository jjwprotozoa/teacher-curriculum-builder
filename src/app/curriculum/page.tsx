import { prisma } from '@/lib/prisma';
import CurriculumPageClient from './CurriculumPageClient';

export default async function CurriculumPage() {
  const terms = await prisma.term.findMany({
    orderBy: [{ order: 'asc' }],
    include: { 
      weeks: { 
        orderBy: [{ number: 'asc' }],
        include: {
          weeklyPlan: true,
          days: {
            orderBy: [{ date: 'asc' }]
          }
        }
      } 
    },
  });

  return <CurriculumPageClient terms={terms} />;
}
