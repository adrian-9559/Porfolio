import type { NextApiRequest, NextApiResponse } from "next";

/**
 * BFF proxy — forwards every frontend `/api/*` (and remapped root-prefix) call
 * to the backend, injecting the API key server-side and re-emitting the auth
 * cookies on the frontend domain. Keeps secrets out of the browser bundle.
 */

const BACKEND = (
  process.env.BACKEND_API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001"
).replace(/\/$/, "");
const API_KEY = process.env.BACKEND_API_KEY ?? process.env.API_KEY ?? "";
const IS_PROD = process.env.NODE_ENV === "production";

// Backend routers mounted at the root (NOT under /api/). The web calls them via
// /api/<prefix>/... and this proxy strips the /api prefix before forwarding.
const ROOT_PREFIXES = new Set([
  "auth",
  "users",
  "roles",
  "tools",
  "notifications",
  "contact",
  "api-keys",
  "admin",
  "health",
  "analytics",
]);

export const config = { api: { bodyParser: false } };

/** Re-emit a backend Set-Cookie on the frontend origin (same-site, httpOnly). */
function rewriteCookie(setCookie: string): string {
  const parts = setCookie.split(";").map((s) => s.trim());
  const attrs: Record<string, string> = {};

  for (const p of parts.slice(1)) {
    const eq = p.indexOf("=");
    const key = eq === -1 ? p.toLowerCase() : p.slice(0, eq).toLowerCase();
    const value = eq === -1 ? "" : p.slice(eq + 1);

    attrs[key] = value;
  }

  // Auth cookies must persist longer than the backend's 15-min access cookie so
  // the backend still receives a (possibly expired) access token and can rotate
  // it via the refresh cookie. Real expiry is enforced by the JWT server-side.
  const name = parts[0].split("=")[0] ?? "";
  const isAuth = name === "access_token" || name === "refresh_token";
  const maxAge = isAuth ? "604800" : attrs["max-age"];

  const out = [parts[0], "Path=/", "HttpOnly", "SameSite=Lax"];

  if (IS_PROD) out.push("Secure");
  if (maxAge !== undefined) out.push(`Max-Age=${maxAge}`);
  if (attrs["expires"]) out.push(`Expires=${attrs["expires"]}`);

  return out.join("; ");
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  const slug = Array.isArray(req.query.slug)
    ? req.query.slug
    : req.query.slug
      ? [req.query.slug]
      : [];
  const sub = slug.join("/");
  const isRoot = ROOT_PREFIXES.has(slug[0] ?? "");
  const query = req.url?.split("?")[1] ? `?${req.url.split("?")[1]}` : "";
  const target = `${BACKEND}${isRoot ? "" : "/api"}/${sub}${query}`;

  try {
    const chunks: Uint8Array[] = [];

    for await (const chunk of req)
      chunks.push(new Uint8Array(chunk as ArrayBuffer));
    const body = Buffer.concat(chunks);

    const headers: Record<string, string> = {};
    const forwarded = [
      "content-type",
      "accept",
      "accept-language",
      "user-agent",
      "x-requested-with",
    ];

    for (const h of forwarded) {
      const value = req.headers[h];

      if (typeof value === "string") headers[h] = value;
    }
    if (req.headers.cookie) headers["cookie"] = req.headers.cookie as string;
    if (API_KEY) headers["x-api-key"] = API_KEY;

    const hasBody = body.length > 0;
    const resp = await fetch(target, {
      method: req.method,
      headers,
      ...(hasBody
        ? { body }
        : req.method === "POST" ||
            req.method === "PATCH" ||
            req.method === "PUT"
          ? { body }
          : {}),
      redirect: "manual",
    });

    const respBody = new Uint8Array(await resp.arrayBuffer());

    const setCookies = resp.headers.getSetCookie
      ? resp.headers.getSetCookie()
      : [];

    if (setCookies.length > 0) {
      res.setHeader("set-cookie", setCookies.map(rewriteCookie));
    }

    resp.headers.forEach((value, key) => {
      const k = key.toLowerCase();
      if (
        k === "set-cookie" ||
        k === "content-length" ||
        k === "content-encoding" ||
        k === "transfer-encoding"
      )
        return;
      res.setHeader(key, value);
    });

    res.status(resp.status);
    res.end(Buffer.from(respBody));
  } catch (err) {
    res
      .status(502)
      .json({ success: false, data: null, error: "Backend unreachable" });
  }
}
