// UPDATED: Balanced per-feed coverage, numbered subheadings only,
// "read more" at the end, min/max items per feed, no numbering on main headers,
// correct link formatting, category sections enforced.

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
function buildSettingsContext(settings?: NewsletterPromptParams["settings"]): string {
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

  if (settings.customFooter)
    lines.push(`Footer: "${settings.customFooter}"`);

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
   BODY REQUIREMENTS
----------------------------------------- */
function buildBodyRequirements(params: NewsletterPromptParams): string[] {
  const req = [
    "MINIMUM **2000 WORDS** for the body.",
    "Main section headers MUST NOT be numbered.",
    "Main section headers MUST include a category emoji.",
    "Subheadings (each article item) MUST be numbered (1, 2, 3...).",
    "Each subheading MUST include the article title.",
    "After EACH article paragraph, append a clickable link on its own line:",
    "Format: `[Read more →](URL)` or `[Devamını oku →](URL)` based on language.",
    "Each RSS feed MUST appear as its own section.",
    "Each RSS feed MUST produce **minimum 3** and **maximum 5** article items.",
    "Content MUST be deeply analytical, editorial-level, structured and smooth.",
    "Never place the link at the top — ALWAYS at the end of the article item.",
    "Use Markdown (#, ##, ###), bullet points, emphasis, transitions, etc.",
  ];

  if (params.settings?.disclaimerText)
    req.push("Disclaimer must appear naturally near the end.");

  if (params.settings?.customFooter)
    req.push("Footer must appear at the end following a --- separator.");

  return req;
}

/* -----------------------------------------
   IMPORTANT NOTES
----------------------------------------- */
function buildImportantNotes(_: NewsletterPromptParams): string[] {
  return [
    "STRICT RULE: Each feed must contribute *3 to 5* article items.",
    "STRICT RULE: All feed categories must appear as separate sections.",
    "STRICT RULE: Subheadings only are numbered, not the main headers.",
    "STRICT RULE: 'Read more' link must appear at the end of each article item.",
    "Tone must be premium editorial (NYT / Economist / FT style).",
    "Ensure balance across feeds (no feed is ignored).",
    "Use ALL relevant articles.",
  ];
}

/* -----------------------------------------
   MAIN PROMPT BUILDER
----------------------------------------- */
export function buildNewsletterPrompt(params: NewsletterPromptParams): string {
  const settingsContext = buildSettingsContext(params.settings);
  const userInstructions = buildUserInstructionsSection(params.userInput);
  const bodyRequirements = buildBodyRequirements(params);
  const importantNotes = buildImportantNotes(params);

  return [
    "You are a premium newsletter journalist. Write a deeply analytical, highly structured newsletter.",
    `DATE RANGE: ${params.startDate.toLocaleDateString()} → ${params.endDate.toLocaleDateString()}`,
    "",
    settingsContext,
    userInstructions,
    `ARTICLES (${params.articleCount} total):`,
    params.articleSummaries,
    "",
    "The newsletter MUST include:",
    "1. **5 newsletter titles** (not numbered inside body).",
    "2. **5 subject lines**.",
    "3. **Body (2000+ words)** following ALL rules:",
    ...bodyRequirements.map((r) => `   - ${r}`),
    "4. **5 top announcements**.",
    "5. **Additional insights/forecasts**.",
    "",
    "IMPORTANT RULES:",
    ...importantNotes.map((n) => `- ${n}`),
    "",
    `OUTPUT FORMAT (MANDATORY): Return ONLY this JSON:\n{
  "suggestedTitles": [...],
  "suggestedSubjectLines": [...],
  "body": "...",
  "topAnnouncements": [...],
  "additionalInfo": "..."
}`
  ].join("\n");
}
