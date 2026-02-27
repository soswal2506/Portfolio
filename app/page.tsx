import { Hero } from "@/components/Hero";
import { Reveal } from "@/components/Reveal";
import { PipelineArchitecture } from "@/components/PipelineArchitecture";
import { HomeAbout } from "@/components/HomeAbout";

export default function Page() {
  return (
    <div className="space-y-12">
      <Reveal>
        <section className="min-h-[calc(100vh-96px)]">
          <Hero />
        </section>
      </Reveal>

      <Reveal delay={0.05}>
        <HomeAbout />
      </Reveal>

      <Reveal delay={0.08}>
        <section className="space-y-5 pt-4 md:pt-10">
          <div className="space-y-2">
            <div className="text-xs uppercase tracking-widest text-zinc-400">Pipeline</div>
            <h2 className="text-2xl font-semibold tracking-tight">Streaming architecture in product</h2>
            <p className="text-zinc-300">
              How interactions move from the website into the analytics pipeline and back into the telemetry dashboard.
            </p>
          </div>
          <PipelineArchitecture />
        </section>
      </Reveal>
    </div>
  );
}
