// Edge-compatible (Web Crypto only, no `node:crypto`/Buffer) so this can be
// shared between middleware (edge runtime) and server actions (node runtime).

export const ADMIN_COOKIE_NAME = "admin_session";
const SESSION_VALUE = "admin";

function toHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function hmac(secret: string, message: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(message));
  return toHex(sig);
}

export async function createSessionCookieValue(secret: string): Promise<string> {
  return `${SESSION_VALUE}.${await hmac(secret, SESSION_VALUE)}`;
}

export async function isValidSessionCookie(
  cookieValue: string | undefined,
  secret: string
): Promise<boolean> {
  if (!cookieValue) return false;
  const [value, signature] = cookieValue.split(".");
  if (value !== SESSION_VALUE || !signature) return false;
  const expected = await hmac(secret, SESSION_VALUE);
  if (expected.length !== signature.length) return false;
  let mismatch = 0;
  for (let i = 0; i < expected.length; i++) {
    mismatch |= expected.charCodeAt(i) ^ signature.charCodeAt(i);
  }
  return mismatch === 0;
}

export function constantTimeEquals(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}
