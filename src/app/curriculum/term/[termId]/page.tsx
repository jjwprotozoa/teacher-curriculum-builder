import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import TermPageClient from './TermPageClient';

export default async function TermPage({ params }: { params: { termId: string } }) {
  const term = await prisma.term.findUnique({
    where: { id: params.termId },
    include: { 
      weeks: { 
        orderBy: [{ number: 'asc' }] 
      },
      project: true
    },
  });

  if (!term) {
    notFound();
  }

  return <TermPageClient term={term} />;
}
