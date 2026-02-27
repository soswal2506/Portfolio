import { certs } from "@/content/certifications";
import { experience } from "@/content/experience";
import { projects } from "@/content/projects";

type DocKind = "project" | "experience" | "certification";

export type RagDoc = {
  id: string;
  kind: DocKind;
  title: string;
  url: string;
  snippets: string[];
  tokenFreq: Map<string, number>;
  rawText: string;
};

export type PageSuggestion = {
  url: string;
  label: string;
  reason: string;
};

const STOPWORDS = new Set([
  "a", "an", "and", "are", "as", "at", "be", "by", "for", "from", "in", "into", "is", "it", "of", "on", "or", "that",
  "the", "to", "with", "you", "your", "this", "these", "those", "was", "were", "will", "can", "about", "under", "than",
  "my", "me", "our", "their", "they", "we", "i",
]);

function tokenize(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9+\-./ ]/g, " ")
    .split(/\s+/)
    .map((t) => t.trim())
    .filter((t) => t.length > 1 && !STOPWORDS.has(t));
}

function tokenFreq(tokens: string[]) {
  const map = new Map<string, number>();
  for (const t of tokens) {
    map.set(t, (map.get(t) ?? 0) + 1);
  }
  return map;
}

function buildDocs(): RagDoc[] {
  const projectDocs: RagDoc[] = projects.map((p) => {
    const snippets = [p.subtitle, p.overview, ...p.highlights.slice(0, 2), ...p.metrics.slice(0, 1)];
    const rawText = [p.title, p.tag, ...p.stack, ...snippets, ...p.problem, ...p.solution].join(" ");
    return {
      id: `project:${p.slug}`,
      kind: "project",
      title: p.title,
      url: p.href,
      snippets,
      tokenFreq: tokenFreq(tokenize(rawText)),
      rawText: rawText.toLowerCase(),
    };
  });

  const experienceDocs: RagDoc[] = experience.map((e, idx) => {
    const snippets = [...e.bullets.slice(0, 3)];
    const rawText = [e.role, e.company, e.location, e.dates, ...snippets].join(" ");
    return {
      id: `experience:${idx}`,
      kind: "experience",
      title: `${e.role} @ ${e.company}`,
      url: "/experience",
      snippets,
      tokenFreq: tokenFreq(tokenize(rawText)),
      rawText: rawText.toLowerCase(),
    };
  });

  const certDocs: RagDoc[] = certs.map((c, idx) => {
    const snippets = [c.notes, `${c.issuer} (${c.year})`];
    const rawText = [c.title, c.issuer, c.year, c.notes].join(" ");
    return {
      id: `cert:${idx}`,
      kind: "certification",
      title: c.title,
      url: "/certifications",
      snippets,
      tokenFreq: tokenFreq(tokenize(rawText)),
      rawText: rawText.toLowerCase(),
    };
  });

  return [...projectDocs, ...experienceDocs, ...certDocs];
}

const DOCS = buildDocs();

function kindBoost(question: string, kind: DocKind) {
  const q = question.toLowerCase();
  if ((q.includes("project") || q.includes("work")) && kind === "project") return 5;
  if ((q.includes("experience") || q.includes("role")) && kind === "experience") return 5;
  if ((q.includes("cert") || q.includes("certification")) && kind === "certification") return 5;
  if ((q.includes("gen ai") || q.includes("rag") || q.includes("llm")) && kind === "project") return 2;
  return 0;
}

function detectPageIntent(question: string): PageSuggestion | null {
  const q = question.toLowerCase();

  if (q.includes("work") || q.includes("project")) {
    return { url: "/projects", label: "Work Page", reason: "You asked about projects/work." };
  }
  if (q.includes("experience") || q.includes("role")) {
    return { url: "/experience", label: "Experience Page", reason: "You asked about experience/roles." };
  }
  if (q.includes("cert") || q.includes("certificate")) {
    return { url: "/certifications", label: "Certifications Page", reason: "You asked about certifications." };
  }
  if (q.includes("telemetry") || q.includes("pipeline")) {
    return { url: "/telemetry", label: "Telemetry Page", reason: "You asked about telemetry/pipeline." };
  }
  if (q.includes("contact")) {
    return { url: "/contact", label: "Contact Page", reason: "You asked about contact details." };
  }
  return null;
}

export function retrieve(question: string, topK = 3) {
  const q = question.trim().toLowerCase();
  const qTokens = tokenize(q);
  if (!qTokens.length) return [];

  const scored = DOCS.map((doc) => {
    let score = kindBoost(q, doc.kind);
    for (const tok of qTokens) {
      const freq = doc.tokenFreq.get(tok) ?? 0;
      score += freq * 1.5;
      if (doc.title.toLowerCase().includes(tok)) score += 3;
      if (doc.rawText.includes(` ${tok} `)) score += 0.5;
    }
    return { doc, score };
  })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, topK).map((x) => x.doc);
}

function topSnippets(doc: RagDoc, qTokens: string[], limit = 2) {
  const ranked = doc.snippets
    .map((s) => {
      const l = s.toLowerCase();
      const score = qTokens.reduce((acc, tok) => acc + (l.includes(tok) ? 1 : 0), 0);
      return { s, score };
    })
    .sort((a, b) => b.score - a.score);

  const picked = ranked.filter((x) => x.score > 0).slice(0, limit).map((x) => x.s);
  if (picked.length) return picked;
  return doc.snippets.slice(0, Math.min(limit, doc.snippets.length));
}

export function answer(question: string) {
  const q = question.trim();
  const pageIntent = detectPageIntent(q);
  if (!q) {
    return {
      answer:
        "Ask about my projects, experience, certifications, skills, or GenAI work. Example: 'Tell me about your RAG project.'",
      sources: [] as Array<{ label: string; url: string }>,
      recommendedPage: null as PageSuggestion | null,
    };
  }

  const docs = retrieve(q, 3);
  if (!docs.length) {
    return {
      answer:
        "I could not find a grounded answer in my portfolio content. Try asking about projects, experience, certifications, Kafka, Databricks, Spark, or GenAI.",
      sources: [] as Array<{ label: string; url: string }>,
      recommendedPage: pageIntent,
    };
  }

  const qTokens = tokenize(q);
  const bullets = docs.flatMap((d) => topSnippets(d, qTokens, 1)).slice(0, 3);
  const exact = bullets.map((b) => `- "${b}"`);
  const summary = [
    "Exact matches from my portfolio:",
    ...exact,
  ].join("\n");

  const fallbackPage = docs[0]?.url && docs[0].url.startsWith("/projects/")
    ? { url: "/projects", label: "Work Page", reason: "Top match is a project." }
    : docs[0]?.kind === "experience"
      ? { url: "/experience", label: "Experience Page", reason: "Top match is from experience." }
      : docs[0]?.kind === "certification"
        ? { url: "/certifications", label: "Certifications Page", reason: "Top match is from certifications." }
        : null;

  return {
    answer: summary,
    sources: docs.map((d) => ({ label: d.title, url: d.url })),
    recommendedPage: pageIntent ?? fallbackPage,
  };
}
