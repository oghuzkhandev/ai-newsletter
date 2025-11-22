import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { getUserSettingsByUserId } from "@/actions/user-settings";
import { getCurrentUser } from "@/lib/auth/helpers";
import {
  buildArticleSummaries,
  buildNewsletterPrompt,
} from "@/lib/newsletter/prompt-builder";
import { prepareFeedsAndArticles } from "@/lib/rss/feed-refresh";

export const maxDuration = 300;

const NewsletterSchema = z.object({
  suggestedTitles: z.array(z.string()).length(5),
  suggestedSubjectLines: z.array(z.string()).length(5),
  body: z.string(),
  topAnnouncements: z.array(z.string()).length(5),
  additionalInfo: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Generate Stream - Request Body:", body);

    const { feedIds, startDate, endDate, userInput } = body;

    if (!Array.isArray(feedIds) || feedIds.length === 0) {
      return NextResponse.json(
        { error: "feedIds is required and must be a non-empty array" },
        { status: 400 }
      );
    }

    if (!startDate || !endDate) {
      return NextResponse.json(
        { error: "startDate and endDate are required" },
        { status: 400 }
      );
    }

    const user = await getCurrentUser();
    const settings = await getUserSettingsByUserId(user.id);
    
    console.log("User ID:", user.id);
    console.log("Settings found:", !!settings);

    // Article'ları getir
    const articles = await prepareFeedsAndArticles({
      feedIds,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    });

    console.log(`Found ${articles.length} articles for date range: ${startDate} to ${endDate}`);
    console.log("Sample article:", articles[0]);

    // Eğer article yoksa hata dön
    if (articles.length === 0) {
      return NextResponse.json(
        { 
          error: "No articles found for the selected feeds and date range. Please try a different date range or refresh your feeds." 
        },
        { status: 404 }
      );
    }

    const articleSummaries = buildArticleSummaries(articles);
    console.log("Article summaries length:", articleSummaries.length);

    const prompt = buildNewsletterPrompt({
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      articleSummaries,
      articleCount: articles.length,
      userInput,
      settings,
    });

    console.log("Prompt length:", prompt.length);
    console.log("Starting AI generation...");

    const result = streamObject({
      model: openai("gpt-4o-mini"),
      schema: NewsletterSchema,
      prompt,
      onFinish: ({ object, error }) => {
        if (error) {
          console.error("AI Generation Error:", error);
        } else {
          console.log("AI Generation Complete");
        }
      },
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Error in generate-stream:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unknown server error occurred",
      },
      { status: 500 }
    );
  }
}