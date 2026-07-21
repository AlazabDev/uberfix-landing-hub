export async function sha256Hex(input: string): Promise<string> {
  const buf = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", buf);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function randomTokenHex(bytes = 32): string {
  const arr = new Uint8Array(bytes);
  crypto.getRandomValues(arr);
  return Array.from(arr).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function computeContentHash(payload: {
  transcript_raw?: string | null;
  structured_data?: unknown;
  manual_summary?: string | null;
}): Promise<string> {
  return sha256Hex(
    JSON.stringify({
      t: payload.transcript_raw ?? "",
      s: payload.structured_data ?? null,
      m: payload.manual_summary ?? "",
    }),
  );
}
