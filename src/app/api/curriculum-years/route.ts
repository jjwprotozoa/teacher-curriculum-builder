import { prisma } from '@/lib/db'
import { createProjectSchema } from '@/lib/zod'
import { NextResponse } from 'next/server'

export async function GET() {
  const projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(projects)
}

export async function POST(req: Request) {
  const body = await req.json()
  const parsed = createProjectSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  const project = await prisma.project.create({ data: parsed.data })
  return NextResponse.json(project, { status: 201 })
}
