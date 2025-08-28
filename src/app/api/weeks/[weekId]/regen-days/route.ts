import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

// Penguin Class timetable slots (exactly as specified)
const PENGUIN_CLASS_SLOTS = [
  '07h00–07h30 Morning care & breakfast',
  '07h30–08h00 Arrival / Free play',
  '08h00–08h40 Morning ring / News',
  '08h40–09h00 Music / Movement',
  '09h00–09h30 Free play & Fruit routine',
  '09h30–10h30 Creative art activities',
  '10h30–11h00 Toilet routine & Snack',
  '11h00–11h20 Free play',
  '11h20–12h00 Structured outside play',
  '12h00–12h30 Story time',
  '12h30–12h40 Pack away time',
  '12h40 Home time'
];

export async function POST(req: Request, { params }: { params: { weekId: string } }) {
  try {
    const week = await prisma.week.findUnique({
      where: { id: params.weekId },
      include: { term: true }
    });

    if (!week) {
      return NextResponse.json({ error: 'Week not found' }, { status: 404 });
    }

    // Delete existing daily entries for this week
    await prisma.dailyEntry.deleteMany({
      where: { weekId: params.weekId }
    });

    // Generate Monday to Friday daily entries
    const daysOfWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI'];
    const startDate = new Date(week.startDate);
    
    const dailyEntries = [];
    
    for (let i = 0; i < 5; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      
      // Initialize activities with empty arrays for each time slot
      const activities = Object.fromEntries(
        PENGUIN_CLASS_SLOTS.map(slot => [slot, []])
      );

      const dailyEntry = await prisma.dailyEntry.create({
        data: {
          weekId: params.weekId,
          date: date,
          dayOfWeek: daysOfWeek[i] as any,
          activities: activities,
          reflections: ''
        }
      });
      
      dailyEntries.push(dailyEntry);
    }

    return NextResponse.json({ 
      message: 'Daily entries regenerated successfully',
      count: dailyEntries.length,
      entries: dailyEntries
    });

  } catch (error) {
    console.error('Error regenerating daily entries:', error);
    return NextResponse.json({ error: 'Failed to regenerate daily entries' }, { status: 500 });
  }
}
