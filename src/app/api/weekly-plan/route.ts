import { prisma } from '@/lib/db'
import { upsertWeeklyPlanSchema } from '@/lib/zod'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()
  const parsed = upsertWeeklyPlanSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  const { weekId, goals, notes, resources } = parsed.data
  const plan = await prisma.weeklyPlan.upsert({
    where: { weekId },
    update: { goals, notes, resources: resources as any },
    create: { weekId, goals, notes, resources: resources as any },
  })
  return NextResponse.json(plan)
}
