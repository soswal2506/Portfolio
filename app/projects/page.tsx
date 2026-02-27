import { Section } from "@/components/Section";
import { ProjectGrid } from "@/components/ProjectGrid";

export default function ProjectsPage() {
  return (
    <Section
      eyebrow="Work"
      title="Projects"
      description="Click any project to open a dedicated page with architecture, metrics, and links."
    >
      <ProjectGrid />
    </Section>
  );
}
