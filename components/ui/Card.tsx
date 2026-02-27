import { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "glass p-5 transition-transform duration-200 ease-out hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06]",
        className
      )}
    >
      {children}
    </div>
  );
}
