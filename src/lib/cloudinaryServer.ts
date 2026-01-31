import { v2 as cloudinary } from 'cloudinary';
import { Deal } from './filterPosts';
import crypto from 'crypto';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function uploadDealPreviewImage(
  deal: Deal
): Promise<string | null> {
  try {
    // fetch image from instagram
    const result = await fetch(deal.imageUrl!);
    if (!result.ok) {
      console.warn('Failed to fetch preview image for deal:', deal.imageUrl);
      return null;
    }

    const buffer = Buffer.from(await result.arrayBuffer());
    const contentType = result.headers.get('Content-Type') || 'image/jpeg';
    // hash filename based on deal URL to avoid duplicates
    const fileName = crypto
      .createHash('sha256')
      .update(deal.url)
      .digest('hex')
      .slice(0, 32);

    // upload to cloudinary
    const uploadResult = await cloudinary.uploader.upload(
      `data:${contentType};base64,${buffer.toString('base64')}`,
      {
        folder: 'DealScraperImagePreviews',
        public_id: fileName,
        overwrite: true,
        resource_type: 'image',
      }
    );

    return uploadResult.secure_url;
  } catch (error) {
    console.error('Image upload failed for deal preview:', error);
    return null;
  }
}
