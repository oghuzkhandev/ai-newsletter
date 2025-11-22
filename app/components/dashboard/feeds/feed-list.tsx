"use client";

import { useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import SortableItem from "./sortable-item";
import { toast } from "sonner";
import type { FeedItem } from "@/lib/feeds";

export function FeedList({ data }: { data: FeedItem[] }) {
  const [feeds, setFeeds] = useState(data);

  const sensors = useSensors(useSensor(PointerSensor));
  useEffect(() => {
    setFeeds(data);
  }, [data]);

  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (!over) return;
    if (active.id !== over.id) {
      setFeeds((items) => {
        const oldIndex = items.findIndex((i) => i.url === active.id);
        const newIndex = items.findIndex((i) => i.url === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={feeds.map((f) => f.url)}
        strategy={verticalListSortingStrategy}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {feeds.map((feed, idx) => (
            <SortableItem key={feed.url} id={feed.url}>
              <Card className="p-4 rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <img
                      src={`https://www.google.com/s2/favicons?sz=64&domain=${feed.url}`}
                      className="w-5 h-5 rounded"
                    />
                    {idx + 1}. {feed.name}
                  </CardTitle>

                  <CardDescription>{feed.url}</CardDescription>
                </CardHeader>

                <div className="flex gap-2 mt-3">
                  <Button
                    size="sm"
                    variant="outline"
                    onMouseUp={async () => {
                      try {
                        await navigator.clipboard.writeText(feed.url);
                        toast.success("Copied!");
                      } catch (err) {
                        console.error(err);
                        toast.error("Clipboard blocked by browser");
                      }
                    }}
                  >
                    <Copy className="h-4 w-4" /> Copy
                  </Button>
                </div>
              </Card>
            </SortableItem>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
