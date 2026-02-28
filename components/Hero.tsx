"use client";

import Link from "next/link";
import { useEffect, useState, type MouseEvent } from "react";
import { track } from "@/lib/track";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Magnetic } from "@/components/Magnetic";

const ROLES = ["Data Engineer", "Analytics Engineer", "Gen AI Engineer"];

function withPointerGlow(e: MouseEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  e.currentTarget.style.setProperty("--mx", `${x}px`);
  e.currentTarget.style.setProperty("--my", `${y}px`);
}

export function Hero() {
  const pathname = usePathname();
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setRoleIndex((x) => (x + 1) % ROLES.length);
    }, 1800);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section
      className="hover-ring group relative w-full overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.03] p-8 shadow-soft transition-all duration-300 hover:border-white/20 md:p-10 lg:p-12"
      onMouseMove={withPointerGlow}
    >
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#6AD7FF]/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -left-24 h-80 w-80 rounded-full bg-[#F7B77C]/20 blur-3xl" />

      <div className="relative mx-auto flex min-h-[calc(100vh-16rem)] w-full flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="chip w-fit transition-colors group-hover:border-white/20 group-hover:bg-white/[0.08]"
        >
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          Open to AI + Data Engineering roles
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.72, ease: "easeOut", delay: 0.05 }}
          className="mt-6 max-w-5xl text-4xl font-semibold tracking-tight md:text-6xl lg:text-7xl"
        >
          Building production-ready systems as a
          <span className="mt-2 block min-h-[1.15em]">
            <AnimatePresence mode="wait">
              <motion.span
                key={ROLES[roleIndex]}
                initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="role-glow inline-block"
              >
                {ROLES[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut", delay: 0.12 }}
          className="mt-4 max-w-3xl text-zinc-300"
        >
          I design end-to-end data products where interaction data becomes actionable insight in near real time.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.18 }}
          className="mt-7 flex flex-wrap items-center gap-3"
        >
          <Magnetic>
            <Link
              href="/projects"
              className="rounded-2xl bg-[#6AD7FF]/20 px-4 py-2 text-sm font-medium text-[#E9FAFF] ring-1 ring-[#6AD7FF]/35 hover:bg-[#6AD7FF]/30"
              onClick={() => track({ event_name: "button_click", element_id: "hero_view_projects", page: pathname })}
            >
              View work
            </Link>
          </Magnetic>

          <Magnetic>
            <a
              href="/telemetry"
              className="rounded-2xl bg-white/10 px-4 py-2 text-sm font-medium ring-1 ring-white/15 hover:bg-white/15"
              onClick={() => track({ event_name: "button_click", element_id: "hero_open_telemetry", page: pathname })}
            >
              Live telemetry
            </a>
          </Magnetic>

          <a
            href="https://github.com/soswal2506"
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl px-4 py-2 text-sm text-zinc-200 hover:bg-white/5"
            onClick={() => {
              track({ event_name: "button_click", element_id: "hero_github", page: pathname });
            }}
          >
            GitHub {"->"}
          </a>

        </motion.div>
      </div>
    </section>
  );
}
