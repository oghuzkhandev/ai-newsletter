import { NextRequest, NextResponse } from "next/server";
import { verifySignatureAppRouter } from "@upstash/qstash/nextjs";
import { prisma } from "@/lib/prisma";
import { clerkClient } from "@clerk/nextjs/server";
import { Resend } from "resend";

import { getTodayArticles } from "@/actions/today-articles";
import { generateNewsletterForCron } from "@/lib/newsletter/generate-for-cron";

export const runtime = "nodejs";
export const maxDuration = 300;

async function handler(_req: NextRequest) {
  try {
    const result = await sendScheduledNewsletters();
    return NextResponse.json(result);
  } catch (err) {
    console.error("CRON ERROR:", err);
    return NextResponse.json({ error: "Cron failed" }, { status: 500 });
  }
}

export const POST = verifySignatureAppRouter(handler);

async function sendScheduledNewsletters() {
  const resend = new Resend(process.env.RESEND_API_KEY!);

  const now = new Date();
  const HH = String(now.getUTCHours()).padStart(2, "0");
  const MM = String(now.getUTCMinutes()).padStart(2, "0");
  const current = `${HH}:${MM}`;

  console.log("CRON UTC TIME:", current);

  const users = await prisma.user.findMany({
    where: { newsletterSendTime: current },
    include: {
      settings: true,
      rssFeeds: { where: { isActive: true } },
    },
  });

  console.log("Users to notify:", users.length);
  const from = process.env.RESEND_FROM_EMAIL!;
  const results = [];

  for (const user of users) {
    try {
      // 1️⃣ Email adresi bul
      const email =
        user.settings?.senderEmail ||
        (await (await clerkClient()).users.getUser(user.clerkUserId))
          .emailAddresses[0].emailAddress;

      if (!email) {
        results.push({ userId: user.id, status: "no-email" });
        continue;
      }

      // 2️⃣ Kullanıcının RSS feed ID'leri
      const feedIds = user.rssFeeds.map((f) => f.id);

      if (!feedIds.length) {
        results.push({ userId: user.id, status: "no-feeds" });
        continue;
      }

      // 3️⃣ Bugünün makalelerini al
      const articles = await getTodayArticles(feedIds);

      if (!articles.length) {
        results.push({ userId: user.id, status: "no-articles" });
        continue;
      }

      // 4️⃣ AI ile newsletter üret
      const ai = await generateNewsletterForCron({
        articles,
        settings: user.settings,
      });

      // 5️⃣ E-mail gönder
      await resend.emails.send({
        from: from,
        to: email,
        subject: ai.subject,
        html: ai.html,
      });

      // 6️⃣ Logla
      await prisma.newsletterLog.create({
        data: {
          userId: user.id,
          sentAt: new Date(),
          recipientEmail: email,
          articleCount: articles.length,
          status: "sent",
        },
      });

      results.push({ userId: user.id, status: "sent" });
    } catch (error: any) {
      console.error("Cron user error:", error.message);
      results.push({
        userId: user.id,
        status: "error",
        reason: error.message,
      });
    }
  }

  return {
    timestamp: now.toISOString(),
    totalUsers: users.length,
    results,
  };
}
