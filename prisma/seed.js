const { PrismaClient } = require("@prisma/client");
const fs = require("node:fs");
const path = require("node:path");

const prisma = new PrismaClient();

// Read the Term 1 Hybrid Stretch curriculum data
const dataPath = path.join(process.cwd(), "data", "term1-hybrid.json");
const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

async function main() {
  console.log("🌱 Starting to seed Term 1 Hybrid Stretch curriculum...");
  
  const term = data.term;
  console.log(`📚 Processing ${term} with ${data.weeks.length} weeks...`);
  
  for (const weekData of data.weeks) {
    console.log(`  📅 Week ${weekData.weekNumber}: ${weekData.theme}`);
    
    // Create or update the curriculum week
    const curriculumWeek = await prisma.curriculumWeek.upsert({
      where: { 
        term_weekNumber: { 
          term, 
          weekNumber: weekData.weekNumber 
        } 
      },
      update: { 
        theme: weekData.theme, 
        dates: weekData.dates 
      },
      create: { 
        term, 
        weekNumber: weekData.weekNumber, 
        theme: weekData.theme, 
        dates: weekData.dates 
      }
    });

    // Create or update the weekly plan with stretch data
    await prisma.weeklyPlan.upsert({
      where: { 
        curriculumWeekId: curriculumWeek.id 
      },
      update: { 
        stretch: weekData.stretch 
      },
      create: { 
        curriculumWeekId: curriculumWeek.id, 
        stretch: weekData.stretch 
      }
    });
    
    console.log(`    ✅ Created/updated week ${weekData.weekNumber}`);
  }
  
  console.log("🎉 Term 1 Hybrid Stretch curriculum seeding completed!");
}

main()
  .catch((e) => {
    console.error("❌ Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
