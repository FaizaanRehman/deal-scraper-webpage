import prisma from './prisma';
import type { Deal } from './filterPosts';

export async function upsertDeals(deals: Deal[]): Promise<void> {
  for (const deal of deals) {
    if (!deal.url) {
      console.warn('Skipping deal with no URL:', deal);
      continue;
    }

    const now = new Date();

    try {
      await prisma.deal.upsert({
        where: { url: deal.url },
        update: {
          caption: deal.caption,
          startsAt: deal.start,
          endsAt: deal.end,
          updatedAt: now,
        },
        create: {
          caption: deal.caption,
          url: deal.url,
          startsAt: deal.start,
          endsAt: deal.end,
          createdAt: now,
          updatedAt: now,
        },
      });
    } catch (error) {
      console.error('Failed to upsert deal:', deal, error);
    }
  }
}
