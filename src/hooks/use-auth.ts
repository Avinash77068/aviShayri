"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { api } from "@/lib/api";
import type { User } from "@/lib/types";

export const AUTH_QUERY_KEY = ["auth", "me"] as const;

/**
 * Current authenticated user, resolved from the HTTP-only cookie via
 * GET /auth/profile. Returns null (not an error) when signed out.
 */
export function useCurrentUser() {
  return useQuery({
    queryKey: AUTH_QUERY_KEY,
    queryFn: async (): Promise<User | null> => {
      try {
        const res = await api.get("/auth/profile");
        return res.data?.data?.user ?? null;
      } catch {
        return null;
      }
    },
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
}

export function useLogout() {
  const qc = useQueryClient();
  const router = useRouter();

  return async () => {
    try {
      await api.post("/auth/logout");
    } catch {
      /* clear client state regardless */
    }
    qc.setQueryData(AUTH_QUERY_KEY, null);
    toast.success("Signed out");
    router.push("/");
    router.refresh();
  };
}
