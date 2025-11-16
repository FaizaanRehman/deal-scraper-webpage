import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(): Promise<NextResponse> {
  try {
    // Apply 1-day buffer: Include deals that ended in the last 24 hours
    const now = new Date();
    const cutoff: Date = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const activeDeals = await prisma.deal.findMany({
      where: {
        startsAt: { lte: now }, // deals that have started
        endsAt: { gte: cutoff }, // and meet the cutoff
      },
      orderBy: { endsAt: 'asc' }, // show earlier ending deals first
    });

    const upcomingDeals = await prisma.deal.findMany({
      where: {
        startsAt: { gt: now }, // deals that will start in the future
      },
      orderBy: { startsAt: 'asc' }, // show earlier starting deals first
    });

    // Active deals should appear before upcoming deals
    const deals = [...activeDeals, ...upcomingDeals];
    return NextResponse.json(deals, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch deals' },
      { status: 500 }
    );
  }
}
