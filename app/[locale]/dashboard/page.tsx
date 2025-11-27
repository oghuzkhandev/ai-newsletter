import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import NewsletterSetTime from "@/app/components/dashboard/newsletter/newsletter-set-time";
import { NewsletterGenerator } from "../../components/dashboard/newsletter/newsletter-generator";
import { RssFeedManager } from "../../components/dashboard/rss-feed-manager";

export default async function Dashboard() {
  const { userId } = await auth();

  const user = await prisma.user.findUnique({
    where: { clerkUserId: userId! },
    select: {
      newsletterSendTime: true,
      newsletterDays: true,
    },
  });

  return (
    <div className="p-3 space-y-10 min-h-screen">
      <div className="w-full text-center">
        <h1 className="text-3xl font-bold tracking-wide bg-clip-text text-transparent bg-linear-to-r from-red-500 to-yellow-500">
          Welcome to your Personal Newsflow Dashboard
        </h1>
        <p className="text-neutral-500 mt-1">
          Manage your RSS feeds, generate newsletters, and schedule delivery.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <div>
          <RssFeedManager />
        </div>

        <div className="flex items-start gap-6">
          <div className="flex-1">
            <NewsletterSetTime
              initialSendTime={user?.newsletterSendTime}
              initialDays={user?.newsletterDays ?? []}
            />
          </div>

          <div className="flex-2">
            <NewsletterGenerator />
          </div>
        </div>
      </div>
    </div>
  );
}
