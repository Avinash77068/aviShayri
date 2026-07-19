import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 text-center">
      <span className="text-6xl">🕊️</span>
      <h1 className="mt-6 text-4xl font-extrabold">
        4<span className="text-gradient">0</span>4
      </h1>
      <p className="mt-3 text-[var(--muted)]">This verse seems to have drifted away. Let&apos;s get you back home.</p>
      <Link href="/" className="mt-8">
        <Button size="lg">Return home</Button>
      </Link>
    </div>
  );
}
