import { Deal } from './filterPosts';
import { createClient } from '@supabase/supabase-js'
import crypto from 'crypto';

const supabaseServer = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!
)

const BUCKET_NAME = 'DealScraperImagePreviews';

export async function uploadDealPreviewImage(deal: Deal): Promise<string | null> {
  try {
    const result = await fetch(deal.imageUrl!);
    if (!result.ok) {
      console.warn('Failed to fetch preview image for deal:', deal.imageUrl);
      return null;
    }

    const contentType = result.headers.get('Content-Type') || 'image/jpeg';
    const hashURL = crypto.createHash('sha256').update(deal.url).digest('hex').slice(0, 32);
    const fileName = `${hashURL}.jpg`;
    const buffer = await result.arrayBuffer();

    const { error } = await supabaseServer.storage
      .from(BUCKET_NAME)
      .upload(fileName, buffer, {
        contentType,
        upsert: true,
      });

    if (error) {
      console.error('Supabase storage upload error:', error)
      return null;
    } 

    return `${process.env.SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/${fileName}`;
  } catch (error) {
    console.error('Image upload failed for deal preview:', error);
    return null;
  }
}