import { Card } from "@/components/ui/Card";

const stages = [
  {
    title: "Browser UI",
    subtitle: "Next.js client",
    summary: "Captures user interactions.",
    chip: "User actions",
  },
  {
    title: "/api/track",
    subtitle: "Ingest endpoint",
    summary: "Validates and forwards events.",
    chip: "Ingest",
  },
  {
    title: "Kafka / Redpanda",
    subtitle: "Streaming buffer",
    summary: "Buffers event stream.",
    chip: "Stream",
  },
  {
    title: "ClickHouse",
    subtitle: "Analytics store",
    summary: "Stores data for fast queries.",
    chip: "Store & query",
  },
  {
    title: "Telemetry UI",
    subtitle: "Operational dashboard",
    summary: "Shows metrics and recent events.",
    chip: "Insights",
  },
];

export function PipelineArchitecture() {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 lg:grid-cols-5">
        {stages.map((s, idx) => (
          <div key={s.title} className="relative">
            <Card className="h-full">
              <div className="text-xs uppercase tracking-widest text-zinc-400">Stage {idx + 1}</div>
              <div className="mt-2 flex items-center justify-between gap-3">
                <div className="text-lg font-semibold">{s.title}</div>
                <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-zinc-200">
                  {s.chip}
                </span>
              </div>
              <div className="mt-1 text-sm text-zinc-300">{s.subtitle}</div>
              <div className="mt-3 text-sm leading-6 text-zinc-200">{s.summary}</div>
            </Card>
            {idx < stages.length - 1 ? (
              <div className="pointer-events-none absolute -bottom-2 left-1/2 hidden -translate-x-1/2 text-zinc-500 lg:-right-3 lg:bottom-auto lg:left-auto lg:top-1/2 lg:block lg:-translate-y-1/2">
                {"->"}
              </div>
            ) : null}
          </div>
        ))}
      </div>

      <Card className="bg-gradient-to-br from-[#D7BDA0]/8 to-[#995A42]/8">
        <div className="grid gap-3 md:grid-cols-3">
          <div>
            <div className="text-xs uppercase tracking-widest text-zinc-400">Partitioning</div>
            <div className="mt-1 text-sm text-zinc-200">Keeps session event order stable.</div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-zinc-400">Idempotency</div>
            <div className="mt-1 text-sm text-zinc-200">Prevents duplicate counting on retries.</div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-zinc-400">Analytics</div>
            <div className="mt-1 text-sm text-zinc-200">Powers near real-time dashboard views.</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
