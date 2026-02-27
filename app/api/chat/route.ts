import { NextRequest } from "next/server";
import { answer } from "@/lib/server/portfolio-rag";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const message = String(body?.message ?? "").trim();

  if (!message) {
    return Response.json({ error: "Message is required." }, { status: 400 });
  }

  const result = answer(message);
  return Response.json({
    answer: result.answer,
    sources: result.sources,
    recommendedPage: result.recommendedPage,
  });
}
