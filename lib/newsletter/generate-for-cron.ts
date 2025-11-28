import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";
import { buildArticleSummaries, buildNewsletterPrompt } from "./prompt-builder";
import type { ArticleForPrompt } from "./types";

const NewsletterSchema = z.object({
  suggestedTitles: z.array(z.string()),
  suggestedSubjectLines: z.array(z.string()),
  body: z.string(),
  topAnnouncements: z.array(z.string()),
  additionalInfo: z.string().optional(),
});

interface GenerateParams {
  articles: ArticleForPrompt[];
  settings: any;
  feeds?: Array<{
    id: string;
    title?: string | null;
    url: string;
    category?: string | null;
  }>;
}

export async function generateNewsletterForCron({
  articles,
  settings,
  feeds,
}: GenerateParams) {
  const now = new Date();
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  const articleSummaries = buildArticleSummaries(articles);

  const prompt = buildNewsletterPrompt({
    startDate: oneDayAgo,
    endDate: now,
    articleSummaries,
    articleCount: articles.length,
    userInput: "",
    settings,
    feeds,
  });

  const { object } = await generateObject({
    model: openai("gpt-4o"),
    schema: NewsletterSchema,
    prompt,
  });

  const subject =
    object.suggestedSubjectLines?.[0] ||
    object.suggestedTitles?.[0] ||
    settings?.newsletterName ||
    "Your Daily Newsletter";

  const html = buildEmailHtml({
    body: object.body,
    settings,
    subject,
  });

  return { subject, html, newsletter: object };
}

function buildEmailHtml({
  body,
  settings,
  subject,
}: {
  body: string;
  settings: any;
  subject: string;
}) {
  let htmlBody = body
    .replace(
      /^### (.+)$/gm,
      '<h3 style="color:#1c1917;font-size:18px;font-weight:600;margin:24px 0 8px;">$1</h3>'
    )
    .replace(
      /^## (.+)$/gm,
      '<h2 style="color:#e11d48;font-size:24px;font-weight:700;margin:32px 0 16px;padding-block-end:8px;border-block-end:2px solid #fecdd3;">$1</h2>'
    )
    .replace(
      /^# (.+)$/gm,
      '<h1 style="color:#e11d48;font-size:28px;font-weight:700;margin:24px 0 16px;text-align:center;">$1</h1>'
    )
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" style="color:#2563eb;text-decoration:underline;">$1</a>'
    )
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(
      /\n\n/g,
      '</p><p style="color:#44403c;font-size:16px;line-height:1.7;margin:16px 0;">'
    )
    .replace(/\n/g, "<br/>");

  htmlBody = `<p style="color:#44403c;font-size:16px;line-height:1.7;margin:16px 0;">${htmlBody}</p>`;

  const newsletterName = settings?.newsletterName || "Daily Newsletter";
  const description = settings?.description || "Your AI-curated news digest";
  const companyName = settings?.companyName || "";
  const customFooter = settings?.customFooter || "";
  const disclaimerText = settings?.disclaimerText || "";

  const today = new Date().toLocaleDateString("tr-TR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return `
<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${subject}</title>
</head>
<body style="margin:0;padding:0;background-color:#fafaf9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <div style="max-inline-size:680px;margin:0 auto;padding:40px 20px;">
    <div style="text-align:center;margin-block-end:40px;padding-block-end:30px;border-block-end:1px solid #e7e5e4;">
      <h1 style="margin:0 0 8px;font-size:32px;font-weight:700;color:#1c1917;">${newsletterName}</h1>
      <p style="margin:0;color:#78716c;font-size:14px;">${description}</p>
      <div style="display:inline-block;background:linear-gradient(135deg,#fecaca 0%,#fde68a 100%);padding:8px 20px;border-radius:20px;font-size:13px;font-weight:600;color:#78716c;margin-block-start:16px;">${today}</div>
    </div>

    <div style="background:#ffffff;border-radius:12px;padding:32px;border:1px solid #e7e5e4;">
      ${htmlBody}
    </div>

    <div style="text-align:center;margin-block-start:40px;padding-block-start:30px;border-block-start:1px solid #e7e5e4;color:#a8a29e;font-size:12px;">
      ${customFooter ? `<p style="margin:0 0 12px;">${customFooter}</p>` : ""}
      ${
        disclaimerText
          ? `<p style="margin:0 0 12px;font-style:italic;">${disclaimerText}</p>`
          : ""
      }
      ${
        companyName
          ? `<p style="margin:0 0 12px;">© ${new Date().getFullYear()} ${companyName}</p>`
          : ""
      }
      <p style="margin:16px 0 0;color:#d6d3d1;">Powered by AI Newsletter ✨</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}
