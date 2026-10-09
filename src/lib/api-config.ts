const configuredApiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api/v1";

/** Shared API origin for browser requests and server-rendered page data. */
export const API_BASE = configuredApiBase.replace(/\/+$/, "");
