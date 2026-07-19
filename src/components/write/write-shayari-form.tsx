"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ImagePlus, Loader2, X, Send, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { categoryQueries, languageQueries } from "@/lib/queries";
import { useCurrentUser } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import type { Shayari } from "@/lib/types";

interface FormState {
  title: string;
  content: string;
  excerpt: string;
  category: string;
  language: string;
  status: "draft" | "published";
  featuredImage: string;
}

const empty: FormState = {
  title: "",
  content: "",
  excerpt: "",
  category: "",
  language: "",
  status: "published",
  featuredImage: "",
};

export function WriteShayariForm() {
  const router = useRouter();
  const qc = useQueryClient();
  const fileRef = useRef<HTMLInputElement>(null);

  const { data: user, isLoading: userLoading } = useCurrentUser();
  const { data: categories } = useQuery(categoryQueries.all());
  const { data: languages } = useQuery(languageQueries.all());

  const [form, setForm] = useState<FormState>(empty);
  const [uploading, setUploading] = useState(false);
  const set = (k: keyof FormState, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const isStaff = user && (user.role === "admin" || user.role === "editor");

  const upload = async (file: File) => {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await api.post("/media/upload", fd, { headers: { "Content-Type": "multipart/form-data" } });
      set("featuredImage", res.data?.data?.url ?? "");
      toast.success("Image uploaded");
    } catch {
      toast.error("Upload failed — please try a smaller image");
    } finally {
      setUploading(false);
    }
  };

  const mutation = useMutation({
    mutationFn: async () => {
      const payload: Record<string, unknown> = {
        title: form.title.trim(),
        content: form.content.trim(),
        category: form.category,
      };
      if (isStaff) payload.status = form.status; // users are forced to pending server-side
      if (form.excerpt.trim()) payload.excerpt = form.excerpt.trim();
      if (form.language) payload.language = form.language;
      if (form.featuredImage) payload.featuredImage = form.featuredImage;
      const res = await api.post("/shayari", payload);
      return { shayari: res.data?.data as Shayari, message: res.data?.message as string };
    },
    onSuccess: ({ shayari, message }) => {
      qc.invalidateQueries({ queryKey: ["shayari"] });
      qc.invalidateQueries({ queryKey: ["admin"] });
      toast.success(message || "Saved");
      // Pending submissions aren't publicly viewable yet — send users home.
      if (shayari?.status === "published" && shayari.slug) router.push(`/shayari/${shayari.slug}`);
      else router.push(isStaff ? "/admin/shayari" : "/profile");
    },
    onError: (err: unknown) => {
      const e = err as { response?: { data?: { message?: string; errors?: { field: string; message: string }[] } } };
      toast.error(e.response?.data?.errors?.[0]?.message || e.response?.data?.message || "Could not submit");
    },
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim() || !form.category) {
      toast.error("Title, content and category are required");
      return;
    }
    mutation.mutate();
  };

  if (userLoading) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12">
        <Skeleton className="h-96 w-full rounded-[var(--radius)]" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center">
        <span className="text-4xl">✍️</span>
        <h1 className="mt-6 text-2xl font-bold">Sign in to write</h1>
        <p className="mt-3 text-[var(--muted)]">Create an account to share your verses with the world.</p>
        <Link href="/login" className="mt-8">
          <Button size="lg">Sign in</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight">
        Write a <span className="text-gradient">Shayari</span>
      </h1>
      <p className="mt-2 text-[var(--muted)]">Share a verse with the world. Add an image to make it shine.</p>

      {/* Review notice for non-staff */}
      {!isStaff && (
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] p-4">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[var(--primary)]" />
          <p className="text-sm text-[var(--muted)]">
            Your shayari will be <span className="font-medium text-[var(--foreground)]">submitted for review</span>. An
            admin will approve it before it goes live on the site.
          </p>
        </div>
      )}

      <form onSubmit={submit} className="mt-6 space-y-5">
        <div>
          <label className="mb-1.5 block text-sm font-medium">Title</label>
          <Input value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="Give it a title" maxLength={200} />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium">Shayari</label>
          <Textarea
            value={form.content}
            onChange={(e) => set("content", e.target.value)}
            placeholder={"Likhiye apni shayari yahan…\nline by line"}
            className="min-h-44 shayari-body"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium">
            Excerpt <span className="text-[var(--muted)]">(optional)</span>
          </label>
          <Input value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} placeholder="Short preview line" maxLength={320} />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium">Category</label>
            <Select value={form.category} onChange={(v) => set("category", v)} placeholder="Choose a mood">
              {(categories ?? []).map((c) => (
                <option key={c._id} value={c._id}>
                  {c.icon ? `${c.icon} ` : ""}
                  {c.name}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">
              Language <span className="text-[var(--muted)]">(optional)</span>
            </label>
            <Select value={form.language} onChange={(v) => set("language", v)} placeholder="Any">
              {(languages ?? []).map((l) => (
                <option key={l._id} value={l._id}>
                  {l.name}
                </option>
              ))}
            </Select>
          </div>
        </div>

        {/* Image upload */}
        <div>
          <label className="mb-1.5 block text-sm font-medium">
            Featured image <span className="text-[var(--muted)]">(optional)</span>
          </label>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) upload(f);
            }}
          />
          {form.featuredImage ? (
            <div className="relative overflow-hidden rounded-2xl border border-[var(--border)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={form.featuredImage} alt="preview" className="h-48 w-full object-cover" />
              <button
                type="button"
                onClick={() => set("featuredImage", "")}
                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full glass"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="flex h-40 w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-[var(--border)] text-[var(--muted)] transition-colors hover:bg-[var(--surface-2)] cursor-pointer"
            >
              {uploading ? <Loader2 className="h-6 w-6 animate-spin" /> : <ImagePlus className="h-6 w-6" />}
              <span className="text-sm">{uploading ? "Uploading…" : "Click to upload an image"}</span>
            </button>
          )}
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-[var(--border)] pt-5">
          {isStaff ? (
            <Select value={form.status} onChange={(v) => set("status", v as FormState["status"])} className="max-w-40">
              <option value="published">Publish now</option>
              <option value="draft">Save as draft</option>
            </Select>
          ) : (
            <span className="text-xs text-[var(--muted)]">Goes to review queue</span>
          )}
          <Button type="submit" size="lg" disabled={mutation.isPending || uploading} className="gap-2">
            {mutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            {isStaff ? (form.status === "draft" ? "Save draft" : "Publish") : "Submit for review"}
          </Button>
        </div>
      </form>
    </div>
  );
}

function Select({
  value,
  onChange,
  children,
  placeholder,
  className,
}: {
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
  placeholder?: string;
  className?: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] ${className ?? ""}`}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {children}
    </select>
  );
}
