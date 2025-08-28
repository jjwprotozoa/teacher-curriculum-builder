import { prisma } from '@/lib/db';
import WeeksPageClient from './WeeksPageClient';

export default async function WeeksPage() {
  const weeks = await prisma.week.findMany({
    include: {
      term: true,
      days: true,
      _count: {
        select: { days: true }
      }
    },
    orderBy: [
      { term: { order: 'asc' } },
      { number: 'asc' }
    ]
  });

  return <WeeksPageClient weeks={weeks as any} />;
}
