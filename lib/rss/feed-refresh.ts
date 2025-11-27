import { getArticlesByFeedsAndDateRange } from "@/actions/rss-article";
import { fetchAndStoreFeed } from "@/actions/rss-fetch";
import { prisma } from "@/lib/prisma";
import type { PrepareFeedsParams } from "./types";

export const CACHE_WINDOW = 3 * 60 * 60 * 1000; // 3 saat
export const ARTICLE_LIMIT = 100;

export async function getFeedsToRefresh(feedIds: string[]): Promise<string[]> {
  const now = new Date();
  const cacheThreshold = new Date(now.getTime() - CACHE_WINDOW);

  const feeds = await prisma.rssFeed.findMany({
    where: { id: { in: feedIds } },
    select: { id: true, url: true },
  });

  const urlsToCheck = [...new Set(feeds.map((f) => f.url))];

  const recentFetches = await prisma.rssFeed.groupBy({
    by: ["url"],
    where: {
      url: { in: urlsToCheck },
      lastFetched: { gte: cacheThreshold },
    },
    _max: { lastFetched: true },
  });

  const recentlyFetchedUrls = new Set(
    recentFetches.filter((f) => f._max.lastFetched !== null).map((f) => f.url)
  );

  return feeds
    .filter((feed) => !recentlyFetchedUrls.has(feed.url))
    .map((feed) => feed.id);
}

export async function prepareFeedsAndArticles(params: PrepareFeedsParams) {
  console.log("[prepareFeedsAndArticles] Starting with params:", {
    feedIds: params.feedIds,
    startDate: params.startDate,
    endDate: params.endDate,
  });

  // 1. Refresh stale feeds
  const feedsToRefresh = await getFeedsToRefresh(params.feedIds);
  console.log(
    `[prepareFeedsAndArticles] Feeds to refresh: ${feedsToRefresh.length}`
  );

  if (feedsToRefresh.length > 0) {
    const refreshResults = await Promise.allSettled(
      feedsToRefresh.map((feedId) => fetchAndStoreFeed(feedId))
    );

    for (const [index, result] of refreshResults.entries()) {
      if (result.status === "fulfilled") {
        console.log(
          `  Feed ${feedsToRefresh[index]}: ${result.value.created} new articles`
        );
      } else {
        console.error(
          `  Feed ${feedsToRefresh[index]}: FAILED -`,
          result.reason
        );
      }
    }
  }

  // 2. Parse dates - frontend now sends correct UTC format
  // startDate: "2025-11-23T00:00:00.000Z" (start of day UTC)
  // endDate: "2025-11-25T23:59:59.999Z" (end of day UTC)
  const startDate = new Date(params.startDate);
  const endDate = new Date(params.endDate);

  console.log(
    `[prepareFeedsAndArticles] Date range: ${startDate.toISOString()} - ${endDate.toISOString()}`
  );

  // 3. Get articles from ALL feeds in a single query (balanced)
  const articles = await getArticlesByFeedsAndDateRange(
    params.feedIds,
    startDate,
    endDate,
    {
      totalLimit: ARTICLE_LIMIT,
      // perFeedLimit kaldırıldı - her feed'den dengeli şekilde alınacak
    }
  );

  console.log(
    `[prepareFeedsAndArticles] Found ${articles.length} articles total`
  );

  // Log per-feed distribution
  const feedCounts: Record<string, number> = {};
  for (const article of articles) {
    const feedId = article.feedId;
    feedCounts[feedId] = (feedCounts[feedId] || 0) + 1;
  }
  console.log("[prepareFeedsAndArticles] Per-feed distribution:", feedCounts);

  if (articles.length === 0) {
    // Debug: Check what's actually in the database
    console.log("[prepareFeedsAndArticles] No articles found! Debugging...");

    const debugArticles = await prisma.rssArticle.findMany({
      where: {
        feedId: { in: params.feedIds },
      },
      select: {
        id: true,
        feedId: true,
        title: true,
        pubDate: true,
      },
      orderBy: { pubDate: "desc" },
      take: 10,
    });

    console.log("[prepareFeedsAndArticles] Sample articles in DB:");
    for (const a of debugArticles) {
      console.log(`  - ${a.pubDate?.toISOString()} | ${a.title?.slice(0, 40)}`);
    }

    // Find actual date range of articles in DB
    const dateRange = await prisma.rssArticle.aggregate({
      where: { feedId: { in: params.feedIds } },
      _min: { pubDate: true },
      _max: { pubDate: true },
    });

    console.log("[prepareFeedsAndArticles] Articles date range in DB:", {
      earliest: dateRange._min.pubDate?.toISOString(),
      latest: dateRange._max.pubDate?.toISOString(),
    });

    throw new Error(
      `No articles found for the selected feeds and date range. ` +
        `Searched from ${startDate.toDateString()} to ${endDate.toDateString()}. ` +
        `Articles in DB range from ${
          dateRange._min.pubDate?.toDateString() || "N/A"
        } to ${dateRange._max.pubDate?.toDateString() || "N/A"}. ` +
        `Try selecting a date range within this period.`
    );
  }

  return articles.map((a) => ({
    ...a,
    pubDate: a.pubDate ?? new Date(),
  }));
}
