import prisma from './prisma';
import type { Deal } from './filterPosts';

export async function upsertDeals(deals: Deal[]): Promise<void> {
  for (const deal of deals) {
    if (!deal.url) {
      console.warn('Skipping deal with no URL:', deal);
      continue;
    }

    try {
      await prisma.deal.upsert({
        where: { url: deal.url },
        update: {
          caption: deal.caption,
          startsAt: deal.dateRange.start,
          endsAt: deal.dateRange.end,
          updatedAt: new Date(),
        },
        create: {
          caption: deal.caption,
          url: deal.url,
          startsAt: deal.dateRange.start,
          endsAt: deal.dateRange.end,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      console.error('Failed to upsert deal:', deal, error);
    }
  }
}
