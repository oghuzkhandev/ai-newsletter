"use client";

import { useState, useEffect } from "react";
import {
  Clock,
  Bell,
  Sun,
  Moon,
  Coffee,
  CalendarCheck,
  Globe,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { saveNewsletterSettingsAction } from "@/actions/save-newsletter-settings";

// Timezone listesi
const TIMEZONES = [
  { value: "Europe/Istanbul", label: "Istanbul (UTC+3)" },
  { value: "Europe/Amsterdam", label: "Amsterdam (UTC+2)" },
  { value: "Europe/London", label: "London (UTC+0)" },
  { value: "Europe/Berlin", label: "Berlin (UTC+2)" },
  { value: "Europe/Paris", label: "Paris (UTC+2)" },
  { value: "America/New_York", label: "New York (UTC-5)" },
  { value: "America/Los_Angeles", label: "Los Angeles (UTC-8)" },
  { value: "America/Chicago", label: "Chicago (UTC-6)" },
  { value: "Asia/Tokyo", label: "Tokyo (UTC+9)" },
  { value: "Asia/Dubai", label: "Dubai (UTC+4)" },
  { value: "Asia/Singapore", label: "Singapore (UTC+8)" },
  { value: "Australia/Sydney", label: "Sydney (UTC+11)" },
  { value: "UTC", label: "UTC" },
];

export default function NewsletterSetTime({
  initialSendTime,
  initialDays,
  initialTimezone,
}: {
  initialSendTime?: string | null;
  initialDays: string[];
  initialTimezone?: string | null;
}) {
  const [selectedHour, setSelectedHour] = useState(9);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [sendDaily, setSendDaily] = useState(true);
  const [timezone, setTimezone] = useState("UTC");
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const days = initialDays ?? [];

    if (initialSendTime) {
      const [h, m] = initialSendTime.split(":");
      setSelectedHour(Number(h));
      setSelectedMinute(Number(m));
    }

    setSelectedDays(days);
    setSendDaily(days.length === 0);

    // Timezone: kayıtlı varsa onu kullan, yoksa browser'dan algıla
    if (initialTimezone) {
      setTimezone(initialTimezone);
    } else {
      const detected = Intl.DateTimeFormat().resolvedOptions().timeZone;
      setTimezone(detected);
    }
  }, [initialSendTime, initialDays, initialTimezone]);

  const days = [
    { id: "mon", label: "M" },
    { id: "tue", label: "T" },
    { id: "wed", label: "W" },
    { id: "thu", label: "T" },
    { id: "fri", label: "F" },
    { id: "sat", label: "S" },
    { id: "sun", label: "S" },
  ];

  const toggleDay = (id: string) => {
    setSelectedDays((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };

  const getTimeOfDay = () => {
    if (selectedHour >= 7 && selectedHour < 12)
      return { icon: Coffee, gradient: "from-blue-100 to-amber-100" };

    if (selectedHour >= 12 && selectedHour < 17)
      return { icon: Sun, gradient: "from-blue-100 to-amber-200" };

    if (selectedHour >= 17 && selectedHour < 19)
      return { icon: Sun, gradient: "from-blue-200 to-orange-100" };

    return { icon: Moon, gradient: "from-blue-900 to-orange-100" };
  };

  const timeOfDay = getTimeOfDay();
  const TimeIcon = timeOfDay.icon;

  // Seçili timezone'daki şu anki saat
  const getCurrentTimeInTimezone = () => {
    try {
      return new Date().toLocaleTimeString("en-US", {
        timeZone: timezone,
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    } catch {
      return "";
    }
  };

  const handleSave = async () => {
    const sendTime = `${String(selectedHour).padStart(2, "0")}:${String(
      selectedMinute
    ).padStart(2, "0")}`;

    setIsSaved(true);

    await saveNewsletterSettingsAction({
      sendTime,
      days: sendDaily ? [] : selectedDays,
    });

    toast.success("Schedule saved!", {
      description: `${sendTime} (${timezone})`,
    });

    setTimeout(() => setIsSaved(false), 1500);
  };

  const formatTime = (h: number, m: number) => {
    const period = h >= 12 ? "PM" : "AM";
    const displayHour = h === 0 ? 12 : h > 12 ? h - 12 : h;
    return { hour: displayHour, minute: m.toString().padStart(2, "0"), period };
  };

  const formattedTime = formatTime(selectedHour, selectedMinute);

  // Timezone listesine browser'dan algılananı ekle (yoksa)
  const allTimezones = [...TIMEZONES];
  const detected = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (!allTimezones.find((tz) => tz.value === detected)) {
    allTimezones.unshift({ value: detected, label: `${detected} (Detected)` });
  }

  return (
    <Card className="shadow-lg border bg-white/80 backdrop-blur-xl rounded-2xl">
      <CardHeader className="space-y-2">
        <h2 className="text-xl font-semibold text-neutral-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-neutral-200 flex items-center justify-center shadow-md">
            <Bell className="w-5 h-5" />
          </div>
          Delivery Schedule
        </h2>

        <p className="text-sm text-neutral-500">
          Choose what time you want to receive your newsletter.
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* TIME DISPLAY */}
        <motion.div
          layout
          className={`rounded-2xl p-6 bg-gradient-to-br ${timeOfDay.gradient}`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-1">
              <motion.span className="font-mono text-5xl text-neutral-800">
                {formattedTime.hour}
              </motion.span>
              <span className="font-mono text-5xl text-neutral-400">:</span>
              <motion.span className="font-mono text-5xl text-neutral-800">
                {formattedTime.minute}
              </motion.span>
              <span className="text-sm ml-2 text-neutral-600">
                {formattedTime.period}
              </span>
            </div>

            <div className="w-10 h-10 rounded-lg bg-white/60 flex items-center justify-center">
              <TimeIcon className="w-5 h-5 text-neutral-700" />
            </div>
          </div>
        </motion.div>

        {/* TIMEZONE SELECTOR */}
        <div>
          <label className="block text-xs text-neutral-500 mb-2">
            Timezone
          </label>
          <div className="relative">
            <Globe className="absolute right-3 top-1/2 w-5 h-5 text-neutral-500 -translate-y-1/2" />
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full bg-neutral-100 rounded-xl px-4 py-3 border border-neutral-200 pr-10"
            >
              {allTimezones.map((tz) => (
                <option key={tz.value} value={tz.value}>
                  {tz.label}
                </option>
              ))}
            </select>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            Current time: {getCurrentTimeInTimezone()}
          </p>
        </div>

        {/* TIME PICKERS */}
        <div className="flex gap-3">
          {/* Hour */}
          <div className="flex-1">
            <label className="block text-xs text-neutral-500 mb-2">Hour</label>
            <div className="relative">
              <Clock className="absolute right-3 top-1/2 w-5 h-5 text-neutral-500 -translate-y-1/2" />
              <select
                value={selectedHour}
                onChange={(e) => setSelectedHour(Number(e.target.value))}
                className="w-full bg-neutral-100 rounded-xl px-4 py-3 border border-neutral-200 pr-10"
              >
                {Array.from({ length: 24 }).map((_, i) => (
                  <option key={i} value={i}>
                    {String(i).padStart(2, "0")}:00
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Minute */}
          <div className="flex-1">
            <label className="block text-xs text-neutral-500 mb-2">
              Minute
            </label>
            <div className="relative">
              <Clock className="absolute right-3 top-1/2 w-5 h-5 text-neutral-500 -translate-y-1/2" />
              <select
                value={selectedMinute}
                onChange={(e) => setSelectedMinute(Number(e.target.value))}
                className="w-full bg-neutral-100 rounded-xl px-4 py-3 border border-neutral-200 pr-10"
              >
                {[0, 15, 30, 45].map((m) => (
                  <option key={m} value={m}>
                    {String(m).padStart(2, "0")}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* DAILY TOGGLE */}
        <div
          onClick={() => setSendDaily(!sendDaily)}
          className="flex items-center justify-between p-4 rounded-xl bg-orange-100 border border-orange-200 cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center shadow">
              <CalendarCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="font-medium text-neutral-700">Daily Delivery</p>
              <p className="text-xs text-neutral-500">Send every day</p>
            </div>
          </div>

          <div
            className={`w-12 h-6 rounded-full p-1 transition ${
              sendDaily ? "bg-neutral-800" : "bg-neutral-300"
            }`}
          >
            <motion.div
              layout
              className="w-4 h-4 rounded-full bg-white shadow"
              style={{ marginLeft: sendDaily ? "auto" : 0 }}
            />
          </div>
        </div>

        {/* DAYS SELECT */}
        <AnimatePresence>
          {!sendDaily && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-3"
            >
              <label className="block text-sm text-neutral-500">
                Select Days
              </label>
              <div className="flex gap-2">
                {days.map((day) => (
                  <button
                    key={day.id}
                    onClick={() => toggleDay(day.id)}
                    className={`flex-1 p-3 rounded-xl text-sm font-medium ${
                      selectedDays.includes(day.id)
                        ? "bg-green-600 text-white"
                        : "bg-neutral-100 text-neutral-500"
                    }`}
                  >
                    {day.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* SAVE BUTTON */}
        <Button onClick={handleSave} className="w-full">
          {isSaved ? "Saved!" : "Save Schedule"}
        </Button>
      </CardContent>
    </Card>
  );
}
