"use client";

import { Toaster } from "sonner";

export function ToasterProvider() {
  return (
    <Toaster
      position="top-center"
      richColors
      expand
      toastOptions={{
        duration: 5000,
        className:
          "px-6 py-4 rounded-2xl font-medium tracking-tight " +
          "backdrop-blur-3xl border shadow-lg transition-all " +
          "bg-white/40 border-white/30 text-gray-900 shadow-black/10 " +
          "dark:bg-black/40 dark:border-white/10 dark:text-white dark:shadow-black/40",
      }}
    />
  );
}
