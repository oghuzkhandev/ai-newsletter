"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import type { FeedItem } from "@/lib/feeds";

export default function FeedSearch({
  allFeeds,
  setFilteredFeeds,
}: {
  allFeeds: FeedItem[];
  setFilteredFeeds: (feeds: FeedItem[] | null) => void;
}) {
  const [query, setQuery] = useState("");

  function handleSearch(text: string) {
    setQuery(text);

    if (text.trim() === "") {
      setFilteredFeeds(null);
      return;
    }

    const filtered = allFeeds.filter((f) =>
      f.name.toLowerCase().includes(text.toLowerCase())
    );

    setFilteredFeeds(filtered);
  }

  return (
    <div className="relative w-60">
      <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search feeds..."
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        className="pl-9 rounded-xl"
      />
    </div>
  );
}
