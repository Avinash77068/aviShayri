import type { Metadata } from "next";
import { WriteShayariForm } from "@/components/write/write-shayari-form";

export const metadata: Metadata = {
  title: "Write Shayari",
  robots: { index: false, follow: false },
};

export default function WritePage() {
  return <WriteShayariForm />;
}
