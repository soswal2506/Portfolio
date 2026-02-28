"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { projects } from "@/content/projects";
import { track } from "@/lib/track";

const accents = [
  "from-sky-400/35 to-cyan-300/10",
  "from-indigo-400/35 to-sky-300/10",
  "from-violet-400/35 to-indigo-300/10",
  "from-amber-400/35 to-orange-300/10",
  "from-emerald-400/35 to-cyan-300/10",
  "from-fuchsia-400/35 to-violet-300/10",
];

export function ProjectGrid({ limit }: { limit?: number }) {
  const pathname = usePathname();
  const items = limit ? projects.slice(0, limit) : projects;

  return (
    <motion.div
      className="grid gap-4 md:grid-cols-2"
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.15 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
    >
      {items.map((p, idx) => (
        <motion.div
          key={p.slug}
          variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <Card className="group relative h-full overflow-hidden">
            <div className={`pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accents[idx % accents.length]}`} />
            <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/5 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-xs font-semibold text-zinc-200">
                  {idx + 1}
                </div>
                <div>
                  <div className="text-lg font-semibold tracking-tight text-zinc-100">{p.title}</div>
                  <div className="mt-1 text-sm text-zinc-300">{p.subtitle}</div>
                </div>
              </div>
              <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-zinc-200">
                {p.tag}
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {p.stack.slice(0, 6).map((s) => (
                <span key={s} className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-1 text-xs text-zinc-200">
                  {s}
                </span>
              ))}
            </div>

            <div className="mt-5 flex items-center gap-3">
              <Link
                href={p.href}
                className="rounded-2xl bg-[#6AD7FF]/20 px-3 py-2 text-sm font-medium text-zinc-100 ring-1 ring-[#6AD7FF]/35 hover:bg-[#6AD7FF]/30"
                onClick={() =>
                  track({
                    event_name: "project_open",
                    element_id: `project_${p.slug}`,
                    page: pathname,
                    props: { slug: p.slug },
                  })
                }
              >
                Open Case Study
              </Link>
              {p.repo ? (
                <a
                  href={p.repo}
                  className="rounded-2xl px-3 py-2 text-sm text-zinc-200 hover:bg-white/5"
                  onClick={() =>
                    track({
                      event_name: "outbound_click",
                      element_id: `repo_${p.slug}`,
                      page: pathname,
                      props: { repo: p.repo },
                    })
                  }
                >
                  Repo {"->"}
                </a>
              ) : null}
            </div>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
