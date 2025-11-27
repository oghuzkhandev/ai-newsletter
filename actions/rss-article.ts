"use server";

import {
  isPrismaError,
  wrapDatabaseOperation,
} from "@/lib/database/error-handler";
import {
  ARTICLE_ORDER_BY_DATE_DESC,
  ARTICLE_WITH_FEED_INCLUDE,
} from "@/lib/database/prisma-helpers";
import { prisma } from "@/lib/prisma";
import type { ArticleCreateData, BulkOperationResult } from "@/lib/rss/types";

export async function createRssArticle(data: ArticleCreateData) {
  return wrapDatabaseOperation(async () => {
    const existing = await prisma.rssArticle.findUnique({
      where: { guid: data.guid },
      select: { id: true, sourceFeedIds: true },
    });

    if (existing) {
      if (!existing.sourceFeedIds.includes(data.feedId)) {
        return await prisma.rssArticle.update({
          where: { guid: data.guid },
          data: {
            sourceFeedIds: {
              push: data.feedId,
            },
          },
        });
      }
      return await prisma.rssArticle.findUnique({
        where: { guid: data.guid },
      });
    }

    return await prisma.rssArticle.create({
      data: {
        feedId: data.feedId,
        guid: data.guid,
        sourceFeedIds: [data.feedId],
        title: data.title,
        link: data.link,
        content: data.content,
        summary: data.summary,
        pubDate: data.pubDate,
        author: data.author,
        categories: data.categories || [],
        imageUrl: data.imageUrl,
      },
    });
  }, "create RSS article");
}

export async function bulkCreateRssArticles(
  articles: ArticleCreateData[]
): Promise<BulkOperationResult> {
  const results: BulkOperationResult = {
    created: 0,
    skipped: 0,
    errors: 0,
  };

  for (const article of articles) {
    try {
      await createRssArticle(article);
      results.created++;
    } catch (error) {
      if (isPrismaError(error) && error.code === "P2002") {
        results.skipped++;
      } else {
        results.errors++;
        console.error(`Failed to create article ${article.guid}:`, error);
      }
    }
  }

  return results;
}

/**
 * Get articles by feed IDs and date range
 *
 * @param feedIds - Array of feed IDs to search
 * @param startDate - Start of date range
 * @param endDate - End of date range
 * @param options - Optional configuration
 *   - totalLimit: Maximum total articles to return (default: 100)
 *   - perFeedLimit: If set, limits articles per feed (legacy behavior)
 */
export async function getArticlesByFeedsAndDateRange(
  feedIds: string[],
  startDate: Date,
  endDate: Date,
  options?:
    | {
        totalLimit?: number;
        perFeedLimit?: number;
      }
    | number // Legacy support: number = perFeedLimit
) {
  // Handle legacy call signature: getArticlesByFeedsAndDateRange(ids, start, end, 5)
  let config: { totalLimit?: number; perFeedLimit?: number } = {};

  if (typeof options === "number") {
    // Legacy: 4th argument was perFeedLimit number
    config = { perFeedLimit: options };
  } else if (options) {
    config = options;
  }

  const { totalLimit = 100, perFeedLimit } = config;

  // Dates come from frontend as proper UTC format
  // "2025-11-23T00:00:00.000Z" and "2025-11-25T23:59:59.999Z"
  const start = new Date(startDate);
  const end = new Date(endDate);

  console.log(`[getArticlesByFeedsAndDateRange] Query params:`);
  console.log(`  Feed IDs: ${feedIds.join(", ")}`);
  console.log(`  Date range: ${start.toISOString()} to ${end.toISOString()}`);
  console.log(
    `  Total limit: ${totalLimit}, Per-feed limit: ${perFeedLimit || "none"}`
  );

  // Query all articles matching criteria
  const allArticles = await prisma.rssArticle.findMany({
    where: {
      OR: [
        { feedId: { in: feedIds } },
        { sourceFeedIds: { hasSome: feedIds } },
      ],
      pubDate: {
        gte: start,
        lte: end,
      },
    },
    include: ARTICLE_WITH_FEED_INCLUDE,
    orderBy: ARTICLE_ORDER_BY_DATE_DESC,
  });

  console.log(`  Raw query returned: ${allArticles.length} articles`);

  // Debug: Log date distribution
  if (allArticles.length > 0) {
    const dates = allArticles.map(
      (a) => a.pubDate?.toISOString().split("T")[0]
    );
    const dateCounts: Record<string, number> = {};
    for (const d of dates) {
      if (d) dateCounts[d] = (dateCounts[d] || 0) + 1;
    }
    console.log(`  Date distribution:`, dateCounts);
  } else {
    // No articles found - debug what's in DB
    console.log(`  No articles found! Checking DB for these feeds...`);
    const dbCheck = await prisma.rssArticle.findMany({
      where: { feedId: { in: feedIds } },
      select: { pubDate: true, feedId: true },
      take: 5,
    });
    console.log(
      `  Sample articles in DB:`,
      dbCheck.map((a) => ({
        feedId: a.feedId,
        pubDate: a.pubDate?.toISOString(),
      }))
    );
  }

  // Remove duplicates
  const uniqueArticles = removeDuplicateArticles(allArticles);
  console.log(`  After dedup: ${uniqueArticles.length} articles`);

  // Apply limits
  let finalArticles: typeof uniqueArticles;

  if (perFeedLimit) {
    // Legacy behavior: limit per feed
    finalArticles = limitPerFeed(uniqueArticles, feedIds, perFeedLimit);
  } else {
    // New behavior: balance across feeds up to totalLimit
    finalArticles = balanceAcrossFeeds(uniqueArticles, feedIds, totalLimit);
  }

  console.log(`  Final result: ${finalArticles.length} articles`);

  // Log per-feed breakdown
  const breakdown: Record<string, number> = {};
  for (const a of finalArticles) {
    breakdown[a.feedId] = (breakdown[a.feedId] || 0) + 1;
  }
  console.log(`  Per-feed breakdown:`, breakdown);

  return finalArticles.map((article) => ({
    ...article,
    sourceCount: article.sourceFeedIds?.length || 1,
  }));
}

