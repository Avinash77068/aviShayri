"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Feather, Loader2, Lock } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ResetPasswordForm() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token") ?? "";
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      toast.error("Missing or invalid reset token");
      return;
    }
    setLoading(true);
    try {
      await api.post("/auth/reset-password", { token, password });
      toast.success("Password reset — please sign in");
      router.push("/login");
    } catch (e2) {
      const err = e2 as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || "Reset link is invalid or expired");
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
          <h1 className="text-2xl font-bold tracking-tight">Set a new password</h1>
          <p className="mt-2 text-sm text-[var(--muted)]">Choose a strong password you&apos;ll remember.</p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" />
            <Input
              type="password"
              required
              placeholder="New password"
              className="pl-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full" size="lg" disabled={loading || !token}>
            {loading && <Loader2 className="h-4 w-4 animate-spin" />} Reset password
          </Button>
          {!token && <p className="text-center text-xs text-[var(--accent)]">This link is missing its token.</p>}
        </form>

        <Link href="/login" className="mt-6 block text-center text-sm text-[var(--muted)] hover:text-[var(--foreground)]">
          Back to sign in
        </Link>
      </div>
    </div>
  );
}
