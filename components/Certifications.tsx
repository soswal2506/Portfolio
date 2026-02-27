import { Card } from "@/components/ui/Card";
import { certs } from "@/content/certifications";

export function Certifications() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {certs.map((c) => (
        <a key={c.title} href={c.href} target="_blank" rel="noreferrer" className="group block">
          <Card className="h-full transition-transform duration-200 group-hover:-translate-y-1 group-hover:border-white/20 group-hover:bg-white/[0.06] group-active:translate-y-0">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-lg font-semibold transition-colors group-hover:text-[#F3E9DC]">{c.title}</div>
                <div className="mt-1 text-sm text-zinc-300">{c.issuer}</div>
              </div>
              <span className="text-xs text-zinc-400">{c.year}</span>
            </div>
            <div className="mt-4 text-sm text-zinc-200">{c.notes}</div>
            <div className="mt-4 inline-flex items-center gap-2 text-sm text-[#D7BDA0] transition-colors group-hover:text-[#F3E9DC]">
              <span>View credential</span>
              <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </div>
          </Card>
        </a>
      ))}
    </div>
  );
}
