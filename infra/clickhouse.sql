-- ClickHouse schema for telemetry

CREATE TABLE IF NOT EXISTS events_raw
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

-- Optional rollup table for cheap dashboards
CREATE TABLE IF NOT EXISTS events_daily
(
  day Date,
  event_name LowCardinality(String),
  element_id LowCardinality(String),
  cnt UInt64
)
ENGINE = SummingMergeTree
PARTITION BY day
ORDER BY (day, event_name, element_id);

CREATE MATERIALIZED VIEW IF NOT EXISTS mv_events_daily
TO events_daily
AS
SELECT
  toDate(ts) AS day,
  event_name,
  element_id,
  count() AS cnt
FROM events_raw
GROUP BY day, event_name, element_id;
