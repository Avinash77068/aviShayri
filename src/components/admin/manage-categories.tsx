"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2, Loader2, Check, X } from "lucide-react";
import { toast } from "sonner";
import { api, unwrap } from "@/lib/api";
import { AdminPageHeader } from "./admin-page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCount } from "@/lib/utils";
import type { Category } from "@/lib/types";

export function ManageCategories() {
  const qc = useQueryClient();
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [color, setColor] = useState("#7c3aed");

  const { data, isLoading } = useQuery({
    queryKey: ["admin", "categories"],
    queryFn: async (): Promise<Category[]> => (await unwrap<Category[]>(api.get("/categories/all"))).data,
  });

  const invalidate = () => {
    qc.invalidateQueries({ queryKey: ["admin", "categories"] });
    qc.invalidateQueries({ queryKey: ["categories"] });
  };

  const create = useMutation({
    mutationFn: () => api.post("/categories", { name, icon, color }),
    onSuccess: () => {
      toast.success("Category created");
      setName("");
      setIcon("");
      setCreating(false);
      invalidate();
    },
    onError: (e: unknown) => {
      const err = e as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || "Create failed");
    },
  });

  const remove = useMutation({
    mutationFn: (id: string) => api.delete(`/categories/${id}`),
    onSuccess: () => {
      toast.success("Deleted");
      invalidate();
    },
    onError: (e: unknown) => {
      const err = e as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || "Cannot delete (still has shayari?)");
    },
  });

  return (
    <div>
      <AdminPageHeader
        title="Categories"
        description="Organize shayari by mood and theme."
        action={
          <Button size="sm" className="gap-1.5" onClick={() => setCreating((v) => !v)}>
            <Plus className="h-4 w-4" /> New category
          </Button>
        }
      />

      {creating && (
        <div className="mb-4 flex flex-wrap items-end gap-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-4">
          <div className="flex-1">
            <label className="mb-1 block text-xs font-medium text-[var(--muted)]">Name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Romantic" />
          </div>
          <div className="w-24">
            <label className="mb-1 block text-xs font-medium text-[var(--muted)]">Icon</label>
            <Input value={icon} onChange={(e) => setIcon(e.target.value)} placeholder="🌹" />
          </div>
          <div className="w-28">
            <label className="mb-1 block text-xs font-medium text-[var(--muted)]">Color</label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)]"
            />
          </div>
          <Button size="md" disabled={!name.trim() || create.isPending} onClick={() => create.mutate()} className="gap-1.5">
            {create.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />} Save
          </Button>
          <Button size="md" variant="ghost" onClick={() => setCreating(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {isLoading ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-20 rounded-[var(--radius)]" />
          ))}
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {(data ?? []).map((c) => (
            <div key={c._id} className="flex items-center gap-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl text-xl" style={{ background: `${c.color}22` }}>
                {c.icon || "🏷️"}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{c.name}</p>
                <p className="text-xs text-[var(--muted)]">{formatCount(c.shayariCount)} shayari</p>
              </div>
              <button
                onClick={() => {
                  if (confirm(`Delete "${c.name}"?`)) remove.mutate(c._id);
                }}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--accent)] hover:bg-[var(--surface-2)]"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
