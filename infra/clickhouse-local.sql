-- Local ClickHouse schema + Kafka ingestion (Kafka Engine)
-- Assumes:
--   Kafka broker: redpanda:9092
--   Topic: portfolio.events.v1

CREATE DATABASE IF NOT EXISTS portfolio;

-- Long-term storage table
CREATE TABLE IF NOT EXISTS portfolio.events_raw
(
  event_id UUID,
  ts DateTime64(3, 'UTC'),
  received_at DateTime64(3, 'UTC'),
  ingested_at DateTime64(3, 'UTC') DEFAULT now64(3),
  session_id String,
  event_name LowCardinality(String),
  element_id LowCardinality(String),
  page LowCardinality(String),
  referrer String,
  user_agent String,
  ip String,
  props String,
  v UInt8
)
ENGINE = ReplacingMergeTree(received_at)
PARTITION BY toDate(ts)
ORDER BY (toDate(ts), event_name, element_id, event_id);

-- Kafka "staging" table: keep fields as String to make parsing robust
CREATE TABLE IF NOT EXISTS portfolio.events_kafka
(
  event_id String,
  ts String,
  received_at String,
  session_id String,
  event_name String,
  element_id String,
  page String,
  referrer String,
  user_agent String,
  ip String,
  props String,
  v String
)
ENGINE = Kafka
SETTINGS
  kafka_broker_list = 'redpanda:9092',
  kafka_topic_list = 'portfolio.events.v1',
  kafka_group_name = 'clickhouse_portfolio_consumer',
  kafka_format = 'JSONEachRow',
  kafka_num_consumers = 1;

-- Materialized view consumes from Kafka table and inserts into events_raw
CREATE MATERIALIZED VIEW IF NOT EXISTS portfolio.mv_events_kafka_to_raw
TO portfolio.events_raw
AS
SELECT
  toUUID(event_id) AS event_id,
  parseDateTime64BestEffort(ts, 3, 'UTC') AS ts,
  parseDateTime64BestEffort(received_at, 3, 'UTC') AS received_at,
  session_id,
  CAST(event_name, 'LowCardinality(String)') AS event_name,
  CAST(element_id, 'LowCardinality(String)') AS element_id,
  CAST(page, 'LowCardinality(String)') AS page,
  referrer,
  user_agent,
  ip,
  props,
  toUInt8OrZero(v) AS v
FROM portfolio.events_kafka;

-- Optional rollup table
CREATE TABLE IF NOT EXISTS portfolio.events_daily
(
  day Date,
  event_name LowCardinality(String),
  element_id LowCardinality(String),
  cnt UInt64
)
ENGINE = SummingMergeTree
PARTITION BY day
ORDER BY (day, event_name, element_id);

CREATE MATERIALIZED VIEW IF NOT EXISTS portfolio.mv_events_daily
TO portfolio.events_daily
AS
SELECT
  toDate(ts) AS day,
  event_name,
  element_id,
  count() AS cnt
FROM portfolio.events_raw
GROUP BY day, event_name, element_id;
