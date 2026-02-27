"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";

const stages = [
  {
    title: "Web App",
    subtitle: "User interaction layer",
    summary: "Captures user actions and event context.",
    chip: "Capture",
    accent: "from-sky-400/30 to-cyan-300/10",
  },
  {
    title: "Event Ingest",
    subtitle: "API validation layer",
    summary: "Validates payloads and standardizes event shape.",
    chip: "Validate",
    accent: "from-indigo-400/30 to-sky-300/10",
  },
  {
    title: "Stream Buffer",
    subtitle: "Kafka / Redpanda",
    summary: "Decouples producers and analytics consumers.",
    chip: "Stream",
    accent: "from-violet-400/30 to-indigo-300/10",
  },
  {
    title: "Analytics Store",
    subtitle: "ClickHouse warehouse",
    summary: "Stores events for low-latency analytical queries.",
    chip: "Query",
    accent: "from-amber-400/30 to-orange-300/10",
  },
  {
    title: "Telemetry View",
    subtitle: "Operational dashboard",
    summary: "Presents trends, metrics, and recent activity.",
    chip: "Insight",
    accent: "from-emerald-400/30 to-cyan-300/10",
  },
];

const principles = [
  { title: "Ordering", text: "Session-level ordering is preserved for reliable behavior traces." },
  { title: "Idempotency", text: "Unique event IDs protect metrics from retry duplicates." },
  { title: "Freshness", text: "Near real-time ingestion keeps dashboard signals actionable." },
];

export function PipelineArchitecture() {
  return (
    <div className="space-y-5">
      <motion.div
        className="grid gap-4 lg:grid-cols-5"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
      >
        {stages.map((s, idx) => (
          <motion.div
            key={s.title}
            className="relative"
            variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <Card className="relative h-full overflow-hidden">
              <div className={`pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${s.accent}`} />

              <div className="flex items-center justify-between gap-3">
                <div className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-white/5 text-xs font-semibold text-zinc-200">
                  {idx + 1}
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-zinc-200">
                  {s.chip}
                </span>
              </div>

              <div className="mt-3 text-lg font-semibold tracking-tight text-zinc-100">{s.title}</div>
              <div className="mt-1 text-xs uppercase tracking-widest text-zinc-400">{s.subtitle}</div>
              <div className="mt-3 text-sm leading-6 text-zinc-200">{s.summary}</div>
            </Card>

            {idx < stages.length - 1 ? (
              <motion.div
                className="pointer-events-none absolute -bottom-2 left-1/2 hidden -translate-x-1/2 lg:-right-4 lg:bottom-auto lg:left-auto lg:top-1/2 lg:block lg:-translate-y-1/2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25 + idx * 0.08 }}
              >
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs text-zinc-300">
                  {"->"}
                </span>
              </motion.div>
            ) : null}
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Card className="bg-gradient-to-br from-[#6AD7FF]/10 via-[#8BA8FF]/8 to-[#F7B77C]/10">
          <div className="grid gap-3 md:grid-cols-3">
            {principles.map((p) => (
              <div key={p.title} className="rounded-xl border border-white/10 bg-black/20 p-3">
                <div className="text-xs uppercase tracking-widest text-zinc-400">{p.title}</div>
                <div className="mt-1 text-sm text-zinc-200">{p.text}</div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
