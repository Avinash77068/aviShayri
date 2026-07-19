"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import {
  FileText,
  Eye,
  Heart,
  Bookmark,
  Share2,
  MessageSquare,
  FolderTree,
  Users,
  TrendingUp,
} from "lucide-react";
import { api } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCount, timeAgo } from "@/lib/utils";

interface Dashboard {
  totals: Record<string, number>;
  mostPopular: { _id: string; title: string; slug: string; views: number; likes: number }[];
  recentActivity: { _id: string; action: string; entity: string; description: string; createdAt: string; actor?: { name: string } }[];
  topCategories: { _id: string; name: string; slug: string; shayariCount: number }[];
}

export function AdminDashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "dashboard"],
    queryFn: async (): Promise<Dashboard | null> => {
      try {
        return (await api.get("/analytics/dashboard")).data?.data ?? null;
      } catch {
        return null;
      }
    },
  });

  const t = data?.totals ?? {};
  const cards = [
    { label: "Shayari", value: t.shayari, icon: FileText, grad: "var(--grad-1)", sub: `${t.published ?? 0} published` },
    { label: "Total Views", value: t.views, icon: Eye, grad: "linear-gradient(135deg,#0ea5e9,#6366f1)" },
    { label: "Likes", value: t.likes, icon: Heart, grad: "linear-gradient(135deg,#ec4899,#f43f5e)" },
    { label: "Bookmarks", value: t.bookmarks, icon: Bookmark, grad: "linear-gradient(135deg,#8b5cf6,#7c3aed)" },
    { label: "Shares", value: t.shares, icon: Share2, grad: "linear-gradient(135deg,#10b981,#059669)" },
    { label: "Comments", value: t.comments, icon: MessageSquare, grad: "linear-gradient(135deg,#f59e0b,#ef4444)", sub: `${t.pendingComments ?? 0} pending` },
    { label: "Categories", value: t.categories, icon: FolderTree, grad: "linear-gradient(135deg,#14b8a6,#0ea5e9)" },
    { label: "Users", value: t.users, icon: Users, grad: "linear-gradient(135deg,#a78bfa,#ec4899)" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
      <p className="mt-1 text-sm text-[var(--muted)]">Overview of your platform&apos;s activity.</p>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((c) =>
          isLoading ? (
            <Skeleton key={c.label} className="h-28 rounded-[var(--radius)]" />
          ) : (
            <div key={c.label} className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-5">
              <div className="flex items-center justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl text-white" style={{ backgroundImage: c.grad }}>
                  <c.icon className="h-4.5 w-4.5" style={{ width: 18, height: 18 }} />
                </span>
              </div>
              <p className="mt-3 text-2xl font-bold">{formatCount(c.value)}</p>
              <p className="text-xs text-[var(--muted)]">{c.label}</p>
              {c.sub && <p className="mt-0.5 text-[11px] text-[var(--primary)]">{c.sub}</p>}
            </div>
          )
        )}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Most popular */}
        <div className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-5">
          <div className="mb-4 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-[var(--primary)]" />
            <h2 className="font-semibold">Most Popular</h2>
          </div>
          {isLoading ? (
            <Skeleton className="h-40" />
          ) : (
            <ul className="space-y-1">
              {(data?.mostPopular ?? []).map((s, i) => (
                <li key={s._id}>
                  <Link href={`/shayari/${s.slug}`} className="flex items-center gap-3 rounded-xl px-2 py-2 hover:bg-[var(--surface-2)]">
                    <span className="text-sm font-bold text-[var(--muted)]">{i + 1}</span>
                    <span className="flex-1 truncate text-sm font-medium">{s.title}</span>
                    <span className="flex items-center gap-1 text-xs text-[var(--muted)]">
                      <Eye className="h-3 w-3" /> {formatCount(s.views)}
                    </span>
                  </Link>
                </li>
              ))}
              {!data?.mostPopular?.length && <p className="text-sm text-[var(--muted)]">No data yet.</p>}
            </ul>
          )}
        </div>

        {/* Recent activity */}
        <div className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-5">
          <h2 className="mb-4 font-semibold">Recent Activity</h2>
          {isLoading ? (
            <Skeleton className="h-40" />
          ) : (
            <ul className="space-y-3">
              {(data?.recentActivity ?? []).map((a) => (
                <li key={a._id} className="flex items-start gap-3 text-sm">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--primary)]" />
                  <div className="min-w-0">
                    <p className="truncate">
                      <span className="font-medium">{a.actor?.name ?? "Someone"}</span>{" "}
                      <span className="text-[var(--muted)]">{a.description || `${a.action} ${a.entity}`}</span>
                    </p>
                    <p className="text-xs text-[var(--muted)]">{timeAgo(a.createdAt)}</p>
                  </div>
                </li>
              ))}
              {!data?.recentActivity?.length && <p className="text-sm text-[var(--muted)]">No activity yet.</p>}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
