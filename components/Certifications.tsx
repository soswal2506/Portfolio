"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { certs } from "@/content/certifications";

const accents = [
  "from-amber-400/35 to-orange-300/10",
  "from-sky-400/35 to-cyan-300/10",
  "from-violet-400/35 to-indigo-300/10",
];

export function Certifications() {
  return (
    <motion.div
      className="grid grid-cols-1 gap-5"
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.15 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
    >
      {certs.map((c, idx) => (
        <motion.a
          key={c.title}
          href={c.href}
          target="_blank"
          rel="noreferrer"
          className="group block"
          variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <Card className="relative h-full overflow-hidden p-6 transition-transform duration-200 group-hover:-translate-y-1 group-hover:border-white/20 group-hover:bg-white/[0.06] group-active:translate-y-0">
            <div className={`pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accents[idx % accents.length]}`} />

            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-xs font-semibold text-zinc-200">
                  {idx + 1}
                </div>
                <div>
                  <div className="text-lg font-semibold tracking-tight text-zinc-100 transition-colors group-hover:text-[#F3E9DC] md:text-xl">
                    {c.title}
                  </div>
                  <div className="mt-1 text-sm text-zinc-300">{c.issuer}</div>
                </div>
              </div>
              <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-zinc-300">{c.year}</span>
            </div>

            <div className="mt-4 text-sm leading-6 text-zinc-200">{c.notes}</div>

            <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#F7B77C]/15 px-2.5 py-1.5 text-sm text-[#FDEBDD] ring-1 ring-[#F7B77C]/25 transition-colors group-hover:bg-[#F7B77C]/22">
              <span>View credential</span>
              <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
                {"->"}
              </span>
            </div>
          </Card>
        </motion.a>
      ))}
    </motion.div>
  );
}
