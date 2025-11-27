"use client";

import { useAuth } from "@clerk/nextjs";
import { Plus, RefreshCw, BadgeInfo } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import { validateAndAddFeed } from "@/actions/rss-fetch";
import { upsertUserFromClerk } from "@/actions/user";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddFeedDialogProps {
  currentFeedCount: number;
  isPro: boolean;
  feedLimit: number;
  trigger?: React.ReactNode;
}

export function AddFeedDialog({ currentFeedCount, isPro, feedLimit, trigger }: AddFeedDialogProps) {
  const { userId } = useAuth();
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const [newFeedUrl, setNewFeedUrl] = React.useState("");
  const [isAdding, setIsAdding] = React.useState(false);

  const maxLimit = feedLimit;
  const counter = `${currentFeedCount}/${maxLimit}`;

  const handleAddFeed = async () => {
    if (!newFeedUrl.trim()) {
      toast.error("Please enter a valid RSS feed URL.");
      return;
    }

    if (currentFeedCount >= maxLimit) {
      toast.error(
        isPro
          ? `You've added ${maxLimit} RSS feeds. You've reached the limit.`
          : "Starter plan allows only 1 RSS feed. Upgrade to Pro for more."
      );
      return;
    }

    try {
      setIsAdding(true);

      if (!userId) throw new Error("Not authenticated");

      const user = await upsertUserFromClerk(userId);
      const result = await validateAndAddFeed(user.id, newFeedUrl.trim());

      if (result.error) {
        toast.warning(`Feed added, but with an issue: ${result.error}`);
      } else {
        toast.success(
          `Feed added successfully (${currentFeedCount + 1}/${maxLimit}).`
        );
      }

      if (currentFeedCount + 1 >= maxLimit) {
        toast.error(
          isPro
            ? `You've added ${maxLimit} RSS feeds. Limit reached.`
            : "Starter plan limit reached (1 feed)."
        );
      }

      setNewFeedUrl("");
      setIsOpen(false);
      router.refresh();
    } catch (err) {
      toast.error("Failed to add RSS feed.");
    } finally {
      setIsAdding(false);
    }
  };

  const disableAdd = currentFeedCount >= maxLimit || isAdding;

  return (
    <div className="flex items-center gap-3">
      <span className="flex items-center gap-2 text-md font-bold mr-3">
        <BadgeInfo />
        {counter}
      </span>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button size="sm" variant="destructive" disabled={disableAdd}>
            Add Feed
            <Plus className="h-4 w-4" />
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add RSS Feed</DialogTitle>
            <DialogDescription>
              Enter the RSS feed URL. The system will fetch and validate it
              automatically.
            </DialogDescription>
          </DialogHeader>

          {currentFeedCount >= maxLimit && (
            <div className="text-red-600 text-sm font-semibold">
              {isPro
                ? `Pro plan limit: ${maxLimit} feeds.`
                : "Starter plan limit: 1 feed. Upgrade to Pro for more."}
            </div>
          )}

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="feed-url">RSS Feed URL</Label>
              <Input
                id="feed-url"
                type="text"
                placeholder="https://example.com/feed.xml"
                value={newFeedUrl}
                onChange={(e) => setNewFeedUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddFeed()}
                disabled={disableAdd}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isAdding}
            >
              Cancel
            </Button>

            <Button onClick={handleAddFeed} disabled={disableAdd}>
              {isAdding ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Adding...
                </>
              ) : (
                "Add Feed"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
