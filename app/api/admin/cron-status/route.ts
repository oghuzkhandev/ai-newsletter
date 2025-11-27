import { NextRequest, NextResponse } from "next/server";
import { verifySignatureAppRouter } from "@upstash/qstash/nextjs";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";
import { clerkClient } from "@clerk/nextjs/server";

export const runtime = "nodejs";
export const maxDuration = 300;

// Main handler
async function handler(request: NextRequest) {
  console.log("[Cron] Newsletter cron job started");

  try {
    const result = await sendScheduledNewsletters();
    return NextResponse.json(result);
  } catch (error) {
    console.error("[Cron] Fatal error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

// Export with QStash signature verification
export const POST = verifySignatureAppRouter(handler);

// Main logic
async function sendScheduledNewsletters() {
  const resend = new Resend(process.env.RESEND_API_KEY!);

  // Current time in UTC
  const now = new Date();
  const currentHour = now.getUTCHours();
  const currentMinute = now.getUTCMinutes();
  const currentTime = `${String(currentHour).padStart(2, "0")}:${String(currentMinute).padStart(2, "0")}`;

  // Current day of week
  const weekdays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const currentDay = weekdays[now.getUTCDay()];

  console.log(`[Cron] Time: ${currentTime} UTC, Day: ${currentDay}`);

  // Find users scheduled for this exact minute
  const users = await prisma.user.findMany({
    where: {
      newsletterSendTime: currentTime,
    },
    include: {
      settings: true,
      rssFeeds: {
        where: { isActive: true },
        select: { id: true },
      },
    },
  });

  console.log(`[Cron] Found ${users.length} users scheduled for ${currentTime}`);

  if (users.length === 0) {
    return {
      success: true,
      message: "No users scheduled for this time",
      time: currentTime,
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
      // Check if today is a scheduled day
      // Empty array = daily, otherwise check if current day is included
      const isScheduledDay =
        user.newsletterDays.length === 0 ||
        user.newsletterDays.includes(currentDay);

      if (!isScheduledDay) {
        results.push({
          userId: user.id,
          status: "skipped",
          reason: `Not scheduled for ${currentDay}`,
        });
        continue;
      }

      // Get email address
      let emailTo = user.settings?.senderEmail;

      if (!emailTo) {
        try {
          const clerk = await clerkClient();
          const clerkUser = await clerk.users.getUser(user.clerkUserId);
          emailTo = clerkUser.emailAddresses?.[0]?.emailAddress;
        } catch (e) {
          console.error(`[Cron] Clerk error for ${user.clerkUserId}:`, e);
        }
      }

      if (!emailTo) {
        results.push({
          userId: user.id,
          status: "skipped",
          reason: "No email address",
        });
        continue;
      }

      // Get feed IDs
      const feedIds = user.rssFeeds.map((f) => f.id);

      if (feedIds.length === 0) {
        results.push({
          userId: user.id,
          status: "skipped",
          reason: "No active feeds",
        });
        continue;
      }

      // Get today's articles
      const startOfDay = new Date(now);
      startOfDay.setUTCHours(0, 0, 0, 0);

      const endOfDay = new Date(now);
      endOfDay.setUTCHours(23, 59, 59, 999);

      const articles = await prisma.rssArticle.findMany({
        where: {
          feedId: { in: feedIds },
          pubDate: { gte: startOfDay, lte: endOfDay },
        },
        orderBy: { pubDate: "desc" },
        take: 20,
      });

      if (articles.length === 0) {
        results.push({
          userId: user.id,
          status: "skipped",
          reason: "No articles today",
        });
        continue;
      }

      // Build email HTML
      const html = buildEmailHtml(articles, user.settings);

      // Send email
      const { error } = await resend.emails.send({
        from: `${user.settings?.senderName || "AI Newsletter"} <newsletter@${process.env.RESEND_DOMAIN || "resend.dev"}>`,
        to: emailTo,
        subject: `${user.settings?.newsletterName || "Your Newsletter"} - ${now.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`,
        html,
      });

      if (error) {
        console.error(`[Cron] Resend error:`, error);
        results.push({
          userId: user.id,
          status: "error",
          reason: error.message,
        });

        await prisma.newsletterLog.create({
          data: {
            userId: user.id,
            sentAt: now,
            articleCount: articles.length,
            recipientEmail: emailTo,
            status: "error",
            errorMessage: error.message,
          },
        });
        continue;
      }

      // Log success
      await prisma.newsletterLog.create({
        data: {
          userId: user.id,
          sentAt: now,
          articleCount: articles.length,
          recipientEmail: emailTo,
          status: "sent",
        },
      });

      results.push({ userId: user.id, status: "sent" });
      console.log(`[Cron] Sent to ${emailTo}`);
    } catch (userError) {
      console.error(`[Cron] User error ${user.id}:`, userError);
      results.push({
        userId: user.id,
        status: "error",
        reason: userError instanceof Error ? userError.message : "Unknown",
      });
    }
  }

  const summary = {
    success: true,
    time: currentTime,
    day: currentDay,
    total: users.length,
    sent: results.filter((r) => r.status === "sent").length,
    skipped: results.filter((r) => r.status === "skipped").length,
    errors: results.filter((r) => r.status === "error").length,
    results,
  };

  console.log(`[Cron] Complete:`, summary);
  return summary;
}

// Email template builder
function buildEmailHtml(
  articles: Array<{
    title: string;
    link: string;
    summary?: string | null;
    author?: string | null;
    pubDate: Date;
  }>,
  settings: {
    newsletterName?: string | null;
    description?: string | null;
    customFooter?: string | null;
    companyName?: string | null;
  } | null
) {
  const name = settings?.newsletterName || "Your Daily Digest";
  const desc = settings?.description || "Today's top stories";

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name}</title>
</head>
<body style="margin:0;padding:0;background:#fafaf9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-inline-size:600px;margin:0 auto;padding:40px 20px;">
    
    <div style="text-align:center;margin-block-end:32px;padding-block-end:24px;border-block-end:1px solid #e7e5e4;">
      <h1 style="margin:0 0 8px;font-size:28px;color:#1c1917;">${name}</h1>
      <p style="margin:0;color:#78716c;font-size:14px;">${desc}</p>
      <p style="margin:16px 0 0;display:inline-block;background:linear-gradient(135deg,#fecaca,#fde68a);padding:6px 16px;border-radius:20px;font-size:12px;color:#78716c;">
        ${new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
      </p>
    </div>

    ${articles
      .map(
        (article) => `
      <div style="background:#fff;border-radius:12px;padding:20px;margin-block-end:12px;border:1px solid #e7e5e4;">
        <a href="${article.link}" style="font-size:17px;font-weight:600;color:#1c1917;text-decoration:none;display:block;margin-block-end:8px;">
          ${article.title}
        </a>
        ${article.summary ? `<p style="margin:0 0 12px;color:#57534e;font-size:14px;line-height:1.5;">${article.summary.slice(0, 150)}...</p>` : ""}
        <div style="font-size:12px;color:#a8a29e;">
          ${article.author ? `By ${article.author} · ` : ""}
          ${new Date(article.pubDate).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
        </div>
      </div>
    `
      )
      .join("")}

    <div style="text-align:center;margin-block-start:32px;padding-block-start:24px;border-block-start:1px solid #e7e5e4;color:#a8a29e;font-size:12px;">
      ${settings?.customFooter ? `<p>${settings.customFooter}</p>` : ""}
      <p style="margin:8px 0 0;">
        ${settings?.companyName ? `© ${new Date().getFullYear()} ${settings.companyName}` : ""}
      </p>
      <p style="margin:12px 0 0;color:#d6d3d1;">Powered by AI Newsletter ✨</p>
    </div>

  </div>
</body>
</html>
  `.trim();
}