"use client";

import { Newspaper, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { type DateRange, DateRangePicker } from "../feeds/date-range-picker";

interface RssFeed {
  id: string;
  title: string | null;
  url: string;
}

interface NewsletterFormProps {
  feeds: RssFeed[];
}

/**
 * Convert a local Date to UTC midnight ISO string
 * Example: User selects "Nov 23" in Turkey (UTC+3)
 * We want to send "2025-11-23T00:00:00.000Z" NOT "2025-11-22T21:00:00.000Z"
 */
function toUTCDateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}T00:00:00.000Z`;
}

/**
 * Convert to end of day in UTC
 */
function toUTCEndOfDayString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}T23:59:59.999Z`;
}

export function NewsletterForm({ feeds }: NewsletterFormProps) {
  const router = useRouter();
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>();
  const [userInput, setUserInput] = React.useState("");
  const [selectedFeeds, setSelectedFeeds] = React.useState<string[]>([]);

  React.useEffect(() => {
    setSelectedFeeds(feeds.map((f) => f.id));
  }, [feeds]);

  const allSelected = selectedFeeds.length === feeds.length;

  const handleSelectAll = () => setSelectedFeeds(feeds.map((f) => f.id));
  const handleDeselectAll = () => setSelectedFeeds([]);
  const handleToggleFeed = (feedId: string) => {
    setSelectedFeeds((prev) =>
      prev.includes(feedId)
        ? prev.filter((id) => id !== feedId)
        : [...prev, feedId]
    );
  };

  const handleGenerate = () => {
    if (!dateRange?.from || !dateRange?.to) {
      toast.error("Please select a date range");
      return;
    }

    if (selectedFeeds.length === 0) {
      toast.error("Please select at least one RSS feed");
      return;
    }

    // Convert dates to UTC strings (timezone-safe)
    const startDateUTC = toUTCDateString(dateRange.from);
    const endDateUTC = toUTCEndOfDayString(dateRange.to);

    console.log("[NewsletterForm] Date conversion:", {
      originalFrom: dateRange.from.toString(),
      originalTo: dateRange.to.toString(),
      startDateUTC,
      endDateUTC,
    });

    // Navigate to generation page with parameters
    const params = new URLSearchParams({
      feedIds: JSON.stringify(selectedFeeds),
      startDate: startDateUTC,
      endDate: endDateUTC,
    });

    if (userInput.trim()) {
      params.append("userInput", userInput.trim());
    }

    router.push(`/dashboard/generate?${params.toString()}`);
  };

  return (
    <div className="space-y-6">
      <Card className="transition-all hover:shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl gap-2 flex items-center">
            <div className="w-10 h-10 rounded-xl bg-neutral-200 flex items-center justify-center shadow-md">
              <Newspaper />
            </div>
            Generate Newsletter
          </CardTitle>
          <CardDescription className="text-base">
            Select date range, feeds, and add context to generate your
            AI-powered newsletter
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label className="text-base font-semibold">Date Range</Label>
            <DateRangePicker value={dateRange} onChange={setDateRange} />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold">Select Feeds</Label>
              {!allSelected && (
                <Button variant="ghost" size="sm" onClick={handleSelectAll}>
                  Select All
                </Button>
              )}
              {allSelected && (
                <Button variant="ghost" size="sm" onClick={handleDeselectAll}>
                  Deselect All
                </Button>
              )}
            </div>
            <div className="border rounded-lg p-4 space-y-3 max-h-60 overflow-y-auto">
              {feeds.map((feed) => (
                <div key={feed.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={feed.id}
                    checked={selectedFeeds.includes(feed.id)}
                    onCheckedChange={() => handleToggleFeed(feed.id)}
                  />
                  <Label
                    htmlFor={feed.id}
                    className="text-sm font-normal cursor-pointer flex-1"
                  >
                    {feed.title || feed.url}
                  </Label>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              {selectedFeeds.length} of {feeds.length} feeds selected
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="user-input" className="text-base font-semibold">
              Additional Context{" "}
              <span className="text-muted-foreground font-normal">
                (Optional)
              </span>
            </Label>
            <Textarea
              id="user-input"
              placeholder="Add any specific instructions, tone preferences, target audience details, or topics to focus on... (e.g., 'Include issue number 99', 'Focus on security topics', 'Keep it casual')"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              rows={4}
            />
            <p className="text-xs text-muted-foreground">
              Your instructions will be prioritized and incorporated into the
              newsletter. Default settings from the Settings page will also be
              applied.
            </p>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={selectedFeeds.length === 0}
            className="w-full font-bold"
            size="lg"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Generate Newsletter
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
