const MS_PER_DAY = 1000 * 60 * 60 * 24;

const WEEKDAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

function startOfDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function startOfWeek(d: Date): Date {
  const x = startOfDay(d);
  const diff = (x.getDay() + 6) % 7; // number of days since monday
  x.setDate(x.getDate() - diff); // Monday-based week
  return x;
}

function daysBetween(a: Date, b: Date): number {
  const delta = startOfDay(b).getTime() - startOfDay(a).getTime();
  return Math.round(delta / MS_PER_DAY);
}

export function formatRelativeDate(
  date: Date,
  prefix: 'Starts' | 'Ends'
): string {
  const now = new Date();
  const today = startOfDay(now);
  const target = startOfDay(date);
  const days = daysBetween(today, target);

  // Past
  if (days < 0) {
    return prefix === 'Ends' ? 'Ended' : 'Started';
  }

  // Today / tomorrow
  if (days === 0) return `${prefix} today`;
  if (days === 1) return `${prefix} tomorrow`;

  const thisWeekStart = startOfWeek(today);
  const nextWeekStart = new Date(thisWeekStart);
  nextWeekStart.setDate(thisWeekStart.getDate() + 7);

  // This week
  if (target >= thisWeekStart && target < nextWeekStart) {
    return `${prefix} this ${WEEKDAYS[target.getDay()]}`;
  }

  // Next week
  const weekAfterNext = new Date(nextWeekStart);
  weekAfterNext.setDate(nextWeekStart.getDate() + 7);

  if (target >= nextWeekStart && target < weekAfterNext) {
    return `${prefix} next ${WEEKDAYS[target.getDay()]}`;
  }

  // Weeks away
  if (days < 30) {
    return `${prefix} in ${Math.ceil(days / 7)} weeks`;
  }

  // Fallback
  return `${prefix} on ${target.toLocaleDateString()}`;
}

export function isDateSoon(date: Date): boolean {
  return (
    daysBetween(new Date(), date) >= 0 && daysBetween(new Date(), date) < 1
  );
}
