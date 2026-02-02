import prisma from './prisma';
import type { Deal } from './filterPosts';
import { uploadDealPreviewImage } from './cloudinaryServer';
import { generateDealTitle } from './huggingFaceServer';

export async function upsertDeals(deals: Deal[]): Promise<void> {
  const now = new Date();

  await Promise.all(
    deals.map(async (deal) => {
      if (!deal.url) {
        console.warn('Skipping deal with no URL:', deal);
        return;
      }

      const uploadedImageUrl = await uploadDealPreviewImage(deal);
      if (uploadedImageUrl) deal.imageUrl = uploadedImageUrl;

      const title = await generateDealTitle(deal.caption);

      try {
        await prisma.deal.upsert({
          where: { url: deal.url },
          update: {
            caption: deal.caption,
            owner: deal.owner,
            imageUrl: deal.imageUrl,
            mediaType: deal.mediaType,
            title,
            startsAt: deal.start,
            endsAt: deal.end,
            updatedAt: now,
          },
          create: {
            caption: deal.caption,
            owner: deal.owner,
            url: deal.url,
            imageUrl: deal.imageUrl,
            mediaType: deal.mediaType,
            title,
            startsAt: deal.start,
            endsAt: deal.end,
            createdAt: now,
            updatedAt: now,
          },
        });
      } catch (error) {
        console.error('Failed to upsert deal:', deal, error);
      }
    })
  );
}
