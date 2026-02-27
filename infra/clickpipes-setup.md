# ClickPipes: Kafka -> ClickHouse (recommended)

Goal: ingest Kafka events into ClickHouse without running a consumer.

## Kafka topic
- Topic: `portfolio.events.v1`
- Partitions: 3 (fine for a portfolio)
- Retention: 7 days (cheap, enough for demos)

## ClickHouse Cloud
1. Create a service
2. Run `clickhouse.sql` to create tables
3. Create a ClickPipe:
   - Source: Kafka (Confluent Cloud recommended)
   - Topic: `portfolio.events.v1`
   - Data format: JSON
   - Target table: `events_raw`
   - Map JSON fields to columns

Tip: If you send `props` as a JSON string (as this repo does), map it to the `props` String column.
