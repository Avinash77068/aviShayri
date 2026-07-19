import axios, { AxiosError, AxiosHeaders } from "axios";
import type { ApiEnvelope } from "./types";

/**
 * Axios instance pointed at the backend REST API. `withCredentials` sends the
 * HTTP-only auth cookies set by the backend.
 */
export const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
const AUTH_TOKEN_STORAGE_KEY = "auth_access_token";
const AUTH_TOKEN_COOKIE_NAME = "auth_access_token";

function readCookie(name: string) {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function writeCookie(name: string, value: string | null) {
  if (typeof document === "undefined") return;
  if (value) {
    document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=604800; SameSite=Lax`;
  } else {
    document.cookie = `${name}=; Path=/; Max-Age=0; SameSite=Lax`;
  }
}

export function getStoredAuthToken() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(AUTH_TOKEN_STORAGE_KEY) || readCookie(AUTH_TOKEN_COOKIE_NAME);
}

export function setAuthToken(token: string | null) {
  if (typeof window === "undefined") return;
  if (token) {
    window.localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);
    writeCookie(AUTH_TOKEN_COOKIE_NAME, token);
  } else {
    window.localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
    writeCookie(AUTH_TOKEN_COOKIE_NAME, null);
  }
}

export function clearAuthToken() {
  setAuthToken(null);
}

export const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  timeout: 12000,
  headers: { Accept: "application/json" },
});

api.interceptors.request.use((config) => {
  const token = getStoredAuthToken();
  if (token) {
    config.headers = new AxiosHeaders(config.headers);
    config.headers.set("Authorization", `Bearer ${token}`);
  }
  return config;
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
