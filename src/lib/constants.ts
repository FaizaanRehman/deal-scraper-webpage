// Keywords to search for that could imply a special/deal
export const KEYWORDS = [
  "deal", "%", "discount", "special", "offer", "promotion", "sale",
  "limited time", "exclusive", "coupon", "voucher", "save", "BOGO",
  "free", "half price", "50%", "anniversary", "grand opening"
] as const;

// Regex patterns that could match a date range
// ordered by precedence
export const DATE_PATTERNS = [
    /from (.*?) to (.*?)/i,
    /between (.*?) and (.*?)/i,
    /(\w+ \d{1,2})(?:st|nd|rd|th)? to (\w+ \d{1,2})/i,
    /until (.*?)/i,
    /till (.*?)/i,
    /through (.*?)/i,
    /on (\w+ \d{1,2})/i,
    /(\w+ \d{1,2})(?:st|nd|rd|th)?/i,
    /(\w+day)/i,
] as const;