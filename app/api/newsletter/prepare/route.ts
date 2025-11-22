import { NextResponse, type NextRequest } from "next/server";
import { getArticlesByFeedsAndDateRange } from "@/actions/rss-article";
import { getCurrentUser } from "@/lib/auth/helpers";
import { getFeedsToRefresh } from "@/lib/rss/feed-refresh";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { feedIds, startDate, endDate } = body;

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

    await getCurrentUser();

    const feedsToRefresh = await getFeedsToRefresh(feedIds);

    const articles = await getArticlesByFeedsAndDateRange(
      feedIds,
      new Date(startDate),
      new Date(endDate),
      100
    );

    return NextResponse.json({
      feedsToRefresh: feedsToRefresh.length,
      articlesFound: articles.length,
    });
  } catch (error) {
    console.error("Error in prepare:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to prepare newsletter",
      },
      { status: 500 }
    );
  }
}
