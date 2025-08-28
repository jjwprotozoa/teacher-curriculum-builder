import { exportProjectCSV } from '@/lib/export'
import { NextResponse } from 'next/server'

export async function GET(_: Request, { params }: { params: { projectId: string } }) {
  const csv = await exportProjectCSV(params.projectId)
  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="project-${params.projectId}.csv"`
    }
  })
}
