"use client";

import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Check, Trash2, Clock } from "lucide-react";
import { toast } from "sonner";
import { api, unwrap } from "@/lib/api";
import { AdminPageHeader } from "./admin-page-header";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { timeAgo } from "@/lib/utils";
import type { Shayari } from "@/lib/types";

export function ManageSubmissions() {
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["admin", "submissions"],
    refetchInterval: 30_000, // keep the queue fresh
    queryFn: async (): Promise<(Shayari & { createdBy?: { name: string } })[]> =>
      (await unwrap<Shayari[]>(api.get("/shayari", { params: { admin: "true", status: "pending", limit: "100" } }))).data,
  });

  const invalidate = () => {
    qc.invalidateQueries({ queryKey: ["admin"] });
    qc.invalidateQueries({ queryKey: ["shayari"] });
    qc.invalidateQueries({ queryKey: ["notifications"] });
  };

  const approve = useMutation({
    mutationFn: (id: string) => api.put(`/shayari/${id}`, { status: "published" }),
    onSuccess: () => {
      toast.success("Approved & published");
      invalidate();
    },
    onError: () => toast.error("Approve failed"),
  });

  const reject = useMutation({
    mutationFn: (id: string) => api.delete(`/shayari/${id}`),
    onSuccess: () => {
      toast.success("Submission rejected");
      invalidate();
    },
    onError: () => toast.error("Reject failed"),
  });

  return (
    <div>
      <AdminPageHeader title="Submissions" description="User-submitted shayari awaiting your approval." />

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-[var(--radius)]" />
          ))}
        </div>
      ) : !data?.length ? (
        <div className="rounded-[var(--radius)] border border-dashed border-[var(--border)] py-16 text-center">
          <span className="text-3xl">🎉</span>
          <p className="mt-3 text-sm text-[var(--muted)]">No pending submissions. You&apos;re all caught up!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {data.map((s) => (
            <div key={s._id} className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-5">
              <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--muted)]">
                <Badge variant="soft" className="gap-1">
                  <Clock className="h-3 w-3" /> Pending
                </Badge>
                {s.category && <span>{s.category.name}</span>}
                <span>· by {s.createdBy?.name ?? s.author?.name ?? "a user"}</span>
                <span>· {timeAgo(s.createdAt)}</span>
              </div>
              <h3 className="mt-2 font-semibold">{s.title}</h3>
              <p className="shayari-body mt-1.5 line-clamp-3 text-sm text-[var(--muted)]">{s.content}</p>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => approve.mutate(s._id)}
                  disabled={approve.isPending}
                  className="flex items-center gap-1.5 rounded-lg bg-[var(--surface-2)] px-3 py-1.5 text-xs font-medium text-green-600 hover:brightness-95"
                >
                  <Check className="h-3.5 w-3.5" /> Approve & publish
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Reject and delete "${s.title}"?`)) reject.mutate(s._id);
                  }}
                  className="flex items-center gap-1.5 rounded-lg bg-[var(--surface-2)] px-3 py-1.5 text-xs font-medium text-[var(--accent)] hover:brightness-95"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="mt-6 text-xs text-[var(--muted)]">
        Tip: approved shayari appears instantly on the{" "}
        <Link href="/" className="text-[var(--primary)] hover:underline">
          site
        </Link>
        .
      </p>
    </div>
  );
}
