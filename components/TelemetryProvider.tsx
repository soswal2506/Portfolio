"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { track } from "@/lib/track";

const PAGE_VIEW_DEDUPE_KEY = "telemetry:last_page_view";
const PAGE_VIEW_DEDUPE_MS = 1500;

export function TelemetryProvider() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const page = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");

    try {
      const raw = sessionStorage.getItem(PAGE_VIEW_DEDUPE_KEY);
      if (raw) {
        const last = JSON.parse(raw) as { page?: string; ts?: number };
        if (last.page === page && typeof last.ts === "number" && Date.now() - last.ts < PAGE_VIEW_DEDUPE_MS) {
          return;
        }
      }
      sessionStorage.setItem(PAGE_VIEW_DEDUPE_KEY, JSON.stringify({ page, ts: Date.now() }));
    } catch {
      // ignore sessionStorage issues and track best-effort
    }

    // Track a lightweight page_view on route change
    track({
      event_name: "page_view",
      element_id: "page",
      page,
    });
  }, [pathname, searchParams]);

  return null;
}
