import ClientFeedsPage from "@/app/components/dashboard/feeds/client-feed-page";
import { getCategoryFeeds } from "@/lib/feeds";

export default async function Page() {
  const categories = getCategoryFeeds();
  const allFeeds = Object.values(categories).flat();

  return <ClientFeedsPage categories={categories} allFeeds={allFeeds} />;
}
