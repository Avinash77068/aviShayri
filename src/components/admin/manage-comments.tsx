"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Check, Ban, Trash2, Flag } from "lucide-react";
import { toast } from "sonner";
import { api, unwrap } from "@/lib/api";
import { AdminPageHeader } from "./admin-page-header";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { timeAgo } from "@/lib/utils";

interface Comment {
  _id: string;
  content: string;
  status: string;
  reportCount: number;
  createdAt: string;
  user?: { name: string; email: string };
  shayari?: { title: string; slug: string };
}

const TABS = ["pending", "approved", "spam", "all"] as const;

export function ManageComments() {
  const qc = useQueryClient();
  const [tab, setTab] = useState<(typeof TABS)[number]>("pending");

  const { data, isLoading } = useQuery({
    queryKey: ["admin", "comments", tab],
    queryFn: async (): Promise<Comment[]> => {
      const params: Record<string, string> = { limit: "100" };
      if (tab !== "all") params.status = tab;
      return (await unwrap<Comment[]>(api.get("/comments/moderation", { params }))).data;
    },
  });

  const moderate = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => api.patch(`/comments/${id}/moderate`, { status }),
    onSuccess: () => {
      toast.success("Comment moderated");
      qc.invalidateQueries({ queryKey: ["admin", "comments"] });
    },
    onError: () => toast.error("Action failed"),
  });

  const del = useMutation({
    mutationFn: (id: string) => api.delete(`/comments/${id}`),
    onSuccess: () => {
      toast.success("Deleted");
      qc.invalidateQueries({ queryKey: ["admin", "comments"] });
    },
    onError: () => toast.error("Delete failed"),
  });

  return (
    <div>
      <AdminPageHeader title="Comments" description="Moderate discussion and handle reports." />

      <div className="mb-4 flex gap-1">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
              tab === t ? "bg-[var(--surface-2)] text-[var(--foreground)]" : "text-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-[var(--radius)]" />
          ))}
        </div>
      ) : !data?.length ? (
        <p className="rounded-[var(--radius)] border border-dashed border-[var(--border)] py-14 text-center text-sm text-[var(--muted)]">
          No {tab === "all" ? "" : tab} comments.
        </p>
      ) : (
        <div className="space-y-3">
          {data.map((c) => (
            <div key={c._id} className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-4">
              <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--muted)]">
                <span className="font-medium text-[var(--foreground)]">{c.user?.name ?? "Unknown"}</span>
                <span>on</span>
                <span className="font-medium text-[var(--primary)]">{c.shayari?.title ?? "—"}</span>
                <span>· {timeAgo(c.createdAt)}</span>
                <Badge variant={c.status === "approved" ? "solid" : "soft"} className="capitalize">
                  {c.status}
                </Badge>
                {c.reportCount > 0 && (
                  <Badge className="gap-1 bg-[var(--accent)]/15 text-[var(--accent)]">
                    <Flag className="h-3 w-3" /> {c.reportCount}
                  </Badge>
                )}
              </div>
              <p className="mt-2.5 text-sm">{c.content}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {c.status !== "approved" && (
                  <button
                    onClick={() => moderate.mutate({ id: c._id, status: "approved" })}
                    className="flex items-center gap-1.5 rounded-lg bg-[var(--surface-2)] px-3 py-1.5 text-xs font-medium text-green-600 hover:brightness-95"
                  >
                    <Check className="h-3.5 w-3.5" /> Approve
                  </button>
                )}
                {c.status !== "spam" && (
                  <button
                    onClick={() => moderate.mutate({ id: c._id, status: "spam" })}
                    className="flex items-center gap-1.5 rounded-lg bg-[var(--surface-2)] px-3 py-1.5 text-xs font-medium text-[var(--muted)] hover:brightness-95"
                  >
                    <Ban className="h-3.5 w-3.5" /> Spam
                  </button>
                )}
                <button
                  onClick={() => {
                    if (confirm("Delete this comment?")) del.mutate(c._id);
                  }}
                  className="flex items-center gap-1.5 rounded-lg bg-[var(--surface-2)] px-3 py-1.5 text-xs font-medium text-[var(--accent)] hover:brightness-95"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
