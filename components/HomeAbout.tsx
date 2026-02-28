"use client";

import { motion } from "framer-motion";

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

export function HomeAbout() {
  return (
    <section className="relative flex items-center justify-center overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.03] px-6 py-10 text-center shadow-soft md:px-10">
      <div className="pointer-events-none absolute -left-24 top-12 h-64 w-64 rounded-full bg-[#6AD7FF]/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-64 w-64 rounded-full bg-[#F7B77C]/15 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative mx-auto w-full max-w-5xl space-y-5"
      >
        <div className="text-xs uppercase tracking-[0.24em] text-zinc-400">About Me</div>
        <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
          From raw data to clear, trusted decisions.
        </h2>
        <p className="mx-auto max-w-3xl text-base leading-8 text-zinc-300 md:text-lg">
          I build reliable data systems that combine analytics engineering, platform thinking, and GenAI workflows to turn
          fragmented data into measurable business outcomes.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.08 }}
          className="mx-auto max-w-4xl rounded-2xl border border-white/10 bg-black/20 p-4 text-left md:p-5"
        >
          <div className="text-xs uppercase tracking-widest text-zinc-400">Skills</div>
          <motion.div
            className="mt-3 flex flex-wrap gap-2"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.02 } },
            }}
          >
            {SKILLS.map((skill) => (
              <motion.span
                key={skill}
                variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
                className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-xs text-zinc-200"
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.12 }}
          className="mx-auto grid max-w-4xl gap-3 text-left sm:grid-cols-2"
        >
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="text-xs uppercase tracking-widest text-zinc-400">Focus</div>
            <div className="mt-2 text-sm leading-6 text-zinc-200">
              Data products, platform observability, and analytics engineering with production-first reliability.
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="text-xs uppercase tracking-widest text-zinc-400">Explore</div>
            <div className="mt-2 text-sm leading-6 text-zinc-200">
              Projects, experience, certifications, contact, telemetry, and a local RAG assistant.
            </div>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}
