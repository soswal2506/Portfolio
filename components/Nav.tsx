"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { track } from "@/lib/track";
import { Magnetic } from "@/components/Magnetic";

const links = [
  { href: "/", label: "Home" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Work" },
  { href: "/certifications", label: "Certs" },
  { href: "/telemetry", label: "Telemetry" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0c1019]/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link
          href="/"
          className="group flex items-center gap-3"
          onClick={() => track({ event_name: "nav_click", element_id: "nav_home", page: pathname })}
        >
          <span className="relative inline-flex h-11 w-11 items-center justify-center transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-125 group-hover:rotate-3">
            <span className="pointer-events-none absolute inset-0 rounded-full bg-[#6AD7FF]/0 blur-md transition-colors duration-300 group-hover:bg-[#6AD7FF]/30" />
            <Image
              src="/Feb 26, 2026, 04_55_29 PM.png"
              alt="Shubh logo"
              fill
              sizes="44px"
              className="object-contain drop-shadow-[0_10px_22px_rgba(0,0,0,0.35)] transition-transform duration-300 group-hover:scale-105"
              priority
            />
          </span>
          <div className="leading-tight">
            <div className="font-display text-sm font-semibold">Shubh Oswal</div>
            <div className="text-xs text-zinc-400">AI + Data Engineering</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-2xl px-3 py-2 text-sm transition-all duration-200 ${
                  active
                    ? "bg-white/10 text-zinc-50 ring-1 ring-white/15"
                    : "text-zinc-200 hover:-translate-y-0.5 hover:bg-white/5 hover:text-zinc-50"
                }`}
                onClick={() => track({ event_name: "nav_click", element_id: `nav_${l.label.toLowerCase()}`, page: pathname })}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Magnetic>
            <a
              href="/Shubh_Oswal-Data_Engineer.pdf"
              download
              className="rounded-2xl bg-[#F7B77C]/20 px-3 py-2 text-sm font-medium text-[#FDEBDD] ring-1 ring-[#F7B77C]/35 hover:bg-[#F7B77C]/30"
              onClick={() => {
                track({ event_name: "button_click", element_id: "resume_download", page: pathname });
              }}
            >
              Resume
            </a>
          </Magnetic>

          <Link
            href="/contact"
            className="rounded-2xl px-3 py-2 text-sm text-zinc-200 hover:bg-white/5"
            onClick={() => {
              track({ event_name: "button_click", element_id: "contact_click", page: pathname });
            }}
          >
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
}
