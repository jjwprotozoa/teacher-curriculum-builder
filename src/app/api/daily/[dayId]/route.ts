import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ dayId: string }> }
) {
  try {
    const { dayId } = await params;
    const day = await prisma.dailyEntry.findUnique({
      where: { id: dayId },
      include: { 
        week: { 
          include: { term: true } 
        } 
      },
    });

    if (!day) {
      return NextResponse.json({ error: 'Day not found' }, { status: 404 });
    }

    return NextResponse.json({ day, week: day.week });
  } catch (error) {
    console.error('Error fetching day:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
