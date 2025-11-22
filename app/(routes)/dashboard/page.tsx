import { NewsletterGenerator } from "../../components/dashboard/newsletter/newsletter-generator";
import { RssFeedManager } from "../../components/dashboard/rss-feed-manager";

async function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-950">
      <div className="container mx-auto py-12 px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <RssFeedManager />
          </div>

          <div>
            <NewsletterGenerator />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
