"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface SaveSettingsInput {
  sendTime: string; // "HH:MM" format - Türkiye saati olarak kaydedilir
  days: string[]; // ["mon", "tue", ...] veya [] (her gün)
}

/**
 * Newsletter gönderim zamanını kaydet
 *
 * NOT: Tüm saatler Türkiye saati (UTC+3) olarak kaydedilir.
 * Cron job da Türkiye saatine göre çalışır.
 */
export async function saveNewsletterSettingsAction(input: SaveSettingsInput) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Oturum açmanız gerekiyor");
  }

  const { sendTime, days } = input;

  // Saat formatı kontrolü (HH:MM)
  if (!/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(sendTime)) {
    throw new Error("Geçersiz saat formatı. HH:MM şeklinde olmalı");
  }

  // Gün kontrolü
  const validDays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
  for (const day of days) {
    if (!validDays.includes(day)) {
      throw new Error(`Geçersiz gün: ${day}`);
    }
  }

  // Kullanıcıyı güncelle
  await prisma.user.update({
    where: { clerkUserId: userId },
    data: {
      newsletterSendTime: sendTime, // Direkt Türkiye saati olarak kaydet
      newsletterDays: days,
    },
  });

  revalidatePath("/dashboard/settings");

  return { success: true, savedTime: sendTime };
}

/**
 * Mevcut newsletter ayarlarını getir
 */
export async function getNewsletterSettingsAction() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { clerkUserId: userId },
    select: {
      newsletterSendTime: true,
      newsletterDays: true,
    },
  });

  return user;
}

/**
 * Newsletter zamanlamasını devre dışı bırak
 */
export async function disableNewsletterScheduleAction() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Oturum açmanız gerekiyor");
  }

  await prisma.user.update({
    where: { clerkUserId: userId },
    data: {
      newsletterSendTime: null,
      newsletterDays: [],
    },
  });

  revalidatePath("/dashboard/settings");

  return { success: true };
}
