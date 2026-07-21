"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Bookmark, Share2, Copy, Eye, Check } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "./ui/badge";
import { api } from "@/lib/api";
import { cn, formatCount, authorName } from "@/lib/utils";
import type { Shayari } from "@/lib/types";

export function ShayariCard({ shayari, index = 0 }: { shayari: Shayari; index?: number }) {
  const [liked, setLiked] = useState(Boolean(shayari.isLiked));
  const [bookmarked, setBookmarked] = useState(Boolean(shayari.isBookmarked));
  const [likes, setLikes] = useState(shayari.likes);
  const [copied, setCopied] = useState(false);

  const optimistic = (
    setFlag: (v: boolean) => void,
    flag: boolean,
    endpoint: string,
    onCount?: (delta: number) => void
  ) => {
    setFlag(!flag);
    onCount?.(!flag ? 1 : -1);
    api.post(endpoint).catch(() => {
      // Revert on failure (e.g. not logged in).
      setFlag(flag);
      onCount?.(!flag ? -1 : 1);
      toast.error("Please sign in to do that");
    });
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`${shayari.content}\n\n— ${authorName(shayari)}`);
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 1600);
    } catch {
      toast.error("Could not copy");
    }
  };

  const share = async () => {
    const url = `${window.location.origin}/shayari/${shayari.slug}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: shayari.title, text: shayari.excerpt, url });
      } catch {
        /* cancelled */
      }
    } else {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied");
    }
    api.post(`/shayari/${shayari._id}/share`).catch(() => {});
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.3) }}
      className="card-hover group relative flex flex-col overflow-hidden rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-6"
    >
      <div className="absolute inset-x-0 top-0 h-1 opacity-0 transition-opacity group-hover:opacity-100 [background-image:var(--grad-1)]" />

      <div className="mb-3 flex items-center gap-2">
        {shayari.category && (
          <Badge variant="soft" className="gap-1">
            {shayari.category.icon} {shayari.category.name}
          </Badge>
        )}
        {shayari.trending && <Badge variant="solid">🔥 Trending</Badge>}
      </div>

      <Link href={`/shayari/${shayari.slug}`} className="flex-1">
        <p className="shayari-body text-[15px] text-[var(--foreground)] line-clamp-5">{shayari.content}</p>
      </Link>

      <div className="mt-5 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
          <span className="flex h-7 w-7 items-center justify-center rounded-full [background-image:var(--grad-soft)] text-xs font-semibold text-[var(--primary)]">
            {authorName(shayari).charAt(0)}
          </span>
          <span className="font-medium text-[var(--foreground)]">{authorName(shayari)}</span>
        </div>
        <span className="flex items-center gap-1 text-xs text-[var(--muted)]">
          <Eye className="h-3.5 w-3.5" /> {formatCount(shayari.views)}
        </span>
      </div>

      <div className="mt-4 flex items-center gap-1 border-t border-[var(--border)] pt-4">
        <IconAction
          onClick={() => optimistic(setLiked, liked, `/shayari/${shayari._id}/like`, (d) => setLikes((n) => n + d))}
          active={liked}
          activeClass="text-[var(--accent)]"
        >
          <Heart className={cn("h-4 w-4", liked && "fill-current")} /> {formatCount(likes)}
        </IconAction>
        <IconAction
          onClick={() => optimistic(setBookmarked, bookmarked, `/shayari/${shayari._id}/bookmark`)}
          active={bookmarked}
          activeClass="text-[var(--primary)]"
        >
          <Bookmark className={cn("h-4 w-4", bookmarked && "fill-current")} />
        </IconAction>
        <IconAction onClick={copy}>
          {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
        </IconAction>
        <IconAction onClick={share}>
          <Share2 className="h-4 w-4" />
        </IconAction>
      </div>
    </motion.article>
  );
}

function IconAction({
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
        "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-[var(--muted)] transition-colors hover:bg-[var(--surface-2)] cursor-pointer",
        active && activeClass
      )}
    >
      {children}
    </button>
  );
}
