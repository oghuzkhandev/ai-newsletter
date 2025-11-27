export type Plan = "free" | "starter" | "pro";

export const PLAN_LIMITS = {
  free: {
    maxFeeds: 0,
    maxNewslettersPerDay: 0,
  },
  starter: {
    maxFeeds: 1,
    maxNewslettersPerDay: 1,
  },
  pro: {
    maxFeeds: 3,
    maxNewslettersPerDay: 3,
  },
} as const;
