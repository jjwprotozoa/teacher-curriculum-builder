import { prisma } from '@/lib/db'
import { upsertTermSchema } from '@/lib/zod'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()
  const parsed = upsertTermSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  const { projectId, name, order, startDate, endDate } = parsed.data
  const term = await prisma.term.upsert({
    where: { projectId_order: { projectId, order } },
    update: { name, startDate: new Date(startDate), endDate: new Date(endDate) },
    create: { projectId, name, order, startDate: new Date(startDate), endDate: new Date(endDate) },
  })
  return NextResponse.json(term)
}

export async function GET() {
  try {
    const curriculumWeeks = await prisma.curriculumWeek.findMany({
      include: {
        weeklyPlan: {
          select: {
            stretch: true
          }
        }
      },
      orderBy: [
        { term: 'asc' },
        { weekNumber: 'asc' }
      ]
    });

    return NextResponse.json(curriculumWeeks);
  } catch (error) {
    console.error('Error fetching curriculum weeks:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
