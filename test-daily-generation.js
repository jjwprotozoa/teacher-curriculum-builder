const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function testDailyGeneration() {
  try {
    // Get the first week
    const week = await prisma.week.findFirst({
      include: { days: true, term: true }
    });

    if (!week) {
      console.log('No weeks found in database');
      return;
    }

    console.log(`Testing week: ${week.term.name} - Week ${week.number} - ${week.title}`);
    console.log(`Current daily entries: ${week.days.length}`);
    
    if (week.days.length === 0) {
      console.log('No daily entries found. Testing regeneration...');
      
      // Test the regeneration endpoint
      const response = await fetch(`http://localhost:3000/api/weeks/${week.id}/regen-days`, {
        method: 'POST'
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log('Regeneration successful:', result);
        
        // Check the updated week
        const updatedWeek = await prisma.week.findFirst({
          where: { id: week.id },
          include: { days: true }
        });
        
        console.log(`Updated daily entries: ${updatedWeek.days.length}`);
        console.log('Daily entries:', updatedWeek.days.map(d => ({
          date: d.date,
          dayOfWeek: d.dayOfWeek,
          activitiesCount: Object.keys(d.activities || {}).length
        })));
      } else {
        console.log('Regeneration failed:', response.status);
      }
    } else {
      console.log('Daily entries found:', week.days.map(d => ({
        date: d.date,
        dayOfWeek: d.dayOfWeek,
        activitiesCount: Object.keys(d.activities || {}).length
      })));
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testDailyGeneration();
