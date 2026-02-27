type TrackEvent = {
  event_name: string;
  element_id: string;
  page: string;
  props?: Record<string, any>;
};

export function track(event: TrackEvent) {
  // Avoid breaking UX — telemetry should be best-effort.
  try {
    const payload = JSON.stringify(event);

    // Prefer sendBeacon for unload safety.
    // Fallback to fetch with keepalive.
    const ok = typeof navigator !== "undefined" && "sendBeacon" in navigator
      ? navigator.sendBeacon("/api/track", new Blob([payload], { type: "application/json" }))
      : false;

    if (!ok) {
      void fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        keepalive: true,
        body: payload,
      });
    }
  } catch {
    // ignore
  }
}
