import { createClient, type RedisClientType } from "redis";

let clientPromise: Promise<RedisClientType> | null = null;

function getClient(): Promise<RedisClientType> {
  if (!clientPromise) {
    const client: RedisClientType = createClient({ url: process.env.REDIS_URL });
    client.on("error", (err) => console.error("Redis client error", err));
    clientPromise = client.connect().then(() => client);
  }
  return clientPromise;
}

export async function getJSON<T>(key: string, fallback: T): Promise<T> {
  const client = await getClient();
  const raw = await client.get(key);
  if (raw === null) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export async function putJSON(key: string, data: unknown): Promise<void> {
  const client = await getClient();
  await client.set(key, JSON.stringify(data));
}
