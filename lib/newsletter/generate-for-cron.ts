import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";
import { z } from "zod";

import { buildArticleSummaries, buildNewsletterPrompt } from "./prompt-builder";

import type { ArticleForPrompt } from "./types";

// ✔ Cron’un ihtiyacı olan AI output şeması
const NewsletterSchema = z.object({
  suggestedTitles: z.array(z.string()).length(5),
  topAnnouncements: z.array(z.string()).length(5),
  body: z.string(), // newsletter markdown
  additionalInfo: z.string().optional(),
});

export async function generateNewsletterForCron({
  articles,
  settings,
}: {
  articles: ArticleForPrompt[];
  settings: any;
}) {
  // 1) Makale özetlerini hazırla
  const articleSummaries = buildArticleSummaries(articles);

  // 2) Prompt oluştur
  const prompt = buildNewsletterPrompt({
    startDate: new Date(),
    endDate: new Date(),
    articleSummaries,
    articleCount: articles.length,
    userInput: "",
    settings,
  });

  // 3) AI’ya isteği gönder
  const { object } = await streamObject({
    model: openai("gpt-4o-mini"),
    schema: NewsletterSchema,
    prompt,
  });

  const ai = await object;

  // 4) Subject = AI title’lardan ilki
  const subject =
    ai.suggestedTitles?.[0] || settings?.newsletterName || "Your Newsletter";

  // 5) AI'nın body’sini Markdown → HTML uyumlu hale getir
  const aiBodyHtml = ai.body
    .replace(/\n/g, "<br/>")
    .replace(/#{1,6}\s?/g, "<h2>")
    .replace(/<\/h2><br\/>/g, "</h2>");

  // 6) SENİN HTML TEMPLATE’İN içine enjekte ediyoruz
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${settings?.newsletterName || "Daily Newsletter"}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      'Helvetica Neue', Arial, sans-serif;
      background-color: #fafaf9;
      color: #1c1917;
      line-height: 1.6;
    }
    .container {
      max-inline-size: 700px;
      margin: 0 auto;
      padding: 40px 20px;
    }
    .header {
      text-align: center;
      margin-block-end: 40px;
      padding-block-end: 30px;
      border-block-end: 1px solid #e7e5e4;
    }
    .logo {
      font-size: 28px;
      font-weight: 700;
      color: #1c1917;
      margin-block-end: 8px;
    }
    .tagline {
      color: #78716c;
      font-size: 14px;
    }
    .date {
      display: inline-block;
      background: linear-gradient(135deg, #fecaca 0%, #fde68a 100%);
      padding: 6px 16px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      color: #78716c;
      margin-block-start: 16px;
    }
    .newsletter-body {
      margin-block-start: 40px;
      font-size: 16px;
      line-height: 1.7;
      color: #1c1917;
    }
    .footer {
      text-align: center;
      margin-block-start: 40px;
      padding-block-start: 30px;
      border-block-start: 1px solid #e7e5e4;
      color: #a8a29e;
      font-size: 12px;
    }
    .footer a {
      color: #78716c;
    }
  </style>
</head>

<body>
  <div class="container">

    <!-- HEADER -->
    <div class="header">
      <div class="logo">${settings?.newsletterName || "Daily Digest"}</div>
      <div class="tagline">
        ${settings?.description || "Today's top AI-generated insights"}
      </div>
      <div class="date">
        ${new Date().toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </div>
    </div>

    <!-- AI GENERATED NEWSLETTER -->
    <div class="newsletter-body">
      ${aiBodyHtml}
    </div>

    <!-- FOOTER -->
    <div class="footer">
      ${settings?.customFooter ? `<p>${settings.customFooter}</p>` : ""}
      ${
        settings?.disclaimerText
          ? `<p style="margin-block-start:8px;">${settings.disclaimerText}</p>`
          : ""
      }
      ${
        settings?.companyName
          ? `<p style="margin-block-start:16px;">© ${new Date().getFullYear()} ${
              settings.companyName
            }</p>`
          : ""
      }
      <p style="margin-block-start:12px; color:#d6d3d1;">
        Powered by AI Newsletter ✨
      </p>
    </div>

  </div>
</body>
</html>
`;

  return {
    subject,
    html,
  };
}
