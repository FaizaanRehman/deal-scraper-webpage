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

export function filterPosts(posts: InstagramPost[]): Deal[] {
    const deals: Deal[] = [];
    for (const { caption, url, owner } of posts) {
        if (typeof caption !== "string") continue;

        const matches = KEYWORDS.filter(
            keyword => caption.toLowerCase().includes(keyword.toLowerCase())
        );

        if (matches.length > 0) {
            const dateRange = extractDates(caption);
            deals.push({ caption, matches, url, dateRange, owner });
        }
    }

    deals.sort((a, b) => b.matches.length - a.matches.length);

    return deals;
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
