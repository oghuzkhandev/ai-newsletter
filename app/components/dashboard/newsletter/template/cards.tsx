
"use client";

import { NewsletterData } from "@/lib/newsletter/types";

export default function CardsTemplate({ data }: { data: NewsletterData }) {
  return (
    <div className="space-y-6">
      {data.body.split("\n").map((p, i) => (
        <div
          key={i}
          className="p-6 rounded-xl shadow bg-white dark:bg-neutral-900 border"
        >
          <p className="text-lg">{p}</p>
        </div>
      ))}

      <div className="p-6 rounded-xl bg-blue-50 dark:bg-neutral-800 border space-y-3">
        <h2 className="font-bold text-xl">Announcements</h2>
        <ul className="list-disc list-inside space-y-1">
          {data.topAnnouncements.map((a, i) => (
            <li key={i}>{a}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
