# Shubh Oswal | Data Engineer Portfolio

A production-style portfolio showcasing data engineering, analytics engineering, and GenAI project work, with optional streaming telemetry.

## Overview

This portfolio combines:
- Personal branding pages (`Home`, `Work`, `Experience`, `Certifications`, `Contact`)
- Project case-study pages (`/projects/[slug]`)
- Optional telemetry pipeline (`Next.js -> Kafka/Redpanda -> ClickHouse`)
- Interactive UI with motion, custom cursor, and polished components

## Features

- Modern multi-page portfolio built with Next.js App Router
- Dedicated project detail pages with architecture/metrics/highlights
- Flip-card experience section with organization logos
- Skills, certifications, and resume download support
- Optional telemetry dashboard (`/telemetry`) with fail-open demo mode
- Event tracking endpoint (`/api/track`) with resilient Kafka fallback

## Tech Stack

- Framework: Next.js (App Router), React, TypeScript
- UI/Styling: Tailwind CSS, Framer Motion
- Streaming/Analytics (optional): Kafka/Redpanda, ClickHouse
- Infrastructure (local): Docker Compose

## Project Structure

```text
app/
  api/
    track/
    telemetry/summary/
  projects/[slug]/
components/
content/
  projects.ts
  experience.ts
  certifications.ts
infra/
  clickhouse.sql
  clickhouse-local.sql
```

## Getting Started

1. Install dependencies

```bash
npm install
```

2. Configure environment

```bash
cp .env.example .env.local
```

3. Run development server

```bash
npm run dev
```

4. Open

- http://localhost:3000

## Environment Variables

```env
# Kafka
KAFKA_BROKERS=
KAFKA_API_KEY=
KAFKA_API_SECRET=
KAFKA_TOPIC=portfolio.events.v1
KAFKA_SASL=true
KAFKA_SSL=true

# ClickHouse
CLICKHOUSE_HOST=
CLICKHOUSE_USER=
CLICKHOUSE_PASSWORD=
CLICKHOUSE_DATABASE=default

# Optional
TELEMETRY_FAIL_OPEN=true
```

## Local Docker Setup (Kafka + ClickHouse)

1. Start services

```bash
docker compose up -d
```

2. Create Kafka topic

```bash
docker exec -it redpanda rpk topic create portfolio.events.v1 -p 3
```

3. Create ClickHouse local tables and ingestion

```bash
docker exec -i clickhouse clickhouse-client -u chadmin --password chadmin --multiquery < infra/clickhouse-local.sql
```

4. Use local env settings

```env
KAFKA_BROKERS=localhost:19092
KAFKA_TOPIC=portfolio.events.v1
KAFKA_SASL=false
KAFKA_SSL=false

CLICKHOUSE_HOST=http://localhost:8123
CLICKHOUSE_USER=chadmin
CLICKHOUSE_PASSWORD=chadmin
CLICKHOUSE_DATABASE=portfolio
```

5. Run app

```bash
npm run dev
```

## Telemetry Modes

### Live mode
Use production-accessible Kafka + ClickHouse credentials.

### Demo/fallback mode
If Kafka/ClickHouse is unavailable, the app degrades gracefully:
- `/api/track` returns success without breaking UX
- `/api/telemetry/summary` returns demo/fallback payload when `TELEMETRY_FAIL_OPEN=true`

## Deployment Notes

- You can deploy the portfolio UI independently of telemetry infra.
- For low-cost deployments, keep telemetry in demo mode.
- For real live telemetry in production, configure managed Kafka/ClickHouse.

## Release Notes

### Latest Updates

- Refreshed homepage layout and hierarchy for cleaner first-screen experience.
- Updated hero messaging, skills section, and About Me content density.
- Improved navbar branding with custom uploaded logo and hover interactions.
- Reworked Experience section into interactive flip cards with company logos.
- Expanded experience content from resume-aligned roles and achievements.
- Replaced Pipeline Observability project with StackOverflow Tag Prediction.
- Added resilient telemetry fail-open behavior for local/dev and demo scenarios.

## Author

Shubh Oswal

- LinkedIn: https://www.linkedin.com/in/shubhoswal2506
- GitHub: https://github.com/soswal2506
