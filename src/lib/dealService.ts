import { fetchInstagramPosts } from "@/lib/apify";
import { upsertDeals } from "@/lib/dealRepository";
import { filterPosts } from "@/lib/filterPosts";

export async function refreshDeals() {
    const posts = await fetchInstagramPosts();
    const deals = filterPosts(posts);
    await upsertDeals(deals);
}