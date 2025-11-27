"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

interface GetArticlesOptions {
  limit?: number;
  includeContent?: boolean;
}

export async function getTodayArticles(
  feedIds: string[],
  options: GetArticlesOptions = {}
) {
  const { limit = 50, includeContent = false } = options;

  const now = new Date();
  const startOfDay = new Date(now);
  startOfDay.setUTCHours(0, 0, 0, 0);

  const endOfDay = new Date(now);
  endOfDay.setUTCHours(23, 59, 59, 999);

  return prisma.rssArticle.findMany({
    where: {
      feedId: { in: feedIds },
      pubDate: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
    select: {
      id: true,
      title: true,
      link: true,
      summary: true,
      content: includeContent,
      pubDate: true,
      author: true,
      categories: true,
      imageUrl: true,
      feed: {
        select: {
          title: true,
          category: true,
        },
      },
    },
    orderBy: { pubDate: "desc" },
    take: limit,
  });
}

export async function getTodayArticlesForUser(options: GetArticlesOptions = {}) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Not authenticated");
  }

  const user = await prisma.user.findUnique({
    where: { clerkUserId: userId },
    select: {
      rssFeeds: {
        where: { isActive: true },
        select: { id: true },
      },
    },
  });

  if (!user || user.rssFeeds.length === 0) {
    return [];
  }

  const feedIds = user.rssFeeds.map((f) => f.id);
  return getTodayArticles(feedIds, options);
}

export async function getArticlesByDateRange(
  feedIds: string[],
  startDate: Date,
  endDate: Date,
  options: GetArticlesOptions = {}
) {
  const { limit = 100, includeContent = false } = options;

  return prisma.rssArticle.findMany({
    where: {
      feedId: { in: feedIds },
      pubDate: {
        gte: startDate,
        lte: endDate,
      },
    },
    select: {
      id: true,
      title: true,
      link: true,
      summary: true,
      content: includeContent,
      pubDate: true,
      author: true,
      categories: true,
      imageUrl: true,
      feed: {
        select: {
          title: true,
          category: true,
        },
      },
    },
    orderBy: { pubDate: "desc" },
    take: limit,
  });
}

export async function getTodayArticleCount(feedIds: string[]) {
  const now = new Date();
  const startOfDay = new Date(now);
  startOfDay.setUTCHours(0, 0, 0, 0);

  const endOfDay = new Date(now);
  endOfDay.setUTCHours(23, 59, 59, 999);

  return prisma.rssArticle.count({
    where: {
      feedId: { in: feedIds },
      pubDate: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
  });
}