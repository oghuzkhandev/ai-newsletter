// UPDATED: Clear markdown structure for proper styling
// - ## for category headers (with emoji)
// - ### for article titles (numbered)

import type { ArticleForPrompt, NewsletterPromptParams } from "./types";

/* -----------------------------------------
   ARTICLE SUMMARIES
----------------------------------------- */
export function buildArticleSummaries(articles: ArticleForPrompt[]): string {
  return articles
    .map((article, index) => {
      const rawSummary = article.summary || article.content;
      const summary =
        typeof rawSummary === "string"
          ? rawSummary.substring(0, 3000)
          : "No summary available";

      return `
${index + 1}. "${article.title}"
   Source: ${article.feed.title}
   Category: ${article.feed.category ?? "Uncategorized"}
   Published: ${article.pubDate.toLocaleDateString()}
   Link: ${article.link}
   Summary: ${summary}
`;
    })
    .join("\n");
}

/* -----------------------------------------
   SETTINGS CONTEXT
----------------------------------------- */
function buildSettingsContext(
  settings?: NewsletterPromptParams["settings"]
): string {
  if (!settings) return "";

  const lines: string[] = [];
  const add = (label: string, value?: string | null) => {
    if (value) lines.push(`${label}: ${value}`);
  };

  add("Newsletter Description", settings.description);
  add("Target Audience", settings.targetAudience);
  add("Tone", settings.defaultTone);
  add("Brand Voice", settings.brandVoice);
  add("Company", settings.companyName);
  add("Industry", settings.industry);
  add("Sender Name", settings.senderName);
  add("Sender Email", settings.senderEmail);

  if (settings.defaultTags?.length)
    lines.push(`Tags: ${settings.defaultTags.join(", ")}`);

  if (settings.disclaimerText)
    lines.push(`Disclaimer: "${settings.disclaimerText}"`);

  if (settings.customFooter) lines.push(`Footer: "${settings.customFooter}"`);

  return `NEWSLETTER SETTINGS:\n${lines.join("\n")}\n\n`;
}

/* -----------------------------------------
   USER INSTRUCTIONS
----------------------------------------- */
function buildUserInstructionsSection(userInput?: string): string {
  if (!userInput?.trim()) return "";
  return `USER SPECIAL INSTRUCTIONS:\n${userInput.trim()}\n\n`;
}

/* -----------------------------------------
   MAIN PROMPT BUILDER
----------------------------------------- */
export function buildNewsletterPrompt(params: NewsletterPromptParams): string {
  const settingsContext = buildSettingsContext(params.settings);
  const userInstructions = buildUserInstructionsSection(params.userInput);

  // NEW: Feed names for intro section
  const feedNames = params.feeds
    ?.map((f) => f.title || f.url || "Feed")
    .join(", ");

  return `You are a premium newsletter journalist writing for a sophisticated audience.

DATE RANGE: ${params.startDate.toLocaleDateString()} → ${params.endDate.toLocaleDateString()}

${settingsContext}${userInstructions}ARTICLES (${params.articleCount} total):
${params.articleSummaries}

═══════════════════════════════════════════════════════════════
                    STRICT FORMATTING RULES
═══════════════════════════════════════════════════════════════

INTRO SECTION (MUST APPEAR AT THE VERY TOP OF BODY):

The body MUST begin with this exact intro block, BEFORE any category headers:

### 📰 News Summary for ${params.startDate.toLocaleDateString()} – ${params.endDate.toLocaleDateString()}

Write a polished 2–3 sentence editorial introduction that:
- Summarizes the scope of this date range,
- Indicates that the newsletter is curated from these sources,
- Sets a cohesive, analytical tone.

This intro MUST NOT be numbered.
This intro MUST NOT count as a category section.

───────────────────────────────────────────────────────────────

MARKDOWN STRUCTURE (MUST FOLLOW EXACTLY):

1. CATEGORY HEADERS → Use ## with emoji  
   Example: ## 🏛️ Politika ve Toplum  
   Example: ## ⚽ Spor Gündemi  
   Example: ## 🔬 Bilim ve Teknoloji  

2. ARTICLE TITLES → Use ### with number  
   Example: ### 1. Haber başlığı burada  
   Example: ### 2. İkinci haber başlığı  

3. ARTICLE CONTENT → Plain paragraph  
   Write 1–2 sentence summary, then add read-more link.

4. READ MORE LINK → On its own line  
   Format: [Devamını oku →](URL)

═══════════════════════════════════════════════════════════════

EXAMPLE OUTPUT FORMAT:

## 🏛️ Politika ve Toplum

### 1. Önemli siyasi gelişme başlığı
Bu haberde önemli bir siyasi gelişme ele alınıyor. Detaylar için kaynak sitesini ziyaret edebilirsiniz.
[Devamını oku →](https://example.com/article1)

### 2. İkinci önemli haber başlığı
İkinci haberin kısa özeti burada yer alıyor. Konu hakkında daha fazla bilgi için linke tıklayın.
[Devamını oku →](https://example.com/article2)

## ⚽ Spor Gündemi

### 1. Spor haberi başlığı
Spor dünyasından önemli bir gelişme.
[Devamını oku →](https://example.com/sport1)

═══════════════════════════════════════════════════════════════

CONTENT REQUIREMENTS:

- MINIMUM 2000 words for the body
- The intro block MUST appear at the top
- Each feed/category MUST have its own ## section
- Each category MUST have 10 articles (### items)
- Article summaries MUST be 2 sentences
- Links MUST be placed at the end of each article
- Tone: Professional editorial (NYT/Economist style)
- Language: Match the article language

BALANCE RULE:
- If 2 feeds → equal coverage (7–10 each)
- If 3 feeds → 5 each
- No feed may be underrepresented

${
  params.settings?.disclaimerText
    ? `\nInclude this disclaimer near the end: "${params.settings.disclaimerText}"`
    : ""
}
${
  params.settings?.customFooter
    ? `\nEnd with this footer after ---: "${params.settings.customFooter}"`
    : ""
}

═══════════════════════════════════════════════════════════════

OUTPUT FORMAT (RETURN ONLY THIS JSON):

{
  "suggestedTitles": ["Title 1", "Title 2", "Title 3", "Title 4", "Title 5"],
  "suggestedSubjectLines": ["Subject 1", "Subject 2", "Subject 3", "Subject 4", "Subject 5"],
  "body": "## 🏛️ Category Name\\n\\n### 1. Article title...\\n\\nSummary...\\n\\n[Devamını oku →](url)\\n\\n### 2. ...",
  "topAnnouncements": ["Announcement 1", "Announcement 2", "Announcement 3", "Announcement 4", "Announcement 5"],
  "additionalInfo": "Additional insights and forecasts..."
}`;
}
