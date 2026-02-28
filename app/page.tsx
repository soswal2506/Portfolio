import { Hero } from "@/components/Hero";
import { Reveal } from "@/components/Reveal";
import { PipelineArchitecture } from "@/components/PipelineArchitecture";
import { HomeAbout } from "@/components/HomeAbout";

export default function Page() {
  return (
    <div className="snap-y snap-mandatory">
      <section className="snap-start">
        <Reveal>
          <div className="flex min-h-[calc(100vh-8rem)] items-center">
            <Hero />
          </div>
        </Reveal>
      </section>

      <section className="snap-start">
        <Reveal delay={0.05}>
          <div className="flex min-h-[calc(100vh-8rem)] items-center">
            <HomeAbout />
          </div>
        </Reveal>
      </section>

      <section className="snap-start">
        <Reveal delay={0.08}>
          <div className="flex min-h-[calc(100vh-8rem)] items-center">
            <section className="w-full space-y-5">
              <div className="space-y-2">
                <div className="text-xs uppercase tracking-widest text-zinc-400">Pipeline</div>
                <h2 className="text-2xl font-semibold tracking-tight">Streaming architecture in product</h2>
                <p className="text-zinc-300">
                  How interactions move from the website into the analytics pipeline and back into the telemetry dashboard.
                </p>
              </div>
              <PipelineArchitecture />
            </section>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
