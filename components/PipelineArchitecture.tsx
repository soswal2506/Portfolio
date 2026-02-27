import { Card } from "@/components/ui/Card";

const stages = [
  {
    title: "Browser UI",
    subtitle: "Next.js client",
    summary: "Visitors interact with the site and lightweight events are captured in the background.",
    chip: "User actions",
  },
  {
    title: "/api/track",
    subtitle: "Ingest endpoint",
    summary: "A small API endpoint receives each event and prepares it for the pipeline.",
    chip: "Ingest",
  },
  {
    title: "Kafka / Redpanda",
    subtitle: "Streaming buffer",
    summary: "Events flow through a streaming layer so the website and analytics stay decoupled.",
    chip: "Stream",
  },
  {
    title: "ClickHouse",
    subtitle: "Analytics store",
    summary: "The event stream is stored and organized for fast analytics queries.",
    chip: "Store & query",
  },
  {
    title: "Telemetry UI",
    subtitle: "Operational dashboard",
    summary: "A live dashboard turns the data into metrics, trends, and recent activity views.",
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
            <div className="mt-1 text-sm text-zinc-200">
              Events are grouped so actions from the same visit stay in the right sequence.
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-zinc-400">Idempotency</div>
            <div className="mt-1 text-sm text-zinc-200">
              Unique event IDs make retries safer and help prevent duplicate counting.
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-zinc-400">Analytics</div>
            <div className="mt-1 text-sm text-zinc-200">
              Fast analytics queries power the live dashboard experience on the site.
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
