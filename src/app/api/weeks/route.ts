import { prisma } from '@/lib/db';
import { upsertWeekSchema } from '@/lib/zod';
import { NextResponse } from 'next/server';

export async function GET() {
  const weeks = await prisma.week.findMany({
    include: { term: true },
    orderBy: [{ number: 'asc' }],
  });
  
  return NextResponse.json({
    weeks: weeks.map(w => ({
      id: w.id,
      number: w.number,
      title: w.title,
      termName: w.term.name,
    }))
  });
}

export async function POST(req: Request) {
  const body = await req.json()
  const parsed = upsertWeekSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  const { projectId, termId, number, title, startDate, endDate } = parsed.data
  const week = await prisma.week.upsert({
    where: { projectId_number: { projectId, number } },
    update: { title, termId, startDate: new Date(startDate), endDate: new Date(endDate) },
    create: { projectId, termId, number, title, startDate: new Date(startDate), endDate: new Date(endDate) },
  })
  return NextResponse.json(week)
}
