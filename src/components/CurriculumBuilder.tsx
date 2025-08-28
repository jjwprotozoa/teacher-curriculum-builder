"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, ChevronLeft, ChevronRight, Clock, Download, FileText, Upload } from "lucide-react";
import React, { useMemo, useState } from "react";

// --- UI Helpers -------------------------------------------------------------
const Crumb = ({ label, onClick }: { label: string; onClick?: () => void }) => (
  <button onClick={onClick} className="text-sm flex items-center gap-1 text-slate-600 hover:text-slate-900">
    {label}
  </button>
);

const Card: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ className, children }) => (
  <div className={`rounded-2xl border border-slate-200 bg-white shadow-sm ${className ?? ""}`}>{children}</div>
);

const H = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-xl font-semibold tracking-tight text-slate-900">{children}</h2>
);

// --- Mock Data --------------------------------------------------------------
const TERMS = [
  { id: "t1", name: "Term 1", color: "#E0F2FE" },
  { id: "t2", name: "Term 2", color: "#ECFCCB" },
  { id: "t3", name: "Term 3", color: "#FCE7F3" },
  { id: "t4", name: "Term 4", color: "#FEF9C3" },
] as const;

type Week = { id: string; number: number; termId: string; title: string; start: string; end: string };

const THEMES: Record<number, string> = {
  1: "General Orientation",
  2: "Hygiene",
  3: "Manners and Respect",
  4: "Me, I'm Special + Senses",
  5: "Me, I'm Special + Senses",
  6: "Healthy Eating",
  7: "My Family",
  8: "My Home",
  9: "Autumn",
  10: "Easter",
  11: "Easter",
  12: "Birds",
  13: "Birds",
  14: "Dinosaurs",
  15: "Dinosaurs",
  16: "Occupations",
  17: "Occupations",
  18: "Transport",
  19: "Transport",
  20: "Sport",
  21: "Space",
  22: "Winter",
  23: "Winter",
  24: "Pets",
  25: "Pets",
  26: "The Farm",
  27: "The Farm",
  28: "Wild Animals",
  29: "Wild Animals",
  30: "Spring",
  31: "Life Cycles",
  32: "Or switch",
  33: "In the Garden (Bugs & Creepy Crawlies)",
  34: "Other Countries",
  35: "Music",
  36: "Summer at the Seaside",
  37: "Summer at the Seaside",
  38: "Conservation / Recycling",
  39: "Christmas",
  40: "Christmas",
  41: "Christmas",
  42: "Holiday Safety",
  43: "Time to Say Goodbye",
};

const makeWeeks = (): Week[] => {
  const weeks: Week[] = [];
  let number = 1;
  for (const term of TERMS) {
    for (let i = 0; i < 11 && number <= 43; i++) {
      const id = `${term.id}-w${number}`;
      weeks.push({ id, number, termId: term.id, title: THEMES[number] ?? "Theme TBD", start: "2026-01-13", end: "2026-01-19" });
      number++;
    }
  }
  return weeks;
};

const WEEKS = makeWeeks();

const SLOTS = [
  { time: "07h00–07h30", area: "Morning care & breakfast" },
  { time: "07h30–08h00", area: "Arrival / Free play" },
  { time: "08h00–08h40", area: "Morning ring / News" },
  { time: "08h40–09h00", area: "Music / Movement" },
  { time: "09h00–09h30", area: "Free play & Fruit routine" },
  { time: "09h30–10h30", area: "Creative art activities" },
  { time: "10h30–11h00", area: "Toilet routine & Snack" },
  { time: "11h00–11h20", area: "Free play" },
  { time: "11h20–12h00", area: "Structured outside play" },
  { time: "12h00–12h30", area: "Story time" },
  { time: "12h30–12h40", area: "Pack away time" },
  { time: "12h40", area: "Home time" },
];

