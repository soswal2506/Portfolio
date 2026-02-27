"use client";

import { useRef } from "react";
import { cn } from "@/lib/cn";

export function Magnetic({
  children,
  className,
  strength = 0.20,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <div
      ref={ref}
      className={cn("inline-block", className)}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
      }}
      onMouseLeave={() => {
        const el = ref.current;
        if (!el) return;
        el.style.transform = "translate(0px, 0px)";
      }}
      style={{ transition: "transform 140ms ease" }}
    >
      {children}
    </div>
  );
}
