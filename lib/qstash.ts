import { Client } from "@upstash/qstash";

let qstashClient: Client | null = null;

export function getQStashClient() {
  if (!qstashClient) {
    const token = process.env.QSTASH_TOKEN;
    if (!token) {
      throw new Error("QSTASH_TOKEN is not set in environment variables");
    }
    qstashClient = new Client({ token });
  }
  return qstashClient;
}

// Base URL helper
export function getBaseUrl(): string {
  // 1. Explicit app URL (recommended for production)
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }

  // 2. Vercel deployment URL (auto-set by Vercel)
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // 3. Local development fallback
  return "http://localhost:3000";
}

// Schedule management functions
export async function createNewsletterSchedule() {
  const client = getQStashClient();
  const baseUrl = getBaseUrl();
  const destination = `${baseUrl}/api/cron/send-newsletters`;

  // Check if schedule already exists
  const existing = await client.schedules.list();
  const found = existing.find((s) => s.destination === destination);

  if (found) {
    return { exists: true, schedule: found };
  }

  const schedule = await client.schedules.create({
    destination,
    cron: "* * * * *",
  });

  return { exists: false, schedule };
}

export async function listSchedules() {
  const client = getQStashClient();
  return client.schedules.list();
}

export async function deleteSchedule(scheduleId: string) {
  const client = getQStashClient();
  await client.schedules.delete(scheduleId);
}

export async function pauseSchedule(scheduleId: string) {
  const client = getQStashClient();
  await client.schedules.pause({ schedule: scheduleId });
}

export async function resumeSchedule(scheduleId: string) {
  const client = getQStashClient();
  await client.schedules.resume({ schedule: scheduleId });
}

export async function triggerNewsletterCron() {
  const client = getQStashClient();
  const baseUrl = getBaseUrl();

  const result = await client.publishJSON({
    url: `${baseUrl}/api/cron/send-newsletters`,
    body: { manual: true, triggeredAt: new Date().toISOString() },
  });

  return result;
}