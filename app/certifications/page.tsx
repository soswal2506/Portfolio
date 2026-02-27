import { Section } from "@/components/Section";
import { Certifications } from "@/components/Certifications";

export default function CertificationsPage() {
  return (
    <Section
      eyebrow="Credentials"
      title="Certifications"
      description="Verified credentials relevant to data engineering and Spark."
    >
      <Certifications />
    </Section>
  );
}
