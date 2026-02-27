"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Magnetic } from "@/components/Magnetic";
import { track } from "@/lib/track";

type ContactItem = {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  cta: string;
  external?: boolean;
  icon: React.ReactNode;
  accent: string;
};

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-10 w-10">
      <path
        fill="currentColor"
        d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3a1.97 1.97 0 1 0 0 3.94 1.97 1.97 0 0 0 0-3.94ZM20.44 13.42c0-3.1-1.65-4.54-3.84-4.54-1.77 0-2.56.97-3 1.65V8.5h-3.38V20h3.38v-6.38c0-1.68.32-3.31 2.4-3.31 2.04 0 2.06 1.91 2.06 3.42V20h3.38v-6.58Z"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-10 w-10">
      <path
        fill="currentColor"
        d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.18-3.37-1.18-.46-1.14-1.11-1.44-1.11-1.44-.9-.62.07-.61.07-.61 1 .07 1.52 1.02 1.52 1.02.88 1.51 2.31 1.08 2.87.82.09-.64.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.02A9.5 9.5 0 0 1 12 6.84a9.5 9.5 0 0 1 2.5.34c1.9-1.29 2.75-1.02 2.75-1.02.54 1.41.2 2.45.1 2.71.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.58 4.94.36.31.68.92.68 1.86v2.76c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"
      />
    </svg>
  );
}

function AtIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-10 w-10">
      <path
        fill="currentColor"
        d="M12 3a9 9 0 1 0 5.92 15.77l-1.3-1.54A6.98 6.98 0 1 1 19 12v1.19c0 .84-.27 1.49-1 1.49-.63 0-.94-.43-.94-1.1V9.5h-2v.58a3.36 3.36 0 0 0-2.74-1.33A3.74 3.74 0 0 0 8.6 12.6a3.72 3.72 0 0 0 3.63 3.85 3.21 3.21 0 0 0 2.83-1.42c.35 1 1.22 1.45 2.3 1.45 1.92 0 3.14-1.35 3.14-3.34V12A8.5 8.5 0 0 0 12 3Zm.58 11.56a1.94 1.94 0 0 1-1.91-2.05 1.94 1.94 0 1 1 3.87 0 1.94 1.94 0 0 1-1.96 2.05Z"
      />
    </svg>
  );
}

const CONTACTS: ContactItem[] = [
  {
    id: "contact_linkedin",
    title: "LinkedIn",
    subtitle: "www.linkedin.com/in/shubhoswal",
    href: "https://www.linkedin.com/in/shubhoswal",
    cta: "Open LinkedIn profile",
    external: true,
    icon: <LinkedInIcon />,
    accent: "from-sky-500/20 to-blue-500/10",
  },
  {
    id: "contact_github",
    title: "GitHub",
    subtitle: "github.com/soswal2506",
    href: "https://github.com/soswal2506",
    cta: "Open GitHub profile",
    external: true,
    icon: <GitHubIcon />,
    accent: "from-zinc-300/10 to-zinc-500/5",
  },
  {
    id: "contact_email",
    title: "Email",
    subtitle: "soswal2506@gmail.com",
    href: "mailto:soswal2506@gmail.com",
    cta: "Send an email",
    icon: <AtIcon />,
    accent: "from-[#D7BDA0]/20 to-[#995A42]/10",
  },
];

export default function ContactPage() {
  const pathname = usePathname();

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] p-8 shadow-soft">
        <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#D7BDA0]/12 blur-3xl" />
        <div className="absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-sky-500/10 blur-3xl" />

        <div className="relative space-y-3">
          <div className="text-xs uppercase tracking-[0.22em] text-zinc-400">Contact</div>
          <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
            Reach me through the channels I use most.
          </h1>
          <p className="max-w-2xl text-zinc-300">
            Choose LinkedIn for networking, GitHub for projects, or email for direct contact. All links open in a new
            tab except email.
          </p>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-3">
        {CONTACTS.map((item, idx) => {
          const commonProps = item.external ? { target: "_blank", rel: "noreferrer" as const } : {};
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05 * idx, ease: "easeOut" }}
            >
              <Magnetic>
                <a
                  href={item.href}
                  {...commonProps}
                  className="group block"
                  onClick={() => track({ event_name: "button_click", element_id: item.id, page: pathname })}
                >
                  <Card className="relative h-full min-h-[240px] overflow-hidden p-0">
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.accent} opacity-80`} />
                    <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
                    <div className="relative flex h-full flex-col justify-between p-6">
                      <div className="space-y-4">
                        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-white/5 text-[#F3E9DC] shadow-soft">
                          {item.icon}
                        </div>
                        <div>
                          <div className="text-2xl font-semibold tracking-tight text-zinc-50">{item.title}</div>
                          <div className="mt-2 break-all text-sm text-zinc-200">{item.subtitle}</div>
                        </div>
                      </div>

                      <div className="mt-6 flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-zinc-100">
                        <span>{item.cta}</span>
                        <span
                          aria-hidden="true"
                          className="text-lg transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                        >
                          ↗
                        </span>
                      </div>
                    </div>
                  </Card>
                </a>
              </Magnetic>
            </motion.div>
          );
        })}
      </div>

      <Card className="bg-gradient-to-r from-white/[0.04] to-white/[0.02]">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm font-semibold text-zinc-100">Preferred for opportunities</div>
            <div className="mt-1 text-sm text-zinc-300">LinkedIn + email are the fastest ways to reach me.</div>
          </div>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-100 hover:bg-white/10"
          >
            Back to Home
          </Link>
        </div>
      </Card>
    </div>
  );
}
