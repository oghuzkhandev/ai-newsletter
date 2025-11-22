"use client";

import { useState } from "react";
import FeedSearch from "../feeds/feed-search";
import { FeedList } from "../feeds/feed-list";
import FeedsHeader from "../feeds/feeds-header";
import type { FeedCategoryMap, FeedItem } from "@/lib/feeds";

export default function ClientFeedsPage({
  categories,
  allFeeds,
}: {
  categories: FeedCategoryMap;
  allFeeds: FeedItem[];
}) {
  const [filteredFeeds, setFilteredFeeds] = useState<FeedItem[] | null>(null);

  return (
    <div className="container mx-auto py-10 space-y-10">
      <FeedsHeader />

      <FeedSearch allFeeds={allFeeds} setFilteredFeeds={setFilteredFeeds} />

      {filteredFeeds ? (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Search Results</h2>
          <FeedList data={filteredFeeds} />
        </div>
      ) : (
        Object.entries(categories).map(([category, feeds]) => (
          <div key={category} className="space-y-4">
            <h2 className="text-2xl font-bold">{category}</h2>
            <FeedList data={feeds} />
          </div>
        ))
      )}
    </div>
  );
}
