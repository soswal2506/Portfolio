"use client";

import Image from "next/image";
import { useState } from "react";
import { experience } from "@/content/experience";

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
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {experience.map((x, idx) => {
        const flipped = activeIdx === idx;
        const logo = companyLogo(x.company);
        return (
          <button
            type="button"
            key={`${x.company}-${x.role}`}
            className="flip-scene group w-full text-left"
            onMouseEnter={() => setActiveIdx(idx)}
            onMouseLeave={() => setActiveIdx(null)}
            onClick={() => setActiveIdx((v) => (v === idx ? null : idx))}
          >
            <div className={`flip-inner relative h-[340px] md:h-[360px] ${flipped ? "is-flipped" : ""}`}>
              <div className="flip-face glass absolute inset-0 flex flex-col justify-between p-5 transition-colors group-hover:border-white/20 group-hover:bg-white/[0.06]">
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-zinc-400">Experience</div>
                  <div className="mt-2 flex items-start gap-3">
                    {logo ? (
                      <span className="relative mt-0.5 h-10 w-10 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
                        <Image src={logo} alt={`${x.company} logo`} fill sizes="40px" className="object-contain p-1.5" />
                      </span>
                    ) : null}
                    <div className="text-xl font-semibold tracking-tight text-zinc-100 md:text-2xl">
                      {shortRole(x.role)} <span className="text-zinc-300">@ {x.company}</span>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-zinc-300">{x.location}</div>
                </div>
                <div className="text-xs uppercase tracking-wider text-zinc-400">
                  {x.dates}
                  <span className="ml-2 text-zinc-500">(hover or tap to flip)</span>
                </div>
              </div>

              <div className="flip-face flip-back glass absolute inset-0 p-5">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {logo ? (
                      <span className="relative h-7 w-7 shrink-0 overflow-hidden rounded-md border border-white/10 bg-white/[0.03]">
                        <Image src={logo} alt={`${x.company} logo`} fill sizes="28px" className="object-contain p-1" />
                      </span>
                    ) : null}
                    <div className="text-sm font-semibold text-zinc-100">{x.role}</div>
                  </div>
                  <div className="text-xs text-zinc-400">{x.dates}</div>
                </div>
                <ul className="h-[calc(100%-2rem)] list-disc space-y-1.5 overflow-y-auto pr-1 pl-5 text-sm leading-[1.35rem] text-zinc-200">
                  {x.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
