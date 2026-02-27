import { NextRequest } from "next/server";
import { chQuery, getClickHouseConfig } from "@/lib/server/clickhouse";

type WindowKey = "5m" | "1h" | "24h" | "today";

function getWindow(req: NextRequest): { key: WindowKey; label: string; sinceExpr: string } {
  const window = req.nextUrl.searchParams.get("window") as WindowKey | null;
  const since = req.nextUrl.searchParams.get("since");

  switch (window) {
    case "5m":
      return { key: "5m", label: "Last 5 minutes", sinceExpr: "now() - INTERVAL 5 MINUTE" };
    case "1h":
      return { key: "1h", label: "Last 1 hour", sinceExpr: "now() - INTERVAL 1 HOUR" };
    case "today":
      return { key: "today", label: "Today", sinceExpr: "toStartOfDay(now())" };
    case "24h":
      return { key: "24h", label: "Last 24 hours", sinceExpr: "now() - INTERVAL 1 DAY" };
    default:
      if (since) {
        return { key: "24h", label: "Custom", sinceExpr: `parseDateTimeBestEffort('${since}')` };
      }
      return { key: "24h", label: "Last 24 hours", sinceExpr: "now() - INTERVAL 1 DAY" };
  }
}

function demo() {
  return {
    events_today: 128,
    sessions_today: 43,
    last_event_at: new Date().toISOString(),
    latency_p50_ms: 120,
    latency_p95_ms: 650,
    window_key: "24h",
    window_label: "Last 24 hours",
    top_clicks: [
      { element_id: "hero_view_projects", cnt: 22 },
      { element_id: "resume_download", cnt: 18 },
      { element_id: "project_epic-fhir-crm", cnt: 12 },
      { element_id: "hero_open_telemetry", cnt: 10 },
    ],
    top_pages: [
      { page: "/", cnt: 52 },
      { page: "/telemetry", cnt: 31 },
      { page: "/projects", cnt: 24 },
    ],
    events_by_name: [
      { event_name: "page_view", cnt: 61 },
      { event_name: "nav_click", cnt: 28 },
      { event_name: "button_click", cnt: 24 },
      { event_name: "project_open", cnt: 15 },
    ],
    recent_events: [
      { ts: new Date().toISOString(), event_name: "nav_click", element_id: "nav_home", page: "/telemetry", session_id: "s_demo1" },
      { ts: new Date().toISOString(), event_name: "page_view", element_id: "page", page: "/", session_id: "s_demo1" },
      { ts: new Date().toISOString(), event_name: "button_click", element_id: "resume_download", page: "/", session_id: "s_demo2" },
    ],
  };
}

export async function GET(req: NextRequest) {
  const cfg = getClickHouseConfig();
  if (!cfg) {
    return Response.json(demo());
  }

  const { key: windowKey, label: windowLabel, sinceExpr } = getWindow(req);
  const failOpen = (process.env.TELEMETRY_FAIL_OPEN ?? "true") === "true";

  try {
    const [eventsToday] = await chQuery<{ c: number }>(`
      SELECT count() AS c
      FROM events_raw
      WHERE ts >= ${sinceExpr}
        AND event_name IN ('button_click','nav_click','project_open','outbound_click')
    `);

    const [sessionsToday] = await chQuery<{ c: number }>(`
      SELECT uniqExact(session_id) AS c
      FROM events_raw
      WHERE ts >= ${sinceExpr}
    `);

    const [lastEvent] = await chQuery<{ last_event_at: string }>(`
      SELECT toString(max(received_at)) AS last_event_at
      FROM events_raw
      WHERE ts >= ${sinceExpr}
    `);

    const [lat] = await chQuery<{ p50: number | null; p95: number | null }>(`
      SELECT
        if(isNaN(p50f), CAST(NULL, 'Nullable(Int64)'), toInt64(round(p50f))) AS p50,
        if(isNaN(p95f), CAST(NULL, 'Nullable(Int64)'), toInt64(round(p95f))) AS p95
      FROM
      (
        SELECT
          quantile(0.50)(dateDiff('millisecond', ts, ingested_at)) AS p50f,
          quantile(0.95)(dateDiff('millisecond', ts, ingested_at)) AS p95f
        FROM events_raw
        WHERE ts >= ${sinceExpr}
      )
     `);

    const top = await chQuery<{ element_id: string; cnt: number }>(`
      SELECT element_id, count() AS cnt
      FROM events_raw
      WHERE ts >= ${sinceExpr}
        AND event_name IN ('button_click','nav_click','project_open','outbound_click')
      GROUP BY element_id
      ORDER BY cnt DESC
      LIMIT 10
    `);

    const topPages = await chQuery<{ page: string; cnt: number }>(`
      SELECT page, count() AS cnt
      FROM events_raw
      WHERE ts >= ${sinceExpr}
      GROUP BY page
      ORDER BY cnt DESC
      LIMIT 10
    `);

    const byEventName = await chQuery<{ event_name: string; cnt: number }>(`
      SELECT event_name, count() AS cnt
      FROM events_raw
      WHERE ts >= ${sinceExpr}
      GROUP BY event_name
      ORDER BY cnt DESC
      LIMIT 10
    `);

    const recentEvents = await chQuery<{
      event_ts: string;
      event_name: string;
      element_id: string;
      page: string;
      session_id: string;
    }>(`
      SELECT
        toString(ts) AS event_ts,
        event_name,
        element_id,
        page,
        session_id
      FROM events_raw
      WHERE ts >= ${sinceExpr}
        AND event_name IN ('button_click','nav_click','project_open','outbound_click')
      ORDER BY received_at DESC
      LIMIT 200
    `);

    return Response.json({
      events_today: eventsToday?.c ?? 0,
      sessions_today: sessionsToday?.c ?? 0,
      last_event_at: lastEvent?.last_event_at ?? null,
      latency_p50_ms: lat?.p50 ?? null,
      latency_p95_ms: lat?.p95 ?? null,
      window_key: windowKey,
      window_label: windowLabel,
      top_clicks: top ?? [],
      top_pages: topPages ?? [],
      events_by_name: byEventName ?? [],
      recent_events: (recentEvents ?? []).map((e) => ({
        ts: e.event_ts,
        event_name: e.event_name,
        element_id: e.element_id,
        page: e.page,
        session_id: e.session_id,
      })),
    });
  } catch (e: any) {
    if (failOpen) {
      return Response.json({
        ...demo(),
        window_key: windowKey,
        window_label: windowLabel,
        warning: e?.message ?? "Telemetry query failed",
      });
    }
    return Response.json({ error: e?.message ?? "Telemetry query failed" }, { status: 500 });
  }
}
