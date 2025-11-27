"use client";

import { useRouter, usePathname } from "next/navigation";

export function useChangeLocale() {
  const router = useRouter();
  const pathname = usePathname();

  return (locale: string) => {
    const segments = pathname.split("/");
    segments[1] = locale;
    router.push(segments.join("/"));
  };
}
