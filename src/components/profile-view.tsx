"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import {
  Loader2,
  ImagePlus,
  ShieldCheck,
  ShieldAlert,
} from "lucide-react";
import { toast } from "sonner";

import { api } from "@/lib/api";
import {
  useCurrentUser,
  useLogout,
  AUTH_QUERY_KEY,
} from "@/hooks/use-auth";

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

  const [changingPw, setChangingPw] =useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name ?? "");
      setAvatar(user.avatar ?? "");
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <Skeleton className="h-[420px] w-full rounded-3xl" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 text-center">
        <h1 className="text-3xl font-bold">You're signed out</h1>

        <p className="mt-3 text-[var(--muted)]">
          Please login to access your profile.
        </p>

        <Link href="/login" className="mt-8">
          <Button size="lg">Login</Button>
        </Link>
      </div>
    );
  }

  const uploadAvatar = async (file: File) => {
    setUploading(true);

    try {
      const fd = new FormData();
      fd.append("file", file);

      const res = await api.post("/media/upload", fd, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const url = res.data?.data?.url ?? "";

      setAvatar(url);

      await api.put("/auth/profile", {
        name: (name || user.name).trim(),
        avatar: url,
      });

      await qc.invalidateQueries({
        queryKey: AUTH_QUERY_KEY,
      });

      toast.success("Avatar updated");
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const saveProfile = async () => {
    setSavingProfile(true);

    try {
      await api.put("/auth/profile", {
        name,
        avatar,
      });

      await qc.invalidateQueries({
        queryKey: AUTH_QUERY_KEY,
      });

      toast.success("Profile updated");
    } catch {
      toast.error("Update failed");
    } finally {
      setSavingProfile(false);
    }
  };

  const changePassword = async () => {
    if (!currentPassword || newPassword.length < 8) {
      toast.error("Password must be minimum 8 characters.");
      return;
    }

    setChangingPw(true);

    try {
      await api.post("/auth/change-password", {
        currentPassword,
        newPassword,
      });

      toast.success("Password changed successfully");

      setCurrentPassword("");
      setNewPassword("");

      logout();
    } catch (e: any) {
      toast.error(
        e?.response?.data?.message || "Could not change password."
      );
    } finally {
      setChangingPw(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 sm:py-10">
      <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
        Your Profile
      </h1>

      {/* PROFILE CARD */}

      <div className="mt-8 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm sm:p-8">

        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">

          {/* Avatar */}

          <div className="flex justify-center sm:block">

            {avatar ? (
              <img
                src={avatar}
                alt={name}
                className="h-24 w-24 rounded-full object-cover ring-2 ring-[var(--border)] sm:h-28 sm:w-28"
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-full text-3xl font-bold text-white [background-image:var(--grad-1)] sm:h-28 sm:w-28">
                {(name || "U").charAt(0).toUpperCase()}
              </div>
            )}

          </div>

          {/* User Info */}

          <div className="flex-1 text-center sm:text-left">

            <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-center">

              <h2 className="text-xl font-bold">{user.name}</h2>

              <Badge variant="soft">{user.role}</Badge>

            </div>

            <p className="mt-2 break-all text-sm text-[var(--muted)]">
              {user.email}
            </p>

            <div className="mt-3">

              {user.isEmailVerified ? (
                <div className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                  <ShieldCheck className="h-4 w-4" />
                  Verified
                </div>
              ) : (
                <div className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
                  <ShieldAlert className="h-4 w-4" />
                  Email Not Verified
                </div>
              )}

            </div>

          </div>

          {/* Upload */}

          <div className="w-full sm:w-auto">

            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) uploadAvatar(file);
              }}
            />

            <Button
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="w-full gap-2 sm:w-auto"
              variant="outline"
            >
              {uploading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ImagePlus className="h-4 w-4" />
              )}

              Change Avatar
            </Button>

          </div>

        </div>

        {/* Form */}

        <div className="mt-8 space-y-5">

          <div>

            <label className="mb-2 block text-sm font-medium">
              Display Name
            </label>

            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

          </div>

          <Button
            onClick={saveProfile}
            disabled={savingProfile}
            className="w-full sm:w-auto"
          >
            {savingProfile && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}

            Save Changes

          </Button>

        </div>

      </div>

      {/* PASSWORD */}

      <div className="mt-8 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm sm:p-8">

        <h2 className="text-xl font-bold">
          Change Password
        </h2>

        <div className="mt-6 space-y-4">

          <Input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) =>
              setCurrentPassword(e.target.value)
            }
          />

          <Input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(e.target.value)
            }
          />

          <Button
            variant="outline"
            onClick={changePassword}
            disabled={changingPw}
            className="w-full sm:w-auto"
          >
            {changingPw && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}

            Update Password

          </Button>

        </div>

      </div>

      {/* Logout */}

      <div className="mt-8 flex justify-center sm:justify-start">

        <Button
          variant="ghost"
          onClick={logout}
          className="text-red-600 hover:text-red-700"
        >
          Sign Out
        </Button>

      </div>

    </div>
  );
}