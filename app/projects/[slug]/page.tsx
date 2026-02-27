import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/content/projects";
import { Card } from "@/components/ui/Card";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return notFound();

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <div className="text-xs uppercase tracking-widest text-zinc-400">{p.tag}</div>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{p.title}</h1>
        <p className="max-w-3xl text-zinc-300">{p.subtitle}</p>

        <div className="flex flex-wrap gap-2 pt-2">
          {p.stack.map((s) => (
            <span
              key={s}
              className="rounded-full bg-white/[0.04] px-2 py-1 text-xs text-zinc-200 ring-1 ring-white/5"
            >
              {s}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-3">
          {p.repo ? (
            <a
              href={p.repo}
              className="rounded-2xl bg-[#D7BDA0]/15 px-4 py-2 text-sm font-medium text-[#F3E9DC] ring-1 ring-[#D7BDA0]/25 hover:bg-[#D7BDA0]/20"
            >
              Repo ↗
            </a>
          ) : null}

          {p.demo ? (
            <Link
              href={p.demo}
              className="rounded-2xl bg-white/10 px-4 py-2 text-sm font-medium ring-1 ring-white/10 hover:bg-white/15"
            >
              Demo
            </Link>
          ) : null}

          <Link
            href="/projects"
            className="rounded-2xl px-4 py-2 text-sm text-zinc-200 hover:bg-white/5"
          >
            ← Back to work
          </Link>
        </div>
      </div>

      <Card>
        <h2 className="text-lg font-semibold">Overview</h2>
        <p className="mt-2 text-sm text-zinc-200">{p.overview}</p>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <h2 className="text-lg font-semibold">Problem</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-200">
            {p.problem.map((x) => <li key={x}>{x}</li>)}
          </ul>
        </Card>
        <Card>
          <h2 className="text-lg font-semibold">Solution</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-200">
            {p.solution.map((x) => <li key={x}>{x}</li>)}
          </ul>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <h2 className="text-lg font-semibold">Architecture</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-zinc-200">
            {p.architecture.map((x) => <li key={x}>{x}</li>)}
          </ol>
        </Card>
        <Card>
          <h2 className="text-lg font-semibold">Metrics</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-200">
            {p.metrics.map((x) => <li key={x}>{x}</li>)}
          </ul>
        </Card>
      </div>

      <Card>
        <h2 className="text-lg font-semibold">Highlights</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-200">
          {p.highlights.map((x) => <li key={x}>{x}</li>)}
        </ul>
      </Card>
    </div>
  );
}
