"use client";

import { NewsletterData } from "@/lib/newsletter/types";

export default function MinimalTemplate({ data }: { data: NewsletterData }) {
  return (
    <div className="prose dark:prose-invert max-w-none leading-relaxed text-lg space-y-6">
      {data.body.split("\n").map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}
