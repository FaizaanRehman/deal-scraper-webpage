import prisma from './prisma';
import type { Deal } from './filterPosts';

export async function upsertDeals(deals: Deal[]): Promise<void> {
  for (const deal of deals) {
    if (!deal.url) {
      console.warn('Skipping deal with no URL:', deal);
      continue;
    }

    const now = new Date();
    const startsAt: Date = deal.dateRange.start ?? now; // default to now
    const endsAt: Date =
      deal.dateRange.end ??
      new Date(startsAt.getTime() + 7 * 24 * 60 * 60 * 1000); // default to one week from now

    try {
      await prisma.deal.upsert({
        where: { url: deal.url },
        update: {
          caption: deal.caption,
          startsAt: startsAt,
          endsAt: endsAt,
          updatedAt: now,
        },
        create: {
          caption: deal.caption,
          url: deal.url,
          startsAt: startsAt,
          endsAt: endsAt,
          createdAt: now,
          updatedAt: now,
        },
      });
    } catch (error) {
      console.error('Failed to upsert deal:', deal, error);
    }
  }
}
