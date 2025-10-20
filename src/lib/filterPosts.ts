import { DATE_PATTERNS, KEYWORDS } from "./constants";
import type { InstagramPost } from "./apify";
import * as chrono from 'chrono-node'

export type DateRange = { start?: Date; end?: Date };

export type Deal = {
    caption: string;
    matches: string[];
    url: string;
    dateRange: DateRange;
    owner: string;
}

/**
 * Filters a list of Instagram posts, returning only those that contain
 * deal-related keywords and have associated date ranges if possible.
 */
export function filterPosts(posts: InstagramPost[]): Deal[] {
    // lowercase keywords for case-insensitive matching
    const lowerKeywords = KEYWORDS.map(keyword => keyword.toLowerCase());

    return posts.reduce<Deal[]>((deals, post) => {
        if (typeof post.caption !== "string") return deals; // skip posts without captions

        const lowercaseCaption : string = post.caption.toLowerCase();
        const matches : string[] = lowerKeywords.filter(keyword => lowercaseCaption.includes(keyword));

        if (matches.length === 0) return deals; // no keywords matched, skip

        const dateRange : DateRange = extractDates(post.caption);
        deals.push({
            caption: post.caption,
            matches,
            url: post.url,
            dateRange,
            owner: post.owner
        });

        return deals;
        
    }, []).sort((a, b) => b.matches.length - a.matches.length);
}

function extractDates(text: string): DateRange {
    for (const pattern of DATE_PATTERNS) {
        const match = text.match(pattern);
        if (!match) continue;

        const groups = match.slice(1); // first group is full match
        const parsedDates = groups
            .map(group => chrono.parseDate(group.trim()))
            .filter((date): date is Date => date !== null); // filter out failed parses
            
        if (parsedDates.length === 0) {
            return { start: undefined, end: undefined };
        } else {
            return { start: parsedDates[0], end: parsedDates.at(-1) ?? parsedDates[0] };
        }
    }

    return { start: undefined, end: undefined };
}
