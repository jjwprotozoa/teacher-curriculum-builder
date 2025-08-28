import { exportProjectCSV } from '@/lib/export'
import { NextResponse } from 'next/server'

export async function GET(_: Request, { params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params
  const csv = await exportProjectCSV(projectId)
  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="project-${projectId}.csv"`
    }
  })
}
