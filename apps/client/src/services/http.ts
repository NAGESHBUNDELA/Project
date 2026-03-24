import type { ApiEnvelope } from "../types/api";

const API_BASE = import.meta.env.VITE_API_URL || "/api";
let token = "";

export const setHttpToken = (nextToken: string) => {
  token = nextToken;
};

const buildQuery = (params?: Record<string, string | number | boolean | undefined>) => {
  if (!params) return "";
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) search.set(key, String(value));
  }
  const query = search.toString();
  return query ? `?${query}` : "";
};

export async function http<T>(
  path: string,
  options: {
    method?: "GET" | "POST" | "PATCH" | "DELETE";
    params?: Record<string, string | number | boolean | undefined>;
    json?: unknown;
  } = {}
): Promise<T> {
  const headers = new Headers();
  headers.set("Content-Type", "application/json");
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const response = await fetch(`${API_BASE}${path}${buildQuery(options.params)}`, {
    method: options.method || "GET",
    headers,
    body: options.json !== undefined ? JSON.stringify(options.json) : undefined,
  });

  const payload = (await response.json()) as ApiEnvelope<T>;
  if (!response.ok || !payload.success) {
    throw new Error(payload.message || "Request failed");
  }
  return payload.data as T;
}
