"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Feather, Loader2, Mail, Lock, User as UserIcon } from "lucide-react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { api, setAuthToken } from "@/lib/api";
import { AUTH_QUERY_KEY } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

const registerSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Enter a valid email"),
  password: z
    .string()
    .min(8, "At least 8 characters")
    .regex(/[A-Z]/, "Add an uppercase letter")
    .regex(/[a-z]/, "Add a lowercase letter")
    .regex(/[0-9]/, "Add a number"),
});

type Mode = "login" | "register";
type FormValues = { name?: string; email: string; password: string };

export function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const qc = useQueryClient();
  const [serverError, setServerError] = useState("");
  const schema = mode === "login" ? loginSchema : registerSchema;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(schema) as any,
  });

  const onSubmit = handleSubmit(async (values) => {
    setServerError("");
    try {
      const res = await api.post(`/auth/${mode}`, values);
      const accessToken = res.data?.data?.accessToken ?? null;
      setAuthToken(accessToken);
      // Prime the header's user state immediately, then refetch to be safe.
      qc.setQueryData(AUTH_QUERY_KEY, res.data?.data?.user ?? null);
      await qc.invalidateQueries({ queryKey: AUTH_QUERY_KEY });
      toast.success(mode === "login" ? "Welcome back!" : "Account created!");
      router.push("/");
      router.refresh();
    } catch (err) {
      const e = err as { response?: { data?: { message?: string } } };
      const msg = e.response?.data?.message || "Something went wrong. Is the backend running?";
      setServerError(msg);
      toast.error(msg);
    }
  });

  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md flex-col justify-center px-4 py-12">
      <div className="glass rounded-[calc(var(--radius)+0.5rem)] p-8 shadow-xl">
        <div className="mb-8 text-center">
          <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl [background-image:var(--grad-1)] shadow-lg">
            <Feather className="h-7 w-7 text-white" />
          </span>
          <h1 className="text-2xl font-bold tracking-tight">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="mt-2 text-sm text-[var(--muted)]">
            {mode === "login" ? "Sign in to continue your journey" : "Join and start collecting verses you love"}
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4" noValidate>
          {mode === "register" && (
            <Field icon={<UserIcon className="h-4 w-4" />} error={errors.name?.message as string}>
              <Input placeholder="Full name" className="pl-10" {...register("name")} />
            </Field>
          )}
          <Field icon={<Mail className="h-4 w-4" />} error={errors.email?.message as string}>
            <Input type="email" placeholder="Email address" className="pl-10" {...register("email")} />
          </Field>
          <Field icon={<Lock className="h-4 w-4" />} error={errors.password?.message as string}>
            <Input type="password" placeholder="Password" className="pl-10" {...register("password")} />
          </Field>

          {mode === "login" && (
            <div className="text-right">
              <Link href="/forgot-password" className="text-sm text-[var(--primary)] hover:underline">
                Forgot password?
              </Link>
            </div>
          )}

          {serverError && (
            <p className="rounded-xl bg-[var(--accent)]/10 px-3 py-2 text-sm text-[var(--accent)]">{serverError}</p>
          )}

          <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
            {mode === "login" ? "Sign in" : "Create account"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-[var(--muted)]">
          {mode === "login" ? "New here? " : "Already have an account? "}
          <Link href={mode === "login" ? "/register" : "/login"} className="font-medium text-[var(--primary)] hover:underline">
            {mode === "login" ? "Create an account" : "Sign in"}
          </Link>
        </p>
      </div>
    </div>
  );
}

function Field({
  icon,
  error,
  children,
}: {
  icon: React.ReactNode;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="relative">
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--muted)]">{icon}</span>
        {children}
      </div>
      {error && <p className="mt-1.5 pl-1 text-xs text-[var(--accent)]">{error}</p>}
    </div>
  );
}
