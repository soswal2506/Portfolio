import { Card } from "@/components/ui/Card";

const sampleEvent = `{
  "event_id": "0b7d3a9e-8d6a-4d7e-9b31-4ec1f16f7b7e",
  "ts": "2026-02-26T18:42:11.231Z",
  "session_id": "s_9f6a4c...",
  "event_name": "button_click",
  "element_id": "resume_download",
  "page": "/",
  "props": { "source": "nav" },
  "v": 1
}`;

const fields = [
  ["event_id", "UUID", "Idempotency key for dedupe / retries"],
  ["ts", "DateTime64(3)", "Event timestamp emitted by app"],
  ["session_id", "String", "Visitor session key and Kafka partition key"],
  ["event_name", "String", "Event type (page_view, nav_click, etc.)"],
  ["element_id", "String", "UI element identifier"],
  ["page", "String", "Route/path where event happened"],
  ["props", "JSON/String", "Extensible metadata payload"],
  ["v", "UInt8", "Schema version"],
];

export function EventContract() {
  return (
    <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
      <Card>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Sample Event Payload</h3>
          <span className="text-xs uppercase tracking-widest text-zinc-400">JSON</span>
        </div>
        <pre className="mt-4 overflow-x-auto rounded-2xl border border-white/10 bg-black/25 p-4 text-xs text-zinc-200">
          <code>{sampleEvent}</code>
        </pre>
      </Card>

      <Card>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Event Contract</h3>
          <span className="text-xs uppercase tracking-widest text-zinc-400">Schema</span>
        </div>
        <div className="mt-4 space-y-2">
          {fields.map(([name, type, desc]) => (
            <div key={name} className="rounded-xl border border-white/5 bg-white/[0.02] px-3 py-2">
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-xs text-[#D7BDA0]">{name}</span>
                <span className="font-mono text-xs text-zinc-400">{type}</span>
              </div>
              <div className="mt-1 text-sm text-zinc-200">{desc}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
