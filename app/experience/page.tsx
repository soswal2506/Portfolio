import { Section } from "@/components/Section";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { Reveal } from "@/components/Reveal";

export default function ExperiencePage() {
  return (
    <Reveal>
      <div className="relative">
        <div className="pointer-events-none absolute -left-14 top-8 h-40 w-40 rounded-full bg-[#6AD7FF]/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-10 bottom-4 h-44 w-44 rounded-full bg-[#F7B77C]/10 blur-3xl" />
        <Section
          eyebrow="Experience"
          title="From raw data to trusted decisions"
          description="Production-first thinking: SLAs, data quality, and observability."
        >
          <ExperienceTimeline />
        </Section>
      </div>
    </Reveal>
  );
}
