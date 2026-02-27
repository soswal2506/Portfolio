export function Footer() {
  return (
    <footer className="border-t border-white/5">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 text-sm text-zinc-400 md:flex-row md:items-center md:justify-between">
        <div>© {new Date().getFullYear()} Shubh Oswal</div>
        <div className="flex gap-4">
          <a className="hover:text-zinc-200" href="/telemetry">Telemetry</a>
          <a className="hover:text-zinc-200" href="/projects">Work</a>
        </div>
      </div>
    </footer>
  );
}
