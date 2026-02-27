"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { Section } from "@/components/Section";
import { Card } from "@/components/ui/Card";

type ChatMessage = {
  role: "user" | "assistant";
  text: string;
  sources?: Array<{ label: string; url: string }>;
};

const SUGGESTIONS = [
  "Tell me about your GenAI projects.",
  "What is your experience with Databricks and Spark?",
  "What certifications do you have?",
  "Summarize your current role impact.",
];

export default function ChatbotPage() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      text:
        "Hi, I am Shubh's portfolio assistant. I answer from local portfolio content only (projects, experience, certifications), so this stays free and grounded.",
    },
  ]);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const disabled = loading || !input.trim();

  const canAsk = useMemo(() => !loading, [loading]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loading]);

  async function ask(message: string) {
    const question = message.trim();
    if (!question || !canAsk) return;

    setMessages((prev) => [...prev, { role: "user", text: question }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question }),
      });
      const json = await res.json().catch(() => null);
      if (!res.ok) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", text: json?.error ?? "Failed to get response." },
        ]);
        return;
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: String(json?.answer ?? "No response."),
          sources: Array.isArray(json?.sources) ? json.sources : [],
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Network error while querying the assistant.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    void ask(input);
  }

  return (
    <Section
      eyebrow="GenAI"
      title="Portfolio RAG Assistant"
      description="A free, local retrieval assistant built on top of my portfolio data. No paid LLM APIs."
    >
      <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="space-y-4">
          <div>
            <div className="text-sm font-semibold text-zinc-100">Try asking</div>
            <div className="mt-1 text-sm text-zinc-300">
              Questions are answered from projects, experience, and certifications only.
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-left text-sm text-zinc-200 hover:bg-white/10"
                onClick={() => void ask(s)}
                disabled={!canAsk}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-zinc-300">
            <div className="font-medium text-zinc-100">How this works</div>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Local retrieval over portfolio content files.</li>
              <li>Ranked matching by query terms + domain boosts.</li>
              <li>Grounded answer with source links.</li>
            </ul>
          </div>
        </Card>

        <Card className="flex min-h-[460px] flex-col">
          <div className="mb-3 text-sm font-semibold text-zinc-100">Chat</div>
          <div className="flex-1 space-y-3 overflow-y-auto rounded-2xl border border-white/10 bg-black/20 p-3">
            {messages.map((m, idx) => (
              <div
                key={`${m.role}-${idx}`}
                className={[
                  "max-w-[92%] rounded-2xl px-3 py-2 text-sm leading-6",
                  m.role === "user"
                    ? "ml-auto bg-[#6AD7FF]/20 text-zinc-100"
                    : "bg-white/8 text-zinc-200",
                ].join(" ")}
              >
                <div className="whitespace-pre-wrap">{m.text}</div>
                {m.role === "assistant" && m.sources?.length ? (
                  <div className="mt-2 border-t border-white/10 pt-2 text-xs text-zinc-300">
                    Sources:{" "}
                    {m.sources.map((s, i) => (
                      <span key={`${s.url}-${i}`}>
                        <a className="text-zinc-100 underline" href={s.url}>
                          {s.label}
                        </a>
                        {i < m.sources!.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
            {loading ? <div className="text-sm text-zinc-400">Thinking...</div> : null}
            <div ref={bottomRef} />
          </div>

          <form onSubmit={onSubmit} className="mt-3 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about projects, skills, experience, or certifications..."
              className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-zinc-100 outline-none ring-0 placeholder:text-zinc-500 focus:border-white/20"
            />
            <button
              type="submit"
              disabled={disabled}
              className="rounded-xl bg-[#6AD7FF]/20 px-4 py-2 text-sm font-medium text-zinc-100 ring-1 ring-[#6AD7FF]/35 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </Card>
      </div>
    </Section>
  );
}
