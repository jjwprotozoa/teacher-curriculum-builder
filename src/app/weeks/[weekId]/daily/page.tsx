import { Breadcrumbs } from '@/components/nav/Breadcrumbs'
import { PageActions } from '@/components/nav/PageActions'
import { prisma } from '@/lib/db'
import Link from 'next/link'
import DailyClient from './DailyClient'

export default async function DailyPage({ params }: { params: { weekId: string } }) {
  const week = await prisma.week.findFirst({ 
    where: { id: params.weekId }, 
    include: { 
      days: { 
        orderBy: [{ date: 'asc' }] 
      }, 
      term: true 
    } 
  })
  
  if (!week) return <div className="p-6">Not found</div>

  return (
    <div className="p-6 space-y-6">
      <Breadcrumbs items={[
        { label: 'Curriculum Builder', href: '/' },
        { label: 'Curriculum', href: '/curriculum' },
        { label: week.term?.name ?? 'Term', href: `/curriculum/term/${week.term?.id}` },
        { label: `Week ${week.number}`, href: `/weeks/${week.id}` },
        { label: 'Daily Plans' }
      ]} />
      
      <PageActions 
        left={<Link href={`/weeks/${week.id}`} className="text-sm underline">← Back to Week</Link>}
        right={<Link href="/curriculum" className="text-sm underline">View Curriculum</Link>}
      />
      
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">
          {week.term?.name}: Week {week.number} — {week.title || 'Theme TBD'}
        </h1>
        <div className="text-sm opacity-70">
          {week.startDate.toLocaleDateString()} → {week.endDate.toLocaleDateString()}
        </div>
      </div>
      
      <DailyClient weekId={week.id} />
      
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Daily Plans</h2>
        <div className="grid gap-3">
          {week.days.sort((a: any, b: any) => new Date(a.date) > new Date(b.date) ? 1 : -1).map((d: any) => (
            <Link 
              key={d.id} 
              href={`/daily/${d.id}`} 
              className="block border rounded-lg p-4 hover:bg-muted transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">
                    {new Date(d.date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {d.dayOfWeek} • {week.title || 'Theme TBD'}
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {d.activities && typeof d.activities === 'object' ? 
                    Object.keys(d.activities).length + ' activities' : 
                    'No activities'
                  }
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