function removeDuplicateArticles<T extends { guid: string }>(
  articles: T[]
): T[] {
  const seen = new Set<string>();
  return articles.filter((article) => {
    if (seen.has(article.guid)) return false;
    seen.add(article.guid);
    return true;
  });
}

function limitPerFeed<T extends { feedId: string }>(
  articles: T[],
  feedIds: string[],
  limit: number
): T[] {
  const result: T[] = [];
  const countPerFeed: Record<string, number> = {};

  for (const article of articles) {
    const feedId = article.feedId;
    const current = countPerFeed[feedId] || 0;

    if (current < limit) {
      result.push(article);
      countPerFeed[feedId] = current + 1;
    }
  }

  return result;
}

/**
 * Balance articles across feeds with GUARANTEED minimum per feed
 *
 * Example with 2 feeds and totalLimit=10:
 * - Each feed gets 5 articles (10/2)
 * - If Feed A has 100 articles, Feed B has 3 articles:
 *   - Feed A: 5 articles
 *   - Feed B: 3 articles (all it has)
 *   - Remaining 2 slots filled from Feed A
 *
 * This ensures every feed is represented fairly in the newsletter!
 */
function balanceAcrossFeeds<T extends { feedId: string; pubDate: Date | null }>(
  articles: T[],
  feedIds: string[],
  totalLimit: number
): T[] {
  // Group articles by feed
  const byFeed: Record<string, T[]> = {};
  for (const feedId of feedIds) {
    byFeed[feedId] = [];
  }
  for (const article of articles) {
    if (byFeed[article.feedId]) {
      byFeed[article.feedId].push(article);
    }
  }

  // Count feeds that have articles
  const activeFeedIds = feedIds.filter((id) => (byFeed[id]?.length || 0) > 0);
  const activeFeedCount = activeFeedIds.length;

  console.log(
    `[balanceAcrossFeeds] Active feeds: ${activeFeedCount}, Total limit: ${totalLimit}`
  );

  if (activeFeedCount === 0) return [];

  // Calculate fair share per feed
  // 2 feeds, 100 limit → 50 each
  // 3 feeds, 100 limit → 33 each
  const perFeedLimit = Math.floor(totalLimit / activeFeedCount);

  console.log(`[balanceAcrossFeeds] Per-feed limit: ${perFeedLimit}`);

  const result: T[] = [];
  const takenPerFeed: Record<string, number> = {};

  // FIRST PASS: Take up to perFeedLimit from EACH feed
  for (const feedId of activeFeedIds) {
    const feedArticles = byFeed[feedId] || [];
    const toTake = Math.min(perFeedLimit, feedArticles.length);

    console.log(
      `[balanceAcrossFeeds] Feed ${feedId}: has ${feedArticles.length}, taking ${toTake}`
    );

    for (let i = 0; i < toTake; i++) {
      result.push(feedArticles[i]);
    }
    takenPerFeed[feedId] = toTake;
  }

  // SECOND PASS: Fill remaining slots from feeds that have more
  let remaining = totalLimit - result.length;

  if (remaining > 0) {
    console.log(`[balanceAcrossFeeds] Filling ${remaining} remaining slots`);

    for (const feedId of activeFeedIds) {
      const feedArticles = byFeed[feedId] || [];
      const alreadyTaken = takenPerFeed[feedId] || 0;

      for (
        let i = alreadyTaken;
        i < feedArticles.length && remaining > 0;
        i++
      ) {
        result.push(feedArticles[i]);
        remaining--;
      }

      if (remaining <= 0) break;
    }
  }

  // Sort by date descending (newest first)
  result.sort((a, b) => {
    const dateA = a.pubDate ? new Date(a.pubDate).getTime() : 0;
    const dateB = b.pubDate ? new Date(b.pubDate).getTime() : 0;
    return dateB - dateA;
  });

  // Log final distribution
  const finalDistribution: Record<string, number> = {};
  for (const article of result) {
    finalDistribution[article.feedId] =
      (finalDistribution[article.feedId] || 0) + 1;
  }
  console.log(`[balanceAcrossFeeds] Final distribution:`, finalDistribution);

  return result;
}
