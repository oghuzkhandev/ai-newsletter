"use client";

import { NewsletterData } from "@/lib/newsletter/types";

export default function MagazineTemplate({ data }: { data: NewsletterData }) {
  return (
    <div className="space-y-10">
      <h1 className="text-5xl font-extrabold tracking-tight">
        {data.suggestedTitles?.[0] ?? "Newsletter"}
      </h1>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="space-y-4 text-lg leading-relaxed">
          {data.body.split("\n").map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="bg-neutral-100 dark:bg-neutral-800 p-6 rounded-xl shadow space-y-4">
          <h2 className="font-bold text-xl">Top Announcements</h2>
          <ul className="list-disc list-inside space-y-2">
            {data.topAnnouncements.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
