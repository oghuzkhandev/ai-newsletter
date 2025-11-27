import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import {
  getBaseUrl,
  createNewsletterSchedule,
  listSchedules,
  deleteSchedule,
  pauseSchedule,
  resumeSchedule,
  triggerNewsletterCron,
} from "@/lib/qstash";

// GET - List all schedules
export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const schedules = await listSchedules();
    const baseUrl = getBaseUrl();

    // Filter to only show newsletter-related schedules
    const newsletterSchedules = schedules.filter((s) =>
      s.destination.includes("/api/cron/send-newsletters")
    );

    return NextResponse.json({
      baseUrl,
      schedules: newsletterSchedules.map((s) => ({
        id: s.scheduleId,
        cron: s.cron,
        destination: s.destination,
        isPaused: s.isPaused,
        createdAt: s.createdAt,
      })),
    });
  } catch (error) {
    console.error("List schedules error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to list schedules",
      },
      { status: 500 }
    );
  }
}

// POST - Manage schedules
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { action, scheduleId } = body;

    switch (action) {
      case "create": {
        const result = await createNewsletterSchedule();

        return NextResponse.json({
          success: true,
          message: result.exists
            ? "Schedule already exists"
            : "Schedule created",

          schedule: {
            id: result.schedule.scheduleId,
          },
        });
      }

      case "delete": {
        if (!scheduleId) {
          return NextResponse.json(
            { error: "scheduleId is required" },
            { status: 400 }
          );
        }
        await deleteSchedule(scheduleId);
        return NextResponse.json({
          success: true,
          message: "Schedule deleted",
        });
      }

      case "pause": {
        if (!scheduleId) {
          return NextResponse.json(
            { error: "scheduleId is required" },
            { status: 400 }
          );
        }
        await pauseSchedule(scheduleId);
        return NextResponse.json({ success: true, message: "Schedule paused" });
      }

      case "resume": {
        if (!scheduleId) {
          return NextResponse.json(
            { error: "scheduleId is required" },
            { status: 400 }
          );
        }
        await resumeSchedule(scheduleId);
        return NextResponse.json({
          success: true,
          message: "Schedule resumed",
        });
      }

      case "trigger": {
        const result = await triggerNewsletterCron();
        return NextResponse.json({
          success: true,
          message: "Cron triggered manually",
          messageId: result.messageId,
        });
      }

      default:
        return NextResponse.json(
          {
            error:
              "Invalid action. Use: create, delete, pause, resume, trigger",
          },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("Schedule action error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Action failed" },
      { status: 500 }
    );
  }
}
