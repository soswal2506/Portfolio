import { Section } from "@/components/Section";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";

export default function ExperiencePage() {
  return (
    <Section
      eyebrow="Experience"
      title="From raw data to trusted decisions"
      description="Production-first thinking: SLAs, data quality, and observability."
    >
      <ExperienceTimeline />
    </Section>
  );
}
