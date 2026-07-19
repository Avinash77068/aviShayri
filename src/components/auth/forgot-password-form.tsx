"use client";

import { useState } from "react";
import Link from "next/link";
import { Feather, Loader2, Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [devLink, setDevLink] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/forgot-password", { email });
      setSent(true);
      // In dev the API returns the reset link directly (no SMTP).
      if (res.data?.data?.resetLink) setDevLink(res.data.data.resetLink);
      toast.success("Check your inbox for a reset link");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md flex-col justify-center px-4 py-12">
      <div className="glass rounded-[calc(var(--radius)+0.5rem)] p-8 shadow-xl">
        <div className="mb-8 text-center">
          <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl [background-image:var(--grad-1)] shadow-lg">
            <Feather className="h-7 w-7 text-white" />
          </span>
          <h1 className="text-2xl font-bold tracking-tight">Forgot password?</h1>
          <p className="mt-2 text-sm text-[var(--muted)]">Enter your email and we&apos;ll send a reset link.</p>
        </div>

        {sent ? (
          <div className="text-center">
            <CheckCircle2 className="mx-auto h-12 w-12 text-green-500" />
            <p className="mt-4 text-sm text-[var(--muted)]">
              If an account exists for <span className="font-medium text-[var(--foreground)]">{email}</span>, a reset link is on its way.
            </p>
            {devLink && (
              <Link href={devLink.replace(/^https?:\/\/[^/]+/, "")} className="mt-4 block break-all rounded-xl bg-[var(--surface-2)] p-3 text-xs text-[var(--primary)]">
                Dev link: {devLink}
              </Link>
            )}
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" />
              <Input type="email" required placeholder="Email address" className="pl-10" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading && <Loader2 className="h-4 w-4 animate-spin" />} Send reset link
            </Button>
          </form>
        )}

        <Link href="/login" className="mt-6 flex items-center justify-center gap-1.5 text-sm text-[var(--muted)] hover:text-[var(--foreground)]">
          <ArrowLeft className="h-4 w-4" /> Back to sign in
        </Link>
      </div>
    </div>
  );
}
