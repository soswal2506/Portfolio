type ClickHouseConfig = {
  host: string;
  user: string;
  password: string;
  database: string;
};

export function getClickHouseConfig(): ClickHouseConfig | null {
  const host = process.env.CLICKHOUSE_HOST;
  const user = process.env.CLICKHOUSE_USER;
  const password = process.env.CLICKHOUSE_PASSWORD;
  const database = process.env.CLICKHOUSE_DATABASE || "default";
  if (!host || !user || !password) return null;
  return { host, user, password, database };
}

export async function chQuery<T>(sql: string): Promise<T[]> {
  const cfg = getClickHouseConfig();
  if (!cfg) throw new Error("ClickHouse not configured");

  // ClickHouse HTTP interface: POST /?database=... with query in body
  const url = new URL(cfg.host);
  url.searchParams.set("database", cfg.database);
  // Ask for JSONEachRow output
  url.searchParams.set("default_format", "JSONEachRow");

  const res = await fetch(url.toString(), {
    method: "POST",
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Authorization": "Basic " + Buffer.from(`${cfg.user}:${cfg.password}`).toString("base64"),
    },
    body: sql,
    cache: "no-store",
  });

  const text = await res.text();
  if (!res.ok) throw new Error(`ClickHouse error: ${res.status} ${text}`);

  // JSONEachRow = one JSON per line
  const rows: T[] = [];
  for (const line of text.split("\n")) {
    const l = line.trim();
    if (!l) continue;
    rows.push(JSON.parse(l));
  }
  return rows;
}
