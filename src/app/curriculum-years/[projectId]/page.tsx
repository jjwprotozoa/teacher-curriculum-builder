import { Breadcrumbs } from '@/components/nav/Breadcrumbs'
import { PageActions } from '@/components/nav/PageActions'
import { prisma } from '@/lib/db'
import Link from 'next/link'

export default async function CurriculumYearPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params
  const curriculumYear = await prisma.project.findFirst({
    where: { id: projectId },
    include: { terms: { orderBy: { order: 'asc' } }, weeks: { orderBy: { number: 'asc' } } }
  })
  if (!curriculumYear) return <div className="p-6">Not found</div>

  const termName = (termId: string) => curriculumYear.terms.find(t=>t.id===termId)?.name ?? '—'

  return (
    <div className="p-6 space-y-6">
      <Breadcrumbs items={[
        { label: 'Curriculum Builder', href: '/' },
        { label: 'Curriculum Years', href: '/curriculum-years' },
        { label: curriculumYear.title }
      ]} />
      
      <PageActions 
        left={<Link href="/curriculum-years" className="text-sm underline">← Back to Curriculum Years</Link>}
        right={<Link href="/curriculum" className="text-sm underline">View Curriculum</Link>}
      />
      
      <h1 className="text-2xl font-bold">{curriculumYear.title}</h1>
      <div className="text-sm opacity-70">{curriculumYear.year} · {curriculumYear.ageGroup}</div>

      <table className="w-full text-sm border">
        <thead>
          <tr className="bg-gray-50">
            <th className="p-2 border">Term</th>
            <th className="p-2 border">Week #</th>
            <th className="p-2 border">Theme</th>
            <th className="p-2 border">Dates</th>
            <th className="p-2 border">Plan</th>
            <th className="p-2 border">Daily</th>
          </tr>
        </thead>
        <tbody>
          {curriculumYear.weeks.map(w => (
            <tr key={w.id}>
              <td className="p-2 border">{termName(w.termId)}</td>
              <td className="p-2 border">{w.number}</td>
              <td className="p-2 border">{w.title}</td>
              <td className="p-2 border">{w.startDate.toLocaleDateString()} → {w.endDate.toLocaleDateString()}</td>
              <td className="p-2 border"><a className="underline" href={`/weeks/${w.id}`}>Weekly plan</a></td>
              <td className="p-2 border"><a className="underline" href={`/weeks/${w.id}/daily`}>Daily entries</a></td>
            </tr>
          ))}
        </tbody>
      </table>

      <a className="underline" href={`/api/export/${curriculumYear.id}`}>Export CSV</a>
    </div>
  )
}
