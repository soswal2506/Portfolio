"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

type ChatMessage = {
  role: "user" | "assistant";
  text: string;
  sources?: Array<{ label: string; url: string }>;
  recommendedPage?: { url: string; label: string; reason: string } | null;
};

const SUGGESTIONS = [
  "Tell me about your GenAI projects.",
  "What is your Databricks and Spark experience?",
  "Summarize your latest role impact.",
];

export function ChatbotDrawer() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      text: "Hi, I am Shubh's portfolio assistant. I answer from portfolio content only (projects, experience, certifications).",
    },
  ]);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const initialAssistantMessage: ChatMessage = {
    role: "assistant",
    text: "Hi, I am Shubh's portfolio assistant. I answer from portfolio content only (projects, experience, certifications).",
  };

  const disabled = loading || !input.trim();
  const canAsk = useMemo(() => !loading, [loading]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loading]);

  useEffect(() => {
    if (!open) return;
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAndReset();
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [open]);

  function closeAndReset() {
    setOpen(false);
    setInput("");
    setLoading(false);
    setMessages([initialAssistantMessage]);
  }

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
        setMessages((prev) => [...prev, { role: "assistant", text: json?.error ?? "Failed to get response." }]);
        return;
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: String(json?.answer ?? "No response."),
          sources: Array.isArray(json?.sources) ? json.sources : [],
          recommendedPage: json?.recommendedPage ?? null,
        },
      ]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", text: "Network error while querying the assistant." }]);
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    void ask(input);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-[85] inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-2 text-sm text-zinc-100 shadow-lg backdrop-blur-sm transition-transform duration-200 hover:scale-105 md:bottom-7 md:right-7"
      >
        <span className="relative h-9 w-9 overflow-hidden rounded-full ring-1 ring-white/20">
          <Image
            src="/Feb 26, 2026, 04_55_29 PM.png"
            alt="Chat with Shubh"
            fill
            sizes="36px"
            className="object-cover"
            priority
          />
        </span>
        <span className="rounded-full bg-white/0 px-1.5 py-0.5 text-xs font-medium text-zinc-100/85">
          Chat with me
        </span>
      </button>

      {open ? (
        <div className="fixed inset-0 z-[90]">
          <button
            type="button"
            aria-label="Close assistant"
            className="absolute inset-0 bg-black/45 backdrop-blur-[1px]"
            onClick={closeAndReset}
          />

          <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-white/10 bg-[#0c1019]/95 p-4 shadow-2xl">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-widest text-zinc-400">GenAI</div>
                <div className="text-lg font-semibold text-zinc-100">Portfolio Assistant</div>
              </div>
              <button
                type="button"
                onClick={closeAndReset}
                className="rounded-lg border border-white/10 px-2 py-1 text-xs text-zinc-300 hover:bg-white/10"
              >
                Close
              </button>
            </div>

            <div className="mb-3 flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-left text-xs text-zinc-200 hover:bg-white/10"
                  onClick={() => void ask(s)}
                  disabled={!canAsk}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto rounded-2xl border border-white/10 bg-black/20 p-3">
              {messages.map((m, idx) => (
                <div
                  key={`${m.role}-${idx}`}
                  className={[
                    "max-w-[92%] rounded-2xl px-3 py-2 text-sm leading-6",
                    m.role === "user" ? "ml-auto bg-[#6AD7FF]/20 text-zinc-100" : "bg-white/8 text-zinc-200",
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
                  {m.role === "assistant" && m.recommendedPage ? (
                    <div className="mt-2 rounded-xl border border-white/10 bg-white/[0.04] p-2 text-xs text-zinc-300">
                      <div className="mb-1">{m.recommendedPage.reason}</div>
                      <a
                        href={m.recommendedPage.url}
                        className="inline-flex rounded-lg bg-[#6AD7FF]/20 px-2.5 py-1 text-xs font-medium text-zinc-100 ring-1 ring-[#6AD7FF]/35 hover:bg-[#6AD7FF]/30"
                      >
                        Open {m.recommendedPage.label}
                      </a>
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
                placeholder="Ask about projects, experience, skills..."
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-zinc-100 outline-none placeholder:text-zinc-500 focus:border-white/20"
              />
              <button
                type="submit"
                disabled={disabled}
                className="rounded-xl bg-[#6AD7FF]/20 px-4 py-2 text-sm font-medium text-zinc-100 ring-1 ring-[#6AD7FF]/35 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Send
              </button>
            </form>
          </aside>
        </div>
      ) : null}
    </>
  );
}
