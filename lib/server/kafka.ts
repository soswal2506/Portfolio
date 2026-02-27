import { Kafka, logLevel } from "kafkajs";

export function kafkaClient() {
  const brokers = (process.env.KAFKA_BROKERS || "")
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);

  if (!brokers.length) return null;

  const ssl = (process.env.KAFKA_SSL ?? "true") === "true";
  const saslEnabled = (process.env.KAFKA_SASL ?? "true") === "true";

  const apiKey = process.env.KAFKA_API_KEY;
  const apiSecret = process.env.KAFKA_API_SECRET;

  // If SASL is enabled, require creds. If not, allow PLAINTEXT local brokers.
  const sasl =
    saslEnabled
      ? (apiKey && apiSecret
          ? { mechanism: "plain" as const, username: apiKey, password: apiSecret }
          : null)
      : undefined;

  if (saslEnabled && !sasl) return null;

  return new Kafka({
    clientId: "portfolio-tracker",
    brokers,
    ssl,
    sasl: sasl ?? undefined,
    logLevel: logLevel.NOTHING,
  });
}
