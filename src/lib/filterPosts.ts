import { DATE_PATTERNS, KEYWORDS } from "./constants";
import * as chrono from 'chrono-node'

type DateRange = { start: Date | null; end: Date | null };

interface Post {
    id: string;
    caption: string;
    url: string;
    timestamp: string;
    owner: string;
}

interface Deal {
    caption: string;
    matches: string[];
    url: string;
    dateRange: DateRange | null;
    owner: string;
}

export function filterPosts(posts: Post[]): Array<Deal> {
    const deals: Array<Deal> = [];
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

function extractDates(text: string): DateRange | null {
    for (const pattern of DATE_PATTERNS) {
        const match = text.match(pattern);
        if (!match) continue;

        const groups = match.slice(1); // first group is full match
        const parsedDates = groups
            .map(group => chrono.parseDate(group.trim()))
            .filter((date): date is Date => date !== null); // filter failed parses
            
        if (parsedDates.length === 0) {
            return { start: null, end: null };
        } else {
            return { start: parsedDates[0], end: parsedDates.at(-1) ?? parsedDates[0] };
        }
    }

    return null;
}
