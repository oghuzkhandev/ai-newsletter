import type { UserSettings } from "@prisma/client";

export interface ArticleForPrompt {
  title: string;
  feed: { title: string | null; category?: string | null };
  pubDate: Date;
  summary?: string | null;
  content?: string | null;
  link: string;
}

export interface NewsletterPromptParams {
  startDate: Date;
  endDate: Date;
  articleSummaries: string;
  articleCount: number;
  userInput?: string;
  settings?: UserSettings | null;
  feeds?: Array<{
    id: string;
    title?: string | null;
    url: string;
    category?: string | null;
  }>;
}

export interface NewsletterData {
  suggestedTitles: string[];
  suggestedSubjectLines: string[];
  topAnnouncements: string[];
  body: string;
  template: "minimal" | "magazine" | "cards";
}
