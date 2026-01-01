// High-level, fuzzy signals (cheap, noisy)
export const DEAL_KEYWORDS = [
  'deal',
  '%',
  'discount',
  'special',
  'offer',
  'promotion',
  'sale',
  'limited time',
  'exclusive',
  'coupon',
  'voucher',
  'save',
  'bogo',
  'free',
  'half price',
  '50%',
  'anniversary',
  'grand opening',
] as const;

// Regex patterns that are more strict in detecting deals
export const VALUE_PATTERNS = [
  /\$\s?\d+(\.\d{2})?/i, // $5, $12.99
  /\b\d+\s?%\s?(off)?\b/i, // 50% off
  /\bfree\b/i,
  /\bbogo\b/i,
  /\b\d+\s+for\s+\$\s?\d+(\.\d{2})?/i, // 2 for $10
] as const;
