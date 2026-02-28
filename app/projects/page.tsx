import { Section } from "@/components/Section";
import { ProjectGrid } from "@/components/ProjectGrid";
import { Reveal } from "@/components/Reveal";

export default function ProjectsPage() {
  return (
    <Reveal>
      <div className="relative">
        <div className="pointer-events-none absolute -left-16 top-6 h-44 w-44 rounded-full bg-[#6AD7FF]/10 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-20 h-52 w-52 rounded-full bg-[#8b7dff]/10 blur-3xl" />
        <Section
          eyebrow="Work"
          title="Projects"
          description="Click any project to open a dedicated page with architecture, metrics, and links."
        >
          <ProjectGrid />
        </Section>
      </div>
    </Reveal>
  );
}
