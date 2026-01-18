import {
  DATE_PATTERN_MODIFIERS,
  DATE_PATTERNS,
  DATE_TYPE,
  DATE_MODIFIER_TYPE,
} from '@/constants/datePatterns';
import * as chrono from 'chrono-node';

export type DateSignal = {
  group: string;
  type: string;
  match: RegExpMatchArray;
  modifierType?: string;
};

export type DateRange = {
  start: Date;
  end: Date;
};

export function detectDateSignal(text: string): DateSignal | null {
  for (const [group, patterns] of Object.entries(DATE_PATTERNS)) {
    for (const [type, regex] of Object.entries(patterns)) {
      const match = text.match(regex);
      if (match) {
        for (const [modifierType, modifierRegex] of Object.entries(
          DATE_PATTERN_MODIFIERS
        )) {
          const modifier = text.match(modifierRegex);
          if (modifier) {
            return { group, type, match, modifierType };
          }
        }
        return { group, type, match };
      }
    }
  }
  return null;
}

export function parseDateSignal(signal: DateSignal): DateRange | null {
  const text = signal.match[0];
  const now = new Date();

  // If ending modifier is present, assume deal has started already
  const isDealCurrentlyActive =
    signal.modifierType === DATE_MODIFIER_TYPE.ENDING;

  switch (signal.type) {
    // Absolute date
    case DATE_TYPE.MONTH_DAY:
    case DATE_TYPE.DAY_MONTH: {
      const date = chrono.parseDate(text);
      if (!date) return null;

      return {
        start: startOfDay(isDealCurrentlyActive ? now : date),
        end: endOfDay(date),
      };
    }
    case DATE_TYPE.MONTH_ONLY: {
      const date = chrono.parseDate(text);
      if (!date) return null;

      const start: Date = new Date(date.getFullYear(), date.getMonth(), 1);
      const end: Date = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      return {
        start: startOfDay(start),
        end: endOfDay(end),
      };
    }

    // Relative dates
    case DATE_TYPE.TODAY: {
      return {
        start: startOfDay(now),
        end: endOfDay(now),
      };
    }
    case DATE_TYPE.TOMORROW: {
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);

      return {
        start: startOfDay(isDealCurrentlyActive ? now : tomorrow),
        end: endOfDay(tomorrow),
      };
    }
    case DATE_TYPE.THIS_WEEK: {
      const start = new Date(now);
      start.setDate(now.getDate() - now.getDay());
      const end = new Date(start);
      end.setDate(start.getDate() + 6);

      return {
        start: startOfDay(isDealCurrentlyActive ? now : start),
        end: endOfDay(end),
      };
    }
    case DATE_TYPE.NEXT_WEEK: {
      const start = new Date(now);
      start.setDate(now.getDate() - now.getDay() + 7);
      const end = new Date(start);
      end.setDate(start.getDate() + 6);

      return {
        start: startOfDay(isDealCurrentlyActive ? now : start),
        end: endOfDay(end),
      };
    }
    case DATE_TYPE.THIS_WEEKEND: {
      const saturday = new Date(now);
      saturday.setDate(now.getDate() + ((6 - now.getDay() + 7) % 7));
      const sunday = new Date(saturday);
      sunday.setDate(saturday.getDate() + 1);

      return {
        start: startOfDay(isDealCurrentlyActive ? now : saturday),
        end: endOfDay(sunday),
      };
    }
    case DATE_TYPE.NEXT_WEEKEND: {
      const saturday = new Date(now);
      saturday.setDate(now.getDate() + ((6 - now.getDay() + 7) % 7) + 7);
      const sunday = new Date(saturday);
      sunday.setDate(saturday.getDate() + 1);

      return {
        start: startOfDay(isDealCurrentlyActive ? now : saturday),
        end: endOfDay(sunday),
      };
    }

    // Ranges
    case DATE_TYPE.FROM_TO: {
      const startText = signal.match[2];
      const endText = signal.match[4];

      const start = chrono.parseDate(startText);
      const end = chrono.parseDate(endText);

      if (!start || !end) return null;

      return {
        start: startOfDay(start),
        end: endOfDay(end),
      };
    }

    // TODO: Implement parsing for these types, for now just return the next day
    case DATE_TYPE.NUMERIC_RANGE:
    case DATE_TYPE.WEEKDAY_RANGE:
    case DATE_TYPE.WEEKDAY:
      return {
        start: startOfDay(now),
        end: endOfDay(new Date(now.getTime() + 24 * 60 * 60 * 1000)),
      };

    default:
      return null;
  }
}

const startOfDay = (d: Date) => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
};

const endOfDay = (d: Date) => {
  const x = new Date(d);
  x.setHours(23, 59, 59, 999);
  return x;
};
