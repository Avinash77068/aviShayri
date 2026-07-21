"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Heart, Bookmark, Share2, Copy, Check, Eye, Clock, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { shayariQueries } from "@/lib/queries";
import { api } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShayariGrid } from "@/components/shayari-grid";
import { SectionHeading } from "@/components/section-heading";
import { Skeleton } from "@/components/ui/skeleton";
import { cn, formatCount, authorName } from "@/lib/utils";

export function ShayariDetail({ slug }: { slug: string }) {
  const { data, isLoading } = useQuery(shayariQueries.bySlug(slug));
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 space-y-6">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-64 w-full rounded-[var(--radius)]" />
      </div>
    );
  }
  if (!data?.shayari) return null;
  const s = data.shayari;

  const react = (setFlag: (v: boolean) => void, flag: boolean, endpoint: string) => {
    setFlag(!flag);
    api.post(endpoint).catch(() => {
      setFlag(flag);
      toast.error("Please sign in to do that");
    });
  };

  const copy = async () => {
    await navigator.clipboard.writeText(`${s.content}\n\n— ${authorName(s)}`);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 1600);
  };

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: s.title, text: s.excerpt, url });
      } catch {
        /* cancelled */
      }
    } else {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied");
    }
    api.post(`/shayari/${s._id}/share`).catch(() => {});
  };

  return (
    <article className="mx-auto max-w-3xl px-4 pt-10">
      <Link
        href="/shayari"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
      >
        <ArrowLeft className="h-4 w-4" /> Back to all verses
      </Link>

      <div className="mb-5 flex flex-wrap items-center gap-2">
        {s.category && (
          <Link href={`/category/${s.category.slug}`}>
            <Badge variant="soft" className="gap-1">
              {s.category.icon} {s.category.name}
            </Badge>
          </Link>
        )}
        {s.trending && <Badge variant="solid">🔥 Trending</Badge>}
      </div>

      <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{s.title}</h1>

      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[var(--muted)]">
        <span className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full [background-image:var(--grad-soft)] text-xs font-semibold text-[var(--primary)]">
            {authorName(s).charAt(0)}
          </span>
          <span className="font-medium text-[var(--foreground)]">{authorName(s)}</span>
        </span>
        <span className="flex items-center gap-1">
          <Eye className="h-4 w-4" /> {formatCount(s.views)} views
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-4 w-4" /> {s.readingTime ?? 1} min read
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass relative mt-8 overflow-hidden rounded-[calc(var(--radius)+0.5rem)] p-8 sm:p-12"
      >
        <p className="shayari-body text-lg sm:text-xl">{s.content}</p>
      </motion.div>

      {/* Action bar */}
      <div className="sticky bottom-4 z-10 mx-auto mt-8 flex w-fit items-center gap-1 rounded-full glass p-1.5 shadow-lg">
        <ActionPill onClick={() => react(setLiked, liked, `/shayari/${s._id}/like`)} active={liked} activeClass="text-[var(--accent)]">
          <Heart className={cn("h-4 w-4", liked && "fill-current")} /> {formatCount(s.likes + (liked ? 1 : 0))}
        </ActionPill>
        <ActionPill onClick={() => react(setBookmarked, bookmarked, `/shayari/${s._id}/bookmark`)} active={bookmarked} activeClass="text-[var(--primary)]">
          <Bookmark className={cn("h-4 w-4", bookmarked && "fill-current")} /> Save
        </ActionPill>
        <ActionPill onClick={copy}>
          {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />} Copy
        </ActionPill>
        <ActionPill onClick={share}>
          <Share2 className="h-4 w-4" /> Share
        </ActionPill>
      </div>

      {s.tags && s.tags.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2">
          {s.tags.map((t) => (
            <Badge key={t._id} variant="outline">
              #{t.name}
            </Badge>
          ))}
        </div>
      )}

      {data.related?.length > 0 && (
        <div className="mt-16">
          <SectionHeading eyebrow="You may also like" title="Related Verses" />
          <ShayariGrid items={data.related} />
        </div>
      )}
    </article>
  );
}

function ActionPill({
  children,
  onClick,
  active,
  activeClass,
}: {
  children: React.ReactNode;
  onClick: () => void;
  active?: boolean;
  activeClass?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-[var(--muted)] transition-colors hover:bg-[var(--surface-2)] cursor-pointer",
        active && activeClass
      )}
    >
      {children}
    </button>
  );
}
