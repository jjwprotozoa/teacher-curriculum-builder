import { prisma } from '@/lib/db'
import { upsertDailyEntrySchema } from '@/lib/zod'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()
  const parsed = upsertDailyEntrySchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  const { weekId, date, dayOfWeek, activities, reflections } = parsed.data
  const entry = await prisma.dailyEntry.upsert({
    where: { weekId_date: { weekId, date: new Date(date) } },
    update: { activities: activities as any, reflections, dayOfWeek },
    create: { weekId, date: new Date(date), dayOfWeek, activities: activities as any, reflections },
  })
  return NextResponse.json(entry)
}
