"use client";

import Link from "next/link";
import { useEffect, useState, type MouseEvent } from "react";
import { track } from "@/lib/track";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Magnetic } from "@/components/Magnetic";

const ROLES = ["Data Engineer", "Analytics Engineer", "Gen AI Engineer"];
const SKILLS = [
  "Python",
  "SQL",
  "Databricks",
  "Airflow",
  "AWS",
  "Azure",
  "Spark",
  "Spark SQL",
  "PySpark",
  "Delta Lake",
  "Kafka",
  "ClickHouse",
  "dbt",
  "Power BI",
  "FastAPI",
  "RAG",
  "Data Quality",
  "ETL Pipelines",
];

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
      className="hover-ring group relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.03] p-6 shadow-soft transition-all duration-300 hover:border-white/20 md:p-8 lg:p-10"
      onMouseMove={withPointerGlow}
    >
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#6AD7FF]/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -left-24 h-80 w-80 rounded-full bg-[#F7B77C]/20 blur-3xl" />

      <div className="relative space-y-8">
        <div>
          <div className="chip transition-colors group-hover:border-white/20 group-hover:bg-white/[0.08]">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Open to AI + Data Engineering roles
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl"
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
            transition={{ duration: 0.65, ease: "easeOut", delay: 0.08 }}
            className="mt-4 max-w-3xl text-zinc-300"
          >
            I design end-to-end data products where interaction data becomes actionable insight in near real time.
          </motion.p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
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
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-5 md:p-6">
          <div className="text-xs uppercase tracking-[0.22em] text-zinc-400">About Me</div>
          <div className="mt-3 grid gap-3 md:grid-cols-[1.15fr_0.85fr] md:gap-3">
            <div className="space-y-2 text-sm leading-6 text-zinc-200">
              <p>
                I am a data engineer focused on building reliable, scalable data products that turn raw activity into
                decision-ready insights. I work across ingestion, modeling, orchestration, and quality validation to make
                analytics systems trustworthy for both business and technical teams.
              </p>
              <p>
                My recent work combines streaming pipelines and analytics engineering with Gen AI workflows, so organizations
                can move from fragmented data to actionable, production-grade outcomes.
              </p>
              <div className="grid gap-2.5 sm:grid-cols-2">
                <div className="hover-ring h-full rounded-2xl border border-white/10 bg-black/20 p-4" onMouseMove={withPointerGlow}>
                  <div className="text-xs uppercase tracking-widest text-zinc-400">Focus</div>
                  <div className="mt-2 text-sm text-zinc-200">Data products, platform observability, and analytics engineering.</div>
                </div>
                <div className="hover-ring h-full rounded-2xl border border-white/10 bg-black/20 p-4" onMouseMove={withPointerGlow}>
                  <div className="text-xs uppercase tracking-widest text-zinc-400">Explore</div>
                  <div className="mt-2 text-sm text-zinc-200">Projects, experience, certifications, contact, and telemetry.</div>
                </div>
              </div>
            </div>
            <div className="grid gap-2.5">
              <div className="hover-ring rounded-2xl border border-white/10 bg-black/20 p-4" onMouseMove={withPointerGlow}>
                <div className="text-xs uppercase tracking-widest text-zinc-400">Skills</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {SKILLS.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-xs text-zinc-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
