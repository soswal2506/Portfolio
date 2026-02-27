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
    slug: "covid19-azure-pipeline",
    title: "COVID-19 Data Engineering Pipeline (Azure)",
    subtitle: "End-to-end Azure pipeline from ingestion to curated SQL tables and Power BI analytics.",
    tag: "Azure",
    stack: ["Azure Data Factory", "ADLS Gen2", "Databricks", "PySpark", "Azure SQL", "Power BI"],
    href: "/projects/covid19-azure-pipeline",
    repo: "https://github.com/soswal2506/Covid-19-Data-Engineering-Pipeline",
    overview:
      "An end-to-end Azure data engineering solution that ingests public COVID-19 datasets, transforms raw files into curated layers, and serves analytics-ready tables for reporting.",
    problem: [
      "Public health datasets arrive in different files and formats, making unified analytics difficult.",
      "Reporting requires a reliable pipeline from ingestion to curated, query-friendly outputs."
    ],
    solution: [
      "Ingest ECDC COVID-19 CSV datasets and population TSV files into ADLS Gen2 raw zone with Azure Data Factory.",
      "Transform and standardize data using ADF Mapping Data Flows and Databricks PySpark notebooks.",
      "Load clean datasets into Azure SQL Database for downstream BI in Power BI."
    ],
    metrics: [
      "Unified multiple COVID-19 source feeds into a single analytics model.",
      "Enabled interactive dashboards for trends, country filters, and date-range analysis.",
      "Established a reusable raw-to-curated architecture for future data products."
    ],
    architecture: [
      "Public datasets and blob files -> ADF ingestion",
      "ADLS Gen2 raw zone -> ADF/Databricks transformations",
      "Curated clean zone in ADLS Gen2",
      "ADF load into Azure SQL analytical tables",
      "Power BI dashboards on top of Azure SQL"
    ],
    highlights: [
      "Hybrid transformation approach using low-code ADF plus code-based PySpark.",
      "Clear separation of raw and curated layers for maintainability.",
      "Architecture prepared for CI/CD, incremental loads, and data quality checks."
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
