import { PrismaClient } from "@prisma/client";
import { loadAllTerms } from "./loaders";

const prisma = new PrismaClient();

async function main() {
  const terms = loadAllTerms();
  for (const t of terms) {
    for (const w of t.weeks) {
      const week = await prisma.curriculumWeek.upsert({
        where: { term_weekNumber: { term: t.term, weekNumber: w.weekNumber } },
        update: { theme: w.theme, dates: w.dates },
        create: { term: t.term, weekNumber: w.weekNumber, theme: w.theme, dates: w.dates }
      });

      await prisma.weeklyPlan.upsert({
        where: { curriculumWeekId: week.id },
        update: { stretch: w.stretch },
        create: { curriculumWeekId: week.id, stretch: w.stretch }
      });
    }
  }
}

main().finally(() => prisma.$disconnect());
