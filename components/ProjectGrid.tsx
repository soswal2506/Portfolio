"use client";

import Link from "next/link";
import { projects } from "@/content/projects";
import { Card } from "@/components/ui/Card";
import { track } from "@/lib/track";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export function ProjectGrid({ limit }: { limit?: number }) {
  const pathname = usePathname();
  const items = limit ? projects.slice(0, limit) : projects;

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((p, idx) => (
        <motion.div
          key={p.slug}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          transition={{ duration: 0.55, ease: "easeOut", delay: idx * 0.03 }}
        >
          <Card className="group relative overflow-hidden">
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#D7BDA0]/10 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-lg font-semibold">{p.title}</div>
                <div className="mt-1 text-sm text-zinc-300">{p.subtitle}</div>
              </div>
              <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs text-zinc-200">
                {p.tag}
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {p.stack.slice(0, 6).map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-white/[0.04] px-2 py-1 text-xs text-zinc-200 ring-1 ring-white/5"
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="mt-5 flex items-center gap-3">
              <Link
                href={p.href}
                className="rounded-2xl bg-[#D7BDA0]/15 px-3 py-2 text-sm font-medium text-[#F3E9DC] ring-1 ring-[#D7BDA0]/25 hover:bg-[#D7BDA0]/20"
                onClick={() =>
                  track({
                    event_name: "project_open",
                    element_id: `project_${p.slug}`,
                    page: pathname,
                    props: { slug: p.slug },
                  })
                }
              >
                Open
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
                  Repo ↗
                </a>
              ) : null}
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
