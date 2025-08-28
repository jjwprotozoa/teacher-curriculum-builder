'use client'
import { Breadcrumbs } from '@/components/nav/Breadcrumbs'
import { useEffect, useState } from 'react'

export default function CurriculumYearsPage() {
  const [items, setItems] = useState<any[]>([])
  const [form, setForm] = useState({ title: '', year: 2026, ageGroup: '3–4 years' })

  async function load() {
    const res = await fetch('/api/curriculum-years')
    setItems(await res.json())
  }
  useEffect(() => { load() }, [])

  async function create(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch('/api/curriculum-years', { method: 'POST', body: JSON.stringify({ ...form, year: Number(form.year) }) })
    if (res.ok) { setForm({ title: '', year: 2026, ageGroup: '3–4 years' }); load() }
  }

  return (
    <div className="p-6 space-y-6">
      <Breadcrumbs items={[
        { label: 'Curriculum Builder', href: '/' },
        { label: 'Curriculum Years' }
      ]} />
      <h1 className="text-2xl font-bold">Curriculum Years</h1>
      
      {/* Help Text Section */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-3">What is a Curriculum Year?</h2>
        <div className="text-slate-700 space-y-2">
          <p>A <strong>Curriculum Year</strong> represents a complete academic year of early childhood education planning. Think of it as your master plan for the entire school year.</p>
          <p>Each Curriculum Year contains:</p>
          <ul className="list-disc list-inside ml-4 space-y-1 text-sm">
            <li><strong>Terms</strong> - Academic periods (e.g., Term 1, Term 2, Term 3)</li>
            <li><strong>Weeks</strong> - Weekly themes and learning objectives</li>
            <li><strong>Daily Plans</strong> - Specific activities and routines for each day</li>
            <li><strong>Learning Goals</strong> - Age-appropriate developmental milestones</li>
          </ul>
          <p className="text-sm text-slate-600 mt-3">
            💡 <strong>Tip:</strong> Create one Curriculum Year per academic year. You can have multiple years (e.g., 2025-2026, 2026-2027) to plan ahead or review past years.
          </p>
        </div>
      </div>
      <form onSubmit={create} className="grid grid-cols-4 gap-3">
        <input className="border rounded p-2" placeholder="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} />
        <input className="border rounded p-2" placeholder="Year" type="number" value={form.year} onChange={e=>setForm({...form, year:e.target.value as any})} />
        <input className="border rounded p-2" placeholder="Age group" value={form.ageGroup} onChange={e=>setForm({...form, ageGroup:e.target.value})} />
        <button className="rounded bg-black text-white px-4">Create Curriculum Year</button>
      </form>

      <ul className="space-y-2">
        {items.map(p => (
          <li key={p.id} className="border rounded p-3 flex justify-between items-center">
            <div>
              <div className="font-medium">{p.title}</div>
              <div className="text-sm opacity-70">Year {p.year} · {p.ageGroup}</div>
            </div>
            <a className="underline" href={`/curriculum-years/${p.id}`}>Open →</a>
          </li>
        ))}
      </ul>
    </div>
  )
}
