import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import TermPageClient from './TermPageClient';

export default async function TermPage({ params }: { params: Promise<{ termId: string }> }) {
  const { termId } = await params
  const term = await prisma.term.findUnique({
    where: { id: termId },
    include: { 
      weeks: { 
        orderBy: [{ number: 'asc' }],
        include: {
          weeklyPlan: true,
          days: {
            orderBy: [{ date: 'asc' }]
          }
        }
      },
      project: true
    },
  });

  if (!term) {
    notFound();
  }

  return <TermPageClient term={term} />;
}
