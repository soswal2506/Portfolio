import Link from "next/link";

export default function NotFound() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold">Project not found</h1>
      <p className="text-zinc-300">That link doesn’t exist. Head back to the projects list.</p>
      <Link href="/projects" className="rounded-2xl bg-white/10 px-4 py-2 text-sm font-medium ring-1 ring-white/10 hover:bg-white/15">
        Back to work
      </Link>
    </div>
  );
}
