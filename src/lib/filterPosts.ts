import { VALUE_PATTERNS } from '@/constants/valuePatterns';
import {
  DateRange,
  DateSignal,
  detectDateSignal,
  parseDateSignal,
} from '@/lib/dateSignals';
import type { InstagramPost } from './apify';

export type Deal = {
  caption: string;
  matches: string[];
  url: string;
  start: Date;
  end: Date;
  owner: string;
};

/**
 * Filters a list of Instagram posts, returning only those that signal a deal
 * and have associated date ranges if possible.
 */
export function filterPosts(posts: InstagramPost[]): Deal[] {
  return posts.reduce<Deal[]>((deals, post) => {
    if (typeof post.caption !== 'string') return deals; // skip posts without captions
    const caption: string = post.caption;

    const matchedValuePatterns: RegExp[] = VALUE_PATTERNS.filter((pattern) =>
      pattern.test(caption)
    );
    if (matchedValuePatterns.length === 0) return deals; // no value patterns matched, skip

    const dateSignal: DateSignal | null = detectDateSignal(post.caption);
    if (!dateSignal) return deals; // no date signal detected, skip

    const dateRange: DateRange | null = parseDateSignal(dateSignal);
    if (!dateRange) return deals; // failed to parse date signal, skip

    deals.push({
      caption: post.caption,
      matches: matchedValuePatterns.map((r) => r.source),
      url: post.url,
      start: dateRange.start,
      end: dateRange.end,
      owner: post.owner,
    });

    return deals;
  }, []);
}
