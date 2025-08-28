import { prisma } from '@/lib/db'

export async function exportProjectCSV(projectId: string) {
  const weeks = await prisma.week.findMany({ where: { projectId }, include: { term: true, weeklyPlan: true, days: true } })
  const header = [
    'Term','WeekNumber','WeekTitle','WeekStart','WeekEnd','GoalsMaths','GoalsLiteracy','GoalsLifeSkills','GoalsScience','GoalsCreativeArts','Notes','Day','Date','Slot','Area','Activity','Reflections'
  ]
  const rows: string[] = [header.join(',')]
  for (const w of weeks) {
    const goals = (w.weeklyPlan?.goals as any) || {}
    const base = [w.term.name, w.number, w.title, w.startDate.toISOString().slice(0,10), w.endDate.toISOString().slice(0,10),
      (goals.maths||[]).join('|'), (goals.literacy||[]).join('|'), (goals.lifeSkills||[]).join('|'), (goals.science||[]).join('|'), (goals.creativeArts||[]).join('|'),
      w.weeklyPlan?.notes?.replaceAll(',', ';') ?? ''
    ]
    for (const d of w.days) {
      const acts = d.activities as any
      for (const slot of Object.keys(acts)) {
        for (const a of acts[slot]) {
          rows.push([...base, d.dayOfWeek, d.date.toISOString().slice(0,10), slot, a.area, a.activity.replaceAll(',', ';'), d.reflections?.replaceAll(',', ';') ?? ''].join(','))
        }
      }
    }
  }
  return rows.join('\n')
}
