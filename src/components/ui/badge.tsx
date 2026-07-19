import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({
  className,
  variant = "soft",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { variant?: "soft" | "solid" | "outline" }) {
  const variants = {
    soft: "bg-[var(--surface-2)] text-[var(--muted)]",
    solid: "text-white [background-image:var(--grad-1)]",
    outline: "border border-[var(--border)] text-[var(--muted)]",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
