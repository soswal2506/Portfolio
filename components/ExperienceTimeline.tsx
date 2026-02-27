"use client";

import Image from "next/image";
import { useState } from "react";
import { experience } from "@/content/experience";

const accents = [
  "from-sky-400/35 to-cyan-300/10",
  "from-indigo-400/35 to-sky-300/10",
  "from-violet-400/35 to-indigo-300/10",
];

function shortRole(role: string) {
  return role.split("/")[0].trim();
}

function companyLogo(company: string) {
  const c = company.toLowerCase();
  if (c.includes("lirik")) return "/logos/lirik.jpg";
  if (c.includes("accenture")) return "/logos/Accenture-Logo.png";
  if (c.includes("recreation") || c.includes("wellbeing") || c.includes("uw")) return "/logos/uwmad-logo.png";
  return null;
}

export function ExperienceTimeline() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = experience[activeIdx];
  const activeLogo = companyLogo(active.company);
  const activeAccent = accents[activeIdx % accents.length];

  return (
    <div className="grid gap-4 xl:grid-cols-[0.9fr_1.4fr]">
        <div className="grid gap-3">
          {experience.map((x, idx) => {
            const logo = companyLogo(x.company);
            const accent = accents[idx % accents.length];
            const isActive = idx === activeIdx;

            return (
              <button
                type="button"
                key={`${x.company}-${x.role}`}
                onMouseEnter={() => setActiveIdx(idx)}
                onFocus={() => setActiveIdx(idx)}
                className={`glass glass-fancy relative overflow-hidden rounded-2xl p-4 text-left transition-colors ${
                  isActive ? "border-white/30 bg-white/[0.08]" : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]"
                }`}
              >
                <div className={`pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accent}`} />
                <div className="flex items-start gap-3">
                  {logo ? (
                    <span className="relative mt-0.5 h-10 w-10 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
                      <Image src={logo} alt={`${x.company} logo`} fill sizes="40px" className="object-contain p-1.5" />
                    </span>
                  ) : null}
                  <div>
                    <div className="text-base font-semibold tracking-tight text-zinc-100">
                      {shortRole(x.role)} <span className="text-zinc-300">@ {x.company}</span>
                    </div>
                    <div className="mt-1 text-sm text-zinc-300">{x.location}</div>
                    <div className="mt-1 text-xs uppercase tracking-wider text-zinc-400">{x.dates}</div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <article className="glass glass-fancy relative min-h-[420px] overflow-hidden rounded-[24px] p-5 md:p-6">
          <div className={`pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${activeAccent}`} />
          <div className="text-xs uppercase tracking-[0.2em] text-zinc-400">Experience Detail View</div>
          <div className="mt-3 flex items-start gap-3">
            {activeLogo ? (
              <span className="relative mt-0.5 h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
                <Image src={activeLogo} alt={`${active.company} logo`} fill sizes="44px" className="object-contain p-1.5" />
              </span>
            ) : null}
            <div>
              <h3 className="text-xl font-semibold text-zinc-100 md:text-2xl">
                {active.role} <span className="text-zinc-300">@ {active.company}</span>
              </h3>
              <div className="mt-1 text-sm text-zinc-300">{active.location}</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-zinc-400">{active.dates}</div>
            </div>
          </div>
          <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-4">
            <div className="text-xs uppercase tracking-[0.16em] text-zinc-400">What I Delivered</div>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-[1.45rem] text-zinc-200">
              {active.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
          <div className="mt-4 text-xs uppercase tracking-[0.16em] text-cyan-200/80">
            Hover any card to open its details in this in-page panel
          </div>
        </article>
    </div>
  );
}
