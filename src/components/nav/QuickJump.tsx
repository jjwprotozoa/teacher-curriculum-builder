'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

type WeekLite = { id: string; number: number; title?: string | null; termName?: string | null };

export default function QuickJump() {
  const [allWeeks, setAllWeeks] = useState<WeekLite[]>([]);
  const [q, setQ] = useState('');
  const r = useRouter();

  useEffect(() => {
    fetch('/api/weeks', { cache: 'no-store' })
      .then(res => res.json())
      .then((d) => setAllWeeks(d.weeks || []))
      .catch(() => {});
  }, []);

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return allWeeks.slice(0, 10);
    return allWeeks.filter(w =>
      String(w.number).includes(s) ||
      (w.title ?? '').toLowerCase().includes(s) ||
      (w.termName ?? '').toLowerCase().includes(s)
    ).slice(0, 20);
  }, [q, allWeeks]);

  return (
    <div className="relative w-72">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Jump to week… (e.g., 12 or 'Hygiene')"
        className="w-full rounded-md border px-3 py-2 text-sm"
      />
      {q && (
        <div className="absolute z-50 mt-1 w-full rounded-md border bg-white shadow">
          {results.length === 0 ? (
            <div className="px-3 py-2 text-sm text-muted-foreground">No matches</div>
          ) : results.map(w => (
            <button
              key={w.id}
              onClick={() => r.push(`/weeks/${w.id}`)}
              className="block w-full px-3 py-2 text-left text-sm hover:bg-muted"
            >
              Week {w.number} — {w.title ?? 'Untitled'} {w.termName ? `(${w.termName})` : ''}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
