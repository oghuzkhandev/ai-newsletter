import { NextRequest, NextResponse } from "next/server";
import { verifySignatureAppRouter } from "@upstash/qstash/nextjs";
import { prisma } from "@/lib/prisma";
import { clerkClient } from "@clerk/nextjs/server";
import { Resend } from "resend";
import { generateNewsletterForCron } from "@/lib/newsletter/generate-for-cron";

export const runtime = "nodejs";
export const maxDuration = 300;

async function handler(_req: NextRequest) {
  console.log("[CRON] Newsletter cron started");

  try {
    const result = await sendScheduledNewsletters();
    return NextResponse.json(result);
  } catch (err) {
    console.error("[CRON] Fatal error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Cron failed" },
      { status: 500 }
    );
  }
}

export const POST = verifySignatureAppRouter(handler);

async function sendScheduledNewsletters() {
  const resend = new Resend(process.env.RESEND_API_KEY!);

  // ═══════════════════════════════════════════════════════════
  // TÜRKİYE SAATİ (UTC+3)
  // ═══════════════════════════════════════════════════════════
  const now = new Date();
  const turkeyTime = new Date(now.getTime() + 3 * 60 * 60 * 1000); // UTC+3

  const HH = String(turkeyTime.getUTCHours()).padStart(2, "0");
  const MM = String(turkeyTime.getUTCMinutes()).padStart(2, "0");
  const currentTime = `${HH}:${MM}`;

  // Bugünün günü (Türkiye saatine göre)
  const weekdays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const currentDay = weekdays[turkeyTime.getUTCDay()];

  console.log(`[CRON] Turkey time: ${currentTime}, Day: ${currentDay}`);

  // ═══════════════════════════════════════════════════════════
  // BU SAATTE NEWSLETTER GÖNDERİLECEK KULLANICILARI BUL
  // ═══════════════════════════════════════════════════════════
  const users = await prisma.user.findMany({
    where: { newsletterSendTime: currentTime },
    include: {
      settings: true,
      rssFeeds: { where: { isActive: true } },
    },
  });

  console.log(
    `[CRON] Found ${users.length} users scheduled for ${currentTime}`
  );

  if (users.length === 0) {
    return {
      success: true,
      message: "No users scheduled for this time",
      turkeyTime: currentTime,
      day: currentDay,
    };
  }

  const results: Array<{
    userId: string;
    status: "sent" | "skipped" | "error";
    reason?: string;
  }> = [];

  for (const user of users) {
    try {
      // ─────────────────────────────────────────────────────────
      // 1. GÜN KONTROLÜ
      // ─────────────────────────────────────────────────────────
      // Boş array = her gün, değilse sadece seçili günler
      const isScheduledDay =
        user.newsletterDays.length === 0 ||
        user.newsletterDays.includes(currentDay);

      if (!isScheduledDay) {
        console.log(
          `[CRON] User ${user.id}: Skipped - not scheduled for ${currentDay}`
        );
        results.push({
          userId: user.id,
          status: "skipped",
          reason: `Not scheduled for ${currentDay}`,
        });
        continue;
      }

      // ─────────────────────────────────────────────────────────
      // 2. EMAIL ADRESİ BUL
      // ─────────────────────────────────────────────────────────
      let email = user.settings?.senderEmail;

      if (!email) {
        try {
          const clerk = await clerkClient();
          const clerkUser = await clerk.users.getUser(user.clerkUserId);
          email = clerkUser.emailAddresses?.[0]?.emailAddress;
        } catch (e) {
          console.error(`[CRON] Clerk error for ${user.clerkUserId}:`, e);
        }
      }

      if (!email) {
        console.log(`[CRON] User ${user.id}: Skipped - no email`);
        results.push({
          userId: user.id,
          status: "skipped",
          reason: "No email address found",
        });
        continue;
      }

      // ─────────────────────────────────────────────────────────
      // 3. RSS FEED'LERİ KONTROL ET
      // ─────────────────────────────────────────────────────────
      const feedIds = user.rssFeeds.map((f) => f.id);

      if (feedIds.length === 0) {
        console.log(`[CRON] User ${user.id}: Skipped - no active feeds`);
        results.push({
          userId: user.id,
          status: "skipped",
          reason: "No active RSS feeds",
        });
        continue;
      }

      console.log(`[CRON] User ${user.id}: Has ${feedIds.length} feeds`);

      // ─────────────────────────────────────────────────────────
      // 4. SON 24 SAATİN MAKALELERİNİ AL
      // ─────────────────────────────────────────────────────────
      const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

      const articles = await prisma.rssArticle.findMany({
        where: {
          feedId: { in: feedIds },
          pubDate: { gte: oneDayAgo },
        },
        include: {
          feed: {
            select: { id: true, title: true, url: true, category: true },
          },
        },
        orderBy: { pubDate: "desc" },
        take: 50, // Max 50 makale
      });

      if (articles.length === 0) {
        console.log(
          `[CRON] User ${user.id}: Skipped - no articles in last 24h`
        );
        results.push({
          userId: user.id,
          status: "skipped",
          reason: "No articles in the last 24 hours",
        });
        continue;
      }

      console.log(`[CRON] User ${user.id}: Found ${articles.length} articles`);

      // Feed bazlı dengeleme
      const balancedArticles = balanceArticlesPerFeed(articles, feedIds, 20);
      console.log(
        `[CRON] User ${user.id}: Balanced to ${balancedArticles.length} articles`
      );

      // ─────────────────────────────────────────────────────────
      // 5. AI İLE NEWSLETTER OLUŞTUR
      // ─────────────────────────────────────────────────────────
      console.log(`[CRON] User ${user.id}: Generating newsletter with AI...`);

      const { subject, html } = await generateNewsletterForCron({
        articles: balancedArticles.map((a) => ({
          ...a,
          pubDate: a.pubDate ?? new Date(),
        })),
        settings: user.settings,
        feeds: user.rssFeeds,
      });

      // ─────────────────────────────────────────────────────────
      // 6. EMAIL GÖNDER
      // ─────────────────────────────────────────────────────────
      const fromEmail =
        process.env.RESEND_FROM_EMAIL ||
        `newsletter@${process.env.RESEND_DOMAIN || "resend.dev"}`;
      const fromName =
        user.settings?.senderName ||
        user.settings?.newsletterName ||
        "AI Newsletter";

      console.log(`[CRON] User ${user.id}: Sending email to ${email}...`);

      const { error: sendError } = await resend.emails.send({
        from: `${fromName} <${fromEmail}>`,
        to: email,
        subject,
        html,
      });

      if (sendError) {
        console.error(`[CRON] User ${user.id}: Email send error:`, sendError);

        await prisma.newsletterLog.create({
          data: {
            userId: user.id,
            sentAt: new Date(),
            recipientEmail: email,
            articleCount: balancedArticles.length,
            status: "error",
            errorMessage: sendError.message,
          },
        });

        results.push({
          userId: user.id,
          status: "error",
          reason: sendError.message,
        });
        continue;
      }

      // ─────────────────────────────────────────────────────────
      // 7. BAŞARILI - LOG KAYDET
      // ─────────────────────────────────────────────────────────
      await prisma.newsletterLog.create({
        data: {
          userId: user.id,
          sentAt: new Date(),
          recipientEmail: email,
          articleCount: balancedArticles.length,
          status: "sent",
        },
      });

      console.log(`[CRON] User ${user.id}: ✅ Newsletter sent to ${email}`);
      results.push({ userId: user.id, status: "sent" });
    } catch (error) {
      console.error(`[CRON] User ${user.id}: Error -`, error);
      results.push({
        userId: user.id,
        status: "error",
        reason: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  // ═══════════════════════════════════════════════════════════
  // SONUÇ
  // ═══════════════════════════════════════════════════════════
  const summary = {
    success: true,
    turkeyTime: currentTime,
    day: currentDay,
    totalUsers: users.length,
    sent: results.filter((r) => r.status === "sent").length,
    skipped: results.filter((r) => r.status === "skipped").length,
    errors: results.filter((r) => r.status === "error").length,
    results,
  };

  console.log(`[CRON] Complete:`, summary);
  return summary;
}

/**
 * Feed'ler arasında makale dengele
 * 2 feed varsa her birinden eşit sayıda al
 */
function balanceArticlesPerFeed<T extends { feedId: string }>(
  articles: T[],
  feedIds: string[],
  totalLimit: number
): T[] {
  const byFeed: Record<string, T[]> = {};

  for (const feedId of feedIds) {
    byFeed[feedId] = [];
  }

  for (const article of articles) {
    if (byFeed[article.feedId]) {
      byFeed[article.feedId].push(article);
    }
  }

  const activeFeedCount = feedIds.filter(
    (id) => (byFeed[id]?.length || 0) > 0
  ).length;
  if (activeFeedCount === 0) return [];

  const perFeedLimit = Math.ceil(totalLimit / activeFeedCount);
  const result: T[] = [];

  for (const feedId of feedIds) {
    const feedArticles = byFeed[feedId] || [];
    const toTake = Math.min(perFeedLimit, feedArticles.length);

    for (let i = 0; i < toTake; i++) {
      result.push(feedArticles[i]);
    }
  }

  return result;
}
