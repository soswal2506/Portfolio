import { ReactNode } from "react";

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="group space-y-5 rounded-[28px] border border-transparent p-2 transition-colors duration-200 hover:border-white/10 hover:bg-white/[0.02]"
    >
      <div className="space-y-2">
        <div className="text-xs uppercase tracking-widest text-zinc-400 transition-colors group-hover:text-zinc-300">{eyebrow}</div>
        <h2 className="text-2xl font-semibold tracking-tight transition-colors group-hover:text-[#F3E9DC] md:text-3xl">{title}</h2>
        {description ? <p className="max-w-2xl text-zinc-300">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}
