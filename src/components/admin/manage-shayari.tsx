"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2, Eye, ExternalLink, PenLine, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { api, unwrap } from "@/lib/api";
import { AdminPageHeader } from "./admin-page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCount } from "@/lib/utils";
import type { Shayari } from "@/lib/types";

const STATUS_TABS = ["all", "published", "draft"] as const;

export function ManageShayari() {
  const qc = useQueryClient();
  const [status, setStatus] = useState<(typeof STATUS_TABS)[number]>("all");

  const { data, isLoading } = useQuery({
    queryKey: ["admin", "shayari", status],
    queryFn: async (): Promise<Shayari[]> => {
      const params: Record<string, string> = { admin: "true", limit: "100" };
      if (status !== "all") params.status = status;
      const { data: items } = await unwrap<Shayari[]>(api.get("/shayari", { params }));
      return items;
    },
  });

  const remove = useMutation({
    mutationFn: (id: string) => api.delete(`/shayari/${id}`),
    onSuccess: () => {
      toast.success("Deleted");
      qc.invalidateQueries({ queryKey: ["admin", "shayari"] });
      qc.invalidateQueries({ queryKey: ["shayari"] });
    },
    onError: () => toast.error("Delete failed"),
  });

  const setStatusMut = useMutation({
    mutationFn: ({ id, next }: { id: string; next: string }) => api.put(`/shayari/${id}`, { status: next }),
    onSuccess: () => {
      toast.success("Updated");
      qc.invalidateQueries({ queryKey: ["admin", "shayari"] });
    },
    onError: () => toast.error("Update failed"),
  });

  return (
    <div>
      <AdminPageHeader
        title="Shayari"
        description="Create, publish and manage all verses."
        action={
          <Link href="/write">
            <Button size="sm" className="gap-1.5">
              <PenLine className="h-4 w-4" /> New shayari
            </Button>
          </Link>
        }
      />

      <div className="mb-4 flex gap-1">
        {STATUS_TABS.map((s) => (
          <button
            key={s}
            onClick={() => setStatus(s)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
              status === s ? "bg-[var(--surface-2)] text-[var(--foreground)]" : "text-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)]">
        {isLoading ? (
          <div className="space-y-2 p-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-12" />
            ))}
          </div>
        ) : !data?.length ? (
          <p className="p-10 text-center text-sm text-[var(--muted)]">No shayari found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border)] text-left text-xs uppercase tracking-wider text-[var(--muted)]">
                  <th className="px-4 py-3 font-medium">Title</th>
                  <th className="px-4 py-3 font-medium">Category</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Views</th>
                  <th className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((s) => (
                  <tr key={s._id} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--surface-2)]/50">
                    <td className="max-w-xs px-4 py-3">
                      <p className="truncate font-medium">{s.title}</p>
                    </td>
                    <td className="px-4 py-3 text-[var(--muted)]">{s.category?.name ?? "—"}</td>
                    <td className="px-4 py-3">
                      <Badge variant={s.status === "published" ? "solid" : "soft"}>{s.status}</Badge>
                    </td>
                    <td className="px-4 py-3 text-[var(--muted)]">
                      <span className="flex items-center gap-1">
                        <Eye className="h-3.5 w-3.5" /> {formatCount(s.views)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setStatusMut.mutate({ id: s._id, next: s.status === "published" ? "draft" : "published" })}
                          className="rounded-lg px-2.5 py-1 text-xs font-medium text-[var(--primary)] hover:bg-[var(--surface-2)]"
                        >
                          {s.status === "published" ? "Unpublish" : "Publish"}
                        </button>
                        <Link href={`/shayari/${s.slug}`} className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--muted)] hover:bg-[var(--surface-2)]">
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => {
                            if (confirm(`Delete "${s.title}"?`)) remove.mutate(s._id);
                          }}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--accent)] hover:bg-[var(--surface-2)]"
                        >
                          {remove.isPending && remove.variables === s._id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
