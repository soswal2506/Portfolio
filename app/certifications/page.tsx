import { Section } from "@/components/Section";
import { Certifications } from "@/components/Certifications";
import { Reveal } from "@/components/Reveal";

export default function CertificationsPage() {
  return (
    <Reveal>
      <div className="relative">
        <div className="pointer-events-none absolute -left-14 top-4 h-40 w-40 rounded-full bg-[#F7B77C]/10 blur-3xl" />
        <div className="pointer-events-none absolute right-6 top-24 h-44 w-44 rounded-full bg-[#6AD7FF]/10 blur-3xl" />
        <Section
          eyebrow="Credentials"
          title="Certifications"
          description="Verified credentials relevant to data engineering and Spark."
        >
          <Certifications />
        </Section>
      </div>
    </Reveal>
  );
}
