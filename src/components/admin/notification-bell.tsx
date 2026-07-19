"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Bell, CheckCheck } from "lucide-react";
import { api, unwrap } from "@/lib/api";
import { timeAgo } from "@/lib/utils";

interface Notif {
  _id: string;
  title: string;
  message: string;
  link: string;
  isRead: boolean;
  createdAt: string;
  actor?: { name: string };
}

export function NotificationBell() {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const { data } = useQuery({
    queryKey: ["notifications"],
    refetchInterval: 20_000, // poll for new submissions
    refetchOnWindowFocus: true,
    queryFn: async (): Promise<{ items: Notif[]; unread: number }> => {
      try {
        const res = await api.get("/notifications", { params: { limit: 10 } });
        return { items: res.data?.data ?? [], unread: res.data?.meta?.unread ?? 0 };
      } catch {
        return { items: [], unread: 0 };
      }
    },
  });

  const markAll = useMutation({
    mutationFn: () => api.post("/notifications/read-all"),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["notifications"] }),
  });

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const unread = data?.unread ?? 0;
  const items = data?.items ?? [];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] transition-colors hover:bg-[var(--surface-2)] cursor-pointer"
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5" />
        {unread > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-bold text-white [background-image:var(--grad-1)]">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>

      {open && (
        <div className="glass absolute right-0 z-50 mt-2 w-80 overflow-hidden rounded-2xl p-2 shadow-xl">
          <div className="flex items-center justify-between px-3 py-2">
            <p className="text-sm font-semibold">Notifications</p>
            {unread > 0 && (
              <button onClick={() => markAll.mutate()} className="flex items-center gap-1 text-xs text-[var(--primary)] hover:underline">
                <CheckCheck className="h-3.5 w-3.5" /> Mark all read
              </button>
            )}
          </div>
          <div className="max-h-96 overflow-y-auto">
            {items.length === 0 ? (
              <p className="px-3 py-8 text-center text-sm text-[var(--muted)]">No notifications yet.</p>
            ) : (
              items.map((n) => (
                <Link
                  key={n._id}
                  href={n.link || "#"}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-2.5 transition-colors hover:bg-[var(--surface-2)]"
                >
                  <div className="flex items-start gap-2">
                    {!n.isRead && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--primary)]" />}
                    <div className={n.isRead ? "opacity-60" : ""}>
                      <p className="text-sm font-medium">{n.title}</p>
                      <p className="text-xs text-[var(--muted)]">{n.message}</p>
                      <p className="mt-0.5 text-[11px] text-[var(--muted)]">{timeAgo(n.createdAt)}</p>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
