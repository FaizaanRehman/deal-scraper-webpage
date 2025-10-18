import { PrismaClient } from '@prisma/client';
import type { Deal } from './filterPosts';

const prisma = new PrismaClient();

export async function upsertDeals(deals: Deal[]): Promise<void> {
    for (const deal of deals) {
        if (!deal.url) {
            console.warn('Skipping deal with no URL:', deal);
            continue;
        }

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
            }
        });
    } 
}