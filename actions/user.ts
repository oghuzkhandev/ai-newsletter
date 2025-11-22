"use server";

import { prisma } from "@/lib/prisma";

export async function getUserByClerkId(clerkUserId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { clerkUserId },
    });
    return user;
  } catch (error) {
    console.error("Error while fetching user:", error);
    return null;
  }
}

export async function upsertUserFromClerk(clerkUserId: string) {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { clerkUserId },
    });

    if (existingUser) {
      const updated = await prisma.user.update({
        where: { clerkUserId },
        data: { updatedAt: new Date() },
      });
      return updated;
    }

    const created = await prisma.user.create({
      data: { clerkUserId },
    });
    return created;
  } catch (error) {
    console.error("Upsert user error:", error);
    throw new Error("Failed to upsert user");
  }
}
