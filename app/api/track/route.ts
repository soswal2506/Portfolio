import { NextRequest } from "next/server";
import { randomUUID } from "crypto";
import { kafkaClient } from "@/lib/server/kafka";

const topic = process.env.KAFKA_TOPIC || "portfolio.events.v1";

// NOTE: In serverless environments, producers may reconnect frequently.
// For portfolio traffic, this is fine. For high traffic, move this into a small always-on ingest service.
let producerPromise: Promise<ReturnType<NonNullable<ReturnType<typeof kafkaClient>>["producer"]>> | null = null;

async function getProducer() {
  const kafka = kafkaClient();
  if (!kafka) return null;
  if (!producerPromise) {
    producerPromise = (async () => {
      const p = kafka.producer();
      await p.connect();
      return p;
    })().catch((err) => {
      producerPromise = null;
      throw err;
    });
  }
  return producerPromise;
}

function getIP(req: NextRequest) {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    ""
  );
}

function isLikelyBot(userAgent: string) {
  const ua = userAgent.toLowerCase();
  return ua.includes("bot") || ua.includes("crawler") || ua.includes("spider");
}

export async function POST(req: NextRequest) {
  const ua = req.headers.get("user-agent") || "";
  if (isLikelyBot(ua)) return Response.json({ ok: true });

  const body = await req.json().catch(() => null);
  if (!body?.event_name || !body?.element_id || !body?.page) {
    return Response.json({ ok: false, error: "Invalid event" }, { status: 400 });
  }

  // Anonymous session cookie (simple)
  const sidCookie = req.cookies.get("sid")?.value;
  const sessionId = sidCookie || `s_${randomUUID().replaceAll("-", "")}`;

  const event = {
    event_id: randomUUID(),
    ts: new Date().toISOString(),
    received_at: new Date().toISOString(),
    session_id: sessionId,
    event_name: String(body.event_name),
    element_id: String(body.element_id),
    page: String(body.page),
    referrer: req.headers.get("referer") || "",
    user_agent: ua,
    ip: getIP(req), // optional; you can remove if you don't want it
    props: body.props ?? {},
    v: 1,
  };

  try {
    const producer = await getProducer();
    if (producer) {
      await producer.send({
        topic,
        messages: [{ key: sessionId, value: JSON.stringify({ ...event, props: JSON.stringify(event.props) }) }],
      });
    } else {
      // No Kafka configured - best-effort success for dev.
      // You can log to console to verify events.
      console.log("[track]", event.event_name, event.element_id, event.page);
    }
  } catch (e: any) {
    producerPromise = null;
    console.error("[track] Kafka publish skipped:", e?.message ?? String(e));
  }

  const res = Response.json({ ok: true });

  if (!sidCookie) {
    res.headers.append(
      "Set-Cookie",
      `sid=${sessionId}; Path=/; Max-Age=2592000; SameSite=Lax`
    );
  }
  return res;
}
