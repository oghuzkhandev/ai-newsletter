"use client";

import { useState } from "react";

export default function AdminTools() {
  const [output, setOutput] = useState("");

  // ✔ DOĞRU: Cron’u tetikleyen endpoint burası
  const triggerCron = async () => {
    const res = await fetch("/api/admin/schedules", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "trigger" }),
    });

    const text = await res.text();
    try {
      setOutput(JSON.stringify(JSON.parse(text), null, 2));
    } catch {
      setOutput("NOT JSON:\n" + text);
    }
  };

  const listSchedules = async () => {
    const res = await fetch("/api/admin/schedules");
    const json = await res.json();
    setOutput(JSON.stringify(json, null, 2));
  };

  const createSchedule = async () => {
    const res = await fetch("/api/admin/schedules", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "create" }),
    });
    const json = await res.json();
    setOutput(JSON.stringify(json, null, 2));
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Admin Tools</h1>

      <button
        onClick={triggerCron}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        🚀 Şimdi Gönder (Trigger Cron)
      </button>

      <button
        onClick={listSchedules}
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        📄 Schedules List
      </button>

      <button
        onClick={createSchedule}
        className="px-4 py-2 bg-purple-500 text-white rounded"
      >
        ➕ Create Schedule
      </button>

      <pre className="bg-black text-green-400 p-4 whitespace-pre-wrap rounded-lg text-sm">
        {output}
      </pre>
    </div>
  );
}