// --- Main Component ---------------------------------------------------------
export default function CurriculumBuilderSample() {
  const [view, setView] = useState<"year" | "term" | "week" | "day">("year");
  const [termId, setTermId] = useState<string | null>(null);
  const [weekId, setWeekId] = useState<string | null>(null);
  const [day, setDay] = useState<string | null>(null);

  const currentTerm = TERMS.find((t) => t.id === termId) ?? null;
  const currentWeek = WEEKS.find((w) => w.id === weekId) ?? null;

  const termWeeks = useMemo(() => WEEKS.filter((w) => w.termId === termId), [termId]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Content */}
      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">
        <AnimatePresence mode="wait">
          {view === "year" && (
            <motion.section key="year" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="space-y-6">
              <H>Choose a Term</H>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {TERMS.map((t) => (
                  <button key={t.id} onClick={() => { setTermId(t.id); setView("term"); }}>
                    <Card className="p-5 text-left hover:shadow-md transition">
                      <div className="flex items-center justify-between">
                        <div className="text-slate-700 font-medium">{t.name}</div>
                        <CalendarDays className="size-5 text-slate-500" />
                      </div>
                      <div className="mt-3 text-sm text-slate-500">View weeks & themes</div>
                    </Card>
                  </button>
                ))}
              </div>
            </motion.section>
          )}

          {view === "term" && currentTerm && (
            <motion.section key="term" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="space-y-6">
              <div className="flex items-center gap-3">
                <button onClick={() => setView("year")} className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900"><ChevronLeft className="size-4"/>Back</button>
                <H>{currentTerm.name}</H>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {termWeeks.map((w) => (
                  <button key={w.id} onClick={() => { setWeekId(w.id); setView("week"); }}>
                    <Card className="p-4 text-left hover:shadow-md">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-slate-500">Term {TERMS.findIndex(t=>t.id===w.termId)+1}: Week {w.number}</div>
                          <div className="font-semibold text-slate-900">{w.title}</div>
                        </div>
                        <ChevronRight className="size-5 text-slate-400" />
                      </div>
                      <div className="mt-2 text-xs text-slate-500">{w.start} → {w.end}</div>
                    </Card>
                  </button>
                ))}
              </div>
            </motion.section>
          )}

          {view === "week" && currentWeek && (
            <motion.section key="week" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <div className="text-sm text-slate-500">Term {TERMS.findIndex(t=>t.id===currentWeek.termId)+1} · {currentWeek.start} → {currentWeek.end}</div>
                  <h1 className="text-xl sm:text-2xl font-bold">Week {currentWeek.number} — {currentWeek.title}</h1>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <button className="px-3 py-2 text-sm rounded-xl border bg-white hover:bg-slate-50 inline-flex items-center justify-center gap-2"><Upload className="size-4"/>Import</button>
                  <button className="px-3 py-2 text-sm rounded-xl border bg-white hover:bg-slate-50 inline-flex items-center justify-center gap-2"><Download className="size-4"/>Export CSV</button>
                </div>
              </div>

              {/* Learning Focus */}
              <Card className="p-4 sm:p-5">
                <H>Learning Focus</H>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {["Maths","Literacy","Life Skills","Science","Creative Arts","Other"].map((s)=> (
                    <div key={s} className="rounded-xl border p-3 sm:p-4">
                      <div className="text-sm font-medium text-slate-700">{s}</div>
                      <textarea placeholder={`Add ${s} goals...`} className="mt-2 w-full h-20 sm:h-24 rounded-lg border p-2 text-sm outline-none focus:ring-2 ring-indigo-200" />
                    </div>
                  ))}
                </div>
              </Card>

              {/* Daily Plans CTA */}
              <Card className="p-4 sm:p-5">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <Clock className="size-5 text-indigo-600"/>
                    <div>
                      <div className="font-semibold">Daily Plans (Mon–Fri)</div>
                      <div className="text-sm text-slate-500">Autogenerated from Penguin Class timetable — click a day to edit</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {["Mon","Tue","Wed","Thu","Fri"].map((d)=> (
                      <button key={d} onClick={()=>{ setDay(d); setView("day"); }} className="px-2 py-2 rounded-xl border bg-white hover:bg-slate-50 text-sm font-medium">{d}</button>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.section>
          )}

          {view === "day" && currentWeek && day && (
            <motion.section key="day" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <button onClick={() => setView("week")} className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900 w-fit"><ChevronLeft className="size-4"/>Back to Week</button>
                <H>{day} — Week {currentWeek.number} · {currentWeek.title}</H>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
                <div className="lg:col-span-2 space-y-4">
                  {SLOTS.map((slot) => (
                    <Card key={slot.time} className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-xs uppercase tracking-wide text-slate-500">{slot.time}</div>
                          <div className="font-medium text-slate-800">{slot.area}</div>
                        </div>
                        <span className="text-xs rounded-full bg-indigo-50 text-indigo-700 px-2 py-1">{currentWeek.title}</span>
                      </div>
                      <textarea placeholder="Planned activity…" className="mt-3 w-full h-20 rounded-lg border p-2 text-sm outline-none focus:ring-2 ring-indigo-200"/>
                      <input placeholder="Materials…" className="mt-2 w-full rounded-lg border p-2 text-sm outline-none focus:ring-2 ring-indigo-200"/>
                    </Card>
                  ))}
                </div>
                <div className="space-y-4">
                  <Card className="p-4">
                    <div className="text-sm font-medium text-slate-700 mb-2">Reflections</div>
                    <textarea placeholder="What worked / what to improve…" className="w-full h-48 rounded-lg border p-2 text-sm outline-none focus:ring-2 ring-indigo-200"/>
                  </Card>
                  <button className="w-full py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700">Save Day Plan</button>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/70">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4 text-xs text-slate-500 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <span>© 2026 Curriculum Builder</span>
          <span className="flex items-center gap-2"><FileText className="size-4"/> Demo UI / Not wired to data</span>
        </div>
      </footer>
    </div>
  );
}
