// Regex patterns for matching a date range
const MONTH =
  '(jan(uary)?|feb(ruary)?|mar(ch)?|apr(il)?|may|jun(e)?|jul(y)?|aug(ust)?|sep(tember)?|oct(ober)?|nov(ember)?|dec(ember)?)';
const WEEKDAY =
  '(mon(day)?|tue(s(day)?)?|wed(nesday)?|thu(r(s(day)?)?)?|fri(day)?|sat(urday)?|sun(day)?)';

export const DATE_TYPE = {
  MONTH_DAY: 'MONTH_DAY',
  DAY_MONTH: 'DAY_MONTH',
  MONTH_ONLY: 'MONTH_ONLY',

  TODAY: 'TODAY',
  TOMORROW: 'TOMORROW',
  THIS_WEEK: 'THIS_WEEK',
  NEXT_WEEK: 'NEXT_WEEK',
  THIS_WEEKEND: 'THIS_WEEKEND',
  NEXT_WEEKEND: 'NEXT_WEEKEND',

  FROM_TO: 'FROM_TO',
  WEEKDAY_RANGE: 'WEEKDAY_RANGE',
  NUMERIC_RANGE: 'NUMERIC_RANGE',

  WEEKDAY: 'WEEKDAY',

  ENDING: 'ENDING',
} as const;

export type DateType = (typeof DATE_TYPE)[keyof typeof DATE_TYPE];

export const DATE_PATTERNS = {
  absolute: {
    [DATE_TYPE.MONTH_DAY]: new RegExp(
      `\\b${MONTH}\\s+\\d{1,2}(st|nd|rd|th)?\\b`,
      'i'
    ),
    [DATE_TYPE.DAY_MONTH]: new RegExp(
      `\\b\\d{1,2}(st|nd|rd|th)?\\s+(of\\s+)?${MONTH}\\b`,
      'i'
    ),
    [DATE_TYPE.MONTH_ONLY]: new RegExp(`\\b${MONTH}\\b`, 'i'),
  },

  relative: {
    [DATE_TYPE.TODAY]: /\b(today|tonight)\b/i,
    [DATE_TYPE.TOMORROW]: /\btomorrow\b/i,
    [DATE_TYPE.THIS_WEEK]: /\bthis\s+week\b/i,
    [DATE_TYPE.NEXT_WEEK]: /\bnext\s+week\b/i,
    [DATE_TYPE.THIS_WEEKEND]: /\bthis\s+weekend\b/i,
    [DATE_TYPE.NEXT_WEEKEND]: /\bnext\s+weekend\b/i,
  },

  ranges: {
    [DATE_TYPE.FROM_TO]: new RegExp(
      `\\b(from|between)\\s+(.+?)\\s+(to|and)\\s+(.+?)\\b`,
      'i'
    ),
    [DATE_TYPE.WEEKDAY_RANGE]: new RegExp(
      `\\b${WEEKDAY}\\s+(to|-|through|and)\\s+${WEEKDAY}\\b`,
      'i'
    ),
    [DATE_TYPE.NUMERIC_RANGE]: /\b\d{1,2}\s*(–|-)\s*\d{1,2}\b/i,
  },

  single: {
    [DATE_TYPE.WEEKDAY]: new RegExp(`\\b${WEEKDAY}\\b`, 'i'),
  },

  modifiers: {
    [DATE_TYPE.ENDING]: /\b(until|end(s|ing)?|valid\s+(until|through))\b/i,
  },
} as const;
