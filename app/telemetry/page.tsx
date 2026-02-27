"use client";

import { useEffect, useState } from "react";
import { MetricCard } from "@/components/MetricCard";
import { Card } from "@/components/ui/Card";
import { EventContract } from "@/components/EventContract";

type WindowKey = "5m" | "1h" | "24h" | "today";

type Summary = {
  events_today: number;
  sessions_today: number;
  last_event_at: string | null;
  latency_p50_ms: number | null;
  latency_p95_ms: number | null;
  window_key?: WindowKey;
  window_label?: string;
  top_clicks: Array<{ element_id: string; cnt: number }>;
  top_pages: Array<{ page: string; cnt: number }>;
  events_by_name: Array<{ event_name: string; cnt: number }>;
  recent_events: Array<{
    ts: string;
    event_name: string;
    element_id: string;
    page: string;
    session_id: string;
  }>;
};

const WINDOW_OPTIONS: Array<{ key: WindowKey; label: string }> = [
  { key: "5m", label: "5m" },
  { key: "1h", label: "1h" },
  { key: "24h", label: "24h" },
  { key: "today", label: "Today" },
];

const PACIFIC_TZ = "America/Los_Angeles";

function toTitle(value: string) {
  return value
    .split(/[-_]/g)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function formatElementLabel(elementId: string) {
  const labels: Record<string, string> = {
    nav_home: "On-click Home",
    nav_work: "On-click Work",
    nav_experience: "On-click Experience",
    nav_certs: "On-click Certifications",
    nav_telemetry: "On-click Telemetry",
    resume_download: "On-click Resume Download",
    contact_click: "On-click Contact",
    hero_view_projects: "On-click Hero View Work",
    hero_open_telemetry: "On-click Hero Open Telemetry",
    hero_github: "On-click Hero GitHub",
    page: "Page View",
  };

  if (labels[elementId]) return labels[elementId];

  if (elementId.startsWith("project_")) {
    return `On-click Project Open: ${toTitle(elementId.slice("project_".length))}`;
  }
  if (elementId.startsWith("repo_")) {
    return `On-click Repo: ${toTitle(elementId.slice("repo_".length))}`;
  }
  if (elementId.startsWith("nav_")) {
    return `On-click ${toTitle(elementId.slice("nav_".length))}`;
  }

  return `On-click ${toTitle(elementId)}`;
}

function formatEventName(eventName: string) {
  const labels: Record<string, string> = {
    page_view: "Page View",
    nav_click: "Navigation Click",
    button_click: "Button Click",
    project_open: "Project Open",
    outbound_click: "Outbound Click",
  };
  return labels[eventName] ?? toTitle(eventName);
}

function formatPageLabel(page: string) {
  if (!page) return "(unknown page)";

  const [pathname] = page.split("?");
  const fixed: Record<string, string> = {
    "/": "Home",
    "/projects": "Projects",
    "/telemetry": "Telemetry",
  };

  if (fixed[pathname]) return fixed[pathname];

  if (pathname.startsWith("/projects/")) {
    return `Project: ${toTitle(pathname.slice("/projects/".length))}`;
  }

  return toTitle(pathname.replace(/^\//, "")) || page;
}

function parseTimestamp(value: string) {
  const normalized = /\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/.test(value)
    ? value.replace(" ", "T")
    : value;
  const withZone = /(?:Z|[+-]\d{2}:\d{2})$/.test(normalized) ? normalized : `${normalized}Z`;
  return new Date(withZone);
}

function formatTimePst(ts: string) {
  const d = parseTimestamp(ts);
  if (Number.isNaN(d.getTime())) return ts;
  return d.toLocaleTimeString([], {
    timeZone: PACIFIC_TZ,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
}

function formatDateTimePst(ts: string | null) {
  if (!ts) return "—";
  const d = parseTimestamp(ts);
  if (Number.isNaN(d.getTime())) return ts;
  return d.toLocaleString([], {
    timeZone: PACIFIC_TZ,
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
}

export default function TelemetryPage() {
  const [data, setData] = useState<Summary | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [windowKey, setWindowKey] = useState<WindowKey>("24h");

  useEffect(() => {
    let alive = true;

    async function load() {
      setErr(null);
      const res = await fetch(`/api/telemetry/summary?window=${windowKey}`, { cache: "no-store" });
      const json = await res.json().catch(() => null);
      if (!alive) return;
      if (!res.ok) {
        setErr(json?.error ?? "Failed to load telemetry");
        return;
      }
      setData(json);
    }

    void load();
    const id = setInterval(load, 5000);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, [windowKey]);

  const windowLabel = data?.window_label ?? WINDOW_OPTIONS.find((w) => w.key === windowKey)?.label ?? "Selected window";
  const clickLabel = `Clicks (${windowKey === "today" ? "today" : windowLabel.toLowerCase()})`;
  const sessionLabel = `Unique sessions (${windowKey === "today" ? "today" : windowLabel.toLowerCase()})`;
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">Telemetry</h1>
          <p className="text-zinc-300">
            Live clickstream analytics powered by Kafka to ClickHouse. Switch time windows and inspect recent events.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-1">
          {WINDOW_OPTIONS.map((opt) => {
            const active = windowKey === opt.key;
            return (
              <button
                key={opt.key}
                type="button"
                onClick={() => setWindowKey(opt.key)}
                className={[
                  "rounded-xl px-3 py-2 text-sm transition-colors",
                  active
                    ? "bg-[#D7BDA0]/15 text-[#F3E9DC] ring-1 ring-[#D7BDA0]/25"
                    : "text-zinc-300 hover:bg-white/5 hover:text-zinc-100",
                ].join(" ")}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {err && (
        <Card>
          <div className="text-sm text-rose-200">{err}</div>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard label={clickLabel} value={data?.events_today ?? "—"} />
        <MetricCard label={sessionLabel} value={data?.sessions_today ?? "—"} />
        <MetricCard label="Latency P50" value={data?.latency_p50_ms == null ? "—" : `${data.latency_p50_ms} ms`} />
        <MetricCard label="Latency P95" value={data?.latency_p95_ms == null ? "—" : `${data.latency_p95_ms} ms`} />
      </div>

      <Card>
        <div className="flex flex-col gap-2 text-sm text-zinc-200 md:flex-row md:items-center md:justify-between">
          <div>
            <span className="font-medium">Latency guide:</span> P50 is the typical ingestion time (median). P95 shows the
            slower tail (95% of events are this fast or faster).
          </div>
          <div className="text-xs uppercase tracking-widest text-zinc-400">{windowLabel}</div>
        </div>
      </Card>

      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Live Event Inspector</h2>
            <span className="text-xs text-zinc-400">latest interaction events (max 200)</span>
          </div>
          <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-black/20">
            <div className="grid grid-cols-[90px_120px_1fr] gap-2 border-b border-white/10 px-3 py-2 text-xs uppercase tracking-wider text-zinc-400 md:grid-cols-[90px_140px_1fr_1fr_110px]">
              <span>Time (PST)</span>
              <span>Event</span>
              <span>Element</span>
              <span className="hidden md:block">Page</span>
              <span className="hidden md:block">Session</span>
            </div>
            <div className="max-h-[360px] overflow-y-auto">
              {(data?.recent_events ?? []).map((e, idx) => (
                <div
                  key={`${e.session_id}-${e.ts}-${idx}`}
                  className="grid grid-cols-[90px_120px_1fr] gap-2 border-b border-white/5 px-3 py-2 text-sm text-zinc-200 last:border-b-0 md:grid-cols-[90px_140px_1fr_1fr_110px]"
                >
                  <span className="font-mono text-xs text-zinc-300">{formatTimePst(e.ts)}</span>
                  <span className="text-xs text-zinc-300">{formatEventName(e.event_name)}</span>
                  <span className="truncate">{formatElementLabel(e.element_id)}</span>
                  <span className="hidden truncate text-zinc-300 md:block">{formatPageLabel(e.page)}</span>
                  <span className="hidden font-mono text-xs text-zinc-400 md:block">{e.session_id.slice(0, 10)}</span>
                </div>
              ))}
              {!(data?.recent_events ?? []).length && (
                <div className="px-3 py-4 text-sm text-zinc-400">No interaction events yet.</div>
              )}
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold">Pipeline Health</h2>
          <div className="mt-4 space-y-3 text-sm text-zinc-200">
            <div className="flex items-center justify-between">
              <span className="text-zinc-400">Last event (PST)</span>
              <span className="truncate pl-3">{formatDateTimePst(data?.last_event_at ?? null)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-400">Refresh cadence</span>
              <span>Every 5s</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-400">Window</span>
              <span>{windowLabel}</span>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 p-4">
              <div className="text-xs uppercase tracking-wide text-zinc-300">Data engineering signals</div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-zinc-200">
                <li>Event schema + versioning</li>
                <li>Partitioning by session_id</li>
                <li>Streaming ingest into ClickHouse</li>
                <li>Operational latency monitoring (P50 / P95)</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Top Clicked Elements</h2>
            <span className="text-xs text-zinc-400">{windowLabel}</span>
          </div>
          <div className="mt-4 space-y-2">
            {(data?.top_clicks ?? []).slice(0, 8).map((x) => (
              <div key={x.element_id} className="flex items-center justify-between rounded-xl bg-zinc-900/60 px-3 py-2">
                <span className="text-sm text-zinc-200">{formatElementLabel(x.element_id)}</span>
                <span className="text-sm font-semibold">{x.cnt}</span>
              </div>
            ))}
            {!data?.top_clicks?.length && <div className="text-sm text-zinc-400">No click data yet.</div>}
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Top Pages</h2>
            <span className="text-xs text-zinc-400">by events</span>
          </div>
          <div className="mt-4 space-y-2">
            {(data?.top_pages ?? []).slice(0, 8).map((x) => (
              <div key={x.page} className="flex items-center justify-between rounded-xl bg-zinc-900/60 px-3 py-2">
                <span className="truncate pr-3 text-sm text-zinc-200">{formatPageLabel(x.page)}</span>
                <span className="text-sm font-semibold">{x.cnt}</span>
              </div>
            ))}
            {!data?.top_pages?.length && <div className="text-sm text-zinc-400">No page data yet.</div>}
          </div>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="space-y-1">
          <div className="text-xs uppercase tracking-widest text-zinc-400">Data Contract</div>
          <h2 className="text-2xl font-semibold tracking-tight">Event schema and contract</h2>
          <p className="text-zinc-300">
            A simple event model keeps the telemetry pipeline consistent, queryable, and extensible.
          </p>
        </div>
        <EventContract />
      </div>
    </div>
  );
}
