"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2, ImagePlus, ShieldCheck, ShieldAlert } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { useCurrentUser, useLogout, AUTH_QUERY_KEY } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export function ProfileView() {
  const qc = useQueryClient();
  const { data: user, isLoading } = useCurrentUser();
  const logout = useLogout();
  const fileRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [changingPw, setChangingPw] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name ?? "");
      setAvatar(user.avatar ?? "");
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12">
        <Skeleton className="h-80 w-full rounded-[var(--radius)]" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center">
        <h1 className="text-2xl font-bold">You&apos;re signed out</h1>
        <p className="mt-3 text-[var(--muted)]">Sign in to view your profile.</p>
        <Link href="/login" className="mt-8">
          <Button size="lg">Sign in</Button>
        </Link>
      </div>
    );
  }

  const uploadAvatar = async (file: File) => {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await api.post("/media/upload", fd, { headers: { "Content-Type": "multipart/form-data" } });
      const url = res.data?.data?.url ?? "";
      setAvatar(url);
      // Persist immediately so the avatar survives a refresh — no separate
      // "Save changes" click needed just for the photo.
      await api.put("/auth/profile", { name: (name || user?.name || "").trim(), avatar: url });
      await qc.invalidateQueries({ queryKey: AUTH_QUERY_KEY });
      toast.success("Avatar updated");
    } catch {
      toast.error("Upload failed — please try a smaller image");
    } finally {
      setUploading(false);
    }
  };

  const saveProfile = async () => {
    setSavingProfile(true);
    try {
      await api.put("/auth/profile", { name, avatar });
      await qc.invalidateQueries({ queryKey: AUTH_QUERY_KEY });
      toast.success("Profile updated");
    } catch {
      toast.error("Could not update profile");
    } finally {
      setSavingProfile(false);
    }
  };

  const changePassword = async () => {
    if (!currentPassword || newPassword.length < 8) {
      toast.error("Enter current password and a new password (8+ chars)");
      return;
    }
    setChangingPw(true);
    try {
      await api.post("/auth/change-password", { currentPassword, newPassword });
      toast.success("Password changed — please sign in again");
      setCurrentPassword("");
      setNewPassword("");
      logout();
    } catch (e) {
      const err = e as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || "Could not change password");
    } finally {
      setChangingPw(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight">Your Profile</h1>

      {/* Profile card */}
      <div className="mt-8 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-6">
        <div className="flex items-center gap-4">
          {avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={avatar} alt={name} className="h-20 w-20 rounded-full object-cover" />
          ) : (
            <span className="flex h-20 w-20 items-center justify-center rounded-full text-2xl font-bold text-white [background-image:var(--grad-1)]">
              {(name || "U").charAt(0).toUpperCase()}
            </span>
          )}
          <div>
            <div className="flex items-center gap-2">
              <p className="text-lg font-semibold">{user.name}</p>
              <Badge variant="soft" className="capitalize">
                {user.role}
              </Badge>
            </div>
            <p className="text-sm text-[var(--muted)]">{user.email}</p>
            <p className="mt-1 flex items-center gap-1 text-xs">
              {user.isEmailVerified ? (
                <span className="flex items-center gap-1 text-green-600">
                  <ShieldCheck className="h-3.5 w-3.5" /> Verified
                </span>
              ) : (
                <span className="flex items-center gap-1 text-[var(--gold)]">
                  <ShieldAlert className="h-3.5 w-3.5" /> Email not verified
                </span>
              )}
            </p>
          </div>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadAvatar(f); }} />
          <Button variant="outline" size="sm" className="ml-auto gap-1.5" onClick={() => fileRef.current?.click()} disabled={uploading}>
            {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImagePlus className="h-4 w-4" />} Avatar
          </Button>
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium">Display name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <Button onClick={saveProfile} disabled={savingProfile} className="gap-2">
            {savingProfile && <Loader2 className="h-4 w-4 animate-spin" />} Save changes
          </Button>
        </div>
      </div>

      {/* Change password */}
      <div className="mt-6 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-6">
        <h2 className="font-semibold">Change password</h2>
        <div className="mt-4 space-y-4">
          <Input type="password" placeholder="Current password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
          <Input type="password" placeholder="New password (8+ chars, mixed case & number)" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          <Button variant="outline" onClick={changePassword} disabled={changingPw} className="gap-2">
            {changingPw && <Loader2 className="h-4 w-4 animate-spin" />} Update password
          </Button>
        </div>
      </div>

      <button onClick={logout} className="mt-6 text-sm font-medium text-[var(--accent)] hover:underline">
        Sign out
      </button>
    </div>
  );
}
