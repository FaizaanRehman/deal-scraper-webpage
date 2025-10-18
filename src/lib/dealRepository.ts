import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type Deal = {
    id: string;
    url: string;
    caption: string;
    startsAt: Date | null;
    endsAt: Date | null;
}

export async function upsertDeals(deals: Deal[]) {
    for (const deal of deals) {
        if (!deal.url) {
            console.warn('Skipping deal with no URL:', deal);
            continue;
        }

        await prisma.deal.upsert({
            where: { url: deal.url },
            update: {
                caption: deal.caption,
                startsAt: deal.startsAt ?? undefined,
                endsAt: deal.endsAt ?? undefined,
                updatedAt: new Date(),
            },
            create: {
                caption: deal.caption,
                url: deal.url,
                startsAt: deal.startsAt ?? undefined,
                endsAt: deal.endsAt ?? undefined,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        });
    } 
}