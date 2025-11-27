"use server";

import { wrapDatabaseOperation } from "@/lib/database/error-handler";
import { prisma } from "@/lib/prisma";

// ============================================
// NEWSLETTER ACTIONS
// ============================================

/**
 * Creates and saves a generated newsletter to the database
 *
 * This function is called after AI generation completes (Pro users only).
 * It stores all newsletter components for future reference.
 *
 * @param data - Complete newsletter data and metadata
 * @returns Created newsletter record
 */
export async function createNewsletter(data: {
  userId: string;
  suggestedTitles: string[];
  suggestedSubjectLines: string[];
  body: string;
  topAnnouncements: string[];
  additionalInfo?: string;
  startDate: Date;
  endDate: Date;
  userInput?: string;
  feedsUsed: string[];
}) {
  return wrapDatabaseOperation(async () => {
    return await prisma.newsletter.create({
      data: {
        userId: data.userId,
        suggestedTitles: data.suggestedTitles,
        suggestedSubjectLines: data.suggestedSubjectLines,
        body: data.body,
        topAnnouncements: data.topAnnouncements,
        additionalInfo: data.additionalInfo,
        startDate: data.startDate,
        endDate: data.endDate,
        userInput: data.userInput,
        feedsUsed: data.feedsUsed,
      },
    });
  }, "create newsletter");
}

export async function getNewslettersByUserId(
  userId: string,
  options?: {
    limit?: number;
    skip?: number;
  }
) {
  return wrapDatabaseOperation(async () => {
    return await prisma.newsletter.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: options?.limit,
      skip: options?.skip,
    });
  }, "fetch newsletters by user");
}

export async function getNewsletterById(id: string, userId: string) {
  return wrapDatabaseOperation(async () => {
    const newsletter = await prisma.newsletter.findUnique({
      where: {
        id,
      },
    });

    // Newsletter not found
    if (!newsletter) {
      return null;
    }

    // Authorization: ensure newsletter belongs to user
    if (newsletter.userId !== userId) {
      throw new Error("Unauthorized: Newsletter does not belong to user");
    }

    return newsletter;
  }, "fetch newsletter by ID");
}

/**
 * Gets the total count of newsletters for a user
 *
 * Useful for pagination and displaying totals.
 *
 * @param userId - User's database ID
 * @returns Number of newsletters
 */
export async function getNewslettersCountByUserId(userId: string) {
  return wrapDatabaseOperation(async () => {
    return await prisma.newsletter.count({
      where: {
        userId,
      },
    });
  }, "count newsletters by user");
}

export async function deleteNewsletter(id: string, userId: string) {
  return wrapDatabaseOperation(async () => {
    const newsletter = await prisma.newsletter.findUnique({
      where: {
        id,
      },
    });

    if (!newsletter) {
      throw new Error("Newsletter not found");
    }

    if (newsletter.userId !== userId) {
      throw new Error("Unauthorized: Newsletter does not belong to user");
    }

    return await prisma.newsletter.delete({
      where: {
        id,
      },
    });
  }, "delete newsletter");
}
