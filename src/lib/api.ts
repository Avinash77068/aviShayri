import axios, { AxiosError } from "axios";
import type { ApiEnvelope } from "./types";

/**
 * Axios instance pointed at the backend REST API. `withCredentials` sends the
 * HTTP-only auth cookies set by the backend.
 */
export const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  timeout: 12000,
  headers: { Accept: "application/json" },
});

// Attempt a silent refresh once on 401, then retry the original request.
let refreshing: Promise<unknown> | null = null;
api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const original = error.config as (typeof error.config & { _retry?: boolean }) | undefined;
    if (error.response?.status === 401 && original && !original._retry && !original.url?.includes("/auth/")) {
      original._retry = true;
      try {
        refreshing = refreshing || api.post("/auth/refresh");
        await refreshing;
        refreshing = null;
        return api(original);
      } catch {
        refreshing = null;
      }
    }
    return Promise.reject(error);
  }
);

/** Unwrap the { success, data, meta } envelope. */
export async function unwrap<T>(promise: Promise<{ data: ApiEnvelope<T> }>) {
  const res = await promise;
  return { data: res.data.data, meta: res.data.meta };
}

export function isApiAvailable() {
  return typeof window !== "undefined";
}
