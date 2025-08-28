import fs from "node:fs";
import path from "node:path";
import type { TermData } from "./types";

const DATA_DIR = path.resolve(process.cwd(), "data");

export function loadTerm(termNum: 1|2|3|4): TermData {
  const file = `term${termNum}-hybrid.json`;
  const p = path.join(DATA_DIR, file);
  return JSON.parse(fs.readFileSync(p, "utf-8")) as TermData;
}

export function loadAllTerms(): TermData[] {
  return [1,2,3,4].map(n => loadTerm(n as 1|2|3|4));
}

export function loadWeeksByTerm(termNum: 1|2|3|4) {
  return loadTerm(termNum).weeks;
}

export function findWeek(termNum: 1|2|3|4, weekNumber: number) {
  return loadWeeksByTerm(termNum).find(w => w.weekNumber === weekNumber) ?? null;
}
