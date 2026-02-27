export const experience = [
  {
    role: "Data Engineer",
    company: "Lirik Inc.",
    location: "Milpitas, CA",
    dates: "June 2025 - Present",
    bullets: [
      "Built analytics-ready curated datasets from payer, EHR, and adjudication data (10M+ records) using Databricks and Delta for downstream reporting.",
      "Improved data freshness from multi-day latency to under 4 hours by building incremental upsert pipelines and validation checks.",
      "Reduced pipeline failure rate by around 40% through stronger orchestration (retries, SLAs, backfills) and production defect remediation.",
      "Integrated S3, Secrets Manager, and Snowflake stages/COPY workflows to improve reliability and secure data movement."
    ],
  },
  {
    role: "Data Analyst",
    company: "Recreation & Wellbeing",
    location: "Madison, WI",
    dates: "June 2024 - August 2024",
    bullets: [
      "Designed and deployed ETL workflows in SQL notebooks, reducing manual reporting tasks and improving repeatability.",
      "Partnered with business stakeholders to build a Power BI dashboard used by 2,000+ users for operational decision-making.",
      "Developed analytic models for persona segmentation and campaign targeting, improving campaign effectiveness by 25%."
    ],
  },
  {
    role: "Data Engineer Associate",
    company: "Accenture",
    location: "Mumbai, India",
    dates: "September 2021 - July 2023",
    bullets: [
      "Engineered end-to-end ingestion pipelines with Azure Data Factory and PySpark for REST and transactional sources into Delta tables.",
      "Processed 100K+ records/day with improved operational stability through monitoring, alerting, and robust retry patterns.",
      "Optimized transformations in Synapse and Azure SQL, improving query performance by around 10% and dashboard responsiveness.",
      "Helped reduce recurring production incidents by 15% through proactive pipeline hardening and operational controls."
    ],
  },
];
