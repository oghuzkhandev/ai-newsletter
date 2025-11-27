"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface SaveSettingsInput {
  sendTime: string; 
  days: string[];
}

export async function saveNewsletterSettingsAction(input: SaveSettingsInput) {
  const { userId } = await auth();
  if (!userId) throw new Error("Not authenticated");

  const { sendTime, days } = input;

  if (!/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(sendTime)) {
    throw new Error("Invalid time format (HH:MM)");
  }

  const validDays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
  for (const d of days) {
    if (!validDays.includes(d)) throw new Error(`Invalid day: ${d}`);
  }
  const utcTime = convertTRToUTC(sendTime);

  await prisma.user.update({
    where: { clerkUserId: userId },
    data: {
      newsletterSendTime: utcTime,
      newsletterDays: days,
      timezone: "Europe/Istanbul",
    },
  });

  revalidatePath("/dashboard");

  return { success: true, utcTime };
}

export async function getNewsletterSettingsAction() {
  const { userId } = await auth();
  if (!userId) return null;

  const user = await prisma.user.findUnique({
    where: { clerkUserId: userId },
    select: {
      newsletterSendTime: true,
      newsletterDays: true,
    },
  });

  if (!user) return null;

  // --- UTC → TR ---
  const localSendTime = user.newsletterSendTime
    ? convertUTCToTR(user.newsletterSendTime)
    : null;

  return {
    newsletterSendTime: localSendTime,
    newsletterDays: user.newsletterDays,
  };
}

// ------------------ TIME HELPERS ------------------

function convertTRToUTC(tr: string): string {
  const [h, m] = tr.split(":").map(Number);
  let u = h - 3;
  if (u < 0) u += 24;
  return `${String(u).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function convertUTCToTR(utc: string): string {
  const [h, m] = utc.split(":").map(Number);
  let t = h + 3;
  if (t >= 24) t -= 24;
  return `${String(t).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}
