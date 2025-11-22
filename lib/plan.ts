export type Plan = "free" | "starter" | "pro";

export const PLAN_LIMITS = {
  free: {
    maxFeeds: 1,
    maxNewslettersPerDay: 1,
  },
  starter: {
    maxFeeds: 5,
    maxNewslettersPerDay: 1,
  },
  pro: {
    maxFeeds: Infinity,
    maxNewslettersPerDay: 3,
  },
} as const;
