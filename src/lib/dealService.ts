import { fetchInstagramPosts } from "@/lib/apify";
import { upsertDeals } from "@/lib/dealRepository";
import { filterPosts } from "@/lib/filterPosts";

/**
 * Fetches Instagram posts, filters them for deals, and upserts them into the database
 */

export async function refreshDeals(): Promise<void> {
    try {
        const posts = await fetchInstagramPosts();
        const deals = filterPosts(posts);
        await upsertDeals(deals);
    } catch (error) {
        console.error("Error in refreshDeals:", error);
        throw error;
    }
}