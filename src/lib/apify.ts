import { ApifyClient } from "apify-client";

export interface InstagramPost {
    id: string;
    caption: string;
    url: string;
    timestamp: string;
    owner: string;
}

export async function fetchInstagramPosts(): Promise<InstagramPost[]> {
    const actorId = process.env.APIFY_ACTOR_ID;
    const token = process.env.APIFY_API_TOKEN;

    if (!actorId || !token) {
        throw new Error("Missing APIFY_ACTOR_ID or APIFY_API_TOKEN environment variables.");
    }

    const client = new ApifyClient({ token });

    const actorRun = await client.actor(actorId).call({
        onlyPostsNewerThan: "2 days",
        resultsLimit: 10,
        skipPinnedPosts: false,
        username: [
            "pizzakarachi",
            "dspotcafe"
        ]
    });

    if (actorRun.status !== 'SUCCEEDED') throw new Error('Apify actor failed');

    const datasetId = actorRun?.defaultDatasetId;

    if (!datasetId) throw new Error("No dataset returned from Apify run.");

    const posts = [];

    // Use pagination to efficiently handle large datasets
    const batchSize = 1000;
    let offset = 0;
    while (true) {
        const { items, total } = await client.dataset(datasetId).listItems({ limit: batchSize, offset });
        posts.push(
            ...items.map(item => ({
                id: item.id,
                caption: item.caption,
                url: item.url,
                timestamp: item.timestamp,
                owner: item.owner
            }))
        );
        offset += batchSize;
        if (offset >= total) break;
    }

    return posts;
}