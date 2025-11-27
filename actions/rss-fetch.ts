"use server";

import { wrapDatabaseOperation } from "@/lib/database/error-handler";
import { prisma } from "@/lib/prisma";
import {
  type ArticleData,
  fetchAndParseFeed,
  validateFeedUrl,
} from "@/lib/rss/parser";
import { bulkCreateRssArticles } from "./rss-article";
import { updateFeedLastFetched } from "./rss-feed";

function detectFeedCategory(url: string, metadata: any): string {
  const u = url.toLowerCase();
  const t = (metadata.title || "").toLowerCase();

  if (u.includes("spor") || t.includes("spor")) return "Sports";
  if (u.includes("sport")) return "Sports";
  if (u.includes("science") || u.includes("bilim")) return "Science";
  if (u.includes("tech") || u.includes("technology")) return "Technology";
  if (u.includes("economy") || u.includes("finance") || t.includes("ekonomi"))
    return "Economy";

  return "General";
}

export async function validateAndAddFeed(userId: string, url: string) {
  return wrapDatabaseOperation(async () => {
    const isValid = await validateFeedUrl(url);
    if (!isValid) {
      throw new Error("Invalid RSS feed URL or unable to fetch feed");
    }

    const feed = await prisma.rssFeed.create({
      data: {
        userId,
        url,
        category: detectFeedCategory(url, {}),
      },
    });

    try {
      const result = await fetchAndStoreFeed(feed.id);

      await prisma.rssFeed.update({
        where: { id: feed.id },
        data: {
          title: result.metadata.title,
          description: result.metadata.description,
          link: result.metadata.link,
          imageUrl: result.metadata.imageUrl,
          language: result.metadata.language,
          category: detectFeedCategory(url, result.metadata),
        },
      });

      return {
        feed,
        articlesCreated: result.created,
        articlesSkipped: result.skipped,
      };
    } catch (err) {
      console.error("Failed to fetch initial articles:", err);
      return {
        feed,
        articlesCreated: 0,
        articlesSkipped: 0,
        error: "Feed created but initial fetch failed",
      };
    }
  }, "add RSS feed");
}

export async function fetchAndStoreFeed(feedId: string) {
  return wrapDatabaseOperation(async () => {
    const feed = await prisma.rssFeed.findUnique({
      where: { id: feedId },
    });

    if (!feed) throw new Error(`Feed with ID ${feedId} not found`);

    const { metadata, articles } = await fetchAndParseFeed(feed.url, feedId);

    const articlesToCreate = articles.map((article: ArticleData) => ({
      feedId: feed.id,
      guid: article.guid,
      title: article.title,
      link: article.link,
      content: article.content,
      summary: article.summary,
      pubDate: article.pubDate,
      author: article.author,
      categories: article.categories,
      imageUrl: article.imageUrl,
    }));

    const result = await bulkCreateRssArticles(articlesToCreate);

    await updateFeedLastFetched(feedId);

    return {
      metadata,
      created: result.created,
      skipped: result.skipped,
      errors: result.errors,
    };
  }, "fetch feed");
}
