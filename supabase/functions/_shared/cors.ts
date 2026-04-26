/**
 * Shared CORS for browser-callable Edge Functions.
 * A single `https://example.com` in ALLOWED_ORIGIN fails for `https://www.example.com`.
 * Use comma-separated origins in Supabase secrets, and/or rely on same-hostname www/apex matching.
 */
/** Browsers send Origin; local dev and Capacitor often use these hosts. */
function isLocalDevRequestOrigin(requestOrigin: string | null): boolean {
  if (!requestOrigin) return false;
  try {
    const { hostname } = new URL(requestOrigin);
    if (hostname === "localhost" || hostname === "127.0.0.1") {
      return true;
    }
    if (/^192\.168\.\d{1,3}\.\d{1,3}$/.test(hostname)) {
      return true;
    }
    if (/^10\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(hostname)) {
      return true;
    }
    if (/^172\.(1[6-9]|2\d|3[0-1])\.\d{1,3}\.\d{1,3}$/.test(hostname)) {
      return true;
    }
  } catch {
    // ignore
  }
  return false;
}

export function resolveAllowOrigin(req: Request): string {
  const raw = (Deno.env.get("ALLOWED_ORIGIN") ?? "*").trim();
  if (raw === "*") return "*";
  const list = raw.split(",").map((s) => s.trim()).filter(Boolean);
  const requestOrigin = req.headers.get("Origin");
  if (list.length === 0) return "*";

  if (requestOrigin && list.includes(requestOrigin)) return requestOrigin;

  if (requestOrigin) {
    for (const allowed of list) {
      try {
        const a = new URL(allowed);
        const o = new URL(requestOrigin);
        if (a.protocol === o.protocol && a.hostname.replace(/^www\./, "") === o.hostname.replace(/^www\./, "")) {
          return requestOrigin;
        }
      } catch {
        // ignore
      }
    }
  }

  if (requestOrigin && isLocalDevRequestOrigin(requestOrigin)) {
    return requestOrigin;
  }
  return list[0]!;
}

export function buildCorsHeaders(req: Request, allowMethods: string) {
  return {
    "Access-Control-Allow-Origin": resolveAllowOrigin(req),
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": allowMethods,
    "Access-Control-Max-Age": "86400",
  };
}
