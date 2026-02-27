export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  tag: string;
  stack: string[];
  href: string;
  repo?: string;
  demo?: string;

  // Detail page content
  overview: string;
  problem: string[];
  solution: string[];
  metrics: string[];
  architecture: string[];
  highlights: string[];
};

export const projects: Project[] = [
  {
    slug: "kafka-clickstream",
    title: "Kafka Clickstream Telemetry",
    subtitle: "Next.js → Kafka → ClickHouse, with real-time dashboards + latency metrics.",
    tag: "Streaming",
    stack: ["Kafka", "ClickHouse", "Next.js", "TypeScript", "ClickPipes"],
    href: "/projects/kafka-clickstream",
    repo: "https://github.com/soswal2506/Portfolio",
    demo: "/telemetry",
    overview:
      "A production-shaped clickstream pipeline for my portfolio. Every meaningful interaction emits an event, lands in Kafka, and becomes queryable in ClickHouse within seconds.",
    problem: [
      "I wanted a portfolio that proves data engineering skills, not just screenshots.",
      "Most analytics tools are black boxes — I wanted a transparent pipeline with real streaming concepts."
    ],
    solution: [
      "Browser emits events (page_view, button_click, project_open) to a `/api/track` endpoint.",
      "API publishes JSON messages to a Kafka topic partitioned by `session_id`.",
      "ClickHouse ingests from Kafka (ClickPipes recommended) into `events_raw` and materializes rollups.",
      "Telemetry page queries ClickHouse to display freshness, latency P50/P95, and top clicks."
    ],
    metrics: [
      "End-to-end latency: P50/P95 (click → queryable).",
      "Freshness: last_event_at, events/day, sessions/day.",
      "Reliability: API 2xx rate, invalid event drop rate (extendable)."
    ],
    architecture: [
      "Next.js UI captures events",
      "/api/track publishes to Kafka topic portfolio.events.v1",
      "ClickHouse ingests Kafka → events_raw",
      "Materialized rollups → events_daily",
      "Telemetry dashboard queries ClickHouse"
    ],
    highlights: [
      "Partition key: session_id (keeps session ordering).",
      "Idempotency: unique event_id (safe retries).",
      "Low ops: managed Kafka + ClickPipes removes custom consumer service."
    ]
  },

  {
    slug: "epic-fhir-crm",
    title: "Epic FHIR → Lakehouse Integration",
    subtitle: "Secure integration layer ingesting scheduling/clinical data for downstream analytics/CRM.",
    tag: "Healthcare",
    stack: ["FastAPI", "FHIR", "Databricks", "Delta", "OAuth2"],
    href: "/projects/epic-fhir-crm",
    repo: "https://github.com/yourname/epic-fhir-ingestion",
    overview:
      "Built a secure integration layer that extracts scheduling and clinical data from Epic via FHIR APIs and lands it in a lakehouse for analytics and CRM workflows.",
    problem: [
      "Healthcare data is fragmented (EHR, claims, scheduling).",
      "We needed reliable ingestion with auditability and strong access controls."
    ],
    solution: [
      "Use FHIR REST endpoints with secure auth and scoped access.",
      "Land raw data to bronze tables, standardize to silver models, and publish curated gold marts.",
      "Add validations for completeness and schema drift handling."
    ],
    metrics: [
      "Data volume: millions of records across scheduling + clinical domains.",
      "Freshness improvements via incremental ingestion.",
      "Reduced manual effort for downstream CRM and analytics consumers."
    ],
    architecture: [
      "FHIR API extraction → raw landing",
      "Bronze/Silver/Gold modeling (Delta)",
      "Incremental upserts + validation checks",
      "Curated marts for BI/CRM"
    ],
    highlights: [
      "Secure-by-design integration patterns for regulated data.",
      "Medallion architecture to keep raw + curated layers separate.",
      "Operational checks to detect missing/late data."
    ]
  },

  {
    slug: "claims-evidence-agent",
    title: "Claims Evidence Agent (RAG)",
    subtitle: "Retrieve policy docs + generate citation-backed summaries for denial workflows.",
    tag: "GenAI",
    stack: ["RAG", "Python", "Vector Search", "Databricks"],
    href: "/projects/claims-evidence-agent",
    repo: "https://github.com/yourname/claims-evidence-agent",
    overview:
      "A retrieval-augmented assistant that finds supporting policy/claim documents and generates short, citation-backed summaries to speed up denial review workflows.",
    problem: [
      "Reviewers spend time searching across scattered policy documents.",
      "Summaries must be defensible and traceable to source evidence."
    ],
    solution: [
      "Index documents into a vector store for semantic retrieval.",
      "Use RAG to generate reviewer-friendly summaries with citations.",
      "Log prompts, sources, and outcomes to support audits."
    ],
    metrics: [
      "Reduced time-to-evidence for common denial cases.",
      "Higher consistency in reviewer notes.",
      "Citation coverage tracked per response."
    ],
    architecture: [
      "Documents → chunking → embedding → vector index",
      "Query → retrieve top-k evidence",
      "LLM summary generation with citations",
      "Output stored for reviewer workflows"
    ],
    highlights: [
      "Citation-first outputs for trust.",
      "Designed for enterprise guardrails and auditing.",
      "Fits naturally into existing data platforms."
    ]
  },

  {
    slug: "incremental-upserts",
    title: "Incremental Upsert Pipelines",
    subtitle: "Cut freshness from multi-day latency to <4 hours using incremental processing + validations.",
    tag: "ETL",
    stack: ["PySpark", "Delta", "Spark SQL", "Databricks Jobs"],
    href: "/projects/incremental-upserts",
    overview:
      "Designed incremental upsert pipelines to keep large tables current with predictable SLAs and strong correctness guarantees.",
    problem: [
      "Full reloads caused long runtimes and late dashboards.",
      "Schema drift and partial loads created trust issues."
    ],
    solution: [
      "Identify reliable change keys/watermarks.",
      "Use MERGE/UPSERT patterns with idempotent runs.",
      "Validate row counts, null rates, and business constraints."
    ],
    metrics: [
      "Freshness: multi-day → <4 hours (target).",
      "Reduced compute cost by avoiding full table scans.",
      "Lower incident rate with automated validations."
    ],
    architecture: [
      "Raw landing → incremental extract",
      "Transform → dedupe",
      "MERGE into Delta target",
      "DQ checks → publish"
    ],
    highlights: [
      "Idempotent design for safe retries.",
      "Backfill strategy supported via partitioned reruns.",
      "Monitoring hooks for SLA enforcement."
    ]
  },

  {
    slug: "lakehouse-modeling",
    title: "Lakehouse Medallion Modeling",
    subtitle: "Bronze/Silver/Gold tables optimized for BI and self-serve analytics.",
    tag: "Modeling",
    stack: ["Delta", "Spark SQL", "dbt", "Power BI"],
    href: "/projects/lakehouse-modeling",
    overview:
      "A clean medallion model that keeps raw data immutable while producing analytics-ready marts with consistent definitions.",
    problem: [
      "Teams needed self-serve analytics with consistent KPIs.",
      "Raw feeds had inconsistent schemas and late arrivals."
    ],
    solution: [
      "Bronze: immutable raw history.",
      "Silver: standardized types, deduped entities, conformed dimensions.",
      "Gold: marts for BI with stable schemas and documentation."
    ],
    metrics: [
      "Faster dashboard iteration thanks to stable gold tables.",
      "Lower rework from schema surprises.",
      "Clear ownership by layer and contract."
    ],
    architecture: [
      "Raw ingestion → bronze",
      "Standardization + joins → silver",
      "Marts + aggregates → gold",
      "BI tools query gold"
    ],
    highlights: [
      "Layer contracts reduce breaking changes.",
      "Conformed dimensions improve KPI alignment.",
      "Great foundation for ML features."
    ]
  },

  {
    slug: "stackoverflow-tag-prediction",
    title: "StackOverflow Tag Prediction",
    subtitle: "Multi-label ML system for recommending relevant tags from question content.",
    tag: "Machine Learning",
    stack: ["Python", "Scikit-learn", "NLP", "Multi-label Classification"],
    href: "/projects/stackoverflow-tag-prediction",
    overview:
      "Built at the University of Wisconsin-Madison, this project focused on developing a machine learning-based tag recommendation system for Stack Overflow questions.",
    problem: [
      "Stack Overflow questions often need multiple relevant tags for discoverability and routing.",
      "Manual tagging is inconsistent, time-consuming, and may miss key topics in the question body."
    ],
    solution: [
      "Developed a robust multi-label classification pipeline to assign multiple tags simultaneously from question content.",
      "Engineered text preprocessing and feature representations tailored for technical Q&A language.",
      "Evaluated model quality iteratively and improved performance across frequent and long-tail tags."
    ],
    metrics: [
      "Validated model behavior using precision, recall, and F1 scores.",
      "Improved consistency of tag recommendations compared to manual-only workflows.",
      "Enabled fast, scalable inference for multi-tag prediction."
    ],
    architecture: [
      "Question title/body preprocessing and normalization",
      "Feature extraction for text representation",
      "Multi-label classification training and validation",
      "Inference pipeline for simultaneous tag recommendation"
    ],
    highlights: [
      "Associated with University of Wisconsin-Madison.",
      "Spearheaded end-to-end model development and evaluation.",
      "Focused on practical recommendation quality for real Q&A content."
    ]
  }
];
